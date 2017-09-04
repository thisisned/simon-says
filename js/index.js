var playerTurn,
    playerSequence,
    sequence,
    i,
    turn,
    onTimer,
    strict;

var audios = [];

audios.push(new Howl({ src: ['https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'] }));
audios.push(new Howl({ src: ['https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'] }));
audios.push(new Howl({ src: ['https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'] }));
audios.push(new Howl({ src: ['https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'] }));

function playSequence(length) {
  playerTurn = false;
  playerSequence = [];
  var duration = getDuration(length);
  onTimer = setInterval(function(){
    var number = sequence[i];
    lightUp(number, duration / 2);
    i++;
    if (i === length){
      i = 0;
      playerTurn = true;
      $('body').removeClass();
      clearInterval(onTimer);
    }
  }, duration);
}

function lightUp(number, duration){
  $("#" + number).addClass("bright");
  audios[number-1].play();
  setTimeout(function(){
    $("#" + number).removeClass("bright");
  }, duration);
}

function checkSequence(){
  for (var i = 0; i < playerSequence.length; i++){
    if (playerSequence[i] !== sequence[i]){
      $('body').addClass("backgroundWrong");
      if (strict){ reset();  }
      else { playSequence(turn); }
    }
  }
  if (playerSequence.length === 20){
    $("#victory").css('visibility','visible');
    reset();
  }
  else if (playerSequence.length === turn){
    turn++;
    $('body').addClass("backgroundRight");
    playerTurn = false;
    $("#levelCount").html(turn);
    playSequence(turn);
  }
}

function getDuration(turn){
  if (turn > 12) { return 600; }
  else if (turn > 8) { return 800; }
  else if (turn > 4) { return 1000; }
  else { return 1200; }
}

$(".button").click(function(){
  if (playerTurn){
    var id = parseInt($(this).attr("id"));
    lightUp(id, 250);
    playerSequence.push(id);
    checkSequence();
  }
})

function makeSequence(){
  var sequence = [];
  for (var i = 0; i < 20; i++) {
    sequence.push(Math.floor(Math.random() * 4 + 1));
  }
  return sequence;
}

function reset(){
  $("#start").addClass("active");
  $("#reset").removeClass("active");
  $("#levelCount").html("0");
  playerTurn = false;
  playerSequence = [];
  sequence = makeSequence();
  i = 0;
  turn = 1;
  strict = false;
  clearInterval(onTimer);
}

$("#start").click(function(){
  if ($("#start").hasClass("active")){
    $("#levelCount").html(turn);
    $("#reset").addClass("active");
    $("#victory").css('visibility','hidden');
    playSequence(turn);
    $("#start").removeClass("active");
  }
})

$("#reset").click(function(){
  if ($("#reset").hasClass("active")){
    reset();
  }
})

$("#strictCheck").change(function(){
  strict = strict == true ? false : true;
})

$(document).ready(function(){
  reset();
})