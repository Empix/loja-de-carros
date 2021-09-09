(() => {
  'use strict';

  function DOM(node) {
    if (!(this instanceof DOM)) {
      return new DOM(node);
    }

    this.element = document.querySelectorAll(node);
  }

  DOM.prototype.on = function on(event, callback) {
    this.element.forEach(function (elem) {
      elem.addEventListener(event, callback);
    });
  };

  DOM.prototype.off = function off(event, callback) {
    this.element.forEach(function (elem) {
      elem.removeEventListener(event, callback);
    });
  };

  DOM.prototype.get = function get(index) {
    return this.element[index] || this.element[0];
  };

  DOM.prototype.forEach = function forEach() {
    return Array.prototype.forEach.apply(this.element, arguments);
  };
  DOM.prototype.map = function map() {
    return Array.prototype.map.apply(this.element, arguments);
  };
  DOM.prototype.filter = function filter() {
    return Array.prototype.filter.apply(this.element, arguments);
  };
  DOM.prototype.reduce = function reduce() {
    return Array.prototype.reduce.apply(this.element, arguments);
  };
  DOM.prototype.reduceRight = function reduceRight() {
    return Array.prototype.reduceRight.apply(this.element, arguments);
  };
  DOM.prototype.every = function every() {
    return Array.prototype.every.apply(this.element, arguments);
  };
  DOM.prototype.some = function some() {
    return Array.prototype.some.apply(this.element, arguments);
  };

  DOM.is = function is(value) {
    return Object.prototype.toString.call(value);
  };

  DOM.isArray = function isArray(value) {
    return DOM.is(value) === '[object Array]';
  };
  DOM.isObject = function isObject(value) {
    return DOM.is(value) === '[object Object]';
  };
  DOM.isFunction = function isFunction(value) {
    return DOM.is(value) === '[object Function]';
  };
  DOM.isNumber = function isNumber(value) {
    return DOM.is(value) === '[object Number]';
  };
  DOM.isString = function isString(value) {
    return DOM.is(value) === '[object String]';
  };
  DOM.isBoolean = function isBoolean(value) {
    return DOM.is(value) === '[object Boolean]';
  };
  DOM.isNull = function isNull(value) {
    return value === null || value === undefined;
  };

  window.DOM = DOM;
})();
