import {
  bootstrapDiagram,
  inject
} from 'diagram-js/test/helper';


import originModule from '../';

import {
  innerSVG
} from 'tiny-svg';


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
      var layer = canvas.getLayer('djs-origin');

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
      var layer = canvas.getLayer('djs-origin');

      var border = layer.querySelector('.djs-origin-border');

      // then
      expect(border).not.to.exist;
    }));

  });


  describe('layering', function() {

    beforeEach(bootstrapDiagram({
      modules: [
        {
          __init__: [ 'foo' ],
          foo: [ 'type', function(canvas) {
            canvas.getDefaultLayer();
          }]
        },
        originModule,
        {
          config: [ 'value', { origin: { showBorder: false } } ]
        }
      ]
    }));


    function layerIndex(layer) {
      var indexOf = Array.prototype.indexOf;

      return indexOf.call(layer.parentNode.childNodes, layer);
    }

    it('should hide border', inject(function(canvas) {

      // given
      var originLayer = canvas.getLayer('djs-origin');
      var defaultLayer = canvas.getDefaultLayer();

      // then
      expect(layerIndex(originLayer)).to.be.below(layerIndex(defaultLayer));
    }));

  });


  describe('colors', function() {

    beforeEach(bootstrapDiagram({
      modules: [
        originModule,
        {
          config: [ 'value', {
            origin: {
              showBorder: true,
              borderColor: '#ff00ff',
              crossColor: '#008000'
            }
          } ]
        }
      ]
    }));


    function getFill(el) {
      return el.style.fill;
    }

    function getStroke(el) {
      return el.style.stroke;
    }


    it('should customize colors', inject(function(canvas) {

      // given
      var layer = canvas.getLayer('djs-origin');

      var label = layer.querySelector('.djs-origin-label'),
          cross = layer.querySelector('.djs-origin-cross'),
          border = layer.querySelector('.djs-origin-border');

      // then
      expect(getFill(label)).to.eql('#008000');
      expect(getStroke(cross)).to.eql('#008000');
      expect(getStroke(border)).to.eql('#ff00ff');
    }));

  });

});
