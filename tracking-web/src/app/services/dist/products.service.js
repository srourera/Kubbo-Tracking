"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductsService = void 0;
var core_1 = require("@angular/core");
var Properties_1 = require("../configuration/Properties");
var ProductsService = /** @class */ (function () {
    function ProductsService(http) {
        this.http = http;
    }
    ProductsService.prototype.getProducts = function () {
        return this.http.get(Properties_1.productsUrl);
    };
    ProductsService.prototype.getProductById = function (id) {
        return this.http.get(Properties_1.productsUrl + "/" + id);
    };
    ProductsService.prototype.create = function (product) {
        return this.http.post(Properties_1.productsUrl, product);
    };
    ProductsService.prototype.edit = function (product) {
        return this.http.put(Properties_1.productsUrl + "/" + product.id, product);
    };
    ProductsService.prototype.activate = function (productId) {
        return this.http.put(Properties_1.productsUrl + "/activate/" + productId, {});
    };
    ProductsService.prototype.deactivate = function (productId) {
        return this.http.put(Properties_1.productsUrl + "/deactivate/" + productId, {});
    };
    ProductsService.prototype["delete"] = function (product) {
        return this.http["delete"](Properties_1.productsUrl + "/" + product.id);
    };
    ProductsService.prototype.uploadImage = function (image) {
        var uploadImageData = new FormData();
        uploadImageData.append('imageFile', image);
        return this.http.post(Properties_1.imagesUrl, uploadImageData);
    };
    ProductsService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], ProductsService);
    return ProductsService;
}());
exports.ProductsService = ProductsService;
