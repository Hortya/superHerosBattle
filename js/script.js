fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json")
    .then(response => response.json())
    .then(json => {localStorage.setItem('herosSheets', JSON.stringify(json))})

