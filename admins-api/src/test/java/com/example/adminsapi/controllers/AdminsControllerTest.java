package com.example.adminsapi.controllers;

import com.example.adminsapi.models.Admin;
import com.example.adminsapi.repositories.AdminRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(AdminsController.class)
public class AdminsControllerTest {
    private Admin newAdmin;
    private Admin updatedSecondAdmin;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper jsonObjectMapper;

    @MockBean
    private AdminRepository mockAdminRepository;

    @MockBean
    private PasswordEncoder encoder;

    @Before
    public void setUp() {
        Admin firstAdmin = new Admin(
          "admin1",
          "123"
        );

        Admin secondAdmin = new Admin(
          "admin2",
          "456"
        );

        List<Admin> mockAdmins =
                Stream.of(firstAdmin, secondAdmin).collect(Collectors.toList());

        List<Admin> mockAdmins2 =
                Stream.of(firstAdmin).collect(Collectors.toList());

        given(mockAdminRepository.findAll()).willReturn(mockAdmins);
        given(mockAdminRepository.findAdminsWithUsername("admin1")).willReturn(mockAdmins2);
        given(mockAdminRepository.findOne(1L)).willReturn(firstAdmin);
        given(mockAdminRepository.findOne(4L)).willReturn(null);

        newAdmin = new Admin(
          "new_admin",
          "111"
        );

        given(encoder.encode(newAdmin.getPassword())).willReturn("222");
        Admin encAdmin = new Admin(
          "new_admin",
          "222"
        );
        given(mockAdminRepository.save(encAdmin)).willReturn(encAdmin);

        updatedSecondAdmin = new Admin(
          "updated_admin",
          "123"
        );

        given(mockAdminRepository.save(updatedSecondAdmin)).willReturn(updatedSecondAdmin);
    }

    @Test
    public void findAllAdmins_success_returnsStatusOK() throws Exception {
        this.mockMvc
                .perform(get("/"))
                .andExpect(status().isOk());
    }

    @Test
    public void findAllAdmins_success_returnAllUsersAsJSON() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void findAllAdmins_success_returnUserNameForEachAdmin() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].userName", is("admin1")));
    }

    @Test
    public void findAllAdmins_success_returnPasswordForEachAdmin() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].password", is("123")));
    }

    @Test
    public void findAdminByName_success_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/username/admin1"))
                .andExpect(status().isOk());
    }

    @Test
    public void findAdminByName_success_returnUserName() throws Exception {

        this.mockMvc
                .perform(get("/username/admin1"))
                .andExpect(jsonPath("$[0].userName", is("admin1")));
    }

    @Test
    public void findAdminByName_success_returnPassword() throws Exception {

        this.mockMvc
                .perform(get("/username/admin1"))
                .andExpect(jsonPath("$[0].password", is("123")));
    }

    @Test
    public void createAdmin_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newAdmin))
                )
                .andExpect(status().isOk());
    }

    @Test
    public void createAdmin_success_returnsUserName() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newAdmin))
                )
                .andExpect(jsonPath("$.userName", is("new_admin")));
    }

    @Test
    public void createAdmin_success_returnsPassword() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newAdmin))
                )
                .andExpect(jsonPath("$.password", is("222")));
    }

    @Test
    public void updateAdminById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondAdmin))
                )
                .andExpect(status().isOk());
    }

    @Test
    public void updateAdminById_success_returnsUserName() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondAdmin))
                )
                .andExpect(jsonPath("$.userName", is("updated_admin")));
    }

    @Test
    public void updateAdminById_success_returnsPassword() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondAdmin))
                )
                .andExpect(jsonPath("$.password", is("123")));
    }

    @Test
    public void updateAdminById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(
                        patch("/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondAdmin))
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void updateAdminById_failure_userNotFoundReturnsNotFoundErrorMessage() throws Exception {

        this.mockMvc
                .perform(
                        patch("/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondAdmin))
                )
                .andExpect(status().reason(containsString("Admin with ID of 4 was not found!")));
    }

}
