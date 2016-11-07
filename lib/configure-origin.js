'use strict';

var svgAppend = require('tiny-svg/lib/append'),
    svgAttr = require('tiny-svg/lib/attr'),
    svgCreate = require('tiny-svg/lib/create');

function ConfigureOrigin(canvas) {

  var base = canvas.getLayer('bg');

  var g = svgCreate('g');

  svgAppend(base, g);

  var w = 30, h = 2,
      style = {
        'fill': '#CCC',
        'pointer-events': 'none'
      };

  // two rectangles that mark the diagram origin
  var horizontal = svgCreate('rect');

  svgAttr(horizontal, {
    x: w / -2 - 1,
    y: h / -2 - 1,
    width: w,
    height: h,
    rx: h / 2
  });
  svgAttr(horizontal, style);

  svgAppend(g, horizontal);

  var vertical = svgCreate('rect');

  svgAttr(vertical, {
    x: h / -2 - 1,
    y: w / -2 - 1,
    width: h,
    height: w,
    rx: h / 2
  });
  svgAttr(vertical, style);

  svgAppend(g, vertical);

  var text = svgCreate('text');

  svgAttr(text, {
    x: -40,
    y: -10
  });

  text.textContent = '(0, 0)';

  svgAttr(text, style);

  svgAppend(g, text);
}

ConfigureOrigin.$inject = [ 'canvas' ];

module.exports = ConfigureOrigin;
