(function (ns) {
    "use strict";


    var assert = assert || buster.referee.assert;
    var refute = refute || buster.referee.refute;

    buster.testCase('MarkerCollectionTest', {


        "should be defined": function () {
            assert(ns.MarkerCollection);
        },

        "should have a LayerGroup": function () {
            var collection = new ns.MarkerCollection();

            assert(collection.getLayerGroup());
        },

        "model added to collection should be added to layerGroup": function () {
            var model = new ns.MarkerModel({"position": {"lon": 10, "lat": 60}});
            var collection = new ns.MarkerCollection();
            collection.add(model);

            var i = 0;
            collection.getLayerGroup().eachLayer(function (layer) {
                i++;
            });
            assert.equals(i, 1);
        },

        "several models added to collection should be added to layerGroup": function () {
            var model1 = new ns.MarkerModel({"position": {"lon": 10, "lat": 60}});
            var model2 = new ns.MarkerModel({"position": {"lon": 11, "lat": 60}});
            var collection = new ns.MarkerCollection();
            collection.add([model1, model2]);

            var i = 0;
            collection.getLayerGroup().eachLayer(function (layer) {
                i++;
            });
            assert.equals(i, 2);
        },

        "should be able to add raw attributes objects to collection": function () {
            var collection = new ns.MarkerCollection();
            collection.add([{"position": {"lon": 10, "lat": 60}}, {"position": {"lon": 11, "lat": 60}}]);

            var i = 0;
            collection.getLayerGroup().eachLayer(function (layer) {
                i++;
            });
            assert.equals(i, 2);
        },

        "marker should be deleted from layergroup when model deleted": function () {
            var model = new ns.MarkerModel({"position": {"lon": 10, "lat": 60}});
            var collection = new ns.MarkerCollection();
            collection.add(model);
            collection.remove(model);

            var i = 0;
            collection.getLayerGroup().eachLayer(function (layer) {
                i++;
            });
            assert.equals(i, 0);
        },

        "fetching models from url should work": function () {
            Backbone.$ = {
                "ajax": this.stub().yieldsTo(
                    "success", [
                        {"position": {"lon": 10, "lat": 61}},
                        {"position": {"lon": 11, "lat": 61}}
                    ]
                )
            };

            var collection = new ns.MarkerCollection();
            collection.url = "/marker";
            collection.fetch();

            assert.calledOnce(Backbone.$.ajax);
            assert.equals(collection.length, 2);
            assert.equals(collection.at(0).getMarker().getLatLng().lat, 61);
            assert.equals(collection.at(0).getMarker().getLatLng().lng, 10);
            assert.equals(collection.at(1).getMarker().getLatLng().lat, 61);
            assert.equals(collection.at(1).getMarker().getLatLng().lng, 11);
        },

        "fetching models from url with reset true should work": function () {
            Backbone.$ = {
                "ajax": this.stub().yieldsTo(
                    "success", [
                        {"position": {"lon": 10, "lat": 61}},
                        {"position": {"lon": 11, "lat": 61}}
                    ]
                )
            };

            var collection = new ns.MarkerCollection();
            collection.url = "/marker";
            collection.fetch({"reset": true});

            assert.calledOnce(Backbone.$.ajax);
            var i = 0;
            collection.getLayerGroup().eachLayer(function (layer) {
                i++;
            });
            assert.equals(i, 2);
        },

        "fetching models without position from url should work": function () {
            Backbone.$ = {
                "ajax": this.stub().yieldsTo(
                    "success", [
                        {"position": null, "name": "test"},
                        {"position": null, "name": "test2"}
                    ]
                )
            };

            var collection = new ns.MarkerCollection({}, {requirePosition: false});
            collection.url = "/marker";
            collection.fetch({"reset": true});

            assert.calledOnce(Backbone.$.ajax);
            assert.equals(collection.length, 2);

            var i = 0;
            collection.getLayerGroup().eachLayer(function (layer) {
                i++;
            });
            assert.equals(i, 0);
        }

    });
}(SpatialBB));