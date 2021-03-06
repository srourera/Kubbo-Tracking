"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductDetailsComponent = void 0;
var core_1 = require("@angular/core");
var stock_dialog_1 = require("../stock-dialog/stock-dialog");
var ProductDetailsComponent = /** @class */ (function () {
    function ProductDetailsComponent(errorBar, stocksService, dialog) {
        this.errorBar = errorBar;
        this.stocksService = stocksService;
        this.dialog = dialog;
        this.loading = false;
        this.hidden = false;
        this.stocks = [];
        this.edit = new core_1.EventEmitter();
        this.enable = new core_1.EventEmitter();
        this["delete"] = new core_1.EventEmitter();
    }
    ProductDetailsComponent.prototype.ngOnChanges = function () {
        this.stocks = [];
        this.loadStock();
    };
    ProductDetailsComponent.prototype.loadStock = function () {
        var _this = this;
        if (!!this.product && !!this.product.id) {
            this.stocksService.getStockByProductId(this.product.id).subscribe(function (response) {
                if (!response)
                    return;
                _this.stocks = response;
            }, function (_a) {
                var error = _a.error;
                _this.openErrorBar('loading Stock', error);
                _this.stocks = [];
            });
        }
    };
    ProductDetailsComponent.prototype.editProduct = function (product) {
        this.edit.emit(product);
    };
    ProductDetailsComponent.prototype.enableProduct = function (event, product) {
        product.enabled = event.checked;
        this.enable.emit(product);
    };
    ProductDetailsComponent.prototype.deleteProduct = function (product) {
        this["delete"].emit(product);
    };
    ProductDetailsComponent.prototype.addStock = function () {
        var _this = this;
        if (!!this.product && !!this.product.id) {
            var stock = {
                productId: this.product.id
            };
            var dialogRef_1 = this.stockDialog(stock);
            dialogRef_1.componentInstance.save.subscribe(function (stock) {
                if (!stock)
                    dialogRef_1.componentInstance.closeDialog();
                _this.loading = true;
                _this.stocksService.create(stock).subscribe(function () {
                    _this.loadStock();
                    dialogRef_1.componentInstance.closeDialog();
                    _this.loading = false;
                }, function (_a) {
                    var error = _a.error;
                    _this.openErrorBar('creating Stock', error);
                });
            });
        }
    };
    ProductDetailsComponent.prototype.editStock = function (stock) {
        var _this = this;
        var s = Object.assign({}, stock);
        s.warehouseId = !!s.warehouse ? s.warehouse.id : null;
        var dialogRef = this.stockDialog(s);
        dialogRef.componentInstance.save.subscribe(function (stock) {
            if (!stock)
                dialogRef.componentInstance.closeDialog();
            _this.loading = true;
            _this.stocksService.edit(stock).subscribe(function () {
                _this.loadStock();
                dialogRef.componentInstance.closeDialog();
                _this.loading = false;
            }, function (_a) {
                var error = _a.error;
                _this.openErrorBar('editing Stock', error);
            });
        });
    };
    ProductDetailsComponent.prototype.deleteStock = function (stock) {
        var _this = this;
        if (confirm("Are you sure to delete stock of " + stock.warehouse.name + "?")) {
            this.loading = true;
            this.stocksService["delete"](stock).subscribe(function () {
                _this.loadStock();
                _this.loading = false;
            }, function (_a) {
                var error = _a.error;
                _this.openErrorBar('deleting Stock', error);
            });
        }
    };
    ProductDetailsComponent.prototype.openErrorBar = function (action, error) {
        var message = error.status === 500 || error.status === 404 ?
            "Something went wrong " + action :
            error.error + ": " + error.message;
        this.errorBar.open(message, '', {
            duration: 2000,
            panelClass: ['error']
        });
    };
    ProductDetailsComponent.prototype.stockDialog = function (stock) {
        return this.dialog.open(stock_dialog_1.StockDialog, {
            width: '80vw',
            data: stock
        });
    };
    __decorate([
        core_1.Input()
    ], ProductDetailsComponent.prototype, "hidden");
    __decorate([
        core_1.Input()
    ], ProductDetailsComponent.prototype, "product");
    __decorate([
        core_1.Input()
    ], ProductDetailsComponent.prototype, "stocks");
    __decorate([
        core_1.Output()
    ], ProductDetailsComponent.prototype, "edit");
    __decorate([
        core_1.Output()
    ], ProductDetailsComponent.prototype, "enable");
    __decorate([
        core_1.Output()
    ], ProductDetailsComponent.prototype, "delete");
    ProductDetailsComponent = __decorate([
        core_1.Component({
            selector: 'product-details',
            templateUrl: './product-details.component.html',
            styleUrls: ['./product-details.component.css']
        })
    ], ProductDetailsComponent);
    return ProductDetailsComponent;
}());
exports.ProductDetailsComponent = ProductDetailsComponent;
