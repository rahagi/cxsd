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
exports.Attribute = void 0;
var MemberBase_1 = require("./MemberBase");
var types = require("../types");
/** <xsd:attribute> */
var Attribute = /** @class */ (function (_super) {
    __extends(Attribute, _super);
    function Attribute() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.use = null;
        _this.default = null;
        return _this;
    }
    Attribute.prototype.init = function (state) {
        // Attributes appear exactly once unless they're optional.
        if (this.use == 'optional')
            this.min = 0;
        else
            this.min = 1; // assume 'required'
        this.max = 1;
        this.define(state, 'attribute', this.min, this.max);
    };
    Attribute.prototype.resolve = function (state) {
        var attribute = this.resolveMember(state, 'attribute');
    };
    Attribute.mayContain = function () { return [
        types.Annotation,
        types.SimpleType
    ]; };
    return Attribute;
}(MemberBase_1.MemberBase));
exports.Attribute = Attribute;
