/* eslint-disable */

  // markedModule.InlineLexer.prototype.output = smartdownLexer;
  // markedModule.InlineLexer.prototype.output.bind(markedModule.InlineLexer.prototype);



function smartdownLexer(src) {
  console.log('smartdownLexer');
  let out = '';
  let link;
  let text;
  let href;
  let title;
  let cap;
  let prevCapZero;

  const mathRules = /^(\$+)[^$]*\1/;
  const kludgeGFMURLRules =
    edit(/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*/)
    // .replace('email', inline._email)
      .getRegex();

  const renderer = markedOpts.renderer;
  /* eslint-disable no-cond-assign, brace-style */

  while (src) {
    // math
    if (cap = mathRules.exec(src)) {
      src = src.substring(cap[0].length);
      var escaped = cap[0].replace(/</g, '< ');
      out += escaped;
      continue;
    }

    // escape
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
      out += cap[1];
      continue;
    }

    // autolink
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = entityEscape(this.mangle(cap[1]));
        href = 'mailto:' + text;
      } else {
        text = entityEscape(cap[1]);
        href = text;
      }
      out += renderer.link(href, null, text);
      continue;
    }

    // // url (gfm)
    // if (!this.inLink && (cap = this.rules.url.exec(src))) {
    if (!this.inLink && (cap = kludgeGFMURLRules.exec(src))) {
      do {
        prevCapZero = cap[0];
        cap[0] = this.rules._backpedal.exec(cap[0])[0];
      } while (prevCapZero !== cap[0]);
      src = src.substring(cap[0].length);
      if (cap[2] === '@') {
        text = entityEscape(cap[0]);
        href = 'mailto:' + text;
      } else {
        text = entityEscape(cap[0]);
        if (cap[1] === 'www.') {
          href = 'http://' + text;
        } else {
          href = text;
        }
      }
      out += renderer.link(href, null, text);
      continue;
    }

    // tag
    if (cap = this.rules.tag.exec(src)) {
      if (!this.inLink && /^<a /i.test(cap[0])) {
        this.inLink = true;
      } else if (this.inLink && /^<\/a>/i.test(cap[0])) {
        this.inLink = false;
      }
      src = src.substring(cap[0].length);
      out += this.options.sanitize
        ? this.options.sanitizer
          ? this.options.sanitizer(cap[0])
          : entityEscape(cap[0])
        : cap[0];
      continue;
    }

    // link
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
      this.inLink = true;
      href = cap[2];
      if (this.options.pedantic) {
        link = /^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(href);

        if (link) {
          href = link[1];
          title = link[3];
        } else {
          title = '';
        }
      } else {
        title = cap[3] ? cap[3].slice(1, -1) : '';
      }
      href = href.trim().replace(/^<([\s\S]*)>$/, '$1');
      out += this.outputLink(cap, {
        href: marked.InlineLexer.escapes(href),
        title: marked.InlineLexer.escapes(title)
      });
      this.inLink = false;
      continue;
    }

    // reflink, nolink
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      link = (cap[2] || cap[1]).replace(/\s+/g, ' ');
      link = this.links[link.toLowerCase()];
      if (!link || !link.href) {
        out += cap[0].charAt(0);
        src = cap[0].substring(1) + src;
        continue;
      }
      this.inLink = true;
      out += this.outputLink(cap, link);
      this.inLink = false;
      continue;
    }

    // strong
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.strong(this.output(cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // em
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.em(this.output(cap[6] || cap[5] || cap[4] || cap[3] || cap[2] || cap[1]));
      continue;
    }

    // code
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.codespan(cap[2].trim());
      continue;
    }

    // br
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.br();
      continue;
    }

    // del (gfm)
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
      out += renderer.del(this.output(cap[1]));
      continue;
    }

    // text
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
      cap[0] = cap[0].replace(/:([A-Za-z0-9_\-\+]+?):/g, emojiReplacer);
      out += renderer.text(entityEscape(this.smartypants(cap[0])));

      continue;
    }

    if (src) {
      throw new Error('Infinite loop on byte: ' + src.charCodeAt(0));
    }
  }

  /* eslint-enable no-cond-assign, brace-style */

  return out;
}
