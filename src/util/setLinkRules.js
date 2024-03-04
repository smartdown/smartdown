import globalState from './globalState';

export default function setLinkRules(_linkRules) {
  globalState.linkRules.length = 0;
  _linkRules.forEach((link) => {
    globalState.linkRules.push(link);
  });
}
