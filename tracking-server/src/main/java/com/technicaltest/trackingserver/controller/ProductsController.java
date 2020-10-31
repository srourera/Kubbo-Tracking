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

    @PostMapping
    public ResponseEntity<ProductData> createProduct(@RequestBody ProductData product){
        return new ResponseEntity<>(productFacade.create(product),HttpStatus.CREATED);
    }
}
