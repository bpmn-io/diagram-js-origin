import {
  append as svgAppend,
  attr as svgAttr,
  create as svgCreate
} from 'tiny-svg';

var CROSS_COLOR = '#CCC',
    BORDER_COLOR = 'rgba(0,0,0,0.1)';


/**
 * A diagram-js extension that shows a (0, 0) origin indicator
 * on the canvas as well as (optionally) the canvas borders.
 *
 * @param {Object} [config]
 * @param {Canvas} canvas
 */
export default function ConfigureOrigin(config, canvas) {

  config = config || {};

  var borderColor = config.borderColor || BORDER_COLOR,
      crossColor = config.crossColor || CROSS_COLOR ;

  var w = 30, h = 2,
      w_half = w / 2,
      s = -h / 2,
      lineStart = w_half + 7;

  var parent = canvas.getLayer('djs-origin', -1);

  var g,
      line,
      cross,
      label;

  g = createEl('g', {
    'pointer-events': 'none'
  });

  svgAppend(parent, g);

  if (config.showBorder !== false) {

    // the dashed lines, marking positive document coordinates
    line = createEl('path', {
      'class': cls('border'),
      'd': path([
        'M', -lineStart, s,
        'H', -1000,
        'M', lineStart, s,
        'H', 6000,
        'M', s, -lineStart,
        'V', -1000,
        'M', s, lineStart,
        'V', 3000
      ]),
      'fill': 'none',
      'stroke': borderColor,
      'stroke-width': h + 'px',
      'stroke-dasharray': '6, 6',
      'shape-rendering': 'crispedges'
    });

    svgAppend(g, line);
  }

  // the cross that marks the diagram origin
  cross = createEl('path', {
    d: path([
      'M', -w_half, s,
      'H', w_half,
      'M', s, -w_half,
      'V', w_half
    ]),
    'class': cls('cross'),
    'fill': 'none',
    'stroke': crossColor,
    'stroke-width': h + 'px',
    'stroke-linecap': 'round'
  });

  svgAppend(g, cross);

  label = createEl('text', {
    x: -40,
    y: -10,
    fill: crossColor,
    'class': cls('label'),
  });

  label.textContent = '(0, 0)';

  svgAppend(g, label);
}

ConfigureOrigin.$inject = [
  'config.origin',
  'canvas'
];


// helpers ///////////////////////////////////

function path(parts) {
  return parts.join(' ');
}

function cls(name) {
  return 'djs-origin-' + name;
}

function createEl(type, attrs) {

  var el = svgCreate(type);

  svgAttr(el, attrs);

  return el;
}