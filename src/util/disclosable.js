/* global smartdown */

function activateDraggableDisclosure(divId) {
  const div = document.getElementById(divId);
  // const body = document.getElementsByTagName('body')[0];
  const baseContainer = div.parentElement;
  const divHeader = document.getElementById(divId + '_header');
  let offsetX = 0;
  let offsetY = 0;

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
  }

  //
  // Note to the future about draggable things within CSS-transformed things like
  // smartdown/impress...
  //
  // I spent a lot of time trying to get this dragging code to work on draggable disclosables
  // in two different contexts:
  // - Ordinary smartdown div.
  // - Smartdown div within a CSS-transformed environment such as smartdown/impress.
  // I need to commit this PR so I'm calling it quits on making this perfect, for now.
  //
  // I eventually got the smartdown/impress mode 'sort of working', and favored the primary
  // use case of a typical smartdown div without transform.
  //
  // Things to fix/test include:
  //  - Verify that dragging a disclosable is bounded by the visible window size. This is the part
  // that is broken for smartdown/impress.
  //  - Verify that dragging 'feels right' and that the mouse cursor tracks the draggable position.
  //  - Verify that dragging respects the visible window boundary, even when the contents of
  //  the window are vertically scrolled and the contents are not in their scrollTop==0 state.
  //
  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    let newX = e.clientX - offsetX;
    let newY = e.clientY - offsetY;

    // // keep it inside the window
    if (newY > window.innerHeight + baseContainer.scrollTop - div.offsetHeight) {
      // console.log(newY, window.innerHeight + baseContainer.scrollTop + div.offsetHeight, window.innerHeight, baseContainer.scrollTop, div.offsetHeight);
      newY = window.innerHeight + baseContainer.scrollTop - div.offsetHeight;
    }
    if (newY < 0) {
      newY = 0;
    }
    if (newX > window.innerWidth - div.offsetWidth) {
      newX = window.innerWidth - div.offsetWidth;
    }
    if (newX < 0) {
      newX = 0;
    }

    // set the element's new position:
    div.style.top = `${newY}px`;
    div.style.left = `${newX}px`;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    offsetX = e.clientX - div.offsetLeft;
    offsetY = e.clientY - div.offsetTop;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  divHeader.onmousedown = dragMouseDown;
}


export function deactivateOnMouseLeave(divId, overrideLocked) {
  const div = document.getElementById(divId);

  if (overrideLocked || !div.disclosableLocked) {
    window.clearTimeout(div.disclosableTimer);
    div.disclosableTimer = null;
    div.disclosableLocked = false;
    div.onmouseenter = null;
    div.onmouseleave = null;
  }
}


function setDisclosureLocation(div, contentDiv, triggerId, settings) {

  // this code is dependent on the css for diclosable-position
  // I can't seem to get reliable offsetHeight and offsetWidth
  // This is a hack to mostly make it work.
  if (settings.display === 'position') {
    div.classList.add('disclosable-position');
    let top = 0;
    let left = 0;
    const height = div.offsetHeight;  // height is max 50%
    const width = div.offsetWidth;    // width is max 50%
    // const divBound = div.getBoundingClientRect();

    const baseContainer = div.parentElement;
    // const bound = baseContainer.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;
    // const visibleHeight = Math.min(bound.height, viewportHeight);
    // const visibleWidth = Math.min(bound.width, viewportWidth);
    const visibleHeight = viewportHeight;
    const visibleWidth = viewportWidth;
    const padding = 25;

    switch (settings.location) {
      case 'center':
        top = (visibleHeight - height) / 2 + baseContainer.scrollTop;
        left = (visibleWidth - width) / 2 + baseContainer.scrollLeft;

        // console.log('top left',
        //   top, left);
        // console.log('h w',
        //   height, width);
        // console.log('vh vw',
        //   visibleHeight, visibleWidth);
        // console.log('vph vpw',
        //   viewportHeight, viewportWidth);
        // console.log(bound);
        // console.log(divBound);
        // console.log('scrolltop', baseContainer.scrollTop, div.scrollTop, window.scrollTop);
        // console.log('scrollLeft', baseContainer.scrollLeft, div.scrollLeft, window.scrollLeft);
        break;
      case 'topleft':
        top = 0 + padding;
        left = 0 + padding;
        break;
      case 'topright':
        top = 0 + padding;
        left = (visibleWidth - width - padding);
        break;
      case 'bottomleft':
        top = (visibleHeight - height - padding);
        left = 0 + padding;
        break;
      case 'bottomright':
        top = (visibleHeight - height - padding);
        left = (visibleWidth - width - padding);
        break;
      default:
        break;
    }
    div.style.top = `${top}px`;
    div.style.left = `${left}px`;
  }
  else if (settings.display === 'attach') {
    const trigger = document.getElementById(triggerId);
    div.classList.add('disclosable-attach');
    div.style.top = `${trigger.offsetTop + trigger.offsetHeight}px`;

    //
    // Hack for InfoClay because the dnd-list there
    // has relative positioning. InfoClay will override
    // the default .disclosable-attach style to indicate
    // that it is using relative positioning.
    //
    const computedStyle = window.getComputedStyle(div);
    if (computedStyle.position === 'relative') {
      div.style.top = 0;
    }

    const divWidth = div.clientWidth; // Math.floor(2 * window.innerWidth / 3); // width: 66%;
    const paddingHack = 30;
    if ((trigger.offsetLeft + divWidth + paddingHack) < window.innerWidth) {
      // console.log('noadjust', trigger.offsetLeft, divWidth, (trigger.offsetLeft + divWidth), window.innerWidth, trigger.offsetWidth);
      div.style.left = `${trigger.offsetLeft}px`;
    }
    else {
      const left = Math.max(0, trigger.offsetLeft + trigger.offsetWidth - divWidth);
      // console.log('adjust', left, trigger.offsetLeft, divWidth, (trigger.offsetLeft + divWidth), window.innerWidth, trigger.offsetWidth);
      div.style.left = `${left}px`;
    }
  }
}


