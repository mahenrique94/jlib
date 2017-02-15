/** @auth Matheus Castiglioni
 *  Formatar inputs de acordo com suas máscaras, onde somente sera aceito a digitação da mesma
 */
const maskCelular = [
	['Celular', 10],
	[/([\d]{5})([\d])/, '$1-$2']
];
const maskCep = [
	['Cep', 9],
	[/([\d]{5})([\d])/, '$1-$2']
];
const maskCnpj = [
	['Cnpj', 18],
	[/([\d]{2})([\d])/, '$1.$2'],
	[/([\d]{3})([\d])/, '$1.$2'],
	[/([\d]{3})([\d])/, '$1/$2'],
	[/([\d]{4})([\d])/, '$1-$2']
];
const maskCpf = [
	['Cpf', 14],
	[/([\d]{3})([\d])/, '$1.$2'],
	[/([\d]{3})([\d])/, '$1.$2'],
	[/([\d]{3})([\d]{1,2})/, '$1-$2']
];
const maskCpfCnpj = [maskCpf, maskCnpj];
const maskData = [
	['Data', 10],
	[/([\d]{2})([\d])/, '$1/$2'],
	[/([\d]{2})([\d])/, '$1/$2']
];
const maskDataHora = [
	['DataHora', 12],
	[/([\d]{2})([\d])/, '$1/$2'],
	[/([\d]{2})([\d])/, '$1/$2'],
	[/([\d]{4})([\d])/, '$1 $2'],
	[/(\s[\d]{2})([\d])/, '$1:$2']
];
const maskHora = [
	['Hora', 5],
	[/([\d]{2})([\d])/, '$1:$2']
];
const maskTelefone = [
	['Telefone', 9],
	[/([\d]{4})([\d])/, '$1-$2']
];
const maskTelefoneCelular = [maskTelefone, maskCelular];

/** @auth Matheus Castiglioni
 *  Processa a mascara de cada input
 */
function mask(mask, input, event) {
	if((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 8) {
		if (Array.isArray(mask[1][0])) {
			if (input.value.length <= 14)
				masking(input, mask[0]);
			else
				masking(input, mask[1]);
		} else {
			masking(input, mask);
		}
	} else {
		event.preventDefault();
		event.stopPropagation();
	}
}

/** @auth Matheus Castiglioni
 *  Pega a mascara e formata o campo
 */
function masking(input, mask) {
	input.value = input.value.replace(/[\\.\-\\/]/g, '');
	for (let i = 1; i < mask.length; i++) {
		input.value = input.value.replace(mask[i][0], mask[i][1]);
	}
}