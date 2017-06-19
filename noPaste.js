/** @auth Matheus Castiglioni
 *  Recurso para desabilitar o CTRL + V dos inputs e textareas
 */
const elements = $$("input, textarea");

const disabledPaste = element => element.addEventListener("paste", e => e.preventDefault());

if (elements.length > 0)
	elements.forEach(element => disabledPaste(element));