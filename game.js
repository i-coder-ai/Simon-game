var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

    $(".btn").click(function() {
        var userChosenColour = $(this).attr("id");
        userClickedPattern.push(userChosenColour);

        var currentLevel = userClickedPattern.length - 1;
        console.log(userClickedPattern);

        playSound(userChosenColour);
        animatePress(userChosenColour);

        checkAnswer(currentLevel);
    });
    
    function playSound(userChosenColour) {
        var audio = new Audio("sounds/" + userChosenColour + ".mp3");
        audio.play();
    }

    function animatePress(userChosenColour) {
        $("#" + userChosenColour).addClass("pressed");
        setTimeout(() => {
            $("#" + userChosenColour).removeClass("pressed");
        }, 100);
    }

    $(document).keydown(function() {
        if(started == false) {
            $("#level-title").text("Level " + level);
            nextSequence();
            started = true;
        }  
    });

    function checkAnswer(currentLevel) {
        if(userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
            console.log("success");

            if(userClickedPattern.length == gamePattern.length) {
                setTimeout(() => {
                    nextSequence();
                }, 1000);
            }
        }
        else{
            var audio = new Audio("sounds/wrong.mp3");
            audio.play();
            $("body").addClass("game-over");
            setTimeout(() => {
                $("body").removeClass("game-over"); 
            }, 200);
            $("#level-title").text("Game Over, Press Any Key to Restart");
            startOver();
        }
    }

    function startOver() {
        level = 0;
        gamePattern = [];
        started = false;
    }