
/*!
 * Stylus - Pattern - utils
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Parse the given pattern `str`, returning a parse-tree.
 *
 * @param {String} str
 * @return {Array}
 * @api private
 */

exports.parse = function(str) {
  str = '[' + str + ']';

  function expect(c) {
    if (accept(c)) return c;
    throw new Error('expected "' + c + '", got "' + str[0] + '"');
  }

  function accept(c) {
    if (c == str[0]) {
      str = str.substr(1);
      return c;
    }
  }

  function whitespace() {
    while (accept(' ')) ;
  }

  function match(s) {
    if (s instanceof RegExp) {
      if (s.exec(str)) {
        str = str.substr(RegExp.$1.length);
        return RegExp.$1;
      }
    } else {
      if (0 == str.indexOf(s)) {
        str = str.substr(s.length);
        return s;
      }
    }
  }

  function keyword() {
    var keyword;
    if (keyword = match(/^([-\w]+)/)) {
      return ['keyword', keyword];
    }
  }

  function value() {
    var i = str.indexOf('>')
      , name = str.substr(0, i)
      , tok = ['value', name];
    str = str.substr(i + 1);
    return tok;
  }

  function group() {
    var tok
      , ret = ['group', []];
    while (tok = alternation()) {
      if (accept('{')) {
        var to, from = parseInt(match(/^(\d+)/), 10);
        if (accept(',')) to = parseInt(match(/^(\d+)/), 10);
        if ('number' == typeof to) {
          tok = ['range', { from: from, to: to }, tok];
        } else {
          tok = ['range', { from: from, to: from }, tok];
        }
        expect('}');
      }
      ret[1].push(tok);
    }
    expect(']');
    return ret;
  }

  function expr() {
    var c, tok;
    whitespace();

    // literals
    if (accept('[')) tok = group();
    else if (accept('<')) tok = value();
    else if (accept(',')) tok = [','];
    else if (accept('/')) tok = ['/'];
    else tok = keyword();

    // postfix
    if (c = 
         accept('*')
      || accept('+')
      || accept('?')) tok = [c, tok];

    whitespace();
    return tok;
  }

  function alternation() {
    var tok
      , ret = ['alternatives', []];
    do {
      if (tok = expr()) ret[1].push(tok);
    } while (accept('|'));
    return ret[1].length ? ret : null;
  }

  whitespace();
  accept('[');
  return group();
}

/**
 * Inspect the given pattern `str` by parsing it
 * and then inspecting the result.
 *
 * @param {String} str
 * @api private
 */

exports.inspect = function(str) {
  console.log();
  console.log(require('util').inspect(exports.parse(str), false, 50, true));
  console.log();
};
