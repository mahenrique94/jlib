/** @auth Matheus Castiglioni
 *  Formatar inputs de acordo com suas máscaras, onde somente sera aceito a digitação da mesma
 */
const maskCelular = '#####-####';
const maskCep = '#####-###';
const maskCnpj = '##.###.###/####-##'
const maskCpf = '###.###.###-##';
const maskData = '##/##/####';
const maskDataHora = '##/##/#### ##:##';
const maskHora = '##:##';
const maskTelefone = '####-####';

function mask(mask, input, event) {
    let position = input.value.length;
    input.setAttribute('maxlength', mask.length);
    if(event.keyCode >= 48 && event.keyCode <= 57) {
        if (input.value.length < mask.length) {
            if (!mask.substring(position, position + 1).equals('#'))
                input.value += mask.charAt(position);
        }
    } else {
    	event.preventDefault();
    	event.stopPropagation();
    }
}