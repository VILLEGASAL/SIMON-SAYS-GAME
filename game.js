
let buttonColors = ["red", "blue", "green", "yellow"] // HOLDS COLORS.
let gamePattern = [] // HOLDS RANDOM COLORS BASED ON GENERATED RANDOM NUMBER IN nextSequence FUNCTION.
let userClickedPattern = [] // HOLDS THE USER CLICKED COLOR PATTERN. 

/*  THIS VARIABLE DETERMINES IF THE GAME HAS STARTED OR NOT. BY FIRST TIME OR BY DEFAULT IT IS SET TO FALSE. 
IT WILL ONLY BECOME TRUE IF THE USER CLICKS ANY BUTTON FOR THE FIRST TIME */
let hasStarted = false

// CURRENT LEVEL
let level = 0

/* THIS FUNCTION LISTENS TO A KEY PRESS EVENT AND CHECKS IF THE GAME HAS STARTED OR NOT VIA hasStarted BOOLEAN VARIABLE. 
IF NOT IT WILL START THE GAME AND SET THE hasStarted VARIABLE INTO TRUE. AND INCREMENT THE level VARIABLE AND CHANGE THE TEXT
TO ITS CURRENT LEVEL. */
$(document).keypress((event) => {
    
    if(hasStarted === false){
        nextSequence()
        $(`#level-title`).text(`Level : ${level}`)
        hasStarted = true
    }
})

/* THIS FUNCTION CREATES A RANDOM NUMBER TO SELECT RANDOMLY IN buttonColors ARRAY AND PUSH THE RANDOMLY SELECTED COLOR
TO THE GAME PATTERN ARRAY. AND WHEN THIS FUNCTION IS CALLED, THE level VARIABLE WILL INCREMENT OR INCREASE BY 1.  */
let nextSequence = () => {   
    level++

    $(`#level-title`).text(`Level : ${level}`)
    let randomNumber = Math.floor(Math.random() * 4)
    let randomChosenColor = buttonColors[randomNumber]
    gamePattern.push(randomChosenColor)

    $(`#${randomChosenColor}`).fadeIn(100).fadeOut(100).fadeIn(100)// THIS LINE IS FOR EFFECTS ONLY TO THE RANDOM CHOSE COLOR.
    
    playSound(randomChosenColor) // PLAY SOUNDS BASED ON RANDOMLY SELECTED COLOR (SOUNDS IS IN sounds FOLDER).

}


// THIS FUNCTION WILL ANIMATE THE CLICKED BUTTON.
let animatePress = (currentColor) => {

    $(`#${currentColor}`).addClass("pressed")

    setTimeout(() => {
        $(`#${currentColor}`).removeClass("pressed")
    }, 100)
}

// THIS FUNCTION PLAYS SOUNDS BASED ON THE TITLE PASSED AS A PARAMETER OF THE FUNCTION. 
let playSound = (sound) => {

    let audio = new Audio(`sounds/${sound}.mp3`);
    audio.play()
} 


/* THIS FUNCTION CHECKS IF THE  gamePattern AND THE userClickedPattern IS MATCH. 
THIS WILL TAKE 1 ARGUMENT. THE ARGUMENT IS THE LAST ELEMENT OF THE userClickedPattern. 
THIS FUNCTION WILL BE CALLED FOR EVERY CLICK IN THE BUTTON. */
let checkAnswer = (currentLevel) => {

    /* CHECKS IF THE LAST ELEMENT OF THE gamePattern AND THE LAST ELEMENT OF THE userClickedPattern IS THE SAME. IF
    IT IS THE SAME, THEN THE PATTERN OF THE USER IS CORRECT. */
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){

        /* CHECKS IF THE LENGTH OF THE gamePattern AND userClickedPattern IS THE SAME, 
        THERFORE THE USER IS DONE WITH THE PATTERN. THEN AFTER 100 MILISECONDS,
        CALL THE nextsequence FUNCTION TO SELECT AGAIN A RANDOM COLOR AND RESET THE userClickedPattern.*/
        if(gamePattern.length === userClickedPattern.length){
            setTimeout(() => {
                nextSequence()
                userClickedPattern = []
            },1000)
        }

    }
    
    /* IF THE LAST ELEMENT OF THE gamePattern AND THE LAST ELEMENT OF THE userClickedPattern IS NOT THE SAME, 
    THEN THE PATTERN OF THE USER IS WRONG AND THE GAME IS OVER.*/
    else{

        playSound("wrong")// PLAY WRONG SOUND IMMEDIATELY IF THE PATTERNOF THE USER IS WRONG.

        $('body').addClass('game-over')// APPLY A STYLE INTO THE BODY TAG IF THE PATTERN OF THE USER IS WRONG.

        setTimeout(() => {
            $('body').removeClass('game-over')
        }, 100) // REMOVE THE STYLE AFTER 100 MILISECONDS.

        $(`#level-title`).text(`GAME OVER. PRESS ANY KEY TO RESTART!`) // CHANGE THE TITTLE INTO GAME OVER.
        
        restartIfGameOver() // CALL THE restartIfGameOver FUNCTION TO RESTART THE GAME.
    }
}

// ADDS CLICK EVENT FOR EVERY BUTTONS IN THE DOCUMENT.
$(".btn").click((event) => {
    let userChosenColor = event.target.id // GETS THE ID ATTRIBUTE OF CLICKED BUTTON.
    userClickedPattern.push(userChosenColor) // PUSH THE ID OR THE COLOR TO THE userClickedPattern ARRAY.
    playSound(event.target.id) // CALL playSound FUNCTION TO PLAY A SOUND BASED ON THE COLOR.
    animatePress(event.target.id) // CALLA animatePress FUNCTION TO APPLY ANIMATION ON CLICKED BUTTON.

    checkAnswer(userClickedPattern.length - 1) // FOR EVERY CLICK AT THE BUTTONS, CALL checkAnswer FUNCTION TO CHECK IF THE USER PATTERN IS MATCH TO THE GAME PATTERN.
})


// THIS FUNCTION RESTARTS THE GAME IF IT IS GAME OVER.
let restartIfGameOver = () => {

    // RESTART EVERYTHING.
    level = 0
    gamePattern = []
    userClickedPattern = []
    hasStarted = false
}


