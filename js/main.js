//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
const url = 

document.querySelector('button').addEventListener('click', getDrink)

function getDrink(){
    let drink = document.querySelector('input').value
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`)
    .then(res => res.json()) // parse response as JSON
    .then(data => {
        console.log(data)
        let resp = data.drinks  // temp store response
        // Choose a random number from the total number of drinks available
        let rando = (Math.floor(Math.random() * resp.length))
        console.log(`${rando}`)
        // Display drink name
        document.querySelector('h2').innerText = data.drinks[`${rando}`].strDrink
        document.querySelector('h2').style.display = "block"
        // Display drink picture
        document.querySelector('img').src = data.drinks[`${rando}`].strDrinkThumb
        // Display drink instructions
        document.querySelector('h3').innerText = data.drinks[`${rando}`].strInstructions
        // Dispaly background ---  needs fixed
        document.body.style.background = data.drinks[`${rando}`].strImageSource
        // Check Ingredients, show only the ones returned
        for (i = 1; i < 16; i++){
            if ((data.drinks[`${rando}`][`strIngredient${i}`]) != null) {
                document.querySelector(`#Ing${i}`).innerText = data.drinks[`${rando}`][`strIngredient${i}`] + ' '
            }
        }
        // Check Measurements, show only the ones returned
        for (i = 1; i < 16; i++){
            if ((data.drinks[`${rando}`][`strMeasure${i}`]) != null) {
                document.querySelector(`#Ing${i}`).innerText += ' ' + data.drinks[`${rando}`][`strMeasure${i}`];
            }
        }
        // If video availabe show video
        if(data.drinks[`${rando}`].strVideo != null){
            document.getElementById('video').style.display = "block"
            document.querySelector(`.right`).style.display = "block"
            let vid = data.drinks[`${rando}`].strVideo
            vid = (vid.replace('watch?v=', 'embed/'));
            document.querySelector('#video').src = vid
        }else {
            document.querySelector(`#video`).src = ''
            document.querySelector(`.right`).style.display = "none"
        }
    })
    // show errors if any return from api fetch
    .catch(err => {
        console.log(`error ${err}`)
    });
}

let enter = document.querySelector('input')   //  Input field in HTML

enter.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {  // When Enter key is pressed
         event.preventDefault()
document.querySelector('button').click()  //simulated click on BUTTON
    }
});

