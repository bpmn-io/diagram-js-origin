require('diagram-js/test/helper');

/* global bootstrapDiagram */


var originModule = require('../../');

var innerSVG = require('tiny-svg/lib/innerSVG');

describe('origin', function() {

  var testModules = [ originModule ];

  beforeEach(bootstrapDiagram({ modules: testModules }));

  it('should bootstrap', inject(function(canvas) {
    canvas.scroll({ dx: 100, dy: 100 });
  }));


  it('should exist in canvas', inject(function(canvas) {
    var layer = canvas.getLayer('bg');
    var text = layer.querySelector('text');

    expect(innerSVG(text)).to.equal('(0, 0)');
  }));

});
