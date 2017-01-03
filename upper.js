/** @auth Matheus
 *  Transformando todos os inputs e textareas em uppercase,
 *  caso queira que o input não fique UPPERCASE basta adicionar o atributo data-upper="false"
 */
elementsToUpperCase($$('input[type=text]:not([data-upper=false]), input[type=password]:not([data-upper=false]), input[type=search]:not([data-upper=false]), select:not([data-upper=false]), textarea:not([data-upper=false])'));

function elementsToUpperCase(elementsUpper) {
	if (elementsUpper.length > 0) {
		var keyCodesExcluded = [8, 20, 27, 37, 38, 39, 40]; // Excluindo backscape, capslock, esc e setas
		elementsUpper.forEach(element => {
			element.style.textTransform = 'uppercase';
			if (!element.nodeName.equals('SELECT')) {
				element.addEventListener('keyup', function(e) {
					let start = this.selectionStart,
						  end = this.selectionEnd;
					if (!keyCodesExcluded.includes(e.keyCode)) {
						// Adicionado também os maiúsculos ([A-Z] - 65 á 90) devido a bugs no mac
						if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 97 && e.keyCode <= 122)) {
							this.value = this.value.toUpperCase();    
						}
						this.value = this.value;
						this.setSelectionRange(start, end);
					}        
				});
			}
		});
	}
}