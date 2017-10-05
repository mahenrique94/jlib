const CODE_DONE = 4;
const CODE_OK = 200;

/** @auth Matheus Castiglioni
 *  Classe responsável por realizar requisições ajax para uma determinada url
 */
class HttpService {

    static isData(element) {
        return element.nodeName.toLowerCase() === "input" || element.nodeName.toLowerCase() === "select" || element.nodeName.toLowerCase() === "textarea";
    }

    static populateParams(params, buildParams) {
        // Verificando se ja esta sendo passado os dados para requisição via POST
        if (!buildParams)
            return params;

        if (params && params.length > 0) {
            let data = "";
            params.forEach(param => {
                if (!param.name.endsWith("aux") && this.isData(param))
                    data += `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}&`;
            });
            return data.substring(0, (data.length - 1));
        }

        return null;
    }

    static request(url, verb, params, buildParams) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(verb, url, true);
            if (verb.toUpperCase() === "POST")
                xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded;charset=ISO-8859-1");
            xhr.onreadystatechange = function() {
                if (xhr.readyState == CODE_DONE) {
                    if (xhr.status == CODE_OK)
                        resolve(xhr.responseText);
                    else
                        reject(xhr.responseText);
                }
            }
            xhr.ontimeout = function() {
                console.error("A requisição excedeu o tempo limite");
            }
            xhr.send(this.populateParams(params, buildParams));
        });
    }

    static upload(url, verb, params) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(verb, url, true);
            xhr.onreadystatechange = function() {
                if (xhr.readyState == CODE_DONE) {
                    if (xhr.status == CODE_OK)
                        resolve(xhr.responseText);
                    else
                        reject(xhr.responseText);
                }
            }
            xhr.ontimeout = function() {
                console.error("A requisição excedeu o tempo limite");
            }
            xhr.send(params);
        });
    }

}