/** @auth Matheus Castiglioni
 *  Criar validações em formulários
 */
document.addEventListener("DOMContentLoaded", function(event) {
	
	const validates = $$("[data-validate]");
	if (validates.length > 0) {
		validates.forEach(validate => {
			const scope = $(`.${validate.dataset.validateScope}`);
			const elements = scope.querySelectorAll("input, select, textarea");
			if (elements.length > 0) {
				elements.forEach(element => {
					element.addEventListener("keyup", function() {
						validating(validate, scope);
					});
					element.addEventListener("input", function() {
						validating(validate, scope);
					});
					element.addEventListener("change", function() {
						validating(validate, scope);
					});
				});
			}
		});
	}
	
});

/** @auth Matheus Castiglioni
 *  Validando se o escopo possui algum input inválido, caso não possua o botão é liberado para ser clicado
 */
function validating(validate, scope) {
	const invalids = scope.querySelectorAll(":invalid");
	if (invalids.length > 0) {
		validate.setAttribute("disabled", "true");
	} else {
		const requireds = scope.querySelectorAll(":required");
		if (requireds.length > 0) {
			requireds.forEach(required => {
				validate.removeAttribute("disabled");
				if (required.value === "") {
					validate.setAttribute("disabled", "true");
					throw new Error("Campo obrigatorio: " + required.name);
				}
			});
		} else {
			validate.removeAttribute("disabled");
		}
	}
}