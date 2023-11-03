let disclosableDivsOpened = 0;
let decorationDivsOpened = 0;

export default function renderHeading(text, level, raw, slugger) {
  let result = ``;

  const disclosableI = text.lastIndexOf('::::');
  const decorationI = text.lastIndexOf('--');

  if (disclosableI >= 0) {
    const disclosableDeclaration = text.slice(disclosableI + 4).trim();
    text = text.slice(0, disclosableI);

    if (disclosableDivsOpened > 0 && disclosableDeclaration.length === 0) {
      for (let decorationIndex = 0; decorationIndex < decorationDivsOpened; decorationIndex++) {
        result += `</div>`;
      }
      decorationDivsOpened = 0;

      disclosableDivsOpened -= 1;
      result += `</div></div>`;
    }
    else {

      disclosableDivsOpened += 1;

      result += `
              <div
                id="${disclosableDeclaration}"
                class="disclosable-wrapper"
              >
                <div
                  id="${disclosableDeclaration}_header"
                  class="disclosable-header"></div>
                <div
                  class="disclosable-content">`;
    }
  }
  else if (decorationI >= 0) {
    text = text.slice(decorationI + 2);
    const parts = text.split(' ');
    const decorationType = parts[0];
    let id = '';
    if (parts.length > 1) {
      id = parts[1];
    }

    if (decorationDivsOpened > 0 && id === '') {
      decorationDivsOpened -= 1;
      result += `</div>`;
    }
    else {
      decorationDivsOpened += 1;

      result += `
              <div
                id="${id}"
                class="decoration-${decorationType}"
              > `;
    }
  }
  else {
    const slug = slugger.slug(raw);
    const prefix = window.location.pathname;
    const anchor = `<a class="smartdown-h-anchor" href="${prefix}##${slug}">&#x1F517;</a>`;
    result = `<h${level} id="${slug}">${text}${anchor}</h${level}>`;
  }

  return result;
}
