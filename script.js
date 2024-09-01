const imageInput = document.getElementById('imageInput');
const imageContainer = document.getElementById('imageContainer');
const pickButton = document.getElementById('pickButton');
const selectedImage = document.getElementById('selectedImage');
let imagesArray = [];

// Charger les sons
const clickSound = new Audio('clic.mp3');
const dingSound = new Audio('ding.mp3'); // Charger le son "ding"

// Charger les images sélectionnées
imageInput.addEventListener('change', function() {
    imagesArray = [];
    imageContainer.innerHTML = ''; // Vider le conteneur d'images

    for (let i = 0; i < imageInput.files.length; i++) {
        const file = imageInput.files[i];
        const reader = new FileReader();

        reader.onload = function(e) {
            const img = document.createElement('img');
            img.src = e.target.result;
            imageContainer.appendChild(img);
            imagesArray.push(e.target.result); // Ajouter l'image à la liste des images
        };

        reader.readAsDataURL(file);
    }
});

// Fonction pour jouer le son 3 fois de suite
function playClickSoundMultipleTimes(times, callback) {
    let count = 0;
    function playSound() {
        if (count < times) {
            clickSound.play();
            count++;
            setTimeout(playSound, 100); // Temps entre chaque répétition du son
        } else if (callback) {
            callback(); // Exécuter le callback après la fin des répétitions
        }
    }
    playSound();
}

// Fonction pour afficher les images en défilement avec son
function shuffleImages() {
    if (imagesArray.length > 0) {
        let currentIndex = 0;
        const totalDuration = 6000; // Durée totale du défilement (6 secondes)
        const intervalDuration = 100; // Temps entre chaque changement d'image (100ms)
        const interval = setInterval(function() {
            selectedImage.src = imagesArray[currentIndex];
            playClickSoundMultipleTimes(3); // Jouer le son 3 fois à chaque changement d'image
            currentIndex = (currentIndex + 1) % imagesArray.length;
        }, intervalDuration);

        // Arrêter le défilement après 6 secondes et choisir une image au hasard
        setTimeout(function() {
            clearInterval(interval);
            const randomIndex = Math.floor(Math.random() * imagesArray.length);
            selectedImage.src = imagesArray[randomIndex];
            playClickSoundMultipleTimes(3, function() {
                dingSound.play(); // Jouer le son "ding" à la fin du défilement
            });
        }, totalDuration);
    } else {
        alert('Veuillez d\'abord ajouter des images.');
    }
}

// Assigner la fonction shuffleImages au bouton
pickButton.addEventListener('click', shuffleImages);

// Assigner la touche m pour lancer la roulette
document.addEventListener('keydown', function(event) {
    if (event.key === 'm' || event.key === 'M') {
        shuffleImages();
    }
});
