/**
 * Get a random value between 2 parametr
 * @param {number} min minimal number
 * @param {number} max maximal number
 * @returns {number} random number between 2 parametr
 */
function getRandomBetweenValue(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min))
}





const ul = document.getElementById('allSup')

/**
*display of an image associated with button.
*@param {array} allHeroesSheets - array with all characters.
*/
function displayCharacters(allHeroesSheets) {
    allHeroesSheets.forEach(herosObject => {
        const herosList = document.getElementById('supItm');
        const hero = document.importNode(herosList.content, true);
        hero.querySelector('.js-sup-name').textContent = herosObject.name;
        hero.querySelector('.js-publisher').textContent = herosObject.biography.publisher;
        hero.querySelector('.js-alignment').textContent = herosObject.biography.alignment;
        hero.querySelector('.js-intel').textContent = herosObject.powerstats.intelligence;
        hero.querySelector('.js-strength').textContent = herosObject.powerstats.strength;
        hero.querySelector('.js-speed').textContent = herosObject.powerstats.speed;
        hero.querySelector('.js-sup-img').src = herosObject.images.sm;
        hero.querySelector('.js-sup-img').alt = `photo de ${herosObject.name}`
        hero.querySelector('.js-btn').setAttribute('data-id', herosObject.id)
        ul.appendChild(hero)
    });
}





/**
* Allows to click on button to fightersList to add character to selectedList on click.
* @param {array} array - list of fighters characters
* @param {array} fighters - list of selected characters.
*/
function addOnClick() {
    ul.addEventListener('click', function (event) {
        if (!event.target.classList.contains('js-btn')) return;
        const li = document.createElement('li');
        li.innerHTML = event.target.parentNode.innerHTML;
        li.querySelector('.js-btn').textContent = 'Retirer';
        document.getElementById('selectedSup').appendChild(li);
        event.target.parentNode.remove()
    })
}

/**
* Allows to click on the button to deselect the fighter.
* @param {array} array - list of selected characters.
*/
function removeOnClick() {
    document.getElementById('selectedSup').addEventListener('click', function (event) {
        if (!event.target.classList.contains('js-btn')) return;
        const li = document.createElement('li');
        li.innerHTML = event.target.parentNode.innerHTML
        li.querySelector('.js-btn').textContent = 'Sélectionner';
        document.getElementById('allSup').appendChild(li)
        event.target.parentNode.remove()

    })
}

/**
 * Generate array from an API.
 * @returns {array} - array an all characters.
 */
async function MakeHerosArray() {
    try {
        const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
        return await response.json();
    }
    catch (e) {
        console.error(e)
    }
}





/**
 * Do an array with all selected characters when "Let's Ramble" btn is clicked
 * @return {array} the fighter's stats array
 */
async function battleStart(fighters) {
    document.getElementById('battle').addEventListener('click', () => {
        document.querySelectorAll('#selectedSup li').forEach((sup) => {
            let fighterSelected = {};
            fighterSelected.name = sup.querySelector('.js-sup-name').innerText;
            fighterSelected.intel = sup.querySelector('.js-intel').innerText;
            fighterSelected.strength = sup.querySelector('.js-strength').innerText;
            fighterSelected.speed = sup.querySelector('.js-speed').innerText;
            fighters.push(fighterSelected)
        })
        battle(fighters)
    })
}



async function battleRoyal() {
    try {
        const allHeroesSheets = await MakeHerosArray();
        displayCharacters(allHeroesSheets);
        let fighters = [];

        addOnClick();
        removeOnClick();
        battleStart(fighters);


        
    }
    catch (e) {
        console.error(e)
    }
}

/**
 * Do the fight between attacker and defender
 * @param {object} attacker -the object of the attacker
 * @param {object} defender -the object of the defender
 * @return {string} -in case the defender dies, return 'dead' to specifie the death
 */
function fight(attacker, defender) {
    let atckPwr = getRandomBetweenValue((attacker.intel + attacker.speed + attacker.strength)/10, attacker.intel + attacker.speed + attacker.strength);
    if (atckPwr > getRandomBetweenValue((defender.intel + defender.speed + defender.strength)/10, defender.intel + defender.speed + defender.strength)) {
        return 'attacker'
    }
    else {
        return 'defender'
    }
}

/**
 * Remove a caracter if he/she died from the caracter's array
 * @param {array} array -caracter's array
 * @param {number} dead -index of the dead
 */
function death(array, dead) {
    array.splice(dead, 1);
}



/**
 * Create the battle. Randomly get an attacker who figth a defender from your caracter's array
 * @param {array} array - caracter's array
 */
function battle(array) {
    let attacker = getRandomBetweenValue(0, array.length - 1);
    let defender;
    while (defender === undefined || defender === attacker) {
        defender = getRandomBetweenValue(0, array.length - 1);
    };
    if (fight(array[attacker], array[defender]) === 'attacker') {
        death(array, defender);
    }
    else {
        death(array, attacker);
    }
    console.log(array);
}

battleRoyal()



