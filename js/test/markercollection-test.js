(function (ns) {
    "use strict";

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
        }

    });
}(SpatialBB));