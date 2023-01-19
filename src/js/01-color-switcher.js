const refs = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

const isActive = true;
let intervalId = null;

refs.btnStop.disabled = isActive;

refs.btnStart.addEventListener('click', onClickStart);
refs.btnStop.addEventListener('click', onClickStop);

function onClickStart() {
  refs.btnStart.disabled = isActive;
  refs.btnStop.disabled = !isActive;

  randomColor(refs.body);
  intervalId = setInterval(() => {
    randomColor(refs.body);
  }, 1000);
}

function onClickStop(e) {
  refs.btnStop.disabled = isActive;
  refs.btnStart.disabled = !isActive;

  clearInterval(intervalId);
}

function randomColor(el) {
  el.style.backgroundColor = getRandomHexColor();
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
