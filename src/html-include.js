/*jslint browser: true, indent: 2*/

(function (window) {
  'use strict';
  var proto;

  function xhr(that, uri) {
    var r = new XMLHttpRequest(),
      str = (/\?/.test(uri) ? '&' : '?') + (new Date().getTime());
    r.open("GET", uri + str, false);
    r.onreadystatechange = function () {
      var response;
      if (r.readyState !== 4) {
        return;
      }
      response = r.responseText || '';

      // It is already attached?
      if (that.parentNode !== null) {
        that.outerHTML = response;
      } else {
        //It is not, save the content.
        that.content = response;
      }
    };
    r.send();
  }

  proto = Object.create(window.HTMLElement.prototype);

  /*jslint unparam:true*/
  proto.attributeChangedCallback = function (attr, oldVal, newVal) {
    if (attr === 'src') {
      this.src = newVal;
    }
  };
  /*jslint unparam:false*/

  proto.attachedCallback = function () {
    // If it already has content, just replace it.
    if (this.content) {
      this.outerHTML = this.content;
    }
  };

  proto.createdCallback = function () {
    var that = this, src;
    src = this.src || this.getAttribute('src') || false;

    if (src) {
      xhr(this, src);
      return;
    }
    Object.defineProperty(this, 'src', {
      set : function (val) {
        xhr(that, val);
      },
      get : function () {
        return '';
      }
    });
  };
  document.registerElement('html-include', {
    prototype : proto
  });
}(this));
