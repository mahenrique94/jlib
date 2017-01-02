/** @auth Matheus Castiglioni
 *  Inserindo todos os possíveis valores para os patterns do HTML5, com isso é possível validar o formulário ao submete-lo
 */
document.addEventListener('DOMContentLoaded',function (event) {
	
	let letraNumeroPonto = ["([A-Z0-9\\.]+)", "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.)."];
	
	let password = ["([A-Z0-9@-_\\.]{8})",  "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (@ - _ .)."];
	
	setPattern('input[pattern=password]', password);
	setPattern('input[pattern=letraNumeroPonto]', letraNumeroPonto);
	
});

function setPattern(selector, pattern) {
	let elements = $$(selector);
	if (elements.length > 0) {
		elements.forEach(element => {
			element.pattern = pattern[0];
			element.setAttribute('data-accept', pattern[1]);
		});
	}
}