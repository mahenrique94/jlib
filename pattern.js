/** @auth Matheus Castiglioni
 *  Inserindo todos os possíveis valores para os patterns do HTML5, com isso é possível validar o formulário ao submete-lo
 */
document.addEventListener('DOMContentLoaded',function (event) {
	
	let patterns = [
		{name : 'data', pattern : '^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][7-9][\\d]+|[20][\\d]+))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA onde o ano deve ser maior que 1900'},
		{name : 'dataHora', pattern : '^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][\\d]+|[20][\\d]+)\\s([0][\\d]|[1][\\d]|[2][\\d]):([0][\\d]|[1][\\d]|[2][\\d]|[3][\\d]))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900'},
		{name : 'espacoLetraBarraPonto', pattern : "^(([A-Z\\.\\/])+(\\s[A-Z\\.\\/]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. /)."},
		{name : 'espacoLetraNumeroBarraPontoTraco', pattern : "^(([A-Z\\d\\.\\/\\-])+(\\s[A-Z\\d\\.\\/\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /)."},
		{name : 'letraNumero', pattern : "^([A-Z\\d]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos."},
		{name : 'letraNumeroMin4', pattern : "^([A-Z\\d]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e deve ter no minimo 4 caracteres."},
		{name : 'letraNumeroPonto', pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
		{name : 'number0to9', pattern : "^([\\d]+)$", message : "O campo deve ser preenchido com apenas numeros inteiros."},
		{name : 'numeric18-2', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 2."},
		{name : 'numeric18-4', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,4}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 4."},
		{name : 'numeric18-6', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,6}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 6."},
		{name : 'password', pattern : "^([A-Z\\d@-_\\.]{8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."},
		{name : 'textareaEspacoLetraNumeroBarraPontoTracoVirgula', pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."}
	];
	
	patterns.forEach(pattern => setPattern(pattern));
	
});

function setPattern(pattern) {
	let elements = $$(`[pattern=${pattern.name}]`);
	if (elements.length > 0) {
		elements.forEach(element => {
			element.setAttribute('pattern', pattern.pattern);
			element.setAttribute('data-accept', pattern.message);
			if (hasTooltip(element))
				setMessageTooltip(pattern, element);
		});
	}
}

function hasTooltip(element) {
	return element.parentNode.classList.contains('o-form__tooltip');
}

function setMessageTooltip(pattern, input) {
	let tooltip = input.parentNode.querySelector('[class*=o-tooltip]');
	tooltip.innerHTML = `${pattern.message}<br/>${buildMessageFromInput(input)}`;
}

function buildMessageFromInput(input) {
	if (input.type.equals('text'))
		return `Intervalo: ${input.getAttribute('minlength')} a ${input.getAttribute('maxlength')} caracteres.`;
	if (input.type.equals('number'))
		return `Intervalo: ${input.getAttribute('min')} a ${input.getAttribute('max')}.`;
	return '';
}