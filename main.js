// tempalte for pet-area
const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()

// this is for dynamic weather
async function start() {
  const weatherPromise = await fetch('https://api.weather.gov/gridpoints/MFL/110,50/forecast')
  const weatherData = await weatherPromise.json()
  const ourTemp = weatherData.properties.periods[0].temperature
  document.querySelector('#temperature-output').textContent = ourTemp
}

start()

// this is for pet-area 
async function petArea() {
  const petPromise = await fetch("https://courageous-sopapillas-2f7179.netlify.app/.netlify/functions/pets")
  const petData = await petPromise.json()

  petData.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone.querySelector(".pet-card").dataset.species = pet.species

    clone.querySelector("h3").textContent = pet.name
    clone.querySelector(".pet-desc").textContent = pet.description
    clone.querySelector('.pet-age').textContent = actualPetAge(pet.birthYear)

    if (!pet.photo) pet.photo = 'images/fallback.jpg'
    clone.querySelector('.pet-card-photo img').src = pet.photo
    clone.querySelector('.pet-card-photo img').alt = `A ${pet.species} named ${pet.name}`

    wrapper.appendChild(clone)

  });
  document.querySelector('.list-pet').appendChild(wrapper)
}

petArea()

// pet date of birth
function actualPetAge(birthYear) {
  const currentAge = new Date().getFullYear()
  const age = currentAge - birthYear

  if (age == 1) return "1 year old"
  if (age == 0) return "Less than a year old"

  return `${age} years old`
}

// pet-filter button

const allButtonFilter = document.querySelectorAll(".pet-filter button")

allButtonFilter.forEach(el => {
  el.addEventListener("click", buttonClick)
})

function buttonClick(event) {
  // removing active
  allButtonFilter.forEach(el => el.classList.remove("active"))

  // addting the active
  event.target.classList.add("active")

  // applying the filter active
  const currentfilter = event.target.dataset.filter
  document.querySelectorAll(".pet-card").forEach(el => {
    if (currentfilter == el.dataset.species || currentfilter == "all") {
      el.style.display = "grid"
    } else {
      el.style.display = "none"
    }
  })

}

