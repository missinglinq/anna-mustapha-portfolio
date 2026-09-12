const rabbit = document.querySelector('.rabbit-link');
if (rabbit) {
  let timer;
  const nudge = () => {
    rabbit.classList.add('nudge');
    clearTimeout(timer);
    timer = setTimeout(() => rabbit.classList.remove('nudge'), 900);
  };
  setInterval(nudge, 11000);
}
