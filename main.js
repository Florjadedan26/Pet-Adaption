const template = document.querySelector('#pet-card-template')
const wrapper = document.createDocumentFragment()


async function start() {
  const weatherPromise = await fetch('https://api.weather.gov/gridpoints/MFL/110,50/forecast')
  const weatherData = await weatherPromise.json()
  const ourTemp = weatherData.properties.periods[0].temperature
  document.querySelector('#temperature-output').textContent = ourTemp
}

start()

async function petArea() {
  const petPromise = await fetch("https://learnwebcode.github.io/bootcamp-pet-data/pets.json")
  const petData = await petPromise.json()

  petData.forEach(pet => {
    const clone = template.content.cloneNode(true)

    clone = document.querySelector('h3').textContent = pet.createDocumentFragment

    wrapper.appendChild(clone)

  });
  document.querySelector('.list-pet').appendChild(wrapper)
}

petArea()