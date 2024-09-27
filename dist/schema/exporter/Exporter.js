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
exports.Exporter = void 0;
var path = require("path");
var cget_1 = require("cget");
var Transform_1 = require("../transform/Transform");
var Exporter = /** @class */ (function (_super) {
    __extends(Exporter, _super);
    function Exporter(doc, cache) {
        var _this = _super.call(this, doc) || this;
        _this.state = { cache: cache };
        return _this;
    }
    Exporter.prototype.writeHeader = function () {
        var output = [];
        var importTbl = this.namespace.getUsedImportTbl();
        for (var _i = 0, _a = Object.keys(importTbl).sort(); _i < _a.length; _i++) {
            var shortName = _a[_i];
            var namespace = importTbl[shortName];
            var relativePath = this.getPathTo(namespace.name);
            output.push(this.writeImport(shortName, relativePath, namespace.name));
        }
        return (output);
    };
    /** Output namespace contents to cache, if not already exported. */
    Exporter.prototype.prepare = function () {
        var _this = this;
        var doc = this.doc;
        if (!doc)
            return (null);
        this.cacheDir = path.dirname(this.state.cache.getCachePathSync(new cget_1.Address(doc.namespace.name)));
        var outName = this.getOutName(doc.namespace.name);
        return (this.state.cache.ifCached(outName).then(function (isCached) {
            if (isCached)
                return (null);
            return (_this.state.cache.store(outName, _this.writeContents()));
        }));
    };
    /** Get relative path to another namespace within the cache. */
    Exporter.prototype.getPathTo = function (name) {
        // Append and then strip a file extension so references to a parent
        // directory will target the directory by name instead of .. or similar.
        var targetPath = this.state.cache.getCachePathSync(new cget_1.Address(name)) + '.js';
        // Always output forward slashes.
        // If path.sep is a backslash as on Windows, we need to escape it (as a double-backslash) for it to be a valid Regex.
        // We are using a Regex because the alternative string.replace(string, string) overload only replaces the first occurance.
        var separatorRegex = new RegExp(path.sep.replace("\\", "\\\\"), 'g');
        var relPath = path.relative(this.cacheDir, targetPath).replace(separatorRegex, '/').replace(/\.js$/, '');
        if (!relPath.match(/^[./]/))
            relPath = './' + relPath;
        return (relPath);
    };
    return Exporter;
}(Transform_1.Transform));
exports.Exporter = Exporter;
