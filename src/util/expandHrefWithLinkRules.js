import globalState from './globalState';

export default function expandHrefWithLinkRules(href) {
  let result = href;

  for (let i = 0; i < globalState.linkRules.length; ++i) {
    const rule = globalState.linkRules[i];
    if (href.indexOf(rule.prefix) === 0) {
      if ((typeof rule.replace) === 'string') {
        let newHRef = rule.replace + href.slice(rule.prefix.length);
        if (newHRef.indexOf(window.location.origin) === 0) {
          newHRef = newHRef.slice(window.location.origin.length);
        }
        result = newHRef;
        break;
      }
      else if ((typeof rule.replace) === 'function') {
        const replacer = rule.replace(href);
        result = replacer + href.slice(rule.prefix.length);
      }
    }
  }

  // console.log('expandHrefWithLinkRules', globalState.linkRules, href, result);
  // console.log(JSON.stringify(globalState.linkRules, null, 2));

  return result;
}
