//  crate variable and select form class in index  html
const playBoard = document.querySelector('.board') // a add dot because class name is board
const startButton = document.querySelector('button') // button from html
const moves = document.querySelector('.moves') // a add dot because class name is  moves
const time = document.querySelector('.timer') // a add dot because class name is  timer
// crate array to add emojis form
//I copy emojis from this link https://emojipedia.org/
const emojis = ['🍩', '🍰', '🍪', '☕', '🥐', '🍫', '🍟', '🍕'];

// variable
let openCard = null // add null because there is no open card at the beginnning
let lockBoard = false // add false to can click on cards
let moveCount = 0 // add zero to start from zero and increases
let seconds = 60 // start number 60 and decrease
let clock = null // to store clock in clearInterval and can stop timer
// variable musics
let winMusic;
let lossMusic;

// https://www.w3schools.com/graphics/game_sound.asp link reference for music code
// create function name is start music
function startMusic() {
     //https://pixabay.com/sound-effects/search/victory/?pagi=2 link for win music
    winMusic = new Audio("assets/winMusic.mp3"); // name of music add
    //https://pixabay.com/sound-effects/search/lose/ link for web loss music
    lossMusic = new Audio("assets/lossMusic.mp3"); //name for music add
}


//crate function name mix Cards with one parameter name arr each time random cards
// sort
function mixCards(arr) {
  return arr.sort(() => Math.random() - 0.5);
}
// crate function name build Board
function buildBoard() {
  playBoard.textContent = ''// change board empty  delete any card open befor
 // ... emojis add two can each emoji repeat
  const cards = mixCards([...emojis,...emojis]) // mix emojis and duplication emojis
 // for loop start with zero each time increase one to length of cards
  for (let i = 0; i < cards.length; i++) { // loop crate cards
    //add name card
    const card = document.createElement('div') // create element
    card.className = 'card' // create class
    // add code html class name card-front and class name card-back
    card.innerHTML = // add card two face front and back
    
  '<div class="card-front"></div>' +
  '<div class="card-back">' + cards[i] + '</div>'
  // when click on card is flip to show emoji
  card.onclick = () => handleFlip(card) // call function and compare the card if it matches
   // add card to play  in board
    playBoard.append(card) // add card inside the board
  }
}
// note https://www.w3schools.com/jsref/met_win_settimeout.asp i copy time function from w3schools
// add function name start time is measure in seconds

function startTimer() {
  clearTimeout(clock); // stop any timer is before

  function sec() {
    time.textContent = `Time: ${seconds} sec`; // add text time and sec
// if secound equals zero or less than
    if (seconds <= 0) {
      // stop play game
      lockBoard = true;
      // start loss music play
          lossMusic.play();

    const header2 = document.querySelector('h2'); // select h2 from index html
       header2.textContent = " The time is finish try play again"; //add new message
       header2.style.color = "red"; // add color red to message

      return; // stop timer
    }

    seconds--; //decrease time by one
    clock = setTimeout(sec, 1000); // restart function after 1 sec
  }

  sec(); // call function to start time
}

// function to start play game
function startPlay() {
  moveCount = 0; // start moves zero
  seconds = 60 // start seconds 60
  openCard = null; // delete any open card
  lockBoard = false; // start game open
   startMusic(); // call function
  playBoard.classList.remove('hidden'); // is remove hidden to display board
  const header2 = document.querySelector('h2')
  header2.textContent = "Start Play Memory Card Game"; // add message h2v
  header2.style.color = "white"; //add color white to h2
      // display text moves and time
  moves.textContent = '0 moves';
  time.textContent = 'Time: 0 sec';
 // calls functions
  buildBoard(); // crate new cards
  startTimer(); // start timer


}
// open card , save card , compares two cards , moves increase
 // crate handle flip with one parmeter name card
const handleFlip = (card) => {
  // if board is lock or card is flipped
  if (lockBoard || card.classList.contains('flipped')) return;
   // flipped card
  card.classList.add('flipped');
   // add if to check open card is first card flipped
  if (!openCard) {
    openCard = card;  // save card in open card
    return; // return open card
  }

  // start with second card
  moveCount++;
  //save result
  moves.textContent = `${moveCount} moves`;

  checkCards(card); // check is two cards is Match emoji ?
}
//function to check cards
// compare between open card and second card
function checkCards(secondCard) {
  // is first card open is it equal second card
  const isMatch =
  openCard.querySelector('.card-back').textContent ===
  secondCard.querySelector('.card-back').textContent;
   // if two card match open card is null and finish
  if (isMatch) {
    openCard.classList.add('matched');
    secondCard.classList.add('matched');
    openCard = null; // remove open card
    checkFinish(); // check if play finish
    //if is not match remove two card open and second
    //800 is time to flipped
  } else {
    lockBoard = true; // stop board
    // 800 time is card open
    setTimeout(() => {
      // card is closed
      openCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      openCard = null; // remove open card
      lockBoard = false; //open game again
    }, 800);
  }
}
// function name check finish
// fucation start music , stop time , save result , display win page
function checkFinish() {
  //check how many card is flipped
  //check card is open
  const matchedCards = document.querySelectorAll('.card.flipped').length;
  // add eight emojis in array  and * 2 to make total number of cards is 16
  //check if the all card open and paly finish
  //*2 becouse have 8 emoji and i need 16
  if (matchedCards === emojis.length * 2) {
     //  start music

         winMusic.play();
      // stop timer
    clearTimeout(clock)

    // store result moves and time

    localStorage.setItem('moves', moveCount);
    localStorage.setItem('time', seconds);

    setTimeout(() => {
      // go to other page name index.html
      //display result
      //after 6 sec go win page
      window.location.href = "win.html";
    }, 6000);
  }
}
// when click on start button display board
startButton.onclick = startPlay;


