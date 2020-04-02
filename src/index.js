document.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');


    console.log('%c HI', 'color: firebrick')
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4"
    const breedUrl = 'https://dog.ceo/api/breeds/list/all'
        //Fetches dog images
    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            for (const message of data.message) {
                let dogImage = document.createElement('img')
                dogImage.src = message
                dogImage.height = 150
                dogImage.widtht = 150
                let dogParent = document.getElementById("dog-image-container")
                dogParent.append(dogImage)
            }
        });
    //Fetches dog breeds
    fetch(breedUrl)
        .then(response => response.json())
        .then(data => {
            const breedHash = data.message
            for (const property in breedHash) {
                let breedLi = document.createElement("li")
                breedLi.textContent = property
                breedLi.addEventListener('click', function(e) {
                    let randomColor = Math.floor(Math.random() * 16777215).toString(16);
                    breedLi.style.color = "#" + randomColor;
                })
                let breedParent = document.getElementById("dog-breeds")
                breedParent.appendChild(breedLi)
            }
        });

    //Filter Dropdown selection
    let breedFilter = document.querySelector("#breed-dropdown")

    breedFilter.addEventListener("change", function(e) {
        let breedSelection = e.target.value.toLowerCase();
        let breedParent = document.getElementById("dog-breeds")
        let breeds = breedParent.getElementsByTagName("li");
        Array.from(breeds).forEach(function(breed) {

            let breedName = breed.textContent
            if (breedName.toLocaleLowerCase().startsWith(breedSelection) === true) {
                breed.style.display = 'block'
            } else {
                breed.style.display = 'none'
            }
        })
    })

});