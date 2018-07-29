const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");

// === runTheClock === //
// Func that updates the clock
//
function runTheClock() {

    let date = new Date();

    let hr  = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    console.log("Hr: ", hr, " | Min: ", min, " | Sec: ", sec);


    HOURHAND.style.transform = "rotate(" + hrToDeg(hr, min) + "deg)";
    MINUTEHAND.style.transform = "rotate(" + minToDeg(min, sec) + "deg)";
    SECONDHAND.style.transform = "rotate(" + secToDeg(sec) + "deg)";
};

// === time to degrees === //
//
function secToDeg(sec) {
    return sec * (360/60);
}
function minToDeg(min, sec) {
    return (min * (360/60)) + (sec*(360/60)/60);
}
function hrToDeg(hr, min) {
    return ((hr % 12) * (360/12)) + (min*(360/60)/12);
}

// === Running the clock === //
//
let interval = setInterval(runTheClock, 1000);