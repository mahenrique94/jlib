/** @auth Matheus Castiglioni
 *  Inserindo todos os possíveis valores para os patterns do HTML5, com isso é possível validar o formulário ao submete-lo
 */
document.addEventListener('DOMContentLoaded', function(event) {
	
	let patterns = [
		{name : 'cep', pattern : '^(([\\d]){5}([\\-])([\\d]{3}))$', message : 'O campo deve preenchido com um CEP no formato: #####-###.'},
		{name : 'cnpj', pattern : '^(([\\d]{2})\\.([\\d]{3})\\.([\\d]{3})\\/([\\d]{4})-([\\d]{2}))$', message : 'O campo deve preenchido com um CNPJ no formato: ##.###.###/####-##'},
		{name : 'contabil', pattern : '^([.\\d]{1,60})$', message : 'O campo deve preenchido com numeros ou pontos contendo no minimo 1 caracter.'},
		{name : 'cpf', pattern : '^(([\\d]{3})\\.([\\d]{3})\\.([\\d]{3})\\-([\\d]{2}))$', message : 'O campo deve preenchido com um CPF no formato: ###.###.###-##'},
		{name : 'cpfCnpj', pattern : '^((([\\d]{3})\\.([\\d]{3})\\.([\\d]{3})\\-([\\d]{2}))|(([\\d]{2})\\.([\\d]{3})\\.([\\d]{3})\\/([\\d]{4})\\-([\\d]{2})))$', message : 'O campo deve preenchido com um CPF ou CNPJ nos formatos: ###.###.###-## e ##.###.###/####-##'},
		{name : 'cst', pattern : '^([\\d]{3})$', message : 'O campo deve preenchido com uma situacao tributaria contendo no maximo 3 caracteres'},
		{name : 'data', pattern : '^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][7-9][\\d]+|[20][\\d]+))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA onde o ano deve ser maior que 1900'},
		{name : 'dataHora', pattern : '^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])\\/([0][1-9]|[1][0-2])\\/([19][\\d]+|[20][\\d]+)\\s([0][\\d]|[1][\\d]|[2][\\d]):([0][\\d]|[1][\\d]|[2][\\d]|[3][\\d]))$', message : 'O campo deve preenchido com uma data no formato: DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900'},
		{name : 'inscricao', pattern : "^(([\\d\\.\\-])*([ISENTO]{6})*([NAO CONTRIBUINTE]*))$", message : "O campo deve ser preenchido com uma inscrição válida, caso não possua informar ISENTO."},
		{name : 'email', pattern : "^(([A-Z\\d\\w]+)([@])([A-Z]+)([\\.])([A-Z]+)(([\\.])([A-Z])+)*)$", message : "O campo deve ser preenchido com um email válido aceitando apenas letras MAIUSCULAS, NUMEROS, PONTOS E UNDERLINES."},
		{name : 'entradaSaida', pattern : "^([E|S])$", message : "O campo deve ser preenchido com uma letra MAIUSCULA informando E para entrada ou S para saida."},
		{name : 'espacoLetraBarraPonto', pattern : "^(([A-Z\\.\\/])+(\\s[A-Z\\.\\/]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. /)."},
		{name : 'espacoLetraMin3', pattern : "^(([A-Z])(\\s[A-Z])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS contendo no minimo 3 caracteres."},
		{name : 'espacoLetraMin4', pattern : "^(([A-Z])(\\s[A-Z])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS contendo no minimo 4 caracteres."},
		{name : 'espacoLetraNumero', pattern : "^(([A-Z\\d])+(\\s[A-Z\\d]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros."},
		{name : 'espacoLetraNumeroMin4', pattern : "^(([A-Z\\d])(\\s[A-Z\\d])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros contendo no minimo 4 caracteres."},
		{name : 'espacoLetraNumeroBarraMaiorMenorParentesesPontoTracoVirgula', pattern : "^(([A-Z\\d\\.\\/\\-,><()])+(\\s[A-Z\\d\\.\\/\\-,><()]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - / , > < ( ))."},
		{name : 'espacoLetraNumeroBarraPontoTraco', pattern : "^(([A-Z\\d\\.\\/\\-])+(\\s[A-Z\\d\\.\\/\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /)."},
		{name : 'espacoLetraNumeroBarraPontoTracoMin4', pattern : "^(([A-Z\\d\\.\\/\\-])(\\s[A-Z\\d\\.\\/\\-])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /) contendo no minimo 4 caracteres."},
		{name : 'espacoLetraNumeroBarraPontoTracoVirgula', pattern : "^(([A-Z\\d\\.\\/\\-,])+(\\s[A-Z\\d\\.\\/\\-,]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - / ,)."},
		{name : 'espacoLetraNumeroPonto', pattern : "^(([A-Z\\d\\.])+(\\s[A-Z\\d\\.]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.)."},
		{name : 'espacoLetraNumeroPontoMin2', pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){2,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 2 caracteres."},
		{name : 'espacoLetraNumeroPontoMin3', pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 3 caracteres."},
		{name : 'espacoLetraNumeroPontoMin4', pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 4 caracteres."},
		{name : 'espacoLetraNumeroPontoTraco', pattern : "^(([A-Z\\d\\.\\-])+(\\s[A-Z\\d\\.\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. ,)."},
		{name : 'espacoLetraNumeroPontoVirgula', pattern : "^(([A-Z\\d\\.,])+(\\s[A-Z\\d\\.,]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. ,)."},
		{name : 'espacoLetraPontoTracoBarraMin4', pattern : "^(([A-Z\\.\\-\\/])(\\s[A-Z\\.\\-\\/])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS e aceita os seguintes caracteres especiais: (. - /) contendo no minimo 4 caracteres."},
		{name : 'espacoLetraPontoTracoMin4', pattern : "^(([A-Z\\.\\-])(\\s[A-Z\\.\\-])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS e aceita os seguintes caracteres especiais: (. -) contendo no minimo 4 caracteres."},
		{name : 'estado', pattern : '^([AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO|EX]{2})$', message : 'O campo deve preenchido com a sigla de um estado brasileiro em MAIUSCULO ou com EX para informar exportacao.'},
		{name : 'modulo', pattern : "^([ARM|COM|EXP|FIN|FRO|SUP]{3})$", message : "O campo deve ser preenchido com os seguintes modulos: ARM(Armazem), COM(Compras), EXP(Expedicao), FIN(Financeiro), FRO(Frota) ou SUP(Suprimento)."},
		{name : 'modulos', pattern : "^([ACEFRS]*)$", message : "O campo deve ser preenchido com as seguintes letras: A(Armazem), C(Compras), E(Expedicao), F(Financeiro), R(Frota) ou S(Suprimento)."},
		{name : 'municipio', pattern : "^(([A-Z\\'])+(\\s[A-Z\\']+)*)$", message : "O campo deve ser preenchido com letras MAISCULAS e aceita os seguintes caracteres especiais: (')."},
		{name : 'letraMin4', pattern : "^(([A-Z]){4,}$", message : "O campo deve ser preenchido apenas letras MAIUSCULAS contendo no minimo 4 caracteres."},
		{name : 'letraNumeroBarraTraco', pattern : "^([A-Z\\d\\/\\-]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (/ -)."},
		{name : 'letraNumeroMin2', pattern : "^([A-Z\\d]{2,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo no minimo 4 caracteres."},
		{name : 'letraNumeroMin4', pattern : "^([A-Z\\d]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo no minimo 4 caracteres."},
		{name : 'letraNumeroPonto', pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
		{name : 'letraNumeroPontoMin2', pattern : "^([A-Z\\d\\.]){2,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
		{name : 'number0to9', pattern : "^([\\d]+)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9."},
		{name : 'number1to9', pattern : "^([1-9]+)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 1 a 9."},
		{name : 'numberMinus0to9', pattern : "^(([-1]*)|([0-9])*)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9 ou -1."},
		{name : 'numberMinus1to9', pattern : "^(([-1]*)|([1-9])*)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 1 a 9 ou -1."},
		{name : 'numeric18-2', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 2."},
		{name : 'numeric18-4', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,4}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 4."},
		{name : 'numeric18-6', pattern : "^(([\\d]{1,18})(\\.([\\d]{1,6}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 6."},
		{name : 'numeroEndereco', pattern : "^(([A-Z\\d])*([S\\/N])*)$", message : "O campo deve ser preenchido com numeros ou letras referente a um endereço, caso não possua numero informar S/N(Sem Numero)."},
		{name : 'numeroPontoTraco', pattern : "^([\\d\\.\\-]*)$", message : "O campo deve ser preenchido com numeros, pontos ou tracos."},
		{name : 'password', pattern : "^([A-Z\\d@-_\\.]{8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .) contendo 8 caracteres."},
		{name : 'site', pattern : "^((([h][t][t][p])([:])([\\/]{2}))([www]{3}|[a-z]*)([\\.])([a-z]*)([\\.])([a-z]+)([\\.a-z]*))$", message : "O campo deve ser preenchido com um site valido em MAISCULO, o site deve comecar com HTTP:// seguido por www ou subdominio e o restante do site."},
		{name : 'telefone', pattern : "^(([\\d]{4})([\\-])([\\d{4}])*)$", message : "O campo deve ser preenchido com um telefone no formato: ####-####."},
		{name : 'textareaEspacoLetraNumeroBarraPontoTracoVirgula', pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."},
		{name : 'tipoMunicipio', pattern : "^([MR])$", message : "O campo deve ser preenchido apenas com M(Municipio) ou R(Regiao)."},
		{name : 'user', pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."}
	];
	
	patterns.forEach(pattern => setPattern(pattern));
	
});

/** @auth Matheus Castiglioni
 *  Setando o pattern para cada input de acordo com o seu nome 
 */
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

/** @auth Matheus Castiglioni
 *  Verificando se o input tem tooltip 
 */
function hasTooltip(element) {
	return element.parentNode.classList.contains('o-form__tooltip');
}

/** @auth Matheus Castiglioni
 *  Setando a mensagem para ser informado no tooltip 
 */
function setMessageTooltip(pattern, input) {
	let tooltip = input.parentNode.find('[class*=o-tooltip]');
	tooltip.innerHTML = `${pattern.message}<br/>${buildMessageFromInput(input)}`;
}

/** @auth Matheus Castiglioni
 *  Pegando intervalos de preenchimento de acordo definido nos elementos
 *  Strings: maxlength e minlength
 *  Numbers e Date: min e max 
 */
function buildMessageFromInput(input) {
	if (input.type.equals('number'))
		return `Intervalo: ${input.getAttribute('min')} a ${input.getAttribute('max')}.`;
	return `Intervalo: ${input.getAttribute('minlength')} a ${input.getAttribute('maxlength')} caracteres.`;
}