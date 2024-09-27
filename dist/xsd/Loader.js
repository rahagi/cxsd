"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.Loader = void 0;
var Promise = require("bluebird");
var cget_1 = require("cget");
var Source_1 = require("./Source");
var Parser_1 = require("./Parser");
/** Loader handles caching schema definitions and calling parser stages. */
var Loader = /** @class */ (function () {
    function Loader(context, options) {
        this.pendingCount = 0;
        this.context = context;
        this.options = cget_1.util.clone(options);
        this.parser = new Parser_1.Parser(context);
    }
    Loader.prototype.import = function (urlRemote) {
        var _this = this;
        var promise = new Promise(function (resolve, reject) {
            _this.resolve = resolve;
            _this.reject = reject;
            _this.source = _this.importFile(urlRemote);
        });
        return (promise);
    };
    Loader.prototype.importFile = function (urlRemote, namespace) {
        var _this = this;
        var options = this.options;
        options.address = new cget_1.Address(urlRemote);
        var source = Loader.sourceTbl[urlRemote];
        if (!source) {
            source = new Source_1.Source(urlRemote, this.context, namespace);
            Loader.cache.fetch(options).then(function (cached) {
                source.updateUrl(urlRemote, cached.address.url);
                return (_this.parser.init(cached, source, _this));
            }).then(function (dependencyList) {
                // TODO: The source could be parsed already if all dependencies
                // (and recursively their dependencies) have been preprocessed.
                if (--_this.pendingCount == 0)
                    _this.finish();
            });
            Loader.sourceTbl[urlRemote] = source;
            ++this.pendingCount;
        }
        return (source);
    };
    Loader.prototype.finish = function () {
        this.parser.resolve();
        this.resolve(this.source.targetNamespace);
    };
    Loader.prototype.getOptions = function () { return (this.options); };
    Loader.cache = new cget_1.Cache('cache/xsd', '_index.xsd');
    Loader.sourceTbl = {};
    return Loader;
}());
exports.Loader = Loader;
