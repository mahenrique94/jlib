/** @auth Matheus Castiglioni
 *  Realizar requisições ajax para popular selects e trazer determinado valor selecionado de acordo
 *  com o banco dados
 */
document.addEventListener('DOMContentLoaded', function(event) {

    const table = $('table');
    if (table != undefined) {
        const select = $('select[data-select=slTable]');
        if (select != undefined) {
        	table.tHead.children[0].children.forEach(th => {
        		if (th.hasAttribute('scope'))
        			select.appendChild(new Option(th.textContent, th.getAttribute('scope')));
        	});
        	select.appendChild(new Option('Todos', ''));        	
        }
    }

    const selects = $$('select[data-select][data-url]');
    if (selects.length > 0) {
        selects.forEach(select => {
            const URL = getUrl(select.dataset.url);
            if (!URL.endsWith('sl')) {
                HttpService.request(URL, 'GET').then(response => {
                    let list = JSON.parse(response);
                    let text, value;
                    switch (select.dataset.select) {
	                    case 'slAdmGroup':
	                    	text = 'describe';
	                    	value = 'id';
	                    	break; 
                        case 'slCadUfText':
                            text = 'uf';
                            value = 'uf';
                            break; 
                        case 'slJson':
                            text = 'descricao';
                            value = 'id';
                                break; 
                        default:
                            text = 'descricao';
                            value = 'id';
                            break; 
                    }
                    fillSelect(select, (list.list || list.lista), text, value);                            
                }).catch(error => console.error(error));        
            }
            setOptipnSelected(select);
        });
    }

});

function getUrl(url) {
	url = url.substring(2, url.lastIndexOf('_')).replace(/[_]/g, '/').toLowerCase();
	url = window.location.pathname.substring(0, window.location.pathname.substring(1).indexOf('/') + 2) + url;
    return url;
}

function fillSelect(select, list, text, value) {
    list.forEach(item => select.appendChild(new Option(item[text], item[value])));
}

function setOptipnSelected(select) {
    let aux = $(`input[name='${select.name}aux'][type=hidden]`);
    if (aux != undefined) {
    	let option = select.querySelector(`option[value='${aux.value}']`);
    	if (option != undefined)
    		option.selected = true;
    }
}