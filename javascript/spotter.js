// Javascript for Memory Game
//
// After page is loaded, add event listeners for card flips, deal button,
// and modal hiding.  Then deal.
//
window.addEventListener("load", function () {

    document.querySelector('.tableau').addEventListener("click", cardFlip);

    document.querySelector('.deal_button').addEventListener("click", deal);

    document.querySelector('.modal').addEventListener("click", function() {
        document.querySelector('.modal').style.display = "none";
        clearInterval(tallyHo.elapsedVar);
      }
    );

    deal();

  }
);
// This function is invoked on page load, or when the New Deal button is clicked.
// It first calls the tallyHo.init() method to initilialize
// all the tallyHo object variables, shuffle the deck, and start the timer.
// It then resets styles (which will have changed during course of play)
// and sets the tableau face images to their shuffled order,
// then sets the progress variable displays to their initial display
// values. (Which is not functionally necessary since they get updated on the
// first click anyway, but they would look weird otherwise.)
function deal() {
  tallyHo.init();

  let cards = document.querySelectorAll('.card_face');
  for (let i = 0; i < cards.length; i++) {
    cards[i].style.opacity = '0';
    cards[i].style.border = '3px solid skyblue';
    cards[i].src = `images/${tallyHo.cardDeck[i]}`;
  };

  document.querySelector('.star_rating').innerHTML = "&#9733&#9733&#9733&#9733&#9733";
  document.querySelector('.tries').innerHTML = "0";
  document.querySelector('.matches').innerHTML = "0";
  document.querySelector('.pairs_possible').innerHTML = "120";
}
//
// This function is invoked by tallyHo.init() and displays the elapsed time
// counter.
function elapsedTime() {
  document.querySelector('.total_time').innerHTML =
    ((performance.now() - tallyHo.startTime) / 1000).toFixed(2);
}
// This function is invoked by the event listener on the card tableau.
// Event delegation is used, so we need to make sure it is an image being
// clicked.  If not, ignore. If so, but the card face is already visible,
// do nothing.  Else make the face visible and suspend the event handler
// (to keep the user from clicking on more cards until we've digested this
// one.) Set a brief timeout so the browser can make the opacity change visible.
// Then evaluate what the user did in function evalFlip.
function cardFlip(event) {
  if (event.target.nodeName == 'IMG') {
    if (event.target.style.opacity != '1') {
      event.target.style.opacity = '1';
      document.querySelector('.tableau').removeEventListener("click", cardFlip)
        setTimeout(function () {
          evalFlip(event);
        }, 100
      );
    };
  };
};
// This game is about pairs.  So the card flipped will either be
// the first of a pair attempt, or the second.  If the first,
// do nothing but set firstOfPair to false. If the second, see
// if the src image matches the previous card exposed.  If so, it
// is a match; decorate, increment match counter and set firstOfPair
// to true, preparing for next pair.  If no match, delay for a brief
// period, giving the user time to see the cards, then hide the cards,
// and set firstOfPair to true, preparing for next pair.
function evalFlip(event) {
  tallyHo.tries += 1;
  if (tallyHo.firstOfPair) {
    tallyHo.firstOfPair = false;
    cleanUp(event);
  } else {
    if (event.target.src == tallyHo.lastEventTarget.src) {
      tallyHo.matches += 1;
      event.target.style.border = '3px solid lightgreen';
      tallyHo.lastEventTarget.style.border = '3px solid lightgreen';
      tallyHo.firstOfPair = true;
      cleanUp(event);
    }
    else {
      setTimeout(function () {
           hideCards(event);
         }, 1000
       );
    };
  };
}
//  If the match attempt failed, hide cards and
//  set firstOfPair to true, preparing for next pair.
function hideCards(event) {
  event.target.style.opacity = 0;
  tallyHo.lastEventTarget.style.opacity = 0;
  tallyHo.firstOfPair = true;
  cleanUp(event);
}
//
//
// Save the event.target for comparison,
// enable the event listener, and update progress display.
// If all cards matched, call gameOver()
function cleanUp(event) {
  tallyHo.lastEventTarget = event.target;

  document.querySelector('.tableau').addEventListener("click", cardFlip);

  for (let i = 0; i < 5; i++)  {
    if (tallyHo.tries < tallyHo.starRating[i][0]) {
        document.querySelector('.star_rating').innerHTML =
          tallyHo.starRating[i][1];
        break;
     };
  };

  document.querySelector('.tries').innerHTML = tallyHo.tries;
  document.querySelector('.matches').innerHTML = tallyHo.matches;

  let n = 16 - (tallyHo.matches * 2);
  document.querySelector('.pairs_possible').innerHTML =
    ( Math.pow(n,2) - n ) / 2;

  if (tallyHo.matches == 8) {
    gameOver();
  };
}
//
//
// at end of game, compute final time, stop timer and display modal
// with end-of-game summary stats.
function gameOver() {
  document.querySelector('.total_time').innerHTML =
    ((performance.now() - tallyHo.startTime) / 1000).toFixed(2);

  clearInterval(tallyHo.elapsedVar);

  document.querySelector('.modal_summary').innerHTML =
    document.querySelector('.result_span').innerHTML;

  document.querySelector('.modal').style.display = "block";
}
//
//
// Object for keeping track of last event, firstOfPair, tries,
// matches, time, and array from which tableau is populated.
let tallyHo = {
  lastEventTarget: [],  // used to store reference to last event.target to determine matching
  firstOfPair: true,  // Boolean for determining if flip is first of pair
  tries: 0,       // cards clicked
  matches: 0,     // pairs matched
  startTime: 0,  // time of deal
  elapsedVar: 0,   // this is the variable used by setInterval() timer
  cardDeck: [ 'c1.jpg', 'c1.jpg', 'c8.jpg', 'c8.jpg',
              'd1.jpg', 'd1.jpg', 'd7.jpg', 'd7.jpg',
              'h1.jpg', 'h1.jpg', 'h6.jpg', 'h6.jpg',
              's1.jpg', 's1.jpg', 's4.jpg', 's4.jpg'
            ],
  starRating: [    // this relates number of tries to a star rating
      ['22','&#9733&#9733&#9733&#9733&#9733'],
      ['32','&#9733&#9733&#9733&#9733'],
      ['42','&#9733&#9733&#9733'],
      ['52','&#9733&#9733'],
      ['9999','&#9733']
    ],
  init: function() {
        this.lastEventTarget = [];
        this.firstOfPair = true;
        this.tries = 0;
        this.matches = 0;
        this.startTime = performance.now();
        this.elapsedVar = window.setInterval(elapsedTime, 500);
        //shuffle card deck.  See
        //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array/2450976#2450976
        // for code source
        var currentIndex = this.cardDeck.length, temporaryValue, randomIndex;
        // While there remain elements to shuffle...
        while (0 !== currentIndex) {
            // Pick a remaining element...
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;
            // And swap it with the current element.
            temporaryValue = this.cardDeck[currentIndex];
            this.cardDeck[currentIndex] = this.cardDeck[randomIndex];
            this.cardDeck[randomIndex] = temporaryValue;
         };
    }
}
