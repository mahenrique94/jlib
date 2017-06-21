/** @auth Matheus Castiglioni
 *  Funções referentes a textareas
 */

/** @auth Matheus Castiglioni
 *  Validando o pattern dos textareas, criada a função pois por padrão o textarea não tem suporte ao pattern do HTML5
 */
const textareas = $$("textarea[pattern]");
if (textareas.length > 0) {
	textareas.forEach(textarea => {
		textarea.addEventListener("keyup", function(e) {
			if (e.target.value != null && e.target.value !== "" && e.target.value.length > 0) {
				const regex = new RegExp(e.target.getAttribute("pattern"));
				if (regex.test(e.target.value))
					e.target.setCustomValidity("");
				else
					e.target.setCustomValidity("invalid");
			}
		});   	
	});
}