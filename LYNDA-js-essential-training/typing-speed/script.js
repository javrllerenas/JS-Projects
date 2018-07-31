const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
let textToMatch = document.querySelector("#origin-text p").innerHTML;
let originText = document.querySelector("#origin-text p");
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const SCORE = document.querySelector("#score");

const URL = "https://api.icndb.com/jokes/random";

let first_key = true;
let ms = 0,
    sec = 0,
    min = 0;
let score = 0;
let running; // interval for running the clock
let nextSentece = getNext();

// Add leading zero to numbers 9 or below (purely for aesthetics):
function intToStr(num) {
    num_str = num.toString();
    return (num <= 9 ? '0' + num_str : num_str);
}

// Run a standard minute/second/hundredths timer:
function runClock() {
    ms += 1;

    if (ms == 100) {
        ms = 0;
        sec += 1;
    }
    if (sec == 60) {
        sec = 0;
        min += 1;
    }
    if (min == 60) min = 0;

    let str = intToStr(min) + ':' + intToStr(sec) + ':' + intToStr(ms);
    theTimer.innerHTML = str;
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originMatch = textToMatch.substring(0, textEntered.length)

    // MATCH!!!
    if (textEntered === textToMatch) {
        console.log("THE STRING MATCHES!");
        score += 1;
        SCORE.innerHTML = score.toString();
        testArea.value = ""; testWrapper.style.borderColor = "gray";

        console.log("DEBUG: next: ", nextSentece);
        // update text
        originText.innerHTML = nextSentece;
        textToMatch = nextSentece;
        nextSentece = getNext();

    } else {
        if (textEntered == originMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
}

// Start the timer:
function start(e) {
    if ( first_key === true) {
        first_key = false;
        console.log("Starting the clock...");
        running = setInterval(runClock, 10);
    }
}

// Reset everything:
function reset() {
    console.log("===== RESSETING =====");
    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    clearInterval(running);
    first_key = true;
    hr = min = sec = 0;
    theTimer.innerHTML = "00:00:00";
    score = 0; SCORE.innerHTML = '0';
    testArea.value = ""; testWrapper.style.borderColor = "gray";
    // originText = next();
}


// Event listeners for keyboard input and the reset button:
testArea.addEventListener("keypress", start, false); 
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);



// TRYING TO FETCH ASYNCH SENTENCES

function getNext() {
    let sentence;
    try {
        let req = new XMLHttpRequest();
        req.open("GET", URL, false);
        req.send(null);
        if (req.status == 200) {
            console.log("NEXT: ", JSON.parse(req.response).value.joke);
            sentence = JSON.parse(req.response).value.joke;
        } else {
            sentence = "This is the super normal boring lame ugly sentence that appears when nothing good's there.";
        }

    } catch {
        sentence = "This is the super normal boring lame ugly sentence that appears when nothing good's there.";
    }
    return sentence;
} 
