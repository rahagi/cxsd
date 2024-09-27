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
exports.Group = exports.All = exports.Choice = exports.Sequence = exports.GenericChildList = exports.GroupBase = void 0;
var QName_1 = require("../QName");
var types = require("../types");
var GroupBase = /** @class */ (function (_super) {
    __extends(GroupBase, _super);
    function GroupBase() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.id = null;
        _this.minOccurs = '1';
        _this.maxOccurs = '1';
        return _this;
    }
    GroupBase.prototype.init = function (state) {
        this.min = +this.minOccurs;
        if (this.maxOccurs == 'unbounded')
            this.max = Infinity;
        else
            this.max = +this.maxOccurs;
    };
    return GroupBase;
}(types.Base));
exports.GroupBase = GroupBase;
var GenericChildList = /** @class */ (function (_super) {
    __extends(GenericChildList, _super);
    function GenericChildList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GenericChildList.prototype.resolve = function (state) {
        this.scope.addAllToParent('element', this.min, this.max);
        this.scope.addAllToParent('group', this.min, this.max);
    };
    GenericChildList.mayContain = function () { return [
        types.Annotation,
        types.Element,
        Group,
        Sequence,
        Choice,
        types.Any
    ]; };
    return GenericChildList;
}(GroupBase));
exports.GenericChildList = GenericChildList;
// <xsd:sequence>
var Sequence = /** @class */ (function (_super) {
    __extends(Sequence, _super);
    function Sequence() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Sequence;
}(GenericChildList));
exports.Sequence = Sequence;
// <xsd:choice>
var Choice = /** @class */ (function (_super) {
    __extends(Choice, _super);
    function Choice() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Choice;
}(GenericChildList));
exports.Choice = Choice;
// <xsd:all>
var All = /** @class */ (function (_super) {
    __extends(All, _super);
    function All() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return All;
}(GenericChildList));
exports.All = All;
// <xsd:group>
var Group = /** @class */ (function (_super) {
    __extends(Group, _super);
    function Group() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.name = null;
        _this.ref = null;
        return _this;
    }
    Group.prototype.init = function (state) {
        _super.prototype.init.call(this, state);
        this.define(state, 'group', 0, 0);
    };
    Group.prototype.resolve = function (state) {
        var group = this;
        if (this.ref) {
            var ref = new QName_1.QName(this.ref, state.source);
            group = this.scope.lookup(ref, 'group');
        }
        // Named groups are only models for referencing elsewhere.
        if (!this.name) {
            if (group) {
                // if(group != this && !group.resolved) console.log('OH NOES! Group ' + group.name);
                // group.scope.addAllToParent('element', this.min, this.max, this.scope);
                group.define(state, 'group', this.min, this.max, this.scope);
            }
            else
                throw new types.MissingReferenceError('group', ref);
        }
    };
    Group.mayContain = function () { return [
        types.Annotation,
        Sequence,
        Choice
    ]; };
    return Group;
}(GroupBase));
exports.Group = Group;
