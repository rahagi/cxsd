"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MissingReferenceError = void 0;
var MissingReferenceError = /** @class */ (function (_super) {
    __extends(MissingReferenceError, _super);
    function MissingReferenceError(type, ref) {
        var _this = _super.call(this) || this;
        _this.name = 'MissingReferenceError';
        _this.message = 'Missing ' + type + ': ' + ref.format();
        return _this = _super.call(this, _this.message) || this;
    }
    return MissingReferenceError;
}(Error));
exports.MissingReferenceError = MissingReferenceError;