class DisclosableSettings {
  constructor() {
    this.showTrigger = 'button';
    this.display = 'inline';
    this.location = null;
    this.hideTrigger = null;
    this.decorations = [];
    this.decorationsInner = [];
    this.draggable = false;
  }

}

function parseDisclosureSettings(settingsStr) {
  const settings = new DisclosableSettings();
  const options = settingsStr.split(',');

  if (options.includes('transparent')) {
    // pass
  }
  else {
    options.push('shadow');
    options.push('outline');
  }

  if (options.includes('tooltip')) {
    options.push('link');
    options.push('attach');
    options.push('onmouseleave');
  }

  if (options.includes('link')) {
    settings.showTrigger = 'link';
  }

  if (options.includes('attach')) {
    settings.display = 'attach';
  }
  else {
    let location = '';
    if (options.includes('center')) {
      location = 'center';
    }
    else if (options.includes('topleft') ||
             options.includes('upperleft')) {
      location = 'topleft';
    }
    else if (options.includes('topright') ||
             options.includes('upperright')) {
      location = 'topright';
    }
    else if (options.includes('bottomleft')) {
      location = 'bottomleft';
    }
    else if (options.includes('bottomright')) {
      location = 'bottomright';
    }
    if (location !== '') {
      settings.display = 'position';
      settings.location = location;
    }
  }

  if (settings.display === 'position') {
    if (options.includes('draggable')) {
      settings.draggable = true;
    }
    if (options.includes('scrollable')) {
      settings.scrollable = true;
    }
  }

  if (options.includes('onmouseleave')) {
    settings.hideTrigger = 'onmouseleave';
  }
  else if (options.includes('closeable')) {
    settings.hideTrigger = 'closeable';
  }

  // collect up any decorations into a list
  // this is not a great strategy for easy maintenance,
  // but it reduces the syntax burden on the author
  // because decorations just get added in with all the
  // other options

  if (options.includes('outline')) {
    if (settings.draggable) {
      settings.decorations.push('outline-draggable');
      settings.decorationsInner.push('outline-draggable-content');
    }
    else {
      settings.decorations.push('outline');
      settings.decorationsInner.push('outline-content');
    }
  }

  if (options.includes('shadow')) {
    settings.decorations.push('shadow');
    settings.decorationsInner.push('shadow-content');
  }

  if (options.includes('transparent')) {
    settings.decorations.push('transparent');
    settings.decorationsInner.push('transparent-content');
  }

  if (options.includes('lightbox')) {
    settings.decorations.push('lightbox');
    settings.decorationsInner.push('lightbox-content');
  }


  return settings;
}


export function showDisclosure(divId, triggerId, settingsStr) {
  const settings = parseDisclosureSettings(settingsStr);

  const div = document.getElementById(divId);
  if (div) {
    div.classList.remove('disclosable-draggable', 'disclosable-scrollable', 'disclosable-shadow', 'disclosable-lightbox', 'disclosable-outline', 'disclosable-transparent');

    const contentDiv = div.querySelector('.disclosable-content');
    contentDiv.classList.remove('disclosable-scrollable-content', 'disclosable-shadow-content', 'disclosable-lightbox-content', 'disclosable-outline-content', 'disclosable-transparent-content');
    div.classList.add('disclosable-open');
    if (settings.scrollable) {
      div.classList.add('disclosable-scrollable');
      contentDiv.classList.add('disclosable-scrollable-content');
    }

    for (let i = 0; i < settings.decorations.length; i++) {
      div.classList.add(`disclosable-${settings.decorations[i]}`);
    }

    for (let i = 0; i < settings.decorationsInner.length; i++) {
      contentDiv.classList.add(`disclosable-${settings.decorationsInner[i]}`);
    }

    const headerDiv = document.getElementById(`${divId}_header`);
    headerDiv.classList.remove('disclosable-header-position');
    headerDiv.innerHTML = '';

    const closeable = settings.hideTrigger === 'closeable';
    if (settings.draggable || closeable) {
      headerDiv.classList.add('disclosable-header-position');
      if (closeable) {
        headerDiv.innerHTML = `<button class="disclosable-button-close" onclick="smartdown.hideDisclosure('${divId}','${settingsStr}')">&#10006;</button>`;
      }

      if (settings.draggable) {
        activateDraggableDisclosure(divId);
      }
    }

    setDisclosureLocation(div, contentDiv, triggerId, settings);

    if (settings.hideTrigger === 'onmouseleave') {
      /* eslint-disable no-use-before-define */
      activateOnMouseLeave(divId, settingsStr);
      /* eslint-enable no-use-before-define */
    }
  }

  smartdown.setVariable(divId, true, 'boolean');
}


