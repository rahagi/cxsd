"use strict";
// This file is part of cxsd, copyright (c) 2015-2016 BusFaster Ltd.
// Released under the MIT license, see LICENSE.
Object.defineProperty(exports, "__esModule", { value: true });
exports.JS = exports.TS = void 0;
var TS_1 = require("./exporter/TS");
Object.defineProperty(exports, "TS", { enumerable: true, get: function () { return TS_1.TS; } });
var JS_1 = require("./exporter/JS");
Object.defineProperty(exports, "JS", { enumerable: true, get: function () { return JS_1.JS; } });
