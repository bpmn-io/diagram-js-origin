require('diagram-js/test/helper');

/* global bootstrapDiagram */


var originModule = require('../../');


describe('origin', function() {

  var testModules = [ originModule ];

  beforeEach(bootstrapDiagram({ modules: testModules }));

  it('should bootstrap', inject(function(canvas) {
    canvas.scroll({ dx: 100, dy: 100 });
  }));

});