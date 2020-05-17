const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const finalMessage = document.getElementById("final-message");
const popUp = document.getElementById("popup-container");
const notification = document.getElementById("notification - container");
const figureParts = document.querySelectorAll(".figure-part");
const playAgain = document.getElementById("play-button");

const words = ["application", "programming", "interface", "wizard"];

let selectedWords = words[Math.floor(Math.random() * words.length)];

const correctLetters = [];
const wrongLetters = [];

/////////////////////////////////////
function displayLetters() {
  wordEl.innerHTML = `
    ${selectedWords
      .split("")
      .map(
        letter => `
        <span class="letter">
          ${correctLetters.includes(letter) ? letter : ""}
        </span>
        `
      )
      .join("")}
    `;

  const innerNum = wordEl.innerText.replace(/\n/g, "");

  if (innerNum === selectedWords) {
    finalMessage.innerText = "you won";
    popUp.style.display = "flex";
  }
}

//////////////////////////////////////
function notficationGenrator() {
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

/// updateWrongLetters ///////
function updateWrongLetters() {
  const wrong = "wrong letter";
  wrongLettersEl.innerHTML = `
 ${wrongLetters.length > 0 ? `<p>${wrong}</p>` : ""}

  ${wrongLetters.map(
    letter =>
      `<span>
      ${letter}
    </span>`
  )}`;

  figureParts.forEach((part, index) => {
    if (index < wrongLetters.length) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
    if (figureParts.length === wrongLetters.length) {
      popUp.style.display = "flex";
      finalMessage.innerHTML = "you lost!";
    }
  });
}

//////// DOM /////////////////////////////
window.addEventListener("keyup", e => {
  if (e.which >= 65 && e.which <= 90) {
    const letter = e.key;
    if (selectedWords.includes(letter)) {
      correctLetters.push(letter);
      displayLetters();
    } else if (!selectedWords.includes(letter)) {
      wrongLetters.push(letter);
      updateWrongLetters();
    } else {
      notficationGenrator();
    }
  }
});

//////////////////////////

playAgain.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);

  selectedWords = words[Math.floor(Math.random() * words.length)];

  displayLetters();

  figureParts.forEach(part => (part.style.display = "none"));
  wrongLettersEl.innerHTML = null;

  popUp.style.display = "none";
});

displayLetters();
