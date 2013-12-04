(function (ns) {
    "use strict";


    var assert = assert || buster.referee.assert;
    var refute = refute || buster.referee.refute;

    buster.testCase('MarkerModelTest', {

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
        },

        "should not throw MissingPositionError when initPos is false": function () {
            refute.exception(function () {
                var model = new ns.MarkerModel({}, {"initPos": false});
            });
        },

        "should not throw MissingPositionError when requirePosition is false": function () {
            refute.exception(function () {
                var model = new ns.MarkerModel({}, {"requirePosition": false});
                refute(model.hasMarker());
            });

        },


        "should set point on fetch": function () {
            Backbone.$ = {
                "ajax": this.stub().yieldsTo(
                    "success",
                    {"position": {"lon": 10, "lat": 60}}
                )
            };

            var model = new ns.MarkerModel({id: 1}, {"initPos": false});
            model.urlRoot = "/marker/";
            model.fetch({"reset": true});
            assert.calledOnce(Backbone.$.ajax);
            assert.equals(model.getMarker().getLatLng().lat, 60);
            assert.equals(model.getMarker().getLatLng().lng, 10);

        }

    });
}(SpatialBB));