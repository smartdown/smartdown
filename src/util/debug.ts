export function toggleDebug(divId: string): void {
  const div = document.getElementById(divId);
  const newStyle = (div.style.display === 'block' ? 'none' : 'block');
  div.style.display = newStyle;
}
