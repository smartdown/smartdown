export default function toggleKiosk(divId, event) {
  if (event) {
    event.preventDefault();
    event.stopPropagation();
  }

  const div = document.getElementById(divId);
  div.parentElement.classList.toggle('smartdown-playable-kiosk');
  div.scrollIntoView();

  const playable = perPageState.playablesRegistered[divId];
  if (playable && playable.p5) {
    playable.p5._onresize();
  }
}

