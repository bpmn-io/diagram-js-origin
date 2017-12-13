'use strict';

require('diagram-js/test/helper');

/* global bootstrapDiagram, inject */


var originModule = require('../');

var innerSVG = require('tiny-svg/lib/innerSVG');


describe('origin', function() {

  describe('basic', function() {

    beforeEach(bootstrapDiagram({
      modules: [
        originModule
      ]
    }));

    it('should bootstrap', inject(function(canvas) {
      canvas.scroll({ dx: 100, dy: 100 });
    }));


    it('should exist in canvas', inject(function(canvas) {

      // given
      var layer = canvas.getLayer('bg');

      var label = layer.querySelector('.djs-origin-label'),
          cross = layer.querySelector('.djs-origin-cross'),
          border = layer.querySelector('.djs-origin-border');

      // then
      expect(label).to.exist;
      expect(cross).to.exist;
      expect(border).to.exist;

      expect(innerSVG(label)).to.equal('(0, 0)');
    }));

  });

  describe('no border', function() {

    beforeEach(bootstrapDiagram({
      modules: [
        originModule,
        {
          config: [ 'value', { origin: { showBorder: false } } ]
        }
      ]
    }));


    it('should hide border', inject(function(canvas) {

      // given
      var layer = canvas.getLayer('bg');

      var border = layer.querySelector('.djs-origin-border');

      // then
      expect(border).not.to.exist;
    }));

  });

});
