var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";

    ns.MarkerCollection = Backbone.Collection.extend({

        model: ns.MarkerModel,

        initialize: function () {
            this.layerGroup = new L.LayerGroup();
            this.on("add", this.modelAdded, this);
            this.on("remove", this.modelRemoved, this);
            this.on("reset", this.collectionReset, this);
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
                this.layerGroup.addLayer(model.getMarker());
            }, this);
        }
    });

}(SpatialBB));