"use strict";
// This file is part of cxsd, copyright (c) 2016 BusFaster Ltd.
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
exports.Member = void 0;
var cxml = require("cxml");
var Type_1 = require("./Type");
var MemberRef_1 = require("./MemberRef");
var Member = /** @class */ (function (_super) {
    __extends(Member, _super);
    function Member(name) {
        var _this = _super.call(this, null, name) || this;
        _this.surrogateKey = Member.nextKey++;
        return _this;
    }
    Member.prototype.getRef = function () {
        return (new MemberRef_1.MemberRef(this, 0, 1));
    };
    Member.prototype.getProxy = function () {
        var proxy = this.proxy;
        if (!proxy) {
            var proxy = new Type_1.Type(null);
            proxy.namespace = this.namespace;
            proxy.isProxy = true;
            proxy.containingRef = this.getRef();
            this.proxy = proxy;
            this.namespace.addType(proxy);
            if (!this.isAbstract) {
                proxy.addChildSpec(this);
            }
        }
        return (proxy);
    };
    Member.nextKey = 0;
    return Member;
}(cxml.MemberBase));
exports.Member = Member;
