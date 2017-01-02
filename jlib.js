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

/****************************** FUNCTION ******************************/
document.addEventListener('DOMContentLoaded',function (event) {
	
	setTimeout(function() {
		let timeout = $('.js-timeOut');
		if (timeout != undefined)
			time.style.display = 'none';
	}, 2000);
	
});