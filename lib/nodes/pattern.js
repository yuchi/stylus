
/*!
 * Stylus - Pattern
 * Copyright(c) 2010 LearnBoost <dev@learnboost.com>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node')
  , PatternObject = require('../pattern')
  , nodes = require('./');

/**
 * Initialize a new `Pattern` node with the given `val`.
 *
 * @param {String} val
 * @api public
 */

var Pattern = module.exports = function Pattern(val){
  Node.call(this);
  this.val = new PatternObject(val.string);
};

/**
 * Inherit from `Node.prototype`.
 */

Pattern.prototype.__proto__ = Node.prototype;

/**
 * Return unit string.
 *
 * @return {String}
 * @api public
 */

Pattern.prototype.toString = function(){
  return 'Pattern(' + this.val.str + ')';
};

/**
 * Return a clone of this node.
 * 
 * @return {Node}
 * @api public
 */

Pattern.prototype.clone = function(){
  return new Pattern(new PatternObject(this.val.str));
};