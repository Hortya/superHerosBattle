function displayCharacters(allHeroesSheets) {
    ul = document.getElementById('allSup')
    allHeroesSheets.forEach(herosObject => {
        const li = document.createElement('li');
        li.innerHTML = `<img src="${herosObject.images.sm}"/> <button id=${herosObject.id} class='button js-btn'>${herosObject.name}</button>`
        ul.appendChild(li)
    }); 
}


async function battleRoyal() {
    try {
        const response = await fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
        const allHeroesSheets = await response.json();

        displayCharacters(allHeroesSheets);


        ul.addEventListener('click', function (event) {
            console.log(event);
            if (!event.target.classList.contains('js-btn')) return;

            console.log("hello");
        })

    }
    catch (e) {
        console.error(e)
    }
}

battleRoyal()



