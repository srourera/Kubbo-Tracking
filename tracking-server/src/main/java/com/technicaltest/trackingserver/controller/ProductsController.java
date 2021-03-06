package com.technicaltest.trackingserver.controller;

import com.technicaltest.trackingserver.clients.ProductsClient;
import com.technicaltest.trackingserver.dto.ProductData;
import com.technicaltest.trackingserver.facade.ProductFacade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpOutputMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping(
        value = "/gui/products",
        produces = MediaType.APPLICATION_JSON_VALUE
)
public class ProductsController {

    @Autowired
    private ProductFacade productFacade;

    @GetMapping
    public ResponseEntity<List<ProductData>> getProducts(){
        return new ResponseEntity<>(productFacade.getProducts(), HttpStatus.OK);
    }

    @GetMapping(
        value = "/{productId}"
    )
    public ResponseEntity<ProductData> getProductById(@PathVariable Long productId){
        return new ResponseEntity<>(productFacade.getProductById(productId), HttpStatus.OK);
    }

    @PostMapping(
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ProductData> createProduct(@RequestBody ProductData product){
        return new ResponseEntity<>(productFacade.create(product),HttpStatus.CREATED);
    }

    @PutMapping(
            value = "/{productId}",
            consumes = MediaType.APPLICATION_JSON_VALUE
    )
    public ResponseEntity<ProductData> editProduct(@PathVariable Long productId, @RequestBody ProductData product) throws Exception {
        return new ResponseEntity<>(productFacade.edit(productId, product),HttpStatus.CREATED);
    }

    @PutMapping(
            value = "/activate/{productId}"
    )
    public ResponseEntity activateProduct(@PathVariable Long productId) {
        productFacade.activate(productId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping(
            value = "/deactivate/{productId}"
    )
    public ResponseEntity deactivateProduct(@PathVariable Long productId) {
        productFacade.deactivate(productId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @DeleteMapping(
            value = "/{productId}"
    )
    public ResponseEntity deleteProduct(@PathVariable Long productId) {
        productFacade.delete(productId);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PostMapping(
            value = "/image",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE
    )
    ResponseEntity<Long> uploadImage(@RequestPart("imageFile") MultipartFile file) throws IOException {
        return new ResponseEntity<>(productFacade.uploadImage(file),HttpStatus.CREATED);
    }

    @GetMapping(
            value = "/image/{imageId}"
    )
    ResponseEntity<byte[]> getImage(@PathVariable Long imageId) {
        return new ResponseEntity<>(productFacade.getImage(imageId),HttpStatus.OK);
    }
}
