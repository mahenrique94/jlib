/****************************** DATE ******************************/
/** @auth Matheus Castiglioni
 *  Função para adicionar uma determindade quantidade de dias em uma data
 */
function addDaysInDate(date, days) {
    let newDate = new Date(date);
    newDate.setDate(parseInt(newDate.getDate()) + parseInt(days));
    return newDate;
}

/** @auth Matheus Castiglioni
 *  Função para calcular a data final de acordo com a data inicial e dias informados
 */
function calculateDatTerminoByDay(event) {
    const inputDays = $(".js-days");
    if (inputDays && inputDays.value != null && inputDays.value > 0) {
        if ((event.keyCode >= 48 && event.keyCode <= 57) || event.keyCode == 9 || event.keyCode == 8) {
            const inputDateBegin = $(".js-datBegin");
            inputDateBegin.value = inputDateBegin.value != null && !inputDateBegin.value.equals("") ? inputDateBegin.value : convertDateToBrazilianDateTime(new Date());
            const inputDateEnd = $(".js-datEnd");
            const dateBegin = convertBrazilianDateTimeToDate(inputDateBegin.value);
            const dateEnd = addDaysInDate(dateBegin, inputDays.value);
            inputDateEnd.value = convertDateToBrazilianDateTime(dateEnd);
        }
    }
}

/** @auth Matheus Castiglioni
 *  Função para pegar uma string no formato de data e hora brasileiro(DD/MM/YYYY HH:MM) e converter para um Date
 */
function convertBrazilianDateTimeToDate(s) {
	const day = s.substring(0, 2);
	const month = parseInt(s.substring(3, 5)) - 1;
	const year = s.substring(6, 10);
	const hour = s.substring(11, 13);
	const minute = s.substring(14, 16);
	return new Date(year, month, day, hour, minute);
}

/** @auth Matheus Castiglioni
 *  Função para pegar um Date e converter para uma data no formato de data e hora brasileiro(DD/MM/YYYY HH:MM)
 */
function convertDateToBrazilianDateTime(date) {
	let s = date.toLocaleDateString("pt-BR");
	let hour = date.getHours();
	let minute = date.getMinutes();
	hour = hour >= 0 && hour <= 9 ? `0${hour}` : hour;
	minute = minute >= 0 && minute <= 9 ? `0${minute}` : minute;
	return s.concat(' ', hour, ':', minute);
}

/** @auth Matheus Castiglioni
 *  Função para gerar um código de acordo a data atual e informar no input
 */
function createCode(button) {
    const input = button.parentNode.parentNode.querySelector("input");
    const data = new Date();
    const code = `${data.getDate()}${(data.getMonth() + 1)}${data.getFullYear().toString().substring(2)}${data.getHours()}${data.getMinutes()}${data.getSeconds()}${data.getMilliseconds()}`;
    if (input) {
        input.value = code;
        invokeChange(input);
        invokeInput(input);
    }
}

/** @auth Matheus Castiglioni
 *  Função para pegar a data atual e informa no input
 */
function insertDate(button) {
    const input = button.parentNode.parentNode.querySelector("input");
    const agora = new Date();
    let dia = agora.getDate();
    let mes = agora.getMonth() + 1;
    dia = dia < 10 ? `0${dia}` : dia;
    mes = mes < 10 ? `0${mes}` : mes;
    if (!input.readOnly && input) {
        input.value = `${dia}/${mes}/${agora.getFullYear()}`;
        invokeChange(input);
        invokeInput(input);
    }
}

/** @auth Matheus Castiglioni
 *  Função para pegar a data e hora atual e informa no input
 */
function insertDateHour(button) {
    const input = button.parentNode.parentNode.querySelector("input");
    const agora = new Date();
    let dia = agora.getDate();
    let mes = agora.getMonth() + 1;
    let hora = agora.getHours();
    let minuto = agora.getMinutes();
    dia = dia < 10 ? `0${dia}` : dia;
    mes = mes < 10 ? `0${mes}` : mes;
    hora = hora >= 1 && hora <= 9 ? `0${hora}` : hora;
    minuto = minuto >= 0 && minuto <= 9 ? `0${minuto}` : minuto;
    if (!input.readOnly && input) {
        input.value = `${dia}/${mes}/${agora.getFullYear()} ${hora}:${minuto}`;
        invokeChange(input);
        invokeInput(input);
    }
}

/** @auth Matheus Castiglioni
 *  Checando se o parâmetro informado é uma String ou Número
 */
function isNumber(p)  {
    const regexLetters = new RegExp("([A-Z])", "gim");
    return (Number.isInteger(p) && Number.isFinite(p) && !isNaN(parseInt(p))) || (!isNaN(parseFloat(p))) && !regexLetters.test(p);
}