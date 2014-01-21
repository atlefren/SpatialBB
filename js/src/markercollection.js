var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";

    ns.MarkerCollection = Backbone.Collection.extend({

        model: ns.MarkerModel,

        requirePosition: true,

        initialize: function (models, options) {
            options = options || {};
            if (_.has(options, "requirePosition")) {
                this.requirePosition = options.requirePosition;
            }

            this.layerGroup = new L.LayerGroup();
            this.on("add", this.modelAdded, this);
            this.on("remove", this.modelRemoved, this);
            this.on("reset", this.collectionReset, this);
        },

        getLayerGroup: function () {
            return this.layerGroup;
        },

        modelAdded: function (model) {
            model.requirePosition = this.requirePosition;
            var marker = model.getMarker();
            if (!marker) {
                model.createMarker(model.parsePosition());
                marker = model.getMarker();
            }
            this.layerGroup.addLayer(marker);
        },

        modelRemoved: function (model) {
            var marker = model.getMarker();
            if (marker) {
                this.layerGroup.removeLayer(marker);
            }
        },

        collectionReset: function () {
            this.layerGroup.clearLayers();
            this.each(function (model) {
                if (model.hasMarker()) {
                    this.layerGroup.addLayer(model.getMarker());
                }
            }, this);
        },

        getBounds: function () {
            return L.latLngBounds(_.compact(this.map(function (model) {
                if (model.hasMarker()) {
                    return model.getMarker().getLatLng();
                }
            })));
        }
    });

}(SpatialBB));