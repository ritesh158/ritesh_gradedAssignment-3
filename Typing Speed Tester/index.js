// define time limit for the game
let TIME_LIMIT = 60;

// define text array with required texts for the game
let text_array = [
  "She sells seashells by the seashore.",
  "I have got a date at a quarter to eight. I'll see you at the gate, so don't be late.",
  "I thought I thought of thinking of thanking you.",
  "A big black bear sat on a big black rug.",
  "Susie works in a shoeshine shop. Where she shines she sits, and where she sits she shines."
];

let timeLeft = TIME_LIMIT;
let timer = null;
let timeElapsed = 0;
let error_count = 0;
let total_errors = 0;
let characterTyped = 0;
let current_text = "";
let textIndex = 0;

// selecting required DOM elements
let timer_text = document.querySelector(".current_time");
let accuracy_text = document.querySelector(".current_accuracy");
let error_text = document.querySelector(".current_errors");
let cpm_text = document.querySelector(".current_cpm");
let wpm_text = document.querySelector(".current_wpm");
let input_text = document.querySelector(".input_text");
let input_area = document.querySelector(".input_area");
let restart_btn = document.querySelector(".restart_btn");
let cpm_main = document.querySelector(".cpm");
let wpm_main = document.querySelector(".wpm");

const getNewText = () => { 
  input_text.textContent = null;
  current_text = text_array[textIndex];

  // separate each character and make an element 
  // out of each of them to individually style them
  current_text.split('').forEach(char => {
    const charSpan = document.createElement('span')
    charSpan.innerText = char
    input_text.appendChild(charSpan)
  })

  // get the first input text
  if (textIndex < text_array.length - 1)
    textIndex++;
  else
    textIndex = 0;
}

const processCurrentText = () => {

  // get current input text and split it
  const current_input = input_area.value;
  current_input_array = current_input.split('');

  // increment total characters typed
  characterTyped++;

  error_count = 0;

  const textSpanArray = input_text.querySelectorAll('span');
  textSpanArray.forEach((char, index) => {
    let typedChar = current_input_array[index]

    // characters not currently typed
    if (typedChar == null) {
      char.classList.remove('correct_char');
      char.classList.remove('incorrect_char');

      // correct characters
    } else if (typedChar === char.innerText) {
      char.classList.add('correct_char');
      char.classList.remove('incorrect_char');

      // incorrect characters
    } else {
      char.classList.add('incorrect_char');
      char.classList.remove('correct_char');

      // increment number of errors
      error_count++;
    }
  });

  // display the number of errors
  error_text.textContent = total_errors + error_count;

  // update accuracy text
  let correctCharacters = (characterTyped - (total_errors + error_count));
  let accuracyVal = ((correctCharacters / characterTyped) * 100);
  accuracy_text.textContent = Math.round(accuracyVal);

  // if current text is completely typed
  // irrespective of errors
  if (current_input.length == current_text.length) {
    getNewText();

    // update total errors
    total_errors += error_count;

    // clear the input area
    input_area.value = "";
  }
}

const updateTimer = () => {
  if (timeLeft > 0) {
    // decrease the current time left
    timeLeft--;

    // increase the time elapsed
    timeElapsed++;

    // update the timer text
    timer_text.textContent = timeLeft + "s";
  }
  else {
    // finish the game
    finishGame();
  }
}

const finishGame = () => {
  // stop the timer
  clearInterval(timer);

  // disable the input area
  input_area.value = "***Game Over***";
  input_area.style.textAlign = "center";
  input_area.disabled = true;

  // show finishing text
  input_text.textContent = "Click on restart to start a new game.";

  // display restart button
  restart_btn.style.display = "block";

  // calculate cpm and wpm
  const cpm = Math.round(((characterTyped / timeElapsed) * 60));
  const wpm = Math.round((((characterTyped / 5) / timeElapsed) * 60));

  // update cpm and wpm text
  cpm_text.textContent = cpm;
  wpm_text.textContent = wpm;

  // display the cpm and wpm
  cpm_main.style.display = "block";
  wpm_main.style.display = "block";
}


const startGame = () => {

  resetGame();
  getNewText();

  // clear old and start a new timer
  clearInterval(timer);
  timer = setInterval(updateTimer, 1000);
}

const resetGame = () => {
  timeLeft = TIME_LIMIT;
  timeElapsed = 0;
  error_count = 0;
  total_errors = 0;
  characterTyped = 0;
  textIndex = 0;
  input_area.disabled = false;

  input_area.value = "";
  input_area.style.textAlign = "left";
  input_text.textContent = 'Click on the area below to start the game.';
  accuracy_text.textContent = 100;
  timer_text.textContent = timeLeft + 's';
  error_text.textContent = 0;
  restart_btn.style.display = "none";
  cpm_main.style.display = "none";
  wpm_main.style.display = "none";
}