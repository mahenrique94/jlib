/** @auth Matheus Castiglioni
 *  Serviços para realizar requisições ajax
 */
document.addEventListener("DOMContentLoaded", function(event) {
	
	checkAddresWithCep();
	
});

/*********************************************** DOCUMENTS ***********************************************/
/** @auth Matheus Castiglioni
 *  Função responsável por realizar a validação de documentos ao sair do campo
 */
function checkDocument(document, input) {
	if (input.value.length === 14) {
		validatingDocument(input, document);
	} else if (input.value.length === 18) {
		validatingDocument(input, document);
	} else {
		let feedback = input.parentNode.parentNode.querySelector(".o-form__feedback");
		if (feedback) {
			feedback.classList.remove("is-show");
			feedback.classList.add("is-hide");
		}
	}
}

/** @auth Matheus Castiglioni
 *  Função responsável por validar um CNPJ ou CPF
 */
function validatingDocument(input, document) {
	icon = input.parentNode.querySelector(".o-form__icon");
	if (icon)
		initAnimateInput(icon);
	document = document === "CPFCNPJ" ? input.value.length === 14 ? "CPF" : "CNPJ" : document;
	const DOCUMENT = input.value.replace(/[\/\.\-]/g, "");
	const URL = `${WEBSERVICE}/document/${document.toLowerCase()}/information/${DOCUMENT}/json`; 
	HttpService.request(URL, "GET").then(response => {
		const json = JSON.parse(response);
		if (json.valido) {
			setFeedback(document, input.parentNode, "valid");
			if (document === "CNPJ")
				findData(json.desformatado);
			stopAnimateInput(icon);
		} else {
			setFeedback(document, input.parentNode, "invalid");
			if (document === "CNPJ")
				fillFieldsCNPJ("");
			stopAnimateInput(icon);
		}
	}).catch(error => {
		console.error(error)
		stopAnimateInput(icon);
	});
}

/** @auth Matheus Castiglioni
 *  Função responsável por buscar as informações referente a um determinado CNPJ
 */
function findData(cnpj) {
	let iconNomeRazaoSocial;
	const inputRazaoSocial = $("[data-cnpj=nomerazaosocial]");
	if (inputRazaoSocial) {
		iconNomeRazaoSocial = inputRazaoSocial.parentNode.querySelector(".o-form__icon");
		if (iconNomeRazaoSocial)
			initAnimateInput(iconNomeRazaoSocial);
	}
	
	let iconNomeFantasia;
	const inputNomeFantasia = $("[data-cnpj=nomefantasia]");
	if (inputNomeFantasia) {
		iconNomeFantasia = inputNomeFantasia.parentNode.querySelector(".o-form__icon");
		if (iconNomeFantasia)
			initAnimateInput(iconNomeFantasia);
	}
	
	if (cnpj) {
		const URL = `${WEBSERVICE}/document/cnpj/data/${cnpj}/json/simple/upper`;
		HttpService.request(URL, "GET").then(response => {
			const json = JSON.parse(response);
			fillFieldsCNPJ(json);
			if (iconNomeRazaoSocial)
				stopAnimateInput(iconNomeRazaoSocial);
			if (iconNomeFantasia)
				stopAnimateInput(iconNomeFantasia);
			fillFieldsCep(json.endereco);
		}).catch(error => console.error(error));
	}
}

/** @auth Matheus Castiglioni
 *  Função responsável por pegar as informações de um CNPJ e preencher os campos na tela 
 */
function fillFieldsCNPJ(json) {
	$("[data-cnpj=nomerazaosocial]").value = json.razaosocial.replace(/([\s]{2})/gi, " ").trim();
	const nomeFantasia = $("[data-cnpj=nomefantasia]");
	if (nomeFantasia)
		nomeFantasia.value = json.nomefantasia;
}

/*********************************************** KEYS ***********************************************/
/** @auth Matheus Castiglioni
 *  Função responsável por validar chaves de CTE, MDFE e NFE
 */
function checkKey(input) {
	if (input.value.length == 44) {
		icon = input.parentNode.querySelector(".o-form__icon");
		if (icon)
			initAnimateInput(icon);
		const URL = `${WEBSERVICE}/document/eletronic/${input.dataset.document}/information/${input.value}/json`; 
		HttpService.request(URL, "GET").then(response => {
			const json = JSON.parse(response);
			if (json.valido) {
				setFeedback("Chave", input.parentNode.parentNode, "valid");
				stopAnimateInput(icon);
			} else {
				setFeedback("Chave", input.parentNode.parentNode, "invalid");
				stopAnimateInput(icon);
			}
		}).catch(error => {
			console.error(error)
			stopAnimateInput(icon);
		});
	}
}

