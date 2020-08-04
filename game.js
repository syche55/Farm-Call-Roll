var buttonAnimals = ["cat", "pig", "cow", "dog"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

var bestScore = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {
  var userChosenAnimal = $(this).attr("id");
  userClickedPattern.push(userChosenAnimal);
  playSound(userChosenAnimal);
  animatePress(userChosenAnimal);
  checkAnswer(userClickedPattern.length - 1);
});

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenAnimal = buttonAnimals[randomNumber];
  gamePattern.push(randomChosenAnimal);
  $("#" + randomChosenAnimal).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenAnimal);

}


function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === gamePattern.length) {
      bestScore = Math.max(bestScore, currentLevel+1);
      $("h3").text("Your best socre is: "+bestScore.toString());
      setTimeout(function() {
        nextSequence();
      }, 1500);
    }
  } else {
    var audio = new Audio("sounds/wrong.mp3");
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentAnimal) {
  $("#" + currentAnimal).addClass("pressed");
  setTimeout(function() {
    $("#" + currentAnimal).removeClass("pressed");
  }, 100);
}
