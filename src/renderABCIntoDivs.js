export default function renderABCIntoDivs(baseId, abcType, abcText) {
  if (window.ABCJS.midi) {
    window.ABCJS.midi.stopPlaying();
  }
  const params = {
    responsive: 'resize',
  };
  if (abcType !== 'abcmidi') {
    const sheetDiv = document.getElementById(`${baseId}-sheet`);
    window.ABCJS.renderAbc([sheetDiv], abcText, params);
  }
  if (abcType !== 'abcsheet') {
    const midiDiv = document.getElementById(`${baseId}-midi`);
    window.ABCJS.renderMidi([midiDiv], abcText, params);
  }
}
