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
				text = ['id', 'razaosocial'];
				value = 'id';
				break; 
			case 'slCadMunicipioText' :
				text = 'nome';
				value = 'nome';
				break; 
			case 'slCadSituacao' :
				text = 'descricao';
				value = 'id.tipo';
				break; 
			case 'slCadSituacaoDescricao' :
				text = 'descricao';
				value = 'descricao';
				break; 
			case 'slCadUfText' :
				text = 'uf';
				value = 'uf';
				break; 
			case 'slJson' :
				text = 'descricao';
				value = 'id';
				break; 
			case 'slPsbClasse' :
				text = ['id.idgrupo.descricao', 'descricao'];
				value = ['id.idgrupo.id', 'id.id'];
				break; 
			case 'slPsbClassificacaoFiscal' :
				text = 'descricao';
				value = 'classificacaofiscal';
				break; 
			case 'slVieCadOperacaoTipoDocumento' :
				text = 'descricaotipodocumento';
				value = 'idtipodocumento';
				break; 
			case 'slTxt' :
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
		let regExp = /[\[\]\'\s]/g;
		let fields = select.dataset.parametersFields.replace(regExp, '').split(',');
		let values = select.dataset.parametersValues.replace(regExp, '').split(',');
		if (fields.length === values.length) {
			for (let i = 0; i < fields.length; i++) {
				parameters += `parametrosWeb[${i}].campo=${fields[i]}&parametrosWeb[${i}].parametroInicial=${getValueParameter(values[i])}&`;
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
	return new Option(getPropertyJSON(item, text), getPropertyJSON(item, value));
}

/** @auth Matheus Castiglioni
 *  Busca as informações desejadas no JSON, se for um objeto o mesmo é navegado até seu ponto primitivo 
 */
function getPropertyJSON(item, propertys) {
	let split, value = '';
	if (Array.isArray(propertys)) {
		for (let i = 0; i < propertys.length; i++) {
			value = value.concat(getPrimitiveValue(item, propertys[i]), ' / ');
		}
		value = value.substring(0, (value.length - 3));
	} else {
		value = getPrimitiveValue(item, propertys);
	}
	return value;
}

/** @auth Matheus Castiglioni
 *  Navegando no objeto até seu ponto primitivo 
 */
function getPrimitiveValue(item, propertys) {
	let value, split;
	split = propertys.split('.');
	for (let i = 0; i < split.length; i++) {
		value = item[split[i]];
		if (value instanceof Object)
			item = value;
	}
	return value;
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