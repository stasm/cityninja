Template.colophon.onCreated(trackPageView);
Template.colophon.onRendered(draw);

Template.colophon.events({
  'click button': pickColor,
  'click .won': resetGame,
  'click [target="_system"]': openExternal
});

Template.colophon.helpers({
  ver() {
    return VERSION;
  },
  movesCount() {
    return Session.get('moves count');
  },
  gamesCount() {
    return Session.get('games count');
  },
  bestScore() {
    return Math.min(Session.get('best score'), Session.get('current count'));
  },
  wonClass() {
    if (Session.get('win condition')) {
      return 'won';
    }
  },
});

Template.eula.onCreated(trackPageView);
Template.eula.events({
  'click [target="_system"]': openExternal
});

function openExternal(evt) {
  evt.stopImmediatePropagation();
  evt.preventDefault();
  window.open(evt.currentTarget.getAttribute('href'), '_system');
}


var defaultBoard = [
  [1,3,0,2,1,0,0,0],
  [0,3,1,1,2,2,1,0],
  [3,1,3,4,3,1,1,2],
  [0,3,4,3,3,3,2,1],
  [0,6,5,3,1,4,5,1],
  [5,0,6,5,4,1,4,0],
  [0,6,5,6,5,1,3,1],
  [0,0,0,1,0,3,6,0],
];

var board = [
  [1,3,0,2,1,0,0,0],
  [0,3,1,1,2,2,1,0],
  [3,1,3,4,3,1,1,2],
  [0,3,4,3,3,3,2,1],
  [0,6,5,3,1,4,5,1],
  [5,0,6,5,4,1,4,0],
  [0,6,5,6,5,1,3,1],
  [0,0,0,1,0,3,6,0],
];

var colors = [
  'rgb(250,250,250)',
  'rgb(254,202,8)',
  'rgb(248,162,40)',
  'rgb(18,148,223)',
  'rgb(16,129,199)',
  'rgb(234,47,29)',
  'rgb(229,19,25)',
];

Session.set('moves count', 0);
Session.set('games count', 0);
Session.set('current count', 0);
Session.set('best score', 20);
Session.set('win condition', false);
Session.set('winning', '');
var checkedSquares = [];

function draw(){

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  for (var j = 0; j < board.length; j++) {
    for (var i = 0; i < board.length; i++) {

      ctx.fillStyle = colors[board[j][i]];

      ctx.fillRect (i*35, j*35, 35, 35);
    }
  }
}

function drawDefault(){

  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  for (var j = 0; j < defaultBoard.length; j++) {
    for (var i = 0; i < defaultBoard.length; i++) {

      ctx.fillStyle = colors[defaultBoard[j][i]];

      ctx.fillRect (i*35, j*35, 35, 35);
    }
  }
}

function resetGame(evt){
  var winning = Session.get('win condition');
  if (winning) {
    drawDefault();
    Session.set('winning', '');
    Session.set('win condition', false);
    Session.set('current count', Session.get('moves count'));
    Session.set('moves count', 0);
    var gamesCnt = Session.get('games count');
    Session.set('games count', gamesCnt + 1);
    board = JSON.parse(JSON.stringify(defaultBoard));
  }
}

function pickColor(evt) {
  
  var count = Session.get('moves count');
  Session.set('moves count', count + 1);
  var color = evt.currentTarget.getAttribute('data-color');
  checkElement(0, 0, checkColor(0, 0), parseInt(color, 10));
  checkedSquares = [];
  draw();
  checkWinningConditions();
}

function checkColor(x, y) {
  sourceColor = board[y][x];
  return parseInt(sourceColor, 10);
}

function checkElement(x, y, sourceColor, pickColor) {
  if (checkedSquares.indexOf(x + '-' + y) > -1) {
    return;
  }

  checkedSquares.push(x + '-' + y);

  if ((x === 0 && y === 0) || checkColor(x, y) === sourceColor) {
    updateElement(x, y, pickColor);

    if (x > 0) {
      checkElement(x-1, y, sourceColor, pickColor);
    }

    if (y > 0) {
      checkElement(x, y-1, sourceColor, pickColor);
    }

    if (x < board.length-1) {
      checkElement(x+1, y, sourceColor, pickColor);
    }

    if (y < board[0].length-1) {
      checkElement(x, y+1, sourceColor, pickColor);
    }
  }
}

function checkWinningConditions(){
  var win = Session.get('win condition');
  var winningColor = board[0][0];
  for (var j = 0; j < board.length; j++) {
    for (var i = 0; i < board.length; i++) {
      if (parseInt([board[j][i]], 10) !== winningColor) {
        win = Session.set('win condition', false);
      } else {
        Session.set('win condition', true);
      }
    }
  }
}

function updateElement(x, y, color) {
  board[y][x] = color;
}

Template.eula.events({
  ['click section a'](evt) {
    evt.preventDefault();
    evt.stopImmediatePropagation();
  }
});
