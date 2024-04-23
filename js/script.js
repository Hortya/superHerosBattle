const ul = document.getElementById('allSup')


function displayCharacters(allHeroesSheets) {
    allHeroesSheets.forEach(herosObject => {
        const li = document.createElement('li');
        li.innerHTML = `<img class="herosImg" src="${herosObject.images.sm}"/> <button data-id=${herosObject.id} class='button js-btn'>${herosObject.name}</button>`
        ul.appendChild(li)
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

function addOnClick(array) {
    ul.addEventListener('click', function (event) {
        if (!event.target.classList.contains('js-btn')) return;
        const li = document.createElement('li');
        li.innerHTML = event.target.parentNode.innerHTML
        document.getElementById('selectedSup').appendChild(li)
        event.target.parentNode.remove()
        // puttInTheArray(event, array)

        console.log(array);
    })
}

function removeOnClick(array) {
    document.getElementById('selectedSup').addEventListener('click', function (event) {
        if (!event.target.classList.contains('js-btn')) return;
        const li = document.createElement('li');
        li.innerHTML = event.target.parentNode.innerHTML
        document.getElementById('allSup').appendChild(li)
        event.target.parentNode.remove()
        // puttInTheArray(event, array)

        console.log(array);
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

        addOnClick(fighters);
        removeOnClick(fighters)

        // document.getElementById('battle').addEventListener('click', function(event, fighters){

        // })
    }
    catch (e) {
        console.error(e)
    }
}

battleRoyal()



