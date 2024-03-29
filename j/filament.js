(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Filament = {}));
}(this, (function (exports) { 'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn) {
	  var module = { exports: {} };
		return fn(module, module.exports), module.exports;
	}

	var ohm_min = createCommonjsModule(function (module, exports) {
	!function(u,t){module.exports=t();}(window,(function(){return function(u){var t={};function e(r){if(t[r])return t[r].exports;var n=t[r]={i:r,l:!1,exports:{}};return u[r].call(n.exports,n,n.exports,e),n.l=!0,n.exports}return e.m=u,e.c=t,e.d=function(u,t,r){e.o(u,t)||Object.defineProperty(u,t,{enumerable:!0,get:r});},e.r=function(u){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(u,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(u,"__esModule",{value:!0});},e.t=function(u,t){if(1&t&&(u=e(u)),8&t)return u;if(4&t&&"object"==typeof u&&u&&u.__esModule)return u;var r=Object.create(null);if(e.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:u}),2&t&&"string"!=typeof u)for(var n in u)e.d(r,n,function(t){return u[t]}.bind(null,n));return r},e.n=function(u){var t=u&&u.__esModule?function(){return u.default}:function(){return u};return e.d(t,"a",t),t},e.o=function(u,t){return Object.prototype.hasOwnProperty.call(u,t)},e.p="",e(e.s=4)}([function(u,t,e){for(var r=e(7),n={},i=0;i<128;i++)n[i]=String.fromCharCode(i);n["'".charCodeAt(0)]="\\'",n['"'.charCodeAt(0)]='\\"',n["\\".charCodeAt(0)]="\\\\",n["\b".charCodeAt(0)]="\\b",n["\f".charCodeAt(0)]="\\f",n["\n".charCodeAt(0)]="\\n",n["\r".charCodeAt(0)]="\\r",n["\t".charCodeAt(0)]="\\t",n["\v".charCodeAt(0)]="\\v",t.abstract=function(u){var t=u||"";return function(){throw new Error("this method "+t+" is abstract! (it has no implementation in class "+this.constructor.name+")")}},t.assert=function(u,t){if(!u)throw new Error(t)},t.defineLazyProperty=function(u,t,e){var r;Object.defineProperty(u,t,{get:function(){return r||(r=e.call(this)),r}});},t.clone=function(u){return u?r({},u):u},t.extend=r,t.repeatFn=function(u,t){for(var e=[];t-- >0;)e.push(u());return e},t.repeatStr=function(u,t){return new Array(t+1).join(u)},t.repeat=function(u,e){return t.repeatFn((function(){return u}),e)},t.getDuplicates=function(u){for(var t=[],e=0;e<u.length;e++){var r=u[e];u.lastIndexOf(r)!==e&&t.indexOf(r)<0&&t.push(r);}return t},t.copyWithoutDuplicates=function(u){var t=[];return u.forEach((function(u){t.indexOf(u)<0&&t.push(u);})),t},t.isSyntactic=function(u){var t=u[0];return t===t.toUpperCase()},t.isLexical=function(u){return !t.isSyntactic(u)},t.padLeft=function(u,e,r){var n=r||" ";return u.length<e?t.repeatStr(n,e-u.length)+u:u},t.StringBuffer=function(){this.strings=[];},t.StringBuffer.prototype.append=function(u){this.strings.push(u);},t.StringBuffer.prototype.contents=function(){return this.strings.join("")},t.escapeChar=function(u,e){var r=u.charCodeAt(0);return '"'!==u&&"'"!==u||!e||u===e?r<128?n[r]:128<=r&&r<256?"\\x"+t.padLeft(r.toString(16),2,"0"):"\\u"+t.padLeft(r.toString(16),4,"0"):u},t.unescapeChar=function(u){if("\\"!==u.charAt(0))return u;switch(u.charAt(1)){case"b":return "\b";case"f":return "\f";case"n":return "\n";case"r":return "\r";case"t":return "\t";case"v":return "\v";case"x":return String.fromCharCode(parseInt(u.substring(2,4),16));case"u":return String.fromCharCode(parseInt(u.substring(2,6),16));default:return u.charAt(1)}},t.unexpectedObjToString=function(u){if(null==u)return String(u);var t=Object.prototype.toString.call(u);try{return (u.constructor&&u.constructor.name?u.constructor.name:0===t.indexOf("[object ")?t.slice(8,-1):typeof u)+": "+JSON.stringify(String(u))}catch(u){return t}};},function(u,t,e){var r,n=this&&this.__extends||(r=function(u,t){return (r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(u,t){u.__proto__=t;}||function(u,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(u[e]=t[e]);})(u,t)},function(u,t){function e(){this.constructor=u;}r(u,t),u.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e);}),i=this&&this.__spreadArrays||function(){for(var u=0,t=0,e=arguments.length;t<e;t++)u+=arguments[t].length;var r=Array(u),n=0;for(t=0;t<e;t++)for(var i=arguments[t],o=0,a=i.length;o<a;o++,n++)r[n]=i[o];return r},o=e(18),a=e(0),s=function(){function u(){if(this.constructor===u)throw new Error("PExpr cannot be instantiated -- it's abstract")}return u.prototype.withSource=function(u){return u&&(this.source=u.trimmed()),this},u}(),c=Object.create(s.prototype),l=Object.create(s.prototype),p=function(u){function t(t){var e=u.call(this)||this;return e.obj=t,e}return n(t,u),t}(s),D=function(u){function t(t,e){var r=u.call(this)||this;return r.from=t,r.to=e,r}return n(t,u),t}(s),h=function(u){function t(t){var e=u.call(this)||this;return e.index=t,e}return n(t,u),t}(s),A=function(u){function t(t){var e=u.call(this)||this;return e.terms=t,e}return n(t,u),t}(s),f=function(u){function t(t,e,r){var n=this,i=t.rules[e].body;return (n=u.call(this,[r,i])||this).superGrammar=t,n.name=e,n.body=r,n}return n(t,u),t}(A),m=function(u){function t(t,e,r,n){var o=this,a=t.rules[e].body;return (o=u.call(this,i(r,[a],n))||this).superGrammar=t,o.ruleName=e,o.expansionPos=r.length,o}return n(t,u),t}(A),E=function(u){function t(t){var e=u.call(this)||this;return e.factors=t,e}return n(t,u),t}(s),C=function(u){function t(t){var e=u.call(this)||this;return e.expr=t,e}return n(t,u),t}(s),F=function(u){function t(){return null!==u&&u.apply(this,arguments)||this}return n(t,u),t}(C),d=function(u){function t(){return null!==u&&u.apply(this,arguments)||this}return n(t,u),t}(C),v=function(u){function t(){return null!==u&&u.apply(this,arguments)||this}return n(t,u),t}(C);F.prototype.operator="*",d.prototype.operator="+",v.prototype.operator="?",F.prototype.minNumMatches=0,d.prototype.minNumMatches=1,v.prototype.minNumMatches=0,F.prototype.maxNumMatches=Number.POSITIVE_INFINITY,d.prototype.maxNumMatches=Number.POSITIVE_INFINITY,v.prototype.maxNumMatches=1;var B=function(u){function t(t){var e=u.call(this)||this;return e.expr=t,e}return n(t,u),t}(s),g=function(u){function t(t){var e=u.call(this)||this;return e.expr=t,e}return n(t,u),t}(s),y=function(u){function t(t){var e=u.call(this)||this;return e.expr=t,e}return n(t,u),t}(s),I=function(u){function t(t,e){void 0===e&&(e=[]);var r=u.call(this)||this;return r.ruleName=t,r.args=e,r}return n(t,u),t.prototype.isSyntactic=function(){return a.isSyntactic(this.ruleName)},t.prototype.toMemoKey=function(){return this._memoKey||Object.defineProperty(this,"_memoKey",{value:this.toString()}),this._memoKey},t}(s),x=function(u){function t(t){var e=u.call(this)||this;return e.category=t,e.pattern=o[t],e}return n(t,u),t}(s);t.PExpr=s,t.any=c,t.end=l,t.Terminal=p,t.Range=D,t.Param=h,t.Alt=A,t.Extend=f,t.Splice=m,t.Seq=E,t.Iter=C,t.Star=F,t.Plus=d,t.Opt=v,t.Not=B,t.Lookahead=g,t.Lex=y,t.Apply=I,t.UnicodeChar=x,e(19),e(20),e(21),e(22),e(23),e(24),e(25),e(26),e(27),e(28),e(29),e(30),e(31),e(32),e(33),e(34);},function(u,t,e){var r=e(1),n=e(12);function i(u,t){var e;return t?((e=new Error(t.getLineAndColumnMessage()+u)).shortMessage=u,e.interval=t):e=new Error(u),e}u.exports={applicationOfSyntacticRuleFromLexicalContext:function(u,t){return i("Cannot apply syntactic rule "+u+" from here (inside a lexical context)",t.source)},cannotExtendUndeclaredRule:function(u,t,e){return i("Cannot extend rule "+u+" because it is not declared in "+t,e)},cannotOverrideUndeclaredRule:function(u,t,e){return i("Cannot override rule "+u+" because it is not declared in "+t,e)},duplicateGrammarDeclaration:function(u,t){return i("Grammar "+u.name+" is already declared in this namespace")},duplicateParameterNames:function(u,t,e){return i("Duplicate parameter names in rule "+u+": "+t.join(", "),e)},duplicatePropertyNames:function(u){return i("Object pattern has duplicate property names: "+u.join(", "))},duplicateRuleDeclaration:function(u,t,e,r){var n="Duplicate declaration for rule '"+u+"' in grammar '"+t+"'";return t!==e&&(n+=" (originally declared in '"+e+"')"),i(n,r)},inconsistentArity:function(u,t,e,r){return i("Rule "+u+" involves an alternation which has inconsistent arity (expected "+t+", got "+e+")",r.source)},incorrectArgumentType:function(u,t){return i("Incorrect argument type: expected "+u,t.source)},intervalSourcesDontMatch:function(){return i("Interval sources don't match")},invalidConstructorCall:function(u,t,e){return i("Attempt to invoke constructor "+t+" with invalid or unexpected arguments")},invalidParameter:function(u,t){return i("Invalid parameter to rule "+u+": "+t+" has arity "+t.getArity()+", but parameter expressions must have arity 1",t.source)},grammarSyntaxError:function(u){var t=new Error;return Object.defineProperty(t,"message",{enumerable:!0,get:function(){return u.message}}),Object.defineProperty(t,"shortMessage",{enumerable:!0,get:function(){return "Expected "+u.getExpectedText()}}),t.interval=u.getInterval(),t},kleeneExprHasNullableOperand:function(u,t){var e=t.length>0?t[t.length-1].args:[],n="Nullable expression "+u.expr.substituteParams(e)+" is not allowed inside '"+u.operator+"' (possible infinite loop)";return t.length>0&&(n+="\nApplication stack (most recent application last):\n"+t.map((function(u){return new r.Apply(u.ruleName,u.args)})).join("\n")),i(n,u.expr.source)},missingSemanticAction:function(u,t,e,r){var n=r.slice(0,-1).map((function(u){var t="  "+u[0].name+" > "+u[1];return 3===u.length?t+" for '"+u[2]+"'":t})).join("\n"),o=i("Missing semantic action for '"+u+"' in "+(e+" '"+t+"'")+"\nAction stack (most recent call last):\n"+(n+="\n  "+t+" > "+u));return o.name="missingSemanticAction",o},multipleSuperSplices:function(u){return i("'...' can appear at most once in a rule body",u.source)},undeclaredGrammar:function(u,t,e){return i(t?"Grammar "+u+" is not declared in namespace "+n.toString(t):"Undeclared grammar "+u,e)},undeclaredRule:function(u,t,e){return i("Rule "+u+" is not declared in grammar "+t,e)},wrongNumberOfArguments:function(u,t,e,r){return i("Wrong number of arguments for rule "+u+" (expected "+t+", got "+e+")",r.source)},wrongNumberOfParameters:function(u,t,e,r){return i("Wrong number of parameters for rule "+u+" (expected "+t+", got "+e+")",r)},throwErrors:function(u){if(1===u.length)throw u[0];if(u.length>1)throw function(u){var t=u.map((function(u){return u.message}));return i(["Errors:"].concat(t).join("\n- "),u[0].interval)}(u)}};},function(u,t,e){var r=e(0);function n(u){var t=0;return u.map((function(u){var e=u.toString();return t=Math.max(t,e.length),e})).map((function(u){return r.padLeft(u,t)}))}function i(u,t,e){var r=u.length;return (u.slice(0,e)+t+u.slice(e+t.length)).substr(0,r)}function o(){for(var u=[],t=0;t<arguments.length;t++)u[t]=arguments[t];var e=this,o=e.offset,a=r.repeatStr,s=new r.StringBuffer;s.append("Line "+e.lineNum+", col "+e.colNum+":\n");var c=n([null==e.prevLine?0:e.lineNum-1,e.lineNum,null==e.nextLine?0:e.lineNum+1]),l=function(u,t,e){s.append(e+c[u]+" | "+t+"\n");};null!=e.prevLine&&l(0,e.prevLine,"  "),l(1,e.line,"> ");for(var p=e.line.length,D=a(" ",p+1),h=0;h<u.length;++h){var A=u[h][0],f=u[h][1];r.assert(A>=0&&A<=f,"range start must be >= 0 and <= end");var m=o-e.colNum+1;A=Math.max(0,A-m),D=i(D,a("~",(f=Math.min(f-m,p))-A),A);}var E=2+c[1].length+3;return s.append(a(" ",E)),D=i(D,"^",e.colNum-1),s.append(D.replace(/ +$/,"")+"\n"),null!=e.nextLine&&l(2,e.nextLine,"  "),s.contents()}var a,s=[];t.awaitBuiltInRules=function(u){s.push(u);},t.announceBuiltInRules=function(u){s.forEach((function(t){t(u);})),s=null;},t.getLineAndColumn=function(u,t){for(var e=1,r=1,n=0,i=0,a=null,s=null,c=-1;n<t;){var l=u.charAt(n++);"\n"===l?(e++,r=1,c=i,i=n):"\r"!==l&&r++;}var p=u.indexOf("\n",i);if(-1===p)p=u.length;else {var D=u.indexOf("\n",p+1);a=(a=-1===D?u.slice(p):u.slice(p,D)).replace(/^\r?\n/,"").replace(/\r$/,"");}return c>=0&&(s=u.slice(c,i).replace(/\r?\n$/,"")),{offset:t,lineNum:e,colNum:r,line:u.slice(i,p).replace(/\r$/,""),prevLine:s,nextLine:a,toString:o}},t.getLineAndColumnMessage=function(u,e){for(var r,n=[],i=2;i<arguments.length;i++)n[i-2]=arguments[i];return (r=t.getLineAndColumn(u,e)).toString.apply(r,n)},t.uniqueId=(a=0,function(u){return ""+u+a++});},function(u,t,e){var r,n=e(15),i=e(6),o=e(12),a=e(0),s=e(2),c=e(1),l=e(3),p=e(40),D=e(41),h={querySelector:function(u){return document.querySelector(u)},querySelectorAll:function(u){return document.querySelectorAll(u)}},A=Object.create(c.PExpr.prototype);function f(u){return !(!u||1!==u.nodeType)}function m(u){return void 0===u}var E=Math.pow(2,53)-1;function C(u,t,e){var o,l,p,D=new n,h=!1;return (e||r).createSemantics().addOperation("visit",{Grammar:function(u,e,r,n,i){var a=u.visit();o=D.newGrammar(a,t),e.visit(),n.visit();var c=o.build();if(c.source=this.source.trimmed(),a in t)throw s.duplicateGrammarDeclaration(c,t);return t[a]=c,c},SuperGrammar:function(u,e){var r=e.visit();if("null"===r)o.withSuperGrammar(null);else {if(!t||!(r in t))throw s.undeclaredGrammar(r,t,e.source);o.withSuperGrammar(t[r]);}},Rule_define:function(u,t,e,r,n){l=u.visit(),p=t.visit()[0]||[],o.defaultStartRule||o.ensureSuperGrammar()===i.ProtoBuiltInRules||o.withDefaultStartRule(l);var a=n.visit(),s=e.visit()[0],c=this.source.trimmed();return o.define(l,p,a,s,c)},Rule_override:function(u,t,e,r){l=u.visit(),p=t.visit()[0]||[];var n=this.source.trimmed();o.ensureSuperGrammarRuleForOverriding(l,n),h=!0;var i=r.visit();return h=!1,o.override(l,p,i,null,n)},Rule_extend:function(u,t,e,r){l=u.visit(),p=t.visit()[0]||[];var n=r.visit(),i=this.source.trimmed();return o.extend(l,p,n,null,i)},RuleBody:function(u,t){var e=t.visit();return D.alt.apply(D,e).withSource(this.source)},OverrideRuleBody:function(u,t){var e=t.visit(),r=e.indexOf(A);if(r>=0){var n=e.slice(0,r),i=e.slice(r+1);return i.forEach((function(u){if(u===A)throw s.multipleSuperSplices(u)})),new c.Splice(o.superGrammar,l,n,i).withSource(this.source)}return D.alt.apply(D,e).withSource(this.source)},Formals:function(u,t,e){return t.visit()},Params:function(u,t,e){return t.visit()},Alt:function(u){var t=u.visit();return D.alt.apply(D,t).withSource(this.source)},TopLevelTerm_inline:function(u,t){var e=l+"_"+t.visit(),r=u.visit(),n=this.source.trimmed(),i=!(o.superGrammar&&o.superGrammar.rules[e]);h&&!i?o.override(e,p,r,null,n):o.define(e,p,r,null,n);var a=p.map((function(u){return D.app(u)}));return D.app(e,a).withSource(r.source)},OverrideTopLevelTerm_superSplice:function(u){return A},Seq:function(u){return D.seq.apply(D,u.visit()).withSource(this.source)},Iter_star:function(u,t){return D.star(u.visit()).withSource(this.source)},Iter_plus:function(u,t){return D.plus(u.visit()).withSource(this.source)},Iter_opt:function(u,t){return D.opt(u.visit()).withSource(this.source)},Pred_not:function(u,t){return D.not(t.visit()).withSource(this.source)},Pred_lookahead:function(u,t){return D.lookahead(t.visit()).withSource(this.source)},Lex_lex:function(u,t){return D.lex(t.visit()).withSource(this.source)},Base_application:function(u,t){return D.app(u.visit(),t.visit()[0]||[]).withSource(this.source)},Base_range:function(u,t,e){return D.range(u.visit(),e.visit()).withSource(this.source)},Base_terminal:function(u){return D.terminal(u.visit()).withSource(this.source)},Base_paren:function(u,t,e){return t.visit()},ruleDescr:function(u,t,e){return t.visit()},ruleDescrText:function(u){return this.sourceString.trim()},caseName:function(u,t,e,r,n){return e.visit()},name:function(u,t){return this.sourceString},nameFirst:function(u){},nameRest:function(u){},terminal:function(u,t,e){return t.visit().join("")},oneCharTerminal:function(u,t,e){return t.visit()},terminalChar:function(u){return a.unescapeChar(this.sourceString)},escapeChar:function(u){return this.sourceString},NonemptyListOf:function(u,t,e){return [u.visit()].concat(e.visit())},EmptyListOf:function(){return []},_terminal:function(){return this.primitiveValue}})(u).visit()}function F(u){if(!f(u))throw new TypeError("Expected a DOM Node, got "+a.unexpectedObjToString(u));if("text/ohm-js"!==u.type)throw new Error('Expected a script tag with type="text/ohm-js", got '+u);return u.getAttribute("src")?function(u){var t=new XMLHttpRequest;t.open("GET",u,!1);try{if(t.send(),0===t.status||200===t.status)return t.responseText}catch(u){}throw new Error("unable to load url "+u)}(u.getAttribute("src")):u.innerHTML}function d(u,t){var e=v(u,t),r=Object.keys(e);if(0===r.length)throw new Error("Missing grammar definition");if(r.length>1){var n=e[r[1]].source;throw new Error(l.getLineAndColumnMessage(n.sourceString,n.startIdx)+"Found more than one grammar definition -- use ohm.grammars() instead.")}return e[r[0]]}function v(u,t){var e=o.extend(o.asNamespace(t));if("string"!=typeof u){if(!D(u))throw new TypeError("Expected string as first argument, got "+a.unexpectedObjToString(u));u=u.toString();}return function(u,t){var e=r.match(u,"Grammars");if(e.failed())throw s.grammarSyntaxError(e);C(e,t);}(u,e),e}u.exports={createNamespace:o.createNamespace,grammar:d,grammars:v,grammarFromScriptElement:function(u){var t=u;if(m(t)){var e=h.querySelectorAll('script[type="text/ohm-js"]');if(1!==e.length)throw new Error('Expected exactly one script tag with type="text/ohm-js", found '+e.length);t=e[0];}return d(F(t))},grammarsFromScriptElements:function(u){if(f(u))return v(u);var t=u;if(m(t))t=h.querySelectorAll('script[type="text/ohm-js"]');else if("string"==typeof t||!f(t)&&!function(u){if(null==u)return !1;var t=u.length;return "number"==typeof t&&t>=0&&t<=E}(t))throw new TypeError("Expected a Node, NodeList, or Array, but got "+t);for(var e=o.createNamespace(),r=0;r<t.length;++r)a.extend(e,v(F(t[r]),e));return e},makeRecipe:function(u){return "function"==typeof u?u.call(new n):("string"==typeof u&&(u=JSON.parse(u)),(new n).fromRecipe(u))},ohmGrammar:null,pexprs:c,util:l,extras:e(42),version:p},u.exports._buildGrammar=C,u.exports._setDocumentInterfaceForTesting=function(u){h=u;},i.BuiltInRules=e(44),l.announceBuiltInRules(i.BuiltInRules),u.exports.ohmGrammar=r=e(45),i.initApplicationParser(r,C);},function(u,t,e){var r,n=this&&this.__extends||(r=function(u,t){return (r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(u,t){u.__proto__=t;}||function(u,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(u[e]=t[e]);})(u,t)},function(u,t){function e(){this.constructor=u;}r(u,t),u.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e);}),i=e(0),o=function(){function u(u,t,e){this.grammar=u,this.ctorName=t,this.matchLength=e;}return u.prototype.numChildren=function(){return this.children?this.children.length:0},u.prototype.childAt=function(u){if(this.children)return this.children[u]},u.prototype.indexOfChild=function(u){return this.children.indexOf(u)},u.prototype.hasChildren=function(){return this.numChildren()>1},u.prototype.hasNoChildren=function(){return !this.hasChildren()},u.prototype.onlyChild=function(){if(1!==this.numChildren())throw new Error("cannot get only child of a node of type "+this.ctorName+" (it has "+this.numChildren()+" children)");return this.firstChild()},u.prototype.firstChild=function(){if(this.hasNoChildren())throw new Error("cannot get first child of a "+this.ctorName+" node, which has no children");return this.childAt(0)},u.prototype.lastChild=function(){if(this.hasNoChildren())throw new Error("cannot get last child of a "+this.ctorName+" node, which has no children");return this.childAt(this.numChildren()-1)},u.prototype.childBefore=function(u){var t=this.indexOfChild(u);if(t<0)throw new Error("Node.childBefore() called w/ an argument that is not a child");if(0===t)throw new Error("cannot get child before first child");return this.childAt(t-1)},u.prototype.childAfter=function(u){var t=this.indexOfChild(u);if(t<0)throw new Error("Node.childAfter() called w/ an argument that is not a child");if(t===this.numChildren()-1)throw new Error("cannot get child after last child");return this.childAt(t+1)},u.prototype.isTerminal=function(){return !1},u.prototype.isNonterminal=function(){return !1},u.prototype.isIteration=function(){return !1},u.prototype.isOptional=function(){return !1},u.prototype.toJSON=function(){var u;return (u={})[this.ctorName]=this.children,u},u}(),a=function(u){function t(t,e){var r=this,n=e?e.length:0;return (r=u.call(this,t,"_terminal",n)||this).primitiveValue=e,r}return n(t,u),t.prototype.isTerminal=function(){return !0},t.prototype.toJSON=function(){var u;return (u={})[this.ctorName]=this.primitiveValue,u},t}(o),s=function(u){function t(t,e,r,n,i){var o=u.call(this,t,e,i)||this;return o.children=r,o.childOffsets=n,o}return n(t,u),t.prototype.isNonterminal=function(){return !0},t.prototype.isLexical=function(){return i.isLexical(this.ctorName)},t.prototype.isSyntactic=function(){return i.isSyntactic(this.ctorName)},t}(o),c=function(u){function t(t,e,r,n,i){var o=u.call(this,t,"_iter",n)||this;return o.children=e,o.childOffsets=r,o.optional=i,o}return n(t,u),t.prototype.isIteration=function(){return !0},t.prototype.isOptional=function(){return this.optional},t}(o);u.exports={Node:o,TerminalNode:a,NonterminalNode:s,IterationNode:c};},function(u,t,e){var r,n,i=e(17),o=e(35),a=e(38),s=e(0),c=e(2),l=e(1);function p(u){return Object.keys(u.rules).sort().map((function(t){return u.rules[t]}))}function D(u,t,e,r){if(this.name=u,this.superGrammar=t,this.rules=e,r){if(!(r in e))throw new Error("Invalid start rule: '"+r+"' is not a rule in grammar '"+u+"'");this.defaultStartRule=r;}}D.initApplicationParser=function(u,t){r=u,n=t;},D.prototype={matcher:function(){return new o(this)},isBuiltIn:function(){return this===D.ProtoBuiltInRules||this===D.BuiltInRules},equals:function(u){if(this===u)return !0;if(null==u||this.name!==u.name||this.defaultStartRule!==u.defaultStartRule||this.superGrammar!==u.superGrammar&&!this.superGrammar.equals(u.superGrammar))return !1;var t=p(this),e=p(u);return t.length===e.length&&t.every((function(u,t){return u.description===e[t].description&&u.formals.join(",")===e[t].formals.join(",")&&u.body.toString()===e[t].body.toString()}))},match:function(u,t){var e=this.matcher();return e.replaceInputRange(0,0,u),e.match(t)},trace:function(u,t){var e=this.matcher();return e.replaceInputRange(0,0,u),e.trace(t)},semantics:function(){throw new Error("semantics() is deprecated -- use createSemantics() instead.")},createSemantics:function(){return a.createSemantics(this)},extendSemantics:function(u){return a.createSemantics(this,u._getSemantics())},_checkTopDownActionDict:function(u,t,e){var r,n=[];for(var i in e){var o=e[i];if("_iter"===(r=i)||"_terminal"===r||"_nonterminal"===r||"_default"===r||i in this.rules)if("function"!=typeof o)n.push("'"+i+"' must be a function in an action dictionary for '"+this.name+"'");else {var a=o.length,s=this._topDownActionArity(i);a!==s&&n.push("Semantic action '"+i+"' has the wrong arity: expected "+s+", got "+a);}else n.push("'"+i+"' is not a valid semantic action for '"+this.name+"'");}if(n.length>0){var c=n.map((function(u){return "- "+u})),l=new Error("Found errors in the action dictionary of the '"+t+"' "+u+":\n"+c.join("\n"));throw l.problems=n,l}},_topDownActionArity:function(u){return "_iter"===u||"_nonterminal"===u||"_default"===u?1:"_terminal"===u?0:this.rules[u].body.getArity()},_inheritsFrom:function(u){for(var t=this.superGrammar;t;){if(t.equals(u,!0))return !0;t=t.superGrammar;}return !1},toRecipe:function(u){var t={};this.source&&(t.source=this.source.contents);var e=null;this.superGrammar&&!this.superGrammar.isBuiltIn()&&(e=JSON.parse(this.superGrammar.toRecipe()));var r=null;this.defaultStartRule&&(r=this.defaultStartRule);var n={},i=this;return Object.keys(this.rules).forEach((function(u){var t,e=i.rules[u],r=e.body,o=!i.superGrammar||!i.superGrammar.rules[u];t=o?"define":r instanceof l.Extend?"extend":"override";var a={};if(e.source&&i.source){var s=e.source.relativeTo(i.source);a.sourceInterval=[s.startIdx,s.endIdx];}var c=o?e.description:null,p=r.outputRecipe(e.formals,i.source);n[u]=[t,a,c,e.formals,p];})),JSON.stringify(["grammar",t,this.name,e,r,n])},toOperationActionDictionaryTemplate:function(){return this._toOperationOrAttributeActionDictionaryTemplate()},toAttributeActionDictionaryTemplate:function(){return this._toOperationOrAttributeActionDictionaryTemplate()},_toOperationOrAttributeActionDictionaryTemplate:function(){var u=new s.StringBuffer;u.append("{");var t=!0;for(var e in this.rules){var r=this.rules[e].body;t?t=!1:u.append(","),u.append("\n"),u.append("  "),this.addSemanticActionTemplate(e,r,u);}return u.append("\n}"),u.contents()},addSemanticActionTemplate:function(u,t,e){e.append(u),e.append(": function(");var r=this._topDownActionArity(u);e.append(s.repeat("_",r).join(", ")),e.append(") {\n"),e.append("  }");},parseApplication:function(u){var t;if(-1===u.indexOf("<"))t=new l.Apply(u);else {var e=r.match(u,"Base_application");t=n(e,{});}if(!(t.ruleName in this.rules))throw c.undeclaredRule(t.ruleName,this.name);var i=this.rules[t.ruleName].formals;if(i.length!==t.args.length){var o=this.rules[t.ruleName].source;throw c.wrongNumberOfParameters(t.ruleName,i.length,t.args.length,o)}return t}},D.ProtoBuiltInRules=new D("ProtoBuiltInRules",void 0,{any:{body:l.any,formals:[],description:"any character",primitive:!0},end:{body:l.end,formals:[],description:"end of input",primitive:!0},caseInsensitive:{body:new i(new l.Param(0)),formals:["str"],primitive:!0},lower:{body:new l.UnicodeChar("Ll"),formals:[],description:"a lowercase letter",primitive:!0},upper:{body:new l.UnicodeChar("Lu"),formals:[],description:"an uppercase letter",primitive:!0},unicodeLtmo:{body:new l.UnicodeChar("Ltmo"),formals:[],description:"a Unicode character in Lt, Lm, or Lo",primitive:!0},spaces:{body:new l.Star(new l.Apply("space")),formals:[]},space:{body:new l.Range("\0"," "),formals:[],description:"a space"}}),u.exports=D;},function(u,t){u.exports=function(u,t){if(!t||"object"!=typeof t)return u;var e=Object.keys(t),r=e.length;for(;r--;)u[e[r]]=t[e[r]];return u};},function(u,t,e){var r=e(0).assert,n=e(2),i=e(3);function o(u,t,e){this.sourceString=u,this.startIdx=t,this.endIdx=e;}o.coverage=function(){for(var u=arguments[0].sourceString,t=arguments[0].startIdx,e=arguments[0].endIdx,r=1;r<arguments.length;r++){var i=arguments[r];if(i.sourceString!==u)throw n.intervalSourcesDontMatch();t=Math.min(t,arguments[r].startIdx),e=Math.max(e,arguments[r].endIdx);}return new o(u,t,e)},o.prototype={coverageWith:function(){var u=Array.prototype.slice.call(arguments);return u.push(this),o.coverage.apply(void 0,u)},collapsedLeft:function(){return new o(this.sourceString,this.startIdx,this.startIdx)},collapsedRight:function(){return new o(this.sourceString,this.endIdx,this.endIdx)},getLineAndColumn:function(){return i.getLineAndColumn(this.sourceString,this.startIdx)},getLineAndColumnMessage:function(){var u=[this.startIdx,this.endIdx];return i.getLineAndColumnMessage(this.sourceString,this.startIdx,u)},minus:function(u){if(this.sourceString!==u.sourceString)throw n.intervalSourcesDontMatch();return this.startIdx===u.startIdx&&this.endIdx===u.endIdx?[]:this.startIdx<u.startIdx&&u.endIdx<this.endIdx?[new o(this.sourceString,this.startIdx,u.startIdx),new o(this.sourceString,u.endIdx,this.endIdx)]:this.startIdx<u.endIdx&&u.endIdx<this.endIdx?[new o(this.sourceString,u.endIdx,this.endIdx)]:this.startIdx<u.startIdx&&u.startIdx<this.endIdx?[new o(this.sourceString,this.startIdx,u.startIdx)]:[this]},relativeTo:function(u){if(this.sourceString!==u.sourceString)throw n.intervalSourcesDontMatch();return r(this.startIdx>=u.startIdx&&this.endIdx<=u.endIdx,"other interval does not cover this one"),new o(this.sourceString,this.startIdx-u.startIdx,this.endIdx-u.startIdx)},trimmed:function(){var u=this.contents,t=this.startIdx+u.match(/^\s*/)[0].length,e=this.endIdx-u.match(/\s*$/)[0].length;return new o(this.sourceString,t,e)},subInterval:function(u,t){var e=this.startIdx+u;return new o(this.sourceString,e,e+t)}},Object.defineProperties(o.prototype,{contents:{get:function(){return void 0===this._contents&&(this._contents=this.sourceString.slice(this.startIdx,this.endIdx)),this._contents},enumerable:!0},length:{get:function(){return this.endIdx-this.startIdx},enumerable:!0}}),u.exports=o;},function(u,t,e){var r=e(8);function n(u){this.source=u,this.pos=0,this.examinedLength=0;}n.prototype={atEnd:function(){var u=this.pos===this.source.length;return this.examinedLength=Math.max(this.examinedLength,this.pos+1),u},next:function(){var u=this.source[this.pos++];return this.examinedLength=Math.max(this.examinedLength,this.pos),u},matchString:function(u,t){var e;if(t){for(e=0;e<u.length;e++){var r=this.next(),n=u[e];if(null==r||r.toUpperCase()!==n.toUpperCase())return !1}return !0}for(e=0;e<u.length;e++)if(this.next()!==u[e])return !1;return !0},sourceSlice:function(u,t){return this.source.slice(u,t)},interval:function(u,t){return new r(this.source,u,t||this.pos)}},u.exports=n;},function(u,t,e){var r=e(0),n=e(3),i=e(8);function o(u,t,e,i,o,a,s){this.matcher=u,this.input=t,this.startExpr=e,this._cst=i,this._cstOffset=o,this._rightmostFailurePosition=a,this._rightmostFailures=s,this.failed()&&(r.defineLazyProperty(this,"message",(function(){var u="Expected "+this.getExpectedText();return n.getLineAndColumnMessage(this.input,this.getRightmostFailurePosition())+u})),r.defineLazyProperty(this,"shortMessage",(function(){var u="expected "+this.getExpectedText(),t=n.getLineAndColumn(this.input,this.getRightmostFailurePosition());return "Line "+t.lineNum+", col "+t.colNum+": "+u})));}o.prototype.succeeded=function(){return !!this._cst},o.prototype.failed=function(){return !this.succeeded()},o.prototype.getRightmostFailurePosition=function(){return this._rightmostFailurePosition},o.prototype.getRightmostFailures=function(){if(!this._rightmostFailures){this.matcher.setInput(this.input);var u=this.matcher._match(this.startExpr,!1,this.getRightmostFailurePosition());this._rightmostFailures=u.getRightmostFailures();}return this._rightmostFailures},o.prototype.toString=function(){return this.succeeded()?"[match succeeded]":"[match failed at position "+this.getRightmostFailurePosition()+"]"},o.prototype.getExpectedText=function(){if(this.succeeded())throw new Error("cannot get expected text of a successful MatchResult");var u=new r.StringBuffer,t=this.getRightmostFailures();t=t.filter((function(u){return !u.isFluffy()}));for(var e=0;e<t.length;e++)e>0&&(e===t.length-1?u.append(t.length>2?", or ":" or "):u.append(", ")),u.append(t[e].toString());return u.contents()},o.prototype.getInterval=function(){var u=this.getRightmostFailurePosition();return new i(this.input,u,u)},u.exports=o;},function(u,t,e){function r(u,t,e){if(!function(u){return "description"===u||"string"===u||"code"===u}(e))throw new Error("invalid Failure type: "+e);this.pexpr=u,this.text=t,this.type=e,this.fluffy=!1;}r.prototype.getPExpr=function(){return this.pexpr},r.prototype.getText=function(){return this.text},r.prototype.getType=function(){return this.type},r.prototype.isDescription=function(){return "description"===this.type},r.prototype.isStringTerminal=function(){return "string"===this.type},r.prototype.isCode=function(){return "code"===this.type},r.prototype.isFluffy=function(){return this.fluffy},r.prototype.makeFluffy=function(){this.fluffy=!0;},r.prototype.clearFluffy=function(){this.fluffy=!1;},r.prototype.subsumes=function(u){return this.getText()===u.getText()&&this.type===u.type&&(!this.isFluffy()||this.isFluffy()&&u.isFluffy())},r.prototype.toString=function(){return "string"===this.type?JSON.stringify(this.getText()):this.getText()},r.prototype.clone=function(){var u=new r(this.pexpr,this.text,this.type);return this.isFluffy()&&u.makeFluffy(),u},r.prototype.toKey=function(){return this.toString()+"#"+this.type},u.exports=r;},function(u,t,e){var r=e(7);function n(){}n.prototype=Object.create(null),n.asNamespace=function(u){return u instanceof n?u:n.createNamespace(u)},n.createNamespace=function(u){return n.extend(n.prototype,u)},n.extend=function(u,t){if(u!==n.prototype&&!(u instanceof n))throw new TypeError("not a Namespace object: "+u);var e=Object.create(u,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}});return r(e,t)},n.toString=function(u){return Object.prototype.toString.call(u)},u.exports=n;},function(u,t,e){var r=e(8),n=e(0),i={succeeded:1,isRootNode:2,isImplicitSpaces:4,isMemoized:8,isHeadOfLeftRecursion:16,terminatesLR:32};function o(u){return "string"==typeof u?u.replace(/ /g,"⋅").replace(/\t/g,"␉").replace(/\n/g,"␊").replace(/\r/g,"␍"):String(u)}function a(u,t,e,n,o,a,s){this.input=u,this.pos=this.pos1=t,this.pos2=e,this.source=new r(u,t,e),this.expr=n,this.bindings=a,this.children=s||[],this.terminatingLREntry=null,this._flags=o?i.succeeded:0;}a.prototype.SKIP={},Object.defineProperty(a.prototype,"displayString",{get:function(){return this.expr.toDisplayString()}}),Object.keys(i).forEach((function(u){var t=i[u];Object.defineProperty(a.prototype,u,{get:function(){return 0!=(this._flags&t)},set:function(u){u?this._flags|=t:this._flags&=~t;}});})),a.prototype.clone=function(){return this.cloneWithExpr(this.expr)},a.prototype.cloneWithExpr=function(u){var t=new a(this.input,this.pos,this.pos2,u,this.succeeded,this.bindings,this.children);return t.isHeadOfLeftRecursion=this.isHeadOfLeftRecursion,t.isImplicitSpaces=this.isImplicitSpaces,t.isMemoized=this.isMemoized,t.isRootNode=this.isRootNode,t.terminatesLR=this.terminatesLR,t.terminatingLREntry=this.terminatingLREntry,t},a.prototype.recordLRTermination=function(u,t){this.terminatingLREntry=new a(this.input,this.pos,this.pos2,this.expr,!1,[t],[u]),this.terminatingLREntry.terminatesLR=!0;},a.prototype.walk=function(u,t){var e=u;function r(u,n,i){var o=!0;e.enter&&e.enter.call(t,u,n,i)===a.prototype.SKIP&&(o=!1),o&&(u.children.forEach((function(t){r(t,u,i+1);})),e.exit&&e.exit.call(t,u,n,i));}"function"==typeof e&&(e={enter:e}),this.isRootNode?this.children.forEach((function(u){r(u,null,0);})):r(this,null,0);},a.prototype.toString=function(){var u=this,t=new n.StringBuffer;return this.walk((function(e,r,i){if(!e)return u.SKIP;if("Alt"!==e.expr.constructor.name){var a,s,c,l,p;if(t.append((s=e.input,c=e.pos,l=10,((p=o(s.slice(c,c+l))).length<l?p+n.repeat(" ",l-p.length).join(""):p)+(a=2*i+1,n.repeat(" ",a).join("")))),t.append((e.succeeded?"✓":"✗")+" "+e.displayString),e.isHeadOfLeftRecursion&&t.append(" (LR)"),e.succeeded){var D=o(e.source.contents);t.append(" ⇒  "),t.append("string"==typeof D?'"'+D+'"':D);}t.append("\n");}})),t.contents()},u.exports=a;},function(u,t,e){var r=e(1),n=e(10),i=e(6),o=e(7),a={_terminal:function(){return this.primitiveValue},_nonterminal:function(u){var t=this._node.ctorName,e=this.args.mapping;if(!e.hasOwnProperty(t)){if(this._node instanceof r.Alt||this._node instanceof r.Apply)return u[0].toAST(e);if(this.isLexical())return this.sourceString;var n=u.filter((function(u){return !u.isTerminal()}));if(1===n.length)return n[0].toAST(e)}if("number"==typeof e[t])return u[e[t]].toAST(e);var i=e[t]||u,o={type:t};for(var a in i){var s=e[t]&&e[t][a];"number"==typeof s?o[a]=u[s].toAST(e):"string"==typeof s||"boolean"==typeof s||null===s?o[a]=s:"object"==typeof s&&s instanceof Number?o[a]=Number(s):"function"==typeof s?o[a]=s.call(this,u):void 0===s&&(u[a]&&!u[a].isTerminal()?o[a]=u[a].toAST(e):delete o[a]);}return o},_iter:function(u){return this._node.isOptional()?0===this.numChildren?null:u[0].toAST(this.args.mapping):u.map((function(u){return u.toAST(this.args.mapping)}),this)},NonemptyListOf:function(u,t,e){return [u.toAST(this.args.mapping)].concat(e.toAST(this.args.mapping))},EmptyListOf:function(){return []}};u.exports={helper:function(u,t){if(!(u instanceof n)||u.failed())throw new Error("toAST() expects a succesfull MatchResult as first parameter");t=o({},t);var e=o({},a);for(var r in t)"function"==typeof t[r]&&(e[r]=t[r],delete t[r]);return u._cst.grammar.createSemantics().addOperation("toAST(mapping)",e)(u).toAST(t)},semantics:function(u){if(!(u instanceof i))throw new Error("semanticsToAST() expects a Grammar as parameter");return u.createSemantics().addOperation("toAST(mapping)",a)}};},function(u,t,e){var r=e(16),n=e(1);function i(){}i.prototype={currentDecl:null,currentRuleName:null,newGrammar:function(u){return new r(u)},grammar:function(u,t,e,n,i){var o=this,a=new r(t);return e&&a.withSuperGrammar(this.fromRecipe(e)),n&&a.withDefaultStartRule(n),u&&u.source&&a.withSource(u.source),this.currentDecl=a,Object.keys(i).forEach((function(u){o.currentRuleName=u;var t,e=i[u],r=e[0],n=e[1],s=e[2],c=e[3],l=o.fromRecipe(e[4]);a.source&&n&&n.sourceInterval&&(t=a.source.subInterval(n.sourceInterval[0],n.sourceInterval[1]-n.sourceInterval[0])),a[r](u,c,l,s,t);})),this.currentRuleName=this.currentDecl=null,a.build()},terminal:function(u){return new n.Terminal(u)},range:function(u,t){return new n.Range(u,t)},param:function(u){return new n.Param(u)},alt:function(){for(var u=[],t=0;t<arguments.length;t++){var e=arguments[t];e instanceof n.PExpr||(e=this.fromRecipe(e)),e instanceof n.Alt?u=u.concat(e.terms):u.push(e);}return 1===u.length?u[0]:new n.Alt(u)},seq:function(){for(var u=[],t=0;t<arguments.length;t++){var e=arguments[t];e instanceof n.PExpr||(e=this.fromRecipe(e)),e instanceof n.Seq?u=u.concat(e.factors):u.push(e);}return 1===u.length?u[0]:new n.Seq(u)},star:function(u){return u instanceof n.PExpr||(u=this.fromRecipe(u)),new n.Star(u)},plus:function(u){return u instanceof n.PExpr||(u=this.fromRecipe(u)),new n.Plus(u)},opt:function(u){return u instanceof n.PExpr||(u=this.fromRecipe(u)),new n.Opt(u)},not:function(u){return u instanceof n.PExpr||(u=this.fromRecipe(u)),new n.Not(u)},la:function(u){return this.lookahead(u)},lookahead:function(u){return u instanceof n.PExpr||(u=this.fromRecipe(u)),new n.Lookahead(u)},lex:function(u){return u instanceof n.PExpr||(u=this.fromRecipe(u)),new n.Lex(u)},app:function(u,t){return t&&t.length>0&&(t=t.map((function(u){return u instanceof n.PExpr?u:this.fromRecipe(u)}),this)),new n.Apply(u,t)},splice:function(u,t){var e=this;return new n.Splice(this.currentDecl.superGrammar,this.currentRuleName,u.map((function(u){return e.fromRecipe(u)})),t.map((function(u){return e.fromRecipe(u)})))},fromRecipe:function(u){var t=this[u[0]].apply(this,"grammar"===u[0]?u.slice(1):u.slice(2)),e=u[1];return e&&e.sourceInterval&&this.currentDecl&&t.withSource(this.currentDecl.sourceInterval.apply(this.currentDecl,e.sourceInterval)),t}},u.exports=i;},function(u,t,e){var r=e(6),n=e(9),i=e(0),o=e(2),a=e(1);function s(u){this.name=u;}s.prototype.sourceInterval=function(u,t){return this.source.subInterval(u,t-u)},s.prototype.ensureSuperGrammar=function(){return this.superGrammar||this.withSuperGrammar("BuiltInRules"===this.name?r.ProtoBuiltInRules:r.BuiltInRules),this.superGrammar},s.prototype.ensureSuperGrammarRuleForOverriding=function(u,t){var e=this.ensureSuperGrammar().rules[u];if(!e)throw o.cannotOverrideUndeclaredRule(u,this.superGrammar.name,t);return e},s.prototype.installOverriddenOrExtendedRule=function(u,t,e,r){var n=i.getDuplicates(t);if(n.length>0)throw o.duplicateParameterNames(u,n,r);var a=this.ensureSuperGrammar().rules[u],s=a.formals,c=s?s.length:0;if(t.length!==c)throw o.wrongNumberOfParameters(u,c,t.length,r);return this.install(u,t,e,a.description,r)},s.prototype.install=function(u,t,e,r,n){return this.rules[u]={body:e.introduceParams(t),formals:t,description:r,source:n},this},s.prototype.withSuperGrammar=function(u){if(this.superGrammar)throw new Error("the super grammar of a GrammarDecl cannot be set more than once");return this.superGrammar=u,this.rules=Object.create(u.rules),u.isBuiltIn()||(this.defaultStartRule=u.defaultStartRule),this},s.prototype.withDefaultStartRule=function(u){return this.defaultStartRule=u,this},s.prototype.withSource=function(u){return this.source=new n(u).interval(0,u.length),this},s.prototype.build=function(){var u=new r(this.name,this.ensureSuperGrammar(),this.rules,this.defaultStartRule),t=[],e=!1;return Object.keys(u.rules).forEach((function(r){var n=u.rules[r].body;try{n.assertChoicesHaveUniformArity(r);}catch(u){t.push(u);}try{n.assertAllApplicationsAreValid(r,u);}catch(u){t.push(u),e=!0;}})),e||Object.keys(u.rules).forEach((function(e){var r=u.rules[e].body;try{r.assertIteratedExprsAreNotNullable(u,[]);}catch(u){t.push(u);}})),t.length>0&&o.throwErrors(t),this.source&&(u.source=this.source),u},s.prototype.define=function(u,t,e,r,n){if(this.ensureSuperGrammar(),this.superGrammar.rules[u])throw o.duplicateRuleDeclaration(u,this.name,this.superGrammar.name,n);if(this.rules[u])throw o.duplicateRuleDeclaration(u,this.name,this.name,n);var a=i.getDuplicates(t);if(a.length>0)throw o.duplicateParameterNames(u,a,n);return this.install(u,t,e,r,n)},s.prototype.override=function(u,t,e,r,n){return this.ensureSuperGrammarRuleForOverriding(u,n),this.installOverriddenOrExtendedRule(u,t,e,n),this},s.prototype.extend=function(u,t,e,r,n){if(!this.ensureSuperGrammar().rules[u])throw o.cannotExtendUndeclaredRule(u,this.superGrammar.name,n);var i=new a.Extend(this.superGrammar,u,e);return i.source=e.source,this.installOverriddenOrExtendedRule(u,t,i,n),this},u.exports=s;},function(u,t,e){var r,n=this&&this.__extends||(r=function(u,t){return (r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(u,t){u.__proto__=t;}||function(u,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(u[e]=t[e]);})(u,t)},function(u,t){function e(){this.constructor=u;}r(u,t),u.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e);}),i=e(11),o=e(5).TerminalNode,a=e(0).assert,s=e(1),c=s.PExpr,l=s.Terminal,p=function(u){function t(t){var e=u.call(this)||this;return e.obj=t,e}return n(t,u),t.prototype._getString=function(u){var t=u.currentApplication().args[this.obj.index];return a(t instanceof l,"expected a Terminal expression"),t.obj},t.prototype.allowsSkippingPrecedingSpace=function(){return !0},t.prototype.eval=function(u){var t=u.inputStream,e=t.pos,r=this._getString(u);return t.matchString(r,!0)?(u.pushBinding(new o(u.grammar,r),e),!0):(u.processFailure(e,this),!1)},t.prototype.generateExample=function(u,t,e,r){for(var n=this.obj.generateExample(u,t,e,r).value,i="",o=0;o<n.length;++o)i+=Math.random()<.5?n[o].toLocaleLowerCase():n[o].toLocaleUpperCase();return {value:i}},t.prototype.getArity=function(){return 1},t.prototype.substituteParams=function(u){return new t(this.obj.substituteParams(u))},t.prototype.toDisplayString=function(){return this.obj.toDisplayString()+" (case-insensitive)"},t.prototype.toFailure=function(u){return new i(this,this.obj.toFailure(u)+" (case-insensitive)","description")},t.prototype._isNullable=function(u,t){return this.obj._isNullable(u,t)},t}(c);u.exports=p;},function(u,t){u.exports={Lu:/[A-Z\xC0-\xD6\xD8-\xDE\u0100\u0102\u0104\u0106\u0108\u010A\u010C\u010E\u0110\u0112\u0114\u0116\u0118\u011A\u011C\u011E\u0120\u0122\u0124\u0126\u0128\u012A\u012C\u012E\u0130\u0132\u0134\u0136\u0139\u013B\u013D\u013F\u0141\u0143\u0145\u0147\u014A\u014C\u014E\u0150\u0152\u0154\u0156\u0158\u015A\u015C\u015E\u0160\u0162\u0164\u0166\u0168\u016A\u016C\u016E\u0170\u0172\u0174\u0176\u0178\u0179\u017B\u017D\u0181\u0182\u0184\u0186\u0187\u0189-\u018B\u018E-\u0191\u0193\u0194\u0196-\u0198\u019C\u019D\u019F\u01A0\u01A2\u01A4\u01A6\u01A7\u01A9\u01AC\u01AE\u01AF\u01B1-\u01B3\u01B5\u01B7\u01B8\u01BC\u01C4\u01C7\u01CA\u01CD\u01CF\u01D1\u01D3\u01D5\u01D7\u01D9\u01DB\u01DE\u01E0\u01E2\u01E4\u01E6\u01E8\u01EA\u01EC\u01EE\u01F1\u01F4\u01F6-\u01F8\u01FA\u01FC\u01FE\u0200\u0202\u0204\u0206\u0208\u020A\u020C\u020E\u0210\u0212\u0214\u0216\u0218\u021A\u021C\u021E\u0220\u0222\u0224\u0226\u0228\u022A\u022C\u022E\u0230\u0232\u023A\u023B\u023D\u023E\u0241\u0243-\u0246\u0248\u024A\u024C\u024E\u0370\u0372\u0376\u037F\u0386\u0388-\u038A\u038C\u038E\u038F\u0391-\u03A1\u03A3-\u03AB\u03CF\u03D2-\u03D4\u03D8\u03DA\u03DC\u03DE\u03E0\u03E2\u03E4\u03E6\u03E8\u03EA\u03EC\u03EE\u03F4\u03F7\u03F9\u03FA\u03FD-\u042F\u0460\u0462\u0464\u0466\u0468\u046A\u046C\u046E\u0470\u0472\u0474\u0476\u0478\u047A\u047C\u047E\u0480\u048A\u048C\u048E\u0490\u0492\u0494\u0496\u0498\u049A\u049C\u049E\u04A0\u04A2\u04A4\u04A6\u04A8\u04AA\u04AC\u04AE\u04B0\u04B2\u04B4\u04B6\u04B8\u04BA\u04BC\u04BE\u04C0\u04C1\u04C3\u04C5\u04C7\u04C9\u04CB\u04CD\u04D0\u04D2\u04D4\u04D6\u04D8\u04DA\u04DC\u04DE\u04E0\u04E2\u04E4\u04E6\u04E8\u04EA\u04EC\u04EE\u04F0\u04F2\u04F4\u04F6\u04F8\u04FA\u04FC\u04FE\u0500\u0502\u0504\u0506\u0508\u050A\u050C\u050E\u0510\u0512\u0514\u0516\u0518\u051A\u051C\u051E\u0520\u0522\u0524\u0526\u0528\u052A\u052C\u052E\u0531-\u0556\u10A0-\u10C5\u10C7\u10CD\u13A0-\u13F5\u1E00\u1E02\u1E04\u1E06\u1E08\u1E0A\u1E0C\u1E0E\u1E10\u1E12\u1E14\u1E16\u1E18\u1E1A\u1E1C\u1E1E\u1E20\u1E22\u1E24\u1E26\u1E28\u1E2A\u1E2C\u1E2E\u1E30\u1E32\u1E34\u1E36\u1E38\u1E3A\u1E3C\u1E3E\u1E40\u1E42\u1E44\u1E46\u1E48\u1E4A\u1E4C\u1E4E\u1E50\u1E52\u1E54\u1E56\u1E58\u1E5A\u1E5C\u1E5E\u1E60\u1E62\u1E64\u1E66\u1E68\u1E6A\u1E6C\u1E6E\u1E70\u1E72\u1E74\u1E76\u1E78\u1E7A\u1E7C\u1E7E\u1E80\u1E82\u1E84\u1E86\u1E88\u1E8A\u1E8C\u1E8E\u1E90\u1E92\u1E94\u1E9E\u1EA0\u1EA2\u1EA4\u1EA6\u1EA8\u1EAA\u1EAC\u1EAE\u1EB0\u1EB2\u1EB4\u1EB6\u1EB8\u1EBA\u1EBC\u1EBE\u1EC0\u1EC2\u1EC4\u1EC6\u1EC8\u1ECA\u1ECC\u1ECE\u1ED0\u1ED2\u1ED4\u1ED6\u1ED8\u1EDA\u1EDC\u1EDE\u1EE0\u1EE2\u1EE4\u1EE6\u1EE8\u1EEA\u1EEC\u1EEE\u1EF0\u1EF2\u1EF4\u1EF6\u1EF8\u1EFA\u1EFC\u1EFE\u1F08-\u1F0F\u1F18-\u1F1D\u1F28-\u1F2F\u1F38-\u1F3F\u1F48-\u1F4D\u1F59\u1F5B\u1F5D\u1F5F\u1F68-\u1F6F\u1FB8-\u1FBB\u1FC8-\u1FCB\u1FD8-\u1FDB\u1FE8-\u1FEC\u1FF8-\u1FFB\u2102\u2107\u210B-\u210D\u2110-\u2112\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u2130-\u2133\u213E\u213F\u2145\u2183\u2C00-\u2C2E\u2C60\u2C62-\u2C64\u2C67\u2C69\u2C6B\u2C6D-\u2C70\u2C72\u2C75\u2C7E-\u2C80\u2C82\u2C84\u2C86\u2C88\u2C8A\u2C8C\u2C8E\u2C90\u2C92\u2C94\u2C96\u2C98\u2C9A\u2C9C\u2C9E\u2CA0\u2CA2\u2CA4\u2CA6\u2CA8\u2CAA\u2CAC\u2CAE\u2CB0\u2CB2\u2CB4\u2CB6\u2CB8\u2CBA\u2CBC\u2CBE\u2CC0\u2CC2\u2CC4\u2CC6\u2CC8\u2CCA\u2CCC\u2CCE\u2CD0\u2CD2\u2CD4\u2CD6\u2CD8\u2CDA\u2CDC\u2CDE\u2CE0\u2CE2\u2CEB\u2CED\u2CF2\uA640\uA642\uA644\uA646\uA648\uA64A\uA64C\uA64E\uA650\uA652\uA654\uA656\uA658\uA65A\uA65C\uA65E\uA660\uA662\uA664\uA666\uA668\uA66A\uA66C\uA680\uA682\uA684\uA686\uA688\uA68A\uA68C\uA68E\uA690\uA692\uA694\uA696\uA698\uA69A\uA722\uA724\uA726\uA728\uA72A\uA72C\uA72E\uA732\uA734\uA736\uA738\uA73A\uA73C\uA73E\uA740\uA742\uA744\uA746\uA748\uA74A\uA74C\uA74E\uA750\uA752\uA754\uA756\uA758\uA75A\uA75C\uA75E\uA760\uA762\uA764\uA766\uA768\uA76A\uA76C\uA76E\uA779\uA77B\uA77D\uA77E\uA780\uA782\uA784\uA786\uA78B\uA78D\uA790\uA792\uA796\uA798\uA79A\uA79C\uA79E\uA7A0\uA7A2\uA7A4\uA7A6\uA7A8\uA7AA-\uA7AE\uA7B0-\uA7B4\uA7B6\uFF21-\uFF3A]|\uD801[\uDC00-\uDC27\uDCB0-\uDCD3]|\uD803[\uDC80-\uDCB2]|\uD806[\uDCA0-\uDCBF]|\uD835[\uDC00-\uDC19\uDC34-\uDC4D\uDC68-\uDC81\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB5\uDCD0-\uDCE9\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD38\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD6C-\uDD85\uDDA0-\uDDB9\uDDD4-\uDDED\uDE08-\uDE21\uDE3C-\uDE55\uDE70-\uDE89\uDEA8-\uDEC0\uDEE2-\uDEFA\uDF1C-\uDF34\uDF56-\uDF6E\uDF90-\uDFA8\uDFCA]|\uD83A[\uDD00-\uDD21]/,Ll:/[a-z\xB5\xDF-\xF6\xF8-\xFF\u0101\u0103\u0105\u0107\u0109\u010B\u010D\u010F\u0111\u0113\u0115\u0117\u0119\u011B\u011D\u011F\u0121\u0123\u0125\u0127\u0129\u012B\u012D\u012F\u0131\u0133\u0135\u0137\u0138\u013A\u013C\u013E\u0140\u0142\u0144\u0146\u0148\u0149\u014B\u014D\u014F\u0151\u0153\u0155\u0157\u0159\u015B\u015D\u015F\u0161\u0163\u0165\u0167\u0169\u016B\u016D\u016F\u0171\u0173\u0175\u0177\u017A\u017C\u017E-\u0180\u0183\u0185\u0188\u018C\u018D\u0192\u0195\u0199-\u019B\u019E\u01A1\u01A3\u01A5\u01A8\u01AA\u01AB\u01AD\u01B0\u01B4\u01B6\u01B9\u01BA\u01BD-\u01BF\u01C6\u01C9\u01CC\u01CE\u01D0\u01D2\u01D4\u01D6\u01D8\u01DA\u01DC\u01DD\u01DF\u01E1\u01E3\u01E5\u01E7\u01E9\u01EB\u01ED\u01EF\u01F0\u01F3\u01F5\u01F9\u01FB\u01FD\u01FF\u0201\u0203\u0205\u0207\u0209\u020B\u020D\u020F\u0211\u0213\u0215\u0217\u0219\u021B\u021D\u021F\u0221\u0223\u0225\u0227\u0229\u022B\u022D\u022F\u0231\u0233-\u0239\u023C\u023F\u0240\u0242\u0247\u0249\u024B\u024D\u024F-\u0293\u0295-\u02AF\u0371\u0373\u0377\u037B-\u037D\u0390\u03AC-\u03CE\u03D0\u03D1\u03D5-\u03D7\u03D9\u03DB\u03DD\u03DF\u03E1\u03E3\u03E5\u03E7\u03E9\u03EB\u03ED\u03EF-\u03F3\u03F5\u03F8\u03FB\u03FC\u0430-\u045F\u0461\u0463\u0465\u0467\u0469\u046B\u046D\u046F\u0471\u0473\u0475\u0477\u0479\u047B\u047D\u047F\u0481\u048B\u048D\u048F\u0491\u0493\u0495\u0497\u0499\u049B\u049D\u049F\u04A1\u04A3\u04A5\u04A7\u04A9\u04AB\u04AD\u04AF\u04B1\u04B3\u04B5\u04B7\u04B9\u04BB\u04BD\u04BF\u04C2\u04C4\u04C6\u04C8\u04CA\u04CC\u04CE\u04CF\u04D1\u04D3\u04D5\u04D7\u04D9\u04DB\u04DD\u04DF\u04E1\u04E3\u04E5\u04E7\u04E9\u04EB\u04ED\u04EF\u04F1\u04F3\u04F5\u04F7\u04F9\u04FB\u04FD\u04FF\u0501\u0503\u0505\u0507\u0509\u050B\u050D\u050F\u0511\u0513\u0515\u0517\u0519\u051B\u051D\u051F\u0521\u0523\u0525\u0527\u0529\u052B\u052D\u052F\u0561-\u0587\u13F8-\u13FD\u1C80-\u1C88\u1D00-\u1D2B\u1D6B-\u1D77\u1D79-\u1D9A\u1E01\u1E03\u1E05\u1E07\u1E09\u1E0B\u1E0D\u1E0F\u1E11\u1E13\u1E15\u1E17\u1E19\u1E1B\u1E1D\u1E1F\u1E21\u1E23\u1E25\u1E27\u1E29\u1E2B\u1E2D\u1E2F\u1E31\u1E33\u1E35\u1E37\u1E39\u1E3B\u1E3D\u1E3F\u1E41\u1E43\u1E45\u1E47\u1E49\u1E4B\u1E4D\u1E4F\u1E51\u1E53\u1E55\u1E57\u1E59\u1E5B\u1E5D\u1E5F\u1E61\u1E63\u1E65\u1E67\u1E69\u1E6B\u1E6D\u1E6F\u1E71\u1E73\u1E75\u1E77\u1E79\u1E7B\u1E7D\u1E7F\u1E81\u1E83\u1E85\u1E87\u1E89\u1E8B\u1E8D\u1E8F\u1E91\u1E93\u1E95-\u1E9D\u1E9F\u1EA1\u1EA3\u1EA5\u1EA7\u1EA9\u1EAB\u1EAD\u1EAF\u1EB1\u1EB3\u1EB5\u1EB7\u1EB9\u1EBB\u1EBD\u1EBF\u1EC1\u1EC3\u1EC5\u1EC7\u1EC9\u1ECB\u1ECD\u1ECF\u1ED1\u1ED3\u1ED5\u1ED7\u1ED9\u1EDB\u1EDD\u1EDF\u1EE1\u1EE3\u1EE5\u1EE7\u1EE9\u1EEB\u1EED\u1EEF\u1EF1\u1EF3\u1EF5\u1EF7\u1EF9\u1EFB\u1EFD\u1EFF-\u1F07\u1F10-\u1F15\u1F20-\u1F27\u1F30-\u1F37\u1F40-\u1F45\u1F50-\u1F57\u1F60-\u1F67\u1F70-\u1F7D\u1F80-\u1F87\u1F90-\u1F97\u1FA0-\u1FA7\u1FB0-\u1FB4\u1FB6\u1FB7\u1FBE\u1FC2-\u1FC4\u1FC6\u1FC7\u1FD0-\u1FD3\u1FD6\u1FD7\u1FE0-\u1FE7\u1FF2-\u1FF4\u1FF6\u1FF7\u210A\u210E\u210F\u2113\u212F\u2134\u2139\u213C\u213D\u2146-\u2149\u214E\u2184\u2C30-\u2C5E\u2C61\u2C65\u2C66\u2C68\u2C6A\u2C6C\u2C71\u2C73\u2C74\u2C76-\u2C7B\u2C81\u2C83\u2C85\u2C87\u2C89\u2C8B\u2C8D\u2C8F\u2C91\u2C93\u2C95\u2C97\u2C99\u2C9B\u2C9D\u2C9F\u2CA1\u2CA3\u2CA5\u2CA7\u2CA9\u2CAB\u2CAD\u2CAF\u2CB1\u2CB3\u2CB5\u2CB7\u2CB9\u2CBB\u2CBD\u2CBF\u2CC1\u2CC3\u2CC5\u2CC7\u2CC9\u2CCB\u2CCD\u2CCF\u2CD1\u2CD3\u2CD5\u2CD7\u2CD9\u2CDB\u2CDD\u2CDF\u2CE1\u2CE3\u2CE4\u2CEC\u2CEE\u2CF3\u2D00-\u2D25\u2D27\u2D2D\uA641\uA643\uA645\uA647\uA649\uA64B\uA64D\uA64F\uA651\uA653\uA655\uA657\uA659\uA65B\uA65D\uA65F\uA661\uA663\uA665\uA667\uA669\uA66B\uA66D\uA681\uA683\uA685\uA687\uA689\uA68B\uA68D\uA68F\uA691\uA693\uA695\uA697\uA699\uA69B\uA723\uA725\uA727\uA729\uA72B\uA72D\uA72F-\uA731\uA733\uA735\uA737\uA739\uA73B\uA73D\uA73F\uA741\uA743\uA745\uA747\uA749\uA74B\uA74D\uA74F\uA751\uA753\uA755\uA757\uA759\uA75B\uA75D\uA75F\uA761\uA763\uA765\uA767\uA769\uA76B\uA76D\uA76F\uA771-\uA778\uA77A\uA77C\uA77F\uA781\uA783\uA785\uA787\uA78C\uA78E\uA791\uA793-\uA795\uA797\uA799\uA79B\uA79D\uA79F\uA7A1\uA7A3\uA7A5\uA7A7\uA7A9\uA7B5\uA7B7\uA7FA\uAB30-\uAB5A\uAB60-\uAB65\uAB70-\uABBF\uFB00-\uFB06\uFB13-\uFB17\uFF41-\uFF5A]|\uD801[\uDC28-\uDC4F\uDCD8-\uDCFB]|\uD803[\uDCC0-\uDCF2]|\uD806[\uDCC0-\uDCDF]|\uD835[\uDC1A-\uDC33\uDC4E-\uDC54\uDC56-\uDC67\uDC82-\uDC9B\uDCB6-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDCEA-\uDD03\uDD1E-\uDD37\uDD52-\uDD6B\uDD86-\uDD9F\uDDBA-\uDDD3\uDDEE-\uDE07\uDE22-\uDE3B\uDE56-\uDE6F\uDE8A-\uDEA5\uDEC2-\uDEDA\uDEDC-\uDEE1\uDEFC-\uDF14\uDF16-\uDF1B\uDF36-\uDF4E\uDF50-\uDF55\uDF70-\uDF88\uDF8A-\uDF8F\uDFAA-\uDFC2\uDFC4-\uDFC9\uDFCB]|\uD83A[\uDD22-\uDD43]/,Lt:/[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]/,Lm:/[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]/,Lo:/[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,Nl:/[\u16EE-\u16F0\u2160-\u2182\u2185-\u2188\u3007\u3021-\u3029\u3038-\u303A\uA6E6-\uA6EF]|\uD800[\uDD40-\uDD74\uDF41\uDF4A\uDFD1-\uDFD5]|\uD809[\uDC00-\uDC6E]/,Nd:/[0-9\u0660-\u0669\u06F0-\u06F9\u07C0-\u07C9\u0966-\u096F\u09E6-\u09EF\u0A66-\u0A6F\u0AE6-\u0AEF\u0B66-\u0B6F\u0BE6-\u0BEF\u0C66-\u0C6F\u0CE6-\u0CEF\u0D66-\u0D6F\u0DE6-\u0DEF\u0E50-\u0E59\u0ED0-\u0ED9\u0F20-\u0F29\u1040-\u1049\u1090-\u1099\u17E0-\u17E9\u1810-\u1819\u1946-\u194F\u19D0-\u19D9\u1A80-\u1A89\u1A90-\u1A99\u1B50-\u1B59\u1BB0-\u1BB9\u1C40-\u1C49\u1C50-\u1C59\uA620-\uA629\uA8D0-\uA8D9\uA900-\uA909\uA9D0-\uA9D9\uA9F0-\uA9F9\uAA50-\uAA59\uABF0-\uABF9\uFF10-\uFF19]|\uD801[\uDCA0-\uDCA9]|\uD804[\uDC66-\uDC6F\uDCF0-\uDCF9\uDD36-\uDD3F\uDDD0-\uDDD9\uDEF0-\uDEF9]|[\uD805\uD807][\uDC50-\uDC59\uDCD0-\uDCD9\uDE50-\uDE59\uDEC0-\uDEC9\uDF30-\uDF39]|\uD806[\uDCE0-\uDCE9]|\uD81A[\uDE60-\uDE69\uDF50-\uDF59]|\uD835[\uDFCE-\uDFFF]|\uD83A[\uDD50-\uDD59]/,Mn:/[\u0300-\u036F\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D4-\u08E1\u08E3-\u0902\u093A\u093C\u0941-\u0948\u094D\u0951-\u0957\u0962\u0963\u0981\u09BC\u09C1-\u09C4\u09CD\u09E2\u09E3\u0A01\u0A02\u0A3C\u0A41\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81\u0A82\u0ABC\u0AC1-\u0AC5\u0AC7\u0AC8\u0ACD\u0AE2\u0AE3\u0B01\u0B3C\u0B3F\u0B41-\u0B44\u0B4D\u0B56\u0B62\u0B63\u0B82\u0BC0\u0BCD\u0C00\u0C3E-\u0C40\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81\u0CBC\u0CBF\u0CC6\u0CCC\u0CCD\u0CE2\u0CE3\u0D01\u0D41-\u0D44\u0D4D\u0D62\u0D63\u0DCA\u0DD2-\u0DD4\u0DD6\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F71-\u0F7E\u0F80-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102D-\u1030\u1032-\u1037\u1039\u103A\u103D\u103E\u1058\u1059\u105E-\u1060\u1071-\u1074\u1082\u1085\u1086\u108D\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4\u17B5\u17B7-\u17BD\u17C6\u17C9-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193B\u1A17\u1A18\u1A1B\u1A56\u1A58-\u1A5E\u1A60\u1A62\u1A65-\u1A6C\u1A73-\u1A7C\u1A7F\u1AB0-\u1ABD\u1B00-\u1B03\u1B34\u1B36-\u1B3A\u1B3C\u1B42\u1B6B-\u1B73\u1B80\u1B81\u1BA2-\u1BA5\u1BA8\u1BA9\u1BAB-\u1BAD\u1BE6\u1BE8\u1BE9\u1BED\u1BEF-\u1BF1\u1C2C-\u1C33\u1C36\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE0\u1CE2-\u1CE8\u1CED\u1CF4\u1CF8\u1CF9\u1DC0-\u1DF5\u1DFB-\u1DFF\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302D\u3099\u309A\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA825\uA826\uA8C4\uA8C5\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA951\uA980-\uA982\uA9B3\uA9B6-\uA9B9\uA9BC\uA9E5\uAA29-\uAA2E\uAA31\uAA32\uAA35\uAA36\uAA43\uAA4C\uAA7C\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEC\uAAED\uAAF6\uABE5\uABE8\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]|\uD800[\uDDFD\uDEE0\uDF76-\uDF7A]|\uD802[\uDE01-\uDE03\uDE05\uDE06\uDE0C-\uDE0F\uDE38-\uDE3A\uDE3F\uDEE5\uDEE6]|\uD804[\uDC01\uDC38-\uDC46\uDC7F-\uDC81\uDCB3-\uDCB6\uDCB9\uDCBA\uDD00-\uDD02\uDD27-\uDD2B\uDD2D-\uDD34\uDD73\uDD80\uDD81\uDDB6-\uDDBE\uDDCA-\uDDCC\uDE2F-\uDE31\uDE34\uDE36\uDE37\uDE3E\uDEDF\uDEE3-\uDEEA\uDF00\uDF01\uDF3C\uDF40\uDF66-\uDF6C\uDF70-\uDF74]|\uD805[\uDC38-\uDC3F\uDC42-\uDC44\uDC46\uDCB3-\uDCB8\uDCBA\uDCBF\uDCC0\uDCC2\uDCC3\uDDB2-\uDDB5\uDDBC\uDDBD\uDDBF\uDDC0\uDDDC\uDDDD\uDE33-\uDE3A\uDE3D\uDE3F\uDE40\uDEAB\uDEAD\uDEB0-\uDEB5\uDEB7\uDF1D-\uDF1F\uDF22-\uDF25\uDF27-\uDF2B]|\uD807[\uDC30-\uDC36\uDC38-\uDC3D\uDC3F\uDC92-\uDCA7\uDCAA-\uDCB0\uDCB2\uDCB3\uDCB5\uDCB6]|\uD81A[\uDEF0-\uDEF4\uDF30-\uDF36]|\uD81B[\uDF8F-\uDF92]|\uD82F[\uDC9D\uDC9E]|\uD834[\uDD67-\uDD69\uDD7B-\uDD82\uDD85-\uDD8B\uDDAA-\uDDAD\uDE42-\uDE44]|\uD836[\uDE00-\uDE36\uDE3B-\uDE6C\uDE75\uDE84\uDE9B-\uDE9F\uDEA1-\uDEAF]|\uD838[\uDC00-\uDC06\uDC08-\uDC18\uDC1B-\uDC21\uDC23\uDC24\uDC26-\uDC2A]|\uD83A[\uDCD0-\uDCD6\uDD44-\uDD4A]|\uDB40[\uDD00-\uDDEF]/,Mc:/[\u0903-\u0903]|[\u093E-\u0940]|[\u0949-\u094C]|[\u0982-\u0983]|[\u09BE-\u09C0]|[\u09C7-\u09C8]|[\u09CB-\u09CC]|[\u09D7-\u09D7]|[\u0A3E-\u0A40]|[\u0A83-\u0A83]|[\u0ABE-\u0AC0]|[\u0AC9-\u0AC9]|[\u0ACB-\u0ACC]|[\u0B02-\u0B03]|[\u0B3E-\u0B3E]|[\u0B40-\u0B40]|[\u0B47-\u0B48]|[\u0B4B-\u0B4C]|[\u0B57-\u0B57]|[\u0B83-\u0B83]|[\u0BBE-\u0BBF]|[\u0BC1-\u0BC2]|[\u0BC6-\u0BC8]|[\u0BCA-\u0BCC]|[\u0BD7-\u0BD7]|[\u0C01-\u0C03]|[\u0C41-\u0C44]|[\u0C82-\u0C83]|[\u0CBE-\u0CBE]|[\u0CC0-\u0CC4]|[\u0CC7-\u0CC8]|[\u0CCA-\u0CCB]|[\u0CD5-\u0CD6]|[\u0D02-\u0D03]|[\u0D3E-\u0D40]|[\u0D46-\u0D48]|[\u0D4A-\u0D4C]|[\u0D57-\u0D57]|[\u0F3E-\u0F3F]|[\u0F7F-\u0F7F]/,Pc:/[_\u203F\u2040\u2054\uFE33\uFE34\uFE4D-\uFE4F\uFF3F]/,Zs:/[ \xA0\u1680\u2000-\u200A\u202F\u205F\u3000]/,L:/[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0561-\u0587\u05D0-\u05EA\u05F0-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7AE\uA7B0-\uA7B7\uA7F7-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB65\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCA0-\uDCDF\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50\uDF93-\uDF9F\uDFE0]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/,Ltmo:/[\u01C5\u01C8\u01CB\u01F2\u1F88-\u1F8F\u1F98-\u1F9F\u1FA8-\u1FAF\u1FBC\u1FCC\u1FFC]|[\u02B0-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0374\u037A\u0559\u0640\u06E5\u06E6\u07F4\u07F5\u07FA\u081A\u0824\u0828\u0971\u0E46\u0EC6\u10FC\u17D7\u1843\u1AA7\u1C78-\u1C7D\u1D2C-\u1D6A\u1D78\u1D9B-\u1DBF\u2071\u207F\u2090-\u209C\u2C7C\u2C7D\u2D6F\u2E2F\u3005\u3031-\u3035\u303B\u309D\u309E\u30FC-\u30FE\uA015\uA4F8-\uA4FD\uA60C\uA67F\uA69C\uA69D\uA717-\uA71F\uA770\uA788\uA7F8\uA7F9\uA9CF\uA9E6\uAA70\uAADD\uAAF3\uAAF4\uAB5C-\uAB5F\uFF70\uFF9E\uFF9F]|\uD81A[\uDF40-\uDF43]|\uD81B[\uDF93-\uDF9F\uDFE0]|[\xAA\xBA\u01BB\u01C0-\u01C3\u0294\u05D0-\u05EA\u05F0-\u05F2\u0620-\u063F\u0641-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u0800-\u0815\u0840-\u0858\u08A0-\u08B4\u08B6-\u08BD\u0904-\u0939\u093D\u0950\u0958-\u0961\u0972-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D05-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E45\u0E81\u0E82\u0E84\u0E87\u0E88\u0E8A\u0E8D\u0E94-\u0E97\u0E99-\u0E9F\u0EA1-\u0EA3\u0EA5\u0EA7\u0EAA\u0EAB\u0EAD-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10D0-\u10FA\u10FD-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17DC\u1820-\u1842\u1844-\u1877\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1B05-\u1B33\u1B45-\u1B4B\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C77\u1CE9-\u1CEC\u1CEE-\u1CF1\u1CF5\u1CF6\u2135-\u2138\u2D30-\u2D67\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3006\u303C\u3041-\u3096\u309F\u30A1-\u30FA\u30FF\u3105-\u312D\u3131-\u318E\u31A0-\u31BA\u31F0-\u31FF\u3400-\u4DB5\u4E00-\u9FD5\uA000-\uA014\uA016-\uA48C\uA4D0-\uA4F7\uA500-\uA60B\uA610-\uA61F\uA62A\uA62B\uA66E\uA6A0-\uA6E5\uA78F\uA7F7\uA7FB-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9E0-\uA9E4\uA9E7-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA6F\uAA71-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB\uAADC\uAAE0-\uAAEA\uAAF2\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uABC0-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF66-\uFF6F\uFF71-\uFF9D\uFFA0-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF30-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC50-\uDC9D\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE33\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48]|\uD804[\uDC03-\uDC37\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDF00-\uDF19]|\uD806[\uDCFF\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDED0-\uDEED\uDF00-\uDF2F\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDF00-\uDF44\uDF50]|\uD821[\uDC00-\uDFEC]|\uD822[\uDC00-\uDEF2]|\uD82C[\uDC00\uDC01]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD83A[\uDC00-\uDCC4]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDED6\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1]|\uD87E[\uDC00-\uDE1D]/};},function(u,t,e){var r=e(0),n=e(1);n.PExpr.prototype.allowsSkippingPrecedingSpace=r.abstract("allowsSkippingPrecedingSpace"),n.any.allowsSkippingPrecedingSpace=n.end.allowsSkippingPrecedingSpace=n.Apply.prototype.allowsSkippingPrecedingSpace=n.Terminal.prototype.allowsSkippingPrecedingSpace=n.Range.prototype.allowsSkippingPrecedingSpace=n.UnicodeChar.prototype.allowsSkippingPrecedingSpace=function(){return !0},n.Alt.prototype.allowsSkippingPrecedingSpace=n.Iter.prototype.allowsSkippingPrecedingSpace=n.Lex.prototype.allowsSkippingPrecedingSpace=n.Lookahead.prototype.allowsSkippingPrecedingSpace=n.Not.prototype.allowsSkippingPrecedingSpace=n.Param.prototype.allowsSkippingPrecedingSpace=n.Seq.prototype.allowsSkippingPrecedingSpace=function(){return !1};},function(u,t,e){var r,n,i=e(0),o=e(2),a=e(1);e(3).awaitBuiltInRules((function(u){r=u;})),a.PExpr.prototype.assertAllApplicationsAreValid=function(u,t){n=0,this._assertAllApplicationsAreValid(u,t);},a.PExpr.prototype._assertAllApplicationsAreValid=i.abstract("_assertAllApplicationsAreValid"),a.any._assertAllApplicationsAreValid=a.end._assertAllApplicationsAreValid=a.Terminal.prototype._assertAllApplicationsAreValid=a.Range.prototype._assertAllApplicationsAreValid=a.Param.prototype._assertAllApplicationsAreValid=a.UnicodeChar.prototype._assertAllApplicationsAreValid=function(u,t){},a.Lex.prototype._assertAllApplicationsAreValid=function(u,t){n++,this.expr._assertAllApplicationsAreValid(u,t),n--;},a.Alt.prototype._assertAllApplicationsAreValid=function(u,t){for(var e=0;e<this.terms.length;e++)this.terms[e]._assertAllApplicationsAreValid(u,t);},a.Seq.prototype._assertAllApplicationsAreValid=function(u,t){for(var e=0;e<this.factors.length;e++)this.factors[e]._assertAllApplicationsAreValid(u,t);},a.Iter.prototype._assertAllApplicationsAreValid=a.Not.prototype._assertAllApplicationsAreValid=a.Lookahead.prototype._assertAllApplicationsAreValid=function(u,t){this.expr._assertAllApplicationsAreValid(u,t);},a.Apply.prototype._assertAllApplicationsAreValid=function(u,t){var e=t.rules[this.ruleName];if(!e)throw o.undeclaredRule(this.ruleName,t.name,this.source);if(i.isSyntactic(this.ruleName)&&(!i.isSyntactic(u)||n>0))throw o.applicationOfSyntacticRuleFromLexicalContext(this.ruleName,this);var s=this.args.length,c=e.formals.length;if(s!==c)throw o.wrongNumberOfArguments(this.ruleName,c,s,this.source);var l=this;if(this.args.forEach((function(e){if(e._assertAllApplicationsAreValid(u,t),1!==e.getArity())throw o.invalidParameter(l.ruleName,e)})),r&&e===r.rules.caseInsensitive&&!(this.args[0]instanceof a.Terminal))throw o.incorrectArgumentType('a Terminal (e.g. "abc")',this.args[0])};},function(u,t,e){var r=e(0),n=e(2),i=e(1);i.PExpr.prototype.assertChoicesHaveUniformArity=r.abstract("assertChoicesHaveUniformArity"),i.any.assertChoicesHaveUniformArity=i.end.assertChoicesHaveUniformArity=i.Terminal.prototype.assertChoicesHaveUniformArity=i.Range.prototype.assertChoicesHaveUniformArity=i.Param.prototype.assertChoicesHaveUniformArity=i.Lex.prototype.assertChoicesHaveUniformArity=i.UnicodeChar.prototype.assertChoicesHaveUniformArity=function(u){},i.Alt.prototype.assertChoicesHaveUniformArity=function(u){if(0!==this.terms.length)for(var t=this.terms[0].getArity(),e=0;e<this.terms.length;e++){var r=this.terms[e];r.assertChoicesHaveUniformArity();var i=r.getArity();if(t!==i)throw n.inconsistentArity(u,t,i,r)}},i.Extend.prototype.assertChoicesHaveUniformArity=function(u){var t=this.terms[0].getArity(),e=this.terms[1].getArity();if(t!==e)throw n.inconsistentArity(u,e,t,this.terms[0])},i.Seq.prototype.assertChoicesHaveUniformArity=function(u){for(var t=0;t<this.factors.length;t++)this.factors[t].assertChoicesHaveUniformArity(u);},i.Iter.prototype.assertChoicesHaveUniformArity=function(u){this.expr.assertChoicesHaveUniformArity(u);},i.Not.prototype.assertChoicesHaveUniformArity=function(u){},i.Lookahead.prototype.assertChoicesHaveUniformArity=function(u){this.expr.assertChoicesHaveUniformArity(u);},i.Apply.prototype.assertChoicesHaveUniformArity=function(u){};},function(u,t,e){var r=e(0),n=e(2),i=e(1);i.PExpr.prototype.assertIteratedExprsAreNotNullable=r.abstract("assertIteratedExprsAreNotNullable"),i.any.assertIteratedExprsAreNotNullable=i.end.assertIteratedExprsAreNotNullable=i.Terminal.prototype.assertIteratedExprsAreNotNullable=i.Range.prototype.assertIteratedExprsAreNotNullable=i.Param.prototype.assertIteratedExprsAreNotNullable=i.UnicodeChar.prototype.assertIteratedExprsAreNotNullable=function(u){},i.Alt.prototype.assertIteratedExprsAreNotNullable=function(u){for(var t=0;t<this.terms.length;t++)this.terms[t].assertIteratedExprsAreNotNullable(u);},i.Seq.prototype.assertIteratedExprsAreNotNullable=function(u){for(var t=0;t<this.factors.length;t++)this.factors[t].assertIteratedExprsAreNotNullable(u);},i.Iter.prototype.assertIteratedExprsAreNotNullable=function(u){if(this.expr.assertIteratedExprsAreNotNullable(u),this.expr.isNullable(u))throw n.kleeneExprHasNullableOperand(this,[])},i.Opt.prototype.assertIteratedExprsAreNotNullable=i.Not.prototype.assertIteratedExprsAreNotNullable=i.Lookahead.prototype.assertIteratedExprsAreNotNullable=i.Lex.prototype.assertIteratedExprsAreNotNullable=function(u){this.expr.assertIteratedExprsAreNotNullable(u);},i.Apply.prototype.assertIteratedExprsAreNotNullable=function(u){this.args.forEach((function(t){t.assertIteratedExprsAreNotNullable(u);}));};},function(u,t,e){var r=e(0),n=e(5),i=e(1);i.PExpr.prototype.check=r.abstract("check"),i.any.check=function(u,t){return t.length>=1},i.end.check=function(u,t){return t[0]instanceof n.Node&&t[0].isTerminal()&&void 0===t[0].primitiveValue},i.Terminal.prototype.check=function(u,t){return t[0]instanceof n.Node&&t[0].isTerminal()&&t[0].primitiveValue===this.obj},i.Range.prototype.check=function(u,t){return t[0]instanceof n.Node&&t[0].isTerminal()&&typeof t[0].primitiveValue==typeof this.from},i.Param.prototype.check=function(u,t){return t.length>=1},i.Alt.prototype.check=function(u,t){for(var e=0;e<this.terms.length;e++){if(this.terms[e].check(u,t))return !0}return !1},i.Seq.prototype.check=function(u,t){for(var e=0,r=0;r<this.factors.length;r++){var n=this.factors[r];if(!n.check(u,t.slice(e)))return !1;e+=n.getArity();}return !0},i.Iter.prototype.check=function(u,t){var e=this.getArity(),r=t.slice(0,e);if(r.length!==e)return !1;var n,i=r[0].length;for(n=1;n<e;n++)if(r[n].length!==i)return !1;for(n=0;n<i;n++){for(var o=[],a=0;a<e;a++)o.push(r[a][n]);if(!this.expr.check(u,o))return !1}return !0},i.Not.prototype.check=function(u,t){return !0},i.Lookahead.prototype.check=i.Lex.prototype.check=function(u,t){return this.expr.check(u,t)},i.Apply.prototype.check=function(u,t){if(!(t[0]instanceof n.Node&&t[0].grammar===u&&t[0].ctorName===this.ruleName))return !1;var e=t[0],r=u.rules[this.ruleName].body;return r.check(u,e.children)&&e.numChildren()===r.getArity()},i.UnicodeChar.prototype.check=function(u,t){return t[0]instanceof n.Node&&t[0].isTerminal()&&"string"==typeof t[0].primitiveValue};},function(u,t,e){var r=e(13),n=e(0),i=e(2),o=e(5),a=e(1),s=o.TerminalNode,c=o.NonterminalNode,l=o.IterationNode;a.PExpr.prototype.eval=n.abstract("eval"),a.any.eval=function(u){var t=u.inputStream,e=t.pos,r=t.next();return r?(u.pushBinding(new s(u.grammar,r),e),!0):(u.processFailure(e,this),!1)},a.end.eval=function(u){var t=u.inputStream,e=t.pos;return t.atEnd()?(u.pushBinding(new s(u.grammar,void 0),e),!0):(u.processFailure(e,this),!1)},a.Terminal.prototype.eval=function(u){var t=u.inputStream,e=t.pos;return t.matchString(this.obj)?(u.pushBinding(new s(u.grammar,this.obj),e),!0):(u.processFailure(e,this),!1)},a.Range.prototype.eval=function(u){var t=u.inputStream,e=t.pos,r=t.next();return r&&this.from<=r&&r<=this.to?(u.pushBinding(new s(u.grammar,r),e),!0):(u.processFailure(e,this),!1)},a.Param.prototype.eval=function(u){return u.eval(u.currentApplication().args[this.index])},a.Lex.prototype.eval=function(u){u.enterLexifiedContext();var t=u.eval(this.expr);return u.exitLexifiedContext(),t},a.Alt.prototype.eval=function(u){for(var t=0;t<this.terms.length;t++)if(u.eval(this.terms[t]))return !0;return !1},a.Seq.prototype.eval=function(u){for(var t=0;t<this.factors.length;t++){var e=this.factors[t];if(!u.eval(e))return !1}return !0},a.Iter.prototype.eval=function(u){for(var t=u.inputStream,e=t.pos,r=this.getArity(),n=[],o=[];n.length<r;)n.push([]),o.push([]);for(var s,c=0,p=e;c<this.maxNumMatches&&u.eval(this.expr);){if(t.pos===p)throw i.kleeneExprHasNullableOperand(this,u._applicationStack);p=t.pos,c++;var D=u._bindings.splice(u._bindings.length-r,r),h=u._bindingOffsets.splice(u._bindingOffsets.length-r,r);for(s=0;s<D.length;s++)n[s].push(D[s]),o[s].push(h[s]);}if(c<this.minNumMatches)return !1;var A=u.posToOffset(e),f=0;if(c>0){var m=n[r-1],E=o[r-1];f=E[E.length-1]+m[m.length-1].matchLength-(A=o[0][0]);}var C=this instanceof a.Opt;for(s=0;s<n.length;s++)u._bindings.push(new l(u.grammar,n[s],o[s],f,C)),u._bindingOffsets.push(A);return !0},a.Not.prototype.eval=function(u){var t=u.inputStream,e=t.pos;u.pushFailuresInfo();var r=u.eval(this.expr);return u.popFailuresInfo(),r?(u.processFailure(e,this),!1):(t.pos=e,!0)},a.Lookahead.prototype.eval=function(u){var t=u.inputStream,e=t.pos;return !!u.eval(this.expr)&&(t.pos=e,!0)},a.Apply.prototype.eval=function(u){var t=u.currentApplication(),e=t?t.args:[],r=this.substituteParams(e),n=u.getCurrentPosInfo();if(n.isActive(r))return r.handleCycle(u);var i=r.toMemoKey(),o=n.memo[i];if(o&&n.shouldUseMemoizedResult(o)){if(u.hasNecessaryInfo(o))return u.useMemoizedResult(u.inputStream.pos,o);delete n.memo[i];}return r.reallyEval(u)},a.Apply.prototype.handleCycle=function(u){var t=u.getCurrentPosInfo(),e=t.currentLeftRecursion,r=this.toMemoKey(),n=t.memo[r];return e&&e.headApplication.toMemoKey()===r?n.updateInvolvedApplicationMemoKeys():n||(n=t.memoize(r,{matchLength:0,examinedLength:0,value:!1,rightmostFailureOffset:-1}),t.startLeftRecursion(this,n)),u.useMemoizedResult(u.inputStream.pos,n)},a.Apply.prototype.reallyEval=function(u){var t=u.inputStream,e=t.pos,r=u.getCurrentPosInfo(),i=u.grammar.rules[this.ruleName],o=i.body,a=i.description;u.enterApplication(r,this),a&&u.pushFailuresInfo();var s=t.examinedLength;t.examinedLength=0;var c,l=this.evalOnce(o,u),p=r.currentLeftRecursion,D=this.toMemoKey(),h=p&&p.headApplication.toMemoKey()===D;h?(l=this.growSeedResult(o,u,e,p,l),r.endLeftRecursion(),(c=p).examinedLength=t.examinedLength-e,c.rightmostFailureOffset=u._getRightmostFailureOffset(),r.memoize(D,c)):p&&p.isInvolved(D)||(c=r.memoize(D,{matchLength:t.pos-e,examinedLength:t.examinedLength-e,value:l,failuresAtRightmostPosition:u.cloneRecordedFailures(),rightmostFailureOffset:u._getRightmostFailureOffset()}));var A=!!l;if(a&&(u.popFailuresInfo(),A||u.processFailure(e,this),c&&(c.failuresAtRightmostPosition=u.cloneRecordedFailures())),u.isTracing()&&c){var f=u.getTraceEntry(e,this,A,A?[l]:[]);h&&(n.assert(null!=f.terminatingLREntry||!A),f.isHeadOfLeftRecursion=!0),c.traceEntry=f;}return t.examinedLength=Math.max(t.examinedLength,s),u.exitApplication(r,l),A},a.Apply.prototype.evalOnce=function(u,t){var e=t.inputStream,r=e.pos;if(t.eval(u)){var n=u.getArity(),i=t._bindings.splice(t._bindings.length-n,n),o=t._bindingOffsets.splice(t._bindingOffsets.length-n,n);return new c(t.grammar,this.ruleName,i,o,e.pos-r)}return !1},a.Apply.prototype.growSeedResult=function(u,t,e,n,i){if(!i)return !1;for(var o=t.inputStream;;){if(n.matchLength=o.pos-e,n.value=i,n.failuresAtRightmostPosition=t.cloneRecordedFailures(),t.isTracing()){var a=t.trace[t.trace.length-1];n.traceEntry=new r(t.input,e,o.pos,this,!0,[i],[a.clone()]);}if(o.pos=e,i=this.evalOnce(u,t),o.pos-e<=n.matchLength)break;t.isTracing()&&t.trace.splice(-2,1);}return t.isTracing()&&n.traceEntry.recordLRTermination(t.trace.pop(),i),o.pos=e+n.matchLength,n.value},a.UnicodeChar.prototype.eval=function(u){var t=u.inputStream,e=t.pos,r=t.next();return r&&this.pattern.test(r)?(u.pushBinding(new s(u.grammar,r),e),!0):(u.processFailure(e,this),!1)};},function(u,t,e){var r=e(0),n=e(1);n.PExpr.prototype.getArity=r.abstract("getArity"),n.any.getArity=n.end.getArity=n.Terminal.prototype.getArity=n.Range.prototype.getArity=n.Param.prototype.getArity=n.Apply.prototype.getArity=n.UnicodeChar.prototype.getArity=function(){return 1},n.Alt.prototype.getArity=function(){return 0===this.terms.length?0:this.terms[0].getArity()},n.Seq.prototype.getArity=function(){for(var u=0,t=0;t<this.factors.length;t++)u+=this.factors[t].getArity();return u},n.Iter.prototype.getArity=function(){return this.expr.getArity()},n.Not.prototype.getArity=function(){return 0},n.Lookahead.prototype.getArity=n.Lex.prototype.getArity=function(){return this.expr.getArity()};},function(u,t,e){var r=e(0),n=e(1);function i(u){var t,e=u.filter((function(u){return u.hasOwnProperty("examplesNeeded")})).map((function(u){return u.examplesNeeded}));t=e,e=Array.prototype.concat.apply([],t);for(var r={},n=0;n<e.length;n++){r[e[n]]=!0;}return {examplesNeeded:e=Object.keys(r),successfulExamples:u.filter((function(u){return u.hasOwnProperty("value")})).map((function(u){return u.value})),needHelp:u.some((function(u){return u.needHelp}))}}n.PExpr.prototype.generateExample=r.abstract("generateExample"),n.any.generateExample=function(u,t,e,r){return {value:String.fromCharCode(Math.floor(255*Math.random()))}},n.Terminal.prototype.generateExample=function(u,t,e){return {value:this.obj}},n.Range.prototype.generateExample=function(u,t,e){var r=this.to.charCodeAt(0)-this.from.charCodeAt(0);return {value:String.fromCharCode(this.from.charCodeAt(0)+Math.floor(r*Math.random()))}},n.Param.prototype.generateExample=function(u,t,e,r){return r[this.index].generateExample(u,t,e,r)},n.Alt.prototype.generateExample=function(u,t,e,r){var n=i(this.terms.map((function(n){return n.generateExample(u,t,e,r)}))),o=n.examplesNeeded,a=n.successfulExamples,s=n.needHelp,c={};if(a.length>0){var l=Math.floor(Math.random()*a.length);c.value=a[l];}return o.length>0&&(c.examplesNeeded=o),c.needHelp=s,c},n.Seq.prototype.generateExample=function(u,t,e,r){var n=i(this.factors.map((function(n){return n.generateExample(u,t,e,r)}))),o=n.examplesNeeded,a=n.successfulExamples,s=n.needHelp,c={};return o.length>0||s?(c.examplesNeeded=o,c.needHelp=s):c.value=a.join(e?" ":""),c},n.Iter.prototype.generateExample=function(u,t,e,r){for(var n=Math.min(this.maxNumMatches-this.minNumMatches,3),o=Math.floor(Math.random()*(n+1)+this.minNumMatches),a=[],s=0;s<o;s++)a.push(this.expr.generateExample(u,t,e,r));var c=i(a),l=c.examplesNeeded,p=c.successfulExamples,D={};return D.value=p.join(e?" ":""),l.length>0&&(D.examplesNeeded=l),D},n.Not.prototype.generateExample=function(u,t,e){return {value:""}},n.Lookahead.prototype.generateExample=function(u,t,e){return {value:""}},n.Lex.prototype.generateExample=function(u,t,e,r){return this.expr.generateExample(u,t,!1,r)},n.Apply.prototype.generateExample=function(u,t,e,r){var n={},i=this.substituteParams(r).toString();if(t.hasOwnProperty(i)){var o=t[i],a=Math.floor(Math.random()*o.length);n.value=o[a];}else n.examplesNeeded=[i];return n},n.UnicodeChar.prototype.generateExample=function(u,t,e,r){var n;switch(this.category){case"Lu":n="Á";break;case"Ll":n="ŏ";break;case"Lt":n="ǅ";break;case"Lm":n="ˮ";break;case"Lo":n="ƻ";break;case"Nl":n="ↂ";break;case"Nd":n="½";break;case"Mn":n="҇";break;case"Mc":n="ि";break;case"Pc":n="⁀";break;case"Zs":n=" ";break;case"L":n="Á";break;case"Ltmo":n="ǅ";}return {value:n}};},function(u,t,e){var r=e(0),n=e(1);function i(u,t){var e={};if(u.source&&t){var r=u.source.relativeTo(t);e.sourceInterval=[r.startIdx,r.endIdx];}return e}n.PExpr.prototype.outputRecipe=r.abstract("outputRecipe"),n.any.outputRecipe=function(u,t){return ["any",i(this,t)]},n.end.outputRecipe=function(u,t){return ["end",i(this,t)]},n.Terminal.prototype.outputRecipe=function(u,t){return ["terminal",i(this,t),this.obj]},n.Range.prototype.outputRecipe=function(u,t){return ["range",i(this,t),this.from,this.to]},n.Param.prototype.outputRecipe=function(u,t){return ["param",i(this,t),this.index]},n.Alt.prototype.outputRecipe=function(u,t){return ["alt",i(this,t)].concat(this.terms.map((function(e){return e.outputRecipe(u,t)})))},n.Extend.prototype.outputRecipe=function(u,t){return this.terms[0].outputRecipe(u,t)},n.Splice.prototype.outputRecipe=function(u,t){var e=this.terms.slice(0,this.expansionPos),r=this.terms.slice(this.expansionPos+1);return ["splice",i(this,t),e.map((function(e){return e.outputRecipe(u,t)})),r.map((function(e){return e.outputRecipe(u,t)}))]},n.Seq.prototype.outputRecipe=function(u,t){return ["seq",i(this,t)].concat(this.factors.map((function(e){return e.outputRecipe(u,t)})))},n.Star.prototype.outputRecipe=n.Plus.prototype.outputRecipe=n.Opt.prototype.outputRecipe=n.Not.prototype.outputRecipe=n.Lookahead.prototype.outputRecipe=n.Lex.prototype.outputRecipe=function(u,t){return [this.constructor.name.toLowerCase(),i(this,t),this.expr.outputRecipe(u,t)]},n.Apply.prototype.outputRecipe=function(u,t){return ["app",i(this,t),this.ruleName,this.args.map((function(e){return e.outputRecipe(u,t)}))]},n.UnicodeChar.prototype.outputRecipe=function(u,t){return ["unicodeChar",i(this,t),this.category]};},function(u,t,e){var r=e(0),n=e(1);n.PExpr.prototype.introduceParams=r.abstract("introduceParams"),n.any.introduceParams=n.end.introduceParams=n.Terminal.prototype.introduceParams=n.Range.prototype.introduceParams=n.Param.prototype.introduceParams=n.UnicodeChar.prototype.introduceParams=function(u){return this},n.Alt.prototype.introduceParams=function(u){return this.terms.forEach((function(t,e,r){r[e]=t.introduceParams(u);})),this},n.Seq.prototype.introduceParams=function(u){return this.factors.forEach((function(t,e,r){r[e]=t.introduceParams(u);})),this},n.Iter.prototype.introduceParams=n.Not.prototype.introduceParams=n.Lookahead.prototype.introduceParams=n.Lex.prototype.introduceParams=function(u){return this.expr=this.expr.introduceParams(u),this},n.Apply.prototype.introduceParams=function(u){var t=u.indexOf(this.ruleName);if(t>=0){if(this.args.length>0)throw new Error("Parameterized rules cannot be passed as arguments to another rule.");return new n.Param(t).withSource(this.source)}return this.args.forEach((function(t,e,r){r[e]=t.introduceParams(u);})),this};},function(u,t,e){var r=e(0),n=e(1);n.PExpr.prototype.isNullable=function(u){return this._isNullable(u,Object.create(null))},n.PExpr.prototype._isNullable=r.abstract("_isNullable"),n.any._isNullable=n.Range.prototype._isNullable=n.Param.prototype._isNullable=n.Plus.prototype._isNullable=n.UnicodeChar.prototype._isNullable=function(u,t){return !1},n.end._isNullable=function(u,t){return !0},n.Terminal.prototype._isNullable=function(u,t){return "string"==typeof this.obj&&""===this.obj},n.Alt.prototype._isNullable=function(u,t){return 0===this.terms.length||this.terms.some((function(e){return e._isNullable(u,t)}))},n.Seq.prototype._isNullable=function(u,t){return this.factors.every((function(e){return e._isNullable(u,t)}))},n.Star.prototype._isNullable=n.Opt.prototype._isNullable=n.Not.prototype._isNullable=n.Lookahead.prototype._isNullable=function(u,t){return !0},n.Lex.prototype._isNullable=function(u,t){return this.expr._isNullable(u,t)},n.Apply.prototype._isNullable=function(u,t){var e=this.toMemoKey();if(!Object.prototype.hasOwnProperty.call(t,e)){var r=u.rules[this.ruleName].body.substituteParams(this.args);t[e]=!1,t[e]=r._isNullable(u,t);}return t[e]};},function(u,t,e){var r=e(0),n=e(1);n.PExpr.prototype.substituteParams=r.abstract("substituteParams"),n.any.substituteParams=n.end.substituteParams=n.Terminal.prototype.substituteParams=n.Range.prototype.substituteParams=n.UnicodeChar.prototype.substituteParams=function(u){return this},n.Param.prototype.substituteParams=function(u){return u[this.index]},n.Alt.prototype.substituteParams=function(u){return new n.Alt(this.terms.map((function(t){return t.substituteParams(u)})))},n.Seq.prototype.substituteParams=function(u){return new n.Seq(this.factors.map((function(t){return t.substituteParams(u)})))},n.Iter.prototype.substituteParams=n.Not.prototype.substituteParams=n.Lookahead.prototype.substituteParams=n.Lex.prototype.substituteParams=function(u){return new this.constructor(this.expr.substituteParams(u))},n.Apply.prototype.substituteParams=function(u){if(0===this.args.length)return this;var t=this.args.map((function(t){return t.substituteParams(u)}));return new n.Apply(this.ruleName,t)};},function(u,t,e){var r=e(0),n=e(1);n.PExpr.prototype.toDisplayString=r.abstract("toDisplayString"),n.Alt.prototype.toDisplayString=n.Seq.prototype.toDisplayString=function(){return this.source?this.source.trimmed().contents:"["+this.constructor.name+"]"},n.any.toDisplayString=n.end.toDisplayString=n.Iter.prototype.toDisplayString=n.Not.prototype.toDisplayString=n.Lookahead.prototype.toDisplayString=n.Lex.prototype.toDisplayString=n.Terminal.prototype.toDisplayString=n.Range.prototype.toDisplayString=n.Param.prototype.toDisplayString=function(){return this.toString()},n.Apply.prototype.toDisplayString=function(){if(this.args.length>0){var u=this.args.map((function(u){return u.toDisplayString()}));return this.ruleName+"<"+u.join(",")+">"}return this.ruleName},n.UnicodeChar.prototype.toDisplayString=function(){return "Unicode ["+this.category+"] character"};},function(u,t,e){var r=e(0),n=e(1),i=r.copyWithoutDuplicates;function o(u){return /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(u)}function a(u){var t=Object.create(null);u.forEach((function(u){t[u]=(t[u]||0)+1;})),Object.keys(t).forEach((function(e){if(!(t[e]<=1)){var r=1;u.forEach((function(t,n){t===e&&(u[n]=t+"_"+r++);}));}}));}n.PExpr.prototype.toArgumentNameList=r.abstract("toArgumentNameList"),n.any.toArgumentNameList=function(u,t){return ["any"]},n.end.toArgumentNameList=function(u,t){return ["end"]},n.Terminal.prototype.toArgumentNameList=function(u,t){return "string"==typeof this.obj&&/^[_a-zA-Z0-9]+$/.test(this.obj)?["_"+this.obj]:["$"+u]},n.Range.prototype.toArgumentNameList=function(u,t){var e=this.from+"_to_"+this.to;return o(e)||(e="_"+e),o(e)||(e="$"+u),[e]},n.Alt.prototype.toArgumentNameList=function(u,t){for(var e=this.terms.map((function(t){return t.toArgumentNameList(u,!0)})),r=[],n=e[0].length,o=0;o<n;o++){for(var s=[],c=0;c<this.terms.length;c++)s.push(e[c][o]);var l=i(s);r.push(l.join("_or_"));}return t||a(r),r},n.Seq.prototype.toArgumentNameList=function(u,t){var e=[];return this.factors.forEach((function(t){var r=t.toArgumentNameList(u,!0);e=e.concat(r),u+=r.length;})),t||a(e),e},n.Iter.prototype.toArgumentNameList=function(u,t){var e=this.expr.toArgumentNameList(u,t).map((function(u){return "s"===u[u.length-1]?u+"es":u+"s"}));return t||a(e),e},n.Opt.prototype.toArgumentNameList=function(u,t){return this.expr.toArgumentNameList(u,t).map((function(u){return "opt"+u[0].toUpperCase()+u.slice(1)}))},n.Not.prototype.toArgumentNameList=function(u,t){return []},n.Lookahead.prototype.toArgumentNameList=n.Lex.prototype.toArgumentNameList=function(u,t){return this.expr.toArgumentNameList(u,t)},n.Apply.prototype.toArgumentNameList=function(u,t){return [this.ruleName]},n.UnicodeChar.prototype.toArgumentNameList=function(u,t){return ["$"+u]},n.Param.prototype.toArgumentNameList=function(u,t){return ["param"+this.index]};},function(u,t,e){var r=e(11),n=e(0),i=e(1);i.PExpr.prototype.toFailure=n.abstract("toFailure"),i.any.toFailure=function(u){return new r(this,"any object","description")},i.end.toFailure=function(u){return new r(this,"end of input","description")},i.Terminal.prototype.toFailure=function(u){return new r(this,this.obj,"string")},i.Range.prototype.toFailure=function(u){return new r(this,JSON.stringify(this.from)+".."+JSON.stringify(this.to),"code")},i.Not.prototype.toFailure=function(u){var t=this.expr===i.any?"nothing":"not "+this.expr.toFailure(u);return new r(this,t,"description")},i.Lookahead.prototype.toFailure=function(u){return this.expr.toFailure(u)},i.Apply.prototype.toFailure=function(u){var t=u.rules[this.ruleName].description;t||(t=(/^[aeiouAEIOU]/.test(this.ruleName)?"an":"a")+" "+this.ruleName);return new r(this,t,"description")},i.UnicodeChar.prototype.toFailure=function(u){return new r(this,"a Unicode ["+this.category+"] character","description")},i.Alt.prototype.toFailure=function(u){var t="("+this.terms.map((function(t){return t.toFailure(u)})).join(" or ")+")";return new r(this,t,"description")},i.Seq.prototype.toFailure=function(u){var t="("+this.factors.map((function(t){return t.toFailure(u)})).join(" ")+")";return new r(this,t,"description")},i.Iter.prototype.toFailure=function(u){var t="("+this.expr.toFailure(u)+this.operator+")";return new r(this,t,"description")};},function(u,t,e){var r=e(0),n=e(1);n.PExpr.prototype.toString=r.abstract("toString"),n.any.toString=function(){return "any"},n.end.toString=function(){return "end"},n.Terminal.prototype.toString=function(){return JSON.stringify(this.obj)},n.Range.prototype.toString=function(){return JSON.stringify(this.from)+".."+JSON.stringify(this.to)},n.Param.prototype.toString=function(){return "$"+this.index},n.Lex.prototype.toString=function(){return "#("+this.expr.toString()+")"},n.Alt.prototype.toString=function(){return 1===this.terms.length?this.terms[0].toString():"("+this.terms.map((function(u){return u.toString()})).join(" | ")+")"},n.Seq.prototype.toString=function(){return 1===this.factors.length?this.factors[0].toString():"("+this.factors.map((function(u){return u.toString()})).join(" ")+")"},n.Iter.prototype.toString=function(){return this.expr+this.operator},n.Not.prototype.toString=function(){return "~"+this.expr},n.Lookahead.prototype.toString=function(){return "&"+this.expr},n.Apply.prototype.toString=function(){if(this.args.length>0){var u=this.args.map((function(u){return u.toString()}));return this.ruleName+"<"+u.join(",")+">"}return this.ruleName},n.UnicodeChar.prototype.toString=function(){return "\\p{"+this.category+"}"};},function(u,t,e){var r=e(36),n=e(1);function i(u){this.grammar=u,this.memoTable=[],this.input="";}i.prototype.getInput=function(){return this.input},i.prototype.setInput=function(u){return this.input!==u&&this.replaceInputRange(0,this.input.length,u),this},i.prototype.replaceInputRange=function(u,t,e){var r=this.input;if(u<0||u>r.length||t<0||t>r.length||u>t)throw new Error("Invalid indices: "+u+" and "+t);this.input=r.slice(0,u)+e+r.slice(t);var n=this.memoTable.slice(t);this.memoTable.length=u;for(var i=0;i<e.length;i++)this.memoTable.push(void 0);n.forEach((function(u){this.memoTable.push(u);}),this);for(var o=0;o<u;o++){var a=this.memoTable[o];a&&a.clearObsoleteEntries(o,u);}return this},i.prototype.match=function(u){return this._match(this._getStartExpr(u),!1)},i.prototype.trace=function(u){return this._match(this._getStartExpr(u),!0)},i.prototype._match=function(u,t,e){var n=new r(this,u,e);return t?n.getTrace():n.getMatchResult()},i.prototype._getStartExpr=function(u){var t=u||this.grammar.defaultStartRule;if(!t)throw new Error("Missing start rule argument -- the grammar has no default start rule.");var e=this.grammar.parseApplication(t);return new n.Seq([e,n.end])},u.exports=i;},function(u,t,e){var r=e(9),n=e(10),i=e(37),o=e(13),a=e(1),s=new a.Apply("spaces");function c(u,t,e){this.matcher=u,this.startExpr=t,this.grammar=u.grammar,this.input=u.input,this.inputStream=new r(u.input),this.memoTable=u.memoTable,this._bindings=[],this._bindingOffsets=[],this._applicationStack=[],this._posStack=[0],this.inLexifiedContextStack=[!1],this.rightmostFailurePosition=-1,this._rightmostFailurePositionStack=[],this._recordedFailuresStack=[],void 0!==e&&(this.positionToRecordFailures=e,this.recordedFailures=Object.create(null));}c.prototype={posToOffset:function(u){return u-this._posStack[this._posStack.length-1]},enterApplication:function(u,t){this._posStack.push(this.inputStream.pos),this._applicationStack.push(t),this.inLexifiedContextStack.push(!1),u.enter(t),this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),this.rightmostFailurePosition=-1;},exitApplication:function(u,t){var e=this._posStack.pop();this._applicationStack.pop(),this.inLexifiedContextStack.pop(),u.exit(),this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,this._rightmostFailurePositionStack.pop()),t&&this.pushBinding(t,e);},enterLexifiedContext:function(){this.inLexifiedContextStack.push(!0);},exitLexifiedContext:function(){this.inLexifiedContextStack.pop();},currentApplication:function(){return this._applicationStack[this._applicationStack.length-1]},inSyntacticContext:function(){if("string"!=typeof this.inputStream.source)return !1;var u=this.currentApplication();return u?u.isSyntactic()&&!this.inLexifiedContext():this.startExpr.factors[0].isSyntactic()},inLexifiedContext:function(){return this.inLexifiedContextStack[this.inLexifiedContextStack.length-1]},skipSpaces:function(){return this.pushFailuresInfo(),this.eval(s),this.popBinding(),this.popFailuresInfo(),this.inputStream.pos},skipSpacesIfInSyntacticContext:function(){return this.inSyntacticContext()?this.skipSpaces():this.inputStream.pos},maybeSkipSpacesBefore:function(u){return u instanceof a.Apply&&u.isSyntactic()?this.skipSpaces():u.allowsSkippingPrecedingSpace()&&u!==s?this.skipSpacesIfInSyntacticContext():this.inputStream.pos},pushBinding:function(u,t){this._bindings.push(u),this._bindingOffsets.push(this.posToOffset(t));},popBinding:function(){this._bindings.pop(),this._bindingOffsets.pop();},numBindings:function(){return this._bindings.length},truncateBindings:function(u){for(;this._bindings.length>u;)this.popBinding();},getCurrentPosInfo:function(){return this.getPosInfo(this.inputStream.pos)},getPosInfo:function(u){var t=this.memoTable[u];return t||(t=this.memoTable[u]=new i),t},processFailure:function(u,t){if(this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,u),this.recordedFailures&&u===this.positionToRecordFailures){var e=this.currentApplication();e&&(t=t.substituteParams(e.args)),this.recordFailure(t.toFailure(this.grammar),!1);}},recordFailure:function(u,t){var e=u.toKey();this.recordedFailures[e]?this.recordedFailures[e].isFluffy()&&!u.isFluffy()&&this.recordedFailures[e].clearFluffy():this.recordedFailures[e]=t?u.clone():u;},recordFailures:function(u,t){var e=this;Object.keys(u).forEach((function(r){e.recordFailure(u[r],t);}));},cloneRecordedFailures:function(){if(this.recordedFailures){var u=Object.create(null),t=this;return Object.keys(this.recordedFailures).forEach((function(e){u[e]=t.recordedFailures[e].clone();})),u}},getRightmostFailurePosition:function(){return this.rightmostFailurePosition},_getRightmostFailureOffset:function(){return this.rightmostFailurePosition>=0?this.posToOffset(this.rightmostFailurePosition):-1},getMemoizedTraceEntry:function(u,t){var e=this.memoTable[u];if(e&&t.ruleName){var r=e.memo[t.toMemoKey()];if(r&&r.traceEntry){var n=r.traceEntry.cloneWithExpr(t);return n.isMemoized=!0,n}}return null},getTraceEntry:function(u,t,e,r){if(t instanceof a.Apply){var n=this.currentApplication(),i=n?n.args:[];t=t.substituteParams(i);}return this.getMemoizedTraceEntry(u,t)||new o(this.input,u,this.inputStream.pos,t,e,r,this.trace)},isTracing:function(){return !!this.trace},hasNecessaryInfo:function(u){return !(this.trace&&!u.traceEntry)&&(!this.recordedFailures||this.inputStream.pos+u.rightmostFailureOffset!==this.positionToRecordFailures||!!u.failuresAtRightmostPosition)},useMemoizedResult:function(u,t){this.trace&&this.trace.push(t.traceEntry);var e=this.inputStream.pos+t.rightmostFailureOffset;return this.rightmostFailurePosition=Math.max(this.rightmostFailurePosition,e),this.recordedFailures&&this.positionToRecordFailures===e&&t.failuresAtRightmostPosition&&this.recordFailures(t.failuresAtRightmostPosition,!0),this.inputStream.examinedLength=Math.max(this.inputStream.examinedLength,t.examinedLength+u),!!t.value&&(this.inputStream.pos+=t.matchLength,this.pushBinding(t.value,u),!0)},eval:function(u){var t,e=this.inputStream,r=this._bindings.length;this.recordedFailures&&(t=this.recordedFailures,this.recordedFailures=Object.create(null));var n,i=e.pos,o=this.maybeSkipSpacesBefore(u);this.trace&&(n=this.trace,this.trace=[]);var a=u.eval(this);if(this.trace){var c=this._bindings.slice(r),l=this.getTraceEntry(o,u,a,c);l.isImplicitSpaces=u===s,l.isRootNode=u===this.startExpr,n.push(l),this.trace=n;}if(a){if(this.recordedFailures&&e.pos===this.positionToRecordFailures){var p=this;Object.keys(this.recordedFailures).forEach((function(u){p.recordedFailures[u].makeFluffy();}));}}else e.pos=i,this.truncateBindings(r);return this.recordedFailures&&this.recordFailures(t,!1),a},getMatchResult:function(){var u;if(this.eval(this.startExpr),this.recordedFailures){var t=this;u=Object.keys(this.recordedFailures).map((function(u){return t.recordedFailures[u]}));}return new n(this.matcher,this.input,this.startExpr,this._bindings[0],this._bindingOffsets[0],this.rightmostFailurePosition,u)},getTrace:function(){this.trace=[];var u=this.getMatchResult(),t=this.trace[this.trace.length-1];return t.result=u,t},pushFailuresInfo:function(){this._rightmostFailurePositionStack.push(this.rightmostFailurePosition),this._recordedFailuresStack.push(this.recordedFailures);},popFailuresInfo:function(){this.rightmostFailurePosition=this._rightmostFailurePositionStack.pop(),this.recordedFailures=this._recordedFailuresStack.pop();}},u.exports=c;},function(u,t,e){function r(){this.applicationMemoKeyStack=[],this.memo={},this.maxExaminedLength=0,this.maxRightmostFailureOffset=-1,this.currentLeftRecursion=void 0;}r.prototype={isActive:function(u){return this.applicationMemoKeyStack.indexOf(u.toMemoKey())>=0},enter:function(u){this.applicationMemoKeyStack.push(u.toMemoKey());},exit:function(){this.applicationMemoKeyStack.pop();},startLeftRecursion:function(u,t){t.isLeftRecursion=!0,t.headApplication=u,t.nextLeftRecursion=this.currentLeftRecursion,this.currentLeftRecursion=t;var e=this.applicationMemoKeyStack,r=e.indexOf(u.toMemoKey())+1,n=e.slice(r);t.isInvolved=function(u){return n.indexOf(u)>=0},t.updateInvolvedApplicationMemoKeys=function(){for(var u=r;u<e.length;u++){var t=e[u];this.isInvolved(t)||n.push(t);}};},endLeftRecursion:function(){this.currentLeftRecursion=this.currentLeftRecursion.nextLeftRecursion;},shouldUseMemoizedResult:function(u){if(!u.isLeftRecursion)return !0;for(var t=this.applicationMemoKeyStack,e=0;e<t.length;e++){var r=t[e];if(u.isInvolved(r))return !1}return !0},memoize:function(u,t){return this.memo[u]=t,this.maxExaminedLength=Math.max(this.maxExaminedLength,t.examinedLength),this.maxRightmostFailureOffset=Math.max(this.maxRightmostFailureOffset,t.rightmostFailureOffset),t},clearObsoleteEntries:function(u,t){if(!(u+this.maxExaminedLength<=t)){var e=this.memo;this.maxExaminedLength=0,this.maxRightmostFailureOffset=-1;var r=this;Object.keys(e).forEach((function(n){var i=e[n];u+i.examinedLength>t?delete e[n]:(r.maxExaminedLength=Math.max(r.maxExaminedLength,i.examinedLength),r.maxRightmostFailureOffset=Math.max(r.maxRightmostFailureOffset,i.rightmostFailureOffset));}));}}},u.exports=r;},function(u,t,e){var r,n,i,o=this&&this.__extends||(r=function(u,t){return (r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(u,t){u.__proto__=t;}||function(u,t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(u[e]=t[e]);})(u,t)},function(u,t){function e(){this.constructor=u;}r(u,t),u.prototype=null===t?Object.create(t):(e.prototype=t.prototype,new e);}),a=e(9),s=e(5).IterationNode,c=e(10),l=e(0),p=e(2),D=e(3),h=[];var A=function(){function u(u,t,e){this._node=u,this.source=t,this._baseInterval=e,u.isNonterminal()&&l.assert(t===e),this._childWrappers=[];}return u.prototype.toString=function(){return "[semantics wrapper for "+this._node.grammar.name+"]"},u.prototype.toJSON=function(){return this.toString()},u.prototype._forgetMemoizedResultFor=function(u){delete this._node[this._semantics.attributeKeys[u]],this.children.forEach((function(t){t._forgetMemoizedResultFor(u);}));},u.prototype.child=function(u){if(0<=u&&u<this._node.numChildren()){var t=this._childWrappers[u];if(!t){var e=this._node.childAt(u),r=this._node.childOffsets[u],n=this._baseInterval.subInterval(r,e.matchLength),i=e.isNonterminal()?n:this._baseInterval;t=this._childWrappers[u]=this._semantics.wrap(e,n,i);}return t}},u.prototype._children=function(){for(var u=0;u<this._node.numChildren();u++)this.child(u);return this._childWrappers},u.prototype.isIteration=function(){return this._node.isIteration()},u.prototype.isTerminal=function(){return this._node.isTerminal()},u.prototype.isNonterminal=function(){return this._node.isNonterminal()},u.prototype.isSyntactic=function(){return this.isNonterminal()&&this._node.isSyntactic()},u.prototype.isLexical=function(){return this.isNonterminal()&&this._node.isLexical()},u.prototype.isOptional=function(){return this._node.isOptional()},u.prototype.iteration=function(u){var t=u||[],e=t.map((function(u){return u._node})),r=new s(this._node.grammar,e,[],-1,!1),n=this._semantics.wrap(r,null,null);return n._childWrappers=t,n},Object.defineProperty(u.prototype,"children",{get:function(){return this._children()},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"ctorName",{get:function(){return this._node.ctorName},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"interval",{get:function(){throw new Error("The `interval` property is deprecated -- use `source` instead")},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"numChildren",{get:function(){return this._node.numChildren()},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"primitiveValue",{get:function(){if(this.isTerminal())return this._node.primitiveValue;throw new TypeError("tried to access the 'primitiveValue' attribute of a non-terminal CST node")},enumerable:!1,configurable:!0}),Object.defineProperty(u.prototype,"sourceString",{get:function(){return this.source.contents},enumerable:!1,configurable:!0}),u}();function f(u,t){var e=this;if(this.grammar=u,this.checkedActionDicts=!1,this.Wrapper=function(u){function t(t,r,n){var i=u.call(this,t,r,n)||this;return e.checkActionDictsIfHaventAlready(),i._semantics=e,i}return o(t,u),t}(t?t.Wrapper:A),this.super=t,t){if(!u.equals(this.super.grammar)&&!u._inheritsFrom(this.super.grammar))throw new Error("Cannot extend a semantics for grammar '"+this.super.grammar.name+"' for use with grammar '"+u.name+"' (not a sub-grammar)");for(var r in this.operations=Object.create(this.super.operations),this.attributes=Object.create(this.super.attributes),this.attributeKeys=Object.create(null),this.attributes)Object.defineProperty(this.attributeKeys,r,{value:D.uniqueId(r)});}else this.operations=Object.create(null),this.attributes=Object.create(null),this.attributeKeys=Object.create(null);}function m(u,t){if(!n)return l.assert(-1===u.indexOf("(")),{name:u,formals:[]};var e=n.match(u,"operation"===t?"OperationSignature":"AttributeSignature");if(e.failed())throw new Error(e.message);return i(e).parse()}f.prototype.toString=function(){return "[semantics for "+this.grammar.name+"]"},f.prototype.checkActionDictsIfHaventAlready=function(){this.checkedActionDicts||(this.checkActionDicts(),this.checkedActionDicts=!0);},f.prototype.checkActionDicts=function(){var u;for(u in this.operations)this.operations[u].checkActionDict(this.grammar);for(u in this.attributes)this.attributes[u].checkActionDict(this.grammar);},f.prototype.toRecipe=function(u){var t=this;function e(u){return u.super!==f.BuiltInSemantics._getSemantics()}var r="(function(g) {\n";if(e(this)){r+="  var semantics = "+this.super.toRecipe(!0)+"(g";for(var n=this.super.grammar,i=this.grammar;i!==n;)r+=".superGrammar",i=i.superGrammar;r+=");\n",r+="  return g.extendSemantics(semantics)";}else r+="  return g.createSemantics()";return ["Operation","Attribute"].forEach((function(u){var n=t[u.toLowerCase()+"s"];Object.keys(n).forEach((function(i){var o,a=n[i],s=a.actionDict,c=a.formals,l=a.builtInDefault,p=i;c.length>0&&(p+="("+c.join(", ")+")"),o=e(t)&&t.super[u.toLowerCase()+"s"][i]?"extend"+u:"add"+u,r+="\n    ."+o+"("+JSON.stringify(p)+", {";var D=[];Object.keys(s).forEach((function(u){if(s[u]!==l){var t=s[u].toString().trim();t=t.replace(/^.*\(/,"function("),D.push("\n      "+JSON.stringify(u)+": "+t);}})),r+=D.join(",")+"\n    })";}));})),r+=";\n  })",u||(r="(function() {\n  var grammar = this.fromRecipe("+function(u){return u.replace(/[\u2028\u2029]/g,(function(u,t,e){var r=u.codePointAt(0).toString(16);return "\\u"+"0000".slice(r.length)+r}))}(this.grammar.toRecipe())+");\n  var semantics = "+r+"(grammar);\n  return semantics;\n});\n"),r},f.prototype.addOperationOrAttribute=function(u,t,e){var r=u+"s",n=m(t,u),i=n.name,o=n.formals;this.assertNewName(i,u);var a=function(u,t,e){return function(r){var n=this,i=(this._semantics.operations[t]||this._semantics.attributes[t]).formals.map((function(u){return n.args[u]}));if(this.isIteration())return r.map((function(u){return e.apply(u,i)}));if(1===r.length)return e.apply(r[0],i);throw p.missingSemanticAction(this.ctorName,t,u,h)}}(u,i,l),s={_default:a};Object.keys(e).forEach((function(u){s[u]=e[u];}));var c="operation"===u?new E(i,o,s,a):new C(i,s,a);function l(){var t=this._semantics[r][i];if(arguments.length!==t.formals.length)throw new Error("Invalid number of arguments passed to "+i+" "+u+" (expected "+t.formals.length+", got "+arguments.length+")");for(var e=Object.create(null),n=0;n<arguments.length;n++){var o=t.formals[n];e[o]=arguments[n];}var a=this.args;this.args=e;var s=t.execute(this._semantics,this);return this.args=a,s}c.checkActionDict(this.grammar),this[r][i]=c,"operation"===u?(this.Wrapper.prototype[i]=l,this.Wrapper.prototype[i].toString=function(){return "["+i+" operation]"}):(Object.defineProperty(this.Wrapper.prototype,i,{get:l,configurable:!0}),Object.defineProperty(this.attributeKeys,i,{value:D.uniqueId(i)}));},f.prototype.extendOperationOrAttribute=function(u,t,e){var r=u+"s";if(m(t,"attribute"),!this.super||!(t in this.super[r]))throw new Error("Cannot extend "+u+" '"+t+"': did not inherit an "+u+" with that name");if(Object.prototype.hasOwnProperty.call(this[r],t))throw new Error("Cannot extend "+u+" '"+t+"' again");var n=this[r][t].formals,i=this[r][t].actionDict,o=Object.create(i);Object.keys(e).forEach((function(u){o[u]=e[u];})),this[r][t]="operation"===u?new E(t,n,o):new C(t,o),this[r][t].checkActionDict(this.grammar);},f.prototype.assertNewName=function(u,t){if(A.prototype.hasOwnProperty(u))throw new Error("Cannot add "+t+" '"+u+"': that's a reserved name");if(u in this.operations)throw new Error("Cannot add "+t+" '"+u+"': an operation with that name already exists");if(u in this.attributes)throw new Error("Cannot add "+t+" '"+u+"': an attribute with that name already exists")},f.prototype.wrap=function(u,t,e){var r=e||t;return u instanceof this.Wrapper?u:new this.Wrapper(u,t,r)},f.createSemantics=function(u,t){var e=new f(u,void 0!==t?t:f.BuiltInSemantics._getSemantics()),r=function(t){if(!(t instanceof c))throw new TypeError("Semantics expected a MatchResult, but got "+l.unexpectedObjToString(t));if(t.failed())throw new TypeError("cannot apply Semantics to "+t.toString());var r=t._cst;if(r.grammar!==u)throw new Error("Cannot use a MatchResult from grammar '"+r.grammar.name+"' with a semantics for '"+u.name+"'");var n=new a(t.input);return e.wrap(r,n.interval(t._cstOffset,t.input.length))};return r.addOperation=function(u,t){return e.addOperationOrAttribute("operation",u,t),r},r.extendOperation=function(u,t){return e.extendOperationOrAttribute("operation",u,t),r},r.addAttribute=function(u,t){return e.addOperationOrAttribute("attribute",u,t),r},r.extendAttribute=function(u,t){return e.extendOperationOrAttribute("attribute",u,t),r},r._getActionDict=function(t){var r=e.operations[t]||e.attributes[t];if(!r)throw new Error('"'+t+'" is not a valid operation or attribute name in this semantics for "'+u.name+'"');return r.actionDict},r._remove=function(u){var t;return u in e.operations?(t=e.operations[u],delete e.operations[u]):u in e.attributes&&(t=e.attributes[u],delete e.attributes[u]),delete e.Wrapper.prototype[u],t},r.getOperationNames=function(){return Object.keys(e.operations)},r.getAttributeNames=function(){return Object.keys(e.attributes)},r.getGrammar=function(){return e.grammar},r.toRecipe=function(u){return e.toRecipe(u)},r.toString=e.toString.bind(e),r._getSemantics=function(){return e},r};var E=function(){function u(u,t,e,r){this.name=u,this.formals=t,this.actionDict=e,this.builtInDefault=r;}return u.prototype.checkActionDict=function(u){u._checkTopDownActionDict(this.typeName,this.name,this.actionDict);},u.prototype.execute=function(u,t){try{var e=t._node.ctorName,r=this.actionDict[e];return r?(h.push([this,e]),this.doAction(u,t,r,t.isIteration())):t.isNonterminal()&&(r=this.actionDict._nonterminal)?(h.push([this,"_nonterminal",e]),this.doAction(u,t,r,!0)):(h.push([this,"default action",e]),this.doAction(u,t,this.actionDict._default,!0))}finally{h.pop();}},u.prototype.doAction=function(u,t,e,r){return r?e.call(t,t._children()):e.apply(t,t._children())},u}();E.prototype.typeName="operation";var C=function(u){function t(t,e,r){return u.call(this,t,[],e,r)||this}return o(t,u),t.prototype.execute=function(u,t){var e=t._node,r=u.attributeKeys[this.name];return e.hasOwnProperty(r)||(e[r]=E.prototype.execute.call(this,u,t)),e[r]},t}(E);C.prototype.typeName="attribute",D.awaitBuiltInRules((function(u){var t,r=e(39);!function(u){var t={empty:function(){return this.iteration()},nonEmpty:function(u,t,e){return this.iteration([u].concat(e.children))}};f.BuiltInSemantics=f.createSemantics(u,null).addOperation("asIteration",{emptyListOf:t.empty,nonemptyListOf:t.nonEmpty,EmptyListOf:t.empty,NonemptyListOf:t.nonEmpty});}(u),i=(t=r).createSemantics().addOperation("parse",{AttributeSignature:function(u){return {name:u.parse(),formals:[]}},OperationSignature:function(u,t){return {name:u.parse(),formals:t.parse()[0]||[]}},Formals:function(u,t,e){return t.asIteration().parse()},name:function(u,t){return this.sourceString}}),n=t;})),u.exports=f;},function(u,t,e){var r=e(4);u.exports=r.makeRecipe(["grammar",{source:'OperationsAndAttributes {\n\n  AttributeSignature =\n    name\n\n  OperationSignature =\n    name Formals?\n\n  Formals\n    = "(" ListOf<name, ","> ")"\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = "_"\n    | letter\n\n  nameRest\n    = "_"\n    | alnum\n\n}'},"OperationsAndAttributes",null,"AttributeSignature",{AttributeSignature:["define",{sourceInterval:[29,58]},null,[],["app",{sourceInterval:[54,58]},"name",[]]],OperationSignature:["define",{sourceInterval:[62,100]},null,[],["seq",{sourceInterval:[87,100]},["app",{sourceInterval:[87,91]},"name",[]],["opt",{sourceInterval:[92,100]},["app",{sourceInterval:[92,99]},"Formals",[]]]]],Formals:["define",{sourceInterval:[104,143]},null,[],["seq",{sourceInterval:[118,143]},["terminal",{sourceInterval:[118,121]},"("],["app",{sourceInterval:[122,139]},"ListOf",[["app",{sourceInterval:[129,133]},"name",[]],["terminal",{sourceInterval:[135,138]},","]]],["terminal",{sourceInterval:[140,143]},")"]]],name:["define",{sourceInterval:[147,187]},"a name",[],["seq",{sourceInterval:[168,187]},["app",{sourceInterval:[168,177]},"nameFirst",[]],["star",{sourceInterval:[178,187]},["app",{sourceInterval:[178,186]},"nameRest",[]]]]],nameFirst:["define",{sourceInterval:[191,223]},null,[],["alt",{sourceInterval:[207,223]},["terminal",{sourceInterval:[207,210]},"_"],["app",{sourceInterval:[217,223]},"letter",[]]]],nameRest:["define",{sourceInterval:[227,257]},null,[],["alt",{sourceInterval:[242,257]},["terminal",{sourceInterval:[242,245]},"_"],["app",{sourceInterval:[252,257]},"alnum",[]]]]}]);},function(u,t,e){u.exports="15.4.1";},function(u,t){
	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */
	u.exports=function(u){return null!=u&&null!=u.constructor&&"function"==typeof u.constructor.isBuffer&&u.constructor.isBuffer(u)};},function(u,t,e){u.exports={VisitorFamily:e(43),semanticsForToAST:e(14).semantics,toAST:e(14).helper};},function(u,t,e){var r=e(0).assert;function n(u,t,e){return e(t[u])}function i(u,t,e){return t[u].map(e)}function o(u){var t=u.split(/ ?\[\]/);return 2===t.length?i.bind(null,t[0]):n.bind(null,u)}function a(u,t,e){return u.map((function(u){return u(t,e)}))}function s(u){return /^[a-zA-Z_][0-9a-zA-Z_]*$/.test(u)}function c(u){return u.trim()}function l(u){this._shapes=u.shapes,this._getTag=u.getTag,this.Adapter=function(u,t){this._adaptee=u,this._family=t;},this.Adapter.prototype.valueOf=function(){throw new Error("heeey!")},this.operations={},this._arities=Object.create(null),this._getChildren=Object.create(null);var t=this;Object.keys(this._shapes).forEach((function(u){var e=t._shapes[u];t._getChildren[u]=function(u){return "string"==typeof u?a.bind(null,[o(u)]):Array.isArray(u)?a.bind(null,u.map(o)):(r("function"==typeof u,"Expected a string, Array, or function"),r(2===u.length,"Expected a function of arity 2, got "+u.length),u)}(e),"function"!=typeof e&&(t._arities[u]=Array.isArray(e)?e.length:1);})),this._wrap=function(u){return new t.Adapter(u,t)};}l.prototype.wrap=function(u){return this._wrap(u)},l.prototype._checkActionDict=function(u){var t=this;Object.keys(u).forEach((function(e){r(e in t._getChildren,"Unrecognized action name '"+e+"'");var n=u[e];if(r("function"==typeof n,"Key '"+e+"': expected function, got "+n),e in t._arities){var i=t._arities[e],o=u[e].length;r(o===i,"Action '"+e+"' has the wrong arity: expected "+i+", got "+o);}}));},l.prototype.addOperation=function(u,t){var e=function(u){var t=u.split(/[()]/).map(c);if(3===t.length&&""===t[2]){var e=t[0],r=[];if(t[1].length>0&&(r=t[1].split(",").map(c)),s(e)&&r.every(s))return {name:e,formals:r}}throw new Error("Invalid operation signature: "+u)}(u),n=e.name;this._checkActionDict(t),this.operations[n]={name:n,formals:e.formals,actions:t};var i=this;return this.Adapter.prototype[n]=function(){var u=i._getTag(this._adaptee);r(u in i._getChildren,"getTag returned unrecognized tag '"+u+"'"),r(u in t,"No action for '"+u+"' in operation '"+n+"'");for(var o=Object.create(null),a=0;a<arguments.length;a++)o[e.formals[a]]=arguments[a];var s=this.args;this.args=o;var c=t[u].apply(this,i._getChildren[u](this._adaptee,i._wrap));return this.args=s,c},this},u.exports=l;},function(u,t,e){var r=e(4);u.exports=r.makeRecipe(["grammar",{source:'BuiltInRules {\n\n  alnum  (an alpha-numeric character)\n    = letter\n    | digit\n\n  letter  (a letter)\n    = lower\n    | upper\n    | unicodeLtmo\n\n  digit  (a digit)\n    = "0".."9"\n\n  hexDigit  (a hexadecimal digit)\n    = digit\n    | "a".."f"\n    | "A".."F"\n\n  ListOf<elem, sep>\n    = NonemptyListOf<elem, sep>\n    | EmptyListOf<elem, sep>\n\n  NonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  EmptyListOf<elem, sep>\n    = /* nothing */\n\n  listOf<elem, sep>\n    = nonemptyListOf<elem, sep>\n    | emptyListOf<elem, sep>\n\n  nonemptyListOf<elem, sep>\n    = elem (sep elem)*\n\n  emptyListOf<elem, sep>\n    = /* nothing */\n\n}'},"BuiltInRules",null,null,{alnum:["define",{sourceInterval:[18,78]},"an alpha-numeric character",[],["alt",{sourceInterval:[60,78]},["app",{sourceInterval:[60,66]},"letter",[]],["app",{sourceInterval:[73,78]},"digit",[]]]],letter:["define",{sourceInterval:[82,142]},"a letter",[],["alt",{sourceInterval:[107,142]},["app",{sourceInterval:[107,112]},"lower",[]],["app",{sourceInterval:[119,124]},"upper",[]],["app",{sourceInterval:[131,142]},"unicodeLtmo",[]]]],digit:["define",{sourceInterval:[146,177]},"a digit",[],["range",{sourceInterval:[169,177]},"0","9"]],hexDigit:["define",{sourceInterval:[181,254]},"a hexadecimal digit",[],["alt",{sourceInterval:[219,254]},["app",{sourceInterval:[219,224]},"digit",[]],["range",{sourceInterval:[231,239]},"a","f"],["range",{sourceInterval:[246,254]},"A","F"]]],ListOf:["define",{sourceInterval:[258,336]},null,["elem","sep"],["alt",{sourceInterval:[282,336]},["app",{sourceInterval:[282,307]},"NonemptyListOf",[["param",{sourceInterval:[297,301]},0],["param",{sourceInterval:[303,306]},1]]],["app",{sourceInterval:[314,336]},"EmptyListOf",[["param",{sourceInterval:[326,330]},0],["param",{sourceInterval:[332,335]},1]]]]],NonemptyListOf:["define",{sourceInterval:[340,388]},null,["elem","sep"],["seq",{sourceInterval:[372,388]},["param",{sourceInterval:[372,376]},0],["star",{sourceInterval:[377,388]},["seq",{sourceInterval:[378,386]},["param",{sourceInterval:[378,381]},1],["param",{sourceInterval:[382,386]},0]]]]],EmptyListOf:["define",{sourceInterval:[392,434]},null,["elem","sep"],["seq",{sourceInterval:[438,438]}]],listOf:["define",{sourceInterval:[438,516]},null,["elem","sep"],["alt",{sourceInterval:[462,516]},["app",{sourceInterval:[462,487]},"nonemptyListOf",[["param",{sourceInterval:[477,481]},0],["param",{sourceInterval:[483,486]},1]]],["app",{sourceInterval:[494,516]},"emptyListOf",[["param",{sourceInterval:[506,510]},0],["param",{sourceInterval:[512,515]},1]]]]],nonemptyListOf:["define",{sourceInterval:[520,568]},null,["elem","sep"],["seq",{sourceInterval:[552,568]},["param",{sourceInterval:[552,556]},0],["star",{sourceInterval:[557,568]},["seq",{sourceInterval:[558,566]},["param",{sourceInterval:[558,561]},1],["param",{sourceInterval:[562,566]},0]]]]],emptyListOf:["define",{sourceInterval:[572,614]},null,["elem","sep"],["seq",{sourceInterval:[616,616]}]]}]);},function(u,t,e){var r=e(4);u.exports=r.makeRecipe(["grammar",{source:'Ohm {\n\n  Grammars\n    = Grammar*\n\n  Grammar\n    = ident SuperGrammar? "{" Rule* "}"\n\n  SuperGrammar\n    = "<:" ident\n\n  Rule\n    = ident Formals? ruleDescr? "="  RuleBody  -- define\n    | ident Formals?            ":=" OverrideRuleBody  -- override\n    | ident Formals?            "+=" RuleBody  -- extend\n\n  RuleBody\n    = "|"? NonemptyListOf<TopLevelTerm, "|">\n\n  TopLevelTerm\n    = Seq caseName  -- inline\n    | Seq\n\n  OverrideRuleBody\n    = "|"? NonemptyListOf<OverrideTopLevelTerm, "|">\n\n  OverrideTopLevelTerm\n    = "..."  -- superSplice\n    | TopLevelTerm\n\n  Formals\n    = "<" ListOf<ident, ","> ">"\n\n  Params\n    = "<" ListOf<Seq, ","> ">"\n\n  Alt\n    = NonemptyListOf<Seq, "|">\n\n  Seq\n    = Iter*\n\n  Iter\n    = Pred "*"  -- star\n    | Pred "+"  -- plus\n    | Pred "?"  -- opt\n    | Pred\n\n  Pred\n    = "~" Lex  -- not\n    | "&" Lex  -- lookahead\n    | Lex\n\n  Lex\n    = "#" Base  -- lex\n    | Base\n\n  Base\n    = ident Params? ~(ruleDescr? "=" | ":=" | "+=")  -- application\n    | oneCharTerminal ".." oneCharTerminal           -- range\n    | terminal                                       -- terminal\n    | "(" Alt ")"                                    -- paren\n\n  ruleDescr  (a rule description)\n    = "(" ruleDescrText ")"\n\n  ruleDescrText\n    = (~")" any)*\n\n  caseName\n    = "--" (~"\\n" space)* name (~"\\n" space)* ("\\n" | &"}")\n\n  name  (a name)\n    = nameFirst nameRest*\n\n  nameFirst\n    = "_"\n    | letter\n\n  nameRest\n    = "_"\n    | alnum\n\n  ident  (an identifier)\n    = name\n\n  terminal\n    = "\\"" terminalChar* "\\""\n\n  oneCharTerminal\n    = "\\"" terminalChar "\\""\n\n  terminalChar\n    = escapeChar\n    | ~"\\\\" ~"\\"" ~"\\n" any\n\n  escapeChar  (an escape sequence)\n    = "\\\\\\\\"                                     -- backslash\n    | "\\\\\\""                                     -- doubleQuote\n    | "\\\\\\\'"                                     -- singleQuote\n    | "\\\\b"                                      -- backspace\n    | "\\\\n"                                      -- lineFeed\n    | "\\\\r"                                      -- carriageReturn\n    | "\\\\t"                                      -- tab\n    | "\\\\u" hexDigit hexDigit hexDigit hexDigit  -- unicodeEscape\n    | "\\\\x" hexDigit hexDigit                    -- hexEscape\n\n  space\n   += comment\n\n  comment\n    = "//" (~"\\n" any)* &("\\n" | end)  -- singleLine\n    | "/*" (~"*/" any)* "*/"  -- multiLine\n\n  tokens = token*\n\n  token = caseName | comment | ident | operator | punctuation | terminal | any\n\n  operator = "<:" | "=" | ":=" | "+=" | "*" | "+" | "?" | "~" | "&"\n\n  punctuation = "<" | ">" | "," | "--"\n}'},"Ohm",null,"Grammars",{Grammars:["define",{sourceInterval:[9,32]},null,[],["star",{sourceInterval:[24,32]},["app",{sourceInterval:[24,31]},"Grammar",[]]]],Grammar:["define",{sourceInterval:[36,83]},null,[],["seq",{sourceInterval:[50,83]},["app",{sourceInterval:[50,55]},"ident",[]],["opt",{sourceInterval:[56,69]},["app",{sourceInterval:[56,68]},"SuperGrammar",[]]],["terminal",{sourceInterval:[70,73]},"{"],["star",{sourceInterval:[74,79]},["app",{sourceInterval:[74,78]},"Rule",[]]],["terminal",{sourceInterval:[80,83]},"}"]]],SuperGrammar:["define",{sourceInterval:[87,116]},null,[],["seq",{sourceInterval:[106,116]},["terminal",{sourceInterval:[106,110]},"<:"],["app",{sourceInterval:[111,116]},"ident",[]]]],Rule_define:["define",{sourceInterval:[131,181]},null,[],["seq",{sourceInterval:[131,170]},["app",{sourceInterval:[131,136]},"ident",[]],["opt",{sourceInterval:[137,145]},["app",{sourceInterval:[137,144]},"Formals",[]]],["opt",{sourceInterval:[146,156]},["app",{sourceInterval:[146,155]},"ruleDescr",[]]],["terminal",{sourceInterval:[157,160]},"="],["app",{sourceInterval:[162,170]},"RuleBody",[]]]],Rule_override:["define",{sourceInterval:[188,248]},null,[],["seq",{sourceInterval:[188,235]},["app",{sourceInterval:[188,193]},"ident",[]],["opt",{sourceInterval:[194,202]},["app",{sourceInterval:[194,201]},"Formals",[]]],["terminal",{sourceInterval:[214,218]},":="],["app",{sourceInterval:[219,235]},"OverrideRuleBody",[]]]],Rule_extend:["define",{sourceInterval:[255,305]},null,[],["seq",{sourceInterval:[255,294]},["app",{sourceInterval:[255,260]},"ident",[]],["opt",{sourceInterval:[261,269]},["app",{sourceInterval:[261,268]},"Formals",[]]],["terminal",{sourceInterval:[281,285]},"+="],["app",{sourceInterval:[286,294]},"RuleBody",[]]]],Rule:["define",{sourceInterval:[120,305]},null,[],["alt",{sourceInterval:[131,305]},["app",{sourceInterval:[131,170]},"Rule_define",[]],["app",{sourceInterval:[188,235]},"Rule_override",[]],["app",{sourceInterval:[255,294]},"Rule_extend",[]]]],RuleBody:["define",{sourceInterval:[309,362]},null,[],["seq",{sourceInterval:[324,362]},["opt",{sourceInterval:[324,328]},["terminal",{sourceInterval:[324,327]},"|"]],["app",{sourceInterval:[329,362]},"NonemptyListOf",[["app",{sourceInterval:[344,356]},"TopLevelTerm",[]],["terminal",{sourceInterval:[358,361]},"|"]]]]],TopLevelTerm_inline:["define",{sourceInterval:[385,408]},null,[],["seq",{sourceInterval:[385,397]},["app",{sourceInterval:[385,388]},"Seq",[]],["app",{sourceInterval:[389,397]},"caseName",[]]]],TopLevelTerm:["define",{sourceInterval:[366,418]},null,[],["alt",{sourceInterval:[385,418]},["app",{sourceInterval:[385,397]},"TopLevelTerm_inline",[]],["app",{sourceInterval:[415,418]},"Seq",[]]]],OverrideRuleBody:["define",{sourceInterval:[422,491]},null,[],["seq",{sourceInterval:[445,491]},["opt",{sourceInterval:[445,449]},["terminal",{sourceInterval:[445,448]},"|"]],["app",{sourceInterval:[450,491]},"NonemptyListOf",[["app",{sourceInterval:[465,485]},"OverrideTopLevelTerm",[]],["terminal",{sourceInterval:[487,490]},"|"]]]]],OverrideTopLevelTerm_superSplice:["define",{sourceInterval:[522,543]},null,[],["terminal",{sourceInterval:[522,527]},"..."]],OverrideTopLevelTerm:["define",{sourceInterval:[495,562]},null,[],["alt",{sourceInterval:[522,562]},["app",{sourceInterval:[522,527]},"OverrideTopLevelTerm_superSplice",[]],["app",{sourceInterval:[550,562]},"TopLevelTerm",[]]]],Formals:["define",{sourceInterval:[566,606]},null,[],["seq",{sourceInterval:[580,606]},["terminal",{sourceInterval:[580,583]},"<"],["app",{sourceInterval:[584,602]},"ListOf",[["app",{sourceInterval:[591,596]},"ident",[]],["terminal",{sourceInterval:[598,601]},","]]],["terminal",{sourceInterval:[603,606]},">"]]],Params:["define",{sourceInterval:[610,647]},null,[],["seq",{sourceInterval:[623,647]},["terminal",{sourceInterval:[623,626]},"<"],["app",{sourceInterval:[627,643]},"ListOf",[["app",{sourceInterval:[634,637]},"Seq",[]],["terminal",{sourceInterval:[639,642]},","]]],["terminal",{sourceInterval:[644,647]},">"]]],Alt:["define",{sourceInterval:[651,685]},null,[],["app",{sourceInterval:[661,685]},"NonemptyListOf",[["app",{sourceInterval:[676,679]},"Seq",[]],["terminal",{sourceInterval:[681,684]},"|"]]]],Seq:["define",{sourceInterval:[689,704]},null,[],["star",{sourceInterval:[699,704]},["app",{sourceInterval:[699,703]},"Iter",[]]]],Iter_star:["define",{sourceInterval:[719,736]},null,[],["seq",{sourceInterval:[719,727]},["app",{sourceInterval:[719,723]},"Pred",[]],["terminal",{sourceInterval:[724,727]},"*"]]],Iter_plus:["define",{sourceInterval:[743,760]},null,[],["seq",{sourceInterval:[743,751]},["app",{sourceInterval:[743,747]},"Pred",[]],["terminal",{sourceInterval:[748,751]},"+"]]],Iter_opt:["define",{sourceInterval:[767,783]},null,[],["seq",{sourceInterval:[767,775]},["app",{sourceInterval:[767,771]},"Pred",[]],["terminal",{sourceInterval:[772,775]},"?"]]],Iter:["define",{sourceInterval:[708,794]},null,[],["alt",{sourceInterval:[719,794]},["app",{sourceInterval:[719,727]},"Iter_star",[]],["app",{sourceInterval:[743,751]},"Iter_plus",[]],["app",{sourceInterval:[767,775]},"Iter_opt",[]],["app",{sourceInterval:[790,794]},"Pred",[]]]],Pred_not:["define",{sourceInterval:[809,824]},null,[],["seq",{sourceInterval:[809,816]},["terminal",{sourceInterval:[809,812]},"~"],["app",{sourceInterval:[813,816]},"Lex",[]]]],Pred_lookahead:["define",{sourceInterval:[831,852]},null,[],["seq",{sourceInterval:[831,838]},["terminal",{sourceInterval:[831,834]},"&"],["app",{sourceInterval:[835,838]},"Lex",[]]]],Pred:["define",{sourceInterval:[798,862]},null,[],["alt",{sourceInterval:[809,862]},["app",{sourceInterval:[809,816]},"Pred_not",[]],["app",{sourceInterval:[831,838]},"Pred_lookahead",[]],["app",{sourceInterval:[859,862]},"Lex",[]]]],Lex_lex:["define",{sourceInterval:[876,892]},null,[],["seq",{sourceInterval:[876,884]},["terminal",{sourceInterval:[876,879]},"#"],["app",{sourceInterval:[880,884]},"Base",[]]]],Lex:["define",{sourceInterval:[866,903]},null,[],["alt",{sourceInterval:[876,903]},["app",{sourceInterval:[876,884]},"Lex_lex",[]],["app",{sourceInterval:[899,903]},"Base",[]]]],Base_application:["define",{sourceInterval:[918,979]},null,[],["seq",{sourceInterval:[918,963]},["app",{sourceInterval:[918,923]},"ident",[]],["opt",{sourceInterval:[924,931]},["app",{sourceInterval:[924,930]},"Params",[]]],["not",{sourceInterval:[932,963]},["alt",{sourceInterval:[934,962]},["seq",{sourceInterval:[934,948]},["opt",{sourceInterval:[934,944]},["app",{sourceInterval:[934,943]},"ruleDescr",[]]],["terminal",{sourceInterval:[945,948]},"="]],["terminal",{sourceInterval:[951,955]},":="],["terminal",{sourceInterval:[958,962]},"+="]]]]],Base_range:["define",{sourceInterval:[986,1041]},null,[],["seq",{sourceInterval:[986,1022]},["app",{sourceInterval:[986,1001]},"oneCharTerminal",[]],["terminal",{sourceInterval:[1002,1006]},".."],["app",{sourceInterval:[1007,1022]},"oneCharTerminal",[]]]],Base_terminal:["define",{sourceInterval:[1048,1106]},null,[],["app",{sourceInterval:[1048,1056]},"terminal",[]]],Base_paren:["define",{sourceInterval:[1113,1168]},null,[],["seq",{sourceInterval:[1113,1124]},["terminal",{sourceInterval:[1113,1116]},"("],["app",{sourceInterval:[1117,1120]},"Alt",[]],["terminal",{sourceInterval:[1121,1124]},")"]]],Base:["define",{sourceInterval:[907,1168]},null,[],["alt",{sourceInterval:[918,1168]},["app",{sourceInterval:[918,963]},"Base_application",[]],["app",{sourceInterval:[986,1022]},"Base_range",[]],["app",{sourceInterval:[1048,1056]},"Base_terminal",[]],["app",{sourceInterval:[1113,1124]},"Base_paren",[]]]],ruleDescr:["define",{sourceInterval:[1172,1231]},"a rule description",[],["seq",{sourceInterval:[1210,1231]},["terminal",{sourceInterval:[1210,1213]},"("],["app",{sourceInterval:[1214,1227]},"ruleDescrText",[]],["terminal",{sourceInterval:[1228,1231]},")"]]],ruleDescrText:["define",{sourceInterval:[1235,1266]},null,[],["star",{sourceInterval:[1255,1266]},["seq",{sourceInterval:[1256,1264]},["not",{sourceInterval:[1256,1260]},["terminal",{sourceInterval:[1257,1260]},")"]],["app",{sourceInterval:[1261,1264]},"any",[]]]]],caseName:["define",{sourceInterval:[1270,1338]},null,[],["seq",{sourceInterval:[1285,1338]},["terminal",{sourceInterval:[1285,1289]},"--"],["star",{sourceInterval:[1290,1304]},["seq",{sourceInterval:[1291,1302]},["not",{sourceInterval:[1291,1296]},["terminal",{sourceInterval:[1292,1296]},"\n"]],["app",{sourceInterval:[1297,1302]},"space",[]]]],["app",{sourceInterval:[1305,1309]},"name",[]],["star",{sourceInterval:[1310,1324]},["seq",{sourceInterval:[1311,1322]},["not",{sourceInterval:[1311,1316]},["terminal",{sourceInterval:[1312,1316]},"\n"]],["app",{sourceInterval:[1317,1322]},"space",[]]]],["alt",{sourceInterval:[1326,1337]},["terminal",{sourceInterval:[1326,1330]},"\n"],["lookahead",{sourceInterval:[1333,1337]},["terminal",{sourceInterval:[1334,1337]},"}"]]]]],name:["define",{sourceInterval:[1342,1382]},"a name",[],["seq",{sourceInterval:[1363,1382]},["app",{sourceInterval:[1363,1372]},"nameFirst",[]],["star",{sourceInterval:[1373,1382]},["app",{sourceInterval:[1373,1381]},"nameRest",[]]]]],nameFirst:["define",{sourceInterval:[1386,1418]},null,[],["alt",{sourceInterval:[1402,1418]},["terminal",{sourceInterval:[1402,1405]},"_"],["app",{sourceInterval:[1412,1418]},"letter",[]]]],nameRest:["define",{sourceInterval:[1422,1452]},null,[],["alt",{sourceInterval:[1437,1452]},["terminal",{sourceInterval:[1437,1440]},"_"],["app",{sourceInterval:[1447,1452]},"alnum",[]]]],ident:["define",{sourceInterval:[1456,1489]},"an identifier",[],["app",{sourceInterval:[1485,1489]},"name",[]]],terminal:["define",{sourceInterval:[1493,1531]},null,[],["seq",{sourceInterval:[1508,1531]},["terminal",{sourceInterval:[1508,1512]},'"'],["star",{sourceInterval:[1513,1526]},["app",{sourceInterval:[1513,1525]},"terminalChar",[]]],["terminal",{sourceInterval:[1527,1531]},'"']]],oneCharTerminal:["define",{sourceInterval:[1535,1579]},null,[],["seq",{sourceInterval:[1557,1579]},["terminal",{sourceInterval:[1557,1561]},'"'],["app",{sourceInterval:[1562,1574]},"terminalChar",[]],["terminal",{sourceInterval:[1575,1579]},'"']]],terminalChar:["define",{sourceInterval:[1583,1640]},null,[],["alt",{sourceInterval:[1602,1640]},["app",{sourceInterval:[1602,1612]},"escapeChar",[]],["seq",{sourceInterval:[1619,1640]},["not",{sourceInterval:[1619,1624]},["terminal",{sourceInterval:[1620,1624]},"\\"]],["not",{sourceInterval:[1625,1630]},["terminal",{sourceInterval:[1626,1630]},'"']],["not",{sourceInterval:[1631,1636]},["terminal",{sourceInterval:[1632,1636]},"\n"]],["app",{sourceInterval:[1637,1640]},"any",[]]]]],escapeChar_backslash:["define",{sourceInterval:[1683,1738]},null,[],["terminal",{sourceInterval:[1683,1689]},"\\\\"]],escapeChar_doubleQuote:["define",{sourceInterval:[1745,1802]},null,[],["terminal",{sourceInterval:[1745,1751]},'\\"']],escapeChar_singleQuote:["define",{sourceInterval:[1809,1866]},null,[],["terminal",{sourceInterval:[1809,1815]},"\\'"]],escapeChar_backspace:["define",{sourceInterval:[1873,1928]},null,[],["terminal",{sourceInterval:[1873,1878]},"\\b"]],escapeChar_lineFeed:["define",{sourceInterval:[1935,1989]},null,[],["terminal",{sourceInterval:[1935,1940]},"\\n"]],escapeChar_carriageReturn:["define",{sourceInterval:[1996,2056]},null,[],["terminal",{sourceInterval:[1996,2001]},"\\r"]],escapeChar_tab:["define",{sourceInterval:[2063,2112]},null,[],["terminal",{sourceInterval:[2063,2068]},"\\t"]],escapeChar_unicodeEscape:["define",{sourceInterval:[2119,2178]},null,[],["seq",{sourceInterval:[2119,2160]},["terminal",{sourceInterval:[2119,2124]},"\\u"],["app",{sourceInterval:[2125,2133]},"hexDigit",[]],["app",{sourceInterval:[2134,2142]},"hexDigit",[]],["app",{sourceInterval:[2143,2151]},"hexDigit",[]],["app",{sourceInterval:[2152,2160]},"hexDigit",[]]]],escapeChar_hexEscape:["define",{sourceInterval:[2185,2240]},null,[],["seq",{sourceInterval:[2185,2208]},["terminal",{sourceInterval:[2185,2190]},"\\x"],["app",{sourceInterval:[2191,2199]},"hexDigit",[]],["app",{sourceInterval:[2200,2208]},"hexDigit",[]]]],escapeChar:["define",{sourceInterval:[1644,2240]},"an escape sequence",[],["alt",{sourceInterval:[1683,2240]},["app",{sourceInterval:[1683,1689]},"escapeChar_backslash",[]],["app",{sourceInterval:[1745,1751]},"escapeChar_doubleQuote",[]],["app",{sourceInterval:[1809,1815]},"escapeChar_singleQuote",[]],["app",{sourceInterval:[1873,1878]},"escapeChar_backspace",[]],["app",{sourceInterval:[1935,1940]},"escapeChar_lineFeed",[]],["app",{sourceInterval:[1996,2001]},"escapeChar_carriageReturn",[]],["app",{sourceInterval:[2063,2068]},"escapeChar_tab",[]],["app",{sourceInterval:[2119,2160]},"escapeChar_unicodeEscape",[]],["app",{sourceInterval:[2185,2208]},"escapeChar_hexEscape",[]]]],space:["extend",{sourceInterval:[2244,2263]},null,[],["app",{sourceInterval:[2256,2263]},"comment",[]]],comment_singleLine:["define",{sourceInterval:[2281,2327]},null,[],["seq",{sourceInterval:[2281,2312]},["terminal",{sourceInterval:[2281,2285]},"//"],["star",{sourceInterval:[2286,2298]},["seq",{sourceInterval:[2287,2296]},["not",{sourceInterval:[2287,2292]},["terminal",{sourceInterval:[2288,2292]},"\n"]],["app",{sourceInterval:[2293,2296]},"any",[]]]],["lookahead",{sourceInterval:[2299,2312]},["alt",{sourceInterval:[2301,2311]},["terminal",{sourceInterval:[2301,2305]},"\n"],["app",{sourceInterval:[2308,2311]},"end",[]]]]]],comment_multiLine:["define",{sourceInterval:[2334,2370]},null,[],["seq",{sourceInterval:[2334,2356]},["terminal",{sourceInterval:[2334,2338]},"/*"],["star",{sourceInterval:[2339,2351]},["seq",{sourceInterval:[2340,2349]},["not",{sourceInterval:[2340,2345]},["terminal",{sourceInterval:[2341,2345]},"*/"]],["app",{sourceInterval:[2346,2349]},"any",[]]]],["terminal",{sourceInterval:[2352,2356]},"*/"]]],comment:["define",{sourceInterval:[2267,2370]},null,[],["alt",{sourceInterval:[2281,2370]},["app",{sourceInterval:[2281,2312]},"comment_singleLine",[]],["app",{sourceInterval:[2334,2356]},"comment_multiLine",[]]]],tokens:["define",{sourceInterval:[2374,2389]},null,[],["star",{sourceInterval:[2383,2389]},["app",{sourceInterval:[2383,2388]},"token",[]]]],token:["define",{sourceInterval:[2393,2469]},null,[],["alt",{sourceInterval:[2401,2469]},["app",{sourceInterval:[2401,2409]},"caseName",[]],["app",{sourceInterval:[2412,2419]},"comment",[]],["app",{sourceInterval:[2422,2427]},"ident",[]],["app",{sourceInterval:[2430,2438]},"operator",[]],["app",{sourceInterval:[2441,2452]},"punctuation",[]],["app",{sourceInterval:[2455,2463]},"terminal",[]],["app",{sourceInterval:[2466,2469]},"any",[]]]],operator:["define",{sourceInterval:[2473,2538]},null,[],["alt",{sourceInterval:[2484,2538]},["terminal",{sourceInterval:[2484,2488]},"<:"],["terminal",{sourceInterval:[2491,2494]},"="],["terminal",{sourceInterval:[2497,2501]},":="],["terminal",{sourceInterval:[2504,2508]},"+="],["terminal",{sourceInterval:[2511,2514]},"*"],["terminal",{sourceInterval:[2517,2520]},"+"],["terminal",{sourceInterval:[2523,2526]},"?"],["terminal",{sourceInterval:[2529,2532]},"~"],["terminal",{sourceInterval:[2535,2538]},"&"]]],punctuation:["define",{sourceInterval:[2542,2578]},null,[],["alt",{sourceInterval:[2556,2578]},["terminal",{sourceInterval:[2556,2559]},"<"],["terminal",{sourceInterval:[2562,2565]},">"],["terminal",{sourceInterval:[2568,2571]},","],["terminal",{sourceInterval:[2574,2578]},"--"]]]}]);}])}));
	});

	var ohm = /*@__PURE__*/getDefaultExportFromCjs(ohm_min);

	function toInteger(dirtyNumber) {
	  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
	    return NaN;
	  }

	  var number = Number(dirtyNumber);

	  if (isNaN(number)) {
	    return number;
	  }

	  return number < 0 ? Math.ceil(number) : Math.floor(number);
	}

	function requiredArgs(required, args) {
	  if (args.length < required) {
	    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
	  }
	}

	/**
	 * @name toDate
	 * @category Common Helpers
	 * @summary Convert the given argument to an instance of Date.
	 *
	 * @description
	 * Convert the given argument to an instance of Date.
	 *
	 * If the argument is an instance of Date, the function returns its clone.
	 *
	 * If the argument is a number, it is treated as a timestamp.
	 *
	 * If the argument is none of the above, the function returns Invalid Date.
	 *
	 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
	 *
	 * @param {Date|Number} argument - the value to convert
	 * @returns {Date} the parsed date in the local time zone
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Clone the date:
	 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
	 * //=> Tue Feb 11 2014 11:30:30
	 *
	 * @example
	 * // Convert the timestamp to date:
	 * const result = toDate(1392098430000)
	 * //=> Tue Feb 11 2014 11:30:30
	 */

	function toDate(argument) {
	  requiredArgs(1, arguments);
	  var argStr = Object.prototype.toString.call(argument); // Clone the date

	  if (argument instanceof Date || typeof argument === 'object' && argStr === '[object Date]') {
	    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
	    return new Date(argument.getTime());
	  } else if (typeof argument === 'number' || argStr === '[object Number]') {
	    return new Date(argument);
	  } else {
	    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
	      // eslint-disable-next-line no-console
	      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://git.io/fjule"); // eslint-disable-next-line no-console

	      console.warn(new Error().stack);
	    }

	    return new Date(NaN);
	  }
	}

	/**
	 * @name addMilliseconds
	 * @category Millisecond Helpers
	 * @summary Add the specified number of milliseconds to the given date.
	 *
	 * @description
	 * Add the specified number of milliseconds to the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the date to be changed
	 * @param {Number} amount - the amount of milliseconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
	 * @returns {Date} the new date with the milliseconds added
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Add 750 milliseconds to 10 July 2014 12:45:30.000:
	 * const result = addMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
	 * //=> Thu Jul 10 2014 12:45:30.750
	 */

	function addMilliseconds(dirtyDate, dirtyAmount) {
	  requiredArgs(2, arguments);
	  var timestamp = toDate(dirtyDate).getTime();
	  var amount = toInteger(dirtyAmount);
	  return new Date(timestamp + amount);
	}

	/**
	 * Google Chrome as of 67.0.3396.87 introduced timezones with offset that includes seconds.
	 * They usually appear for dates that denote time before the timezones were introduced
	 * (e.g. for 'Europe/Prague' timezone the offset is GMT+00:57:44 before 1 October 1891
	 * and GMT+01:00:00 after that date)
	 *
	 * Date#getTimezoneOffset returns the offset in minutes and would return 57 for the example above,
	 * which would lead to incorrect calculations.
	 *
	 * This function returns the timezone offset in milliseconds that takes seconds in account.
	 */
	function getTimezoneOffsetInMilliseconds(date) {
	  var utcDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds(), date.getMilliseconds()));
	  utcDate.setUTCFullYear(date.getFullYear());
	  return date.getTime() - utcDate.getTime();
	}

	/**
	 * @name startOfDay
	 * @category Day Helpers
	 * @summary Return the start of a day for the given date.
	 *
	 * @description
	 * Return the start of a day for the given date.
	 * The result will be in the local timezone.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the original date
	 * @returns {Date} the start of a day
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // The start of a day for 2 September 2014 11:55:00:
	 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
	 * //=> Tue Sep 02 2014 00:00:00
	 */

	function startOfDay(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  date.setHours(0, 0, 0, 0);
	  return date;
	}

	var MILLISECONDS_IN_DAY$1 = 86400000;
	/**
	 * @name differenceInCalendarDays
	 * @category Day Helpers
	 * @summary Get the number of calendar days between the given dates.
	 *
	 * @description
	 * Get the number of calendar days between the given dates. This means that the times are removed
	 * from the dates and then the difference in days is calculated.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} dateLeft - the later date
	 * @param {Date|Number} dateRight - the earlier date
	 * @returns {Number} the number of calendar days
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // How many calendar days are between
	 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
	 * var result = differenceInCalendarDays(
	 *   new Date(2012, 6, 2, 0, 0),
	 *   new Date(2011, 6, 2, 23, 0)
	 * )
	 * //=> 366
	 * // How many calendar days are between
	 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
	 * var result = differenceInCalendarDays(
	 *   new Date(2011, 6, 3, 0, 1),
	 *   new Date(2011, 6, 2, 23, 59)
	 * )
	 * //=> 1
	 */

	function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
	  requiredArgs(2, arguments);
	  var startOfDayLeft = startOfDay(dirtyDateLeft);
	  var startOfDayRight = startOfDay(dirtyDateRight);
	  var timestampLeft = startOfDayLeft.getTime() - getTimezoneOffsetInMilliseconds(startOfDayLeft);
	  var timestampRight = startOfDayRight.getTime() - getTimezoneOffsetInMilliseconds(startOfDayRight); // Round the number of days to the nearest integer
	  // because the number of milliseconds in a day is not constant
	  // (e.g. it's different in the day of the daylight saving time clock shift)

	  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY$1);
	}

	/**
	 * @name addSeconds
	 * @category Second Helpers
	 * @summary Add the specified number of seconds to the given date.
	 *
	 * @description
	 * Add the specified number of seconds to the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the date to be changed
	 * @param {Number} amount - the amount of seconds to be added. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
	 * @returns {Date} the new date with the seconds added
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Add 30 seconds to 10 July 2014 12:45:00:
	 * const result = addSeconds(new Date(2014, 6, 10, 12, 45, 0), 30)
	 * //=> Thu Jul 10 2014 12:45:30
	 */

	function addSeconds(dirtyDate, dirtyAmount) {
	  requiredArgs(2, arguments);
	  var amount = toInteger(dirtyAmount);
	  return addMilliseconds(dirtyDate, amount * 1000);
	}

	/**
	 * @name compareAsc
	 * @category Common Helpers
	 * @summary Compare the two dates and return -1, 0 or 1.
	 *
	 * @description
	 * Compare the two dates and return 1 if the first date is after the second,
	 * -1 if the first date is before the second or 0 if dates are equal.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} dateLeft - the first date to compare
	 * @param {Date|Number} dateRight - the second date to compare
	 * @returns {Number} the result of the comparison
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Compare 11 February 1987 and 10 July 1989:
	 * const result = compareAsc(new Date(1987, 1, 11), new Date(1989, 6, 10))
	 * //=> -1
	 *
	 * @example
	 * // Sort the array of dates:
	 * const result = [
	 *   new Date(1995, 6, 2),
	 *   new Date(1987, 1, 11),
	 *   new Date(1989, 6, 10)
	 * ].sort(compareAsc)
	 * //=> [
	 * //   Wed Feb 11 1987 00:00:00,
	 * //   Mon Jul 10 1989 00:00:00,
	 * //   Sun Jul 02 1995 00:00:00
	 * // ]
	 */

	function compareAsc(dirtyDateLeft, dirtyDateRight) {
	  requiredArgs(2, arguments);
	  var dateLeft = toDate(dirtyDateLeft);
	  var dateRight = toDate(dirtyDateRight);
	  var diff = dateLeft.getTime() - dateRight.getTime();

	  if (diff < 0) {
	    return -1;
	  } else if (diff > 0) {
	    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
	  } else {
	    return diff;
	  }
	}

	/**
	 * @name compareDesc
	 * @category Common Helpers
	 * @summary Compare the two dates reverse chronologically and return -1, 0 or 1.
	 *
	 * @description
	 * Compare the two dates and return -1 if the first date is after the second,
	 * 1 if the first date is before the second or 0 if dates are equal.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} dateLeft - the first date to compare
	 * @param {Date|Number} dateRight - the second date to compare
	 * @returns {Number} the result of the comparison
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Compare 11 February 1987 and 10 July 1989 reverse chronologically:
	 * const result = compareDesc(new Date(1987, 1, 11), new Date(1989, 6, 10))
	 * //=> 1
	 *
	 * @example
	 * // Sort the array of dates in reverse chronological order:
	 * const result = [
	 *   new Date(1995, 6, 2),
	 *   new Date(1987, 1, 11),
	 *   new Date(1989, 6, 10)
	 * ].sort(compareDesc)
	 * //=> [
	 * //   Sun Jul 02 1995 00:00:00,
	 * //   Mon Jul 10 1989 00:00:00,
	 * //   Wed Feb 11 1987 00:00:00
	 * // ]
	 */

	function compareDesc(dirtyDateLeft, dirtyDateRight) {
	  requiredArgs(2, arguments);
	  var dateLeft = toDate(dirtyDateLeft);
	  var dateRight = toDate(dirtyDateRight);
	  var diff = dateLeft.getTime() - dateRight.getTime();

	  if (diff > 0) {
	    return -1;
	  } else if (diff < 0) {
	    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
	  } else {
	    return diff;
	  }
	}

	/**
	 * @name isValid
	 * @category Common Helpers
	 * @summary Is the given date valid?
	 *
	 * @description
	 * Returns false if argument is Invalid Date and true otherwise.
	 * Argument is converted to Date using `toDate`. See [toDate]{@link https://date-fns.org/docs/toDate}
	 * Invalid Date is a Date, whose time value is NaN.
	 *
	 * Time value of Date: http://es5.github.io/#x15.9.1.1
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * - Now `isValid` doesn't throw an exception
	 *   if the first argument is not an instance of Date.
	 *   Instead, argument is converted beforehand using `toDate`.
	 *
	 *   Examples:
	 *
	 *   | `isValid` argument        | Before v2.0.0 | v2.0.0 onward |
	 *   |---------------------------|---------------|---------------|
	 *   | `new Date()`              | `true`        | `true`        |
	 *   | `new Date('2016-01-01')`  | `true`        | `true`        |
	 *   | `new Date('')`            | `false`       | `false`       |
	 *   | `new Date(1488370835081)` | `true`        | `true`        |
	 *   | `new Date(NaN)`           | `false`       | `false`       |
	 *   | `'2016-01-01'`            | `TypeError`   | `false`       |
	 *   | `''`                      | `TypeError`   | `false`       |
	 *   | `1488370835081`           | `TypeError`   | `true`        |
	 *   | `NaN`                     | `TypeError`   | `false`       |
	 *
	 *   We introduce this change to make *date-fns* consistent with ECMAScript behavior
	 *   that try to coerce arguments to the expected type
	 *   (which is also the case with other *date-fns* functions).
	 *
	 * @param {*} date - the date to check
	 * @returns {Boolean} the date is valid
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // For the valid date:
	 * var result = isValid(new Date(2014, 1, 31))
	 * //=> true
	 *
	 * @example
	 * // For the value, convertable into a date:
	 * var result = isValid(1393804800000)
	 * //=> true
	 *
	 * @example
	 * // For the invalid date:
	 * var result = isValid(new Date(''))
	 * //=> false
	 */

	function isValid(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  return !isNaN(date);
	}

	/**
	 * @name differenceInCalendarYears
	 * @category Year Helpers
	 * @summary Get the number of calendar years between the given dates.
	 *
	 * @description
	 * Get the number of calendar years between the given dates.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} dateLeft - the later date
	 * @param {Date|Number} dateRight - the earlier date
	 * @returns {Number} the number of calendar years
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // How many calendar years are between 31 December 2013 and 11 February 2015?
	 * var result = differenceInCalendarYears(
	 *   new Date(2015, 1, 11),
	 *   new Date(2013, 11, 31)
	 * )
	 * //=> 2
	 */

	function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
	  requiredArgs(2, arguments);
	  var dateLeft = toDate(dirtyDateLeft);
	  var dateRight = toDate(dirtyDateRight);
	  return dateLeft.getFullYear() - dateRight.getFullYear();
	}

	// for accurate equality comparisons of UTC timestamps that end up
	// having the same representation in local time, e.g. one hour before
	// DST ends vs. the instant that DST ends.

	function compareLocalAsc(dateLeft, dateRight) {
	  var diff = dateLeft.getFullYear() - dateRight.getFullYear() || dateLeft.getMonth() - dateRight.getMonth() || dateLeft.getDate() - dateRight.getDate() || dateLeft.getHours() - dateRight.getHours() || dateLeft.getMinutes() - dateRight.getMinutes() || dateLeft.getSeconds() - dateRight.getSeconds() || dateLeft.getMilliseconds() - dateRight.getMilliseconds();

	  if (diff < 0) {
	    return -1;
	  } else if (diff > 0) {
	    return 1; // Return 0 if diff is 0; return NaN if diff is NaN
	  } else {
	    return diff;
	  }
	}
	/**
	 * @name differenceInDays
	 * @category Day Helpers
	 * @summary Get the number of full days between the given dates.
	 *
	 * @description
	 * Get the number of full day periods between two dates. Fractional days are
	 * truncated towards zero.
	 *
	 * One "full day" is the distance between a local time in one day to the same
	 * local time on the next or previous day. A full day can sometimes be less than
	 * or more than 24 hours if a daylight savings change happens between two dates.
	 *
	 * To ignore DST and only measure exact 24-hour periods, use this instead:
	 * `Math.floor(differenceInHours(dateLeft, dateRight)/24)|0`.
	 *
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} dateLeft - the later date
	 * @param {Date|Number} dateRight - the earlier date
	 * @returns {Number} the number of full days according to the local timezone
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // How many full days are between
	 * // 2 July 2011 23:00:00 and 2 July 2012 00:00:00?
	 * var result = differenceInDays(
	 *   new Date(2012, 6, 2, 0, 0),
	 *   new Date(2011, 6, 2, 23, 0)
	 * )
	 * //=> 365
	 * // How many full days are between
	 * // 2 July 2011 23:59:00 and 3 July 2011 00:01:00?
	 * var result = differenceInDays(
	 *   new Date(2011, 6, 3, 0, 1),
	 *   new Date(2011, 6, 2, 23, 59)
	 * )
	 * //=> 0
	 * // How many full days are between
	 * // 1 March 2020 0:00 and 1 June 2020 0:00 ?
	 * // Note: because local time is used, the
	 * // result will always be 92 days, even in
	 * // time zones where DST starts and the
	 * // period has only 92*24-1 hours.
	 * var result = differenceInDays(
	 *   new Date(2020, 5, 1),
	 *   new Date(2020, 2, 1)
	 * )
	//=> 92
	 */


	function differenceInDays(dirtyDateLeft, dirtyDateRight) {
	  requiredArgs(2, arguments);
	  var dateLeft = toDate(dirtyDateLeft);
	  var dateRight = toDate(dirtyDateRight);
	  var sign = compareLocalAsc(dateLeft, dateRight);
	  var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight));
	  dateLeft.setDate(dateLeft.getDate() - sign * difference); // Math.abs(diff in full days - diff in calendar days) === 1 if last calendar day is not full
	  // If so, result must be decreased by 1 in absolute value

	  var isLastDayNotFull = compareLocalAsc(dateLeft, dateRight) === -sign;
	  var result = sign * (difference - isLastDayNotFull); // Prevent negative zero

	  return result === 0 ? 0 : result;
	}

	/**
	 * @name differenceInMilliseconds
	 * @category Millisecond Helpers
	 * @summary Get the number of milliseconds between the given dates.
	 *
	 * @description
	 * Get the number of milliseconds between the given dates.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} dateLeft - the later date
	 * @param {Date|Number} dateRight - the earlier date
	 * @returns {Number} the number of milliseconds
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // How many milliseconds are between
	 * // 2 July 2014 12:30:20.600 and 2 July 2014 12:30:21.700?
	 * var result = differenceInMilliseconds(
	 *   new Date(2014, 6, 2, 12, 30, 21, 700),
	 *   new Date(2014, 6, 2, 12, 30, 20, 600)
	 * )
	 * //=> 1100
	 */

	function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
	  requiredArgs(2, arguments);
	  var dateLeft = toDate(dirtyDateLeft);
	  var dateRight = toDate(dirtyDateRight);
	  return dateLeft.getTime() - dateRight.getTime();
	}

	/**
	 * @name differenceInSeconds
	 * @category Second Helpers
	 * @summary Get the number of seconds between the given dates.
	 *
	 * @description
	 * Get the number of seconds between the given dates.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} dateLeft - the later date
	 * @param {Date|Number} dateRight - the earlier date
	 * @returns {Number} the number of seconds
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // How many seconds are between
	 * // 2 July 2014 12:30:07.999 and 2 July 2014 12:30:20.000?
	 * var result = differenceInSeconds(
	 *   new Date(2014, 6, 2, 12, 30, 20, 0),
	 *   new Date(2014, 6, 2, 12, 30, 7, 999)
	 * )
	 * //=> 12
	 */

	function differenceInSeconds(dirtyDateLeft, dirtyDateRight) {
	  requiredArgs(2, arguments);
	  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / 1000;
	  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
	}

	/**
	 * @name differenceInYears
	 * @category Year Helpers
	 * @summary Get the number of full years between the given dates.
	 *
	 * @description
	 * Get the number of full years between the given dates.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} dateLeft - the later date
	 * @param {Date|Number} dateRight - the earlier date
	 * @returns {Number} the number of full years
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // How many full years are between 31 December 2013 and 11 February 2015?
	 * var result = differenceInYears(new Date(2015, 1, 11), new Date(2013, 11, 31))
	 * //=> 1
	 */

	function differenceInYears(dirtyDateLeft, dirtyDateRight) {
	  requiredArgs(2, arguments);
	  var dateLeft = toDate(dirtyDateLeft);
	  var dateRight = toDate(dirtyDateRight);
	  var sign = compareAsc(dateLeft, dateRight);
	  var difference = Math.abs(differenceInCalendarYears(dateLeft, dateRight)); // Set both dates to a valid leap year for accurate comparison when dealing
	  // with leap days

	  dateLeft.setFullYear('1584');
	  dateRight.setFullYear('1584'); // Math.abs(diff in full years - diff in calendar years) === 1 if last calendar year is not full
	  // If so, result must be decreased by 1 in absolute value

	  var isLastYearNotFull = compareAsc(dateLeft, dateRight) === -sign;
	  var result = sign * (difference - isLastYearNotFull); // Prevent negative zero

	  return result === 0 ? 0 : result;
	}

	var formatDistanceLocale = {
	  lessThanXSeconds: {
	    one: 'less than a second',
	    other: 'less than {{count}} seconds'
	  },
	  xSeconds: {
	    one: '1 second',
	    other: '{{count}} seconds'
	  },
	  halfAMinute: 'half a minute',
	  lessThanXMinutes: {
	    one: 'less than a minute',
	    other: 'less than {{count}} minutes'
	  },
	  xMinutes: {
	    one: '1 minute',
	    other: '{{count}} minutes'
	  },
	  aboutXHours: {
	    one: 'about 1 hour',
	    other: 'about {{count}} hours'
	  },
	  xHours: {
	    one: '1 hour',
	    other: '{{count}} hours'
	  },
	  xDays: {
	    one: '1 day',
	    other: '{{count}} days'
	  },
	  aboutXWeeks: {
	    one: 'about 1 week',
	    other: 'about {{count}} weeks'
	  },
	  xWeeks: {
	    one: '1 week',
	    other: '{{count}} weeks'
	  },
	  aboutXMonths: {
	    one: 'about 1 month',
	    other: 'about {{count}} months'
	  },
	  xMonths: {
	    one: '1 month',
	    other: '{{count}} months'
	  },
	  aboutXYears: {
	    one: 'about 1 year',
	    other: 'about {{count}} years'
	  },
	  xYears: {
	    one: '1 year',
	    other: '{{count}} years'
	  },
	  overXYears: {
	    one: 'over 1 year',
	    other: 'over {{count}} years'
	  },
	  almostXYears: {
	    one: 'almost 1 year',
	    other: 'almost {{count}} years'
	  }
	};
	function formatDistance(token, count, options) {
	  options = options || {};
	  var result;

	  if (typeof formatDistanceLocale[token] === 'string') {
	    result = formatDistanceLocale[token];
	  } else if (count === 1) {
	    result = formatDistanceLocale[token].one;
	  } else {
	    result = formatDistanceLocale[token].other.replace('{{count}}', count);
	  }

	  if (options.addSuffix) {
	    if (options.comparison > 0) {
	      return 'in ' + result;
	    } else {
	      return result + ' ago';
	    }
	  }

	  return result;
	}

	function buildFormatLongFn(args) {
	  return function (dirtyOptions) {
	    var options = dirtyOptions || {};
	    var width = options.width ? String(options.width) : args.defaultWidth;
	    var format = args.formats[width] || args.formats[args.defaultWidth];
	    return format;
	  };
	}

	var dateFormats = {
	  full: 'EEEE, MMMM do, y',
	  long: 'MMMM do, y',
	  medium: 'MMM d, y',
	  short: 'MM/dd/yyyy'
	};
	var timeFormats = {
	  full: 'h:mm:ss a zzzz',
	  long: 'h:mm:ss a z',
	  medium: 'h:mm:ss a',
	  short: 'h:mm a'
	};
	var dateTimeFormats = {
	  full: "{{date}} 'at' {{time}}",
	  long: "{{date}} 'at' {{time}}",
	  medium: '{{date}}, {{time}}',
	  short: '{{date}}, {{time}}'
	};
	var formatLong = {
	  date: buildFormatLongFn({
	    formats: dateFormats,
	    defaultWidth: 'full'
	  }),
	  time: buildFormatLongFn({
	    formats: timeFormats,
	    defaultWidth: 'full'
	  }),
	  dateTime: buildFormatLongFn({
	    formats: dateTimeFormats,
	    defaultWidth: 'full'
	  })
	};

	var formatRelativeLocale = {
	  lastWeek: "'last' eeee 'at' p",
	  yesterday: "'yesterday at' p",
	  today: "'today at' p",
	  tomorrow: "'tomorrow at' p",
	  nextWeek: "eeee 'at' p",
	  other: 'P'
	};
	function formatRelative(token, _date, _baseDate, _options) {
	  return formatRelativeLocale[token];
	}

	function buildLocalizeFn(args) {
	  return function (dirtyIndex, dirtyOptions) {
	    var options = dirtyOptions || {};
	    var context = options.context ? String(options.context) : 'standalone';
	    var valuesArray;

	    if (context === 'formatting' && args.formattingValues) {
	      var defaultWidth = args.defaultFormattingWidth || args.defaultWidth;
	      var width = options.width ? String(options.width) : defaultWidth;
	      valuesArray = args.formattingValues[width] || args.formattingValues[defaultWidth];
	    } else {
	      var _defaultWidth = args.defaultWidth;

	      var _width = options.width ? String(options.width) : args.defaultWidth;

	      valuesArray = args.values[_width] || args.values[_defaultWidth];
	    }

	    var index = args.argumentCallback ? args.argumentCallback(dirtyIndex) : dirtyIndex;
	    return valuesArray[index];
	  };
	}

	var eraValues = {
	  narrow: ['B', 'A'],
	  abbreviated: ['BC', 'AD'],
	  wide: ['Before Christ', 'Anno Domini']
	};
	var quarterValues = {
	  narrow: ['1', '2', '3', '4'],
	  abbreviated: ['Q1', 'Q2', 'Q3', 'Q4'],
	  wide: ['1st quarter', '2nd quarter', '3rd quarter', '4th quarter'] // Note: in English, the names of days of the week and months are capitalized.
	  // If you are making a new locale based on this one, check if the same is true for the language you're working on.
	  // Generally, formatted dates should look like they are in the middle of a sentence,
	  // e.g. in Spanish language the weekdays and months should be in the lowercase.

	};
	var monthValues = {
	  narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'],
	  abbreviated: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
	  wide: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
	};
	var dayValues = {
	  narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
	  short: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
	  abbreviated: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	  wide: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
	};
	var dayPeriodValues = {
	  narrow: {
	    am: 'a',
	    pm: 'p',
	    midnight: 'mi',
	    noon: 'n',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  },
	  abbreviated: {
	    am: 'AM',
	    pm: 'PM',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  },
	  wide: {
	    am: 'a.m.',
	    pm: 'p.m.',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'morning',
	    afternoon: 'afternoon',
	    evening: 'evening',
	    night: 'night'
	  }
	};
	var formattingDayPeriodValues = {
	  narrow: {
	    am: 'a',
	    pm: 'p',
	    midnight: 'mi',
	    noon: 'n',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  },
	  abbreviated: {
	    am: 'AM',
	    pm: 'PM',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  },
	  wide: {
	    am: 'a.m.',
	    pm: 'p.m.',
	    midnight: 'midnight',
	    noon: 'noon',
	    morning: 'in the morning',
	    afternoon: 'in the afternoon',
	    evening: 'in the evening',
	    night: 'at night'
	  }
	};

	function ordinalNumber(dirtyNumber, _dirtyOptions) {
	  var number = Number(dirtyNumber); // If ordinal numbers depend on context, for example,
	  // if they are different for different grammatical genders,
	  // use `options.unit`:
	  //
	  //   var options = dirtyOptions || {}
	  //   var unit = String(options.unit)
	  //
	  // where `unit` can be 'year', 'quarter', 'month', 'week', 'date', 'dayOfYear',
	  // 'day', 'hour', 'minute', 'second'

	  var rem100 = number % 100;

	  if (rem100 > 20 || rem100 < 10) {
	    switch (rem100 % 10) {
	      case 1:
	        return number + 'st';

	      case 2:
	        return number + 'nd';

	      case 3:
	        return number + 'rd';
	    }
	  }

	  return number + 'th';
	}

	var localize = {
	  ordinalNumber: ordinalNumber,
	  era: buildLocalizeFn({
	    values: eraValues,
	    defaultWidth: 'wide'
	  }),
	  quarter: buildLocalizeFn({
	    values: quarterValues,
	    defaultWidth: 'wide',
	    argumentCallback: function (quarter) {
	      return Number(quarter) - 1;
	    }
	  }),
	  month: buildLocalizeFn({
	    values: monthValues,
	    defaultWidth: 'wide'
	  }),
	  day: buildLocalizeFn({
	    values: dayValues,
	    defaultWidth: 'wide'
	  }),
	  dayPeriod: buildLocalizeFn({
	    values: dayPeriodValues,
	    defaultWidth: 'wide',
	    formattingValues: formattingDayPeriodValues,
	    defaultFormattingWidth: 'wide'
	  })
	};

	function buildMatchPatternFn(args) {
	  return function (dirtyString, dirtyOptions) {
	    var string = String(dirtyString);
	    var options = dirtyOptions || {};
	    var matchResult = string.match(args.matchPattern);

	    if (!matchResult) {
	      return null;
	    }

	    var matchedString = matchResult[0];
	    var parseResult = string.match(args.parsePattern);

	    if (!parseResult) {
	      return null;
	    }

	    var value = args.valueCallback ? args.valueCallback(parseResult[0]) : parseResult[0];
	    value = options.valueCallback ? options.valueCallback(value) : value;
	    return {
	      value: value,
	      rest: string.slice(matchedString.length)
	    };
	  };
	}

	function buildMatchFn(args) {
	  return function (dirtyString, dirtyOptions) {
	    var string = String(dirtyString);
	    var options = dirtyOptions || {};
	    var width = options.width;
	    var matchPattern = width && args.matchPatterns[width] || args.matchPatterns[args.defaultMatchWidth];
	    var matchResult = string.match(matchPattern);

	    if (!matchResult) {
	      return null;
	    }

	    var matchedString = matchResult[0];
	    var parsePatterns = width && args.parsePatterns[width] || args.parsePatterns[args.defaultParseWidth];
	    var value;

	    if (Object.prototype.toString.call(parsePatterns) === '[object Array]') {
	      value = findIndex(parsePatterns, function (pattern) {
	        return pattern.test(matchedString);
	      });
	    } else {
	      value = findKey(parsePatterns, function (pattern) {
	        return pattern.test(matchedString);
	      });
	    }

	    value = args.valueCallback ? args.valueCallback(value) : value;
	    value = options.valueCallback ? options.valueCallback(value) : value;
	    return {
	      value: value,
	      rest: string.slice(matchedString.length)
	    };
	  };
	}

	function findKey(object, predicate) {
	  for (var key in object) {
	    if (object.hasOwnProperty(key) && predicate(object[key])) {
	      return key;
	    }
	  }
	}

	function findIndex(array, predicate) {
	  for (var key = 0; key < array.length; key++) {
	    if (predicate(array[key])) {
	      return key;
	    }
	  }
	}

	var matchOrdinalNumberPattern = /^(\d+)(th|st|nd|rd)?/i;
	var parseOrdinalNumberPattern = /\d+/i;
	var matchEraPatterns = {
	  narrow: /^(b|a)/i,
	  abbreviated: /^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,
	  wide: /^(before christ|before common era|anno domini|common era)/i
	};
	var parseEraPatterns = {
	  any: [/^b/i, /^(a|c)/i]
	};
	var matchQuarterPatterns = {
	  narrow: /^[1234]/i,
	  abbreviated: /^q[1234]/i,
	  wide: /^[1234](th|st|nd|rd)? quarter/i
	};
	var parseQuarterPatterns = {
	  any: [/1/i, /2/i, /3/i, /4/i]
	};
	var matchMonthPatterns = {
	  narrow: /^[jfmasond]/i,
	  abbreviated: /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,
	  wide: /^(january|february|march|april|may|june|july|august|september|october|november|december)/i
	};
	var parseMonthPatterns = {
	  narrow: [/^j/i, /^f/i, /^m/i, /^a/i, /^m/i, /^j/i, /^j/i, /^a/i, /^s/i, /^o/i, /^n/i, /^d/i],
	  any: [/^ja/i, /^f/i, /^mar/i, /^ap/i, /^may/i, /^jun/i, /^jul/i, /^au/i, /^s/i, /^o/i, /^n/i, /^d/i]
	};
	var matchDayPatterns = {
	  narrow: /^[smtwf]/i,
	  short: /^(su|mo|tu|we|th|fr|sa)/i,
	  abbreviated: /^(sun|mon|tue|wed|thu|fri|sat)/i,
	  wide: /^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i
	};
	var parseDayPatterns = {
	  narrow: [/^s/i, /^m/i, /^t/i, /^w/i, /^t/i, /^f/i, /^s/i],
	  any: [/^su/i, /^m/i, /^tu/i, /^w/i, /^th/i, /^f/i, /^sa/i]
	};
	var matchDayPeriodPatterns = {
	  narrow: /^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,
	  any: /^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i
	};
	var parseDayPeriodPatterns = {
	  any: {
	    am: /^a/i,
	    pm: /^p/i,
	    midnight: /^mi/i,
	    noon: /^no/i,
	    morning: /morning/i,
	    afternoon: /afternoon/i,
	    evening: /evening/i,
	    night: /night/i
	  }
	};
	var match = {
	  ordinalNumber: buildMatchPatternFn({
	    matchPattern: matchOrdinalNumberPattern,
	    parsePattern: parseOrdinalNumberPattern,
	    valueCallback: function (value) {
	      return parseInt(value, 10);
	    }
	  }),
	  era: buildMatchFn({
	    matchPatterns: matchEraPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseEraPatterns,
	    defaultParseWidth: 'any'
	  }),
	  quarter: buildMatchFn({
	    matchPatterns: matchQuarterPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseQuarterPatterns,
	    defaultParseWidth: 'any',
	    valueCallback: function (index) {
	      return index + 1;
	    }
	  }),
	  month: buildMatchFn({
	    matchPatterns: matchMonthPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseMonthPatterns,
	    defaultParseWidth: 'any'
	  }),
	  day: buildMatchFn({
	    matchPatterns: matchDayPatterns,
	    defaultMatchWidth: 'wide',
	    parsePatterns: parseDayPatterns,
	    defaultParseWidth: 'any'
	  }),
	  dayPeriod: buildMatchFn({
	    matchPatterns: matchDayPeriodPatterns,
	    defaultMatchWidth: 'any',
	    parsePatterns: parseDayPeriodPatterns,
	    defaultParseWidth: 'any'
	  })
	};

	/**
	 * @type {Locale}
	 * @category Locales
	 * @summary English locale (United States).
	 * @language English
	 * @iso-639-2 eng
	 * @author Sasha Koss [@kossnocorp]{@link https://github.com/kossnocorp}
	 * @author Lesha Koss [@leshakoss]{@link https://github.com/leshakoss}
	 */

	var locale = {
	  code: 'en-US',
	  formatDistance: formatDistance,
	  formatLong: formatLong,
	  formatRelative: formatRelative,
	  localize: localize,
	  match: match,
	  options: {
	    weekStartsOn: 0
	    /* Sunday */
	    ,
	    firstWeekContainsDate: 1
	  }
	};

	/**
	 * @name subMilliseconds
	 * @category Millisecond Helpers
	 * @summary Subtract the specified number of milliseconds from the given date.
	 *
	 * @description
	 * Subtract the specified number of milliseconds from the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the date to be changed
	 * @param {Number} amount - the amount of milliseconds to be subtracted. Positive decimals will be rounded using `Math.floor`, decimals less than zero will be rounded using `Math.ceil`.
	 * @returns {Date} the new date with the milliseconds subtracted
	 * @throws {TypeError} 2 arguments required
	 *
	 * @example
	 * // Subtract 750 milliseconds from 10 July 2014 12:45:30.000:
	 * const result = subMilliseconds(new Date(2014, 6, 10, 12, 45, 30, 0), 750)
	 * //=> Thu Jul 10 2014 12:45:29.250
	 */

	function subMilliseconds(dirtyDate, dirtyAmount) {
	  requiredArgs(2, arguments);
	  var amount = toInteger(dirtyAmount);
	  return addMilliseconds(dirtyDate, -amount);
	}

	function addLeadingZeros(number, targetLength) {
	  var sign = number < 0 ? '-' : '';
	  var output = Math.abs(number).toString();

	  while (output.length < targetLength) {
	    output = '0' + output;
	  }

	  return sign + output;
	}

	/*
	 * |     | Unit                           |     | Unit                           |
	 * |-----|--------------------------------|-----|--------------------------------|
	 * |  a  | AM, PM                         |  A* |                                |
	 * |  d  | Day of month                   |  D  |                                |
	 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
	 * |  m  | Minute                         |  M  | Month                          |
	 * |  s  | Second                         |  S  | Fraction of second             |
	 * |  y  | Year (abs)                     |  Y  |                                |
	 *
	 * Letters marked by * are not implemented but reserved by Unicode standard.
	 */

	var formatters$1 = {
	  // Year
	  y: function (date, token) {
	    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_tokens
	    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
	    // |----------|-------|----|-------|-------|-------|
	    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
	    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
	    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
	    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
	    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
	    var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

	    var year = signedYear > 0 ? signedYear : 1 - signedYear;
	    return addLeadingZeros(token === 'yy' ? year % 100 : year, token.length);
	  },
	  // Month
	  M: function (date, token) {
	    var month = date.getUTCMonth();
	    return token === 'M' ? String(month + 1) : addLeadingZeros(month + 1, 2);
	  },
	  // Day of the month
	  d: function (date, token) {
	    return addLeadingZeros(date.getUTCDate(), token.length);
	  },
	  // AM or PM
	  a: function (date, token) {
	    var dayPeriodEnumValue = date.getUTCHours() / 12 >= 1 ? 'pm' : 'am';

	    switch (token) {
	      case 'a':
	      case 'aa':
	        return dayPeriodEnumValue.toUpperCase();

	      case 'aaa':
	        return dayPeriodEnumValue;

	      case 'aaaaa':
	        return dayPeriodEnumValue[0];

	      case 'aaaa':
	      default:
	        return dayPeriodEnumValue === 'am' ? 'a.m.' : 'p.m.';
	    }
	  },
	  // Hour [1-12]
	  h: function (date, token) {
	    return addLeadingZeros(date.getUTCHours() % 12 || 12, token.length);
	  },
	  // Hour [0-23]
	  H: function (date, token) {
	    return addLeadingZeros(date.getUTCHours(), token.length);
	  },
	  // Minute
	  m: function (date, token) {
	    return addLeadingZeros(date.getUTCMinutes(), token.length);
	  },
	  // Second
	  s: function (date, token) {
	    return addLeadingZeros(date.getUTCSeconds(), token.length);
	  },
	  // Fraction of second
	  S: function (date, token) {
	    var numberOfDigits = token.length;
	    var milliseconds = date.getUTCMilliseconds();
	    var fractionalSeconds = Math.floor(milliseconds * Math.pow(10, numberOfDigits - 3));
	    return addLeadingZeros(fractionalSeconds, token.length);
	  }
	};

	var MILLISECONDS_IN_DAY = 86400000; // This function will be a part of public API when UTC function will be implemented.
	// See issue: https://github.com/date-fns/date-fns/issues/376

	function getUTCDayOfYear(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var timestamp = date.getTime();
	  date.setUTCMonth(0, 1);
	  date.setUTCHours(0, 0, 0, 0);
	  var startOfYearTimestamp = date.getTime();
	  var difference = timestamp - startOfYearTimestamp;
	  return Math.floor(difference / MILLISECONDS_IN_DAY) + 1;
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function startOfUTCISOWeek(dirtyDate) {
	  requiredArgs(1, arguments);
	  var weekStartsOn = 1;
	  var date = toDate(dirtyDate);
	  var day = date.getUTCDay();
	  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	  date.setUTCDate(date.getUTCDate() - diff);
	  date.setUTCHours(0, 0, 0, 0);
	  return date;
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function getUTCISOWeekYear(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var year = date.getUTCFullYear();
	  var fourthOfJanuaryOfNextYear = new Date(0);
	  fourthOfJanuaryOfNextYear.setUTCFullYear(year + 1, 0, 4);
	  fourthOfJanuaryOfNextYear.setUTCHours(0, 0, 0, 0);
	  var startOfNextYear = startOfUTCISOWeek(fourthOfJanuaryOfNextYear);
	  var fourthOfJanuaryOfThisYear = new Date(0);
	  fourthOfJanuaryOfThisYear.setUTCFullYear(year, 0, 4);
	  fourthOfJanuaryOfThisYear.setUTCHours(0, 0, 0, 0);
	  var startOfThisYear = startOfUTCISOWeek(fourthOfJanuaryOfThisYear);

	  if (date.getTime() >= startOfNextYear.getTime()) {
	    return year + 1;
	  } else if (date.getTime() >= startOfThisYear.getTime()) {
	    return year;
	  } else {
	    return year - 1;
	  }
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function startOfUTCISOWeekYear(dirtyDate) {
	  requiredArgs(1, arguments);
	  var year = getUTCISOWeekYear(dirtyDate);
	  var fourthOfJanuary = new Date(0);
	  fourthOfJanuary.setUTCFullYear(year, 0, 4);
	  fourthOfJanuary.setUTCHours(0, 0, 0, 0);
	  var date = startOfUTCISOWeek(fourthOfJanuary);
	  return date;
	}

	var MILLISECONDS_IN_WEEK$1 = 604800000; // This function will be a part of public API when UTC function will be implemented.
	// See issue: https://github.com/date-fns/date-fns/issues/376

	function getUTCISOWeek(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var diff = startOfUTCISOWeek(date).getTime() - startOfUTCISOWeekYear(date).getTime(); // Round the number of days to the nearest integer
	  // because the number of milliseconds in a week is not constant
	  // (e.g. it's different in the week of the daylight saving time clock shift)

	  return Math.round(diff / MILLISECONDS_IN_WEEK$1) + 1;
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function startOfUTCWeek(dirtyDate, dirtyOptions) {
	  requiredArgs(1, arguments);
	  var options = dirtyOptions || {};
	  var locale = options.locale;
	  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
	  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
	  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }

	  var date = toDate(dirtyDate);
	  var day = date.getUTCDay();
	  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
	  date.setUTCDate(date.getUTCDate() - diff);
	  date.setUTCHours(0, 0, 0, 0);
	  return date;
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function getUTCWeekYear(dirtyDate, dirtyOptions) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate, dirtyOptions);
	  var year = date.getUTCFullYear();
	  var options = dirtyOptions || {};
	  var locale = options.locale;
	  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
	  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
	  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }

	  var firstWeekOfNextYear = new Date(0);
	  firstWeekOfNextYear.setUTCFullYear(year + 1, 0, firstWeekContainsDate);
	  firstWeekOfNextYear.setUTCHours(0, 0, 0, 0);
	  var startOfNextYear = startOfUTCWeek(firstWeekOfNextYear, dirtyOptions);
	  var firstWeekOfThisYear = new Date(0);
	  firstWeekOfThisYear.setUTCFullYear(year, 0, firstWeekContainsDate);
	  firstWeekOfThisYear.setUTCHours(0, 0, 0, 0);
	  var startOfThisYear = startOfUTCWeek(firstWeekOfThisYear, dirtyOptions);

	  if (date.getTime() >= startOfNextYear.getTime()) {
	    return year + 1;
	  } else if (date.getTime() >= startOfThisYear.getTime()) {
	    return year;
	  } else {
	    return year - 1;
	  }
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function startOfUTCWeekYear(dirtyDate, dirtyOptions) {
	  requiredArgs(1, arguments);
	  var options = dirtyOptions || {};
	  var locale = options.locale;
	  var localeFirstWeekContainsDate = locale && locale.options && locale.options.firstWeekContainsDate;
	  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
	  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate);
	  var year = getUTCWeekYear(dirtyDate, dirtyOptions);
	  var firstWeek = new Date(0);
	  firstWeek.setUTCFullYear(year, 0, firstWeekContainsDate);
	  firstWeek.setUTCHours(0, 0, 0, 0);
	  var date = startOfUTCWeek(firstWeek, dirtyOptions);
	  return date;
	}

	var MILLISECONDS_IN_WEEK = 604800000; // This function will be a part of public API when UTC function will be implemented.
	// See issue: https://github.com/date-fns/date-fns/issues/376

	function getUTCWeek(dirtyDate, options) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var diff = startOfUTCWeek(date, options).getTime() - startOfUTCWeekYear(date, options).getTime(); // Round the number of days to the nearest integer
	  // because the number of milliseconds in a week is not constant
	  // (e.g. it's different in the week of the daylight saving time clock shift)

	  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
	}

	var dayPeriodEnum = {
	  am: 'am',
	  pm: 'pm',
	  midnight: 'midnight',
	  noon: 'noon',
	  morning: 'morning',
	  afternoon: 'afternoon',
	  evening: 'evening',
	  night: 'night'
	  /*
	   * |     | Unit                           |     | Unit                           |
	   * |-----|--------------------------------|-----|--------------------------------|
	   * |  a  | AM, PM                         |  A* | Milliseconds in day            |
	   * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
	   * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
	   * |  d  | Day of month                   |  D  | Day of year                    |
	   * |  e  | Local day of week              |  E  | Day of week                    |
	   * |  f  |                                |  F* | Day of week in month           |
	   * |  g* | Modified Julian day            |  G  | Era                            |
	   * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
	   * |  i! | ISO day of week                |  I! | ISO week of year               |
	   * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
	   * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
	   * |  l* | (deprecated)                   |  L  | Stand-alone month              |
	   * |  m  | Minute                         |  M  | Month                          |
	   * |  n  |                                |  N  |                                |
	   * |  o! | Ordinal number modifier        |  O  | Timezone (GMT)                 |
	   * |  p! | Long localized time            |  P! | Long localized date            |
	   * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
	   * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
	   * |  s  | Second                         |  S  | Fraction of second             |
	   * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
	   * |  u  | Extended year                  |  U* | Cyclic year                    |
	   * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
	   * |  w  | Local week of year             |  W* | Week of month                  |
	   * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
	   * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
	   * |  z  | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
	   *
	   * Letters marked by * are not implemented but reserved by Unicode standard.
	   *
	   * Letters marked by ! are non-standard, but implemented by date-fns:
	   * - `o` modifies the previous token to turn it into an ordinal (see `format` docs)
	   * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
	   *   i.e. 7 for Sunday, 1 for Monday, etc.
	   * - `I` is ISO week of year, as opposed to `w` which is local week of year.
	   * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
	   *   `R` is supposed to be used in conjunction with `I` and `i`
	   *   for universal ISO week-numbering date, whereas
	   *   `Y` is supposed to be used in conjunction with `w` and `e`
	   *   for week-numbering date specific to the locale.
	   * - `P` is long localized date format
	   * - `p` is long localized time format
	   */

	};
	var formatters = {
	  // Era
	  G: function (date, token, localize) {
	    var era = date.getUTCFullYear() > 0 ? 1 : 0;

	    switch (token) {
	      // AD, BC
	      case 'G':
	      case 'GG':
	      case 'GGG':
	        return localize.era(era, {
	          width: 'abbreviated'
	        });
	      // A, B

	      case 'GGGGG':
	        return localize.era(era, {
	          width: 'narrow'
	        });
	      // Anno Domini, Before Christ

	      case 'GGGG':
	      default:
	        return localize.era(era, {
	          width: 'wide'
	        });
	    }
	  },
	  // Year
	  y: function (date, token, localize) {
	    // Ordinal number
	    if (token === 'yo') {
	      var signedYear = date.getUTCFullYear(); // Returns 1 for 1 BC (which is year 0 in JavaScript)

	      var year = signedYear > 0 ? signedYear : 1 - signedYear;
	      return localize.ordinalNumber(year, {
	        unit: 'year'
	      });
	    }

	    return formatters$1.y(date, token);
	  },
	  // Local week-numbering year
	  Y: function (date, token, localize, options) {
	    var signedWeekYear = getUTCWeekYear(date, options); // Returns 1 for 1 BC (which is year 0 in JavaScript)

	    var weekYear = signedWeekYear > 0 ? signedWeekYear : 1 - signedWeekYear; // Two digit year

	    if (token === 'YY') {
	      var twoDigitYear = weekYear % 100;
	      return addLeadingZeros(twoDigitYear, 2);
	    } // Ordinal number


	    if (token === 'Yo') {
	      return localize.ordinalNumber(weekYear, {
	        unit: 'year'
	      });
	    } // Padding


	    return addLeadingZeros(weekYear, token.length);
	  },
	  // ISO week-numbering year
	  R: function (date, token) {
	    var isoWeekYear = getUTCISOWeekYear(date); // Padding

	    return addLeadingZeros(isoWeekYear, token.length);
	  },
	  // Extended year. This is a single number designating the year of this calendar system.
	  // The main difference between `y` and `u` localizers are B.C. years:
	  // | Year | `y` | `u` |
	  // |------|-----|-----|
	  // | AC 1 |   1 |   1 |
	  // | BC 1 |   1 |   0 |
	  // | BC 2 |   2 |  -1 |
	  // Also `yy` always returns the last two digits of a year,
	  // while `uu` pads single digit years to 2 characters and returns other years unchanged.
	  u: function (date, token) {
	    var year = date.getUTCFullYear();
	    return addLeadingZeros(year, token.length);
	  },
	  // Quarter
	  Q: function (date, token, localize) {
	    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

	    switch (token) {
	      // 1, 2, 3, 4
	      case 'Q':
	        return String(quarter);
	      // 01, 02, 03, 04

	      case 'QQ':
	        return addLeadingZeros(quarter, 2);
	      // 1st, 2nd, 3rd, 4th

	      case 'Qo':
	        return localize.ordinalNumber(quarter, {
	          unit: 'quarter'
	        });
	      // Q1, Q2, Q3, Q4

	      case 'QQQ':
	        return localize.quarter(quarter, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

	      case 'QQQQQ':
	        return localize.quarter(quarter, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // 1st quarter, 2nd quarter, ...

	      case 'QQQQ':
	      default:
	        return localize.quarter(quarter, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone quarter
	  q: function (date, token, localize) {
	    var quarter = Math.ceil((date.getUTCMonth() + 1) / 3);

	    switch (token) {
	      // 1, 2, 3, 4
	      case 'q':
	        return String(quarter);
	      // 01, 02, 03, 04

	      case 'qq':
	        return addLeadingZeros(quarter, 2);
	      // 1st, 2nd, 3rd, 4th

	      case 'qo':
	        return localize.ordinalNumber(quarter, {
	          unit: 'quarter'
	        });
	      // Q1, Q2, Q3, Q4

	      case 'qqq':
	        return localize.quarter(quarter, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // 1, 2, 3, 4 (narrow quarter; could be not numerical)

	      case 'qqqqq':
	        return localize.quarter(quarter, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // 1st quarter, 2nd quarter, ...

	      case 'qqqq':
	      default:
	        return localize.quarter(quarter, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // Month
	  M: function (date, token, localize) {
	    var month = date.getUTCMonth();

	    switch (token) {
	      case 'M':
	      case 'MM':
	        return formatters$1.M(date, token);
	      // 1st, 2nd, ..., 12th

	      case 'Mo':
	        return localize.ordinalNumber(month + 1, {
	          unit: 'month'
	        });
	      // Jan, Feb, ..., Dec

	      case 'MMM':
	        return localize.month(month, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // J, F, ..., D

	      case 'MMMMM':
	        return localize.month(month, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // January, February, ..., December

	      case 'MMMM':
	      default:
	        return localize.month(month, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone month
	  L: function (date, token, localize) {
	    var month = date.getUTCMonth();

	    switch (token) {
	      // 1, 2, ..., 12
	      case 'L':
	        return String(month + 1);
	      // 01, 02, ..., 12

	      case 'LL':
	        return addLeadingZeros(month + 1, 2);
	      // 1st, 2nd, ..., 12th

	      case 'Lo':
	        return localize.ordinalNumber(month + 1, {
	          unit: 'month'
	        });
	      // Jan, Feb, ..., Dec

	      case 'LLL':
	        return localize.month(month, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // J, F, ..., D

	      case 'LLLLL':
	        return localize.month(month, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // January, February, ..., December

	      case 'LLLL':
	      default:
	        return localize.month(month, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // Local week of year
	  w: function (date, token, localize, options) {
	    var week = getUTCWeek(date, options);

	    if (token === 'wo') {
	      return localize.ordinalNumber(week, {
	        unit: 'week'
	      });
	    }

	    return addLeadingZeros(week, token.length);
	  },
	  // ISO week of year
	  I: function (date, token, localize) {
	    var isoWeek = getUTCISOWeek(date);

	    if (token === 'Io') {
	      return localize.ordinalNumber(isoWeek, {
	        unit: 'week'
	      });
	    }

	    return addLeadingZeros(isoWeek, token.length);
	  },
	  // Day of the month
	  d: function (date, token, localize) {
	    if (token === 'do') {
	      return localize.ordinalNumber(date.getUTCDate(), {
	        unit: 'date'
	      });
	    }

	    return formatters$1.d(date, token);
	  },
	  // Day of year
	  D: function (date, token, localize) {
	    var dayOfYear = getUTCDayOfYear(date);

	    if (token === 'Do') {
	      return localize.ordinalNumber(dayOfYear, {
	        unit: 'dayOfYear'
	      });
	    }

	    return addLeadingZeros(dayOfYear, token.length);
	  },
	  // Day of week
	  E: function (date, token, localize) {
	    var dayOfWeek = date.getUTCDay();

	    switch (token) {
	      // Tue
	      case 'E':
	      case 'EE':
	      case 'EEE':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T

	      case 'EEEEE':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu

	      case 'EEEEEE':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday

	      case 'EEEE':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Local day of week
	  e: function (date, token, localize, options) {
	    var dayOfWeek = date.getUTCDay();
	    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

	    switch (token) {
	      // Numerical value (Nth day of week with current locale or weekStartsOn)
	      case 'e':
	        return String(localDayOfWeek);
	      // Padded numerical value

	      case 'ee':
	        return addLeadingZeros(localDayOfWeek, 2);
	      // 1st, 2nd, ..., 7th

	      case 'eo':
	        return localize.ordinalNumber(localDayOfWeek, {
	          unit: 'day'
	        });

	      case 'eee':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T

	      case 'eeeee':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu

	      case 'eeeeee':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday

	      case 'eeee':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Stand-alone local day of week
	  c: function (date, token, localize, options) {
	    var dayOfWeek = date.getUTCDay();
	    var localDayOfWeek = (dayOfWeek - options.weekStartsOn + 8) % 7 || 7;

	    switch (token) {
	      // Numerical value (same as in `e`)
	      case 'c':
	        return String(localDayOfWeek);
	      // Padded numerical value

	      case 'cc':
	        return addLeadingZeros(localDayOfWeek, token.length);
	      // 1st, 2nd, ..., 7th

	      case 'co':
	        return localize.ordinalNumber(localDayOfWeek, {
	          unit: 'day'
	        });

	      case 'ccc':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'standalone'
	        });
	      // T

	      case 'ccccc':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'standalone'
	        });
	      // Tu

	      case 'cccccc':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'standalone'
	        });
	      // Tuesday

	      case 'cccc':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'standalone'
	        });
	    }
	  },
	  // ISO day of week
	  i: function (date, token, localize) {
	    var dayOfWeek = date.getUTCDay();
	    var isoDayOfWeek = dayOfWeek === 0 ? 7 : dayOfWeek;

	    switch (token) {
	      // 2
	      case 'i':
	        return String(isoDayOfWeek);
	      // 02

	      case 'ii':
	        return addLeadingZeros(isoDayOfWeek, token.length);
	      // 2nd

	      case 'io':
	        return localize.ordinalNumber(isoDayOfWeek, {
	          unit: 'day'
	        });
	      // Tue

	      case 'iii':
	        return localize.day(dayOfWeek, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });
	      // T

	      case 'iiiii':
	        return localize.day(dayOfWeek, {
	          width: 'narrow',
	          context: 'formatting'
	        });
	      // Tu

	      case 'iiiiii':
	        return localize.day(dayOfWeek, {
	          width: 'short',
	          context: 'formatting'
	        });
	      // Tuesday

	      case 'iiii':
	      default:
	        return localize.day(dayOfWeek, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // AM or PM
	  a: function (date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';

	    switch (token) {
	      case 'a':
	      case 'aa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });

	      case 'aaa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        }).toLowerCase();

	      case 'aaaaa':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });

	      case 'aaaa':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // AM, PM, midnight, noon
	  b: function (date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue;

	    if (hours === 12) {
	      dayPeriodEnumValue = dayPeriodEnum.noon;
	    } else if (hours === 0) {
	      dayPeriodEnumValue = dayPeriodEnum.midnight;
	    } else {
	      dayPeriodEnumValue = hours / 12 >= 1 ? 'pm' : 'am';
	    }

	    switch (token) {
	      case 'b':
	      case 'bb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });

	      case 'bbb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        }).toLowerCase();

	      case 'bbbbb':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });

	      case 'bbbb':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // in the morning, in the afternoon, in the evening, at night
	  B: function (date, token, localize) {
	    var hours = date.getUTCHours();
	    var dayPeriodEnumValue;

	    if (hours >= 17) {
	      dayPeriodEnumValue = dayPeriodEnum.evening;
	    } else if (hours >= 12) {
	      dayPeriodEnumValue = dayPeriodEnum.afternoon;
	    } else if (hours >= 4) {
	      dayPeriodEnumValue = dayPeriodEnum.morning;
	    } else {
	      dayPeriodEnumValue = dayPeriodEnum.night;
	    }

	    switch (token) {
	      case 'B':
	      case 'BB':
	      case 'BBB':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'abbreviated',
	          context: 'formatting'
	        });

	      case 'BBBBB':
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'narrow',
	          context: 'formatting'
	        });

	      case 'BBBB':
	      default:
	        return localize.dayPeriod(dayPeriodEnumValue, {
	          width: 'wide',
	          context: 'formatting'
	        });
	    }
	  },
	  // Hour [1-12]
	  h: function (date, token, localize) {
	    if (token === 'ho') {
	      var hours = date.getUTCHours() % 12;
	      if (hours === 0) hours = 12;
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }

	    return formatters$1.h(date, token);
	  },
	  // Hour [0-23]
	  H: function (date, token, localize) {
	    if (token === 'Ho') {
	      return localize.ordinalNumber(date.getUTCHours(), {
	        unit: 'hour'
	      });
	    }

	    return formatters$1.H(date, token);
	  },
	  // Hour [0-11]
	  K: function (date, token, localize) {
	    var hours = date.getUTCHours() % 12;

	    if (token === 'Ko') {
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }

	    return addLeadingZeros(hours, token.length);
	  },
	  // Hour [1-24]
	  k: function (date, token, localize) {
	    var hours = date.getUTCHours();
	    if (hours === 0) hours = 24;

	    if (token === 'ko') {
	      return localize.ordinalNumber(hours, {
	        unit: 'hour'
	      });
	    }

	    return addLeadingZeros(hours, token.length);
	  },
	  // Minute
	  m: function (date, token, localize) {
	    if (token === 'mo') {
	      return localize.ordinalNumber(date.getUTCMinutes(), {
	        unit: 'minute'
	      });
	    }

	    return formatters$1.m(date, token);
	  },
	  // Second
	  s: function (date, token, localize) {
	    if (token === 'so') {
	      return localize.ordinalNumber(date.getUTCSeconds(), {
	        unit: 'second'
	      });
	    }

	    return formatters$1.s(date, token);
	  },
	  // Fraction of second
	  S: function (date, token) {
	    return formatters$1.S(date, token);
	  },
	  // Timezone (ISO-8601. If offset is 0, output is always `'Z'`)
	  X: function (date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();

	    if (timezoneOffset === 0) {
	      return 'Z';
	    }

	    switch (token) {
	      // Hours and optional minutes
	      case 'X':
	        return formatTimezoneWithOptionalMinutes(timezoneOffset);
	      // Hours, minutes and optional seconds without `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `XX`

	      case 'XXXX':
	      case 'XX':
	        // Hours and minutes without `:` delimiter
	        return formatTimezone(timezoneOffset);
	      // Hours, minutes and optional seconds with `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `XXX`

	      case 'XXXXX':
	      case 'XXX': // Hours and minutes with `:` delimiter

	      default:
	        return formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (ISO-8601. If offset is 0, output is `'+00:00'` or equivalent)
	  x: function (date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();

	    switch (token) {
	      // Hours and optional minutes
	      case 'x':
	        return formatTimezoneWithOptionalMinutes(timezoneOffset);
	      // Hours, minutes and optional seconds without `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `xx`

	      case 'xxxx':
	      case 'xx':
	        // Hours and minutes without `:` delimiter
	        return formatTimezone(timezoneOffset);
	      // Hours, minutes and optional seconds with `:` delimiter
	      // Note: neither ISO-8601 nor JavaScript supports seconds in timezone offsets
	      // so this token always has the same output as `xxx`

	      case 'xxxxx':
	      case 'xxx': // Hours and minutes with `:` delimiter

	      default:
	        return formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (GMT)
	  O: function (date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();

	    switch (token) {
	      // Short
	      case 'O':
	      case 'OO':
	      case 'OOO':
	        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
	      // Long

	      case 'OOOO':
	      default:
	        return 'GMT' + formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Timezone (specific non-location)
	  z: function (date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timezoneOffset = originalDate.getTimezoneOffset();

	    switch (token) {
	      // Short
	      case 'z':
	      case 'zz':
	      case 'zzz':
	        return 'GMT' + formatTimezoneShort(timezoneOffset, ':');
	      // Long

	      case 'zzzz':
	      default:
	        return 'GMT' + formatTimezone(timezoneOffset, ':');
	    }
	  },
	  // Seconds timestamp
	  t: function (date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timestamp = Math.floor(originalDate.getTime() / 1000);
	    return addLeadingZeros(timestamp, token.length);
	  },
	  // Milliseconds timestamp
	  T: function (date, token, _localize, options) {
	    var originalDate = options._originalDate || date;
	    var timestamp = originalDate.getTime();
	    return addLeadingZeros(timestamp, token.length);
	  }
	};

	function formatTimezoneShort(offset, dirtyDelimiter) {
	  var sign = offset > 0 ? '-' : '+';
	  var absOffset = Math.abs(offset);
	  var hours = Math.floor(absOffset / 60);
	  var minutes = absOffset % 60;

	  if (minutes === 0) {
	    return sign + String(hours);
	  }

	  var delimiter = dirtyDelimiter || '';
	  return sign + String(hours) + delimiter + addLeadingZeros(minutes, 2);
	}

	function formatTimezoneWithOptionalMinutes(offset, dirtyDelimiter) {
	  if (offset % 60 === 0) {
	    var sign = offset > 0 ? '-' : '+';
	    return sign + addLeadingZeros(Math.abs(offset) / 60, 2);
	  }

	  return formatTimezone(offset, dirtyDelimiter);
	}

	function formatTimezone(offset, dirtyDelimiter) {
	  var delimiter = dirtyDelimiter || '';
	  var sign = offset > 0 ? '-' : '+';
	  var absOffset = Math.abs(offset);
	  var hours = addLeadingZeros(Math.floor(absOffset / 60), 2);
	  var minutes = addLeadingZeros(absOffset % 60, 2);
	  return sign + hours + delimiter + minutes;
	}

	function dateLongFormatter(pattern, formatLong) {
	  switch (pattern) {
	    case 'P':
	      return formatLong.date({
	        width: 'short'
	      });

	    case 'PP':
	      return formatLong.date({
	        width: 'medium'
	      });

	    case 'PPP':
	      return formatLong.date({
	        width: 'long'
	      });

	    case 'PPPP':
	    default:
	      return formatLong.date({
	        width: 'full'
	      });
	  }
	}

	function timeLongFormatter(pattern, formatLong) {
	  switch (pattern) {
	    case 'p':
	      return formatLong.time({
	        width: 'short'
	      });

	    case 'pp':
	      return formatLong.time({
	        width: 'medium'
	      });

	    case 'ppp':
	      return formatLong.time({
	        width: 'long'
	      });

	    case 'pppp':
	    default:
	      return formatLong.time({
	        width: 'full'
	      });
	  }
	}

	function dateTimeLongFormatter(pattern, formatLong) {
	  var matchResult = pattern.match(/(P+)(p+)?/);
	  var datePattern = matchResult[1];
	  var timePattern = matchResult[2];

	  if (!timePattern) {
	    return dateLongFormatter(pattern, formatLong);
	  }

	  var dateTimeFormat;

	  switch (datePattern) {
	    case 'P':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'short'
	      });
	      break;

	    case 'PP':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'medium'
	      });
	      break;

	    case 'PPP':
	      dateTimeFormat = formatLong.dateTime({
	        width: 'long'
	      });
	      break;

	    case 'PPPP':
	    default:
	      dateTimeFormat = formatLong.dateTime({
	        width: 'full'
	      });
	      break;
	  }

	  return dateTimeFormat.replace('{{date}}', dateLongFormatter(datePattern, formatLong)).replace('{{time}}', timeLongFormatter(timePattern, formatLong));
	}

	var longFormatters = {
	  p: timeLongFormatter,
	  P: dateTimeLongFormatter
	};

	var protectedDayOfYearTokens = ['D', 'DD'];
	var protectedWeekYearTokens = ['YY', 'YYYY'];
	function isProtectedDayOfYearToken(token) {
	  return protectedDayOfYearTokens.indexOf(token) !== -1;
	}
	function isProtectedWeekYearToken(token) {
	  return protectedWeekYearTokens.indexOf(token) !== -1;
	}
	function throwProtectedError(token, format, input) {
	  if (token === 'YYYY') {
	    throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
	  } else if (token === 'YY') {
	    throw new RangeError("Use `yy` instead of `YY` (in `".concat(format, "`) for formatting years to the input `").concat(input, "`; see: https://git.io/fxCyr"));
	  } else if (token === 'D') {
	    throw new RangeError("Use `d` instead of `D` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
	  } else if (token === 'DD') {
	    throw new RangeError("Use `dd` instead of `DD` (in `".concat(format, "`) for formatting days of the month to the input `").concat(input, "`; see: https://git.io/fxCyr"));
	  }
	}

	// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
	//   (one of the certain letters followed by `o`)
	// - (\w)\1* matches any sequences of the same letter
	// - '' matches two quote characters in a row
	// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
	//   except a single quote symbol, which ends the sequence.
	//   Two quote characters do not end the sequence.
	//   If there is no matching single quote
	//   then the sequence will continue until the end of the string.
	// - . matches any single character unmatched by previous parts of the RegExps

	var formattingTokensRegExp$1 = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
	// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

	var longFormattingTokensRegExp$1 = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
	var escapedStringRegExp$1 = /^'([^]*?)'?$/;
	var doubleQuoteRegExp$1 = /''/g;
	var unescapedLatinCharacterRegExp$1 = /[a-zA-Z]/;
	/**
	 * @name format
	 * @category Common Helpers
	 * @summary Format the date.
	 *
	 * @description
	 * Return the formatted date string in the given format. The result may vary by locale.
	 *
	 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
	 * > See: https://git.io/fxCyr
	 *
	 * The characters wrapped between two single quotes characters (') are escaped.
	 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
	 * (see the last example)
	 *
	 * Format of the string is based on Unicode Technical Standard #35:
	 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 * with a few additions (see note 7 below the table).
	 *
	 * Accepted patterns:
	 * | Unit                            | Pattern | Result examples                   | Notes |
	 * |---------------------------------|---------|-----------------------------------|-------|
	 * | Era                             | G..GGG  | AD, BC                            |       |
	 * |                                 | GGGG    | Anno Domini, Before Christ        | 2     |
	 * |                                 | GGGGG   | A, B                              |       |
	 * | Calendar year                   | y       | 44, 1, 1900, 2017                 | 5     |
	 * |                                 | yo      | 44th, 1st, 0th, 17th              | 5,7   |
	 * |                                 | yy      | 44, 01, 00, 17                    | 5     |
	 * |                                 | yyy     | 044, 001, 1900, 2017              | 5     |
	 * |                                 | yyyy    | 0044, 0001, 1900, 2017            | 5     |
	 * |                                 | yyyyy   | ...                               | 3,5   |
	 * | Local week-numbering year       | Y       | 44, 1, 1900, 2017                 | 5     |
	 * |                                 | Yo      | 44th, 1st, 1900th, 2017th         | 5,7   |
	 * |                                 | YY      | 44, 01, 00, 17                    | 5,8   |
	 * |                                 | YYY     | 044, 001, 1900, 2017              | 5     |
	 * |                                 | YYYY    | 0044, 0001, 1900, 2017            | 5,8   |
	 * |                                 | YYYYY   | ...                               | 3,5   |
	 * | ISO week-numbering year         | R       | -43, 0, 1, 1900, 2017             | 5,7   |
	 * |                                 | RR      | -43, 00, 01, 1900, 2017           | 5,7   |
	 * |                                 | RRR     | -043, 000, 001, 1900, 2017        | 5,7   |
	 * |                                 | RRRR    | -0043, 0000, 0001, 1900, 2017     | 5,7   |
	 * |                                 | RRRRR   | ...                               | 3,5,7 |
	 * | Extended year                   | u       | -43, 0, 1, 1900, 2017             | 5     |
	 * |                                 | uu      | -43, 01, 1900, 2017               | 5     |
	 * |                                 | uuu     | -043, 001, 1900, 2017             | 5     |
	 * |                                 | uuuu    | -0043, 0001, 1900, 2017           | 5     |
	 * |                                 | uuuuu   | ...                               | 3,5   |
	 * | Quarter (formatting)            | Q       | 1, 2, 3, 4                        |       |
	 * |                                 | Qo      | 1st, 2nd, 3rd, 4th                | 7     |
	 * |                                 | QQ      | 01, 02, 03, 04                    |       |
	 * |                                 | QQQ     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 | QQQQQ   | 1, 2, 3, 4                        | 4     |
	 * | Quarter (stand-alone)           | q       | 1, 2, 3, 4                        |       |
	 * |                                 | qo      | 1st, 2nd, 3rd, 4th                | 7     |
	 * |                                 | qq      | 01, 02, 03, 04                    |       |
	 * |                                 | qqq     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 | qqqqq   | 1, 2, 3, 4                        | 4     |
	 * | Month (formatting)              | M       | 1, 2, ..., 12                     |       |
	 * |                                 | Mo      | 1st, 2nd, ..., 12th               | 7     |
	 * |                                 | MM      | 01, 02, ..., 12                   |       |
	 * |                                 | MMM     | Jan, Feb, ..., Dec                |       |
	 * |                                 | MMMM    | January, February, ..., December  | 2     |
	 * |                                 | MMMMM   | J, F, ..., D                      |       |
	 * | Month (stand-alone)             | L       | 1, 2, ..., 12                     |       |
	 * |                                 | Lo      | 1st, 2nd, ..., 12th               | 7     |
	 * |                                 | LL      | 01, 02, ..., 12                   |       |
	 * |                                 | LLL     | Jan, Feb, ..., Dec                |       |
	 * |                                 | LLLL    | January, February, ..., December  | 2     |
	 * |                                 | LLLLL   | J, F, ..., D                      |       |
	 * | Local week of year              | w       | 1, 2, ..., 53                     |       |
	 * |                                 | wo      | 1st, 2nd, ..., 53th               | 7     |
	 * |                                 | ww      | 01, 02, ..., 53                   |       |
	 * | ISO week of year                | I       | 1, 2, ..., 53                     | 7     |
	 * |                                 | Io      | 1st, 2nd, ..., 53th               | 7     |
	 * |                                 | II      | 01, 02, ..., 53                   | 7     |
	 * | Day of month                    | d       | 1, 2, ..., 31                     |       |
	 * |                                 | do      | 1st, 2nd, ..., 31st               | 7     |
	 * |                                 | dd      | 01, 02, ..., 31                   |       |
	 * | Day of year                     | D       | 1, 2, ..., 365, 366               | 9     |
	 * |                                 | Do      | 1st, 2nd, ..., 365th, 366th       | 7     |
	 * |                                 | DD      | 01, 02, ..., 365, 366             | 9     |
	 * |                                 | DDD     | 001, 002, ..., 365, 366           |       |
	 * |                                 | DDDD    | ...                               | 3     |
	 * | Day of week (formatting)        | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | EEEEE   | M, T, W, T, F, S, S               |       |
	 * |                                 | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | ISO day of week (formatting)    | i       | 1, 2, 3, ..., 7                   | 7     |
	 * |                                 | io      | 1st, 2nd, ..., 7th                | 7     |
	 * |                                 | ii      | 01, 02, ..., 07                   | 7     |
	 * |                                 | iii     | Mon, Tue, Wed, ..., Sun           | 7     |
	 * |                                 | iiii    | Monday, Tuesday, ..., Sunday      | 2,7   |
	 * |                                 | iiiii   | M, T, W, T, F, S, S               | 7     |
	 * |                                 | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 7     |
	 * | Local day of week (formatting)  | e       | 2, 3, 4, ..., 1                   |       |
	 * |                                 | eo      | 2nd, 3rd, ..., 1st                | 7     |
	 * |                                 | ee      | 02, 03, ..., 01                   |       |
	 * |                                 | eee     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | eeeee   | M, T, W, T, F, S, S               |       |
	 * |                                 | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | Local day of week (stand-alone) | c       | 2, 3, 4, ..., 1                   |       |
	 * |                                 | co      | 2nd, 3rd, ..., 1st                | 7     |
	 * |                                 | cc      | 02, 03, ..., 01                   |       |
	 * |                                 | ccc     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 | ccccc   | M, T, W, T, F, S, S               |       |
	 * |                                 | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | AM, PM                          | a..aa   | AM, PM                            |       |
	 * |                                 | aaa     | am, pm                            |       |
	 * |                                 | aaaa    | a.m., p.m.                        | 2     |
	 * |                                 | aaaaa   | a, p                              |       |
	 * | AM, PM, noon, midnight          | b..bb   | AM, PM, noon, midnight            |       |
	 * |                                 | bbb     | am, pm, noon, midnight            |       |
	 * |                                 | bbbb    | a.m., p.m., noon, midnight        | 2     |
	 * |                                 | bbbbb   | a, p, n, mi                       |       |
	 * | Flexible day period             | B..BBB  | at night, in the morning, ...     |       |
	 * |                                 | BBBB    | at night, in the morning, ...     | 2     |
	 * |                                 | BBBBB   | at night, in the morning, ...     |       |
	 * | Hour [1-12]                     | h       | 1, 2, ..., 11, 12                 |       |
	 * |                                 | ho      | 1st, 2nd, ..., 11th, 12th         | 7     |
	 * |                                 | hh      | 01, 02, ..., 11, 12               |       |
	 * | Hour [0-23]                     | H       | 0, 1, 2, ..., 23                  |       |
	 * |                                 | Ho      | 0th, 1st, 2nd, ..., 23rd          | 7     |
	 * |                                 | HH      | 00, 01, 02, ..., 23               |       |
	 * | Hour [0-11]                     | K       | 1, 2, ..., 11, 0                  |       |
	 * |                                 | Ko      | 1st, 2nd, ..., 11th, 0th          | 7     |
	 * |                                 | KK      | 01, 02, ..., 11, 00               |       |
	 * | Hour [1-24]                     | k       | 24, 1, 2, ..., 23                 |       |
	 * |                                 | ko      | 24th, 1st, 2nd, ..., 23rd         | 7     |
	 * |                                 | kk      | 24, 01, 02, ..., 23               |       |
	 * | Minute                          | m       | 0, 1, ..., 59                     |       |
	 * |                                 | mo      | 0th, 1st, ..., 59th               | 7     |
	 * |                                 | mm      | 00, 01, ..., 59                   |       |
	 * | Second                          | s       | 0, 1, ..., 59                     |       |
	 * |                                 | so      | 0th, 1st, ..., 59th               | 7     |
	 * |                                 | ss      | 00, 01, ..., 59                   |       |
	 * | Fraction of second              | S       | 0, 1, ..., 9                      |       |
	 * |                                 | SS      | 00, 01, ..., 99                   |       |
	 * |                                 | SSS     | 000, 0001, ..., 999               |       |
	 * |                                 | SSSS    | ...                               | 3     |
	 * | Timezone (ISO-8601 w/ Z)        | X       | -08, +0530, Z                     |       |
	 * |                                 | XX      | -0800, +0530, Z                   |       |
	 * |                                 | XXX     | -08:00, +05:30, Z                 |       |
	 * |                                 | XXXX    | -0800, +0530, Z, +123456          | 2     |
	 * |                                 | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
	 * | Timezone (ISO-8601 w/o Z)       | x       | -08, +0530, +00                   |       |
	 * |                                 | xx      | -0800, +0530, +0000               |       |
	 * |                                 | xxx     | -08:00, +05:30, +00:00            | 2     |
	 * |                                 | xxxx    | -0800, +0530, +0000, +123456      |       |
	 * |                                 | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
	 * | Timezone (GMT)                  | O...OOO | GMT-8, GMT+5:30, GMT+0            |       |
	 * |                                 | OOOO    | GMT-08:00, GMT+05:30, GMT+00:00   | 2     |
	 * | Timezone (specific non-locat.)  | z...zzz | GMT-8, GMT+5:30, GMT+0            | 6     |
	 * |                                 | zzzz    | GMT-08:00, GMT+05:30, GMT+00:00   | 2,6   |
	 * | Seconds timestamp               | t       | 512969520                         | 7     |
	 * |                                 | tt      | ...                               | 3,7   |
	 * | Milliseconds timestamp          | T       | 512969520900                      | 7     |
	 * |                                 | TT      | ...                               | 3,7   |
	 * | Long localized date             | P       | 04/29/1453                        | 7     |
	 * |                                 | PP      | Apr 29, 1453                      | 7     |
	 * |                                 | PPP     | April 29th, 1453                  | 7     |
	 * |                                 | PPPP    | Friday, April 29th, 1453          | 2,7   |
	 * | Long localized time             | p       | 12:00 AM                          | 7     |
	 * |                                 | pp      | 12:00:00 AM                       | 7     |
	 * |                                 | ppp     | 12:00:00 AM GMT+2                 | 7     |
	 * |                                 | pppp    | 12:00:00 AM GMT+02:00             | 2,7   |
	 * | Combination of date and time    | Pp      | 04/29/1453, 12:00 AM              | 7     |
	 * |                                 | PPpp    | Apr 29, 1453, 12:00:00 AM         | 7     |
	 * |                                 | PPPppp  | April 29th, 1453 at ...           | 7     |
	 * |                                 | PPPPpppp| Friday, April 29th, 1453 at ...   | 2,7   |
	 * Notes:
	 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
	 *    are the same as "stand-alone" units, but are different in some languages.
	 *    "Formatting" units are declined according to the rules of the language
	 *    in the context of a date. "Stand-alone" units are always nominative singular:
	 *
	 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
	 *
	 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
	 *
	 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
	 *    the single quote characters (see below).
	 *    If the sequence is longer than listed in table (e.g. `EEEEEEEEEEE`)
	 *    the output will be the same as default pattern for this unit, usually
	 *    the longest one (in case of ISO weekdays, `EEEE`). Default patterns for units
	 *    are marked with "2" in the last column of the table.
	 *
	 *    `format(new Date(2017, 10, 6), 'MMM') //=> 'Nov'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMM') //=> 'November'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMM') //=> 'N'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMMM') //=> 'November'`
	 *
	 *    `format(new Date(2017, 10, 6), 'MMMMMMM') //=> 'November'`
	 *
	 * 3. Some patterns could be unlimited length (such as `yyyyyyyy`).
	 *    The output will be padded with zeros to match the length of the pattern.
	 *
	 *    `format(new Date(2017, 10, 6), 'yyyyyyyy') //=> '00002017'`
	 *
	 * 4. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
	 *    These tokens represent the shortest form of the quarter.
	 *
	 * 5. The main difference between `y` and `u` patterns are B.C. years:
	 *
	 *    | Year | `y` | `u` |
	 *    |------|-----|-----|
	 *    | AC 1 |   1 |   1 |
	 *    | BC 1 |   1 |   0 |
	 *    | BC 2 |   2 |  -1 |
	 *
	 *    Also `yy` always returns the last two digits of a year,
	 *    while `uu` pads single digit years to 2 characters and returns other years unchanged:
	 *
	 *    | Year | `yy` | `uu` |
	 *    |------|------|------|
	 *    | 1    |   01 |   01 |
	 *    | 14   |   14 |   14 |
	 *    | 376  |   76 |  376 |
	 *    | 1453 |   53 | 1453 |
	 *
	 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
	 *    except local week-numbering years are dependent on `options.weekStartsOn`
	 *    and `options.firstWeekContainsDate` (compare [getISOWeekYear]{@link https://date-fns.org/docs/getISOWeekYear}
	 *    and [getWeekYear]{@link https://date-fns.org/docs/getWeekYear}).
	 *
	 * 6. Specific non-location timezones are currently unavailable in `date-fns`,
	 *    so right now these tokens fall back to GMT timezones.
	 *
	 * 7. These patterns are not in the Unicode Technical Standard #35:
	 *    - `i`: ISO day of week
	 *    - `I`: ISO week of year
	 *    - `R`: ISO week-numbering year
	 *    - `t`: seconds timestamp
	 *    - `T`: milliseconds timestamp
	 *    - `o`: ordinal number modifier
	 *    - `P`: long localized date
	 *    - `p`: long localized time
	 *
	 * 8. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
	 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
	 *
	 * 9. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
	 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * - The second argument is now required for the sake of explicitness.
	 *
	 *   ```javascript
	 *   // Before v2.0.0
	 *   format(new Date(2016, 0, 1))
	 *
	 *   // v2.0.0 onward
	 *   format(new Date(2016, 0, 1), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx")
	 *   ```
	 *
	 * - New format string API for `format` function
	 *   which is based on [Unicode Technical Standard #35](https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table).
	 *   See [this post](https://blog.date-fns.org/post/unicode-tokens-in-date-fns-v2-sreatyki91jg) for more details.
	 *
	 * - Characters are now escaped using single quote symbols (`'`) instead of square brackets.
	 *
	 * @param {Date|Number} date - the original date
	 * @param {String} format - the string of tokens
	 * @param {Object} [options] - an object with options.
	 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
	 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
	 * @param {Number} [options.firstWeekContainsDate=1] - the day of January, which is
	 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
	 *   see: https://git.io/fxCyr
	 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
	 *   see: https://git.io/fxCyr
	 * @returns {String} the formatted date string
	 * @throws {TypeError} 2 arguments required
	 * @throws {RangeError} `date` must not be Invalid Date
	 * @throws {RangeError} `options.locale` must contain `localize` property
	 * @throws {RangeError} `options.locale` must contain `formatLong` property
	 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
	 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
	 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} format string contains an unescaped latin alphabet character
	 *
	 * @example
	 * // Represent 11 February 2014 in middle-endian format:
	 * var result = format(new Date(2014, 1, 11), 'MM/dd/yyyy')
	 * //=> '02/11/2014'
	 *
	 * @example
	 * // Represent 2 July 2014 in Esperanto:
	 * import { eoLocale } from 'date-fns/locale/eo'
	 * var result = format(new Date(2014, 6, 2), "do 'de' MMMM yyyy", {
	 *   locale: eoLocale
	 * })
	 * //=> '2-a de julio 2014'
	 *
	 * @example
	 * // Escape string by single quote characters:
	 * var result = format(new Date(2014, 6, 2, 15), "h 'o''clock'")
	 * //=> "3 o'clock"
	 */

	function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
	  requiredArgs(2, arguments);
	  var formatStr = String(dirtyFormatStr);
	  var options = dirtyOptions || {};
	  var locale$1 = options.locale || locale;
	  var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
	  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
	  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }

	  var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
	  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
	  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }

	  if (!locale$1.localize) {
	    throw new RangeError('locale must contain localize property');
	  }

	  if (!locale$1.formatLong) {
	    throw new RangeError('locale must contain formatLong property');
	  }

	  var originalDate = toDate(dirtyDate);

	  if (!isValid(originalDate)) {
	    throw new RangeError('Invalid time value');
	  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
	  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
	  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/376


	  var timezoneOffset = getTimezoneOffsetInMilliseconds(originalDate);
	  var utcDate = subMilliseconds(originalDate, timezoneOffset);
	  var formatterOptions = {
	    firstWeekContainsDate: firstWeekContainsDate,
	    weekStartsOn: weekStartsOn,
	    locale: locale$1,
	    _originalDate: originalDate
	  };
	  var result = formatStr.match(longFormattingTokensRegExp$1).map(function (substring) {
	    var firstCharacter = substring[0];

	    if (firstCharacter === 'p' || firstCharacter === 'P') {
	      var longFormatter = longFormatters[firstCharacter];
	      return longFormatter(substring, locale$1.formatLong, formatterOptions);
	    }

	    return substring;
	  }).join('').match(formattingTokensRegExp$1).map(function (substring) {
	    // Replace two single quote characters with one single quote character
	    if (substring === "''") {
	      return "'";
	    }

	    var firstCharacter = substring[0];

	    if (firstCharacter === "'") {
	      return cleanEscapedString$1(substring);
	    }

	    var formatter = formatters[firstCharacter];

	    if (formatter) {
	      if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(substring)) {
	        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
	      }

	      if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(substring)) {
	        throwProtectedError(substring, dirtyFormatStr, dirtyDate);
	      }

	      return formatter(utcDate, substring, locale$1.localize, formatterOptions);
	    }

	    if (firstCharacter.match(unescapedLatinCharacterRegExp$1)) {
	      throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
	    }

	    return substring;
	  }).join('');
	  return result;
	}

	function cleanEscapedString$1(input) {
	  return input.match(escapedStringRegExp$1)[1].replace(doubleQuoteRegExp$1, "'");
	}

	function assign(target, dirtyObject) {
	  if (target == null) {
	    throw new TypeError('assign requires that input parameter not be null or undefined');
	  }

	  dirtyObject = dirtyObject || {};

	  for (var property in dirtyObject) {
	    if (dirtyObject.hasOwnProperty(property)) {
	      target[property] = dirtyObject[property];
	    }
	  }

	  return target;
	}

	/**
	 * @name getDate
	 * @category Day Helpers
	 * @summary Get the day of the month of the given date.
	 *
	 * @description
	 * Get the day of the month of the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the given date
	 * @returns {Number} the day of month
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Which day of the month is 29 February 2012?
	 * const result = getDate(new Date(2012, 1, 29))
	 * //=> 29
	 */

	function getDate(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var dayOfMonth = date.getDate();
	  return dayOfMonth;
	}

	/**
	 * @name getHours
	 * @category Hour Helpers
	 * @summary Get the hours of the given date.
	 *
	 * @description
	 * Get the hours of the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the given date
	 * @returns {Number} the hours
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Get the hours of 29 February 2012 11:45:00:
	 * const result = getHours(new Date(2012, 1, 29, 11, 45))
	 * //=> 11
	 */

	function getHours(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var hours = date.getHours();
	  return hours;
	}

	/**
	 * @name getMinutes
	 * @category Minute Helpers
	 * @summary Get the minutes of the given date.
	 *
	 * @description
	 * Get the minutes of the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the given date
	 * @returns {Number} the minutes
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Get the minutes of 29 February 2012 11:45:05:
	 * const result = getMinutes(new Date(2012, 1, 29, 11, 45, 5))
	 * //=> 45
	 */

	function getMinutes(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var minutes = date.getMinutes();
	  return minutes;
	}

	/**
	 * @name getMonth
	 * @category Month Helpers
	 * @summary Get the month of the given date.
	 *
	 * @description
	 * Get the month of the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the given date
	 * @returns {Number} the month
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Which month is 29 February 2012?
	 * const result = getMonth(new Date(2012, 1, 29))
	 * //=> 1
	 */

	function getMonth(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var month = date.getMonth();
	  return month;
	}

	/**
	 * @name getSeconds
	 * @category Second Helpers
	 * @summary Get the seconds of the given date.
	 *
	 * @description
	 * Get the seconds of the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the given date
	 * @returns {Number} the seconds
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Get the seconds of 29 February 2012 11:45:05.123:
	 * const result = getSeconds(new Date(2012, 1, 29, 11, 45, 5, 123))
	 * //=> 5
	 */

	function getSeconds(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var seconds = date.getSeconds();
	  return seconds;
	}

	/**
	 * @name getYear
	 * @category Year Helpers
	 * @summary Get the year of the given date.
	 *
	 * @description
	 * Get the year of the given date.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {Date|Number} date - the given date
	 * @returns {Number} the year
	 * @throws {TypeError} 1 argument required
	 *
	 * @example
	 * // Which year is 2 July 2014?
	 * const result = getYear(new Date(2014, 6, 2))
	 * //=> 2014
	 */

	function getYear(dirtyDate) {
	  requiredArgs(1, arguments);
	  var date = toDate(dirtyDate);
	  var year = date.getFullYear();
	  return year;
	}

	/**
	 * @name isDate
	 * @category Common Helpers
	 * @summary Is the given value a date?
	 *
	 * @description
	 * Returns true if the given value is an instance of Date. The function works for dates transferred across iframes.
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * @param {*} value - the value to check
	 * @returns {boolean} true if the given value is a date
	 * @throws {TypeError} 1 arguments required
	 *
	 * @example
	 * // For a valid date:
	 * var result = isDate(new Date())
	 * //=> true
	 *
	 * @example
	 * // For an invalid date:
	 * var result = isDate(new Date(NaN))
	 * //=> true
	 *
	 * @example
	 * // For some value:
	 * var result = isDate('2014-02-31')
	 * //=> false
	 *
	 * @example
	 * // For an object:
	 * var result = isDate({})
	 * //=> false
	 */

	function isDate(value) {
	  requiredArgs(1, arguments);
	  return value instanceof Date || typeof value === 'object' && Object.prototype.toString.call(value) === '[object Date]';
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function setUTCDay(dirtyDate, dirtyDay, dirtyOptions) {
	  requiredArgs(2, arguments);
	  var options = dirtyOptions || {};
	  var locale = options.locale;
	  var localeWeekStartsOn = locale && locale.options && locale.options.weekStartsOn;
	  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
	  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }

	  var date = toDate(dirtyDate);
	  var day = toInteger(dirtyDay);
	  var currentDay = date.getUTCDay();
	  var remainder = day % 7;
	  var dayIndex = (remainder + 7) % 7;
	  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
	  date.setUTCDate(date.getUTCDate() + diff);
	  return date;
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function setUTCISODay(dirtyDate, dirtyDay) {
	  requiredArgs(2, arguments);
	  var day = toInteger(dirtyDay);

	  if (day % 7 === 0) {
	    day = day - 7;
	  }

	  var weekStartsOn = 1;
	  var date = toDate(dirtyDate);
	  var currentDay = date.getUTCDay();
	  var remainder = day % 7;
	  var dayIndex = (remainder + 7) % 7;
	  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
	  date.setUTCDate(date.getUTCDate() + diff);
	  return date;
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function setUTCISOWeek(dirtyDate, dirtyISOWeek) {
	  requiredArgs(2, arguments);
	  var date = toDate(dirtyDate);
	  var isoWeek = toInteger(dirtyISOWeek);
	  var diff = getUTCISOWeek(date) - isoWeek;
	  date.setUTCDate(date.getUTCDate() - diff * 7);
	  return date;
	}

	// See issue: https://github.com/date-fns/date-fns/issues/376

	function setUTCWeek(dirtyDate, dirtyWeek, options) {
	  requiredArgs(2, arguments);
	  var date = toDate(dirtyDate);
	  var week = toInteger(dirtyWeek);
	  var diff = getUTCWeek(date, options) - week;
	  date.setUTCDate(date.getUTCDate() - diff * 7);
	  return date;
	}

	var MILLISECONDS_IN_HOUR = 3600000;
	var MILLISECONDS_IN_MINUTE = 60000;
	var MILLISECONDS_IN_SECOND = 1000;
	var numericPatterns = {
	  month: /^(1[0-2]|0?\d)/,
	  // 0 to 12
	  date: /^(3[0-1]|[0-2]?\d)/,
	  // 0 to 31
	  dayOfYear: /^(36[0-6]|3[0-5]\d|[0-2]?\d?\d)/,
	  // 0 to 366
	  week: /^(5[0-3]|[0-4]?\d)/,
	  // 0 to 53
	  hour23h: /^(2[0-3]|[0-1]?\d)/,
	  // 0 to 23
	  hour24h: /^(2[0-4]|[0-1]?\d)/,
	  // 0 to 24
	  hour11h: /^(1[0-1]|0?\d)/,
	  // 0 to 11
	  hour12h: /^(1[0-2]|0?\d)/,
	  // 0 to 12
	  minute: /^[0-5]?\d/,
	  // 0 to 59
	  second: /^[0-5]?\d/,
	  // 0 to 59
	  singleDigit: /^\d/,
	  // 0 to 9
	  twoDigits: /^\d{1,2}/,
	  // 0 to 99
	  threeDigits: /^\d{1,3}/,
	  // 0 to 999
	  fourDigits: /^\d{1,4}/,
	  // 0 to 9999
	  anyDigitsSigned: /^-?\d+/,
	  singleDigitSigned: /^-?\d/,
	  // 0 to 9, -0 to -9
	  twoDigitsSigned: /^-?\d{1,2}/,
	  // 0 to 99, -0 to -99
	  threeDigitsSigned: /^-?\d{1,3}/,
	  // 0 to 999, -0 to -999
	  fourDigitsSigned: /^-?\d{1,4}/ // 0 to 9999, -0 to -9999

	};
	var timezonePatterns = {
	  basicOptionalMinutes: /^([+-])(\d{2})(\d{2})?|Z/,
	  basic: /^([+-])(\d{2})(\d{2})|Z/,
	  basicOptionalSeconds: /^([+-])(\d{2})(\d{2})((\d{2}))?|Z/,
	  extended: /^([+-])(\d{2}):(\d{2})|Z/,
	  extendedOptionalSeconds: /^([+-])(\d{2}):(\d{2})(:(\d{2}))?|Z/
	};

	function parseNumericPattern(pattern, string, valueCallback) {
	  var matchResult = string.match(pattern);

	  if (!matchResult) {
	    return null;
	  }

	  var value = parseInt(matchResult[0], 10);
	  return {
	    value: valueCallback ? valueCallback(value) : value,
	    rest: string.slice(matchResult[0].length)
	  };
	}

	function parseTimezonePattern(pattern, string) {
	  var matchResult = string.match(pattern);

	  if (!matchResult) {
	    return null;
	  } // Input is 'Z'


	  if (matchResult[0] === 'Z') {
	    return {
	      value: 0,
	      rest: string.slice(1)
	    };
	  }

	  var sign = matchResult[1] === '+' ? 1 : -1;
	  var hours = matchResult[2] ? parseInt(matchResult[2], 10) : 0;
	  var minutes = matchResult[3] ? parseInt(matchResult[3], 10) : 0;
	  var seconds = matchResult[5] ? parseInt(matchResult[5], 10) : 0;
	  return {
	    value: sign * (hours * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * MILLISECONDS_IN_SECOND),
	    rest: string.slice(matchResult[0].length)
	  };
	}

	function parseAnyDigitsSigned(string, valueCallback) {
	  return parseNumericPattern(numericPatterns.anyDigitsSigned, string, valueCallback);
	}

	function parseNDigits(n, string, valueCallback) {
	  switch (n) {
	    case 1:
	      return parseNumericPattern(numericPatterns.singleDigit, string, valueCallback);

	    case 2:
	      return parseNumericPattern(numericPatterns.twoDigits, string, valueCallback);

	    case 3:
	      return parseNumericPattern(numericPatterns.threeDigits, string, valueCallback);

	    case 4:
	      return parseNumericPattern(numericPatterns.fourDigits, string, valueCallback);

	    default:
	      return parseNumericPattern(new RegExp('^\\d{1,' + n + '}'), string, valueCallback);
	  }
	}

	function parseNDigitsSigned(n, string, valueCallback) {
	  switch (n) {
	    case 1:
	      return parseNumericPattern(numericPatterns.singleDigitSigned, string, valueCallback);

	    case 2:
	      return parseNumericPattern(numericPatterns.twoDigitsSigned, string, valueCallback);

	    case 3:
	      return parseNumericPattern(numericPatterns.threeDigitsSigned, string, valueCallback);

	    case 4:
	      return parseNumericPattern(numericPatterns.fourDigitsSigned, string, valueCallback);

	    default:
	      return parseNumericPattern(new RegExp('^-?\\d{1,' + n + '}'), string, valueCallback);
	  }
	}

	function dayPeriodEnumToHours(enumValue) {
	  switch (enumValue) {
	    case 'morning':
	      return 4;

	    case 'evening':
	      return 17;

	    case 'pm':
	    case 'noon':
	    case 'afternoon':
	      return 12;

	    case 'am':
	    case 'midnight':
	    case 'night':
	    default:
	      return 0;
	  }
	}

	function normalizeTwoDigitYear(twoDigitYear, currentYear) {
	  var isCommonEra = currentYear > 0; // Absolute number of the current year:
	  // 1 -> 1 AC
	  // 0 -> 1 BC
	  // -1 -> 2 BC

	  var absCurrentYear = isCommonEra ? currentYear : 1 - currentYear;
	  var result;

	  if (absCurrentYear <= 50) {
	    result = twoDigitYear || 100;
	  } else {
	    var rangeEnd = absCurrentYear + 50;
	    var rangeEndCentury = Math.floor(rangeEnd / 100) * 100;
	    var isPreviousCentury = twoDigitYear >= rangeEnd % 100;
	    result = twoDigitYear + rangeEndCentury - (isPreviousCentury ? 100 : 0);
	  }

	  return isCommonEra ? result : 1 - result;
	}

	var DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
	var DAYS_IN_MONTH_LEAP_YEAR = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // User for validation

	function isLeapYearIndex(year) {
	  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
	}
	/*
	 * |     | Unit                           |     | Unit                           |
	 * |-----|--------------------------------|-----|--------------------------------|
	 * |  a  | AM, PM                         |  A* | Milliseconds in day            |
	 * |  b  | AM, PM, noon, midnight         |  B  | Flexible day period            |
	 * |  c  | Stand-alone local day of week  |  C* | Localized hour w/ day period   |
	 * |  d  | Day of month                   |  D  | Day of year                    |
	 * |  e  | Local day of week              |  E  | Day of week                    |
	 * |  f  |                                |  F* | Day of week in month           |
	 * |  g* | Modified Julian day            |  G  | Era                            |
	 * |  h  | Hour [1-12]                    |  H  | Hour [0-23]                    |
	 * |  i! | ISO day of week                |  I! | ISO week of year               |
	 * |  j* | Localized hour w/ day period   |  J* | Localized hour w/o day period  |
	 * |  k  | Hour [1-24]                    |  K  | Hour [0-11]                    |
	 * |  l* | (deprecated)                   |  L  | Stand-alone month              |
	 * |  m  | Minute                         |  M  | Month                          |
	 * |  n  |                                |  N  |                                |
	 * |  o! | Ordinal number modifier        |  O* | Timezone (GMT)                 |
	 * |  p  |                                |  P  |                                |
	 * |  q  | Stand-alone quarter            |  Q  | Quarter                        |
	 * |  r* | Related Gregorian year         |  R! | ISO week-numbering year        |
	 * |  s  | Second                         |  S  | Fraction of second             |
	 * |  t! | Seconds timestamp              |  T! | Milliseconds timestamp         |
	 * |  u  | Extended year                  |  U* | Cyclic year                    |
	 * |  v* | Timezone (generic non-locat.)  |  V* | Timezone (location)            |
	 * |  w  | Local week of year             |  W* | Week of month                  |
	 * |  x  | Timezone (ISO-8601 w/o Z)      |  X  | Timezone (ISO-8601)            |
	 * |  y  | Year (abs)                     |  Y  | Local week-numbering year      |
	 * |  z* | Timezone (specific non-locat.) |  Z* | Timezone (aliases)             |
	 *
	 * Letters marked by * are not implemented but reserved by Unicode standard.
	 *
	 * Letters marked by ! are non-standard, but implemented by date-fns:
	 * - `o` modifies the previous token to turn it into an ordinal (see `parse` docs)
	 * - `i` is ISO day of week. For `i` and `ii` is returns numeric ISO week days,
	 *   i.e. 7 for Sunday, 1 for Monday, etc.
	 * - `I` is ISO week of year, as opposed to `w` which is local week of year.
	 * - `R` is ISO week-numbering year, as opposed to `Y` which is local week-numbering year.
	 *   `R` is supposed to be used in conjunction with `I` and `i`
	 *   for universal ISO week-numbering date, whereas
	 *   `Y` is supposed to be used in conjunction with `w` and `e`
	 *   for week-numbering date specific to the locale.
	 */


	var parsers = {
	  // Era
	  G: {
	    priority: 140,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        // AD, BC
	        case 'G':
	        case 'GG':
	        case 'GGG':
	          return match.era(string, {
	            width: 'abbreviated'
	          }) || match.era(string, {
	            width: 'narrow'
	          });
	        // A, B

	        case 'GGGGG':
	          return match.era(string, {
	            width: 'narrow'
	          });
	        // Anno Domini, Before Christ

	        case 'GGGG':
	        default:
	          return match.era(string, {
	            width: 'wide'
	          }) || match.era(string, {
	            width: 'abbreviated'
	          }) || match.era(string, {
	            width: 'narrow'
	          });
	      }
	    },
	    set: function (date, flags, value, _options) {
	      flags.era = value;
	      date.setUTCFullYear(value, 0, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['R', 'u', 't', 'T']
	  },
	  // Year
	  y: {
	    // From http://www.unicode.org/reports/tr35/tr35-31/tr35-dates.html#Date_Format_Patterns
	    // | Year     |     y | yy |   yyy |  yyyy | yyyyy |
	    // |----------|-------|----|-------|-------|-------|
	    // | AD 1     |     1 | 01 |   001 |  0001 | 00001 |
	    // | AD 12    |    12 | 12 |   012 |  0012 | 00012 |
	    // | AD 123   |   123 | 23 |   123 |  0123 | 00123 |
	    // | AD 1234  |  1234 | 34 |  1234 |  1234 | 01234 |
	    // | AD 12345 | 12345 | 45 | 12345 | 12345 | 12345 |
	    priority: 130,
	    parse: function (string, token, match, _options) {
	      var valueCallback = function (year) {
	        return {
	          year: year,
	          isTwoDigitYear: token === 'yy'
	        };
	      };

	      switch (token) {
	        case 'y':
	          return parseNDigits(4, string, valueCallback);

	        case 'yo':
	          return match.ordinalNumber(string, {
	            unit: 'year',
	            valueCallback: valueCallback
	          });

	        default:
	          return parseNDigits(token.length, string, valueCallback);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value.isTwoDigitYear || value.year > 0;
	    },
	    set: function (date, flags, value, _options) {
	      var currentYear = date.getUTCFullYear();

	      if (value.isTwoDigitYear) {
	        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
	        date.setUTCFullYear(normalizedTwoDigitYear, 0, 1);
	        date.setUTCHours(0, 0, 0, 0);
	        return date;
	      }

	      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
	      date.setUTCFullYear(year, 0, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'u', 'w', 'I', 'i', 'e', 'c', 't', 'T']
	  },
	  // Local week-numbering year
	  Y: {
	    priority: 130,
	    parse: function (string, token, match, _options) {
	      var valueCallback = function (year) {
	        return {
	          year: year,
	          isTwoDigitYear: token === 'YY'
	        };
	      };

	      switch (token) {
	        case 'Y':
	          return parseNDigits(4, string, valueCallback);

	        case 'Yo':
	          return match.ordinalNumber(string, {
	            unit: 'year',
	            valueCallback: valueCallback
	          });

	        default:
	          return parseNDigits(token.length, string, valueCallback);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value.isTwoDigitYear || value.year > 0;
	    },
	    set: function (date, flags, value, options) {
	      var currentYear = getUTCWeekYear(date, options);

	      if (value.isTwoDigitYear) {
	        var normalizedTwoDigitYear = normalizeTwoDigitYear(value.year, currentYear);
	        date.setUTCFullYear(normalizedTwoDigitYear, 0, options.firstWeekContainsDate);
	        date.setUTCHours(0, 0, 0, 0);
	        return startOfUTCWeek(date, options);
	      }

	      var year = !('era' in flags) || flags.era === 1 ? value.year : 1 - value.year;
	      date.setUTCFullYear(year, 0, options.firstWeekContainsDate);
	      date.setUTCHours(0, 0, 0, 0);
	      return startOfUTCWeek(date, options);
	    },
	    incompatibleTokens: ['y', 'R', 'u', 'Q', 'q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
	  },
	  // ISO week-numbering year
	  R: {
	    priority: 130,
	    parse: function (string, token, _match, _options) {
	      if (token === 'R') {
	        return parseNDigitsSigned(4, string);
	      }

	      return parseNDigitsSigned(token.length, string);
	    },
	    set: function (_date, _flags, value, _options) {
	      var firstWeekOfYear = new Date(0);
	      firstWeekOfYear.setUTCFullYear(value, 0, 4);
	      firstWeekOfYear.setUTCHours(0, 0, 0, 0);
	      return startOfUTCISOWeek(firstWeekOfYear);
	    },
	    incompatibleTokens: ['G', 'y', 'Y', 'u', 'Q', 'q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
	  },
	  // Extended year
	  u: {
	    priority: 130,
	    parse: function (string, token, _match, _options) {
	      if (token === 'u') {
	        return parseNDigitsSigned(4, string);
	      }

	      return parseNDigitsSigned(token.length, string);
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCFullYear(value, 0, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['G', 'y', 'Y', 'R', 'w', 'I', 'i', 'e', 'c', 't', 'T']
	  },
	  // Quarter
	  Q: {
	    priority: 120,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        // 1, 2, 3, 4
	        case 'Q':
	        case 'QQ':
	          // 01, 02, 03, 04
	          return parseNDigits(token.length, string);
	        // 1st, 2nd, 3rd, 4th

	        case 'Qo':
	          return match.ordinalNumber(string, {
	            unit: 'quarter'
	          });
	        // Q1, Q2, Q3, Q4

	        case 'QQQ':
	          return match.quarter(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.quarter(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

	        case 'QQQQQ':
	          return match.quarter(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // 1st quarter, 2nd quarter, ...

	        case 'QQQQ':
	        default:
	          return match.quarter(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.quarter(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.quarter(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 1 && value <= 4;
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCMonth((value - 1) * 3, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Stand-alone quarter
	  q: {
	    priority: 120,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        // 1, 2, 3, 4
	        case 'q':
	        case 'qq':
	          // 01, 02, 03, 04
	          return parseNDigits(token.length, string);
	        // 1st, 2nd, 3rd, 4th

	        case 'qo':
	          return match.ordinalNumber(string, {
	            unit: 'quarter'
	          });
	        // Q1, Q2, Q3, Q4

	        case 'qqq':
	          return match.quarter(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.quarter(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // 1, 2, 3, 4 (narrow quarter; could be not numerical)

	        case 'qqqqq':
	          return match.quarter(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // 1st quarter, 2nd quarter, ...

	        case 'qqqq':
	        default:
	          return match.quarter(string, {
	            width: 'wide',
	            context: 'standalone'
	          }) || match.quarter(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.quarter(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 1 && value <= 4;
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCMonth((value - 1) * 3, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'Q', 'M', 'L', 'w', 'I', 'd', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Month
	  M: {
	    priority: 110,
	    parse: function (string, token, match, _options) {
	      var valueCallback = function (value) {
	        return value - 1;
	      };

	      switch (token) {
	        // 1, 2, ..., 12
	        case 'M':
	          return parseNumericPattern(numericPatterns.month, string, valueCallback);
	        // 01, 02, ..., 12

	        case 'MM':
	          return parseNDigits(2, string, valueCallback);
	        // 1st, 2nd, ..., 12th

	        case 'Mo':
	          return match.ordinalNumber(string, {
	            unit: 'month',
	            valueCallback: valueCallback
	          });
	        // Jan, Feb, ..., Dec

	        case 'MMM':
	          return match.month(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.month(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // J, F, ..., D

	        case 'MMMMM':
	          return match.month(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // January, February, ..., December

	        case 'MMMM':
	        default:
	          return match.month(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.month(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.month(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 11;
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCMonth(value, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'L', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Stand-alone month
	  L: {
	    priority: 110,
	    parse: function (string, token, match, _options) {
	      var valueCallback = function (value) {
	        return value - 1;
	      };

	      switch (token) {
	        // 1, 2, ..., 12
	        case 'L':
	          return parseNumericPattern(numericPatterns.month, string, valueCallback);
	        // 01, 02, ..., 12

	        case 'LL':
	          return parseNDigits(2, string, valueCallback);
	        // 1st, 2nd, ..., 12th

	        case 'Lo':
	          return match.ordinalNumber(string, {
	            unit: 'month',
	            valueCallback: valueCallback
	          });
	        // Jan, Feb, ..., Dec

	        case 'LLL':
	          return match.month(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.month(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // J, F, ..., D

	        case 'LLLLL':
	          return match.month(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // January, February, ..., December

	        case 'LLLL':
	        default:
	          return match.month(string, {
	            width: 'wide',
	            context: 'standalone'
	          }) || match.month(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.month(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 11;
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCMonth(value, 1);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Local week of year
	  w: {
	    priority: 100,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'w':
	          return parseNumericPattern(numericPatterns.week, string);

	        case 'wo':
	          return match.ordinalNumber(string, {
	            unit: 'week'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 1 && value <= 53;
	    },
	    set: function (date, _flags, value, options) {
	      return startOfUTCWeek(setUTCWeek(date, value, options), options);
	    },
	    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'i', 't', 'T']
	  },
	  // ISO week of year
	  I: {
	    priority: 100,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'I':
	          return parseNumericPattern(numericPatterns.week, string);

	        case 'Io':
	          return match.ordinalNumber(string, {
	            unit: 'week'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 1 && value <= 53;
	    },
	    set: function (date, _flags, value, options) {
	      return startOfUTCISOWeek(setUTCISOWeek(date, value, options), options);
	    },
	    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'e', 'c', 't', 'T']
	  },
	  // Day of the month
	  d: {
	    priority: 90,
	    subPriority: 1,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'd':
	          return parseNumericPattern(numericPatterns.date, string);

	        case 'do':
	          return match.ordinalNumber(string, {
	            unit: 'date'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (date, value, _options) {
	      var year = date.getUTCFullYear();
	      var isLeapYear = isLeapYearIndex(year);
	      var month = date.getUTCMonth();

	      if (isLeapYear) {
	        return value >= 1 && value <= DAYS_IN_MONTH_LEAP_YEAR[month];
	      } else {
	        return value >= 1 && value <= DAYS_IN_MONTH[month];
	      }
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCDate(value);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'w', 'I', 'D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Day of year
	  D: {
	    priority: 90,
	    subPriority: 1,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'D':
	        case 'DD':
	          return parseNumericPattern(numericPatterns.dayOfYear, string);

	        case 'Do':
	          return match.ordinalNumber(string, {
	            unit: 'date'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (date, value, _options) {
	      var year = date.getUTCFullYear();
	      var isLeapYear = isLeapYearIndex(year);

	      if (isLeapYear) {
	        return value >= 1 && value <= 366;
	      } else {
	        return value >= 1 && value <= 365;
	      }
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCMonth(0, value);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['Y', 'R', 'q', 'Q', 'M', 'L', 'w', 'I', 'd', 'E', 'i', 'e', 'c', 't', 'T']
	  },
	  // Day of week
	  E: {
	    priority: 90,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        // Tue
	        case 'E':
	        case 'EE':
	        case 'EEE':
	          return match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // T

	        case 'EEEEE':
	          return match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // Tu

	        case 'EEEEEE':
	          return match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // Tuesday

	        case 'EEEE':
	        default:
	          return match.day(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 6;
	    },
	    set: function (date, _flags, value, options) {
	      date = setUTCDay(date, value, options);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['D', 'i', 'e', 'c', 't', 'T']
	  },
	  // Local day of week
	  e: {
	    priority: 90,
	    parse: function (string, token, match, options) {
	      var valueCallback = function (value) {
	        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
	        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
	      };

	      switch (token) {
	        // 3
	        case 'e':
	        case 'ee':
	          // 03
	          return parseNDigits(token.length, string, valueCallback);
	        // 3rd

	        case 'eo':
	          return match.ordinalNumber(string, {
	            unit: 'day',
	            valueCallback: valueCallback
	          });
	        // Tue

	        case 'eee':
	          return match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // T

	        case 'eeeee':
	          return match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // Tu

	        case 'eeeeee':
	          return match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	        // Tuesday

	        case 'eeee':
	        default:
	          return match.day(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 6;
	    },
	    set: function (date, _flags, value, options) {
	      date = setUTCDay(date, value, options);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'c', 't', 'T']
	  },
	  // Stand-alone local day of week
	  c: {
	    priority: 90,
	    parse: function (string, token, match, options) {
	      var valueCallback = function (value) {
	        var wholeWeekDays = Math.floor((value - 1) / 7) * 7;
	        return (value + options.weekStartsOn + 6) % 7 + wholeWeekDays;
	      };

	      switch (token) {
	        // 3
	        case 'c':
	        case 'cc':
	          // 03
	          return parseNDigits(token.length, string, valueCallback);
	        // 3rd

	        case 'co':
	          return match.ordinalNumber(string, {
	            unit: 'day',
	            valueCallback: valueCallback
	          });
	        // Tue

	        case 'ccc':
	          return match.day(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // T

	        case 'ccccc':
	          return match.day(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // Tu

	        case 'cccccc':
	          return match.day(string, {
	            width: 'short',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	        // Tuesday

	        case 'cccc':
	        default:
	          return match.day(string, {
	            width: 'wide',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'abbreviated',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'short',
	            context: 'standalone'
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'standalone'
	          });
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 6;
	    },
	    set: function (date, _flags, value, options) {
	      date = setUTCDay(date, value, options);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['y', 'R', 'u', 'q', 'Q', 'M', 'L', 'I', 'd', 'D', 'E', 'i', 'e', 't', 'T']
	  },
	  // ISO day of week
	  i: {
	    priority: 90,
	    parse: function (string, token, match, _options) {
	      var valueCallback = function (value) {
	        if (value === 0) {
	          return 7;
	        }

	        return value;
	      };

	      switch (token) {
	        // 2
	        case 'i':
	        case 'ii':
	          // 02
	          return parseNDigits(token.length, string);
	        // 2nd

	        case 'io':
	          return match.ordinalNumber(string, {
	            unit: 'day'
	          });
	        // Tue

	        case 'iii':
	          return match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting',
	            valueCallback: valueCallback
	          });
	        // T

	        case 'iiiii':
	          return match.day(string, {
	            width: 'narrow',
	            context: 'formatting',
	            valueCallback: valueCallback
	          });
	        // Tu

	        case 'iiiiii':
	          return match.day(string, {
	            width: 'short',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting',
	            valueCallback: valueCallback
	          });
	        // Tuesday

	        case 'iiii':
	        default:
	          return match.day(string, {
	            width: 'wide',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'abbreviated',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'short',
	            context: 'formatting',
	            valueCallback: valueCallback
	          }) || match.day(string, {
	            width: 'narrow',
	            context: 'formatting',
	            valueCallback: valueCallback
	          });
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 1 && value <= 7;
	    },
	    set: function (date, _flags, value, options) {
	      date = setUTCISODay(date, value, options);
	      date.setUTCHours(0, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['y', 'Y', 'u', 'q', 'Q', 'M', 'L', 'w', 'd', 'D', 'E', 'e', 'c', 't', 'T']
	  },
	  // AM or PM
	  a: {
	    priority: 80,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'a':
	        case 'aa':
	        case 'aaa':
	          return match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'aaaaa':
	          return match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'aaaa':
	        default:
	          return match.dayPeriod(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['b', 'B', 'H', 'K', 'k', 't', 'T']
	  },
	  // AM, PM, midnight
	  b: {
	    priority: 80,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'b':
	        case 'bb':
	        case 'bbb':
	          return match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'bbbbb':
	          return match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'bbbb':
	        default:
	          return match.dayPeriod(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['a', 'B', 'H', 'K', 'k', 't', 'T']
	  },
	  // in the morning, in the afternoon, in the evening, at night
	  B: {
	    priority: 80,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'B':
	        case 'BB':
	        case 'BBB':
	          return match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'BBBBB':
	          return match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });

	        case 'BBBB':
	        default:
	          return match.dayPeriod(string, {
	            width: 'wide',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'abbreviated',
	            context: 'formatting'
	          }) || match.dayPeriod(string, {
	            width: 'narrow',
	            context: 'formatting'
	          });
	      }
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCHours(dayPeriodEnumToHours(value), 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['a', 'b', 't', 'T']
	  },
	  // Hour [1-12]
	  h: {
	    priority: 70,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'h':
	          return parseNumericPattern(numericPatterns.hour12h, string);

	        case 'ho':
	          return match.ordinalNumber(string, {
	            unit: 'hour'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 1 && value <= 12;
	    },
	    set: function (date, _flags, value, _options) {
	      var isPM = date.getUTCHours() >= 12;

	      if (isPM && value < 12) {
	        date.setUTCHours(value + 12, 0, 0, 0);
	      } else if (!isPM && value === 12) {
	        date.setUTCHours(0, 0, 0, 0);
	      } else {
	        date.setUTCHours(value, 0, 0, 0);
	      }

	      return date;
	    },
	    incompatibleTokens: ['H', 'K', 'k', 't', 'T']
	  },
	  // Hour [0-23]
	  H: {
	    priority: 70,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'H':
	          return parseNumericPattern(numericPatterns.hour23h, string);

	        case 'Ho':
	          return match.ordinalNumber(string, {
	            unit: 'hour'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 23;
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCHours(value, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['a', 'b', 'h', 'K', 'k', 't', 'T']
	  },
	  // Hour [0-11]
	  K: {
	    priority: 70,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'K':
	          return parseNumericPattern(numericPatterns.hour11h, string);

	        case 'Ko':
	          return match.ordinalNumber(string, {
	            unit: 'hour'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 11;
	    },
	    set: function (date, _flags, value, _options) {
	      var isPM = date.getUTCHours() >= 12;

	      if (isPM && value < 12) {
	        date.setUTCHours(value + 12, 0, 0, 0);
	      } else {
	        date.setUTCHours(value, 0, 0, 0);
	      }

	      return date;
	    },
	    incompatibleTokens: ['a', 'b', 'h', 'H', 'k', 't', 'T']
	  },
	  // Hour [1-24]
	  k: {
	    priority: 70,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'k':
	          return parseNumericPattern(numericPatterns.hour24h, string);

	        case 'ko':
	          return match.ordinalNumber(string, {
	            unit: 'hour'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 1 && value <= 24;
	    },
	    set: function (date, _flags, value, _options) {
	      var hours = value <= 24 ? value % 24 : value;
	      date.setUTCHours(hours, 0, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['a', 'b', 'h', 'H', 'K', 't', 'T']
	  },
	  // Minute
	  m: {
	    priority: 60,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 'm':
	          return parseNumericPattern(numericPatterns.minute, string);

	        case 'mo':
	          return match.ordinalNumber(string, {
	            unit: 'minute'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 59;
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCMinutes(value, 0, 0);
	      return date;
	    },
	    incompatibleTokens: ['t', 'T']
	  },
	  // Second
	  s: {
	    priority: 50,
	    parse: function (string, token, match, _options) {
	      switch (token) {
	        case 's':
	          return parseNumericPattern(numericPatterns.second, string);

	        case 'so':
	          return match.ordinalNumber(string, {
	            unit: 'second'
	          });

	        default:
	          return parseNDigits(token.length, string);
	      }
	    },
	    validate: function (_date, value, _options) {
	      return value >= 0 && value <= 59;
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCSeconds(value, 0);
	      return date;
	    },
	    incompatibleTokens: ['t', 'T']
	  },
	  // Fraction of second
	  S: {
	    priority: 30,
	    parse: function (string, token, _match, _options) {
	      var valueCallback = function (value) {
	        return Math.floor(value * Math.pow(10, -token.length + 3));
	      };

	      return parseNDigits(token.length, string, valueCallback);
	    },
	    set: function (date, _flags, value, _options) {
	      date.setUTCMilliseconds(value);
	      return date;
	    },
	    incompatibleTokens: ['t', 'T']
	  },
	  // Timezone (ISO-8601. +00:00 is `'Z'`)
	  X: {
	    priority: 10,
	    parse: function (string, token, _match, _options) {
	      switch (token) {
	        case 'X':
	          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

	        case 'XX':
	          return parseTimezonePattern(timezonePatterns.basic, string);

	        case 'XXXX':
	          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

	        case 'XXXXX':
	          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

	        case 'XXX':
	        default:
	          return parseTimezonePattern(timezonePatterns.extended, string);
	      }
	    },
	    set: function (date, flags, value, _options) {
	      if (flags.timestampIsSet) {
	        return date;
	      }

	      return new Date(date.getTime() - value);
	    },
	    incompatibleTokens: ['t', 'T', 'x']
	  },
	  // Timezone (ISO-8601)
	  x: {
	    priority: 10,
	    parse: function (string, token, _match, _options) {
	      switch (token) {
	        case 'x':
	          return parseTimezonePattern(timezonePatterns.basicOptionalMinutes, string);

	        case 'xx':
	          return parseTimezonePattern(timezonePatterns.basic, string);

	        case 'xxxx':
	          return parseTimezonePattern(timezonePatterns.basicOptionalSeconds, string);

	        case 'xxxxx':
	          return parseTimezonePattern(timezonePatterns.extendedOptionalSeconds, string);

	        case 'xxx':
	        default:
	          return parseTimezonePattern(timezonePatterns.extended, string);
	      }
	    },
	    set: function (date, flags, value, _options) {
	      if (flags.timestampIsSet) {
	        return date;
	      }

	      return new Date(date.getTime() - value);
	    },
	    incompatibleTokens: ['t', 'T', 'X']
	  },
	  // Seconds timestamp
	  t: {
	    priority: 40,
	    parse: function (string, _token, _match, _options) {
	      return parseAnyDigitsSigned(string);
	    },
	    set: function (_date, _flags, value, _options) {
	      return [new Date(value * 1000), {
	        timestampIsSet: true
	      }];
	    },
	    incompatibleTokens: '*'
	  },
	  // Milliseconds timestamp
	  T: {
	    priority: 20,
	    parse: function (string, _token, _match, _options) {
	      return parseAnyDigitsSigned(string);
	    },
	    set: function (_date, _flags, value, _options) {
	      return [new Date(value), {
	        timestampIsSet: true
	      }];
	    },
	    incompatibleTokens: '*'
	  }
	};

	var TIMEZONE_UNIT_PRIORITY = 10; // This RegExp consists of three parts separated by `|`:
	// - [yYQqMLwIdDecihHKkms]o matches any available ordinal number token
	//   (one of the certain letters followed by `o`)
	// - (\w)\1* matches any sequences of the same letter
	// - '' matches two quote characters in a row
	// - '(''|[^'])+('|$) matches anything surrounded by two quote characters ('),
	//   except a single quote symbol, which ends the sequence.
	//   Two quote characters do not end the sequence.
	//   If there is no matching single quote
	//   then the sequence will continue until the end of the string.
	// - . matches any single character unmatched by previous parts of the RegExps

	var formattingTokensRegExp = /[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g; // This RegExp catches symbols escaped by quotes, and also
	// sequences of symbols P, p, and the combinations like `PPPPPPPppppp`

	var longFormattingTokensRegExp = /P+p+|P+|p+|''|'(''|[^'])+('|$)|./g;
	var escapedStringRegExp = /^'([^]*?)'?$/;
	var doubleQuoteRegExp = /''/g;
	var notWhitespaceRegExp = /\S/;
	var unescapedLatinCharacterRegExp = /[a-zA-Z]/;
	/**
	 * @name parse
	 * @category Common Helpers
	 * @summary Parse the date.
	 *
	 * @description
	 * Return the date parsed from string using the given format string.
	 *
	 * > ⚠️ Please note that the `format` tokens differ from Moment.js and other libraries.
	 * > See: https://git.io/fxCyr
	 *
	 * The characters in the format string wrapped between two single quotes characters (') are escaped.
	 * Two single quotes in a row, whether inside or outside a quoted sequence, represent a 'real' single quote.
	 *
	 * Format of the format string is based on Unicode Technical Standard #35:
	 * https://www.unicode.org/reports/tr35/tr35-dates.html#Date_Field_Symbol_Table
	 * with a few additions (see note 5 below the table).
	 *
	 * Not all tokens are compatible. Combinations that don't make sense or could lead to bugs are prohibited
	 * and will throw `RangeError`. For example usage of 24-hour format token with AM/PM token will throw an exception:
	 *
	 * ```javascript
	 * parse('23 AM', 'HH a', new Date())
	 * //=> RangeError: The format string mustn't contain `HH` and `a` at the same time
	 * ```
	 *
	 * See the compatibility table: https://docs.google.com/spreadsheets/d/e/2PACX-1vQOPU3xUhplll6dyoMmVUXHKl_8CRDs6_ueLmex3SoqwhuolkuN3O05l4rqx5h1dKX8eb46Ul-CCSrq/pubhtml?gid=0&single=true
	 *
	 * Accepted format string patterns:
	 * | Unit                            |Prior| Pattern | Result examples                   | Notes |
	 * |---------------------------------|-----|---------|-----------------------------------|-------|
	 * | Era                             | 140 | G..GGG  | AD, BC                            |       |
	 * |                                 |     | GGGG    | Anno Domini, Before Christ        | 2     |
	 * |                                 |     | GGGGG   | A, B                              |       |
	 * | Calendar year                   | 130 | y       | 44, 1, 1900, 2017, 9999           | 4     |
	 * |                                 |     | yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
	 * |                                 |     | yy      | 44, 01, 00, 17                    | 4     |
	 * |                                 |     | yyy     | 044, 001, 123, 999                | 4     |
	 * |                                 |     | yyyy    | 0044, 0001, 1900, 2017            | 4     |
	 * |                                 |     | yyyyy   | ...                               | 2,4   |
	 * | Local week-numbering year       | 130 | Y       | 44, 1, 1900, 2017, 9000           | 4     |
	 * |                                 |     | Yo      | 44th, 1st, 1900th, 9999999th      | 4,5   |
	 * |                                 |     | YY      | 44, 01, 00, 17                    | 4,6   |
	 * |                                 |     | YYY     | 044, 001, 123, 999                | 4     |
	 * |                                 |     | YYYY    | 0044, 0001, 1900, 2017            | 4,6   |
	 * |                                 |     | YYYYY   | ...                               | 2,4   |
	 * | ISO week-numbering year         | 130 | R       | -43, 1, 1900, 2017, 9999, -9999   | 4,5   |
	 * |                                 |     | RR      | -43, 01, 00, 17                   | 4,5   |
	 * |                                 |     | RRR     | -043, 001, 123, 999, -999         | 4,5   |
	 * |                                 |     | RRRR    | -0043, 0001, 2017, 9999, -9999    | 4,5   |
	 * |                                 |     | RRRRR   | ...                               | 2,4,5 |
	 * | Extended year                   | 130 | u       | -43, 1, 1900, 2017, 9999, -999    | 4     |
	 * |                                 |     | uu      | -43, 01, 99, -99                  | 4     |
	 * |                                 |     | uuu     | -043, 001, 123, 999, -999         | 4     |
	 * |                                 |     | uuuu    | -0043, 0001, 2017, 9999, -9999    | 4     |
	 * |                                 |     | uuuuu   | ...                               | 2,4   |
	 * | Quarter (formatting)            | 120 | Q       | 1, 2, 3, 4                        |       |
	 * |                                 |     | Qo      | 1st, 2nd, 3rd, 4th                | 5     |
	 * |                                 |     | QQ      | 01, 02, 03, 04                    |       |
	 * |                                 |     | QQQ     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 |     | QQQQ    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 |     | QQQQQ   | 1, 2, 3, 4                        | 4     |
	 * | Quarter (stand-alone)           | 120 | q       | 1, 2, 3, 4                        |       |
	 * |                                 |     | qo      | 1st, 2nd, 3rd, 4th                | 5     |
	 * |                                 |     | qq      | 01, 02, 03, 04                    |       |
	 * |                                 |     | qqq     | Q1, Q2, Q3, Q4                    |       |
	 * |                                 |     | qqqq    | 1st quarter, 2nd quarter, ...     | 2     |
	 * |                                 |     | qqqqq   | 1, 2, 3, 4                        | 3     |
	 * | Month (formatting)              | 110 | M       | 1, 2, ..., 12                     |       |
	 * |                                 |     | Mo      | 1st, 2nd, ..., 12th               | 5     |
	 * |                                 |     | MM      | 01, 02, ..., 12                   |       |
	 * |                                 |     | MMM     | Jan, Feb, ..., Dec                |       |
	 * |                                 |     | MMMM    | January, February, ..., December  | 2     |
	 * |                                 |     | MMMMM   | J, F, ..., D                      |       |
	 * | Month (stand-alone)             | 110 | L       | 1, 2, ..., 12                     |       |
	 * |                                 |     | Lo      | 1st, 2nd, ..., 12th               | 5     |
	 * |                                 |     | LL      | 01, 02, ..., 12                   |       |
	 * |                                 |     | LLL     | Jan, Feb, ..., Dec                |       |
	 * |                                 |     | LLLL    | January, February, ..., December  | 2     |
	 * |                                 |     | LLLLL   | J, F, ..., D                      |       |
	 * | Local week of year              | 100 | w       | 1, 2, ..., 53                     |       |
	 * |                                 |     | wo      | 1st, 2nd, ..., 53th               | 5     |
	 * |                                 |     | ww      | 01, 02, ..., 53                   |       |
	 * | ISO week of year                | 100 | I       | 1, 2, ..., 53                     | 5     |
	 * |                                 |     | Io      | 1st, 2nd, ..., 53th               | 5     |
	 * |                                 |     | II      | 01, 02, ..., 53                   | 5     |
	 * | Day of month                    |  90 | d       | 1, 2, ..., 31                     |       |
	 * |                                 |     | do      | 1st, 2nd, ..., 31st               | 5     |
	 * |                                 |     | dd      | 01, 02, ..., 31                   |       |
	 * | Day of year                     |  90 | D       | 1, 2, ..., 365, 366               | 7     |
	 * |                                 |     | Do      | 1st, 2nd, ..., 365th, 366th       | 5     |
	 * |                                 |     | DD      | 01, 02, ..., 365, 366             | 7     |
	 * |                                 |     | DDD     | 001, 002, ..., 365, 366           |       |
	 * |                                 |     | DDDD    | ...                               | 2     |
	 * | Day of week (formatting)        |  90 | E..EEE  | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 |     | EEEE    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 |     | EEEEE   | M, T, W, T, F, S, S               |       |
	 * |                                 |     | EEEEEE  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | ISO day of week (formatting)    |  90 | i       | 1, 2, 3, ..., 7                   | 5     |
	 * |                                 |     | io      | 1st, 2nd, ..., 7th                | 5     |
	 * |                                 |     | ii      | 01, 02, ..., 07                   | 5     |
	 * |                                 |     | iii     | Mon, Tue, Wed, ..., Sun           | 5     |
	 * |                                 |     | iiii    | Monday, Tuesday, ..., Sunday      | 2,5   |
	 * |                                 |     | iiiii   | M, T, W, T, F, S, S               | 5     |
	 * |                                 |     | iiiiii  | Mo, Tu, We, Th, Fr, Su, Sa        | 5     |
	 * | Local day of week (formatting)  |  90 | e       | 2, 3, 4, ..., 1                   |       |
	 * |                                 |     | eo      | 2nd, 3rd, ..., 1st                | 5     |
	 * |                                 |     | ee      | 02, 03, ..., 01                   |       |
	 * |                                 |     | eee     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 |     | eeee    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 |     | eeeee   | M, T, W, T, F, S, S               |       |
	 * |                                 |     | eeeeee  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | Local day of week (stand-alone) |  90 | c       | 2, 3, 4, ..., 1                   |       |
	 * |                                 |     | co      | 2nd, 3rd, ..., 1st                | 5     |
	 * |                                 |     | cc      | 02, 03, ..., 01                   |       |
	 * |                                 |     | ccc     | Mon, Tue, Wed, ..., Sun           |       |
	 * |                                 |     | cccc    | Monday, Tuesday, ..., Sunday      | 2     |
	 * |                                 |     | ccccc   | M, T, W, T, F, S, S               |       |
	 * |                                 |     | cccccc  | Mo, Tu, We, Th, Fr, Su, Sa        |       |
	 * | AM, PM                          |  80 | a..aaa  | AM, PM                            |       |
	 * |                                 |     | aaaa    | a.m., p.m.                        | 2     |
	 * |                                 |     | aaaaa   | a, p                              |       |
	 * | AM, PM, noon, midnight          |  80 | b..bbb  | AM, PM, noon, midnight            |       |
	 * |                                 |     | bbbb    | a.m., p.m., noon, midnight        | 2     |
	 * |                                 |     | bbbbb   | a, p, n, mi                       |       |
	 * | Flexible day period             |  80 | B..BBB  | at night, in the morning, ...     |       |
	 * |                                 |     | BBBB    | at night, in the morning, ...     | 2     |
	 * |                                 |     | BBBBB   | at night, in the morning, ...     |       |
	 * | Hour [1-12]                     |  70 | h       | 1, 2, ..., 11, 12                 |       |
	 * |                                 |     | ho      | 1st, 2nd, ..., 11th, 12th         | 5     |
	 * |                                 |     | hh      | 01, 02, ..., 11, 12               |       |
	 * | Hour [0-23]                     |  70 | H       | 0, 1, 2, ..., 23                  |       |
	 * |                                 |     | Ho      | 0th, 1st, 2nd, ..., 23rd          | 5     |
	 * |                                 |     | HH      | 00, 01, 02, ..., 23               |       |
	 * | Hour [0-11]                     |  70 | K       | 1, 2, ..., 11, 0                  |       |
	 * |                                 |     | Ko      | 1st, 2nd, ..., 11th, 0th          | 5     |
	 * |                                 |     | KK      | 01, 02, ..., 11, 00               |       |
	 * | Hour [1-24]                     |  70 | k       | 24, 1, 2, ..., 23                 |       |
	 * |                                 |     | ko      | 24th, 1st, 2nd, ..., 23rd         | 5     |
	 * |                                 |     | kk      | 24, 01, 02, ..., 23               |       |
	 * | Minute                          |  60 | m       | 0, 1, ..., 59                     |       |
	 * |                                 |     | mo      | 0th, 1st, ..., 59th               | 5     |
	 * |                                 |     | mm      | 00, 01, ..., 59                   |       |
	 * | Second                          |  50 | s       | 0, 1, ..., 59                     |       |
	 * |                                 |     | so      | 0th, 1st, ..., 59th               | 5     |
	 * |                                 |     | ss      | 00, 01, ..., 59                   |       |
	 * | Seconds timestamp               |  40 | t       | 512969520                         |       |
	 * |                                 |     | tt      | ...                               | 2     |
	 * | Fraction of second              |  30 | S       | 0, 1, ..., 9                      |       |
	 * |                                 |     | SS      | 00, 01, ..., 99                   |       |
	 * |                                 |     | SSS     | 000, 0001, ..., 999               |       |
	 * |                                 |     | SSSS    | ...                               | 2     |
	 * | Milliseconds timestamp          |  20 | T       | 512969520900                      |       |
	 * |                                 |     | TT      | ...                               | 2     |
	 * | Timezone (ISO-8601 w/ Z)        |  10 | X       | -08, +0530, Z                     |       |
	 * |                                 |     | XX      | -0800, +0530, Z                   |       |
	 * |                                 |     | XXX     | -08:00, +05:30, Z                 |       |
	 * |                                 |     | XXXX    | -0800, +0530, Z, +123456          | 2     |
	 * |                                 |     | XXXXX   | -08:00, +05:30, Z, +12:34:56      |       |
	 * | Timezone (ISO-8601 w/o Z)       |  10 | x       | -08, +0530, +00                   |       |
	 * |                                 |     | xx      | -0800, +0530, +0000               |       |
	 * |                                 |     | xxx     | -08:00, +05:30, +00:00            | 2     |
	 * |                                 |     | xxxx    | -0800, +0530, +0000, +123456      |       |
	 * |                                 |     | xxxxx   | -08:00, +05:30, +00:00, +12:34:56 |       |
	 * | Long localized date             |  NA | P       | 05/29/1453                        | 5,8   |
	 * |                                 |     | PP      | May 29, 1453                      |       |
	 * |                                 |     | PPP     | May 29th, 1453                    |       |
	 * |                                 |     | PPPP    | Sunday, May 29th, 1453            | 2,5,8 |
	 * | Long localized time             |  NA | p       | 12:00 AM                          | 5,8   |
	 * |                                 |     | pp      | 12:00:00 AM                       |       |
	 * | Combination of date and time    |  NA | Pp      | 05/29/1453, 12:00 AM              |       |
	 * |                                 |     | PPpp    | May 29, 1453, 12:00:00 AM         |       |
	 * |                                 |     | PPPpp   | May 29th, 1453 at ...             |       |
	 * |                                 |     | PPPPpp  | Sunday, May 29th, 1453 at ...     | 2,5,8 |
	 * Notes:
	 * 1. "Formatting" units (e.g. formatting quarter) in the default en-US locale
	 *    are the same as "stand-alone" units, but are different in some languages.
	 *    "Formatting" units are declined according to the rules of the language
	 *    in the context of a date. "Stand-alone" units are always nominative singular.
	 *    In `format` function, they will produce different result:
	 *
	 *    `format(new Date(2017, 10, 6), 'do LLLL', {locale: cs}) //=> '6. listopad'`
	 *
	 *    `format(new Date(2017, 10, 6), 'do MMMM', {locale: cs}) //=> '6. listopadu'`
	 *
	 *    `parse` will try to match both formatting and stand-alone units interchangably.
	 *
	 * 2. Any sequence of the identical letters is a pattern, unless it is escaped by
	 *    the single quote characters (see below).
	 *    If the sequence is longer than listed in table:
	 *    - for numerical units (`yyyyyyyy`) `parse` will try to match a number
	 *      as wide as the sequence
	 *    - for text units (`MMMMMMMM`) `parse` will try to match the widest variation of the unit.
	 *      These variations are marked with "2" in the last column of the table.
	 *
	 * 3. `QQQQQ` and `qqqqq` could be not strictly numerical in some locales.
	 *    These tokens represent the shortest form of the quarter.
	 *
	 * 4. The main difference between `y` and `u` patterns are B.C. years:
	 *
	 *    | Year | `y` | `u` |
	 *    |------|-----|-----|
	 *    | AC 1 |   1 |   1 |
	 *    | BC 1 |   1 |   0 |
	 *    | BC 2 |   2 |  -1 |
	 *
	 *    Also `yy` will try to guess the century of two digit year by proximity with `referenceDate`:
	 *
	 *    `parse('50', 'yy', new Date(2018, 0, 1)) //=> Sat Jan 01 2050 00:00:00`
	 *
	 *    `parse('75', 'yy', new Date(2018, 0, 1)) //=> Wed Jan 01 1975 00:00:00`
	 *
	 *    while `uu` will just assign the year as is:
	 *
	 *    `parse('50', 'uu', new Date(2018, 0, 1)) //=> Sat Jan 01 0050 00:00:00`
	 *
	 *    `parse('75', 'uu', new Date(2018, 0, 1)) //=> Tue Jan 01 0075 00:00:00`
	 *
	 *    The same difference is true for local and ISO week-numbering years (`Y` and `R`),
	 *    except local week-numbering years are dependent on `options.weekStartsOn`
	 *    and `options.firstWeekContainsDate` (compare [setISOWeekYear]{@link https://date-fns.org/docs/setISOWeekYear}
	 *    and [setWeekYear]{@link https://date-fns.org/docs/setWeekYear}).
	 *
	 * 5. These patterns are not in the Unicode Technical Standard #35:
	 *    - `i`: ISO day of week
	 *    - `I`: ISO week of year
	 *    - `R`: ISO week-numbering year
	 *    - `o`: ordinal number modifier
	 *    - `P`: long localized date
	 *    - `p`: long localized time
	 *
	 * 6. `YY` and `YYYY` tokens represent week-numbering years but they are often confused with years.
	 *    You should enable `options.useAdditionalWeekYearTokens` to use them. See: https://git.io/fxCyr
	 *
	 * 7. `D` and `DD` tokens represent days of the year but they are ofthen confused with days of the month.
	 *    You should enable `options.useAdditionalDayOfYearTokens` to use them. See: https://git.io/fxCyr
	 *
	 * 8. `P+` tokens do not have a defined priority since they are merely aliases to other tokens based
	 *    on the given locale.
	 *
	 *    using `en-US` locale: `P` => `MM/dd/yyyy`
	 *    using `en-US` locale: `p` => `hh:mm a`
	 *    using `pt-BR` locale: `P` => `dd/MM/yyyy`
	 *    using `pt-BR` locale: `p` => `HH:mm`
	 *
	 * Values will be assigned to the date in the descending order of its unit's priority.
	 * Units of an equal priority overwrite each other in the order of appearance.
	 *
	 * If no values of higher priority are parsed (e.g. when parsing string 'January 1st' without a year),
	 * the values will be taken from 3rd argument `referenceDate` which works as a context of parsing.
	 *
	 * `referenceDate` must be passed for correct work of the function.
	 * If you're not sure which `referenceDate` to supply, create a new instance of Date:
	 * `parse('02/11/2014', 'MM/dd/yyyy', new Date())`
	 * In this case parsing will be done in the context of the current date.
	 * If `referenceDate` is `Invalid Date` or a value not convertible to valid `Date`,
	 * then `Invalid Date` will be returned.
	 *
	 * The result may vary by locale.
	 *
	 * If `formatString` matches with `dateString` but does not provides tokens, `referenceDate` will be returned.
	 *
	 * If parsing failed, `Invalid Date` will be returned.
	 * Invalid Date is a Date, whose time value is NaN.
	 * Time value of Date: http://es5.github.io/#x15.9.1.1
	 *
	 * ### v2.0.0 breaking changes:
	 *
	 * - [Changes that are common for the whole library](https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#Common-Changes).
	 *
	 * - Old `parse` was renamed to `toDate`.
	 *   Now `parse` is a new function which parses a string using a provided format.
	 *
	 *   ```javascript
	 *   // Before v2.0.0
	 *   parse('2016-01-01')
	 *
	 *   // v2.0.0 onward (toDate no longer accepts a string)
	 *   toDate(1392098430000) // Unix to timestamp
	 *   toDate(new Date(2014, 1, 11, 11, 30, 30)) // Cloning the date
	 *   parse('2016-01-01', 'yyyy-MM-dd', new Date())
	 *   ```
	 *
	 * @param {String} dateString - the string to parse
	 * @param {String} formatString - the string of tokens
	 * @param {Date|Number} referenceDate - defines values missing from the parsed dateString
	 * @param {Object} [options] - an object with options.
	 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
	 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
	 * @param {1|2|3|4|5|6|7} [options.firstWeekContainsDate=1] - the day of January, which is always in the first week of the year
	 * @param {Boolean} [options.useAdditionalWeekYearTokens=false] - if true, allows usage of the week-numbering year tokens `YY` and `YYYY`;
	 *   see: https://git.io/fxCyr
	 * @param {Boolean} [options.useAdditionalDayOfYearTokens=false] - if true, allows usage of the day of year tokens `D` and `DD`;
	 *   see: https://git.io/fxCyr
	 * @returns {Date} the parsed date
	 * @throws {TypeError} 3 arguments required
	 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
	 * @throws {RangeError} `options.firstWeekContainsDate` must be between 1 and 7
	 * @throws {RangeError} `options.locale` must contain `match` property
	 * @throws {RangeError} use `yyyy` instead of `YYYY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `yy` instead of `YY` for formatting years using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `d` instead of `D` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} use `dd` instead of `DD` for formatting days of the month using [format provided] to the input [input provided]; see: https://git.io/fxCyr
	 * @throws {RangeError} format string contains an unescaped latin alphabet character
	 *
	 * @example
	 * // Parse 11 February 2014 from middle-endian format:
	 * var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
	 * //=> Tue Feb 11 2014 00:00:00
	 *
	 * @example
	 * // Parse 28th of February in Esperanto locale in the context of 2010 year:
	 * import eo from 'date-fns/locale/eo'
	 * var result = parse('28-a de februaro', "do 'de' MMMM", new Date(2010, 0, 1), {
	 *   locale: eo
	 * })
	 * //=> Sun Feb 28 2010 00:00:00
	 */

	function parse(dirtyDateString, dirtyFormatString, dirtyReferenceDate, dirtyOptions) {
	  requiredArgs(3, arguments);
	  var dateString = String(dirtyDateString);
	  var formatString = String(dirtyFormatString);
	  var options = dirtyOptions || {};
	  var locale$1 = options.locale || locale;

	  if (!locale$1.match) {
	    throw new RangeError('locale must contain match property');
	  }

	  var localeFirstWeekContainsDate = locale$1.options && locale$1.options.firstWeekContainsDate;
	  var defaultFirstWeekContainsDate = localeFirstWeekContainsDate == null ? 1 : toInteger(localeFirstWeekContainsDate);
	  var firstWeekContainsDate = options.firstWeekContainsDate == null ? defaultFirstWeekContainsDate : toInteger(options.firstWeekContainsDate); // Test if weekStartsOn is between 1 and 7 _and_ is not NaN

	  if (!(firstWeekContainsDate >= 1 && firstWeekContainsDate <= 7)) {
	    throw new RangeError('firstWeekContainsDate must be between 1 and 7 inclusively');
	  }

	  var localeWeekStartsOn = locale$1.options && locale$1.options.weekStartsOn;
	  var defaultWeekStartsOn = localeWeekStartsOn == null ? 0 : toInteger(localeWeekStartsOn);
	  var weekStartsOn = options.weekStartsOn == null ? defaultWeekStartsOn : toInteger(options.weekStartsOn); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

	  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
	    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
	  }

	  if (formatString === '') {
	    if (dateString === '') {
	      return toDate(dirtyReferenceDate);
	    } else {
	      return new Date(NaN);
	    }
	  }

	  var subFnOptions = {
	    firstWeekContainsDate: firstWeekContainsDate,
	    weekStartsOn: weekStartsOn,
	    locale: locale$1 // If timezone isn't specified, it will be set to the system timezone

	  };
	  var setters = [{
	    priority: TIMEZONE_UNIT_PRIORITY,
	    subPriority: -1,
	    set: dateToSystemTimezone,
	    index: 0
	  }];
	  var i;
	  var tokens = formatString.match(longFormattingTokensRegExp).map(function (substring) {
	    var firstCharacter = substring[0];

	    if (firstCharacter === 'p' || firstCharacter === 'P') {
	      var longFormatter = longFormatters[firstCharacter];
	      return longFormatter(substring, locale$1.formatLong, subFnOptions);
	    }

	    return substring;
	  }).join('').match(formattingTokensRegExp);
	  var usedTokens = [];

	  for (i = 0; i < tokens.length; i++) {
	    var token = tokens[i];

	    if (!options.useAdditionalWeekYearTokens && isProtectedWeekYearToken(token)) {
	      throwProtectedError(token, formatString, dirtyDateString);
	    }

	    if (!options.useAdditionalDayOfYearTokens && isProtectedDayOfYearToken(token)) {
	      throwProtectedError(token, formatString, dirtyDateString);
	    }

	    var firstCharacter = token[0];
	    var parser = parsers[firstCharacter];

	    if (parser) {
	      var incompatibleTokens = parser.incompatibleTokens;

	      if (Array.isArray(incompatibleTokens)) {
	        var incompatibleToken = void 0;

	        for (var _i = 0; _i < usedTokens.length; _i++) {
	          var usedToken = usedTokens[_i].token;

	          if (incompatibleTokens.indexOf(usedToken) !== -1 || usedToken === firstCharacter) {
	            incompatibleToken = usedTokens[_i];
	            break;
	          }
	        }

	        if (incompatibleToken) {
	          throw new RangeError("The format string mustn't contain `".concat(incompatibleToken.fullToken, "` and `").concat(token, "` at the same time"));
	        }
	      } else if (parser.incompatibleTokens === '*' && usedTokens.length) {
	        throw new RangeError("The format string mustn't contain `".concat(token, "` and any other token at the same time"));
	      }

	      usedTokens.push({
	        token: firstCharacter,
	        fullToken: token
	      });
	      var parseResult = parser.parse(dateString, token, locale$1.match, subFnOptions);

	      if (!parseResult) {
	        return new Date(NaN);
	      }

	      setters.push({
	        priority: parser.priority,
	        subPriority: parser.subPriority || 0,
	        set: parser.set,
	        validate: parser.validate,
	        value: parseResult.value,
	        index: setters.length
	      });
	      dateString = parseResult.rest;
	    } else {
	      if (firstCharacter.match(unescapedLatinCharacterRegExp)) {
	        throw new RangeError('Format string contains an unescaped latin alphabet character `' + firstCharacter + '`');
	      } // Replace two single quote characters with one single quote character


	      if (token === "''") {
	        token = "'";
	      } else if (firstCharacter === "'") {
	        token = cleanEscapedString(token);
	      } // Cut token from string, or, if string doesn't match the token, return Invalid Date


	      if (dateString.indexOf(token) === 0) {
	        dateString = dateString.slice(token.length);
	      } else {
	        return new Date(NaN);
	      }
	    }
	  } // Check if the remaining input contains something other than whitespace


	  if (dateString.length > 0 && notWhitespaceRegExp.test(dateString)) {
	    return new Date(NaN);
	  }

	  var uniquePrioritySetters = setters.map(function (setter) {
	    return setter.priority;
	  }).sort(function (a, b) {
	    return b - a;
	  }).filter(function (priority, index, array) {
	    return array.indexOf(priority) === index;
	  }).map(function (priority) {
	    return setters.filter(function (setter) {
	      return setter.priority === priority;
	    }).sort(function (a, b) {
	      return b.subPriority - a.subPriority;
	    });
	  }).map(function (setterArray) {
	    return setterArray[0];
	  });
	  var date = toDate(dirtyReferenceDate);

	  if (isNaN(date)) {
	    return new Date(NaN);
	  } // Convert the date in system timezone to the same date in UTC+00:00 timezone.
	  // This ensures that when UTC functions will be implemented, locales will be compatible with them.
	  // See an issue about UTC functions: https://github.com/date-fns/date-fns/issues/37


	  var utcDate = subMilliseconds(date, getTimezoneOffsetInMilliseconds(date));
	  var flags = {};

	  for (i = 0; i < uniquePrioritySetters.length; i++) {
	    var setter = uniquePrioritySetters[i];

	    if (setter.validate && !setter.validate(utcDate, setter.value, subFnOptions)) {
	      return new Date(NaN);
	    }

	    var result = setter.set(utcDate, flags, setter.value, subFnOptions); // Result is tuple (date, flags)

	    if (result[0]) {
	      utcDate = result[0];
	      assign(flags, result[1]); // Result is date
	    } else {
	      utcDate = result;
	    }
	  }

	  return utcDate;
	}

	function dateToSystemTimezone(date, flags) {
	  if (flags.timestampIsSet) {
	    return date;
	  }

	  var convertedDate = new Date(0);
	  convertedDate.setFullYear(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
	  convertedDate.setHours(date.getUTCHours(), date.getUTCMinutes(), date.getUTCSeconds(), date.getUTCMilliseconds());
	  return convertedDate;
	}

	function cleanEscapedString(input) {
	  return input.match(escapedStringRegExp)[1].replace(doubleQuoteRegExp, "'");
	}

	/**
	 * Created by josh on 5/25/17.
	 */
	const abbrevations = {
	    'in': 'inch',
	    'inches': 'inch',
	    'ft': 'foot',
	    'feet': 'foot',
	    'yards': 'yard',
	    'yd': 'yard',
	    'miles': 'mile',
	    'mi': 'mile',
	    'leagues': 'league',

	    's': 'second',
	    'seconds': 'second',
	    'min': 'minute',
	    'minutes': 'minute',
	    'hr': 'hour',
	    'hours': 'hour',
	    'days': 'day',
	    'months': 'month',
	    'years': 'year',

	    'm': 'meter',
	    'meters': 'meter',
	    'cm': 'centimeter',

	    'gal': 'gallon',
	    'gallons': 'gallon',
	    'qt': 'quart',
	    'pt': 'pint',
	    'cups': 'cup',
	    'tablespoons': 'tablespoon',
	    'tbsp': 'tablespoon',
	    'teaspoons': 'teaspoon',
	    'tsp': 'teaspoon',
	    'l': 'liter',
	    'liters': 'liter',

	    'grams': 'gram',
	    'g': 'gram',
	    'oz': 'ounce',
	    'ounces': 'ounce',
	    'pounds': 'pound',
	    'lbs': 'pound',
	    'lb': 'pound',

	    'acres': 'acre',
	    'ac': 'acre'

	};

	const cvs = {
	    units: {
	        'sqft': {
	            name: 'foot',
	            base: 'foot',
	            ratio: 1,
	            type: 'area',
	            dimension: 2
	        },
	        'cuft': {
	            name: 'foot',
	            base: 'foot',
	            ratio: 1,
	            type: 'volume',
	            dimension: 3
	        },
	        'hex': {
	            name: 'hex',
	            base: 'hex',
	            ratio: 1,
	            type: 'format',
	            dimension: 0
	        },
	        'decimal': {
	            name: 'decimal',
	            base: 'decimal',
	            ratio: 1,
	            type: 'format',
	            dimension: 0
	        }
	    },
	    //convert between unit bases
	    bases: [
	        {
	            from: 'gallon',
	            ratio: 1 / 3.78541,
	            to: 'liter'
	        },
	        {
	            from: 'liter',
	            ratio: 1 / 0.264172,
	            to: 'gallon'
	        },
	        {
	            from: 'meter',
	            ratio: 1 / 3.28084,
	            to: 'foot'
	        },
	        {
	            from: 'foot',
	            ratio: 3.28084,
	            to: 'meter'
	        },
	        {
	            from: 'pound',
	            ratio: 1 / 453.592,
	            to: 'gram'
	        }
	    ],
	    //convert between unit types
	    dims: [
	        {
	            from: {
	                name: 'foot',
	                dim: 3,
	                type: 'length'
	            },
	            ratio: 0.133681,
	            to: {
	                name: 'gallon',
	                dim: 1,
	                type: 'volume'
	            }
	        },
	        {
	            from: {
	                name: 'foot',
	                dim: 3,
	                type: 'length'
	            },
	            ratio: 0.0353147,
	            to: {
	                name: 'liter',
	                dim: 1,
	                type: 'volume'
	            }
	        },
	        {
	            from: {
	                name: 'meter',
	                dim: 3,
	                type: 'length'
	            },
	            ratio: 1 / 1000,
	            to: {
	                name: 'liter',
	                dim: 1,
	                type: 'volume'
	            }
	        },
	        {
	            from: {
	                name: 'meter',
	                dim: 2,
	                type: 'length'
	            },
	            ratio: 4046.86,
	            to: {
	                name: 'acre',
	                dim: 1,
	                type: 'area'
	            }
	        },
	        {
	            from: {
	                name: 'foot',
	                dim: 2,
	                type: 'length'
	            },
	            ratio: 43560,
	            to: {
	                name: 'acre',
	                dim: 1,
	                type: 'area'
	            }
	        }
	    ]
	};

	function addUnit(name,base,ratio,type) {
	    cvs.units[name] = {
	        name:name,
	        base:base,
	        ratio:ratio,
	        type:type,
	        dimension:1,
	        getUnit: function() {
	            return this;
	        },
	        toString: function() {
	            return this.name + "^"+this.dimension;
	        }
	    };
	}
	addUnit('none','none',1,'none');
	addUnit('meter','meter',1,'length');
	addUnit('foot','foot',1,'length');
	addUnit('gram','gram',1,'mass');
	addUnit('pound','pound',1,'mass');
	addUnit('acre','acre',1,'area');
	addUnit('gallon','gallon',1,'volume');
	addUnit('liter','liter',1,'volume');
	addUnit('second','second',1,'duration');
	addUnit('byte','byte',1,'storage');
	addUnit('bit','bit',1,'storage');

	addUnit('inch','foot',12,'length');
	addUnit('yard','foot',1/3,'length');
	addUnit('mile','foot',1/5280,'length');
	addUnit('ounce','pound',16,'mass');

	function addDuration(name,ratio) {
	    addUnit(name,'second',ratio,'duration');
	}
	addDuration('minute',1/(60));
	addDuration('hour',1/(60*60));
	addDuration('day',1/(60*60*24));
	addDuration('month',1/(60*60*24*30));
	addDuration('year',1/(60*60*24*365));

	function addMeterLength(name,ratio) {
	    addUnit(name,'meter',ratio,'length');
	}
	addMeterLength('centimeter',100);
	addMeterLength('league',1/4000);

	const metric_multiples = [['kilo','k'],['mega','M'],['giga','G'],['tera','T'],['peta','P'],['exa','E'],['zetta','Z'],['yotta','Y']];
	function addMetricMultiples(arr,suffix,abr,type) {
	    arr.forEach((prefix,i)=>{
	        const name = prefix[0] + suffix;
	        addUnit(name,suffix,1/Math.pow(1000,i+1),type);
	        const abbr = prefix[1] + abr;
	        abbrevations[abbr] = name;
	        abbrevations[name+'s'] = name;
	    });
	}
	addMetricMultiples(metric_multiples,'meter','m','length');
	addMetricMultiples(metric_multiples,'gram','g','mass');
	addMetricMultiples(metric_multiples,'liter','l','volume');
	const metric_fractions = [['milli','m'],['micro','u'],['nano','n'],['pico','p'],['femto','f'],['atto','a'],['zepto','z'],['yocto','y']];
	function addMetricFractions(arr,suffix,abr,type) {
	    arr.forEach((prefix,i)=>{
	        const name = prefix[0] + suffix;
	        addUnit(name,suffix,Math.pow(1000,i+1),type);
	        const abbr = prefix[1] + abr;
	        abbrevations[abbr] = name;
	        abbrevations[name+'s'] = name;
	    });
	}
	addMetricFractions(metric_fractions,'meter','m','length');
	addMetricFractions(metric_fractions,'gram','g','mass');
	addMetricFractions(metric_fractions,'liter','l','volume');

	function addGallonVolume(name,ratio) {
	    addUnit(name,'gallon',ratio,'volume');
	}
	addGallonVolume('teaspoon',256*3);
	addGallonVolume('tablespoon',256);
	addGallonVolume('cup',16);
	addGallonVolume('pint',8);
	addGallonVolume('quart',4);

	function addByte(name,ratio) {
	    addUnit(name,'byte',ratio,'storage');
	}

	function addByteUnits(arr,suffix,abbrSuffix,power) {
	    arr.forEach((prefix,i)=>{
	        const name = prefix + suffix;
	        addByte(name,1/Math.pow(power,i+1));
	        const abbr = prefix[0].toUpperCase() + abbrSuffix;
	        abbrevations[abbr] = name;
	    });
	}

	const prefixes_1000 = ['kilo', 'mega', 'giga', 'tera', 'peta', 'exa', 'zetta', 'yotta'];
	addByteUnits(prefixes_1000,'byte','B',1000);
	addByteUnits(prefixes_1000,'bit','bit',1000);
	const prefixes_1024 = ['kibi', 'mebi', 'gibi', 'tibi', 'pebi', 'exbi', 'zebi', 'yobi'];
	addByteUnits(prefixes_1024,'byte','iB',1024);
	addByteUnits(prefixes_1024,'bit','ibit',1024);


	const UNITS = {
	    lookupUnit(name) {
	        if (!cvs.units[name]) {
	            console.log("WARNING. No unit for name", name);
	            throw new Error();
	        }
	        return cvs.units[name];
	    },
	    findConversion(from,to) {
	        return cvs.bases.find((cv) => cv.from == from && cv.to == to);
	    },
	    findDimConversion(from,to) {
	        return cvs.dims.find((cv) => cv.from.name == from && cv.to.name == to);
	    },
	    getCanonicalName(name) {
	        if(cvs.units[name]) return cvs.units[name].name;
	        if(abbrevations[name]) return abbrevations[name];
	        if(!name) return null;
	        console.log("WARNING. no canonical name found for unit " + name);
	        return null;
	    },
	};


	function is_valid_unit(name) {
	    name = UNITS.getCanonicalName(name);
	    return (name !== null)
	}
	function to_canonical_unit(b) {
	    return UNITS.getCanonicalName(b)
	}


	function find_conversion(a,b) {
	    // console.log("finding a conversion from",a,'to',b)
	    let a_unit = UNITS.lookupUnit(a.unit);
	    let b_unit = UNITS.lookupUnit(b.unit);
	    // console.log("starting",a_unit, b_unit)
	    // let a_base = UNITS.lookupUnit(a.unit).base
	    // let b_base = UNITS.lookupUnit(b.unit).base
	    if(a_unit.base === b_unit.base) {
	        // console.log("same base")
	        return {
	            from: a.unit,
	            ratio: a_unit.ratio / b_unit.ratio,
	            to: b.unit
	        }
	    }
	    // console.log("converting to their bases")
	    let conv = UNITS.findConversion(a_unit.base,b_unit.base);
	    // console.log("conversion is",conv)
	    return {
	        from: a.unit,
	        ratio: a_unit.ratio * conv.ratio / b_unit.ratio,
	        to: b.unit,
	    }
	    // return conv
	}


	function convert_unit(a_val,a_unit, b_unit) {
	    // console.log("converting",a_val, a_unit,'to',b_unit)
	    b_unit = to_canonical_unit(b_unit);
	    let conv = UNITS.findConversion(a_unit,b_unit);
	    // console.log("conversion is",conv)
	    if(conv) {
	        // console.log("converting with",conv)
	        return a_val / conv.ratio
	    } else {
	        //check bases
	        let a_base = UNITS.lookupUnit(a_unit).base;
	        let b_base = UNITS.lookupUnit(b_unit).base;
	        //convert between same bases
	        if(a_base === b_base) {
	            //take a to the base
	            //take b from the base
	            let a_ratio = UNITS.lookupUnit(a_unit).ratio;
	            let b_ratio = UNITS.lookupUnit(b_unit).ratio;
	            a_val = a_val / a_ratio * b_ratio;
	            // console.log("ratio",a_ratio,b_ratio,a_val)
	            return a_val
	        }

	        //if a unit != a base or b unit != b base, then recurse
	        if(a_unit !== a_base) {
	            // console.log("maybe we could reduce and try again?")
	            let a_ratio = UNITS.lookupUnit(a_unit).ratio;
	            a_val = a_val / a_ratio;
	            // console.log("new value is",a_unit,a_ratio,a_val, a_base)
	            return convert_unit(a_val, a_base, b_unit)
	        }
	        if(b_unit !== b_base) {
	            // console.log("reduce b and try again")
	            let b_ratio = UNITS.lookupUnit(b_unit).ratio;
	            a_val = a_val * b_ratio;
	            // console.log("b_unit",b_unit, 'to', b_ratio, a_val)
	            return convert_unit(a_val, a_unit, b_base)
	        }

	        //check for dimension conversion if different dimensions
	        let conv2 = UNITS.findDimConversion(a_unit, b_unit);
	        if(conv2) {
	            // console.log("dimension conversion is",conv2)
	            return a_val / conv2.ratio
	        }
	        throw new Error(`no conversion found for ${a_unit} to ${b_unit}. bases ${a_base} <> ${b_base}`)
	    }
	}

	function resolve_in_order(proms) {
	    let rets = [];
	    let pp = Promise.resolve();
	    proms.forEach((p,i) => {
	        pp = pp.then(p).then(ret => {
	            rets.push(ret);
	            return ret
	        });
	    });
	    return pp.then(()=>rets)
	}

	function match_args_to_params(args,old_params,name) {
	    return Object.entries(old_params).map(([key, value]) => {
	        let n1 = args.findIndex(a => a.type === 'named' && a.name === key);
	        if (n1 >= 0) {
	            let arg = args[n1];
	            args.splice(n1, 1);
	            return arg.value
	        } else {
	            //grab the first indexed parameter we can find
	            let n = args.findIndex(a => a.type === 'indexed');
	            if (n >= 0) {
	                let arg = args[n];
	                args.splice(n, 1);
	                return arg.value
	            } else {
	                if (value === REQUIRED) throw new Error(`parameter ${key} is required in function ${name}`)
	                return value
	            }
	        }
	    })
	}


	async function apply_fun(scope,obj, args) {
	    if(obj.type === 'lambda') {
	        return obj.apply_function(scope,obj,args)
	    } else {
	        return obj.fun.apply(obj, args)
	    }
	}

	class ASTNode {
	    constructor() {
	    }
	    log() {
	        console.log(`## AST Node ${this.type} ## `,...arguments);
	    }
	    async evalFilament() {
	        throw new Error(`ASTNode ${this.type}  hasn't implemented evalFilament`)
	    }
	}

	class Scope {
	    constructor(id,parent) {
	        this.funs= {};
	        this.id = id;
	        this.parent = parent;
	    }
	    clone(id) {
	        return new Scope(id,this)
	    }
	    lookup(name) {
	        if(!this.funs[name]) {
	            if(this.parent) {
	                return this.parent.lookup(name)
	            } else {
	                throw new Error(`no such identifier ${name}`)
	            }
	        }

	        return this.funs[name]
	    }
	    install(...funs) {
	        funs.forEach(fun => {
	            this.funs[fun.name] = fun;
	        });
	    }
	    set_var(name,value) {
	        this.funs[name] = value;
	        return value
	    }
	    names() {
	        return Object.keys(this.funs)
	    }
	    dump() {
	        console.log(`##### SCOPE == ${this.id} == `,this.names().join(", "));
	        if(this.parent)this.parent.dump();
	    }
	}

	class FScalar extends ASTNode {
	    constructor(value,unit,dim=1) {
	        super();
	        this.type = 'scalar';
	        this.value = value;
	        this.unit = unit;
	        this.dim = dim;
	        if(value instanceof FScalar) this.value = this.value.value;
	        if(!unit) this.unit = null;
	        if(Array.isArray(unit)) {
	            if (unit.length === 0) this.unit = null;
	            if (unit.length === 1) this.unit = unit[0];
	        }
	        this.unit = to_canonical_unit(this.unit);
	        if(this.dim === 0) {
	            //dimension of zero means no unit
	            this.unit = null;
	        }
	    }
	    toString() {
	        let v = "";
	        if(Number.isInteger(this.value))  v += this.value;
	        if(!Number.isInteger(this.value)) v += this.value.toFixed(3);
	        if(this.unit) v += " "+this.unit;
	        return v
	    }
	    evalJS() {
	        return this.value
	    }
	    async evalFilament() {
	        return this
	    }
	}
	const scalar = (n,u,d) => new FScalar(n,u,d);

	class FString extends ASTNode {
	    constructor(value) {
	        super();
	        this.type = 'string';
	        this.value = value;
	    }
	    _slice(a,b) {
	        return string(this.value.slice(a,b))
	    }
	    toString() {
	        return `"${this.value}"`
	    }
	    evalJS() {
	        return this.value
	    }
	    async evalFilament() {
	        return this
	    }
	}
	const string = n => new FString(n);

	class FBoolean extends ASTNode {
	    constructor(value) {
	        super();
	        this.type = 'boolean';
	        this.value = value;
	    }
	    toString() {
	        return (this.value === true)?"true":"false"
	    }
	    evalJS() {
	        return this.value
	    }
	    async evalFilament() {
	        return this
	    }
	}
	const boolean = v => new FBoolean(v);

	class FDate extends ASTNode {
	    constructor(year,month,day) {
	        super();
	        this.type = 'date';
	        this.value = new Date(year,month-1,day);
	    }
	    toString() {
	        return (""+this.value)
	    }
	    evalJS() {
	        return this.value
	    }
	    async evalFilament() {
	        return this
	    }
	}
	const date = (y,m,d) => new FDate(y,m,d);

	class FTime extends ASTNode {
	    constructor(hour,min,sec) {
	        super();
	        this.type = 'time';
	        if(isDate(hour)) {
	            this.value = hour;
	        } else {
	            this.value = new Date(0, 0, 0, hour, min, sec);
	        }
	    }
	    toString() {
	        return (""+this.value)
	    }
	    evalJS() {
	        return this.value
	    }
	    async evalFilament() {
	        return this
	    }
	}
	const time = (hr,min,sec) => new FTime(hr,min,sec);

	class FList extends ASTNode {
	    constructor(arr) {
	        super();
	        this.type = 'list';
	        this.value = arr;
	    }

	    _get_data_array() {
	        return this.value
	    }
	    _get_length() {
	        return this.value.length
	    }
	    _get_at_index(n) {
	        return this.value[n]
	    }
	    _map(cb) {
	        return this.value.map(cb)
	    }
	    _reduce(cb) {
	        return this.value.reduce(cb)
	    }
	    _forEach(cb) {
	        return this.value.forEach(cb)
	    }
	    _slice(a,b) {
	        return new FList(this.value.slice(a,b))
	    }
	    _sort(cb) {
	        return new FList(this.value.sort(cb))
	    }
	    _filter(cb) {
	        return this.value.filter(cb)
	    }
	    _flatten() {
	        let arr = [];
	        this.value.forEach(a => {
	            if(a.type === 'list') {
	                arr = arr.concat(a._flatten().value);
	            } else {
	                arr.push(a);
	            }
	        });
	        return new FList(arr)
	    }

	    toString() {
	        return `[${this.value.join(", ")}]`
	    }
	    evalJS() {
	        return this.value.map(obj => obj.evalJS())
	    }
	    async evalFilament(scope) {
	        let final = [];
	        for(let i=0; i<this.value.length; i++) {
	            let v = await this.value[i].evalFilament(scope);
	            final.push(v);
	        }
	        return new FList(final)
	    }
	}
	const list = arr => new FList(arr);

	class FTable extends ASTNode {
	    constructor(obj) {
	        super();
	        this.type = 'table';
	        // this.log("making using data",obj.data)
	        this.schema = obj.data.schema;
	        this.value = obj.data.items;
	        Object.entries(this.schema.properties).forEach(([key,val])=>{
	            // this.log("schema prop",key,val)
	            if(val.type === 'number') {
	                // this.log("validating numbers in data")
	                this.value.forEach(it => {
	                    if(typeof it[key] === 'string') it[key] = parseInt(it[key]);
	                    // this.log(`converted to number ${it[key]}`)
	                });
	            }
	        });
	    }
	    async evalFilament() {
	        return this
	    }
	    _get_length() {
	        return this.value.length
	    }
	    _map(cb) {
	        return this.value.map(cb)
	    }
	    _forEach(cb) {
	        return this.value.forEach(cb)
	    }
	    _get_field_from(field, datum, index) {
	        return pack(this.value[index][unpack(field)])
	    }
	    _slice(a,b) {
	        return new FTable({data:{schema:this.schema, items:this.value.slice(a,b)}})
	    }
	}

	class FObject extends ASTNode {
	    constructor(obj) {
	        super();
	        this.type = 'object';
	        this.value = obj;
	    }
	    async evalFilament() {
	        return this
	    }
	}

	class FCall extends ASTNode {
	    constructor(name,args) {
	        super();
	        this.type = 'call';
	        this.name = name;
	        this.args = args;
	    }
	    toString() {
	        return `${this.name}(${this.args.map(a => a.toString()).join(",")})`
	    }
	    evalJS(scope) {
	        if(!scope.lookup(this.name)) throw new Error(`function '${this.name}' not found`)
	        let fun = scope.lookup(this.name);
	        return fun.apply_function(this.args)
	    }
	    evalJS_with_pipeline(scope,prepend) {
	        if(!scope.lookup(this.name)) throw new Error(`function '${this.name}' not found`)
	        let fun = scope.lookup(this.name);
	        let args = [prepend].concat(this.args);
	        return fun.apply_function(args)
	    }
	    async evalFilament(scope, prepend) {
	        let fun = scope.lookup(this.name);
	        if(!fun) throw new Error(`function '${this.name}' not found`)
	        let args = this.args.slice();
	        if(prepend) args.unshift(prepend);
	        let params = match_args_to_params(args,fun.params,this.name);
	        let params2 = [];
	        for(let a of params) {
	            if(a && a.evalFilament) a = await a.evalFilament(scope);
	            params2.push(a);
	        }
	        return await fun.do_apply(scope,params2)
	    }
	}
	const call = (name,args) => new FCall(name,args);

	class FunctionDefintion extends ASTNode {
	    constructor(name, args, block) {
	        super();
	        this.type = 'function_definition';
	        this.name = name;
	        this.args = args;
	        this.block = block;
	    }
	    toString() {
	        let args = this.args.map(a => a[0].toString()+":"+a[1].toString());
	        return `def ${this.name}(${args.join(",")}) {${this.block.toString()}}`
	    }
	    async evalFilament(scope) {
	        let args = {};
	        this.args.forEach(arg => args[arg[0]] = arg[1]); // turn into a map
	        scope.install(new FilamentFunction(this.name,args,async (...params)=>{
	            let scope2 = scope.clone(this.name);
	            this.args.forEach((arg,i) => scope2.set_var(arg[0],params[i]));
	            return await this.block.evalFilament(scope2)
	        }));
	        return this
	    }
	}
	const fundef = (name,args,block) => new FunctionDefintion(name,args,block);

	class FIndexedArg extends ASTNode {
	    constructor(value) {
	        super();
	        this.type = 'indexed';
	        this.value = value;
	    }
	    toString() {
	        return this.value.toString()
	    }
	    async evalFilament(scope) {
	        this.log("evaluating value",this.value);
	        return this.value.evalFilament(scope)
	    }
	}
	const indexed = v => new FIndexedArg(v);

	class FNamedArg extends ASTNode {
	    constructor(name,value) {
	        super();
	        this.type = 'named';
	        this.name = name;
	        this.value = value;
	    }
	    toString() {
	        return this.name.toString() + ":" + this.value.toString()
	    }
	    async evalFilament(scope) {
	        this.log("evaluating",this.value);
	    }
	}
	const named   = (n,v) => new FNamedArg(n,v);

	class Pipeline extends ASTNode {
	    constructor(dir,first,next) {
	        super();
	        this.type = 'pipeline';
	        this.direction = dir;
	        this.first = first;
	        this.next = next;
	    }
	    toString() {
	        if(this.direction === 'right') {
	            return this.first.toString() + ">>" + this.next.toString()
	        }
	        if(this.direction === 'left') {
	            return this.next.toString() + "<<" + this.first.toString()
	        }
	    }
	    async evalJS(scope) {
	        let fval = await this.first.evalJS(scope);
	        return this.next.evalJS_with_pipeline(scope,indexed(fval))
	    }
	    async evalFilament(scope) {
	        let val1 = await this.first.evalFilament(scope);
	        if(this.next.type === 'identifier') {
	            return scope.set_var(this.next.name,val1)
	        } else {
	            return this.next.evalFilament(scope,indexed(val1))
	        }
	    }
	}
	const pipeline_right = (a,b) => new Pipeline('right',a,b);
	const pipeline_left = (a,b) => new Pipeline('left',b,a);

	class Identifier extends ASTNode {
	    constructor(name, source) {
	        super();
	        this.type = 'identifier';
	        this.name = strip_under(name.toLowerCase());
	        this._source = source;
	    }
	    toString() {
	        return this.name
	    }
	    async evalFilament(scope) {
	        try {
	            return scope.lookup(this.name)
	        } catch (e) {
	            // console.log("lookup error",e)
	            // console.log("identifier is at",this)
	            let err = new Error();
	            err.name = "my name";
	            err.message = "error at" + JSON.stringify(this._source);
	            err.source = this._source;
	            throw err
	        }
	    }
	}
	const ident = (n,s) => new Identifier(n,s);

	class IfExp extends ASTNode {
	    constructor(test,then_block,else_block) {
	        super();
	        this.type = 'if';
	        this.test = test;
	        this.then_block = then_block;
	        this.else_block = else_block;
	    }
	    async evalFilament(scope) {
	        let ans = await this.test.evalFilament(scope);
	        if(ans.value === true) {
	            return await this.then_block.evalFilament(scope)
	        } else {
	            return await this.else_block.evalFilament(scope)
	        }
	    }
	}
	const ifexp = (cond,then_block,else_block) => new IfExp(cond,then_block,else_block);

	class LambdaExp extends ASTNode {
	    constructor(params, block) {
	        super();
	        this.type = 'lambda';
	        this.params = params;
	        this.block = block;
	    }

	    toString() {
	        return `LAMBDA.toString() not implemented`
	    }

	    async evalFilament(scope) {
	        return this
	    }

	    async apply_function(scope, cb, params) {
	        let scope2 = new Scope('lambda',scope);
	        this.params.forEach((arg,i) => scope2.set_var(arg[0],params[i]));
	        return await this.block.evalFilament(scope2)
	    }
	    async do_apply(scope, params) {
	        let scope2 = new Scope("lambda",scope);
	        this.params.forEach((arg,i) => scope2.set_var(arg[0],params[i]));
	        return await this.block.evalFilament(scope2)
	    }

	}
	const lambda = (args,block) => new LambdaExp(args,block);
	class FBlock extends ASTNode{
	    constructor(sts) {
	        super();
	        this.type = 'block';
	        this.statements = sts;
	    }
	    toString() {
	        return this.statements.map(s => s.toString()).join("\n")
	    }
	    evalJS(scope) {
	        let res = this.statements.map(s => s.evalJS(scope));
	        return res[res.length-1]
	    }
	    async evalFilament(scope) {
	        let scope2 = scope.clone("block");
	        let last = null;
	        for(let s of this.statements) {
	            last = await s.evalFilament(scope2);
	        }
	        return last
	    }
	}
	const block = (sts) => new FBlock(sts);

	class IndexRef extends ASTNode {
	    constructor(exp,index) {
	        super();
	        this.exp = exp;
	        this.index = index;
	    }

	    async evalFilament(scope) {
	        let obj = await this.exp.evalFilament(scope);
	        let index = await this.index.evalFilament(scope);
	        return pack(obj._get_at_index(unpack(index)))
	    }
	}

	class CanvasResult{
	    constructor(cb) {
	        this.type = 'canvas-result';
	        this.cb = cb;
	    }
	}

	function pack(val) {
	    if(typeof val === 'number') return scalar(val)
	    if(typeof val === 'string') return string(val)
	    if(typeof val === 'boolean') return boolean(val)
	    // console.log("can't pack value",val, typeof val)
	    return val
	}
	function unpack(v) {
	    if(v.type === 'scalar') return v.value
	    if(v.type === 'string') return v.value
	    if(v.type === 'boolean') return v.value
	    // console.log("can't unpack value",v)
	    return v
	}
	const is_error_result = (result) => result instanceof Error;
	const is_scalar = (a) => a&&a.type === 'scalar';
	const is_boolean = (a) => a&&a.type === 'boolean';
	const is_string = (a) => a&&a.type === 'string';
	const is_list = (b) => b&&b.type === 'list';
	const is_canvas_result = (b) => b &&b.type === 'canvas-result';

	const REQUIRED = Symbol('REQUIRED');

	const strip_under = s => s.replaceAll("_", "");

	function do_bin_op(op, a, c) {
	    if (BINOPS[op]) return call(BINOPS[op], [indexed(a), indexed(c)])
	    throw new Error(`Unknown operator: ${op}`)
	}
	function do_un_op(op,val) {
	    if (UNOPS[op]) return call(UNOPS[op], [indexed(val)])
	    throw new Error(`Unknown operator: ${op}`)
	}


	class Parser {
	    constructor(scope, grammar_source) {
	        this.scope = scope;
	        this.grammar_source = grammar_source;
	        this.init(this.scope);
	    }

	    init(scope) {
	        this.grammar = ohm.grammar(this.grammar_source);
	        this.semantics = this.grammar.createSemantics();
	        this.semantics.addOperation('ast', {
	            _terminal() { return this.sourceString },

	            //primitives
	            ident(i, i2) { return ident(this.sourceString,this.source) },
	            bool: (a) => boolean(parseBoolean(a.sourceString)),
	            string: (_1, str, _2) => string(str.sourceString),

	            // number literals and units
	            number_whole: a => scalar(parseInt(strip_under(a.sourceString))),
	            number_hex: (_, a) => scalar(parseInt(strip_under(a.sourceString), 16)),
	            number_fract: (a, b, c) => scalar(parseFloat(strip_under(a.sourceString + b.sourceString + c.sourceString))),
	            unit: u => {
	                let name = u.sourceString;
	                if (is_valid_unit(name)) return to_canonical_unit(name)
	                throw new Error(`unknown unit type '${name}'`)
	            },
	            unitnumber: (v, u) => scalar(v.ast(), u.ast()),

	            // lists
	            NonemptyListOf: (a, b, c) => [a.ast()].concat(c.ast()),
	            EmptyListOf: () => [],
	            List: (a, b, c) => list(b.ast()),

	            // all binary operators
	            AsExp_convert: (v1, op, v2) => do_bin_op(op.ast(),v1.ast(),v2.ast()),
	            BoolExp_bool: (v1, op, v2) => do_bin_op(op.ast(),v1.ast(),v2.ast()),
	            AddExp_add: (a, op, c) => do_bin_op(op.ast(),a.ast(),c.ast()),
	            MulExp_mul: (a, op, c) => do_bin_op(op.ast(),a.ast(),c.ast()),
	            PipeOp_right: (first, _, next) => pipeline_right(first.ast(), next.ast()),
	            PipeOp_left:(next, _, first) => pipeline_left(next.ast(), first.ast()),

	            // all unary operators
	            UnExp: (op, val) => do_un_op(op.ast(),val.ast()),

	            GroupExp: (_1, e, _2) => e.ast(),

	            // function definitions and calls
	            Arg_named: (a, _, c) => named(a.ast().name, c.ast()),
	            Arg_indexed: a => indexed(a.ast()),
	            FuncallExp: (ident, _1, args, _2) => call(ident.ast().name, args.ast()),
	            DefArg_default: (a, _, c) => [a.ast().name, c.ast()],
	            DefArg_solo:(a) => [a.ast().name],
	            FundefExp: (def, name, _1, args, _2, block) => fundef(name.ast().name, args.ast(), block.ast()),

	            //lambdas
	            LambdaExp_full:  (_1, args, _2, _3, block) => lambda(args.ast(),block.ast()),
	            LambdaExp_short: (args, _3, block) => lambda([args.ast()],block.ast()),

	            //conditionals
	            IfExp_short: (_if, test, _then, a) => ifexp(test.ast(),a.ast()),
	            IfExp_full:  (_if, test, _then, a, _else, b) => ifexp(test.ast(),a.ast(),b.ast()),

	            //index dereference
	            IndexRef: (exp, _1, index, _2) => new IndexRef(exp.ast(),index.ast()),

	            Block: (_1, statements, _2) => block(statements.ast()),
	        });
	        this.semantics.addOperation('unicode',{
	            _terminal() { return this.sourceString },
	            ident(i, i2) { return ident(this.sourceString, this.source)  },
	            number(v) {
	                v = v.ast();
	                return ""+v.value
	            },
	            MulExp_mul: (v1, op, v2) => {
	                op = op.ast();
	                if(op === '*') op = "×";
	                return `${v1.unicode()} ${op} ${v2.unicode()}`
	            },
	            BoolExp_bool: (v1, op, v2) => {
	                op = op.unicode();
	                if(op === '<>') op = "≠";
	                return `${v1.unicode()} ${op} ${v2.unicode()}`
	            },
	            PipeOp_right: (first, _, next) => `${first.unicode()} → ${next.unicode()}`
	        });
	    }

	    parse(code) {
	        return this.grammar.match(code)
	    }

	    ast(match) {
	        return this.semantics(match).ast()
	    }

	}

	class FilamentFunction {
	    constructor(name, params, fun, opts) {
	        this.type = 'native-function';
	        this.name = strip_under(name.toLowerCase());
	        this.params = params;
	        this.fun = fun;
	        this.summary = "";
	        if(opts) {
	            if(opts.summary) this.summary = opts.summary;
	        }
	    }

	    log() {
	        let args = Array.prototype.slice.call(arguments);
	        console.log('###', this.name.toUpperCase(), ...args);
	    }

	    apply_function(args) {
	        let params = match_args_to_params(args,this.params,this.name);
	        return this.apply_with_parameters(params)
	    }

	    async apply_with_parameters(params) {
	        let ps = [];
	        for (let p of params) {
	            if (p && p.type === 'callsite') {
	                ps.push(await p.apply());
	            } else {
	                ps.push(await p);
	            }
	        }
	        return await this.fun.apply(this, ps)
	    }
	    do_apply(scope,params) {
	        return this.fun.apply(this,params)
	    }
	}

	class FilamentFunctionWithScope extends FilamentFunction {
	    do_apply(scope,params) {
	        return this.fun.apply(this,[scope].concat(params.slice()))
	    }
	}

	function parseBoolean(sourceString) {
	    if (sourceString.toLowerCase() === 'true') return true
	    if (sourceString.toLowerCase() === 'false') return false
	    throw new Error(`invalid boolean '${sourceString}'`)
	}

	const UNOPS = {
	    '-': 'negate',
	    '!': 'factorial',
	    'not': 'not'
	};
	const BINOPS = {
	    '+': 'add',
	    '-': 'subtract',
	    '*': 'multiply',
	    '/': 'divide',
	    '**': 'power',
	    '<': 'lessthan',
	    '>': 'greaterthan',
	    '=': 'equal',
	    '<>': 'notequal',
	    '<=': 'lessthanorequal',
	    '>=': 'greaterthanorequal',
	    'as': 'convertunit',
	    'and': 'and',
	    'or': 'or',
	    'mod': 'mod'
	};

	function binop(a,b,cb) {
	    // console.log("binop-ing",a,b)
	    if(is_scalar(a) && is_scalar(b)) return pack(cb(unpack(a),unpack(b)))
	    if(is_boolean(a) && is_boolean(b)) return pack(cb(unpack(a),unpack(b)))
	    if(is_list(a) && is_list(b)) {
	        return list(a.value.map((aa,i)=> pack(cb(unpack(a.value[i]),unpack(b.value[i])))))
	    }
	    if(is_list(a) && is_scalar(b)) {
	        return list(a.value.map((_,i)=> pack(cb(unpack(a.value[i]),unpack(b)))))
	    }
	    if(is_scalar(a) && is_list(b)) {
	        return list(b.value.map((_,i)=> pack(cb(unpack(a),unpack(b.value[i])))))
	    }
	    console.log("erroring",a,b,cb);
	    throw new Error("can't binop " + a.toString() + " " + b.toString())
	}

	function unop(a,cb) {
	    if(Array.isArray(a)) return a.map(v => cb(v))
	    return pack(cb(unpack(a)))
	}

	/**
	 * @name (add)
	 * @module (math)
	 * @params {
	 *     a:required,
	 *     b:required
	 * }
	 * @summary (Adds two values. Can be two numbers, with or without units. Can also be two lists. Or a number
	 * and a list. Follows the rules of all binary operations.)
	 *
	 * @example
	 * // use the operator form
	 * 4 + 2 = 6
	 * @end
	 *
	 * @example
	 * // use the function form
	 * add(4,2) = 6
	 * @end
	 *
	 * @example
	 * // number + list
	 * 4 + [2,3,4]  = [6,7,8]
	 * @end
	 *
	 * @example
	 * // list + list adds pairwise
	 * [1,2,3] + [4,5,6] = [5,7,9]
	 * @end
	 */
	const add = new FilamentFunction('add',{a:REQUIRED, b:REQUIRED},
	    function(a,b) {
	    if(is_scalar_with_unit(a) && is_scalar_without_unit(b)) throw new Error(`cannot add incompatible units ${a.toString()} and ${b.toString()}`)
	    if(is_scalar_with_unit(a) && is_scalar_with_unit(b)) {
	        let conv = find_conversion(a,b);
	        // console.log('final conversion is',conv)
	        if(conv) return scalar(a.value/conv.ratio + b.value, conv.to)
	    }
	    if(is_time(a) && is_scalar_with_unit(b)) {
	        //convert b to seconds
	        let conv = find_conversion(b,scalar(0,'second',1));
	        if(!conv) throw new Error(`cannot convert ${b.unit} to seconds`)
	        let seconds = scalar(b.value/conv.ratio,conv.to);
	        let new_date = addSeconds(a.value,seconds.value);
	        return time(new_date)
	    }

	    return binop(a,b, (a,b)=>a+b)
	},{
	    summary:'add numbers and lists'
	    });

	/**
	 * @name (subtract)
	 * @module (math)
	 * @params {
	 *     a:required,
	 *     b:required
	 * }
	 * @summary (subtracts two values. Can be two numbers, with or without units. Can also be two lists. Or a number
	 * and a list. Follows the rules of all binary operations. )
	 * @example
	 * //list - list
	 * [1,2,3] - [4,5,6] = [-3,-3,-3]
	 * @end
	 */
	const subtract = new FilamentFunction('subtract',{a:REQUIRED, b:REQUIRED},
	    function (a,b) {
	        if(is_scalar_with_unit(a) && is_scalar_without_unit(b)) throw new Error(`cannot subtract incompatible units ${a.toString()} and ${b.toString()}`)
	        if(is_scalar_with_unit(a) && is_scalar_with_unit(b)) {
	            let conv = find_conversion(a,b);
	            if(conv) return scalar(a.value/conv.ratio - b.value, conv.to)
	        }
	        if(is_date(a) && is_date(b)) {
	            console.log("subtracting scalar with unit",a,b);
	            let days = differenceInDays(a.value,b.value);
	            return scalar(days,'days',1)
	        }
	        if(is_time(a) && is_time(b)) {
	            console.log("subtracting scalar with unit",a,b);
	            let seconds = differenceInSeconds(a.value,b.value);
	            return scalar(seconds,'seconds',1)
	        }
	        if(is_time(a) && is_scalar_with_unit(b)) {
	            //convert b to seconds
	            let conv = find_conversion(b,scalar(0,'second',1));
	            if(!conv) throw new Error(`cannot convert ${b.unit} to seconds`)
	            let seconds = scalar(b.value/conv.ratio,conv.to);
	            let new_date = addSeconds(a.value,-seconds.value);
	            return time(new_date)
	        }

	    return binop(a,b,(a,b)=>a-b)
	},{
	    summary:'subtract numbers and lists'
	    });

	function is_scalar_with_unit(a) {
	    if(a.unit === 'none') return false
	    if(is_scalar(a) && a.unit !== null) return true
	    return false
	}

	function is_date(a) {
	    return a.type === 'date'
	}
	function is_time(a) {
	    return a.type === 'time'
	}


	function is_scalar_without_unit(a) {
	    if(is_scalar(a) && (a.unit === null || a.unit === 'none') ) return true
	    return false
	}

	/**
	 * @name (multiply)
	 * @module (math)
	 * @params {
	 *     a:required,
	 *     b:required
	 * }
	 * @summary (Multiplies two values. Can be two numbers, with or without units. Can also be two lists. Or a number
	 * and a list. Follows the rules of all binary operations.)
	 *
	 * @example
	 * // use the operator form
	 * 4 * 2 = 8
	 * @end
	 *
	 * @example
	 * // use the function form
	 * multiply(4,2) = 8
	 * @end
	 *
	 * @example
	 * // number + list
	 * 4 * [2,3,4]  = [8,12,16]
	 * @end
	 *
	 * @example
	 * // list + list adds pairwise
	 * [1,2,3] * [4,5,6] = [4,10,18]
	 * @end
	 */

	const multiply = new FilamentFunction('multiply',{a:REQUIRED, b:REQUIRED},
	    function (a,b) {
	        //if one has a unit and one does
	        if(is_scalar_with_unit(a) && is_scalar_without_unit(b)) {
	            return scalar(a.value*b.value,a.unit)
	        }
	        if(is_scalar_with_unit(b) && is_scalar_without_unit(a)) {
	            return scalar(b.value*a.value,b.unit)
	        }
	        if(is_scalar_with_unit(a) && is_scalar_with_unit(b)) {
	            let conv = find_conversion(a,b);
	            if(conv) return scalar(a.value/conv.ratio*b.value,conv.to,a.dim+b.dim)
	        }
	    return binop(a,b,(a,b)=>a*b)
	},{
	    summary:'multiply numbers and lists'
	    });

	/**
	 * @name (divide)
	 * @module (math)
	 * @params {
	 *     a:required,
	 *     b:required
	 * }
	 * @summary (Divides two values. Can be two numbers, with or without units. Can also be two lists. Or a number
	 * and a list. Follows the rules of all binary operations.)
	 *
	 * @example
	 * // use the operator form
	 * 4 / 2 = 2
	 * @end
	 *
	 * @example
	 * // use the function form
	 * divide(4,2) = 2
	 * @end
	 *
	 * @example
	 * // number + list
	 * 4 / [2,3,4]  = [2,1.333,1]
	 * @end
	 *
	 * @example
	 * // list + list adds pairwise
	 * [1,2,3] / [4,5,6] = [0.25,0.2,0.5]
	 * @end
	 */

	const divide = new FilamentFunction('divide',{a:REQUIRED, b:REQUIRED},
	    function (a,b) {
	        if(is_scalar_with_unit(a) && is_scalar_without_unit(b)) {
	            return scalar(a.value/b.value,a.unit)
	        }
	        if(is_scalar_with_unit(b) && is_scalar_without_unit(a)) {
	            return scalar(b.value/a.value,b.unit)
	        }
	        if(is_scalar_with_unit(a) && is_scalar_with_unit(b)) {
	            let conv = find_conversion(a,b);
	            if(conv) return scalar(a.value/conv.ratio/b.value,conv.to,a.dim-b.dim)
	        }
	    return binop(a,b,(a,b)=>a/b)
	});

	/**
	 * @name (power)
	 * @module (math)
	 * @params {
	 *     a:required,
	 *     b:required
	 * }
	 * @summary (raises a value to a power. Can be two numbers, with or without units. Can also be two lists. Or a number
	 * and a list. Follows the rules of all binary operations.)
	 *
	 * @example
	 * // use the operator form
	 * 4 ** 2 = 16
	 * @end
	 *
	 * @example
	 * // use the function form
	 * power(4,2) = 16
	 * @end
	 *
	 * @example
	 * // number + list
	 * 4 ** [2,3,4]  = [16,64,256]
	 * @end
	 *
	 * @example
	 * // list + list adds pairwise
	 * [1,2,3] ** [4,5,6] = [1, 32, 729]
	 * @end
	 */
	const power = new FilamentFunction('power',{a:REQUIRED, b:REQUIRED},
	    function (a,b) {
	        if(is_scalar_with_unit(a) && is_scalar_without_unit(b)) {
	            return scalar(Math.pow(a.value,b.value),a.unit)
	        }
	    return binop(a,b,(a,b)=>Math.pow(a,b))
	});
	/**
	 * @name (sqrt)
	 * @module (math)
	 * @params {
	 *     a:required
	 * }
	 * @summary (returns the square root of a scalar value. If the value has a unit, the return will be in the same unit.
	 * Can also work on lists by applying the square root to each value in the list.
	 * Follows the rules of all unary operations. )
	 */
	const sqrt = new FilamentFunctionWithScope('sqrt',{a:REQUIRED},function(scope,a) {
	    return unop(a,(a)=>Math.sqrt(a))
	});

	/**
	 * @name(negate)
	 * @module(math)
	 * @params{
	 *   a:required
	 * }
	 * @summary(returns the negation of the value)
	 */
	const negate = new FilamentFunction('negate', {a:REQUIRED}, (a) =>unop(a,a=>-a));

	/**
	 * @name(factorial)
	 * @module(math)
	 * @params {
	 *     a:required
	 * }
	 * @summary(returns the factorial of the number)
	 */
	const factorial = new FilamentFunction('factorial', {a:REQUIRED}, (a) => unop(a,(a)=>{
	    if(a === 0 || a === 1) return 1
	    let sum = 1;
	    for(let i=1; i<=a; i++) sum *= i;
	    return sum
	}));

	function make_binop(name, cb) {
	    return new FilamentFunction(name,{a:REQUIRED, b:REQUIRED}, (a,b) => binop(a,b,cb))
	}

	function make_unop(name, cb) {
	    return new FilamentFunction(name,{a:REQUIRED}, (a) => unop(a,cb))
	}

	/**
	 * @name(sin)
	 * @module(math)
	 * @params {
	 *     a:required
	 * }
	 * @summary(returns the sine of the angle specified in radians)
	 */
	const sin = new FilamentFunction('sin', {a:REQUIRED}, (a) =>scalar(Math.sin(a.value)));
	/**
	 * @name(cos)
	 * @module(math)
	 * @params {
	 *     a:required
	 * }
	 * @summary(returns the cosine of the angle specified in radians)
	 */
	const cos = new FilamentFunction('cos', {a:REQUIRED}, (a) =>scalar(Math.cos(a.value)));
	/**
	 * @name(tan)
	 * @module(math)
	 * @params {
	 *     a:required
	 * }
	 * @summary(returns the tangent of the angle specified in radians)
	 */
	const tan = new FilamentFunction('tan', {a:REQUIRED}, (a) =>scalar(Math.tan(a.value)));
	/**
	 * @name(abs)
	 * @module(math)
	 * @params {
	 *     a:required
	 * }
	 * @summary(returns the absolute value of the value)
	 */
	const abs = new FilamentFunction('abs', {a:REQUIRED}, (a) =>scalar(Math.abs(a.value)));

	/**
	 * @name(mod)
	 * @module(math)
	 * @params {
	 *     a:required,
	 *     b:required
	 * }
	 * @summary(performs remainder division)
	 * @example
	 *  8 mod 5  = 3
	 * @end
	 */
	const mod = make_binop('mod',(a,b)=>a%b);

	/**
	 * @name(lessthan)
	 * @module(math)
	 * @params {
	 *     a:required,
	 *     b:required
	 * }
	 * @summary(returns true of the first value is less than the other)
	 * @example
	 *  //operator form
	 * @end
	 */
	const lessthan = make_binop('lessthan',(a,b)=>a<b);
	const greaterthan = make_binop('greaterthan',(a,b)=>a>b);
	const equal = make_binop('equal',(a,b)=>a===b);
	const notequal = make_binop('notequal',(a,b)=>a!==b);
	const lessthanorequal = make_binop('lessthanorequal',(a,b)=>a<=b);
	const greaterthanorequal = make_binop('greaterthanorequal',(a,b)=>a>=b);
	const and = make_binop('and',(a,b)=>a&&b);
	const or = make_binop('or',(a,b)=>a||b);
	const not = make_unop('not',a => !a);


	const convertunit = new FilamentFunction('convertunit',
	    {a:REQUIRED,b:REQUIRED},
	    (a,b) => {
	        return scalar(
	            convert_unit(a.value,a.unit,to_canonical_unit(b)),
	            to_canonical_unit(b))
	    });


	/**
	 * @name (is_prime)
	 * @module (math)
	 * @params {
	 *     n:required
	 * }
	 * @summary ( Returns true if the number is prime, false otherwise. )
	 */

	const is_prime = new FilamentFunction('is_prime', {n:REQUIRED},function(n) {
	    let num = unpack(n);
	    for(let i = 2; i < num; i++)
	        if(num % i === 0) return pack(false);
	    return pack(num > 1);
	});

	const today = new FilamentFunction('today',{

	},function() {
	    let today = Date.now();
	    return date(getYear(today),getMonth(today),getDate(today))
	},{
	    summary:'get the current date'
	});
	const date_cons = new FilamentFunction('date',{
	    input:null,
	    year:scalar(0),
	    month:scalar(0),
	    day:scalar(0),
	    format:null,
	},function(input,year,month,day,format){
	    // console.log("making a date from",input,year,month,day)
	    if(input && format) {
	        let dt = parse(input,format,new Date());
	        return date(getYear(dt),getMonth(dt)+1,getDate(dt))
	    }
	    // if(input && !format) {
	    //     let dt = toDate(input)
	    //     return date(getYear(dt),getMonth(dt)+1,getDate(dt))
	    // }
	    if(year.value > 0 && month.value > 0 && day.value > 0) {
	        return date(unpack(year), unpack(month), unpack(day))
	    }

	    throw new Error(`cannot create date from args ${input} , ${year}, ${month},${day},${format}`)
	});

	/*
	 * @name (time)
	 * @module (datetime)
	 * @params {
	 *     input:null,
	 *     hour:0,
	 *     minute:0,
	 *     second:0,
	 *     format:null,
	 * }
	 * @summary ( creates a new time object. You can specify the hour, minute, and second as numbers, or pass a string
	 * input and a format to be parsed. [Format description](https://date-fns.org/v2.18.0/docs/format). )
	 * @example (
	 *      to create 1:43 PM use `time(hour:13, minute:43)`
	 * )
	 * @example (
	 *      to create 1:43 PM using a string, use `time('1:43 PM', format:'h:mm AA')`
	 * )
	 */


	const time_cons = new FilamentFunction('time',{
	    input:null,
	    hour:scalar(0),
	    minute:scalar(0),
	    second:scalar(0),
	    format:null,
	},function(input,hour,minute,second,format){
	    // console.log("making a time from",input,hour,minute,second,format)
	    if(input && format) {
	        let dt = parse(input,format,new Date());
	        // console.log("parsed date",dt)
	        return time(getHours(dt), getMinutes(dt), getSeconds(dt))
	    }
	    // if(input && !format) {
	    //     let dt = toDate(input)
	    //     return date(getYear(dt),getMonth(dt)+1,getDate(dt))
	    // }
	    // if(hour.value > 0 && minput.value > 0 && second.value > 0) {
	    //     return date(unpack(hour), unpack(minute), unpack(second))
	    // }

	    throw new Error(`cannot create date from args ${input} , ${hour}, ${minute},${second},${format}`)
	});


	const random = new FilamentFunction('random',
	    {
	        max:scalar(1),
	        min:scalar(0),
	        count:scalar(1)
	    },
	    function(max,min,count) {
	        max = unpack(max);
	        min = unpack(min);
	        count = unpack(count);
	        const make = () => scalar(min+Math.random()*(max-min));

	        if(count > 1) {
	            let arr = [];
	            for(let i=0; i<count; i++) {
	                arr.push(make());
	            }
	            return list(arr)
	        } else {
	            return make()
	        }
	    });

	const floor = new FilamentFunction('floor',{
	    value:REQUIRED,
	},function(value) {
	    return pack(Math.floor(unpack(value)))
	});
	const ceiling = new FilamentFunction('ceiling',{
	    value:REQUIRED,
	},function(value) {
	    return pack(Math.ceil(unpack(value)))
	});

	/**
	 * @name (range)
	 * @module (list)
	 * @params {
	 *     max:required,
	 *     min:0,
	 *     step:1,
	 * }
	 * @summary ( creates a new list of numbers, from min to max, counting by step. If min is left out it defaults to 0. If step is
	 * left out it defaults to 1. *note* the count will always go up to max, but not include it. Thus `range 5` returns `[0,1,2,3,4]`
	 * )

	 * @example
	 * // List from 0 to 13:
	 * range(5) = [0,1,2,3,4]
	 * @end
	 *
	 * @example
	 * // same with max:
	 * range(max:5) = [0,1,2,3,4]
	 * @end
	 *
	 * @example
	 * // 103 to 108
	 * range(min:103, max:108) = [103,104,105,106,107]
	 * @end
	 *
	 * @example
	 * // multiples of 5 up to 100:
	 * range(100, step:5) = [0,4,9]
	 * @end
	 */
	const range = new FilamentFunction('range',
	    {
	        max:REQUIRED,
	        min:scalar(0),
	        step:scalar(1)
	    },
	    function(max,min,step) {
	        // this.log("making a range",max,min,step)
	        function gen_range(min,max,step) {
	            let list = [];
	            for(let i=min; i<max; i+=step) {
	                list.push(i);
	            }
	            return list
	        }
	        return list(gen_range(min.value,max.value,step.value).map(v => scalar(v)))
	    });


	/**
	 * @name (length)
	 * @module (list)
	 * @params {
	 * data:required
	 * }
	 *
	 * @summary ( returns length of list )
	 *
	 * @example
	 * length ([1,8,2]) = 2
	 * @end
	 */
	const length = new FilamentFunction('length', {
	        data:REQUIRED,
	    },
	    function(data) {
	        // this.log(data)
	        return scalar(data._get_length())
	    }
	);

	// * __take__: take the first N elements from a list to make a new list `take([1,2,3], 2) = [1,2]`
	/**
	 * @name(take)
	 * @module(list)
	 * @params {
	 *     data:REQUIRED,
	 *     count:REQUIRED
	 * }
	 * @summary(returns part of the list. positive count takes from the beginning. negative count takes from the end)
	 *
	 * @example
	 * data << range(0,10)
	 * take(data, 2) = [0, 1]
	 * @end
	 *
	 * @example
	 * data << range(0,10)
	 * take(data, -2) = [8,9]
	 * @end
	 */
	const take = new FilamentFunction('take',
	    {
	        data:REQUIRED,
	        count:REQUIRED,
	    },function(data,count) {
	        // this.log("taking from data",data,'with count',count)
	        if(count < 0) {
	            return data._slice(data._get_length()+unpack(count),data._get_length())
	        } else {
	            return data._slice(0, unpack(count))
	        }
	    });

	/**
	 * @name(drop)
	 * @module(list)
	 * @params {
	 *     data:REQUIRED,
	 *     count:REQUIRED,
	 * }
	 * @summary(removes part of the list and returns the rest. positive count drops from the start. negative count drops from the end.)
	 * @example
	 * data << range(0,10)
	 * drop(data,2) = [2,3,4,5,6,7,8,9]
	 * @end
	 * @example
	 * data << range(0,10)
	 * drop(data,-2) = [0,1,2,3,4,5,6,7]
	 * @end
	 */
	const drop =  new FilamentFunction(  "drop",
	    {
	        data:REQUIRED,
	        count:REQUIRED,
	    },
	    function (data,count) {
	        // this.log('params',data,count)
	        if(count < 0) {
	            return data._slice(0,data.value.length+unpack(count))
	        } else {
	            return data._slice(unpack(count))
	        }
	    });


	// * __join__: concatentate two lists, returning a new list. is this needed?
	/**
	 * @name(join)
	 * @module(list)
	 * @params {
	 *     data:REQUIRED,
	 *     more:REQUIRED
	 * }
	 * @summary(Joins two lists. returns the new combined list.)
	 * @example
	 * join([1,2],   [99,100]) = [1,2,99,100]
	 * @end
	 */
	const join = new FilamentFunction('join',{
	        data:REQUIRED,
	        more:REQUIRED,
	    },
	    function(data,more) {
	        if(is_list(data) && is_list(more))    return list(data.value.concat(unpack(more.value)))
	        if((!is_list(data)) && is_list(more)) return list([data].concat(unpack(more.value)))
	        if(is_list(data) && !is_list(more))   return list(data.value.concat([more]))
	        return list([data].concat([more]))
	    }
	);


	// * __map__:  convert every element in a list using a lambda function: `(list, lam)`
	/**
	 * @name(map)
	 * @module(list)
	 * @params {
	 *     data:REQUIRED,
	 *     with:REQUIRED
	 * }
	 * @summary(applies the function 'with' to every element of the list, creating a new list)
	 * @example
	 * data << range(3)
	 * map(data, with: x => x*2)
	 * // returns [2,4,6],
	 * @end
	 *
	 * @example
	 * double << (x) => {
	 *   x * 2
	 * }
	 * range(10) >> map(with:double)
	 * // returns [1,2,3,5,7]
	 * @end
	 */
	const map = new FilamentFunctionWithScope('map',{
	    data:REQUIRED,
	    with:REQUIRED,
	},function(scope, data,cb) {
	    let proms = data._map((el,i)=> async () => {
	        return await apply_fun(scope, cb, [el])
	    });
	    return resolve_in_order(proms).then(vals => list(vals))
	});

	/**
	 * @name(select)
	 * @module(list)
	 * @params {
	 *     data:REQUIRED,
	 *     where:REQUIRED
	 * }
	 * @summary(return a subset of a list based on if the  'where' function returns true or false)
	 *
	 * @example
	 * //is_prime is a built in function that returns true or false if the number is prime
	 * select(range(10), where:is_prime)
	 * // returns [1,2,3,5,7]
	 * @end
	 *
	 */
	const select = new FilamentFunctionWithScope('select',{
	    data:REQUIRED,
	    where:REQUIRED,
	},async function(scope,data,where) {
	    let vals = await Promise.all(data._map(async (el)=>{
	        if(where.type === 'lambda') {
	            return await where.apply_function(scope,where,[el])
	        } else {
	            return await where.fun.apply(where, [el])
	        }
	    }));
	    return list(data._filter((v,i)=>unpack(vals[i])))
	});

	/**
	 * @name(sort)
	 * @module(list)
	 * @params{
	 *     data:REQUIRED,
	 *     order:"ascending"
	 *     by:null
	 * }
	 * @summary(returns a sorted copy of the list. set the order to 'ascending' or 'descending'.
	 *  sort by part of the value using the `by` parameter.
	 * )
	 * @example
	 * sort([42,2,4])
	 * //returns [2,4,42]
	 * @end
	 */

	const sort = new FilamentFunction( "sort",
	    {
	        data:REQUIRED,
	        order:"ascending",
	    },
	    function(data,order) {
	        // this.log("params",data,order)
	        let new_data = data._slice()._sort((a,b)=>{
	            let av = unpack(a);
	            let bv = unpack(b);
	            if(av < bv) return -1
	            if(av > bv) return 1
	            return 0
	        });
	        if(unpack(order) === 'descending') {
	            return new_data.reverse()
	        } else {
	            return new_data
	        }
	    }
	);

	/**
	 * @name(reverse)
	 * @module(list)
	 * @params{
	 *     data:REQUIRED
	 * }
	 * @summary(returns a copy of the list with a reverse order)
	 * @example
	 * reverse([42,2,4])
	 * //returns [4,2,42]
	 * @end
	 */
	const reverse = new FilamentFunction('reverse',{
	    data:REQUIRED,
	},function(data) {
	    // this.log("params",data)
	    return list(data.value.reverse())
	});

	/**
	 * @name(sum)
	 * @module(list)
	 * @params {
	 *     data:REQUIRED
	 * }
	 * @summary(adds a list of numbers together)
	 * @example
	 * sum([42,2,4])
	 * // returns 48
	 * @end
	 */
	const sum = new FilamentFunction("sum",
	    {
	        data:REQUIRED,
	    },
	    async function(data) {
	        return await scalar(data._reduce((a,b)=>unpack(a)+unpack(b)))
	    }
	);

	/**
	 * @name(max)
	 * @module(list)
	 * @params {
	 *     data:REQUIRED
	 * }
	 * @summary(returns the biggest element in the list)
	 * @example
	 * max([4,2,42])
	 * //returns 42
	 * @end
	 */
	new FilamentFunction("max",
	    {
	        data:REQUIRED,
	    },
	    function (data) {
	        return data._reduce((a,b)=> a>b?a:b)
	    }
	);

	/**
	 * @name(min)
	 * @module(list)
	 * @params {
	 *     data:REQUIRED
	 * }
	 * @summary(returns the smallest element in the list)
	 * @example
	 * min([4,2,42])
	 * //returns 2
	 * @end
	 */
	new FilamentFunction("min",
	    {
	        data:REQUIRED,
	    },
	    function (data) {
	        return data._reduce((a,b)=> a<b?a:b)
	    }
	);

	const get_field = new FilamentFunction("get_field",{
	    data:REQUIRED,
	    field:REQUIRED
	},(data,field)=>{
	    if(is_date(data)) {
	        let f = unpack(field);
	        if(f === 'year') {
	            return scalar(getYear(unpack(data).value))
	        }
	    }
	    return pack(data[unpack(field)])
	});

	const COLORS = ['red','green','blue','yellow','magenta','cyan'];
	const STYLE = {
	    FONT_SIZE:20,
	    FONT_COLOR: 'black',
	    X_AXIS: {
	        TICK_LENGTH:10,
	        LINE_WIDTH: 2,
	        LINE_COLOR:'#888888',
	    },
	    Y_AXIS: {
	        TICK_LENGTH:2,
	        LINE_WIDTH: 2,
	        LINE_COLOR:'#888888',
	    },
	    LEGEND: {
	        FILL_COLOR: '#cccccc'
	    }
	};
	STYLE.FONT = `${STYLE.FONT_SIZE}px sans-serif`;

	class Bounds {
	    constructor(x, y, w, h) {
	        this.x = x;
	        this.y = y;
	        this.w = w;
	        this.h = h;
	        this.x2 = this.x + this.w;
	        this.y2 = this.y+this.h;
	    }
	    inset(n) {
	        return new Bounds(this.x+n,this.y+n,this.w-n*2,this.h-n*2)
	    }
	    expand(n) {
	        return this.inset(-n)
	    }
	    inset_sides(top,right,bottom,left) {
	        return new Bounds(this.x+left,this.y+top, this.w-left-right, this.h-top-bottom)
	    }
	}

	function clear$1(ctx, canvas) {
	    ctx.fillStyle = 'white';
	    ctx.fillRect(0, 0, canvas.width, canvas.height);
	}

	function draw_centered_text(ctx, font_size, text, x, y) {
	    ctx.fillStyle = STYLE.FONT_COLOR;
	    ctx.font = `${font_size}px sans-serif`;
	    let measure1 = ctx.measureText(text);
	    let xoff = measure1.width/2;
	    ctx.fillText(text,x - xoff, y);
	}
	function draw_right_aligned_text(c, label, x, y) {
	    c.fillStyle = STYLE.FONT_COLOR;
	    c.font = STYLE.FONT;
	    let measure = c.measureText(label);
	    let lh = STYLE.FONT_SIZE;
	    c.fillText(label, x - measure.width, y+lh/2);
	}



	const max = (data) => data.reduce((a,b)=> unpack(a)>unpack(b)?a:b);
	const min = (data) => data.reduce((a,b)=> unpack(a)<unpack(b)?a:b);

	function draw_legend(c, b, m) {
	    c.font = STYLE.FONT;
	    let legend =`${m.x_label} vs ${m.y_label}`;
	    let metrics = c.measureText(legend);

	    let xx = b.x+(b.w-metrics.width)/2;
	    let yy = STYLE.FONT_SIZE;
	    let txt_bounds = new Bounds(xx,yy-STYLE.FONT_SIZE,metrics.width,STYLE.FONT_SIZE);
	    txt_bounds = txt_bounds.expand(10);
	    c.fillStyle = STYLE.LEGEND.FILL_COLOR;
	    c.fillRect(txt_bounds.x,txt_bounds.y,txt_bounds.w, txt_bounds.h);
	    c.fillStyle = STYLE.FONT_COLOR;
	    c.font = STYLE.FONT;
	    c.fillText(legend,xx,yy);
	}

	function draw_scatter(c, b, m) {
	    let default_radius = 10;
	    let x_scale = b.w/m.x_axis.max;
	    let y_scale = b.h/m.y_axis.max;
	    let max_s = default_radius;
	    if(m.size) max_s = m.size_axis.max;
	    let s_scale = 100/max_s;

	    m.data._forEach((datum,i) => {
	        let vx = m.x_axis.values[i] * x_scale + b.x;
	        let vy = b.h - (m.y_axis.values[i] * y_scale) + b.y;
	        let vs = default_radius;
	        if(m.size) vs = m.size_axis.values[i] * s_scale;
	        c.fillStyle = '#ccffcc';
	        c.beginPath();
	        c.arc(vx, vy, vs, 0, Math.PI*2);
	        c.fill();
	        c.strokeStyle = 'black';
	        c.stroke();
	        if(m.name) {
	            let vn = unpack(m.name_axis.values[i]);
	            draw_centered_text(c,STYLE.FONT_SIZE, vn+"", vx, vy);
	        }
	    });

	    c.strokeStyle = STYLE.X_AXIS.LINE_COLOR;
	    c.lineWidth = STYLE.X_AXIS.LINE_WIDTH;
	    c.beginPath();
	    c.moveTo(b.x,b.y);
	    c.lineTo(b.x,b.y2);
	    c.lineTo(b.x2,b.y2);
	    c.stroke();
	}

	function calc_data_metrics(data, x, x_label, y, y_label, size, name) {
	    if(!x) x = 'index';
	    let m = {
	        data:data,
	        x:x,
	        x_label:x_label,
	        y:y,
	        y_label:y_label,
	        count:data._get_length(),
	        size: size,
	        name:name,
	    };
	    if(x) {
	        m.x_axis = {
	            get: (d, i) => {
	                if (m.x === 'index') return i + ""
	                return m.data._get_field_from(m.x, d, i)
	            },
	        };
	        m.x_axis.values = m.data._map(m.x_axis.get);
	        m.x_axis.max = unpack(max(m.x_axis.values));
	        m.x_axis.min = unpack(min(m.x_axis.values));
	    }

	    m.y_axis = {
	        get:(d,i)=>{
	            if(typeof m.y === 'function') return m.y(d,i)
	            if(is_string(m.y)) return m.data._get_field_from(m.y,d,i)
	            return d
	        },
	    };
	    m.y_axis.values = m.data._map(m.y_axis.get);
	    m.y_axis.max = unpack(max(m.y_axis.values));
	    m.y_axis.min = unpack(min(m.y_axis.values));

	    if(size) {
	        m.size_axis = {
	            get: (d, i) => m.data._get_field_from(m.size, d, i),
	        };
	        m.size_axis.values = m.data._map(m.size_axis.get);
	        m.size_axis.max = unpack(max(m.size_axis.values));
	    }
	    if(name) {
	        m.name_axis = {
	            get: (d, i) => m.data._get_field_from(m.name, d, i),
	        };
	        m.name_axis.values = m.data._map(m.name_axis.get);
	        m.name_axis.max = unpack(max(m.name_axis.values));
	    }
	    return m
	}

	/**
	 * @name (chart)
	 * @module (charts)
	 * @params {
	 *     data: required,
	 *     x: null,
	 *     xlabel: null,
	 *     y: null,
	 *     ylabel:null,
	 *     type:bar,
	 *     size:null,
	 *     name:null,
	 * }
	 * @summary ( Draws a chart. Type can be either 'bar' or 'scatter'.
	 *
	 * )
	 */
	const chart = new FilamentFunction('chart',
	    {
	        data:REQUIRED,
	        x:null,
	        xlabel:null,
	        y:null,
	        ylabel:null,
	        type:string('bar'),
	        size: null,
	        name:null
	    },
	    function (data, x, xlabel, y, ylabel, type, size, name) {
	    return new CanvasResult((canvas)=>{
	        let ctx = canvas.getContext('2d');
	        ctx.save();
	        clear$1(ctx,canvas);
	        if(data.data && data.data.items) data = data.data.items;

	        let x_label = 'index';
	        if(x && x.type === 'string') x_label = x.value;
	        if(xlabel) x_label = xlabel.value;

	        let y_label = 'value';
	        if(y && y.type === 'string') y_label = y.value;
	        if(ylabel) y_label = ylabel.value;

	        let bounds = new Bounds(0,0,canvas.width,canvas.height);
	        let m = calc_data_metrics(data,
	            x,x_label,
	            y,y_label,
	            size,
	            name,
	            );
	        bounds = bounds.inset(STYLE.FONT_SIZE*1.5);
	        if(type.value === 'bar') {
	            draw_xaxis(ctx,bounds,m);
	            draw_yaxis(ctx,bounds,m);
	            draw_bars(ctx,bounds,m);
	            draw_legend(ctx,bounds,m);
	        }
	        if(type.value === 'scatter') {
	            bounds = new Bounds(bounds.x+50,bounds.y+50,bounds.w-50,bounds.h-50);
	            draw_scatter(ctx,bounds,m);
	            draw_legend(ctx,bounds,m);
	            draw_xaxis(ctx,bounds,m);
	            draw_yaxis(ctx,bounds,m);
	        }
	        ctx.restore();
	    })
	},{
	    summary:'simple bar and scatter charts'
	    });


	function draw_bars(ctx, bounds, m) {
	    let bar_inset = 5;
	    const bar_width = bounds.w/m.count;
	    let y_scale = (bounds.h)/m.y_axis.max;

	    m.y_axis.values.forEach((item,i)=>{
	        let value = unpack(m.y_axis.get(item,i));
	        ctx.fillStyle = COLORS[i%COLORS.length];
	        ctx.fillRect(
	            bounds.x + bar_width * i+bar_inset,
	            bounds.y2-value*y_scale,
	            bar_width-bar_inset*2,
	            value*y_scale);
	    });
	}

	function draw_xaxis(c, b, m) {
	    const bar_width = b.w/m.count;


	    // x axis line
	    c.lineWidth = STYLE.X_AXIS.LINE_WIDTH;
	    c.strokeStyle = STYLE.X_AXIS.LINE_COLOR;
	    c.beginPath();
	    c.moveTo(b.x,b.y2);
	    c.lineTo(b.x2,b.y2);
	    c.stroke();

	    // ticks between each section, below the line
	    c.beginPath();
	    for(let i=0; i<=m.count; i++) {
	        c.moveTo(b.x+i*bar_width, b.y2);
	        c.lineTo(b.x+i*bar_width, b.y2 + STYLE.X_AXIS.TICK_LENGTH);
	    }
	    c.stroke();

	    // labels for each bar below the line
	    c.fillStyle = STYLE.FONT_COLOR;
	    c.font = STYLE.FONT;
	    m.x_axis.values.forEach((item,i)=>{
	        let label = unpack(m.x_axis.get(item,i));
	        let x = b.x+bar_width*i + bar_width/2;
	        let y = b.y2+STYLE.FONT_SIZE;
	        draw_centered_text(c,STYLE.FONT_SIZE,label,x,y);
	    });
	}

	function draw_yaxis(c, b, m) {
	    let ticks = m.y_axis.max - 0;
	    let tick_gap = b.h/ticks;
	    while(tick_gap < 20) {
	        tick_gap = tick_gap*10;
	        ticks = ticks / 10;
	    }
	    ticks = Math.floor(ticks);
	    tick_gap = Math.floor(tick_gap);

	    //y axis line
	    c.lineWidth = STYLE.Y_AXIS.LINE_WIDTH;
	    c.strokeStyle = STYLE.Y_AXIS.LINE_COLOR;

	    //y axis line
	    c.beginPath();
	    c.moveTo(b.x,b.y);
	    c.lineTo(b.x,b.y2);
	    c.stroke();

	    //draw background lines
	    c.beginPath();
	    //light h lines across each tick
	    for(let i=0; i<ticks; i++) {
	        c.moveTo(b.x,b.y2-i*tick_gap);
	        c.lineTo(b.x2,b.y2-i*tick_gap);
	    }
	    c.stroke();

	    //draw tick labels
	    for(let i=0; i<ticks; i++) {
	        let label = (ticks-i)+"";
	        draw_right_aligned_text(c,label,b.x,b.y2-(ticks-i)*tick_gap);
	    }

	}

	var browser$1 = createCommonjsModule(function (module, exports) {

	// ref: https://github.com/tc39/proposal-global
	var getGlobal = function () {
		// the only reliable means to get the global object is
		// `Function('return this')()`
		// However, this causes CSP violations in Chrome apps.
		if (typeof self !== 'undefined') { return self; }
		if (typeof window !== 'undefined') { return window; }
		if (typeof global !== 'undefined') { return global; }
		throw new Error('unable to locate global object');
	};

	var global = getGlobal();

	module.exports = exports = global.fetch;

	// Needed for TypeScript and Webpack.
	if (global.fetch) {
		exports.default = global.fetch.bind(global);
	}

	exports.Headers = global.Headers;
	exports.Request = global.Request;
	exports.Response = global.Response;
	});

	class JoshCache {
	    constructor() {
	        this.data = {};
	    }
	    contains(url) {
	        return this.data.hasOwnProperty(url)
	    }
	    is_outdated(url) {
	        let age_ms = Date.now()-this.data[url].timestamp;
	        console.log("diff is",age_ms);
	        if(age_ms > 60*60*1000) {
	            console.log("more than 1hr old");
	            return true
	        }
	        return false
	    }
	    put(url,payload) {
	        this.data[url] = {
	            timestamp: Date.now(),
	            payload:payload
	        };
	    }
	    get(url) {
	        return this.data[url].payload
	    }
	}

	const CACHE = new JoshCache();

	async function cached_json_fetch(url) {
	    if (CACHE.contains(url)) {
	        if (!CACHE.is_outdated(url)) {
	            console.log("fetching from cache");
	            return await CACHE.get(url)
	        }
	    }
	    console.log("really fetching", url);
	    let json = await browser$1(url).then(r => r.json());
	    CACHE.put(url, json);
	    return json
	}

	let AV_API_KEY= '1S4KT3P0F4XXIVRL';
	const dataset = new FilamentFunction('dataset', {
	        name:REQUIRED,
	    },
	    async function (name) {
	        let url = `https://api.silly.io/api/list/${name.value}`;
	        this.log("loading",url);
	        return await cached_json_fetch(url).then(json => {
	            return new FTable(json)
	        })
	    }
	);



	const stockhistory  = new FilamentFunction('stockhistory', {
	    symbol:REQUIRED,
	},async function(symbol) {
	    let url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol.value}&apikey=${AV_API_KEY}`;
	    return await cached_json_fetch(url).then(d => {
	        let hash_data = d['Monthly Time Series'];
	        let data = Object.entries(hash_data).map(([name,obj]) => {
	            return {
	                date:parse(name,'yyyy-MM-dd',new Date()),
	                close: parseFloat(obj['4. close'])
	            }
	        });
	        console.log("final data",data.length);
	        return new FTable({
	            data: {
	                schema: {
	                    properties: {}
	                },
	                items: data
	            }
	        })
	    })
	});

	class Point {
	    constructor(cx, cy) {
	        this.x = cx;
	        this.y = cy;
	    }
	}

	class Rect {
	    constructor(x,y,w,h) {
	        this.x = x;
	        this.y = y;
	        this.w = w;
	        this.h = h;
	        this.x2 = this.x + this.w;
	        this.y2 = this.y + this.h;
	        this.cx = this.x + this.w/2;
	        this.cy = this.y + this.h/2;
	    }
	    center() {
	        return new Point(this.cx,this.cy)
	    }
	}
	function calc_bounds(canvas) {
	    return new Rect(0,0,canvas.width,canvas.height)
	}

	function axes(ctx, b, zoom, origin) {
	    zoom = zoom;
	    ctx.save();
	    ctx.strokeStyle = '#cccccc';
	    ctx.translate(b.cx,b.cy);
	    ctx.scale(zoom,zoom);
	    ctx.lineWidth = 2/zoom;
	    let top = b.h/zoom;
	    let bottom = -b.h/zoom;
	    let left = -b.w/zoom;
	    let right = b.w/zoom;

	    //grid lines
	    ctx.beginPath();
	    for(let i=left; i<right; i+=1) {
	        ctx.moveTo(i, top);
	        ctx.lineTo(i, bottom);
	    }
	    for(let i=bottom; i<top; i+=1) {
	        ctx.moveTo(left,i);
	        ctx.lineTo(right,i);
	    }
	    ctx.stroke();
	    ctx.restore();

	    //main axes
	    ctx.strokeStyle = 'black';
	    ctx.beginPath();
	    ctx.moveTo(b.x,b.cy);
	    ctx.lineTo(b.x2,b.cy);
	    ctx.moveTo(b.cx,b.y);
	    ctx.lineTo(b.cx,b.y2);
	    ctx.stroke();

	}

	function background(ctx, bounds, zoom, origin) {
	    ctx.fillStyle = '#f0f0f0';
	    ctx.fillRect(bounds.x,bounds.y,bounds.w,bounds.h);
	}

	function draw_plot(ctx, b, zoom, origin, vals) {
	    ctx.save();
	    ctx.translate(b.cx,b.cy);
	    ctx.scale(zoom.value,-zoom.value);
	    ctx.lineWidth = 2/zoom;
	    ctx.strokeStyle = 'red';
	    ctx.beginPath();
	    vals.forEach(([x,y],i) => (i === 0)?ctx.moveTo(x,y) : ctx.lineTo(x,y));
	    ctx.stroke();
	    ctx.restore();
	}

	async function draw_y_to_x(scope, ctx, b, zoom, origin, xfun,min,max) {
	    let vals = [];
	    for( let i=min.value; i<max.value; i+=0.1) {
	        let y = scalar(i);
	        let x = await apply_fun(scope,xfun,[y]);
	        vals.push([x.value,y.value]);
	    }
	    draw_plot(ctx,b,zoom,origin,vals);
	    return vals
	}

	async function draw_x_to_y(scope, ctx, b, zoom, origin, yfun,min,max) {
	    let vals = [];
	    for( let i=min.value; i<max.value; i+=0.1) {
	        let x = scalar(i);
	        let y = await apply_fun(scope,yfun,[x]);
	        vals.push([x.value,y.value]);
	    }
	    draw_plot(ctx,b,zoom,origin,vals);
	    return vals
	}

	async function draw_t_to_xy(scope, ctx, b, zoom, origin, xfun, yfun,min,max) {
	    let vals = [];
	    for (let i = min.value; i < max.value; i += 0.1) {
	        let t = scalar(i);
	        let x = await apply_fun(scope,xfun,[t]);
	        let y = await apply_fun(scope,yfun, [t]);
	        vals.push([x.value, y.value]);
	    }
	    draw_plot(ctx,b,zoom,origin,vals);
	    return vals
	}

	async function draw_polar(scope, ctx, b, zoom, origin, polar, min,max) {
	    let vals = [];
	    for (let i = min.value; i < max.value; i += 0.05) {
	        let theta = scalar(i);
	        let rho = await apply_fun(scope, polar, [theta]);
	        let x = Math.sin(i)*rho.value;
	        let y = Math.cos(i)*rho.value;
	        vals.push([x,y]);
	    }
	    draw_plot(ctx,b,zoom,origin,vals);
	    return vals
	}

	const plot = new FilamentFunctionWithScope('plot',
	    {
	        x:null,
	        y:null,
	        polar:null,
	        min:scalar(-10),
	        max:scalar(10),
	        zoom: scalar(50),
	    },
	    function (scope,x,y,polar,min,max,zoom) {
	        return new CanvasResult((canvas)=> {
	            // console.log("rendering plot",x,y,polar)
	            let ctx = canvas.getContext('2d');
	            let bounds = calc_bounds(canvas);
	            let origin = bounds.center();
	            background(ctx, bounds);
	            axes(ctx, bounds, zoom.value);
	            // if (polar) draw_polar()
	            if (x && !y) return draw_y_to_x(scope,ctx,bounds,zoom,origin,x,min,max)
	            if (y && !x) return draw_x_to_y(scope,ctx,bounds,zoom,origin,y,min,max)
	            if (x &&  y) return draw_t_to_xy(scope,ctx,bounds,zoom,origin,x,y,min,max)
	            if(polar) return draw_polar(scope,ctx,bounds,zoom,origin,polar,min,max)
	            // if (x && y) draw_t()
	        })
	    });

	console.log("we are in the browser. No need to do anything. Just use new Canvas()");

	var make = function(width,height) {
	    let canvas = document.createElement('canvas');
	    canvas.width = width;
	    canvas.height = height;
	    return canvas
	};

	var browser = {
		make: make
	};

	const make_image = new FilamentFunctionWithScope('makeimage',
	    {
	        width: scalar(64),
	        height: scalar(64)
	    },
	    function (scope, width, height) {
	        return browser.make(width.value, height.value)
	    }
	);

	function get_pixel_as_array(image_data, x, y) {
	    let n = (image_data.width*y + x)*4;
	    let px = [
	        image_data.data[n+0]/255,
	        image_data.data[n+1]/255,
	        image_data.data[n+2]/255
	    ];
	    return px
	}

	function set_pixel_as_array(image_data, x, y, vals) {
	    let n = (image_data.width*y + x)*4;
	    image_data.data[n+0] = vals[0]*255;
	    image_data.data[n+1] = vals[1]*255;
	    image_data.data[n+2] = vals[2]*255;
	    image_data.data[n+3] = 255;
	}

	const map_image = new FilamentFunctionWithScope('mapimage',
	    {
	        "image": REQUIRED,
	        "with": REQUIRED
	    },
	    async function (scope, image, _with) {
	        let ctx = image.getContext('2d');
	        let image_data = ctx.getImageData(0,0,image.width,image.height);
	        for (let x = 0; x < image.width; x++) {
	            for (let y = 0; y < image.height; y++) {
	                if (_with.type === 'lambda') {
	                    let sx = scalar(x);
	                    let sy = scalar(y);
	                    let px = get_pixel_as_array(image_data,x,y);
	                    let color = list([scalar(px[0]), scalar(px[1]), scalar(px[2])]);
	                    let ret = await _with.apply_function(scope, _with, [sx, sy, color]);
	                    let vals = ret.value.map(s => s.value);
	                    set_pixel_as_array(image_data,x,y,vals);
	                }
	            }
	        }
	        ctx.putImageData(image_data,0,0);
	        return image
	    }
	);

	const load_image = new FilamentFunctionWithScope('loadimage',
	    {
	        "src": REQUIRED
	    },
	    async function (scope, src) {
	        let url = src.value;
	        if(process.browser) {
	            return new Promise((res,rej)=>{
	                let img = new Image();
	                img.crossOrigin = "Anonymous";
	                img.onload = () => res(img);
	                img.onerror = () => rej(img);
	                img.src = url;
	            })
	        } else {
	            return await browser$1(url)
	                .then(r => {
	                    // console.log("type", r.type, 'status', r.statusText, r.status, r.ok)
	                    // console.log(Array.from(r.headers.entries()))
	                    // console.log("headers",r.headers,r.headers.get('Content-Type'))
	                    if (r.headers.get('Content-Type') === 'image/jpeg') return browser.decodeJPEGFromStream(r.body)
	                    if (r.headers.get('Content-Type') === 'image/png') return browser.decodePNGFromStream(r.body)
	                })
	        }
	    }
	);

	const rect = new FilamentFunctionWithScope('rect',
	    {
	        x:scalar(0),
	        y:scalar(0),
	        width:scalar(10),
	        height:scalar(10),
	        fill:string("red"),
	    },
	    function (scope, x,y,width,height,fill) {
	        return new FObject({
	            type:'rect',
	            x,y,width,height,fill
	        })
	    }
	);

	const circle = new FilamentFunctionWithScope('circle',
	    {
	        x:scalar(0),
	        y:scalar(0),
	        radius:scalar(10),
	        fill:string("black"),
	    },
	    function (scope, x,y,radius,fill) {
	        return new FObject({
	            type:'circle',
	            x,y,radius,fill
	        })
	    }
	);

	const row = new FilamentFunctionWithScope('row',{
	    data:REQUIRED,
	    gap:scalar(1,'cm')
	}, function(scope,data,gap){
	    data = data._flatten();
	    // console.log("laying out",data)
	    let x = 0;
	    let y = 0;
	    let mh = 0;
	    let mw = 1000;
	    return list(data._map(r => {
	        // this.log("rect",r)
	        let h = to_px(r.value.height);
	        if(h>mh) mh = h;
	        let w = to_px(r.value.width);
	        if(x+w > mw) {
	            x = 0;
	            y = y + mh;
	        }
	        let r2 = new FObject({
	            type:r.value.type,
	            x:scalar(x),
	            y:scalar(y),
	            width:r.value.width,
	            height:r.value.height,
	            fill:r.value.fill,
	        });
	        x += to_px(r.value.width);
	        x += to_px(gap);
	        return r2
	    }))
	});


	function fill_bg(canvas, ctx, white) {
	    ctx.fillStyle = white;
	    ctx.fillRect(0,0,canvas.width,canvas.height);
	}

	const draw = new FilamentFunctionWithScope('draw',
	    {
	        data:REQUIRED,
	    },
	    function (scope, data) {
	        return new CanvasResult((canvas) => {
	            let ctx = canvas.getContext('2d');
	            ctx.save();
	            fill_bg(canvas,ctx,'white');
	            // ctx.scale(10,10)
	            // this.log("drawing data",data)
	            if(data.type) {
	                draw_shape(ctx,data);
	            }
	            ctx.restore();
	        })
	    }
	);

	const IN_PX = 72;
	const CM_PX = IN_PX/2.54;
	function to_px(value) {
	    // console.log("converting to pixels",value)
	    if(value.unit) {
	        if(value.unit === 'centimeter') {
	            return value.value * CM_PX
	        }
	        if(value.unit === 'inch') {
	            return value.value * IN_PX
	        }
	    }
	    return value.value
	}

	function to_color$1(fill) {
	    // console.log("converting color",fill)
	    if(fill.type === 'string') return fill.value
	    if(fill.type === 'list') {
	        if(fill._get_length() === 3) {
	            let vals = fill.value.map(s => (s.value*255).toFixed(2)).join(",");
	            return `rgb(${vals})`
	        }
	    }
	    return 'blue'
	}

	function draw_shape(ctx, data) {
	    // console.log('drawing',data)
	    if(data.type === 'object') {
	        draw_shape(ctx,data.value);
	        return
	    }
	    if(data.type === 'list') {
	        data._forEach(el => {
	            draw_shape(ctx,el.value);
	        });
	        return
	    }

	    if(data.type === 'rect') {
	        // console.log("drawings",data)
	        ctx.fillStyle = to_color$1(data.fill);
	        let x = to_px(data.x);
	        let y = to_px(data.y);
	        let w = to_px(data.width);
	        let h = to_px(data.height);
	        // console.log("using",x,y,w,h,ctx.fillStyle)
	        ctx.fillRect(x,y,w,h);
	        // console.log("filled")
	        return
	    }
	    if(data.type === 'circle')  {
	        ctx.fillStyle = to_color$1(data.fill);
	        let x = to_px(data.x);
	        let y = to_px(data.y);
	        let radius = to_px(data.radius);
	        ctx.beginPath();
	        ctx.arc(x,y,radius, 0, Math.PI*2);
	        ctx.fill();
	        return
	    }
	    console.log("Unknown type",data.type);
	}


	const hsl_to_rgb = new FilamentFunctionWithScope('hsltorgb',{
	    color:REQUIRED,
	}, function(scope,color){

	    let h = unpack(color._get_at_index(0)%1)*360;
	    let s = unpack(color._get_at_index(1));
	    let l = unpack(color._get_at_index(2));
	    // this.log("hsl",h,s,l)

	    let c = (1 - Math.abs(2 * l - 1)) * s,
	        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
	        m = l - c/2,
	        r = 0,
	        g = 0,
	        b = 0;

	    if (0 <= h && h < 60) {
	        r = c; g = x; b = 0;
	    } else if (60 <= h && h < 120) {
	        r = x; g = c; b = 0;
	    } else if (120 <= h && h < 180) {
	        r = 0; g = c; b = x;
	    } else if (180 <= h && h < 240) {
	        r = 0; g = x; b = c;
	    } else if (240 <= h && h < 300) {
	        r = x; g = 0; b = c;
	    } else if (300 <= h && h < 360) {
	        r = c; g = 0; b = x;
	    }
	    r = r+m;
	    g = g+m;
	    b = b+m;
	    // this.log("rgb",r,g,b)
	    return list([scalar(r),scalar(g),scalar(b)])
	});

	class TurtleState {
	    constructor() {
	        this.x = 0;
	        this.y = 0;
	        this.heading = 0;
	        this.commands = [];
	    }
	    push_command(cmd) {
	        this.commands.push(cmd);
	    }
	}

	const turtle_start = new FilamentFunctionWithScope('turtlestart',
	    {
	        x:scalar(0),
	        y:scalar(0),
	        a:scalar(0)
	    },
	    function (scope,x,y,a) {
	        // this.log("starting with",x,y,a)
	        scope.set_var('!turtle_state', new TurtleState());
	    }
	);

	function toRad(a) {
	    return a/180*Math.PI
	}

	function to_color(fill) {
	    if(fill.type === 'string') return fill.value
	    if(fill.type === 'list') {
	        if(fill._get_length() === 3) {
	            let vals = fill.value.map(s => Math.floor(s.value*255)).join(",");
	            return `rgb(${vals})`
	        }
	    }
	    return 'blue'
	}


	const turtle_done = new FilamentFunctionWithScope('turtledone',
	    {},
	    function (scope) {
	        // console.log("done with the turtle. scope is",scope)
	        let state = scope.lookup('!turtle_state');
	        return new CanvasResult((canvas) => {
	            // console.log('drawing the turtle with state',state.commands)
	            let ctx = canvas.getContext('2d');
	            ctx.save();
	            ctx.translate(canvas.width/2,canvas.height/2);
	            ctx.fillStyle = 'white';
	            ctx.fillRect(0,0,canvas.width,canvas.height);
	            let x = 0;
	            let y = 0;
	            let a = -90;
	            ctx.strokeStyle = 'black';
	            ctx.beginPath();
	            ctx.moveTo(x,y);
	            // console.log('moved to',x,y)
	            state.commands.forEach(cmd => {
	                // console.log(cmd)
	                if(cmd[0] === 'f') {
	                    let ra = toRad(a);
	                    let dx = Math.cos(ra);
	                    let dy = Math.sin(ra);
	                    x+= dx*cmd[1];
	                    y+= dy*cmd[1];
	                    ctx.lineTo(x,y);
	                }
	                if(cmd[0] === 'r') {
	                    a += cmd[1];
	                }
	                if(cmd[0] === 'l') {
	                    a -= cmd[1];
	                }
	                if(cmd[0] === 'c') {
	                    ctx.stroke();
	                    ctx.beginPath();
	                    ctx.moveTo(x,y);
	                    let c = to_color(cmd[1]);
	                    ctx.strokeStyle = c;
	                }
	            });
	            ctx.stroke();

	            // draw turtle
	            ctx.save();
	            ctx.translate(x,y);
	            ctx.rotate(toRad(a-90));
	            ctx.beginPath();
	            ctx.moveTo(0,0);
	            ctx.lineTo(-5,0);
	            ctx.lineTo(0,20);
	            ctx.lineTo(5,0);
	            ctx.lineTo(0,0);
	            // ctx.close()
	            ctx.fillStyle = 'green';
	            ctx.fill();
	            ctx.restore();

	        })
	    }
	);
	const turtle_pendown = new FilamentFunctionWithScope('turtlependown',
	    {},
	    function (a,b) {
	        // this.log("pen down")
	    }
	);
	const turtle_penup = new FilamentFunctionWithScope('turtlepenup',
	    {},
	    function (a,b) {
	        // this.log("pen up")
	    }
	);
	const turtle_forward = new FilamentFunctionWithScope('turtleforward',
	    {
	        distance:REQUIRED,
	    },
	    function (scope,n) {
	        // this.log("forward",n)
	        let state = scope.lookup('!turtle_state');
	        state.push_command(['f',n.value]);
	    }
	);
	const turtle_right = new FilamentFunctionWithScope('turtleright',
	    {
	        angle:REQUIRED
	    },
	    function (scope,a) {
	        let state = scope.lookup('!turtle_state');
	        state.push_command(['r',a.value]);
	    }
	);

	const turtle_left = new FilamentFunctionWithScope('turtleleft',
	    {
	        angle:REQUIRED
	    },
	    function (scope,a) {
	        let state = scope.lookup('!turtle_state');
	        state.push_command(['l',a.value]);
	    }
	);

	const turtle_pencolor = new FilamentFunctionWithScope('turtlepencolor',
	    {
	        color:REQUIRED,
	    },
	    function (scope,color) {
	        let state = scope.lookup('!turtle_state');
	        state.push_command(['c',color]);
	    });

	function draw_y_axis(c,b,max) {
	    //y axis line
	    c.lineWidth = STYLE.Y_AXIS.LINE_WIDTH;
	    c.strokeStyle = STYLE.Y_AXIS.LINE_COLOR;

	    c.beginPath();
	    c.moveTo(b.x,b.y);
	    c.lineTo(b.x,b.y2);
	    c.stroke();

	    let min = 0;
	    // console.log("doing ticks from",min,max,'over',b.h,b.y2)


	    let size = b.h/(max-min);
	    for(let i=min; i<=max; i++) {
	        let y = b.y2 - i*size;
	        c.fillStyle = 'black';
	        c.fillRect(b.x-10,y,10,1);
	        draw_right_aligned_text(c,i+"",b.x-2,y+5);
	    }
	}

	/**
	 * @name {histogram}
	 * @module {charts}
	 * @params {
	 *     data: required,
	 *     bucket:scalar(1),
	 *     title:string('count'),
	 * }
	 * @return CanvasResult
	 * @summary {Draws a histogram by counting repeated values in the data. Counts by buckets,
	 * so a bucket of 10 would give you counts of 0->9, 10->19, 20->29, etc. }
	 */

	const histogram = new FilamentFunctionWithScope('histogram',{
	    data:REQUIRED,
	    bucket:scalar(1),
	    title:string('count'),
	}, function(scope,data,bucket,title) {
	    //count frequency of each item in the list
	    //draw a barchart using frequency for height
	    //use the key for the name
	    return new CanvasResult((canvas)=>{
	        let ctx = canvas.getContext('2d');
	        ctx.save();
	        clear$1(ctx,canvas);

	        const freqs = calc_frequencies(data, bucket);
	        let bounds = new Bounds(0,0,canvas.width,canvas.height);
	        bounds = bounds.inset(STYLE.FONT_SIZE*1.5);

	        let entries = Object.entries(freqs);
	        let w = bounds.w / entries.length;
	        let gap = 5;
	        let max_y = max(entries.map(pair => pair[1]));
	        let hh = bounds.h/max_y;
	        //draw bars
	        entries.forEach((pair,i) => {
	            const [name,count] = pair;
	            let h = hh*count;
	            ctx.fillStyle = COLORS[i%COLORS.length];
	            ctx.fillRect(bounds.x+i*w+gap,bounds.y2-h,w-gap*2,h);
	        });
	        entries.forEach((pair,i) => {
	            const [name,count] = pair;
	            draw_centered_text(ctx,STYLE.FONT_SIZE,name,bounds.x+i*w+w/2, bounds.y2-20);
	            draw_centered_text(ctx,STYLE.FONT_SIZE,count+"",bounds.x+i*w+w/2, bounds.y2-40);
	        });

	        let lx = bounds.x+bounds.w/2;
	        let ly = bounds.y+STYLE.FONT_SIZE;

	        //legend
	        draw_centered_text_with_background(ctx,lx,ly,unpack(title),STYLE.FONT_SIZE,STYLE.LEGEND.FILL_COLOR);

	        //y axis
	        draw_y_axis(ctx,bounds,max_y);
	        ctx.restore();
	    })
	});

	function fill_bounds(ctx, tb, FILL_COLOR) {
	    ctx.fillStyle = FILL_COLOR;
	    ctx.fillRect(tb.x,tb.y,tb.w,tb.h);
	}

	function draw_centered_text_with_background(ctx, lx,ly,title, padding, fill_color) {
	    let tm = ctx.measureText(title);
	    let tb = new Bounds(lx-tm.width/2,ly,tm.width,STYLE.FONT_SIZE);
	    tb = tb.expand(padding);
	    fill_bounds(ctx,tb, fill_color);
	    ctx.fillStyle = STYLE.FONT_COLOR;
	    ctx.font = STYLE.FONT;
	    ctx.fillText(title,lx-tm.width/2,ly+STYLE.FONT_SIZE);
	}


	function calc_frequencies(data, bucket) {
	    bucket = unpack(bucket);
	    let freqs = {};
	    data._map(datum => {
	        let value = unpack(datum);
	        // console.log("value",value)
	        if(is_scalar(value)) {
	            value = Math.round(value / bucket) * bucket;
	        }
	        if(!freqs[value]) freqs[value] = 0;
	        freqs[value] += 1;
	    });
	    // console.log("bucket is",bucket)
	    // console.log("final frequencies",freqs)
	    return freqs
	}

	const timeline = new FilamentFunction('timeline',
	    {
	        data:REQUIRED,
	        date:REQUIRED,
	        name:REQUIRED,
	    },
	    function(data, date, name) {
	        let get_date = (datum) => datum;
	        if(is_string(date)) get_date = (d,i) => {
	            let dt = data._get_field_from(date,d,i);
	            if(is_string(dt)) return parse(unpack(dt),'MMMM dd, yyyy', new Date())
	            return dt
	        };

	        let date_values = data._map(get_date);
	        date_values.sort((a,b)=>compareAsc(a,b));
	        let min = date_values[0];
	        let max = data._map(get_date);
	        max.sort((a,b)=> compareDesc(a,b));
	        max = max[0];
	        return new CanvasResult((canvas)=>{
	            let ctx = canvas.getContext('2d');
	            ctx.save();
	            clear(ctx,canvas);
	            let width = canvas.width;
	            let height = canvas.height;
	            let pairs = data._map((datum,i) => {
	                return {
	                    name:data._get_field_from(name,datum,i),
	                    date:get_date(datum,i)
	                }
	            });

	            pairs.forEach((datum,i) => {
	                ctx.fillStyle = 'aqua';
	                ctx.fillStyle = 'black';
	                let diff_x = differenceInYears(datum.date,min);
	                let x = diff_x*10;
	                let y = 0;
	                ctx.fillRect(x,y,2,canvas.height-30);
	                ctx.fillText(datum.name,x+2, (i%20)*10);
	            });

	            ctx.fillText(format(min,'yyyy'),0,height-10);
	            ctx.fillText(format(max,'yyyy'),width-20,height-10);
	            ctx.restore();
	        })
	    }
	);

	const print = new FilamentFunctionWithScope('print',
	    {
	        msg:REQUIRED
	    },
	    function (scope,msg) {
	        this.log(msg.toString());
	    }
	);

	function make_standard_scope() {
	    let scope = new Scope("lang");
	    scope.install(print);
	    scope.install(add, subtract, multiply, divide, power, sqrt, negate, mod, factorial, is_prime, random);
	    scope.install(abs, sin, cos, tan);
	    scope.install(lessthan, greaterthan, equal, notequal, lessthanorequal, greaterthanorequal, or, and, not);
	    scope.install(range, length, take, drop, join, reverse, map, sort, sum, get_field, select);
	    scope.install(convertunit);
	    scope.install(floor, ceiling);
	    scope.install(date_cons, time_cons, today);
	    scope.install(dataset, chart, timeline, histogram, plot, stockhistory);
	    scope.install(rect,draw, row, circle, hsl_to_rgb);
	    scope.set_var('pi', scalar(Math.PI));

	    scope.install(make_image, map_image, load_image);
	    scope.install(turtle_start, turtle_pendown, turtle_forward, turtle_right, turtle_left, turtle_penup, turtle_done, turtle_pencolor);

	    return scope
	}

	make_standard_scope();

	var filament_grammar = String.raw`Filament {
  Exp = Block | LowOp

  LowOp = AsExp

  AsExp
   = AsExp "as" unit --convert
   | BoolExp

  BoolExp
   = BoolExp boolop AddExp --bool
   | AddExp
  boolop = "mod" | "and" | "or" | "<=" | ">=" | "<>" | "<" | ">" | "="

  AddExp
   = AddExp addop MulExp --add
   | MulExp
  addop = "+" | "-"

  MulExp
   = MulExp mulop PipeOp --mul
   | PipeOp
  mulop = "**" | "*" | "/"

  PipeOp
   = PipeOp ">>" HighOp -- right
   | HighOp "<<" PipeOp -- left
   | HighOp

  HighOp
    = LambdaExp
    | GroupExp
    | IndexRef
    | IfExp
    | FundefExp
    | FuncallExp
    | UnExp
    | List | bool | ident
    | unitnumber
    | number
    | string

  IndexRef = (FuncallExp|List|ident) "[" Exp "]"

  Block = "{" Exp* "}"

  FuncallExp = ident "(" ListOf<Arg,","> ")"
  Arg
    = ident ":" Exp --named
    | Exp           --indexed

  FundefExp = "def" ident "(" ListOf<DefArg,","> ")" Block
  DefArg
    = ident ":" ("?" | Exp)  --default
    | ident                  --solo

  IfExp
    = "if" Exp "then" Exp "else" Exp --full
    | "if" Exp "then" Exp            --short

  LambdaExp
    = DefArg "->" Exp --short
    | "(" ListOf<DefArg,","> ")" "->" Exp --full

  List = "[" ListOf<Exp,","> "]"

  UnExp = unop Exp
  unop  = "not" | "-" | "!"


  GroupExp = "(" Exp ")"

  under = "_"
  ident  (an identifier)
    = letter (letter | digit | under)*

  number  (a number)
    = ("0x" | "0X") hexdigunder+  -- hex
    | underdigit* "." underdigit+ -- fract
    | underdigit+                 -- whole
  underdigit = digit | under
  hexdigunder = "a".."f"|"A".."F"|"0".."9" | "_"
  unit = "%" | letter+
  unitnumber = number unit

  q = "\'"
  qq = "\""

  string (text string)
    = q (~q any)* q
    | qq (~qq any)* qq

  eol = "\n"
  bool = "true" | "false"

  space
   += comment

  comment
    = "//" (~"\n" any)* "\n"  -- singleLine
    | "/*" (~"*/" any)* "*/"  -- multiLine

}`;

	let scope;
	let parser;

	async function setup_parser() {
	    scope = make_standard_scope();
	    parser = new Parser(scope, filament_grammar);
	}

	async function eval_code(code, custom_scope) {
	    if (!custom_scope) custom_scope = scope;
	    let match = parser.parse(code + "\n");
	    // console.log("parsed",match)
	    if (match.failed()) throw new Error("match failed")
	    let ast = parser.ast(match);
	    // console.log('ast',ast)
	    // console.log("evaluating with scope",custom_scope)
	    return await ast.evalFilament(custom_scope)
	}

	exports.eval_code = eval_code;
	exports.is_boolean = is_boolean;
	exports.is_canvas_result = is_canvas_result;
	exports.is_error_result = is_error_result;
	exports.is_list = is_list;
	exports.is_scalar = is_scalar;
	exports.is_string = is_string;
	exports.setup_parser = setup_parser;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
