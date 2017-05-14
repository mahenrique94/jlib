/** @auth Matheus Castiglioni
 *  Formatar inputs de acordo com suas máscaras, onde somente sera aceito a digitação da mesma
 */
const maskCelular = [
	[/([\d]{5})([\d])/, "$1-$2"]
];
const maskCep = [
	[/([\d]{5})([\d])/, "$1-$2"]
];
const maskCnpj = [
	[/([\d]{2})([\d])/, "$1.$2"],
	[/([\d]{3})([\d])/, "$1.$2"],
	[/([\d]{3})([\d])/, "$1/$2"],
	[/([\d]{4})([\d])/, "$1-$2"]
];
const maskCpf = [
	[/([\d]{3})([\d])/, "$1.$2"],
	[/([\d]{3})([\d])/, "$1.$2"],
	[/([\d]{3})([\d]{1,2})/, "$1-$2"]
];
const maskCpfCnpj = [maskCpf, maskCnpj];
const maskData = [
	[/([\d]{2})([\d])/, "$1/$2"],
	[/([\d]{2})([\d])/, "$1/$2"]
];
const maskDataHora = [
	[/([\d]{2})([\d])/, "$1/$2"],
	[/([\d]{2})([\d])/, "$1/$2"],
	[/([\d]{4})([\d])/, "$1 $2"],
	[/(\s[\d]{2})([\d])/, "$1:$2"]
];
const maskHora = [
	[/([\d]{2})([\d])/, "$1:$2"]
];
const maskTelefone = [
	[/([\d]{4})([\d])/, "$1-$2"]
];
const maskTelefoneCelular = [maskTelefone, maskCelular];

/** @auth Matheus Castiglioni
 *  Processa a mascara de cada input
 */
function mask(mask, input, event) {
	if((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8) {
		if (Array.isArray(mask[0][0])) {
			if (input.value.length <= 14)
				masking(input, mask[0]);
			else
				masking(input, mask[1]);
		} else {
			masking(input, mask);
		}
	}
}

/** @auth Matheus Castiglioni
 *  Pega a mascara e formata o campo
 */
function masking(input, mask) {
	input.value = input.value.replace(/[\\.\-\\/]/g, "");
	for (let i = 0; i < mask.length; i++) {
		input.value = input.value.replace(mask[i][0], mask[i][1]);
	}
}

/** @auth Matheus Castiglioni
 *  Verifica se a tecla digitada é um dígito, BACKSPACE ou TAB
 */
function checkMask(event) {
	// Devido a diferença de keyCode entre CHROME e FIREFOX tive que usar KEY no lugar de KEYCODE
	let keyCode = parseInt(event.key);
	if(!((keyCode >= 0 && keyCode <= 9) || event.key.toLowerCase().equals("backspace") || event.key.toLowerCase().equals("tab"))) {
		event.preventDefault();
		event.stopPropagation();
	}
}