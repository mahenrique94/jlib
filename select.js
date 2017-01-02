/** @auth Matheus Castiglioni
 *  Realizar requisições ajax para popular selects e trazer determinado valor selecionado de acordo
 *  com o banco dados
 */
document.addEventListener('DOMContentLoaded', function(event) {

    const selects = $$('select[data-select][data-url]');
    selects.forEach(select => {
        const url = getUrl(select.dataset.url);
        HttpService.get('http://localhost:8080/mhcws/ws/' + url).then(response => {
            let list = response.list;
            let text;
            let value;
            switch (select.dataset.select) {
                default:
                    text = 'descricao';
                    value = 'id'
                    break; 
            }
            fillSelect(select, list, text, value);            
            setOptipnSelected(select);
        }).catch(error => console.log(error));        
    });

});

function getUrl(url) {
    return url.substring(2, url.lastIndexOf('_')).replace(/[_]/g, '/').toLowerCase();
}

function fillSelect(select, list, text, value) {
    list.forEach(item => {
        select.appendChild(new Option(item[text], item[value]));
    });
}

function setOptipnSelected(select) {
    let aux = $(`input[name=${select.name}aux][type=hidden]`);
    select.options.forEach(option => {
        if (option.value.equals(aux.value))
            option.selected = true;
    });
}