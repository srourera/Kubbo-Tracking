package com.technicaltest.trackingserver.facade;

import com.technicaltest.trackingserver.dto.ProductData;
import com.technicaltest.trackingserver.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class ProductFacade {

    @Autowired
    private ProductService productService;

    public List<ProductData> getProducts() {
        return productService.getProducts();
    }

    public ProductData getProductById(Long productId) {
        return productService.getProductById(productId);
    }

    public ProductData create(ProductData productData) {
        return productService.create(productData);
    }

    public ProductData edit(Long productId, ProductData productData) {
        return productService.edit(productId, productData);
    }

    public void activate(Long productId) {
        productService.activate(productId);
    }

    public void deactivate(Long productId) {
        productService.deactivate(productId);
    }

    public void delete(Long productId) {
        productService.delete(productId);
    }

    public Long uploadImage(MultipartFile file) {
        return productService.uploadImage(file);
    }

    public byte[] getImage(Long imageId) {
        return productService.getImage(imageId);
    }
}
