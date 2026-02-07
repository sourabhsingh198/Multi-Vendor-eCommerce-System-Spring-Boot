//package com.zosh.controller;
//
//import org.junit.jupiter.api.Test;
//import org.mockito.Mockito;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.boot.test.mock.mockito.MockBean;
//import org.springframework.test.web.servlet.MockMvc;
//
//import com.zosh.response.AuthResponse;
//import com.zosh.service.AuthService;
//
//@WebMvcTest(AuthController.class)
//@AutoConfigureMockMvc(addFilters = false)
//class AuthControllerTest {
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @MockBean
//    private AuthService authService;
//
//    @Test
//    void signup_success() throws Exception {
//        Mockito.when(authService.createUser(Mockito.any()))
//                .thenReturn("jwt-token");
//
//        mockMvc.perform(post("/auth/signup")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("{}"))
//                .andExpect(status().isOk());
//    }
//
//    @Test
//    void signin_success() throws Exception {
//        Mockito.when(authService.signin(Mockito.any()))
//                .thenReturn(new AuthResponse());
//
//        mockMvc.perform(post("/auth/signin")
//                .contentType(MediaType.APPLICATION_JSON)
//                .content("{}"))
//                .andExpect(status().isOk());
//    }
//}
