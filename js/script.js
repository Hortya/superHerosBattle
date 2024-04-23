const ul = document.getElementById('allSup')


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



// function puttInTheArray(event, array) {
//     let isInTheArray;

//     for (const id of array) {
//         if (id === event.target.dataset.id) {

//             isInTheArray = true;
//         };
//     }

//     if (isInTheArray === true) {
//         alert("Vous ne pouvez pas selectionner le même personnage");
//         return
//     }

//     array.push(event.target.dataset.id);
// }

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

function removeOnClick(array) {
    document.getElementById('selectedSup').addEventListener('click', function (event) {
        if (!event.target.classList.contains('js-btn')) return;
        const li = document.createElement('li');
        li.innerHTML = event.target.parentNode.innerHTML
        document.getElementById('allSup').appendChild(li)
        event.target.parentNode.remove()

    })
}

async function MakeHerosArray() {
    try {
        const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
        return await response.json();
    }
    catch (e) {
        console.error(e)
    }
}



async function battleRoyal() {
    try {
        const allHeroesSheets = await MakeHerosArray();
        displayCharacters(allHeroesSheets);
        let fighters = [];

        addOnClick(allHeroesSheets, fighters);
        // removeOnClick(fighters);
        battleStart(fighters)

        // document.getElementById('battle').addEventListener('click', function(event, fighters){

        // })
    }
    catch (e) {
        console.error(e)
    }
}



function battleStart(fighters) {
    document.getElementById('battle').addEventListener('click', () => {
        
    })
}






battleRoyal()




// const ulBattle = document.createElement('ul');
// ulBattle.classList.add('battle');
// ulBattle.id = 'battleTemplate';
// document.body.appendChild(ulBattle)
// fighters.forEach((fighter) => {
//     const herosList = document.getElementById('battleItm');
//     const hero = document.importNode(herosList.content, true);
//     hero.querySelector('.js-sup-name').textContent = fighter[0].name;
//     hero.querySelector('.js-sup-img').src = fighter[0].images.sm;
//     hero.querySelector('.js-sup-img').alt = `photo de ${fighter[0].name}`;
//     hero.querySelector('.js-sup-info').textContent = fighter[0].powerstats;
//     document.getElementById('battleTemplate').appendChild(hero);
// })