export function hideDisclosure(divId, settingsStr) {
  const settings = parseDisclosureSettings(settingsStr);
  const div = document.getElementById(divId);

  if (div) {
    const contentDiv = div.querySelector('.disclosable-content');

    div.classList.remove('disclosable-open');

    if (div.classList.contains('disclosable-position')) {
      div.classList.remove('disclosable-position');
    }

    if (div.classList.contains('disclosable-attach')) {
      div.classList.remove('disclosable-attach');
    }

    for (let i = 0; i < settings.decorations.length; i++) {
      if (div.classList.contains(`disclosable-${settings.decorations[i]}`)) {
        div.classList.remove(`disclosable-${settings.decorations[i]}`);
      }
    }

    for (let i = 0; i < settings.decorationsInner.length; i++) {
      if (contentDiv.classList.contains(`disclosable-${settings.decorationsInner[i]}`)) {
        contentDiv.classList.remove(`disclosable-${settings.decorationsInner[i]}`);
      }
    }

    if (settings.hideTrigger === 'onmouseleave') {
      div.disclosableTimer = window.setTimeout(() => {
        deactivateOnMouseLeave(divId);
      }, 500);
    }
  }

  smartdown.setVariable(divId, false, 'boolean');
}

export function toggleDisclosure(divId, triggerId, settingsStr) {
  const div = document.getElementById(divId);
  const isOpen = !!smartdown.smartdownVariables[divId];

  if (div) {
    const isOpenClass = div.classList.contains('disclosable-open');

    if (isOpenClass !== isOpen) {
      console.log('toggleDisclosure inconsistency', isOpenClass, isOpen);
    }

    // this will need to be added when we have a datastructure for
    // disclosables.  A list of triggers to update.
    // maybe we could make an updateTriggerButton function
    // const openedSpan = document.getElementById(`span_${divId}_opened`);
    // if (openedSpan) {
    //   openedSpan.style.display = willBeOpen ? 'inline' : 'none';
    // }
    // const closedSpan = document.getElementById(`span_${divId}_closed`);
    // if (closedSpan) {
    //   closedSpan.style.display = willBeOpen ? 'none' : 'inline';
    // }
  }

  if (isOpen) {
    hideDisclosure(divId, settingsStr);
  }
  else {
    showDisclosure(divId, triggerId, settingsStr);
  }
}


export function activateOnMouseLeave(divId, settingsStr) {
  const div = document.getElementById(divId);
  if (div) {
    window.clearTimeout(div.disclosableTimer);
    div.disclosableTimer = null;
    div.disclosableLocked = false;

    div.onmouseenter = () => {
      div.disclosableLocked = true;
      window.clearTimeout(div.disclosableTimer);
      div.disclosableTimer = null;
    };

    div.onmouseleave = (e) => {
      if (
        (e.pageX <= div.offsetLeft) ||
        (e.pageX >= div.offsetLeft + div.offsetWidth) ||
        (e.pageY <= div.offsetTop) ||
        (e.pageY >= div.offsetTop + div.offsetHeight)) {
        // console.log('nonbogus mouseleave', e.clientY, e.pageY, div.offsetTop, div.offsetHeight, e);
        div.disclosableLocked = false;
        div.disclosableTimer = window.setTimeout(() => {
          hideDisclosure(divId, settingsStr);
        }, 200);
      }
      else {
        // Scrolling induces mouseLeave events even thought the mouse
        // is within its element. The above code verifies that it is
        // an authentic mouseleave.
        // console.log('ignoring bogus mouseleave', e.clientY, e.pageY, div.offsetTop, div.offsetHeight, e);
      }
    };
  }
}


export function linkWrapperExit(divId, settingsStr) {
  const div = document.getElementById(divId);

  if (div) {
    // The 500ms timer gives the user a chance to move their mouse from
    // the trigger area into the disclosable, without the disclosable disappearing
    // due to the mouse leaving the trigger area.
    //
    div.disclosableTimer = window.setTimeout(() => {
      this.hideDisclosure(divId, settingsStr);
    }, 500);
  }
  else {
    this.hideDisclosure(divId, settingsStr);
  }
}
