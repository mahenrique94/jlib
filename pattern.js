/** @auth Matheus Castiglioni
 *  Inserindo todos os possíveis valores para os patterns do HTML5, com isso é possível validar o formulário ao submete-lo
 */
document.addEventListener('DOMContentLoaded',function (event) {
	
	let patterns = [
		{name : 'cep', pattern : '^(([\\d]){5}([\\-])([\\d]{3}))$', message : 'O campo deve preenchido com um CEP no formato: #####-###'},
		{name : 'cnpj', pattern : '^(([\d]{2})\.([\d]{3})\.([\d]{3})\/([\d]{4})\-([\d]{2}))$', message : 'O campo deve preenchido com um CNPJ no formato: ##.###.###/####-##'},
		{name : 'cpf', pattern : '^(([\\d]{3})\\.([\\d]{3})\\.([\\d]{3})\\-([\\d]{2}))$', message : 'O campo deve preenchido com um CPF no formato: ###.###.###-##'},
		{name : 'cpfCnpj', pattern : '^((([\\d]{3})\\.([\\d]{3})\\.([\\d]{3})\\-([\\d]{2}))|(([\\d]{2})\\.([\\d]{3})\\.([\\d]{3})\\/([\\d]{4})\\-([\\d]{2})))$', message : 'O campo deve preenchido com um CPF ou CNPJ nos formatos: ###.###.###-## e ##.###.###/####-##'},
		{name : 'data', pattern : '^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][7-9][\\d]+|[20][\\d]+))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA onde o ano deve ser maior que 1900'},
		{name : 'dataHora', pattern : '^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][\\d]+|[20][\\d]+)\\s([0][\\d]|[1][\\d]|[2][\\d]):([0][\\d]|[1][\\d]|[2][\\d]|[3][\\d]))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900'},
		{name : 'entradaSaida', pattern : "^([E|S])$", message : "O campo deve ser preenchido com uma letra MAIUSCULA informando E para entrada ou S para saida."},
		{name : 'espacoLetraBarraPonto', pattern : "^(([A-Z\\.\\/])+(\\s[A-Z\\.\\/]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. /)."},
		{name : 'espacoLetraMin3', pattern : "^(([A-Z])(\\s[A-Z])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS contendo no minimo 3 caracteres."},
		{name : 'espacoLetraNumero', pattern : "^(([A-Z\\d])+(\\s[A-Z\\d]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros."},
		{name : 'espacoLetraNumeroMin4', pattern : "^(([A-Z\\d])(\\s[A-Z\\d])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros contendo no minimo 4 caracteres."},
		{name : 'espacoLetraNumeroBarraMaiorMenorParentesesPontoTracoVirgula', pattern : "^(([A-Z\\d\\.\\/\\-,><()])+(\\s[A-Z\\d\\.\\/\\-,><()]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - / , > < ( ))."},
		{name : 'espacoLetraNumeroBarraPontoTraco', pattern : "^(([A-Z\\d\\.\\/\\-])+(\\s[A-Z\\d\\.\\/\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /)."},
		{name : 'espacoLetraNumeroBarraPontoTracoVirgula', pattern : "^(([A-Z\\d\\.\\/\\-,])+(\\s[A-Z\\d\\.\\/\\-,]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - / ,)."},
		{name : 'espacoLetraNumeroPonto', pattern : "^(([A-Z\\d\\.])+(\\s[A-Z\\d\\.]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.)."},
		{name : 'espacoLetraNumeroPontoMin2', pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){2,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 2 caracteres."},
		{name : 'espacoLetraPontoTracoBarraMin4', pattern : "^(([A-Z\\.\\-\\/])(\\s[A-Z\\.\\-\\/])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS e aceita os seguintes caracteres especiais: (. - /) contendo no minimo 4 caracteres."},
		{name : 'espacoLetraPontoTracoMin4', pattern : "^(([A-Z\\.\\-])(\\s[A-Z\\.\\-])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS e aceita os seguintes caracteres especiais: (. -) contendo no minimo 4 caracteres."},
		{name : 'estado', pattern : '^([AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO|EX]{2})$', message : 'O campo deve preenchido com a sigla de um estado brasileiro em MAIUSCULO ou com EX para informar exportacao.'},
		{name : 'modulo', pattern : "^([ARM|COM|EXP|FIN|FRO|SUP]{3})$", message : "O campo deve ser preenchido com os seguintes modulos: ARM(Armazem), COM(Compras), EXP(Expedicao), FIN(Financeiro), FRO(Frota) ou SUP(Suprimento)."},
		{name : 'modulos', pattern : "^([ACEFRS]*)$", message : "O campo deve ser preenchido com as seguintes letras: A(Armazem), C(Compras), E(Expedicao), F(Financeiro), R(Frota) ou S(Suprimento)."},
		{name : 'letraNumero', pattern : "^([A-Z\\d]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos."},
		{name : 'letraNumeroMin2', pattern : "^([A-Z\\d]{2,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo no minimo 4 caracteres."},
		{name : 'letraNumeroMin4', pattern : "^([A-Z\\d]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo no minimo 4 caracteres."},
		{name : 'letraNumeroPonto', pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
		{name : 'letraNumeroPontoMin2', pattern : "^([A-Z\\d\\.]){2,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
		{name : 'number0to9', pattern : "^([\\d]+)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9."},
		{name : 'numberMinus0to9', pattern : "^(([-1]*)|([0-9])*)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9 ou -1."},
		{name : 'numberMinus1to9', pattern : "^(([-1]*)|([1-9])*)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 1 a 9 ou -1."},
		{name : 'numeric18-2', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 2."},
		{name : 'numeric18-4', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,4}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 4."},
		{name : 'numeric18-6', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,6}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 6."},
		{name : 'password', pattern : "^([A-Z\\d@-_\\.]{8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."},
		{name : 'textareaEspacoLetraNumeroBarraPontoTracoVirgula', pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."},
		{name : 'tipoMunicipio', pattern : "^([MR])$", message : "O campo deve ser preenchido apenas com M(Municipio) ou R(Regiao)."}
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