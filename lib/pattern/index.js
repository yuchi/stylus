
/*!
 * Stylus - Pattern
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var utils = require('./utils');

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