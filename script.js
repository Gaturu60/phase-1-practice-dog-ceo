

document.addEventListener('DOMContentLoaded', function() {
    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";

    fetch(imgUrl)
        .then(response => response.json())
        .then(data => {
            const images = data.message; // Array of image URLs

            const imageContainer = document.getElementById('dog-image-container');

            images.forEach(imageUrl => {
                const img = document.createElement('img');
                img.src = imageUrl;
                img.style.width = '200px'; // Optional: Adjust image size
                imageContainer.appendChild(img);
            });
        })
        .catch(error => {
            console.error('Error fetching dog images:', error);
        });
});



const breedUrl = "https://dog.ceo/api/breeds/list/all";

fetch(breedUrl)
    .then(response => response.json())
    .then(data => {
        const breedsObject = data.message; // Object with breed categories and sub-breeds

        const breedList = document.getElementById('dog-breeds');

        // Iterate over the breedsObject to get all breeds
        for (const breed in breedsObject) {
            if (breedsObject[breed].length === 0) {
                // If there are no sub-breeds, add the breed as an <li>
                addBreed(breed);
            } else {
                // If there are sub-breeds, add the breed as an <li> and each sub-breed as an <li> under it
                breedsObject[breed].forEach(subBreed => {
                    addBreed(`${subBreed} ${breed}`); // Display sub-breed with breed
                });
            }
        }

        function addBreed(breedName) {
            const li = document.createElement('li');
            li.textContent = breedName;
            breedList.appendChild(li);

            // Challenge 3: Change font color on click
            li.addEventListener('click', function() {
                li.style.color = 'blue'; // Change color as per requirement
            });
        }
    })
    .catch(error => {
        console.error('Error fetching dog breeds:', error);
    });



const filterDropdown = document.getElementById('breed-dropdown');

filterDropdown.addEventListener('change', function(event) {
    const selectedLetter = event.target.value;

    // Clear existing list
    breedList.innerHTML = '';

    // Filter breeds and display those starting with selectedLetter
    for (const breed in breedsObject) {
        if (breed.startsWith(selectedLetter)) {
            if (breedsObject[breed].length === 0) {
                addBreed(breed);
            } else {
                breedsObject[breed].forEach(subBreed => {
                    addBreed(`${subBreed} ${breed}`);
                });
            }
        }
    }
});

