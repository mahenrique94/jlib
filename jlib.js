NodeList.prototype.forEach = Array.prototype.forEach; 
HTMLCollection.prototype.forEach = Array.prototype.forEach;

var pathRaiz = '/puppis';
if (location.host.startsWith('painel'))
	pathRaiz = '';

/****************************** FUNCTION ******************************/
document.addEventListener('DOMContentLoaded',function (event) {
	
	setTimeout(function() {
		let timeout = $('.js-timeOut');
		if (timeout != undefined)
			timeout.style.display = 'none';
	}, 2000);
	
	let inputWithValue = $('input[autofocus]');
	if (inputWithValue != undefined) {
		if (!inputWithValue.value.equals('')) {
			document.activeElement.blur();
			inputWithValue.removeAttribute('autofocus');
		}
	}
	
});

// LIMPA TODOS OS ESPACOS DE UMA STRING
function trimAll(string) {
	return string.replace(/\s/g, "");
}

// LIMPA ESPACOS A ESQUERDA
function trimLeft(string) {
	return string.replace(/^\s+/, "");
}

// LIMPA ESPACOS A DIREITA
function trimRight(string) {
	return string.replace(/\s+$/, "");
}

// LIMPA ESPACOS A DIREITA E ESQUERDA
function trimLeftRight(string) {
	return string.replace(/^\s+|\s+$/g, "");
}

/** @auth Matheus Castiglioni
 *  Função para gerar um código de acordo a data atual e informar no input
 */
function createCode(button) {
	let input = button.parentNode.parentNode.querySelector('input');
	var data = new Date();
	var code = `${data.getDate()}${(data.getMonth() + 1)}${data.getFullYear().toString().substring(2)}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}`;
	if (input != undefined)
		input.value = code;
}

/** @auth Matheus Castiglioni
 *  Função para pegar a data atual e informar no input
 */
function insertDate(button) {
	let input = button.parentNode.parentNode.querySelector('input');
	let agora = new Date();
	let dia = agora.getDate();
	let mes = agora.getMonth() + 1;
	let hora = agora.getHours();
	let minuto = agora.getMinutes();
	dia = dia < 10 ? `0${dia}` : dia;
	mes = mes < 10 ? `0${mes}` : mes;
	hora = hora >= 1 && hora <= 9 ? `0${hora}` : hora;
	minuto = minuto >= 0 && minuto <= 9 ? `0${minuto}` : minuto;
	if (!input.readOnly && input != undefined)
		input.value = `${dia}/${mes}/${agora.getFullYear()} ${hora}:${minuto}`;
}

/** @auth Matheus
 *  Botão para deletar itens via Ajax utilizando @Delete
 */
function requestDelete(obj) {
	let url = obj.href || obj.formAction;
	if (confirm("Deseja confirmar a exlusão ?")) {
		HttpService.delete(`${url}`).then(response => {
			remove(obj.parentNode.parentNode);
		}).catch(error => console.error(error));
	}
};	

/****************************** BASE ******************************/
/** @auth Matheus Castiglioni
 * Criando um atalho para buscar elementos na página com javascript puro 
 */
function $(selector) {
	return document.querySelector(selector);
}
function $$(selector) {
	return document.querySelectorAll(selector);
}

/** @auth Matheus Castiglioni
 *  Função para remover elementos da página, criada para evitar ficar indo no parent toda hora para remover algum
 *  elemento 
 */
function remove(obj) {
	obj.parentNode.removeChild(obj);
}

/****************************** OVERRIDE ******************************/
/** @auth Matheus Castiglioni
 *  Adicionando a função equals para comparar Strings de forma mais fácil
 */
Object.prototype.equals = function(string) {
	let s = '';
	for (let i = 0; i < this.length; i++) {
		s = s.concat(this[i]);
	}
	return s == string;
}

/****************************** CLASSES ******************************/
class HttpService {

	constructor() {
		this._CODE_DONE = 4;
		this._CODE_OK = 200;
	}
	
	static get(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == this._CODE_DONE) {
					if (xhr.status == this._CODE_OK) {
						resolve(xhr.responseText);
					} else {
						reject(xhr.responseText);
					}
				}
			}
			xhr.ontimeout = function() {
				console.error('A requisição excedeu o tempo limite');
			}
			xhr.send();
		});
	}
	
	static delete(url) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open('DELETE', url, true);xhr.send();
			resolve(xhr.respondeText);
		});
	}

}