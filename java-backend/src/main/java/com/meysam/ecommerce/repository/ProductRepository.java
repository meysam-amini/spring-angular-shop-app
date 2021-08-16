package com.meysam.ecommerce.repository;

import com.meysam.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestParam;

CrossOrigin(origins = "http://127.0.0.1:4200")
public interface ProductRepository extends JpaRepository<Product,Long> {

    Page<Product> findByCategoryId(@RequestParam("id") Long id, Pageable p);
    Page<Product> findByNameContaining(@RequestParam("name") String name, Pageable p);
}
