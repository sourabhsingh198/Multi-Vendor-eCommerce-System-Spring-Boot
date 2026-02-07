//package com.zosh.controller;
//
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
//
//import java.util.List;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.web.servlet.MockMvc;
//
//import com.zosh.domain.AccountStatus;
//import com.zosh.model.HomeCategory;
//import com.zosh.model.Seller;
//import com.zosh.service.HomeCategoryService;
//import com.zosh.service.SellerService;
//
//@WebMvcTest(AdminController.class)
//@AutoConfigureMockMvc(addFilters = false)
//class AdminControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private SellerService sellerService;
//
//    @MockBean
//    private HomeCategoryService homeCategoryService;
//
//    @Test
//    void updateSellerStatus_success() throws Exception {
//        Seller seller = new Seller();
//        seller.setId(1L);
//
//        Mockito.when(sellerService.updateSellerAccountStatus(1L, AccountStatus.ACTIVE))
//                .thenReturn(seller);
//
//        mockMvc.perform(patch("/admin/seller/1/status/ACTIVE"))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void getHomeCategory_success() throws Exception {
//        Mockito.when(homeCategoryService.getAllCategories())
//                .thenReturn(List.of(new HomeCategory()));
//
//        mockMvc.perform(get("/admin/home-category"))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void updateHomeCategory_success() throws Exception {
//        HomeCategory category = new HomeCategory();
//
//        Mockito.when(homeCategoryService.updateCategory(Mockito.any(), Mockito.eq(1L)))
//                .thenReturn(category);
//
//        mockMvc.perform(patch("/admin/home-category/1")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("{}"))
//                .andExpect(status().isOk());
//    }
//}
