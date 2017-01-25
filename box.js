/** @auth Matheus Castiglioni
 *  Desabilitar inputs para simular cadastros passo a passo na internet
 */
const SELECTOR_ELEMENTS = '[class*=o-box] input, [class*=o-box] select, [class*=o-box] textarea, [class*=o-box] button:not(.o-box__edit)';

document.addEventListener('DOMContentLoaded',function (event) {
	
	disableElements();
	
});

/** @auth Matheus Castiglioni
 *  Desabilitando todos os elementos do formulario 
 */
function disableElements(box) {
	const elements = $$(SELECTOR_ELEMENTS);
	if (elements.length > 0)
		elements.forEach(element => disableElement(element));
	hideSave(box);
}

/** @auth Matheus Castiglioni
 *  Editar determinado conteúdo
 */
function editBox(box) {
	const elements = box.querySelectorAll(SELECTOR_ELEMENTS);
	if (elements.length > 0)
		elements.forEach(element => activeElement(element));
	showSave(box);
}

/** @auth Matheus Castiglioni
 *  Habilitando os elementos do formulario
 */
function activeElement(element) {
	element.classList.remove('is-disabled');
	element.removeAttribute('readonly');
	element.removeAttribute('aria-readonly');
}


/** @auth Matheus Castiglioni
 *  Desabilitando os elementos do formulario 
 */
function disableElement(element) {
	element.classList.add('o-box__element', 'is-disabled');
	element.setAttribute('readonly', 'true');
	element.setAttribute('aria-readonly', 'true');
}

/** @auth Matheus Castiglioni
 *  Mostrando botão salvar
 */
function showSave(box) {
	const buttonSave = box.querySelector('.js-save');
	if (buttonSave != undefined)
		showElement(buttonSave);
}

/** @auth Matheus Castiglioni
 *  Escondendo botão salvar
 */
function hideSave(box) {
	if (box != undefined) {
		const buttonSave = box.querySelector('.js-save');
		if (buttonSave != undefined)
			hideElement(buttonSave);
	}
}