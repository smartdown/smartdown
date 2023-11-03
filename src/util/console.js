export function consoleWrite(playable, args) {
  let msg = '';
  args.forEach((arg) => {
    if (typeof arg === 'object') {
      arg = JSON.stringify(arg, null, 2);
    }
    msg += arg + ' ';
  });

  const div = document.getElementById(playable.consoleId);
  if (div) {
    div.style.display = 'block';
    const pre = document.getElementById(playable.consoleId + '-pre');
    pre.innerText = pre.innerText + msg + '\n';
    div.scrollTop = div.scrollHeight;
    const nLines = pre.innerText.split('\n').length;
    const maxLinesClip = 10;
    const nLinesClipped = Math.min(nLines, maxLinesClip);
    const lineHeight = 25;
    const newHeight = nLinesClipped * lineHeight;
    // if (true || newHeight > div.scrollHeight) {
    div.style.height = `${newHeight}px`;
    // }
  }
  const toggle = document.getElementById(playable.consoleToggleId);
  if (toggle) {
    toggle.style.display = 'block';
  }
}

export function toggleConsole(divId) {
  const div = document.getElementById(divId);
  if (div) {
    const newStyle = (div.style.display === 'block' ? 'none' : 'block');
    div.style.display = newStyle;
  }
}
