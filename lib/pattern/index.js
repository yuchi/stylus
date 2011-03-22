
/*!
 * Stylus - Pattern
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var utils = require('./utils')
  , nodes = require('../nodes');

/**
 * Initialize a new `Pattern` with the given `str`.
 *
 * @param {String} str
 * @api private
 */

var Pattern = module.exports = function Pattern(str) {
  this.str = str;
  this.tree = utils.parse(str);
};

/**
 * Inspect this pattern.
 *
 * @api private
 */

Pattern.prototype.inspect = function(){
  utils.inspect(this.str);
};

Pattern.prototype.explain = function(tok){
  switch (tok[0]) {
    case 'alternatives':
      return tok[1].map(function(tok){
        return this.explain(tok);
      }, this).join(' | ');
    case 'keyword':
      return tok[1];
    case 'value':
      return '<' + tok[1] + (tok[2] ? ':' + tok[2] : '') + '>';
  }
};

/**
 * Throw Pattern related error `msg`.
 *
 * @param {String} msg
 * @api private
 */

Pattern.prototype.error = function(msg){
  throw new Error(msg);
};

/**
 * Parse the given `expr`.
 *
 * @param {Expression} expr
 * @return {Expression}
 * @api private
 */

Pattern.prototype.parse = function(expr){
  try {
    this.expr = expr;
    return this.group(this.tree);
  } catch (err) {
    var ret = new nodes.Expression;
    ret.push(new nodes.String('error'));
    ret.push(new nodes.String(err.message));
    return ret;
  }
};

Pattern.prototype.group = function(group){
  var ret = new nodes.Expression
    , node;
  group[1].forEach(function(alt){
    if (node = this.alternatives(alt)) {
      ret.push(node);
    } else {
      this.error('failed to match "' + this.explain(alt) + '"');
    }
  }, this);
  return ret;
};

Pattern.prototype.alternatives = function(alt){
  var ret = new nodes.Expression
    , vals = alt[1]
    , len = vals.length
    , node;

  for (var i = 0; i < len; ++i) {
    if (node = this.matches(vals[i])) {
      ret.push(node);
      return ret;
    }
  }
};

Pattern.prototype.matches = function(val){
  var len = this.expr.nodes.length
    , name = val[2]
    , node;
  for (var i = 0; i < len; ++i) {
    node = this.expr.nodes[i];
    if (this.match(node, val)) {
      this.expr.nodes.shift();
      if (name) {
        var tmp = new nodes.Expression;
        tmp.push(new nodes.String(name));
        tmp.push(node);
        node = tmp;
      }
      return node;
    }
  }
};

Pattern.prototype.match = function(node, val){
  switch (val[0]) {
    case 'keyword':
      return node.string == val[1];
    case 'value':
      switch (val[1]) {
        case 'length':
          return 'unit' == node.nodeName;
      }
  }
};
