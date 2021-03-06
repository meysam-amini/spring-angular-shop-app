package com.meysam.ecommerce.repository;

import com.meysam.ecommerce.entity.Product;
import com.meysam.ecommerce.entity.ProductCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://127.0.0.1:4200")
@RepositoryRestResource(collectionResourceRel="productCategory",path="product-category")
public interface ProductCategoryRepository extends JpaRepository<ProductCategory,Long> {

}
