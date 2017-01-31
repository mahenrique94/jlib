/** @auth Matheus Castiglioni
 *  Realizar requisições ajax para popular selects e trazer determinado valor selecionado de acordo
 *  com o banco dados
 */
document.addEventListener('DOMContentLoaded', function(event) {

	/** @auth Matheus Castiglioni
	 *  Alimentando select para informar o campo que deseja-se realizar a busca nas telas de listagens
	 */
    const table = $('table');
    if (table) {
        const select = $('select[data-select=slTable]');
        if (select) {
        	table.tHead.children[0].children.forEach(th => {
        		if (th.hasAttribute('scope'))
        			select.appendChild(new Option(th.textContent, th.getAttribute('scope')));
        	});
        	select.appendChild(new Option('Todos', ''));        	
        }
    }

    /** @auth Matheus Castiglioni
	 *  Pegando todos os selects que são alimentados via ajax e populando-os de acordo com as informações do banco
	 *  de dados 
	 */
    const selects = $$('select[data-select][data-url]:not([data-changed])');
    if (selects.length > 0) {
        selects.forEach(select => {
        	if (!select.dataset.url.endsWith('sl')) {
        		requestData(select).then(function() {
    				setOptipnSelected(select);
        		}).catch(error => console.error(error));
        	} else {
        		setOptipnSelected(select);
        	}
        });
    }
    
    /** @auth Matheus Castiglioni
	 *  Verificando o change de um select para alimentar outro 
	 */
    const selectsChange = $$('select[data-change]');
    selectsChange.forEach(select => {
    	select.addEventListener('change', function() {
    		let change = $(`select[data-select=${select.dataset.change}]`);
    		if (change) {
    			requestData(change).then(function() {
    				setOptipnSelected(change);
        		}).catch(error => console.error(error));
    		}
    	});
    });

});

/** @auth Matheus Castiglioni
 *  Informando quais serão os campos que irão aparecer para o usuário e ficar como values para serem persistidos
 */
function requestData(select) {
	const URL = getUrl(select);
	return new Promise((resolve, reject) => {
		HttpService.request(URL, 'GET').then(response => {
			let text, value;
			let list = JSON.parse(response);
			switch (select.dataset.select) {
			case 'slAdmGroup' :
				text = 'describe';
				value = 'id';
				break; 
			case 'slCadEmpresa' :
				text = 'id-razaosocial';
				value = 'id';
				break; 
			case 'slCadMunicipio' :
				text = 'nome';
				value = 'nome';
				break; 
			case 'slCadUfText' :
				text = 'uf';
				value = 'uf';
				break; 
			case 'slJson' :
				text = 'descricao';
				value = 'id';
				break; 
			default :
				text = 'descricao';
				value = 'id';
				break; 
			}
			fillSelect(select, list.list, text, value);
			resolve(true);
		}).catch(error => reject(error));        
	});
}

/** @auth Matheus Castiglioni
 *  Montando URL para buscar as informações referente a determinado select 
 */
function getUrl(select) {
	let parameters = '';
	let url = select.dataset.url;
	url = url.substring(2).replace(/[_]/g, '/').toLowerCase();
	url = window.location.pathname.substring(0, window.location.pathname.substring(1).indexOf('/') + 2) + url;
	switch (select.dataset.select.substring(2).toLowerCase()) {
		case 'json' :
			url = `${url}.json`;
			break;
		case 'txt' :
			url = `${url}.txt`;
			break;
		default:
			break;
	}
	if (select.dataset.parametersFields && select.dataset.parametersValues) {
		let regExp = /[\[\]\']/g;
		let fields = select.dataset.parametersFields.replace(regExp, '').split(',');
		let values = select.dataset.parametersValues.replace(regExp, '').split(',');
		if (fields.length === values.length) {
			for (let i = 0; i < fields.length; i++) {
				parameters += `parametrosWeb[${i}].campo=${fields[i]}&parametrosWeb[${i}].parametroInicial=${getValueParameter(values[i])}`;
			}
		}
	}
	if (parameters)
		url += `?${parameters}`;
    return url;
}

/** @auth Matheus Castiglioni
 *  Pegando o valor para informar nos parâmetros do @ParametrosWeb 
 */
function getValueParameter(value) {
	if (value.startsWith('sl'))
		value = $(`[data-select=${value}]`).value;
	return value;
}

/** @auth Matheus Castiglioni
 *  Alimentando os options do select de acordo com os registros encontrados no banco de dados 
 */
function fillSelect(select, list, text, value) {
	if (select.required) {
		let optionRequired = new Option('', '');
		optionRequired.style.display = 'none';
		select.appendChild(optionRequired);
	}
    list.forEach(item => select.appendChild(createOption(item, text, value)));
}

/** @auth Matheus Castiglioni
 *  Criando os options para serem inseridos nos selects 
 */
function createOption(item, text, value) {
	let option;
	let regExp = new RegExp('([^a-z0-9])', 'gi');
	if (text.indexOf('-') >= 0 || text.indexOf('/') >= 0) {
		let match = regExp.exec(text)[0];
		let split = text.split(match);
		let describe = ''; 
		for(let i = 0; i < split.length; i++) {
			describe = describe.concat(item[split[i]], ' ', match, ' ');
		}
		option = new Option(describe.substring(0, (describe.length - 3)), item[value]);
	} else {
		option = new Option(item[text], item[value]);
	}
	return option;
}

/** @auth Matheus Castiglioni
 *  Setando uma determinada opção como selecionado após abrir uma tela para edição 
 */
function setOptipnSelected(select) {
    let aux = $(`input[name='${select.name}aux'][type=hidden]`);
    if (aux && !aux.value.equals('')) {
    	select.value = aux.value;
    	invokeChange(select);
    }
}