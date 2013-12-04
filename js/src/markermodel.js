var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";

    ns.MarkerModel = Backbone.Model.extend({

        requirePosition: true,

        initialize: function (attributes, options) {

            if (options && options.collection) {
                options.requirePosition = options.collection.requirePosition;
            }

            options = options || {};

            if (!_.has(options, "initPos")) {
                options.initPos = true;
            }
            if (_.has(options, "requirePosition")) {
                this.requirePosition = options.requirePosition;
            }
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
            if ((!position || !position.lon || !position.lat) && this.requirePosition) {
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
            if (position) {
                this.marker = new L.Marker([position.lat, position.lon]);
            }
        },

        getMarker: function () {
            return this.marker;
        },

        hasMarker: function () {
            return !!this.marker;
        }

    });

}(SpatialBB));