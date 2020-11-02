"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var product_dialog_1 = require("./product-dialog");
var image_pipe_1 = require("../../pipes/image.pipe");
var app_data_spec_1 = require("../../app.data.spec");
var dialog_1 = require("@angular/material/dialog");
describe('ProductDialogComponent', function () {
    var dialog;
    var imagePipe;
    var fixture;
    beforeEach(function () { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, testing_1.TestBed.configureTestingModule({
                        declarations: [product_dialog_1.ProductDialog],
                        imports: [dialog_1.MatDialogModule],
                        providers: [
                            image_pipe_1.ImagePipe,
                            { provide: dialog_1.MAT_DIALOG_DATA, useValue: {} },
                            { provide: dialog_1.MatDialogRef, useValue: { close: function () { } } }
                        ]
                    })
                        .compileComponents()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); });
    beforeEach(function () {
        fixture = testing_1.TestBed.createComponent(product_dialog_1.ProductDialog);
        imagePipe = testing_1.TestBed.get(image_pipe_1.ImagePipe);
        dialog = fixture.componentInstance;
        dialog.product = app_data_spec_1.clone(app_data_spec_1.emptyProduct);
        fixture.detectChanges();
    });
    it('should be created', function () {
        // Given
        // Then
        expect(dialog).toBeTruthy();
    });
    describe('ngOnInit', function () {
        it('should init preview image', function () {
            // Given
            spyOn(imagePipe, 'transform');
            var product = app_data_spec_1.clone(app_data_spec_1.productWithImage);
            dialog.product = product;
            // When
            dialog.ngOnInit();
            // Then
            expect(imagePipe.transform).toHaveBeenCalledWith(app_data_spec_1.productWithImage.image);
        });
    });
    describe('toggleEnabled', function () {
        it('should set the enabled slider with the event.checked when true', function () {
            // Given          
            var event = app_data_spec_1.clone(app_data_spec_1.sliderToggleEventTrue);
            // When
            dialog.toggleEnabled(event);
            // Then
            expect(dialog.product.enabled).toBeTruthy();
        });
        it('should set the enabled slider with the event.checked when false', function () {
            // Given          
            dialog.product.enabled = true;
            var event = app_data_spec_1.clone(app_data_spec_1.sliderToggleEventFalse);
            // When
            dialog.toggleEnabled(event);
            // Then
            expect(dialog.product.enabled).toBeFalsy();
        });
    });
    describe('onNoClick', function () {
        it('should close the dialog', function () {
            // Given          
            spyOn(dialog, 'closeDialog');
            // When
            dialog.onNoClick();
            // Then
            expect(dialog.closeDialog).toHaveBeenCalled();
        });
    });
    describe('onSaveClick', function () {
        it('should emit save event', function () {
            // Given     
            dialog.product = app_data_spec_1.clone(app_data_spec_1.fullProduct);
            spyOn(dialog.save, 'emit');
            // When
            dialog.onSaveClick();
            // Then
            expect(dialog.save.emit).toHaveBeenCalledWith(app_data_spec_1.fullProduct);
        });
    });
    describe('closeDialog', function () {
        it('should close the dialog', function () {
            // Given          
            spyOn(dialog.dialogRef, 'close');
            // When
            dialog.closeDialog();
            // Then
            expect(dialog.dialogRef.close).toHaveBeenCalled();
        });
    });
    describe('removeImage', function () {
        it('should remove image from product', function () {
            // Given
            dialog.product = app_data_spec_1.clone(app_data_spec_1.productWithImage);
            // When
            dialog.removeImage();
            // Then
            expect(dialog.product.image).toBeNull();
            expect(dialog.product.imageFile).toBeNull();
        });
    });
    describe('onFileChanged', function () {
        it('should assign imageFile', function () {
            // Given      
            var event = app_data_spec_1.clone(app_data_spec_1.inputFileEvent);
            spyOn(dialog, 'setPreviewImage');
            // When
            dialog.onFileChanged(event);
            // Then
            expect(dialog.setPreviewImage).toHaveBeenCalled();
            expect(dialog.product.imageFile).not.toBeNull();
        });
    });
});
