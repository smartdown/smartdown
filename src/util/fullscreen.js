
// https://www.w3schools.com/howto/howto_js_fullscreen.asp
/* View in fullscreen */
export function openFullscreen() {
  const elem = document.documentElement;
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  }
  else if (elem.mozRequestFullScreen) { /* Firefox */
    elem.mozRequestFullScreen();
  }
  else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
    elem.webkitRequestFullscreen();
  }
  else if (elem.msRequestFullscreen) { /* IE/Edge */
    elem.msRequestFullscreen();
  }
}

/* Close fullscreen */
export function closeFullscreen() {
  // const elem = document.documentElement;
  if (document.exitFullscreen) {
    document.exitFullscreen();
  }
  else if (document.mozCancelFullScreen) { /* Firefox */
    document.mozCancelFullScreen();
  }
  else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
    document.webkitExitFullscreen();
  }
  else if (document.msExitFullscreen) { /* IE/Edge */
    document.msExitFullscreen();
  }
}

export function isFullscreen() {
  return  document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullscreenElement ||
          document.msFullscreenElement;
}
