/** @auth Matheus Castiglioni
 *  Funções para selecionar uma ou várias linhas no grid, pintar a linha do input checkado e
 *  caso o grid possua caption irá atualizar o caption informando a quantidade de linhas selecionadas
 */
var qtdChecks = 0;

/** @auth Matheus Castiglioni
 *  Verificando se cabeçalho da tabela possui recurso para checkar todos
 */
document.addEventListener("DOMContentLoaded", function(event) {
	
	const thCheckAll = $$("th.checkGrid");
	if (thCheckAll.length > 0)
		thCheckAll.forEach(th => th.innerHTML = "<input class=\"checkAll\" onclick=\"checkGrid(this);\" type=\"checkbox\">");
	
});

/** @auth Matheus Castiglioni
 *  Função responsável por atualizar o caption da tabela informando quantas linhas foram selecionadas
 */
function atualizaCaption(caption) {
    if (caption)
        caption.innerHTML = `${qtdChecks} linha(s) selecionada(s)`;
}

/** @auth Matheus Castiglioni
 *  Função responsável por atualizar a quantidade de linhas selecionadas,
 *  caso a linha seja selecionada irá contar + 1,
 *  caso a linha seja desselecionada irá contar - 1
 */
function atualizaQtdChecks(obj) {
    if (obj.checked)
        qtdChecks++;
    else
        qtdChecks--;
    atualizaCaption(obj.parentNode.parentNode.parentNode.parentNode.querySelector("caption"));
}

/** @auth Matheus Castiglioni
 *  Função por selecionar e pintar a linha
 */
function atualizarCheck(obj) {
    obj.checked = obj.checked;
    pintaLinha(obj);
}

/** @auth Matheus Castiglioni
 *  Função para checar apenas a linha clicada
 */
function check(obj) {
    atualizarCheck(obj);
}

/** @auth Matheus Castiglioni
 *  Função para checkar ou descheckar todas as linhas de uma única vez
 */
function checkAll(obj) {
    if (obj.checked) {
        existeCheckado(obj);
        obj.parentNode.parentNode.parentNode.parentNode.querySelectorAll("tbody > tr > td:first-child > input[type=checkbox]").forEach(input => {
            input.checked = obj.checked;
        atualizarCheck(input);
    });
    } else {
        existeCheckado(obj);
    }
}

/** @auth Matheus Castiglioni
 *  Função principal onde será chamada nos elementos HTML
 */
function checkGrid(obj) {
	if (obj.classList.contains("checkAll"))
		checkAll(obj);
	else if (obj.classList.contains("checkOnly"))
		checkOnly(obj);
	else
		check(obj);
}

/** @auth Matheus Castiglioni
 *  Função para checkar apenas a linha selecionada, caso existe outras linhas selecionadas as mesmas irão ser desselecionadas
 */
function checkOnly(obj) {
	existeCheckado(obj);
	atualizarCheck(obj);
}

/** @auth Matheus Castiglioni
 *  Função responsável por verificar se já existe linhas selecionadas no grid, caso exista todas as linhas já selecionadas
 *  irão ser desseleciondas
 */
function existeCheckado(obj) {
	obj.parentNode.parentNode.parentNode.parentNode.querySelectorAll(`tbody > tr > td:first-child > input[type=checkbox]:checked:not([name="${obj.name}"])`).forEach(input => {
		input.checked = false; 
		atualizarCheck(input);
	});
}

/** @auth Matheus Castiglioni
 *  Função responsável por pintar a linha selecionada
 *  @param obj = input[type=checkbox] 
 */
function pintaLinha(obj) {
	obj.parentNode.parentNode.classList.toggle("c-table__marked");
	toggleDisableds(obj);
}

/** @auth Matheus Castiglioni
 *  Função responsável por pegar todos os elementos desabilitados da linha selecionada e liberá-los
 *  @param obj = input[type=checkbox] 
 */
function toggleDisableds(obj) {
	const disableds = obj.parentNode.parentNode.querySelectorAll("button, fieldset, input:not([type=checkbox]), select");
	if (disableds.length > 0) {
		disableds.forEach(disabled => {
			disabled.disabled = !obj.checked;
			disabled.readOnly = !obj.checked;
		});
	}
	atualizaQtdChecks(obj);
}