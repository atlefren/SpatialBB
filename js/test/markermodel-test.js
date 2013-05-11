(function (ns) {
    "use strict";

    buster.testCase('ModelTest', {
        "should be defined": function () {
            assert(ns.MarkerModel);
        },
        "should be able to set point": function () {
            var model = new ns.MarkerModel({"position": {"lon": 10, "lat": 60}});
            assert.equals(model.getMarker().getLatLng().lat, 60);
            assert.equals(model.getMarker().getLatLng().lng, 10);
        },

        "should throw MissingPositionError when no position": function () {
            assert.exception(function () {
                var model = new ns.MarkerModel();
            }, "MissingPositionError");
        },

        "should throw MissingPositionError on missing lon": function () {
            assert.exception(function () {
                var model = new ns.MarkerModel({"position": {"lat": 10}});
            }, "MissingPositionError");
        },

        "should throw MissingPositionError on missing lat": function () {
            assert.exception(function () {
                var model = new ns.MarkerModel({"position": {"lon": 10}});
            }, "MissingPositionError");
        }
    });
}(SpatialBB));