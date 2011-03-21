
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
  return new nodes.Expression;
};
