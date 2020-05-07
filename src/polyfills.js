var Element = window.Element;
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith#Polyfill
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function (search, thisLen) {
    if (thisLen === undefined || thisLen > this.length) {
      thisLen = this.length;
    }
    return this.substring(thisLen - search.length, thisLen) === search;
  };
}

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/removeEventListener#Polyfill_to_support_older_browsers

if (!Element.prototype.addEventListener) {
  var oListeners = {};
  function runListeners(oEvent) {
    if (!oEvent) {
      oEvent = window.event;
    }
    for (
      var iLstId = 0, iElId = 0, oEvtListeners = oListeners[oEvent.type];
      iElId < oEvtListeners.aEls.length;
      iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        for (
          iLstId;
          iLstId < oEvtListeners.aEvts[iElId].length;
          iLstId++) {
          oEvtListeners.aEvts[iElId][iLstId].call(this, oEvent);
        }
        break;
      }
    }
  }
  Element.prototype.addEventListener = function (sEventType, fListener /* , useCapture (will be ignored!) */) {
    if (oListeners.hasOwnProperty(sEventType)) {
      var oEvtListeners = oListeners[sEventType];
      var nElIdx;
      var iElId;
      for (nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
        if (oEvtListeners.aEls[iElId] === this) {
          nElIdx = iElId;
          break;
        }
      }
      if (nElIdx === -1) {
        oEvtListeners.aEls.push(this);
        oEvtListeners.aEvts.push([fListener]);
        this['on' + sEventType] = runListeners;
      }
      else {
        var aElListeners = oEvtListeners.aEvts[nElIdx];
        if (this['on' + sEventType] !== runListeners) {
          aElListeners.splice(0);
          this['on' + sEventType] = runListeners;
        }
        for (var iLstId = 0; iLstId < aElListeners.length; iLstId++) {
          if (aElListeners[iLstId] === fListener) {
            return;
          }
        }
        aElListeners.push(fListener);
      }
    }
    else {
      oListeners[sEventType] = { aEls: [this], aEvts: [[fListener]] };
      this['on' + sEventType] = runListeners;
    }
  };
  Element.prototype.removeEventListener = function (sEventType, fListener /* , useCapture (will be ignored!) */) {
    if (!oListeners.hasOwnProperty(sEventType)) {
      return;
    }
    var oEvtListeners = oListeners[sEventType];
    var nElIdx;
    var iElId;
    for (nElIdx = -1, iElId = 0; iElId < oEvtListeners.aEls.length; iElId++) {
      if (oEvtListeners.aEls[iElId] === this) {
        nElIdx = iElId;
        break;
      }
    }
    if (nElIdx === -1) {
      return;
    }
    for (var iLstId = 0, aElListeners = oEvtListeners.aEvts[nElIdx]; iLstId < aElListeners.length; iLstId++) {
      if (aElListeners[iLstId] === fListener) {
        aElListeners.splice(iLstId, 1);
      }
    }
  };
}
