const coinflip = document.getElementById("coinflip");
const parentCoin = coinflip.querySelector(".parent-coin");
let currentRotation = 0;
let isFlipping = false;

function flip() {
    if (isFlipping) return;
    isFlipping = true;

    // 3~8 half-turns → lands randomly on head or tail
    const halfTurns = 3 + Math.floor(Math.random() * 6);
    currentRotation += halfTurns * 180;

    const duration = 0.15 * halfTurns;
    parentCoin.style.transition = `transform ${duration}s ease-out`;
    parentCoin.style.transform = `rotateY(${currentRotation}deg)`;

    setTimeout(() => { isFlipping = false; }, duration * 1000);
}

coinflip.addEventListener("mouseenter", flip);
coinflip.addEventListener("touchstart", flip);
