var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";

    ns.MarkerModel = Backbone.Model.extend({

        initialize: function (attributes, options) {
            options = options || {initPos: true};
            if (options.initPos) {
                this.createMarker(this.parsePosition());
            }
        },

        parsePosition: function () {
            var position = null;
            if (this.has("position")) {
                position = {
                    "lon": this.get("position").lon || null,
                    "lat": this.get("position").lat || null
                };
            }
            if ((!position || !position.lon || !position.lat)) {
                throw new ns.MissingPositionError();
            }
            return position;
        },

        parse: function (obj) {
            if (obj.position) {
                this.createMarker(obj.position);
            }
            return obj;
        },

        createMarker: function (position) {
            this.marker = new L.Marker([position.lat, position.lon]);
        },

        getMarker: function () {
            return this.marker;
        },

        hasMarker: function () {
            return !!this.marker;
        }

    });

}(SpatialBB));