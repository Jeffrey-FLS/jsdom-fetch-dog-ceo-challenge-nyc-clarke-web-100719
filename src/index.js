console.log('%c HI', 'color: firebrick');

function fetchImages() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    fetch(imgUrl)
        .then(data => data.json())
        .then(renderImages)
        .catch(console.error)
}

function renderImages(arrObjImages) {
    const divIdDogImageContainer = document.getElementById("dog-image-container");

    arrObjImages.message.forEach((objImage) => {
        const imgDog = document.createElement("img");
        imgDog.src = objImage;
        divIdDogImageContainer.appendChild(imgDog);
    });
}

function fetchBreeds() {
    const breedUrl = 'https://dog.ceo/api/breeds/list/all';

    fetch(breedUrl)
        .then(data => data.json())
        .then((data) => {
            const dataKeys = Object.keys(data.message);
            renderBreeds(dataKeys);
        })
        .catch(console.error);
}

function renderBreeds(arrStrBreeds) {
    const ulIdDogBreeds = document.getElementById("dog-breeds");
    // const arrStrBreedsKeys = Object.keys(arrObjBreeds.message);

    arrStrBreeds.forEach((strBreed) => {
        const liBreed = document.createElement("li");
        liBreed.innerHTML = strBreed;
        liBreed.style.color = "blue";
        ulIdDogBreeds.appendChild(liBreed);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    fetchImages();
    fetchBreeds();

    const selectIdBreedDropdown = document.querySelector("#breed-dropdown");

    selectIdBreedDropdown.addEventListener("click", (event) => {
        sortDogs(event.target.value);
    });
});

function sortDogs(strCharacter) {
    // const arrStrBreedsSort = fetchBreeds();
    const ulIdDogBreeds = document.getElementById("dog-breeds");
    const arrStrBreeds = ulIdDogBreeds.children;
    let arrStrBreedsSort = [];

    for(let i = 0; i < arrStrBreeds.length; i++) {
        const strBreed = arrStrBreeds[i].innerHTML;
        arrStrBreedsSort.push(strBreed);
    }

    let liChild = ulIdDogBreeds.lastElementChild;

    while (liChild) {
        ulIdDogBreeds.removeChild(liChild);
        liChild = ulIdDogBreeds.lastElementChild;
    }

    const arrStrBreedsSorted = arrStrBreedsSort
        .filter((strBreed) => strBreed.charAt(0).toLowerCase() === strCharacter.toLowerCase());

    renderBreeds(arrStrBreedsSorted);
}