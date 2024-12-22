const coinflip = document.getElementById("coinflip");
let duration = -1;

const flip_coin = function() {

    duration = 1.25 + Math.floor(Math.random() * 6) / 2 ;
    document.body.style.setProperty("--head-iteration", `${duration}`);
    document.body.style.setProperty("--tail-iteration", `${duration}`);
}

coinflip.addEventListener("mouseenter", flip_coin);
coinflip.addEventListener("touchstart", flip_coin);
