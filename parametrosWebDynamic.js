/** @auth Matheus Castiglioni
 *  Adicionar parâmetros dinamicamente nas telas de pesquisa
 */
document.addEventListener('DOMContentLoaded', function(event) {
	
	parametrosWebDynamic();
	
});

/** @auth Matheus Castiglioni
 *  Adicionar parâmetros dinamicamente nas telas de pesquisa
 */
function parametrosWebDynamic() {
	let row = $('[class*=o-navbar] .l-row:last-child');
	if (row != undefined) {
		let lastCol = row.find('[class*=u-grid]:last-child');
		row.classList.add('o-dynamic');
		row.style.position = 'relative';
		lastCol.style.marginRight = 0;
		row.appendChild(createDynamicButtonPlus());
	}
}

/** @auth Matheus Castiglioni
 *  Função responsável por criar um botão onde será para adicionar novos parâmetros ou remove-los
 */
function createDynamicButton() {
	let button = document.createElement('BUTTON');
	button.setAttribute('type', 'button');
	button.setAttribute('role', 'button');
	return button;
}

/** @auth Matheus Castiglioni
 *  Função responsável por criar um botão para adicionar parâmetros
 */
function createDynamicButtonPlus() {
	let button = createDynamicButton();
	button.classList.add('o-dynamic__button--clone');
	button.setAttribute('onclick', 'cloneRow(this);');
	button.appendChild(createDynamicIcon('plus'));
	return button;
}

/** @auth Matheus Castiglioni
 *  Função responsável por criar um botão para remover parâmetros
 */
function createDynamicButtonMinus() {
	let button = createDynamicButton();
	button.setAttribute('onclick', 'deleteRow(this);');
	button.classList.add('o-dynamic__button--delete');
	button.appendChild(createDynamicIcon('minus'));
	return button;
}

/** @auth Matheus Castiglioni
 *  Função responsável por criar o ícone do botão, seja ele + ou -
 */
function createDynamicIcon(clazz) {
	let icon = document.createElement('I');
	icon.classList.add(`icon-${clazz}`);
	return icon;
}

/** @auth Matheus Castiglioni
 *  Função responsável por incrementar o índice do @ParametrosWeb
 */
function regexName(obj) {
	let regex = new RegExp('[\\d]', 'g');
	let indice = regex.exec(obj.name);
	obj.name = obj.name.replace(regex, parseInt(indice[0]) + 1);
}

/** @auth Matheus Castiglioni
 *  Função responsável por clonar a linha com SELECT e INPUT para informar novos parâmetros
 */
function cloneRow(obj) {
	let band = obj.parentNode.parentNode;
	let row = obj.parentNode;
	let rowCloned = row.cloneNode(true);
	let elementsCloned = rowCloned.findAll('input, select');
	elementsCloned.forEach(element => {
		if (element.nodeName.equals('INPUT')) {
			elementsToUpperCase([element]);
			element.value = '';
		}
		regexName(element);
	});
	rowCloned.style.marginTop = '1rem';
	rowCloned.appendChild(createDynamicButtonMinus());
	band.appendChild(rowCloned);
}

/** @auth Matheus Castiglioni
 *  Função responsável por deletar a linha com SELECT e INPUT
 */
function deleteRow(obj) {
	obj.parentNode.remove();
}