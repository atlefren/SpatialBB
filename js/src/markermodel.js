var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";

   ns.MarkerModel = Backbone.Model.extend({

        initialize: function () {
            this.createMarker();
        },

        createMarker: function () {
            if (this.has("position")) {
                if (this.get("position").lon && this.get("position").lat) {
                    this.marker = new L.Marker([this.get("position").lat, this.get("position").lon]);
                }
            }
        },

        getMarker: function () {
           return this.marker;
        }
   });

}(SpatialBB));