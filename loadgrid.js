/** @auth Matheus Castiglioni
 *  Carregar tabelas via ajax sem recarregar as páginas
 */
document.addEventListener('DOMContentLoaded',function (event) {
	
	let loadGrids = $$('.js-loadgrid');
	if (loadGrids.length > 0) {
		loadGrids.forEach(loadGrid => {
			LoadGrid.load(loadGrid.dataset.load).then(response => {
				loadGrid.appendChild(response);
			}).catch(error => console.error(error));
		});
	}
	
});

class LoadGrid {
	
	static load(url) {
		return new Promise((resolve, reject) => {
			HttpService.request(url, 'GET').then(response => {
				resolve(new DOMParser().parseFromString(response, 'text/html').querySelector('table'));
			}).catch(error => reject(error));
		});
	}
	
}