/*********************************************** CEP ***********************************************/
/** @auth Matheus Castiglioni
 *  Função responsável por buscar o endereço de um determinado CEP 
 */
function findCep(button) {
	const icon = button.querySelector("i");
	const input = button.parentNode.parentNode.querySelector(".o-form__data");
	if (input.value.length === 9) {
		const CEP = input.value.replace("-", "");
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
		initAnimateButton(icon);
	HttpService.request(URL, "GET").then(response => {
		const json = JSON.parse(response);
		fillFieldsCep(json);
		$("[data-cep=numero]").focus();
		if (icon)
			stopAnimateButton(icon);
	}).catch(error => {
		console.error(error);
		if (button)
			setFeedback("CEP", button.parentNode.parentNode, "invalid");
		enabledFieldsCep();
		stopAnimateButton(icon);
	});
}

/** @auth Matheus Castiglioni
 *  Função responsável por pegar as informações de um CEP e preencher os campos na tela 
 */
function fillFieldsCep(json) {
	$("[data-cep=cep]").value = json.cep;
	$("[data-cep=logradouro]").value = json.logradouro;
	$("[data-cep=bairro]").value = json.bairro;
	$("[data-cep=complemento]").value = json.complemento;
	$("[data-cep=estado]").innerHTML = `<option value="${json.codestado}">${json.estado}</option>`;
	$("[data-cep=cidade]").innerHTML = `<option value="${json.codibge}">${json.cidade}</option>`;
	if ($("[data-cep=pais]"))
		$("[data-cep=pais]").innerHTML = `<option value="1058">BRASIL</option>`;
	if (!json.cep.endsWith("000"))
		disabledFiledsCep();
}

/** @auth Matheus Castiglioni
 *  Travar os campos referente as informações do CEP para digitação 
 */
function disabledFiledsCep() {
	$("[data-cep=logradouro]").setAttribute("readonly", "true");
	$("[data-cep=bairro]").setAttribute("readonly", "true");
	$("[data-cep=estado]").setAttribute("readonly", "true");
	$("[data-cep=cidade]").setAttribute("readonly", "true");
	if ($("[data-cep=pais]"))
		$("[data-cep=pais]").setAttribute("readonly", "true");
}

/** @auth Matheus Castiglioni
 *  Liberar os campos referente as informações do CEP para digitação 
 */
function enabledFieldsCep() {
	$("[data-cep=logradouro]").removeAttribute("readonly");
	$("[data-cep=bairro]").removeAttribute("readonly");
	$("[data-cep=estado]").removeAttribute("readonly");
	$("[data-cep=cidade]").removeAttribute("readonly");
}

function checkAddresWithCep() {
	const cep = $("[data-cep]");
	if (cep && cep.value.length == 9 && !cep.value.endsWith("000"))
		disabledFiledsCep();
}

/** @auth Matheus Castiglioni
 *  Função responsável por iniciar a animação de loading do icone em um input 
 */
function initAnimateInput(icon) {
	icon.classList.remove("is-hide");
	icon.classList.add("is-show", "animate-spin");
}

/** @auth Matheus Castiglioni
 *  Função responsável por parar a animação de loading do icone em um input 
 */
function stopAnimateInput(icon) {
	icon.classList.remove("is-show", "animate-spin");
	icon.classList.add("is-hide");
}

/** @auth Matheus Castiglioni
 *  Função responsável por iniciar a animação de loading do icone do botão 
 */
function initAnimateButton(icon) {
	icon.classList.remove("icon-globe");
	icon.classList.add("icon-spin3", "animate-spin");
}

/** @auth Matheus Castiglioni
 *  Função responsável por parar a animação de loading do icone do botão 
 */
function stopAnimateButton(icon) {
	icon.classList.remove("icon-spin3", "animate-spin");
	icon.classList.add("icon-globe");
}

/** @auth Matheus Castiglioni
 *  Função responsável por informar para o usuário no HTML se o CNPJ é válido ou inválido
 */
function setFeedback(object, element, type) {
	const feedback = element.parentNode.querySelector(".o-form__feedback");
	if (feedback) {
		if (type === "valid") {
			let message = `${object} valido`;
			feedback.setAttribute("aria-label", message)
			feedback.textContent = message;
			feedback.classList.add("is-valid", "is-show");
			feedback.classList.remove("is-invalid", "is-hide");
		} else {
			let message = `${object} invalido`;
			feedback.setAttribute("aria-label", message)
			feedback.textContent = message;
			feedback.classList.add("is-invalid", "is-show");
			feedback.classList.remove("is-valid", "is-hide");
		}
	}
}