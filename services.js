/** @auth Matheus Castiglioni
 *  Serviços para realizar requisições ajax
 */

/*********************************************** DOCUMENTS ***********************************************/
/** @auth Matheus Castiglioni
 *  Função responsável por realizar a validação de documentos ao sair do campo
 */
function checkDocument(document, input) {
	if (input.value.length === 18) {
		if (document.equals('CNPJ')) {
			const CNPJ = input.value.replace(/[\/\.\-]/g, '');
			const URL = `${WEBSERVICE}/document/cnpj/information/${CNPJ}/json`; 
			HttpService.request(URL, 'GET').then(response => {
				let json = JSON.parse(response);
				if (json.valido) {
					setFeedback(document, input, 'valid');
					findData(json.desformatado);
				} else {
					setFeedback(document, input, 'invalid');
				}
			}).catch(error => console.error(error));
		}
	}
}

/** @auth Matheus Castiglioni
 *  Função responsável por informar para o usuário no HTML se o CNPJ é válido ou inválido
 */
function setFeedback(document, input, type) {
	let feedback = input.parentNode.querySelector('.o-form__feedback');
	if (feedback) {
		if (type.equals('valid')) {
			let message = `${document} valido`;
			feedback.setAttribute('aria-label', message)
			feedback.textContent = message;
			feedback.classList.add('is-valid', 'is-show');
			feedback.classList.remove('is-hide');
		} else {
			let message = `${document} invalido`;
			feedback.setAttribute('aria-label', message)
			feedback.textContent = message;
			feedback.textContent = message;
			feedback.classList.add('is-invalid', 'is-show');
			feedback.classList.remove('is-hide');
		}
	}
}

/** @auth Matheus Castiglioni
 *  Função responsável por buscar as informações referente a um determinado CNPJ
 */
function findData(cnpj) {
	if (cnpj) {
		const URL = `${WEBSERVICE}/document/cnpj/data/${cnpj}/json/simple/upper`;
		HttpService.request(URL, 'GET').then(response => {
			let json = JSON.parse(response);
			$('[data-cnpj=razaosocial]').value = json.razaosocial;
			requestCep(json.endereco.cep);
		}).catch(error => console.error(error));
	}
}

/*********************************************** CEP ***********************************************/
/** @auth Matheus Castiglioni
 *  Função responsável por buscar o endereço de um determinado CEP 
 */
function findCep(button) {
	let icon = button.querySelector('i');
	let input = button.parentNode.parentNode.querySelector('.o-form__data');
	if (input.value.length === 9) {
		const CEP = input.value.replace('-', '');
		requestCep(CEP, icon);
	} else {
		input.focus();
	}
}

/** @auth Matheus Castiglioni
 *  Função responsável por buscar o endereço de um determinado CEP via web service 
 */
function requestCep(cep, icon) {
	const URL = `${WEBSERVICE}/cep/find/${cep}/json/simple/upper`;
	if (icon)
		initAnimate(icon);
	HttpService.request(URL, 'GET').then(response => {
		let json = JSON.parse(response);
		fillFields(json);
		$('[data-cep=numero]').focus();
		if (icon)
			stopAnimate(icon);
	}).catch(error => console.error(error));
}

/** @auth Matheus Castiglioni
 *  Função responsável por pegar as informações de um CEP e preencher os campos na tela 
 */
function fillFields(json) {
	$('[data-cep=cep]').value = json.cep;
	$('[data-cep=logradouro]').value = json.logradouro;
	$('[data-cep=bairro]').value = json.bairro;
	$('[data-cep=complemento]').value = json.complemento;
	$('[data-cep=estado]').innerHTML = `<option value="${json.estado}">${json.estado}</option>`;
	$('[data-cep=cidade]').innerHTML = `<option value="${json.cidade}">${json.cidade}</option>`;
}

/** @auth Matheus Castiglioni
 *  Função responsável por iniciar a animação de loading do icone do botão 
 */
function initAnimate(icon) {
	icon.classList.remove('icon-globe');
	icon.classList.add('icon-spin3', 'animate-spin');
}

/** @auth Matheus Castiglioni
 *  Função responsável por parar a animação de loading do icone do botão 
 */
function stopAnimate(icon) {
	icon.classList.remove('icon-spin3', 'animate-spin');
	icon.classList.add('icon-globe');
}