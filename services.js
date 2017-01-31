/** @auth Matheus Castiglioni
 *  Serviços para realizar requisições ajax
 */
document.addEventListener('DOMContentLoaded', function(event) {
	
	checkAddresWithCep();
	
});

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
	let input = button.parentNode.parentNode.find('.o-form__data');
	if (input.value.length === 9) {
		const CEP = input.value.replace('-', '');
		requestCep(CEP, icon, button);
	} else {
		input.focus();
	}
}

/** @auth Matheus Castiglioni
 *  Função responsável por buscar o endereço de um determinado CEP via web service 
 */
function requestCep(cep, icon, button) {
	const URL = `${WEBSERVICE}/cep/find/${cep}/json/simple/upper`;
	if (icon)
		initAnimate(icon);
	HttpService.request(URL, 'GET').then(response => {
		let json = JSON.parse(response);
		fillFields(json);
		$('[data-cep=numero]').focus();
		if (icon)
			stopAnimate(icon);
	}).catch(error => {
		console.error(error);
		setFeedback('CEP', button.parentNode.parentNode, 'invalid');
		enabledFiledsCep();
		stopAnimate(icon);
	});
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
	disabledFiledsCep();
}

/** @auth Matheus Castiglioni
 *  Travar os campos referente as informações do CEP para digitação 
 */
function disabledFiledsCep() {
	$('[data-cep=logradouro]').setAttribute('readonly', 'true');
	$('[data-cep=bairro]').setAttribute('readonly', 'true');
	$('[data-cep=estado]').setAttribute('readonly', 'true');
	$('[data-cep=cidade]').setAttribute('readonly', 'true');
}

/** @auth Matheus Castiglioni
 *  Liberar os campos referente as informações do CEP para digitação 
 */
function enabledFiledsCep() {
	$('[data-cep=logradouro]').removeAttribute('readonly');
	$('[data-cep=bairro]').removeAttribute('readonly');
	$('[data-cep=estado]').removeAttribute('readonly');
	$('[data-cep=cidade]').removeAttribute('readonly');
}

function checkAddresWithCep() {
	const cep = $('[data-cep]');
	if (cep && cep.value.length == 9 && !cep.value.endsWith('000'))
		disabledFiledsCep();
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

/** @auth Matheus Castiglioni
 *  Função responsável por informar para o usuário no HTML se o CNPJ é válido ou inválido
 */
function setFeedback(object, element, type) {
	let feedback = element.parentNode.find('.o-form__feedback');
	if (feedback) {
		if (type.equals('valid')) {
			let message = `${object} valido`;
			feedback.setAttribute('aria-label', message)
			feedback.textContent = message;
			feedback.classList.add('is-valid', 'is-show');
			feedback.classList.remove('is-hide');
		} else {
			let message = `${object} invalido`;
			feedback.setAttribute('aria-label', message)
			feedback.textContent = message;
			feedback.classList.add('is-invalid', 'is-show');
			feedback.classList.remove('is-hide');
		}
	}
}