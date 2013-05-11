var SpatialBB = window.SpatialBB || {};

(function (ns, undefined) {
    "use strict";
    ns.MissingPositionError = function (message) {
        this.name = "MissingPositionError";
        this.message = message || "Missing Position";
    };
    ns.MissingPositionError.prototype = new Error();
    ns.MissingPositionError.prototype.constructor = ns.MissingPositionError;
}(SpatialBB));