NodeList.prototype.forEach = Array.prototype.forEach; 
HTMLCollection.prototype.forEach = Array.prototype.forEach;

const WEBSERVICE = "http://ws.matheuscastiglioni.com.br/ws";

/****************************** BASE ******************************/
/** @auth Matheus Castiglioni
 * Criando um atalho para buscar elementos na página com javascript puro 
 */
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);

/** @auth Matheus Castiglioni
 *  Retirando espaços de uma string 
 */
const trimAll = s => s.replace(/([\\s]+)/g, ""); // Todos os espaços
const trimLeft = s => s.replace(/^([\\s]+)/, ""); // Espaços á esquerda
const trimRight = s => s.replace(/([\\s]+)$/, ""); // Espaços a direita
const trimLeftRight = s => s.replace(/(^([\\s]*)|([\\s]+)$)/g, ""); // Espaços a direita e esquerda

/** @auth Matheus Castiglioni
 *  Inserir elementos no body 
 */
const append = element => document.body.appendChild(element);

/** @auth Matheus Castiglioni
 *  Inserir elementos no body do elemento pai 
 */
const appendParent = element => parent.document.body.appendChild(element);

/** @auth Matheus Castiglioni
 *  Disparando evento change manualmente em um determinado elemento
 */
const invokeChange = element => element.dispatchEvent(new Event("change"));

/** @auth Matheus Castiglioni
 *  Mostrar elemento
 */
function showElement(element) {
	element.classList.remove("is-hide");
	element.classList.add("is-show");
}

/** @auth Matheus Castiglioni
 *  Mostrar/Esconder elemento
 */
function showHideElement(element) {
	element.classList.toggle("is-hide");
	element.classList.toggle("is-show");
}

/** @auth Matheus Castiglioni
 *  Esconder elemento
 */
function hideElement(element) {
	element.classList.remove("is-show");
	element.classList.add("is-hide");
}

/** @auth Matheus Castiglioni
 *  Função para pegar o nome da aplicação que esta sendo executada
 */
function getApplicationName() {
	let href = window.location.href;
	let app = href.substring(href.indexOf("//") + 2); // Retirando http://
	app = app.substring(app.indexOf("/") + 1);
	app = app.substring(0, app.indexOf("/")); 
	return app;
}

/****************************** FUNCTION ******************************/
document.addEventListener("DOMContentLoaded", function(event) {
	
	/** @auth Matheus Castiglioni
	 *  Remover qualquer elemento que tenha a classe js-timeOut após 2 segundos
	 */
	setTimeout(function() {
		const timeout = $(".js-timeOut");
		if (timeout != undefined)
			timeout.remove();
	}, 2000);
	
	/** @auth Matheus Castiglioni
	 *  Ao realizar double click em uma table irá procurar se possui algum input ou textarea que esta precisando
	 *  receber algum informação referente a linha clicada, caso existe o valor é jogado para eles e o modal é fechado
	 */
	const trs = $$("table.js-slTable > tbody > tr");
	if (trs.length > 0) {
		trs.forEach(tr => {
			tr.addEventListener("dblclick", function(e) {
				const search = $("[data-search]");
				const select = e.target.parentNode.querySelector("[data-select]");
				select.options.forEach(option => {
					const element = search.value !== "" ? parent.document.querySelector(`[data-target~="${option.dataset.provide}"][data-search="${search.value}"]`) : parent.document.querySelector(`[data-target~="${option.dataset.provide}"]`);
					if (element) {
						element.value = option.value;
						invokeChange(element);
					}
				});
				closeModal();
			});
		});
	}
	
	/** @auth Matheus Castiglioni
	 *  Amarrando dois elementos como um só, caso algum deles esteja valido o outro é validado também
	 */
	const dependencys = $$("[data-dependency]");
	if (dependencys.length > 0) {
		dependencys.forEach(dependency => {
			checkValidateDependency(dependency);
			dependency.addEventListener("input", function() {
				checkValidateDependency(this);
			});
		});
	}
	
});

/** @auth Matheus Castiglioni
 *  Função para chekcar se o input esta válido ou não para poder inválidar ou validar sua dependência
 */
function checkValidateDependency(element) {
	if (element.checkValidity())
		elementRemoveAttribute(`#${element.dataset.dependency}`, "required");
	else
		elementAddAttribute(`#${element.dataset.dependency}`, "required", "true");
}

/** @auth Matheus Castiglioni
 *  Função para gerar um código de acordo a data atual e informar no input
 */
function createCode(button) {
	const input = button.parentNode.parentNode.querySelector("input");
	const data = new Date();
	const code = `${data.getDate()}${(data.getMonth() + 1)}${data.getFullYear().toString().substring(2)}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}`;
	if (input)
		input.value = code;
}

/** @auth Matheus Castiglioni
 *  Função para pegar a data atual e informar no input
 */
function insertDate(button) {
	const input = button.parentNode.parentNode.querySelector("input");
	const agora = new Date();
	let dia = agora.getDate();
	let mes = agora.getMonth() + 1;
	let hora = agora.getHours();
	let minuto = agora.getMinutes();
	dia = dia < 10 ? `0${dia}` : dia;
	mes = mes < 10 ? `0${mes}` : mes;
	hora = hora >= 1 && hora <= 9 ? `0${hora}` : hora;
	minuto = minuto >= 0 && minuto <= 9 ? `0${minuto}` : minuto;
	if (!input.readOnly && input)
		input.value = `${dia}/${mes}/${agora.getFullYear()} ${hora}:${minuto}`;
}

/** @auth Matheus
 *  Botão para deletar itens via Ajax utilizando @Delete
 */
