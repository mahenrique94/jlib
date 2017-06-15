/** @auth Matheus Castiglioni
 *  Adicionar parâmetros dinamicamente nas telas de pesquisa
 */
document.addEventListener("DOMContentLoaded", function(event) {
	
	parametrosWebDynamic();
	
});

/** @auth Matheus Castiglioni
 *  Adicionar parâmetros dinamicamente nas telas de pesquisa
 */
function parametrosWebDynamic() {
	const row = $("[class*=o-navbar] .l-row:last-child");
	if (row != undefined && !temMaisDeUmParametro(row.parentNode)) {
		const lastCol = row.querySelector("[class*=u-grid]:last-child");
		row.classList.add("o-dynamic");
		row.style.position = "relative";
		lastCol.style.marginRight = 0;
		row.appendChild(createDynamicButtonPlus());
	}
}

/** @auth Matheus Castiglioni
 *  Função para verificar se o formulário de pesquisa contém algum input do tipo checkbox
 */
function temMaisDeUmParametro(form) {
	return form.querySelector("input[name*=\"[1]\"]");
}

/** @auth Matheus Castiglioni
 *  Função responsável por criar um botão onde será para adicionar novos parâmetros ou remove-los
 */
function createDynamicButton() {
	const button = document.createElement("button");
	button.setAttribute("type", "button");
	button.setAttribute("role", "button");
	return button;
}

/** @auth Matheus Castiglioni
 *  Função responsável por criar um botão para adicionar parâmetros
 */
function createDynamicButtonPlus() {
	const button = createDynamicButton();
	button.classList.add("o-dynamic__button--clone");
	button.setAttribute("onclick", "cloneRow(this);");
	button.appendChild(createDynamicIcon("plus"));
	return button;
}

/** @auth Matheus Castiglioni
 *  Função responsável por criar um botão para remover parâmetros
 */
function createDynamicButtonMinus() {
	const button = createDynamicButton();
	button.setAttribute("onclick", "deleteRow(this);");
	button.classList.add("o-dynamic__button--delete");
	button.appendChild(createDynamicIcon("minus"));
	return button;
}

/** @auth Matheus Castiglioni
 *  Função responsável por criar o ícone do botão, seja ele + ou -
 */
function createDynamicIcon(clazz) {
	const icon = document.createElement("I");
	icon.classList.add(`icon-${clazz}`);
	return icon;
}

/** @auth Matheus Castiglioni
 *  Função responsável por incrementar o índice do @ParametrosWeb
 */
function regexName(obj) {
	const regex = new RegExp("[\\d]", "g");
	const indice = regex.exec(obj.name);
	obj.name = obj.name.replace(regex, parseInt(indice[0]) + 1);
}

/** @auth Matheus Castiglioni
 *  Função responsável por clonar a linha com SELECT e INPUT para informar novos parâmetros
 */
function cloneRow(obj) {
	const band = obj.parentNode.parentNode;
	const row = obj.parentNode;
	const rowCloned = row.cloneNode(true);
	const elementsCloned = rowCloned.querySelectorAll("input, select");
	elementsCloned.forEach(element => {
		if (element.nodeName === "INPUT") {
			elementsToUpperCase([element]);
			element.value = "";
		}
		regexName(element);
	});
	rowCloned.style.marginTop = "1rem";
	rowCloned.appendChild(createDynamicButtonMinus());
	band.appendChild(rowCloned);
}

/** @auth Matheus Castiglioni
 *  Função responsável por deletar a linha com SELECT e INPUT
 */
const deleteRow = obj => obj.parentNode.remove();