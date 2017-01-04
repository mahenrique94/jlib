NodeList.prototype.forEach = Array.prototype.forEach; 
HTMLCollection.prototype.forEach = Array.prototype.forEach;

/****************************** FUNCTION ******************************/
document.addEventListener('DOMContentLoaded',function (event) {
	
	/** @auth Matheus Castiglioni
	 *  Esconder qualquer elemento que tenha a classe js-timeOut após 2 segundos
	 */
	setTimeout(function() {
		let timeout = $('.js-timeOut');
		if (timeout != undefined)
			timeout.style.display = 'none';
	}, 2000);
	
	/** @auth Matheus Castiglioni
	 *  Ao realizar double click em uma table irá procurar se possui algum input ou textarea que esta precisando
	 *  receber algum informação referente a linha clicada, caso existe o valor é jogado para eles e o modal é fechado
	 */
	let trs = $$('table.js-slTable > tbody > tr');
	if (trs.length > 0) {
		trs.forEach(tr => {
			tr.addEventListener('dblclick', function(e) {
				let select = e.target.parentNode.querySelector('[data-select]');
				select.options.forEach(option => {
					let element = parent.document.querySelector(`[data-target='${option.dataset.provide}']`);
					if (element != undefined)
						element.value = option.value;
				});
				closeModal();
			});
		});
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
		HttpService.request(`${url}`, 'DELETE').then(response => {
			remove(obj.parentNode.parentNode);
			append(toastDelete());
		}).catch(error => console.error(error));
	}
};	

/** @auth Mahteus Castiglioni
 *  Função para fechar os modais após alguma execução de script
 */
function closeModal() {
	let modal = parent.document.querySelector('.js-o-modal');
	let background = parent.document.querySelector('.js-o-modal__background');
	if (modal != undefined && background != undefined) {
		modal.remove()
		background.remove();
	}
}

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
 *  Inserir elementos no body 
 */
function append(element) {
	document.body.appendChild(element);
}

/** @auth Matheus Castiglioni
 *  Cria um toast para quando a exclusão via ajax é realizada com sucesso 
 */
function toastDelete() {
	let toast = document.createElement('DIV')
	toast.setAttribute('role', 'alert');
	toast.classList.add('o-toast--success', 'has-icon', 'is-fixedTop', 'js-timeOut');
	toast.innerHTML = '<p class="o-toast__message">Registro excluido com sucesso<i class="icon-ok-circled o-toast__icon--left"></i></p>'
	setTimeout(function() {
		toast.style.display = 'none';
	}, 2000);
	return toast;
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
const CODE_DONE = 4;
const CODE_OK = 200;

/** @auth Matheus Castiglioni
 *  Classe responsável por realizar requisições ajax para uma determinada url
 */
class HttpService {

	static request(url, verb) {
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(verb, url, true);
			xhr.onreadystatechange = function() {
				if (xhr.readyState == CODE_DONE) {
					if (xhr.status == CODE_OK) {
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
	
}