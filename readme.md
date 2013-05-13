SpatialBB
=========

SpatialBB (or "spatially enabeled Backbone") is an attempt to merge the MVC-capabilities of
[Backbone.js](http://backbonejs.org/) with the spatial capabilities of [Leaflet](http://leafletjs.com/).

How it works
------------
A Model in SpatialBB (a MarkerModel) is a subclass of Backbone.Model, and works in much the same way.
When initualized with  data it expects to find a "position"-attribute, which is an object with
a "lon" and a "lat" attribute.

If no "position"-attribute is specified, a SpatialBB.MissingPositionError is raised.
To slience this, set initPos: false in the options. This is useful when fetching data via "fetch()".

To get the position, use the "getMarker()"-function on the MarkerModel, this returns a Leaflet Marker.

A Collection in SpatialBB (a MarkerCollection) is a subclass of Backbone.Collection, and expects it's
models to be MarkerModel (or subclasses of this). Upon initialization of a MarkerCollection a Leaflet
LayerGroup is created, this can be accessed via  MarkerCollection.getLayerGroup(). Models added and removed
from the collection will cause Markers to be added or removed from the LayerGroup.

This combination ensures complete interaction between the model and it's spatial component.

TODO
----
- Add support for events
- Support adding raw attributes objects to collection

License
-------
SpatialBB is Licensed under the MIT-License, see LICENSE.TXT

Tests
-----
The [buster.js](http://www.busterjs.org/) library is used for writing the tests for SpatialBB. Be sure to set up buster.js correctly to run tests