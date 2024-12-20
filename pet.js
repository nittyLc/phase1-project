const petDetails = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json");
const pets = await petDetails.json()

const template = document.querySelector("#animal-card")
const wrapper = document.createElement("div")


function decideAgeDeatils(age){
    if(age < 1){
        return "Less than a year old"
    }
    return age > 1 ? `${age} years old` : "1 year old"
}

pets.forEach(pet => {
    const details = template.content.cloneNode(true)
    details.querySelector("h3").textContent = pet.name
    
    const img = details.querySelector("img")
    img.src = pet.photo
    img.alt = `A ${pet.species} named ${pet.name}`

    const age = 2025 - pet.birthYear
    const ageDetails = decideAgeDeatils(age);
    details.querySelector(".age").textContent = ageDetails

    details.querySelector(".species").textContent = pet.species

    details.querySelector(".pet-details").textContent = pet.description

    details.querySelector(".primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}/`

    wrapper.appendChild(details)
});

document.querySelector(".animals").appendChild(wrapper)

const filterButtons = document.querySelectorAll(".nav a")
filterButtons.forEach(btn => {
    btn.addEventListener("click", e => getFilterClick(e))
})

function getFilterClick(e){
    let target = e.target

    e.preventDefault()

    filterButtons.forEach(btn => {
        btn.classList.remove("active")
    })
    target.classList.add("active")

    filterPets(target.dataset.filter)
}

function filterPets(species){
    const allpets = document.querySelectorAll(".animal-card")

    allpets.forEach(btn => {
        if(btn.querySelector(".species").textContent == species){
            btn.style.display = ""
        }else{
            btn.style.display = "none"
        }
    })
}
