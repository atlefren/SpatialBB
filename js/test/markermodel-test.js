(function (ns) {
    "use strict";

    buster.testCase('ModelTest', {
        "should be defined": function() {
            assert(ns.MarkerModel);
        },
        "should be able to set point": function() {
            var model = new ns.MarkerModel({"position": {"lon": 10, "lat": 60}});
            assert.equals(model.getMarker().getLatLng().lat, 60);
            assert.equals(model.getMarker().getLatLng().lng, 10);
        }
    });
}(SpatialBB));