define(function(require) {

  var LZ77 = require('lz77');

  var _htmlEscapes = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  };

  function _noop(s) {
    return s;
  }

  /**
   * @class Lavaca.util.StringUtils
   * Static utility type for working with strings
   */
  var StringUtils = {};

  /**
   * @method format
   * @static
   * Substitutes arguments into a string
   *
   * @sig
   * @param {String} s  The format string. Substitutions should be in the form {0} to sub in
   *   the first arg, {1} for the second, and so on
   * @params {Object} arg  Arguments to be substituted in to the string
   * @return {String}  The format string with the arguments substituted into it
   *
   * @sig
   * @param {String} s  The format string. Substitutions should be in the form {0} to sub in
   *   the first arg, {1} for the second, and so on
   * @param {Array} args  Arguments to be substituted in to the string
   * @return {String}  The format string with the arguments substituted into it
   *
   * @sig
   * @param {String} s  The format string. Substitutions should be in the form {0} to sub in
   *   the first arg, {1} for the second, and so on
   * @param {Array} args  Arguments to be substituted in to the string
   * @param {Function} fn  A function to call on each argument, the result of which is substituted into the string
   * @return {String}  The format string with the arguments substituted into it
   */
  StringUtils.format = function(s /*[, arg0, arg1, argN]*/) {
    var args,
        fn = _noop,
        i,
        j;
    if (arguments[1] instanceof Array) {
      args = arguments[1];
      fn = arguments[2] || _noop;
    } else {
      args = [].slice.call(arguments, 1);
    }
    for (i = 0, j = args.length; i < j; i++) {
      s = s.split('{' + i + '}').join(fn(args[i] + ''));
    }
    return s;
  };

  /**
   * @method escapeHTML
   * @static
   * Escapes a string for inclusion in HTML
   *
   * @param {String} s  The string
   * @return {String}  The escaped string
   */
  StringUtils.escapeHTML = function(s) {
    s = '' + s;
    for (var n in _htmlEscapes) {
      s = s.split(n).join(_htmlEscapes[n]);
    }
    return s;
  };

  /**
   * @method compress
   * @static
   *
   * @sig
   * LZMA-encodes a string
   * @param {String} s  The string to encode
   * @return {String}  The LZMA-encoded string
   *
   * @sig
   * Converts an object to an LZMA-encoded JSON string
   * @param {Object} o  The object to encode
   * @return {String}  The LZMA-encoded JSON string
   */
  StringUtils.compress = function(s) {
    if (typeof s !== 'string') {
      s = JSON.stringify(s);
    }
    return new LZ77().compress(s);
  };

  /**
   * @method decompress
   * @static
   * Decodes an LZMA-encoded string
   *
   * @param {String} s  The encoded string
   * @return {String}  The decoded string
   */
  StringUtils.decompress = function(s) {
    return new LZ77().decompress(s);
  };

  return StringUtils;

});
