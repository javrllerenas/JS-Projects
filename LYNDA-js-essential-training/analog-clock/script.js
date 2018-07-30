const HOURHAND = document.querySelector("#hour");
const MINUTEHAND = document.querySelector("#minute");
const SECONDHAND = document.querySelector("#second");


// === initial clock setup === //
    let date = new Date();
    let hr   = date.getHours();
    let min  = date.getMinutes();
    let sec  = date.getSeconds();
       

    hr  = hrToDeg( hr, min );
    min = minToDeg( min, sec );
    sec = secToDeg( sec );
    console.log("Hr: ", hr, " | Min: ", min, " | Sec: ", sec);


// === runTheClock === //
// Func that updates the clock
//
function runTheClock() {

    hr  += 360 / 12 / 60 / 60;
    min += 360 / 60 / 60;
    sec += 360 / 60;

    HOURHAND.style.transform = "rotate(" + hr + "deg)";
    MINUTEHAND.style.transform = "rotate(" + min + "deg)";
    SECONDHAND.style.transform = "rotate(" + sec + "deg)";
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