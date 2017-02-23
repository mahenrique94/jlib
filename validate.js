/** @auth Matheus Castiglioni
 *  Criar validações em formulários
 */
document.addEventListener('DOMContentLoaded', function(event) {
	
	let validates = $$('[data-validate]');
	if (validates.length > 0) {
		validates.forEach(validate => {
			let scope = $(`.${validate.dataset.validateScope}`);
			let elements = scope.findAll('input, select, textarea');
			if (elements.length > 0) {
				elements.forEach(element => {
					element.addEventListener('keyup', function() {
						validating(validate, scope);
					});
					element.addEventListener('input', function() {
						validating(validate, scope);
					});
					element.addEventListener('change', function() {
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
	let invalids = scope.findAll(':invalid');
	if (invalids.length > 0) {
		validate.setAttribute('disabled', 'true');
	} else {
		let requireds = scope.findAll(':required');
		if (requireds.length > 0) {
			requireds.forEach(required => {
				validate.removeAttribute('disabled');
				if (required.value.equals('')) {
					validate.setAttribute('disabled', 'true');
					throw BreakException;
				}
			});
		} else {
			validate.removeAttribute('disabled');
		}
	}
}