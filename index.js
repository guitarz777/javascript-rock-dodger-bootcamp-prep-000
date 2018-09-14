/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {

  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)
 
    const dodgerRightEdge = dodgerLeftEdge + 40

    const rockLeftEdge = positionToInteger(rock.style.left)

    // FIXME: The rock is 20 pixel's wide -- how do we get the right edge?
    const rockRightEdge = rockLeftEdge + 20;

    if ((rockLeftEdge<=dodgerLeftEdge && rockRightEdge>=dodgerLeftEdge) || 
    (rockRightEdge>=dodgerRightEdge&&rockLeftEdge<=dodgerRightEdge) ||
    (rockRightEdge<=dodgerRightEdge&&rockLeftEdge>=dodgerLeftEdge)){
      return true;
    }else{
      return false;
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div');

  rock.className = 'rock';
  rock.style.left = `${x}px`;

  // Hmmm, why would we have used `var` here?
  var top = 0;

  rock.style.top = top;

  GAME.appendChild(rock);

  
  moveRock();
  function moveRock() {

    rock.style.top = `${top+=2}px`;  
    
    var col = window.checkCollision(rock);
    if (col===true){
      window.endGame();
    }
    if (top<375){
      requestAnimationFrame(moveRock);
    }
    if (top>375){
      rock.remove();
    }
    
    ROCKS.push(rock);
    return rock;
  }

}
/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  clearInterval(gameInterval);
  document.querySelector('#game').querySelectorAll('.rock').forEach(function(rock){rock.remove()});
  ROCKS.forEach(function(rock){rock.remove()});
  window.removeEventListener('keydown', moveDodger);
  
  
}

function moveDodger(e) {

  if (e.which===39){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerRight();
  }
  if (e.which===37){
    e.preventDefault();
    e.stopPropagation();
    moveDodgerLeft();
  }
}


function moveDodgerLeft() {

    var dodgerLeftEdge = positionToInteger(DODGER.style.left);
    
    function step(){
      if(dodgerLeftEdge>0){
      DODGER.style.left = `${dodgerLeftEdge -= 4}px`;
      }
    
    }

  window.requestAnimationFrame(step);
} 


function moveDodgerRight() {

  var dodgerLeftEdge = positionToInteger(DODGER.style.left);
  
  function step(){
    if (dodgerLeftEdge<360){
      DODGER.style.left =`${dodgerLeftEdge +=4}px`;
    }
  }
  window.requestAnimationFrame(step);
}

/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0;
}

function start() {
  window.addEventListener('keydown', moveDodger);

  START.style.display = 'none';

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)));
  }, 1000);
}
