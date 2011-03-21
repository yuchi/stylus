
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
  return this.parseGroup(expr, this.tree);
};

Pattern.prototype.parseGroup = function(expr, group){
  var ret = new nodes.Expression;
  group[1].forEach(function(alt){
    ret.push(this.parseAlternatives(expr, alt));
  }, this);
  return ret;
};

Pattern.prototype.parseAlternatives = function(expr, alt){
  var ret = new nodes.Expression;
  alt[1].forEach(function(val){
    ret.push(this.parseValue(expr, val));
  }, this);
  return ret;
};

Pattern.prototype.parseValue = function(expr, val){
  var ret = new nodes.Expression;
  return ret;
};
