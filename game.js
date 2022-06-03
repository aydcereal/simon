var buttonColours = ["red","blue","green","yellow"]

var gamePattern = [];
var userClickedPattern = []


var level = 0;
var started = false


// Audio
const blue = new Audio("sounds/blue.mp3" );
const green = new Audio("sounds/green.mp3" );
const red = new Audio("sounds/red.mp3" );
const yellow = new Audio("sounds/yellow.mp3" );
const wrong = new Audio("sounds/wrong.mp3" );



$(document).keydown(function(){
  if(!started){
    nextSequence()
    started = true
  }
});



$(".start").click(function(){
  
  if(!started){
    nextSequence()
    started = true
  }   
  
})
$(".btn").click(function(){

  var userChosenColor = $(this).attr("id")
  userClickedPattern.push(userChosenColor)

  playSound(userChosenColor);
  animatePress(userChosenColor);


  checkAnwser(userClickedPattern.length-1)
});



function nextSequence(){
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

   // $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
   // playSound(randomChosenColour)

  for(i = 0; i<gamePattern.length; i++ ){
      task(i);
   }

function task(i){
  setTimeout(function(){
    $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
    playSound(gamePattern[i]);
  }, 500 * i);

}
  level++
  $("h1").text("Level "+ level)
  userClickedPattern = []


}

function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3")
    audio.play();

}

function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed")
setTimeout(function () {
  $("#" + currentColor).removeClass("pressed");
}, 100);
}

function checkAnwser(anwser){
  if(userClickedPattern[anwser]==gamePattern[anwser]){
    console.log("Success")
    if (userClickedPattern.length === gamePattern.length){

      //5. Call nextSequence() after a 1000 millisecond delay.
      setTimeout(function () {
        nextSequence();
      }, 1000);

    }
  }else {
    playSound("wrong")
    $("body").addClass("game-over")
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press Any Key to Restart")

    startOver();

  }
}

function startOver(){
  started = false
  gamePattern = [];
  level = 0;
}
