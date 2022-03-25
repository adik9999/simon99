// $("#green").click(function(){
//   $("#green").css("background-color","black");
//   setTimeout(function()
//   {
//     $("#green").css("background-color","");
//   },100);
// });
var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var gamebegun = false;
var lvl = 0;
//a keypress
$(document).keypress(function(e) {
  if (gamebegun == false) {
    $("h1").text("Level: " + lvl);
    nextSequence();
    gamebegun = true;
    console.log(userClickedPattern);
    console.log(gamePattern);
  }
});
  $(".btn").click(function() {
    userClickedPattern.push($(this).attr("id"));
    playSound($(this).attr("id"));
    animatePress($(this).attr("id"));
      checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(num){
  if(userClickedPattern[num]==gamePattern[num])
  {
    console.log("Suck");
    if(userClickedPattern.length==gamePattern.length)
    {
      console.log("LVL COMPLETE");
      setTimeout(function()
      {
        nextSequence();
      },500);
    }
  }
  else{
    console.log("FAIL");
    var aud=new Audio("wrong.mp3");
    aud.play();
    $("body").addClass("game-over");
    setTimeout(function()
    {
      $("body").removeClass("game-over");
    },200);
    $("h1").text("Game Over Press Any Key To Restart...");
    startOver();
  }
}
function startOver(){
  lvl=0;
  gamePattern=[];
  gamebegun=false;
}
//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
// function checkAnswer(currentLevel) {
//
//     //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
//     if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
//
//       console.log("success");
//
//       //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
//       if (userClickedPattern.length === gamePattern.length){
//
//         //5. Call nextSequence() after a 1000 millisecond delay.
//         setTimeout(function () {
//           nextSequence();
//         }, 1000);
//
//       }
//
//     } else {
//
//       console.log("wrong");
//
//     }
//
// }
function nextSequence() {
  userClickedPattern=[];   //so that the entire seq needs to be entered
  lvl++;
  $("#level-title").text("Level " + lvl);
  randomNumber = Math.floor(Math.random() * 4);
  randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#" + randomChosenColor).fadeOut(500).fadeIn(500);
  playSound(randomChosenColor);
}

function playSound(name) {
  var aud = new Audio( name + ".mp3");
  aud.play();
}

function animatePress(currentColor) {
  $("." + currentColor).addClass("pressed");
  setTimeout(function() {
    $("." + currentColor).removeClass("pressed");
  }, 100);
}
