const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const SCORE = document.querySelector("#score");

let first_key = true;
let sec = 0,
    min = 0,
    hr  = 0;
let score = 0;
let running; // interval for running the clock

// Add leading zero to numbers 9 or below (purely for aesthetics):
function intToStr(num) {
    num_str = num.toString();
    return (num <= 9 ? '0' + num_str : num_str);
}

// Run a standard minute/second/hundredths timer:
function runClock() {
    sec += 1;

    if (sec == 60) {
        sec = 0;
        min += 1;
    }
    if (min == 60) {
        min = 0;
        hr += 1;
    }
    if (hr == 24) hr = 0;

    let str = intToStr(hr) + ':' + intToStr(min) + ':' + intToStr(sec);
    theTimer.innerHTML = str;
    console.log("time: ", str)
}

// Match the text entered with the provided text on the page:
function spellCheck() {
    let textEntered = testArea.value;
    let originMatch = originText.substring(0, textEntered.length)

    // MATCH!!!
    if (textEntered === originText) {
        console.log("THE STRING MATCHES!");
        score += 1;
        SCORE.innerHTML = score.toString();
        testArea.value = ""; testWrapper.style.borderColor = "gray";
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
        running = setInterval(runClock, 1000);
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
