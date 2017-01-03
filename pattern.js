/** @auth Matheus Castiglioni
 *  Inserindo todos os possíveis valores para os patterns do HTML5, com isso é possível validar o formulário ao submete-lo
 */
document.addEventListener('DOMContentLoaded',function (event) {
	
	let patterns = [
		{name : 'letraNumero', pattern : "^([A-Z\\d]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros."},
		{name : 'letraNumeroMin4', pattern : "^([A-Z\\d]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e deve ter no minimo 4 caracteres."},
		{name : 'letraNumeroPonto', pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.)."},
		{name : 'numeric18-2', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com letras numeros ou ponto, a parte inteira aceita no máximo 18 digitos e a decimal no máximo 2."},
		{name : 'numeric18-4', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,4}))?)$", message : "O campo deve ser preenchido com letras numeros ou ponto, a parte inteira aceita no máximo 18 digitos e a decimal no máximo 4."},
		{name : 'numeric18-6', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,6}))?)$", message : "O campo deve ser preenchido com letras numeros ou ponto, a parte inteira aceita no máximo 18 digitos e a decimal no máximo 6."},
		{name : 'password', pattern : "^([A-Z0-9@-_\\.]{8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (@ - _ .)."},
		{name : 'data', pattern : '^(([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][7-9][0-9]+|[20][0-9]+))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA onde o ano deve ser maior que 1900'},
		{name : 'dataHora', pattern : '^(([0][1-9]|[1][0-9]|[2][0-9]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][0-9]+|[20][0-9]+)\\s([0][0-9]|[1][0-9]|[2][0-9]):([0][0-9]|[1][0-9]|[2][0-9]|[3][0-9]))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900'}
	];
	
	patterns.forEach(pattern => setPattern(pattern));
	
});

function setPattern(pattern) {
	let elements = $$(`input[pattern=${pattern.name}]`);
	if (elements.length > 0) {
		elements.forEach(element => {
			element.pattern = pattern.pattern;
			element.setAttribute('data-accept', pattern.message);
		});
	}
}