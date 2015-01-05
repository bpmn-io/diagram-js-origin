function ConfigureOrigin(canvas) {
  var base = canvas.getLayer('bg');

  var g = base.group(),
      w = 30, h = 2,
      style = {
        'fill': '#CCC',
        'pointer-events': 'none'
      };

  // two rectangles that mark the diagram origin
  g.rect(w / -2, h / -2, w, h, h / 2).attr(style);
  g.rect(h / -2, w / -2, h, w, h / 2).attr(style);

  g.text(-40, -10, '(0, 0)').attr(style);
}

ConfigureOrigin.$inject = [ 'canvas' ];

module.exports = ConfigureOrigin;