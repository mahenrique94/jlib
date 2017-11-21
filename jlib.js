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
const trimLeftRight = s => s.replace(/(^([\\s]*)|([\\s]+)$)/g, ""); // Espaços a direita e esquerda
const trimRight = s => s.replace(/([\\s]+)$/, ""); // Espaços a direita

/** @auth Matheus Castiglioni
 *  Verificando se um input tem valor
 */
const inputHasValue = input => input.value && input.value.length > 0 && input.value !== "";

/** @auth Matheus Castiglioni
 *  Inserir elementos no body 
 */
const append = element => document.body.appendChild(element);

/** @auth Matheus Castiglioni
 *  Inserir elementos no body do elemento pai 
 */
const appendParent = element => parent.document.body.appendChild(element);

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

/** @auth Matheus Castiglioni
 *  Esconder elemento
 */
function hideElement(element) {
    element.classList.remove("is-show");
    element.classList.add("is-hide");
}

/** @auth Matheus Castiglioni
 *  Disparando evento change manualmente em um determinado elemento
 */
const invokeChange = element => element.dispatchEvent(new Event("change"));

/** @auth Matheus Castiglioni
 *  Disparando evento input manualmente em um determinado elemento
 */
const invokeInput = element => element.dispatchEvent(new Event("input"));

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

/****************************** FUNCTION ******************************/
document.addEventListener("DOMNodeInserted", function(event) {

    /** @auth Matheus Castiglioni
     *  Remover qualquer elemento que tenha a classe js-timeOut após 2 segundos
     */
    setTimeout(removeTimeOut, 2000);

});

document.addEventListener("DOMContentLoaded", function(event) {
	
	/** @auth Matheus Castiglioni
	 *  Remover qualquer elemento que tenha a classe js-timeOut após 2 segundos
	 */
	setTimeout(removeTimeOut, 2000);

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
		setTimeout(() => {
			dependencys.forEach(dependency => {
				checkValidateDependency(dependency);
				dependency.addEventListener("input", function() {
					checkValidateDependency(this);
				});
			});
		}, 1000);
	}
	
});

/** @auth Matheus Castiglioni
 *  Função para chekcar se o input esta válido ou não para poder inválidar ou validar sua dependência
 */
function checkValidateDependency(element) {
	if (element.checkValidity()) {
        element.dataset.dependency.replace("[", "").replace("]", "").split(",").forEach(dependency => {
			elementRemoveAttribute(`#${dependency.trim()}`, "required");
		});
	} else {
        element.dataset.dependency.replace("[", "").replace("]", "").split(",").forEach(dependency => {
			elementAddAttribute(`#${dependency.trim()}`, "required", "true");
		});
	}
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

/** @auth Mahteus Castiglioni
 *  Função para fechar os modais após alguma execução de script
 */
function closeModalParent() {
    const modal = parent.parent.document.querySelector(".js-o-modal");
    const background = parent.parent.document.querySelector(".js-o-modal__background");
    if (modal && background) {
        modal.remove()
        background.remove();
    }
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
 *  Busca um determinado elemento e remove um determinado atributo
 */
function elementRemoveAttribute(selector, attribute) {
    const element = $(selector);
    if (element)
        element.removeAttribute(attribute);
}

/** @auth Matheus Castiglioni
 *  Cria um toast para quando alguma requisição via ajax é realizada
 */
function newToast(type, message, icon) {
    const toast = document.createElement("div")
    toast.setAttribute("role", "alert");
    toast.classList.add(type, "has-icon", "is-fixedTop", "js-timeOut");
    toast.innerHTML = `<p class="o-toast__message">${message}<i class="${icon} o-toast__icon--left"></i></p>`;
    if (type === "o-toast--error")
        toast.innerHTML += "<button class=\"o-toast__close\" onclick=\"ToastController.close(this.parentNode);\"><i class=\"icon-cancel\"></i></button>";
    return toast;
}

/** @auth Matheus Castiglioni
 *  Remover qualquer elemento que tenha a classe js-timeOut
 */
function removeTimeOut() {
    const timeout = $(".js-timeOut");
    if (timeout)
        timeout.remove();
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
				appendParent(newToast("o-toast--error", "Operacao nao foi realizada com sucesso", "icon-cancel-circled"));
				closeModal();
			});
		} else {
			parent.document.location = parent.document.location;
		}
	}).catch(error => console.error(error));
}

/** @auth Matheus Castiglioni
 *  Função para setar um elemento como required se o pai tiver sido preenchido
 */
function requiredDependency(father) {
	console.log("Ola");
    if (father.value != null && father.value != "") {
        father.dataset.dependency.replace("[", "").replace("]", "").split(",").forEach(dependency => {
			elementAddAttribute(`#${dependency.trim()}`, "required", "true");
    	});
	} else {
        father.dataset.dependency.replace("[", "").replace("]", "").split(",").forEach(dependency => {
        	elementRemoveAttribute(`#${dependency.trim()}`, "required");
    	});
	}
}

/** @auth Matheus Castiglioni
 *  Função para mostrar um elemento se o pai tiver sido preenchido
 */
function requiredDependencyShow(father) {
	if (father.value != null && father.value != "") {
		father.dataset.dependency.replace("[", "").replace("]", "").split(",").forEach(dependency => {
			showElement($(`#${dependency.trim()}`));
		});
    } else {
        father.dataset.dependency.replace("[", "").replace("]", "").split(",").forEach(dependency => {
            hideElement($(`#${dependency.trim()}`));
    	});
	}
}