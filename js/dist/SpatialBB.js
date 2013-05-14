var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";
    ns.MissingPositionError = function (message) {
        this.name = "MissingPositionError";
        this.message = message || "Missing Position";
    };
    ns.MissingPositionError.prototype = new Error();
    ns.MissingPositionError.prototype.constructor = ns.MissingPositionError;
}(SpatialBB));;var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";

    ns.MarkerCollection = Backbone.Collection.extend({

        model: ns.MarkerModel,

        initialize: function () {
            this.layerGroup = new L.LayerGroup();
            this.on("add", this.modelAdded, this);
            this.on("remove", this.modelRemoved, this);
        },

        getLayerGroup: function () {
            return this.layerGroup;
        },

        modelAdded: function (model) {
            var marker = model.getMarker();
            if (!marker) {
                model.createMarker(model.parsePosition());
                marker = model.getMarker();
            }
            this.getLayerGroup().addLayer(marker);
        },

        modelRemoved: function (model) {
            var marker = model.getMarker();
            if (marker) {
                this.getLayerGroup().removeLayer(marker);
            }
        }
    });

}(SpatialBB));;var SpatialBB = window.SpatialBB || {};

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
            if (this.has("position")) {
                return {
                    "lon": this.get("position").lon || null,
                    "lat": this.get("position").lat || null
                };
            }
            return null;
        },

        parse: function (obj) {
            if (obj.position) {
                this.createMarker(obj.position);
            }
            return obj;
        },

        createMarker: function (position) {
            if ((!position || !position.lon || !position.lat)) {
                throw new ns.MissingPositionError();
            }
            this.marker = new L.Marker([position.lat, position.lon]);
        },

        getMarker: function () {
            return this.marker;
        }

    });

}(SpatialBB));