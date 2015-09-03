'use strict';
/*global ol, source */
/**
 * @name ma-app.services
 * @description
 * This `ma-app.services` module contains the services of the app.
 */
angular.module('ma-app.services', [
  'ma-app.resources'
]).
factory('layerService', function() {

  var service = {};

  var projection = {};
  projection['EPSG:28992'] = ol.proj.get('EPSG:28992');
  projection['EPSG:28992'].setExtent([0, 300000, 300000, 650000]);

  var map = new ol.Map({
    target: 'map',
    logo: false,
    controls: [
      new ol.control.Rotate(),
      new ol.control.Attribution(),
      new ol.control.ZoomSlider()
    ],
    view: new ol.View({
      projection: projection['EPSG:28992'],
      center: [155000, 463000],
      zoom: 13,
      minZoom: 3,
      maxZoom: 15,
    })
  });
  /**
   * [pdok WMS layer]
   * @type {ol}
   */
  var pdok = new ol.layer.Tile({
    name: 'PDOK',
    source: new ol.source.TileWMS({
      url: 'http://geodata.nationaalgeoregister.nl/wmsc',
      params: {
        LAYERS: 'brtachtergrondkaart',
        VERSION: '1.1.1'
      },
      tileGrid: new ol.tilegrid.TileGrid({
        origin: [-285401.92, 22598.08],
        resolutions: [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21],
        tileSize: 256
      }),
      projection: projection['EPSG:28992'],
      extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999]
    })
  });
  /**
   * [bag WMS layer]
   * @type {ol}
   */
  var bag = new ol.layer.Tile({
    name: 'BAG',
    source: new ol.source.TileWMS({
      url: 'http://213.206.232.120:8080/geoserver/BAG/wms',
      params: {
        LAYERS: 'BAG:pandactueelbestaand',
        VERSION: '1.1.1'
      },
      tileGrid: new ol.tilegrid.TileGrid({
        origin: [-285401.92, 22598.08],
        resolutions: [3440.64, 1720.32, 860.16, 430.08, 215.04, 107.52, 53.76, 26.88, 13.44, 6.72, 3.36, 1.68, 0.84, 0.42, 0.21],
        tileSize: 256
      }),
      projection: projection['EPSG:28992'],
      extent: [-285401.92, 22598.08, 595401.9199999999, 903401.9199999999]
    })
  });
  map.addLayer(pdok);
  map.addLayer(bag);

  service.init = function() {
    return map;
  };
  return service;
}).
factory('geometryService', function() {
  var service = {};

  var geometryCategories = [{
    id: '1',
    name: 'Point',
    img: 'point.jpg'
  }, {
    id: '2',
    name: 'LineString',
    img: 'lineString.jpg'
  }, {
    id: '3',
    name: 'Polygon',
    img: 'pologon.jpg'
  }, {
    id: '4',
    name: 'Circle',
    img: 'circle.jpg'
  }, {
    id: '5',
    name: 'Square',
    img: 'square.jpg'
  }, {
    id: '6',
    name: 'Box',
    img: 'box.jpg'
  }, {
    id: '7',
    name: 'None',
    img: 'text.jpg'
  }, {
    id: '7',
    name: 'None',
    img: 'location.jpg'
  }, ];

  service.getGeometryCategories = function() {
    return geometryCategories;
  };
  return service;
});