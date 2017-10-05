/** @auth Matheus Castiglioni
 *  Carregar tabelas via ajax sem recarregar as páginas
 */
document.addEventListener("DOMContentLoaded", function(event) {
	
	/** @auth Matheus Castiglioni
	 *  Buscando todas as divs que tenham a classe js-loadgrid e alimentando-as com o laodgrid 
	 */
	const loadGrids = $$(".js-loadgrid");
	if (loadGrids.length > 0) {
		loadGrids.forEach(loadGrid => {
			LoadGrid.load(loadGrid.dataset.load).then(response => {
				if (response != null)
					loadGrid.appendChild(response);
			}).catch(error => console.error(error));
		});
	}
	
});

/** @auth Matheus Castiglioni
 *  Classe responsável por buscar o loadgrid 
 */
class LoadGrid {
	
	static load(url) {
		return new Promise((resolve, reject) => {
			HttpService.request(url, "GET").then(response => {
				resolve(new DOMParser().parseFromString(response, "text/html").querySelector("table"));
			}).catch(error => reject(error));
		});
	}
	
}