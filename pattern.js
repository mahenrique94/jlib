/** @auth Matheus Castiglioni
 *  Inserindo todos os possíveis valores para os patterns do HTML5, com isso é possível validar o formulário ao submete-lo
 */
document.addEventListener('DOMContentLoaded',function (event) {
	
	let patterns = [
		{name : 'espacoLetraNumeroPontoTracoBarra', pattern : "^(([A-Z\\d\\.\\/\\-])+(\\s[A-Z\\d\\.\\/\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /)."},
		{name : 'letraNumero', pattern : "^([A-Z\\d]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espaços."},
		{name : 'letraNumeroMin4', pattern : "^([A-Z\\d]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espaços e deve ter no minimo 4 caracteres."},
		{name : 'letraNumeroPonto', pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espaços e aceita os seguintes caracteres especiais: (.)."},
		{name : 'numeric18-2', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 2."},
		{name : 'numeric18-4', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,4}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 4."},
		{name : 'numeric18-6', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,6}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 6."},
		{name : 'password', pattern : "^([A-Z\\d@-_\\.]{8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espaços e aceita os seguintes caracteres especiais: (@ - _ .)."},
		{name : 'data', pattern : '^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][7-9][\\d]+|[20][\\d]+))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA onde o ano deve ser maior que 1900'},
		{name : 'dataHora', pattern : '^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][\\d]+|[20][\\d]+)\\s([0][\\d]|[1][\\d]|[2][\\d]):([0][\\d]|[1][\\d]|[2][\\d]|[3][\\d]))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900'}
	];
	
	patterns.forEach(pattern => setPattern(pattern));
	
});

function setPattern(pattern) {
	let inputs = $$(`input[pattern=${pattern.name}]`);
	if (inputs.length > 0) {
		inputs.forEach(input => {
			input.pattern = pattern.pattern;
			input.setAttribute('data-accept', pattern.message);
			if (hasTooltip(input))
				setMessageTooltip(pattern, input);
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