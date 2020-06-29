const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function(e){
  
  const trainers = ()=>{fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => json.forEach(trainers =>getTrainers(trainers)))
}

const getTrainers =(trainers)=>{
    console.log(trainers.pokemons)
    let trainerCard = document.createElement('div')
        trainerCard.className = 'card'
        trainerCard.dataset.id = trainers.id
        trainerCard.innerHTML = `<p>${trainers.name}</p>`
    let newTrainers = document.querySelector("main") 
    
    const addPokemonBtn = document.createElement('button')
        addPokemonBtn.innerHTML = 'Add Pokemon'
        addPokemonBtn.dataset.id = trainers.id
    trainerCard.append(addPokemonBtn)
    
    newTrainers.append(trainerCard)
   

   trainers.pokemons.forEach(pokemon => {
    let pokemonUl = document.createElement('ul')
    let pokemonLi = document.createElement('li')
    pokemonLi.innerHTML = `
        ${pokemon.nickname} (${pokemon.species}) <button data-pokemon-id= "${pokemon.id}" class= "release"> release </button>
    `
  pokemonUl.append(pokemonLi)
    trainerCard.append(pokemonUl)
})
} 

function getPokemon(trainerId){
    fetch(POKEMONS_URL, {
    method : "POST",
    headers: {
        'Content-Type': 'application/json'
     },
    body: JSON.stringify({trainer_id:trainerId}),
  }).then(resp => resp.json())
  .then(newPokemon => addPokemon(newPokemon))

  }

  function addPokemon(newPokemon) {
    let trainer = document.querySelector(`div[data-id='${newPokemon["trainer_id"]}']`)
    let pokemonUl = trainer.querySelector('ul')
    let pokemonLi = document.createElement('li')
    pokemonLi.innerHTML = `
        ${newPokemon.nickname} (${newPokemon.species}) <button data-pokemon-id= "${newPokemon.id}" class= "release"> release </button>
        `
    
    pokemonUl.append(pokemonLi)
  }

document.addEventListener('click',function(e) {
    const trainerId = e.target.dataset.id
    if (e.target.innerHTML == "Add Pokemon"){
        getPokemon(trainerId)
    }
    if(e.target.innerText =='release') {
      e.target.parentNode.remove()
        // console.log(e.target.dataset.pokemonId)
        fetch(`${POKEMONS_URL}/${e.target.dataset.pokemonId}`, {
            method : "DELETE" 
        })
        .then(resp => resp.json())
    }
})
    trainers()     
})


