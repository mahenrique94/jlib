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
            const url = getUrl(select.dataset.url);
            HttpService.get(url).then(response => {
                let list = JSON.parse(response).list;
                let text, value;
                switch (select.dataset.select) {
                    default:
                        text = 'descricao';
                        value = 'id'
                        break; 
                }
                fillSelect(select, list, text, value);            
                setOptipnSelected(select);
            }).catch(error => console.error(error));        
        });
    }

});

function getUrl(url) {
    return url.substring(2, url.lastIndexOf('_')).replace(/[_]/g, '/').toLowerCase();
}

function fillSelect(select, list, text, value) {
    list.forEach(item => select.appendChild(new Option(item[text], item[value])));
}

function setOptipnSelected(select) {
    let aux = $(`input[name=${select.name}aux][type=hidden]`);
    let option = select.querySelector(`option[value=${aux.value}]`);
    if (option != undefined)
        option.selected = true;
}