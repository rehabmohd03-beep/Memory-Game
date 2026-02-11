//  crate variable and select form class in memory html
const playBoard = document.querySelector('.board') // a add dot because class name board
const startButton = document.querySelector('button') // button from html
const moves = document.querySelector('.moves') // a add dot because class name moves
const time = document.querySelector('.timer') // a add dot because class name timer
// crate array to add emojis form
//I copy emojis from this link https://emojipedia.org/
const emojis = ['🍩', '🍰', '🍪', '☕', '🥐', '🍫', '🍟', '🍕'];

// variable
let openCard = null
let lockBoard = false
let moveCount = 0 // add zero to start from zero and increases
let seconds = 60 // start number 60 and decrease
let clock = null
// variable musics
let winMusic;
let lossMusic;
// https://www.w3schools.com/graphics/game_sound.asp link reference for music code

function startMusic() {
     //https://pixabay.com/sound-effects/search/victory/?pagi=2 link for win music
    winMusic = new sound("assets/winMusic.mp3");
    //https://pixabay.com/sound-effects/search/lose/ link for web loss music
    lossMusic = new sound("assets/lossMusic.mp3");
}
//crate function name mix Cards with one parameter name arr each time random cards


function mixCards(arr) {
  //add for loop start with length last one in array and the loop continue to zero each time -1
  for (let i = arr.length - 1; i > 0; i--) {
  // inside loop add random number  and two arr i and arr j and return arr all
  // floor keep number int
  // j is result location of index i chose
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr;
}

// crate function name build Board
function buildBoard() {
  // change board empty
  playBoard.textContent = ''
 // ... emojis add two can each emoji repeat
  const cards = mixCards([...emojis,...emojis])
 // for loop start with zero each time increase one to length of cards
  for (let i = 0; i < cards.length; i++) {
    //add name card
    const card = document.createElement('div')
    card.className = 'card'
    // add code html class name card-front and class name card-back
    card.innerHTML =
  '<div class="card-front"></div>' +
  '<div class="card-back">' + cards[i] + '</div>'
  // when click on card is flip to show emoji
  card.onclick = () => handleFlip(card)
   // add card to play  in board
    playBoard.append(card)
  }
}
// note https://www.w3schools.com/jsref/met_win_settimeout.asp i copy time function from w3schools
// add function name start time is measure in seconds

function startTimer() {
  clearTimeout(clock);

  function sec() {
    time.textContent = `Time: ${seconds} sec`;
// if secound equals zero or less than
    if (seconds <= 0) {
      // stop game
      lockBoard = true;
      // start loss music play 
     if(lossMusic) {
          lossMusic.play();
      }
    const header2 = document.querySelector('h2');
       header2.textContent = " The time is finish try play again";
       header2.style.color = "red";

      return;
    }

    seconds--;
    clock = setTimeout(sec, 1000);
  }

  sec();
}

// function to start play game
function startPlay() {
  moveCount = 0; // start moves zero
  seconds = 60 // start seconds 60
  openCard = null; // delete any open card
  lockBoard = false;
   startMusic();
  playBoard.classList.remove('hidden'); // is remove board if second equel zero
  const header2 = document.querySelector('h2')
  header2.textContent = "Start Play Memory Card Game";
  header2.style.color = "white";
      // display text moves and time
  moves.textContent = '0 moves';
  time.textContent = 'Time: 0 sec';
 // calls functions
  buildBoard();
  startTimer();


}
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
  moves.textContent = `${moveCount} moves`;

  checkCards(card); // check is two cards is Match emoji ?
}
//function to check cards
function checkCards(secondCard) {
  // is first card open is it equal second card
  const isMatch = openCard.innerHTML === secondCard.innerHTML;
   // if two card match open card is null and finish
  if (isMatch) {
    openCard.classList.add('matched');
    secondCard.classList.add('matched');
    openCard = null;
    checkFinish();
    //if is not match remove two card open and second
    //800 is time to flipped
  } else {
    lockBoard = true;
    setTimeout(() => {
      openCard.classList.remove('flipped');
      secondCard.classList.remove('flipped');
      openCard = null;
      lockBoard = false;
    }, 800);
  }
}
// function name check finish
function checkFinish() {
  //check how many card is flipped
  const matchedCards = document.querySelectorAll('.card.flipped').length;
  // add eight emojis in array  and * 2 to make total number of cards is 16
  if (matchedCards === emojis.length * 2) {
     //  start music
      if(winMusic)
        { winMusic.play();}

    clearInterval(clock);

    // store result moves and time

    localStorage.setItem('moves', moveCount);
    localStorage.setItem('time', seconds);

    setTimeout(() => {
      // go to other page name index.html
      //display result
      window.location.href = "assets/win.html";
    }, 6000);
  }
}
// when click on start button display board
startButton.onclick = startPlay;

function sound(src) {
    this.sound = new Audio(src);

    this.play = function() {
        this.sound.play();
    }

    this.stop = function() {
        this.sound.pause();
    }
}
