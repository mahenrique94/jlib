/** @auth Matheus Castiglioni
 *  Retirar auto complete dos formulários e inputs
 */
document.addEventListener("DOMContentLoaded", function(event) {
	
	const forms = $$("form");
	if (forms.length > 0)
		forms.forEach(form => form.setAttribute("autocomplete", "off"));
	
});