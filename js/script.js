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
function addOnClick(array, fighters) {
    ul.addEventListener('click', function (event) {
        if (!event.target.classList.contains('js-btn')) return;
        const li = document.createElement('li');
        li.innerHTML = event.target.parentNode.innerHTML;
        document.getElementById('selectedSup').appendChild(li);
        fighters.push(array.filter((heros) => heros.id == event.target.dataset.id))
        event.target.parentNode.remove()
        console.log(fighters);
    })
}

/**
* Allows to click on the button to deselect the fighter.
* @param {array} array - list of selected characters.
*/
function removeOnClick(array) {
    document.getElementById('selectedSup').addEventListener('click', function (event) {
        if (!event.target.classList.contains('js-btn')) return;
        const li = document.createElement('li');
        li.innerHTML = event.target.parentNode.innerHTML
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
function battleStart() {
    document.getElementById('battle').addEventListener('click', () => {
        let fightersSheets = [];
        document.querySelectorAll('#selectedSup li').forEach((sup)=>{
            let fighterSelected =  {};
            fighterSelected.name = sup.querySelector('.js-sup-name').innerText;
            fighterSelected.intel =  sup.querySelector('.js-intel').innerText;
            fighterSelected.strength =  sup.querySelector('.js-strength').innerText;
            fighterSelected.speed =  sup.querySelector('.js-speed').innerText;
            fightersSheets.push(fighterSelected)
        })
        return fightersSheets;
    })
}



async function battleRoyal() {
    try {
        const allHeroesSheets = await MakeHerosArray();
        displayCharacters(allHeroesSheets);
        let fighters = [];

        addOnClick(allHeroesSheets, fighters);
        // removeOnClick(fighters);
       const fightersArray = battleStart();

        // document.getElementById('battle').addEventListener('click', function(event, fighters){

        // })
    }
    catch (e) {
        console.error(e)
    }
}





battleRoyal()



