var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";

    ns.MarkerModel = Backbone.Model.extend({

        initialize: function () {
            this.createMarker();
        },

        createMarker: function () {
            if (!this.has("position") || !this.get("position").lon || !this.get("position").lat) {
                throw new ns.MissingPositionError();
            }
            this.marker = new L.Marker([this.get("position").lat, this.get("position").lon]);
        },

        getMarker: function () {
            return this.marker;
        }
    });

}(SpatialBB));