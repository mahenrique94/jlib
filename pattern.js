/** @auth Matheus Castiglioni
 *  Inserindo todos os possíveis valores para os patterns do HTML5, com isso é possível validar o formulário ao submete-lo
 */
document.addEventListener("DOMContentLoaded", function(event) {
	
	const patterns = [
		{name : "ano", pattern : "^([\\d]{4})$", message : "O campo deve ser preenchido com um ano válido entre: 1900 á 2100 no formato ####"},
		{name : "cep", pattern : "^(([\\d]){5}([\\-])([\\d]{3}))$", message : "O campo deve ser preenchido com um CEP no formato: #####-###."},
		{name : "celular", pattern : "^(([\\d]{5})([\\-])([\\d]{4}))$", message : "O campo deve ser preenchido com um CELULAR no formato: ######-####."},
		{name : "chave", pattern : "^([\\d]){44}$", message : "O campo deve ser preenchido com uma CHAVE numerica contendo 44 digitos."},
		{name : "cnh", pattern : "^([\\d]{11})$", message : "O campo deve ser preenchido com uma CNH no formato: ###########."},
		{name : "cnpj", pattern : "^(([\\d]{2})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\/])([\\d]{4})([\\-])([\\d]{2}))$", message : "O campo deve ser preenchido com um CNPJ no formato: ##.###.###/####-##"},
		{name : "contabil", pattern : "^([.\\d]{1,60})$", message : "O campo deve ser preenchido com numeros ou pontos contendo no minimo 1 caracter."},
		{name : "cpf", pattern : "^(([\\d]{3})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\-])([\\d]{2}))$", message : "O campo deve ser preenchido com um CPF no formato: ###.###.###-##"},
		{name : "cpfCnpj", pattern : "^((([\\d]{3})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\-])([\\d]{2}))|(([\\d]{2})([\\.])([\\d]{3})([\\.])([\\d]{3})([\\/])([\\d]{4})([\\-])([\\d]{2})))$", message : "O campo deve ser preenchido com um CPF ou CNPJ nos formatos: ###.###.###-## e ##.###.###/####-##"},
		{name : "cst", pattern : "^([\\d]{3})$", message : "O campo deve ser preenchido com uma situacao tributaria contendo no maximo 3 caracteres"},
		{name : "data", pattern : "^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])([\\/])([0][1-9]|[1][0-2])([\\/])([1][9][\\d]{2}|[2][0][\\d]{2}))$", message : "O campo deve ser preenchido com uma data no formato: DD/MM/AAAA onde o ano deve ser maior que 1900"},
		{name : "dataHora", pattern : "^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])([\\/])([0][1-9]|[1][0-2])([\\/])([1][9][\\d]{2}|[2][0][\\d]{2})([\\s])([0][\\d]|[1][\\d]|[2][\\d])([:])([0-5][\\d]))$", message : "O campo deve ser preenchido com uma data no formato: DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900"},
		{name : "dataHoraOpcional", pattern : "^(([0][1-9]|[1][\\d]|[2][\\d]|[3][0-1])([\\/])([0][1-9]|[1][0-2])([\\/])([1][9][\\d]{2}|[2][0][\\d]{2})(\\s([0][\\d]|[1][\\d]|[2][\\d])([:])([0-5][\\d]))?)$", message : "O campo deve ser preenchido com uma data no formato: DD/MM/AAAA ou DD/MM/AAAA HH:MM onde o ano deve ser maior que 1900"},
		{name : "ddd", pattern : "^([\\d]{2})$", message : "O campo deve ser preenchido com um DDD contendo dois digitos."},
		{name : "desdobramento", pattern : "^(([\\d]+)([\\/])([\\d]+))$", message : "O campo deve ser preenchido com um desdobramento no formato: 0-9/0-9."},
		{name : "email", pattern : "^(([aA-zZ\\d\\w\\.]+)([@])([\\daA-zZ]+)([\\.])([aA-zZ]+)(([\\.])([aA-zZ])+)*)$", message : "O campo deve ser preenchido com um email válido aceitando apenas letras MAIUSCULAS, NUMEROS, PONTOS E UNDERLINES."},
		{name : "entradaSaida", pattern : "^([E|S])$", message : "O campo deve ser preenchido com uma letra MAIUSCULA informando E para entrada ou S para saida."},
		{name : "espacoLetra", pattern : "^(([A-Z])+(\\s[A-Z]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS."},
		{name : "espacoLetraBarraPonto", pattern : "^(([A-Z\\.\\/])+(\\s[A-Z\\.\\/]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. /)."},
		{name : "espacoLetraMin3", pattern : "^(([A-Z])(\\s[A-Z])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS contendo no minimo 3 caracteres."},
		{name : "espacoLetraMin4", pattern : "^(([A-Z])(\\s[A-Z])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS contendo no minimo 4 caracteres."},
		{name : "espacoLetraNumero", pattern : "^(([A-Z\\d])+(\\s[A-Z\\d]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros."},
		{name : "espacoLetraNumeroMin4", pattern : "^(([A-Z\\d])(\\s[A-Z\\d])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros contendo no minimo 4 caracteres."},
		{name : "espacoLetraNumeroBarraMaiorMenorParentesesPontoTracoVirgula", pattern : "^(([A-Z\\d\\.\\/\\-,><()])+(\\s[A-Z\\d\\.\\/\\-,><()]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - / , > < ( ))."},
		{name : "espacoLetraNumeroBarraMaisTraco", pattern : "^(([A-Z\\d\\/\\-\\+])+(\\s[A-Z\\d\\/\\-\\+]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (- / +)."},
		{name : "espacoLetraNumeroBarraPontoTraco", pattern : "^(([A-Z\\d\\.\\/\\-])+(\\s[A-Z\\d\\.\\/\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /)."},
		{name : "espacoLetraNumeroBarraPontoTracoMin4", pattern : "^(([A-Z\\d\\.\\/\\-])(\\s[A-Z\\d\\.\\/\\-])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - /) contendo no minimo 4 caracteres."},
		{name : "espacoLetraNumeroBarraPontoTracoVirgula", pattern : "^(([A-Z\\d\\.\\/\\-,])+(\\s[A-Z\\d\\.\\/\\-,]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. - / ,)."},
		{name : "espacoLetraNumeroPonto", pattern : "^(([A-Z\\d\\.])+(\\s[A-Z\\d\\.]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.)."},
		{name : "espacoLetraNumeroPontoMin2", pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){2,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 2 caracteres."},
		{name : "espacoLetraNumeroPontoMin3", pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 3 caracteres."},
		{name : "espacoLetraNumeroPontoMin4", pattern : "^(([A-Z\\d\\.])(\\s[A-Z\\d\\.])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (.) contendo no minimo 4 caracteres."},
		{name : "espacoLetraNumeroPontoTraco", pattern : "^(([A-Z\\d\\.\\-])+(\\s[A-Z\\d\\.\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. -)."},
		{name : "espacoLetraNumeroPontoTracoMin3", pattern : "^(([A-Z\\d\\.\\-])(\\s[A-Z\\d\\.\\-])*){3,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. -) contendo no minimo 3 caracteres."},
		{name : "espacoLetraNumeroPontoVirgula", pattern : "^(([A-Z\\d\\.,])+(\\s[A-Z\\d\\.,]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais: (. ,)."},
		{name : "espacoLetraNumeroTraco", pattern : "^(([A-Z\\d\\-])+(\\s[A-Z\\d\\-]+)*)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros e aceita os seguintes caracteres especiais (-)."},
		{name : "espacoLetraPontoTracoBarraMin4", pattern : "^(([A-Z\\.\\-\\/])(\\s[A-Z\\.\\-\\/])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS e aceita os seguintes caracteres especiais: (. - /) contendo no minimo 4 caracteres."},
		{name : "espacoLetraPontoTracoMin4", pattern : "^(([A-Z\\.\\-])(\\s[A-Z\\.\\-])*){4,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS e aceita os seguintes caracteres especiais: (. -) contendo no minimo 4 caracteres."},
		{name : "estado", pattern : "^([AC|AL|AP|AM|BA|CE|DF|ES|GO|MA|MT|MS|MG|PA|PB|PR|PE|PI|RJ|RN|RS|RO|RR|SC|SP|SE|TO|EX]{2})$", message : "O campo deve preenchido com a sigla de um estado brasileiro em MAIUSCULO ou com EX para informar exportacao."},
		{name : "hora", pattern : "^(([0][\\d]|[1][\\d]|[2][\\d])([:])([0-5][\\d]))$", message : "O campo deve preenchido com uma hora no formato ##:##."},
		{name : "icone", pattern : "^(([iI][cC][oO][nN])([\\-])([\\daA-zZ\\-])+)$", message : "O campo deve ser preenchido com um icone valido, sempre comecando com ICON-XXXX."},
		{name : "imagem", pattern : "^((([hH][tT][tT][pP])([:])([\\/]{2}))([wW]{3}|[aA-zZ]*)([\\.])([aA-zZ]*)([\\.])([aA-zZ]+)([\\.aA-zZ]*))$", message : "O campo deve ser preenchido com o nome de uma imagem com um dos seguintes formatos: (JPEG, JPG ou PNG)."},
		{name : "inscricao", pattern : "^(([\\d\\.\\-]+)|([I][S][E][N][T][O])|([N][A][O][\\s][C][O][N][T][R][I][B][U][I][N][T][E]))$", message : "O campo deve ser preenchido com uma inscricao valida, caso nao possua, informar ISENTO ou NAO CONTRIBUINTE."},
		{name : "letra", pattern : "^([A-Z]*)$", message : "O campo deve ser preenchido apenas letras MAIUSCULAS."},
		{name : "letraMin1Max1", pattern : "^([A-Z]{1})$", message : "O campo deve ser preenchido apenas com uma letra MAIUSCULA."},
		{name : "letraMin4", pattern : "^([A-Z]){4,}$", message : "O campo deve ser preenchido apenas letras MAIUSCULAS contendo no minimo 4 caracteres."},
		{name : "letraNumero", pattern : "^([A-Z\\d]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos."},
		{name : "letraNumeroBarraPonto", pattern : "^([A-Z\\d\\/\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (/ .)."},
		{name : "letraNumeroBarraPontoTraco", pattern : "^([A-Z\\d\\/\\.\\-]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (/ . -)."},
		{name : "letraNumeroBarraTraco", pattern : "^([A-Z\\d\\/\\-]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (/ -)."},
		{name : "letraNumeroMin2", pattern : "^([A-Z\\d]{2,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo no minimo 2 caracteres."},
		{name : "letraNumeroMin4", pattern : "^([A-Z\\d]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo no minimo 4 caracteres."},
		{name : "letraNumeroMin8Max8", pattern : "^([A-Z\\d]{8,8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e contendo 8 caracteres."},
		{name : "letraNumeroPonto", pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
		{name : "letraNumeroPontoTraco", pattern : "^([A-Z\\d\\.\\-]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (. -)."},
		{name : "letraNumeroPontoMin2", pattern : "^([A-Z\\d\\.]){2,}$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."},
		{name : "modulo", pattern : "^(([A][R][M])|([C][O][M])|([E][X][P])|([F][I][N])|([F][R][O])|([S][U][P]))$", message : "O campo deve ser preenchido com os seguintes modulos: ARM(Armazem), COM(Compras), EXP(Expedicao), FIN(Financeiro), FRO(Frota) ou SUP(Suprimento)."},
		{name : "modulos", pattern : "^([ACEFRS]*)$", message : "O campo deve ser preenchido com as seguintes letras: A(Armazem), C(Compras), E(Expedicao), F(Financeiro), R(Frota) ou S(Suprimento)."},
		{name : "municipio", pattern : "^(([A-Z\\'])+(\\s[A-Z\\']+)*)$", message : "O campo deve ser preenchido com letras MAISCULAS e aceita os seguintes caracteres especiais: (')."},
		{name : "number0to9", pattern : "^([\\d]+)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9."},
		{name : "number0to9With4", pattern : "^([\\d]){4}$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9 e contendo 4 digitos inteiros."},
		{name : "number1to9", pattern : "^([1-9]+)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 1 a 9."},
		{name : "numberMinus0to9", pattern : "^(([-1]*)|([0-9])*)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 0 a 9 ou -1."},
		{name : "numberMinus1to9", pattern : "^(([-1]*)|([1-9])*)$", message : "O campo deve ser preenchido com apenas numeros inteiros de 1 a 9 ou -1."},
		{name : "numeric3-2", pattern : "^(([\\d]{1,3})(\\,([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 3 digitos e a decimal no maximo 2."},
		{name : "numeric5-2", pattern : "^(([\\d]{1,5})(\\,([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 5 digitos e a decimal no maximo 2."},
		{name : "numeric10-2", pattern : "^(([\\d]{1,10})(\\,([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 2."},
		{name : "numeric18-2", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,2}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 2."},
		{name : "numeric18-3", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,3}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 3."},
		{name : "numeric18-4", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,4}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 4."},
		{name : "numeric18-6", pattern : "^(([\\d]{1,18})(\\,([\\d]{1,6}))?)$", message : "O campo deve ser preenchido com numeros ou ponto, a parte inteira aceita no maximo 18 digitos e a decimal no maximo 6."},
		{name : "numeroEndereco", pattern : "^(([A-Z\\d])*([S\\/N])*)$", message : "O campo deve ser preenchido com numeros ou letras referente a um endereço, caso não possua numero informar S/N(Sem Numero)."},
		{name : "numeroPontoTraco", pattern : "^([\\d\\.\\-]*)$", message : "O campo deve ser preenchido com numeros, pontos ou tracos."},
		{name : "numeroTraco", pattern : "^([\\d\\-]*)$", message : "O campo deve ser preenchido com numeros ou tracos."},
		{name : "password", pattern : "^([A-Z\\d@-_\\.]{8})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .) contendo 8 caracteres."},
		{name : "path", pattern : "^((([aA-zZ][:][\\/])|([\\/]))([0-9aA-zZ]+)([\\-\\/0-9aA-zZ]*))", message : "O campo deve ser preenchido com um caminho de pasta e aceita os seguintes caracteres especiais: (- _)."},
		{name : "pis", pattern : "^(([\\d]{3})([\\.])([\\d]{5})([\\.])([\\d]{2})([\\-])([\\d]))$", message : "O campo deve ser preenchido com PIS no formato: ###.#####.##-#."},
		{name : "site", pattern : "^((([hH][tY][tY][pP])([:])([\\/]{2}))([wW]{3}|[aA-zZ]*)([\\.])([aA-zZ]*)([\\.])([aA-zZ]+)([\\.aA-zZ]*))$", message : "O campo deve ser preenchido com um site valido em MAISCULO, o site deve comecar com HTTP:// seguido por www ou subdominio e o restante do site."},
		{name : "telefone", pattern : "^(([\\d]{4})([\\-])([\\d]{4}))$", message : "O campo deve ser preenchido com um telefone no formato: ####-####."},
		{name : "textarea", pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."},
		{name : "textareaEspacoLetraNumeroBarraPontoTracoVirgula", pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .)."},
		{name : "textareaMin4", pattern : "^([A-Z\\d\\s\\.\\/\\-\\,]{4,})$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (@ - _ .) contendo no minimo 4 caracteres."},
		{name : "tipoMunicipio", pattern : "^([MR])$", message : "O campo deve ser preenchido apenas com M(Municipio) ou R(Regiao)."},
		{name : "tipoCNH", pattern : "^(([A])|([B])|([C])|([D])|([E])|([A][B])|([A][C])|([A][D])|([A][E]))$", message : "O campo deve ser preenchido com letras referente a carta de habilitacao."},
		{name : "unidadeMedida", pattern : "^(([B][G])|([B][O])|([C][X])|([F][D])|([G][R])|([J][G])|([K][G])|([L][T])|([P][C])|([P][R])|([P][T])|([R][E])|([S][K])|([T][O])|([U][N]))$", message : "O campo deve ser preenchido com uma unidade de medida válida contendo dois caracteres."},
		{name : "user", pattern : "^([A-Z\\d\\.]+)$", message : "O campo deve ser preenchido com letras MAIUSCULAS ou numeros sem espacos e aceita os seguintes caracteres especiais: (.)."}
	];
	
	patterns.forEach(pattern => setPattern(pattern));
	
});

/** @auth Matheus Castiglioni
 *  Setando o pattern para cada input de acordo com o seu nome 
 */
function setPattern(pattern) {
	const elements = $$(`[pattern=${pattern.name}]`);
	if (elements.length > 0) {
		elements.forEach(element => {
			element.setAttribute("pattern", pattern.pattern);
			element.setAttribute("data-accept", pattern.message);
			if (hasTooltip(element))
				setMessageTooltip(pattern, element);
		});
	}
}

/** @auth Matheus Castiglioni
 *  Verificando se o input tem tooltip 
 */
const hasTooltip = element => element.parentNode.classList.contains("o-form__tooltip");

/** @auth Matheus Castiglioni
 *  Setando a mensagem para ser informado no tooltip 
 */
function setMessageTooltip(pattern, input) {
	const tooltip = input.parentNode.querySelector("[class*=o-tooltip]");
	tooltip.innerHTML = `${pattern.message}<br/>${buildMessageFromInput(input)}`;
}

/** @auth Matheus Castiglioni
 *  Pegando intervalos de preenchimento de acordo definido nos elementos
 *  Strings: maxlength e minlength
 *  Numbers e Date: min e max 
 */
function buildMessageFromInput(input) {
	if (input.type === "number")
		return `Intervalo: ${input.getAttribute("min")} a ${input.getAttribute("max")}.`;
	return `Intervalo: ${input.getAttribute("minlength")} a ${input.getAttribute("maxlength")} caracteres.`;
}