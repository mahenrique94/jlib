/** @auth Matheus Castiglioni
 *  Funções relacionadas com senhas
 */
const PERCENTUAL = 100;
const DIGITS = 0;

/** @auth Matheus Castiglioni
 *  REGEXP's para calcular o nível(muito fraca, fraca, normal, boa e muito boa) da senha digitada
 */
const REGEX_CHARACTER_SPECIAL = /([^aA-zZ0-9])/g;
const REGEX_LETTER = /^([A-Z]+)$/gi;
const REGEX_LETTER_LOW = /([a-z])/g;
const REGEX_LETTER_NUMBER = /(([a-z]{1,})(.+)([0-9]{1,}))/gi;
const REGEX_LETTER_NUMBER_MIX = /((([0-9])([A-Z])([0-9]))|([A-Z])([0-9])([A-Z]))/gi;
const REGEX_LETTER_UPPER = /([A-Z])/g;
const REGEX_NUMBER = /^([0-9]+)$/g;

/** @auth Matheus Castiglioni
 *  SCORE's para calcular o nível(muito fraca, fraca, normal, boa e muito boa) da senha digitada
 */
const SCORE_CHARACTER_SPECIAL = 20;
const SCORE_LETTER = 1;
const SCORE_LETTER_NUMBER = 5;
const SCORE_LETTER_NUMBER_MIX = 7.5;
const SCORE_LETTER_UPPER = 10;
const SCORE_NUMBER = 1;

/** @auth Matheus Castiglioni
 *  Arredondar o nível da senha digitado que foi calculada com pontos flutuantes
 */
const resetScore = score => score.children.forEach(point => point.classList.add("is-inactive"));
const roundScore = score => score > PERCENTUAL ? PERCENTUAL : score.toFixed(DIGITS);
const scoreIsVeryWeak = score => score <= 20;
const scoreIsWeak = score => score <= 40;
const scoreIsNormal = score => score <= 60;
const scoreIsGood = score => score <= 80;
const scoreIsVeryGood = score => score <= 100;

/** @auth Matheus Castiglioni
 *  Calcular o nível da senha digitada
 */
function calculatePasswordScore(password) {
    let score = 0;
    let factorCharacterSpecial = 1;
    let factorLetter = 1;
    let factorLetterNumber = 1;
    let factorLetterNumberMix = 1;
    let factorLetterUpper = 1;
    let factorNumber = 1;

    if (REGEX_LETTER.test(password))
        factorLetterUpper = SCORE_LETTER_UPPER;

    if (!REGEX_LETTER_LOW.test(password))
        factorLetterUpper = SCORE_LETTER_UPPER;

    score += (password.match(REGEX_LETTER) || [""])[0].length * (SCORE_LETTER / factorLetter) || (password.match(REGEX_NUMBER) || [''])[0].length * (SCORE_NUMBER / factorNumber);
    score += (password.match(REGEX_LETTER_NUMBER) || [""])[0].length * (SCORE_LETTER_NUMBER / factorLetterNumber);
    score += (password.match(REGEX_LETTER_NUMBER_MIX) || [""])[0].length * (SCORE_LETTER_NUMBER_MIX / factorLetterNumberMix);
    score += (password.match(REGEX_LETTER_UPPER) || []).length * (SCORE_LETTER_UPPER / factorLetterUpper);
    score += (password.match(REGEX_CHARACTER_SPECIAL) || []).length * (SCORE_CHARACTER_SPECIAL / factorCharacterSpecial);

    return roundScore(score);
}

/** @auth Matheus Castiglioni
 *  Checar o nível do password e informar para o usuário
 */
function checkPasswordScore(inputPassword) {
    console.log(inputPassword.value);
    const scoreElement = inputPassword.parentNode.querySelector(".js-o-score");
    if (inputHasValue(inputPassword) && inputPassword.validity.valid) {
        const score = calculatePasswordScore(inputPassword.value);
        resetScore(scoreElement);

        if (scoreIsVeryWeak(score)) {
            scoreElement.children[0].classList.remove("is-inactive");
        } else if (scoreIsWeak(score)) {
            scoreElement.children[1].classList.remove("is-inactive");
        } else if (scoreIsNormal(score)) {
            scoreElement.children[2].classList.remove("is-inactive");
        } else if (scoreIsGood(score)) {
            scoreElement.children[3].classList.remove("is-inactive");
        } else {
            scoreElement.children[4].classList.remove("is-inactive");
        }

        showElement(scoreElement)
    } else {
        hideElement(scoreElement);
    }
}