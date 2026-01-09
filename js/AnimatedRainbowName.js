const AnimatedRainbowName = document.getElementById("AnimatedRainbowName");

const AnimatedRainbowNameText = AnimatedRainbowName.textContent;

const AnimatedRainbowNameLetterStringArray = AnimatedRainbowNameText.split('');

AnimatedRainbowName.innerHTML = null;

AnimatedRainbowNameLetterStringArray.forEach(letter => {
    AnimatedRainbowName.innerHTML += `<span class="AnimatedRainbowNameLetter">${letter}</span>`
});

const AnimatedRainbowNameLetterSpanArray = document.getElementsByClassName("AnimatedRainbowNameLetter");

for (let i = 0; i < AnimatedRainbowNameLetterSpanArray.length; i++) {
    const letter = AnimatedRainbowNameLetterSpanArray[i];
    const colors = ["#e81416", "#ffa500", "#faeb36", "#79c314", "#487de7", "#4b369d", "#70369d"]
    let random = Math.random();

    letter.style.display = 'inline-block';

    letter.animate([
        { color: colors[i], textShadow: `0 0 0px ${colors[i]}, 0 0 2px ${colors[i]}, 0 0 4px ${colors[i]}, 0 0 6px ${colors[i]}`, transform: `translateY(${6 * random * 1.5}px)` },
        { color: colors[i + 1], textShadow: `0 0 2px ${colors[i + 1]}, 0 0 4px ${colors[i + 1]}, 0 0 6px ${colors[i + 1]}, 0 0 8px ${colors[i + 1]}`, transform: `translateY(${-6 * random * 1.5}px)` }
    ], {
        duration: 1000,
        easing: 'ease-in-out',
        iterations: Infinity,
        direction: 'alternate'
    });

    if (i == 6) random = Math.random();

}