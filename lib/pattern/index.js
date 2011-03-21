
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

/**
 * Parse the given `expr`.
 *
 * @param {Expression} expr
 * @return {Expression}
 * @api private
 */

Pattern.prototype.parse = function(expr){
  console.log(this);
  return this.group(expr, this.tree);
};

Pattern.prototype.group = function(expr, group){
  var ret = new nodes.Expression
    , node;
  group[1].forEach(function(alt){
    if (node = this.alternatives(expr, alt)) {
      ret.push(node);
    }
  }, this);
  return ret;
};

Pattern.prototype.alternatives = function(expr, alt){
  var ret = new nodes.Expression
    , vals = alt[1]
    , len = vals.length
    , node;

  for (var i = 0; i < len; ++i) {
    if (node = this.matches(expr, vals[i])) {
      ret.push(node);
    }
  }
  return ret;
};

Pattern.prototype.matches = function(expr, val){
  var len = expr.nodes.length
    , node;
  for (var i = 0; i < len; ++i) {
    node = expr.nodes[i];
    if (this.match(node, val)) return node;
  }
};

Pattern.prototype.match = function(node, val){
  switch (val[0]) {
    case 'keyword':
      return node.string == val[1];
  }
};
