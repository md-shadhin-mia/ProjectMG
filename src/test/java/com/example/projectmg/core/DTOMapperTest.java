package com.example.projectmg.core;

import lombok.Getter;
import lombok.Setter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.List;

class DTOMapperTest {
    private final DTOMapper dtoMapper;

    @Getter
    @Setter
    public static class Product extends BaseEntity {
        private String name;
        private double price;
        private boolean active;
    }

    @Getter
    @Setter
    public static class ProductDto {
        private String name;
        private double price;
        private boolean active;
    }

    @Getter
    @Setter
    public static class ProductDetails extends  BaseEntity {
        private String description;
        private Product product;
        private List<ProductCategory> productCategories;
    }


    @Getter
    @Setter
    public static class ProductDetailsDto{
        private String description;
        private Long productId;
        private List<Long> productCategoriesIds;
    }

    @Getter
    @Setter
    public static class ProductCategory extends BaseEntity {
        private String name;
    }

    @Getter
    @Setter
    public static class ProductCategoryDto{
        private String name;
    }


    public DTOMapperTest() {
        this.dtoMapper = new DTOMapper();
    }

    @Test
    void testGenerateEntityFromClass() {
        ProductDto productDto = new ProductDto();
        productDto.setName("name");
        productDto.setPrice(1.0);
        productDto.setActive(true);
        Product generatedEntity = (Product) this.dtoMapper.DtoMapToEntity(productDto, Product.class);
        // Assert that the non-null property has been copied
        Assertions.assertEquals("name", generatedEntity.getName());
        Assertions.assertEquals(1.0, generatedEntity.getPrice());
        Assertions.assertTrue(generatedEntity.isActive());
    }

    @Test
    void testDtoMapToEntity() {
        ProductDto productDto = new ProductDto();
        productDto.setName("mobile");
        productDto.setActive(false);
        //existed class is Product
        Product product = new Product();
        product.setId(1L);
        product.setName("telephone");
        product.setPrice(1.0);
        product.setActive(true);

        Product generatedEntity = (Product) this.dtoMapper.DtoMapToEntity(productDto, product);
        // Assert that the non-null property has been copied
        Assertions.assertEquals(1L, generatedEntity.getId());
        Assertions.assertEquals("mobile", generatedEntity.getName());
        Assertions.assertEquals(1.0, generatedEntity.getPrice());
        Assertions.assertFalse(generatedEntity.isActive());
    }

    @Test
    public void RelationalEntityDtoTest(){
        ProductDetailsDto productDetailsDto = new ProductDetailsDto();
        productDetailsDto.setDescription("description");
        productDetailsDto.setProductId(100L);

        ProductDetails generatedEntity = (ProductDetails) this.dtoMapper.DtoMapToEntity(productDetailsDto, ProductDetails.class);
        Assertions.assertEquals("description", generatedEntity.getDescription());
        Assertions.assertEquals(100L, generatedEntity.getProduct().getId());
    }

    @Test
    public void MultipleRelationalEntityDtoTest(){
        ProductDetailsDto productDetailsDto = new ProductDetailsDto();
        productDetailsDto.setDescription("description");
        productDetailsDto.setProductId(100L);
        productDetailsDto.setProductCategoriesIds(List.of(1L,2L));

        ProductDetails generatedEntity = (ProductDetails) this.dtoMapper.DtoMapToEntity(productDetailsDto, ProductDetails.class);
        Assertions.assertEquals("description", generatedEntity.getDescription());
        Assertions.assertEquals(100L, generatedEntity.getProduct().getId());
        Assertions.assertEquals(1L, generatedEntity.getProductCategories().get(0).getId());
        Assertions.assertEquals(2L, generatedEntity.getProductCategories().get(1).getId());
    }

}