function requestDelete(obj) {
	const URL = obj.href || obj.formAction;
	const ID = URL.substring(URL.lastIndexOf("=") + 1);
	HttpService.request(URL, "DELETE").then(response => {
		if (obj.parentNode.classList.contains("has-Father")) {
			const children = obj.parentNode.parentNode.parentNode.querySelectorAll(`.js-Father${ID}`);
			if (children.length > 0)
				children.forEach(child => child.parentNode.remove());
		}
		obj.parentNode.parentNode.remove();
		append(newToast("o-toast--success", "Registro excluido com sucesso", "icon-ok-circled"));
	}).catch(error => {
		append(newToast("o-toast--error", "Registro nao pode ser excluido", "icon-cancel-circled"));
		console.error(error);
	});
};	

/** @auth Matheus Castiglioni
 *  Cria um toast para quando a exclusão via ajax é realizada com sucesso 
 */
function newToast(type, message, icon) {
	const toast = document.createElement("DIV")
	toast.setAttribute("role", "alert");
	toast.classList.add(type, "has-icon", "is-fixedTop", "js-timeOut");
	toast.innerHTML = `<p class="o-toast__message">${message}<i class="${icon} o-toast__icon--left"></i></p>`;
	if (type === "o-toast--error")
		toast.innerHTML += "<button class=\"o-toast__close\" onclick=\"ToastController.close(this.parentNode);\"><i class=\"icon-cancel\"></i></button>";
	if (type === "o-toast--success") {
		setTimeout(function() {
			toast.remove();
		}, 2000);
	}
	return toast;
}

/** @auth Matheus Castiglioni
 *  Função genérica para realizar uma requisição via AJAX 
 */
function request(obj, event) {
	event.preventDefault();
	const URL = obj.href || obj.formAction || obj.action;
	return new Promise((resolve, reject) => {
		HttpService.request(URL, obj.method, obj.elements, true).then(response => {
			resolve(response);
		}).catch(error => reject(error));	
	});
}

/** @auth Matheus Castiglioni
 *  Realizar uma requisição via AJAX para o servidor e se tudo der certo fechar o modal, caso o formulário
 *  possua um loadgrid na tela PAI o mesmo é carregado sem fazer reload na página toda. 
 */
function requestModal(obj, event) {
	request(obj, event).then(responseRequest => {
		const loadGrid = parent.document.querySelector(`.js-loadgrid[id^=${obj.id.substring(4)}]`);
		if (loadGrid) {
			LoadGrid.load(loadGrid.dataset.load).then(responseLoadGrid => {
				loadGrid.innerHTML = "";
				loadGrid.append(responseLoadGrid);
				appendParent(newToast("o-toast--success", "Operacao realizada com sucesso", "icon-ok-circled"));
				closeModal();
			}).catch(error => {
				console.error(error);
				appendParent(newToast("o-toast--error", "Operacao não foi realizada com sucesso", "icon-cancel-circled"));
				closeModal();
			});
		} else {
			parent.document.location = parent.document.location;
		}
	}).catch(error => console.error(error));
}

/** @auth Mahteus Castiglioni
 *  Função para fechar os modais após alguma execução de script
 */
function closeModal() {
	const modal = parent.document.querySelector(".js-o-modal");
	const background = parent.document.querySelector(".js-o-modal__background");
	if (modal && background) {
		modal.remove()
		background.remove();
	}
}

/** @auth Matheus Castiglioni
 *  Busca um determinado elemento e remove um determinado atributo 
 */
function elementRemoveAttribute(selector, attribute) {
	const element = $(selector);
	if (element)
		element.removeAttribute(attribute);
}

/** @auth Matheus Castiglioni
 *  Busca um determinado elemento e adiciona um determinado atributo 
 */
function elementAddAttribute(selector, attribute, value) {
	const element = $(selector);
	if (element)
		element.setAttribute(attribute, value);
}

/** @auth Matheus Castiglioni
 *  Função para limpar os valores dos inputs que são alimentados via ListaSL
 */
function clearSL(obj) {
	const input = obj.parentNode.parentNode.querySelector("input");
	const inputsLimpar = document.querySelectorAll(`[data-search=${input.dataset.search}]`);
	inputsLimpar.forEach(input => {
		input.value = "";
	});
}

/****************************** CLASSES ******************************/
const CODE_DONE = 4;
const CODE_OK = 200;

/** @auth Matheus Castiglioni
 *  Classe responsável por realizar requisições ajax para uma determinada url
 */
class HttpService {

	static request(url, verb, params, buildParams) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(verb, url, true);
			if (verb.toUpperCase() === "POST")
				xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xhr.onreadystatechange = function() {
				if (xhr.readyState == CODE_DONE) {
					if (xhr.status == CODE_OK)
						resolve(xhr.responseText);
					else
						reject(xhr.responseText);
				}
			}
			xhr.ontimeout = function() {
				console.error("A requisição excedeu o tempo limite");
			}
			xhr.send(this.populateParams(params, buildParams));
		});
	}
	
	static populateParams(params, buildParams) {
		// Verificando se ja esta sendo passado os dados para requisição via POST
		if (!buildParams)
			return params;
		
		if (params && params.length > 0) {
			let data = "";
			params.forEach(param => {
				if (!param.name.endsWith("aux") && this.isData(param))
					data += `${encodeURIComponent(param.name)}=${param.value}&`;
			});
			return data.substring(0, (data.length - 1));
		}
		
		return null;
	}
	
	static isData(element) {
		return element.nodeName.toLowerCase() === "input" || element.nodeName.toLowerCase() === "select" || element.nodeName.toLowerCase() === "textarea";
	}
	
}