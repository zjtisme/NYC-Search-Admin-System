package com.example.usersapi.controllers;

import com.example.usersapi.models.User;
import com.example.usersapi.repositories.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.hamcrest.CoreMatchers.containsString;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@WebMvcTest(UsersController.class)
public class UsersControllerTest {
    private User newUser;
    private User updatedSecondUser;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper jsonObjectMapper;

    @MockBean
    private UserRepository mockUserRepository;

    @Before
    public void setUp() {
        User firstUser = new User(
                "zjtisking",
                "123456",
                "Jintai",
                "Zhang",
                "Male",
                "jintaizhang2017@gmail.com",
                "224-714-8589",
                "1992-08-27"
        );

        User secondUser = new User(
                "tiantian",
                "654321",
                "Tian",
                "Li",
                "Female",
                "tiantian2017@gmail.com",
                "222-111-4444",
                "1994-10-09"
        );

        List<User> mockUsers =
                Stream.of(firstUser, secondUser).collect(Collectors.toList());

        List<User> mockUsers2 =
                Stream.of(firstUser).collect(Collectors.toList());

        given(mockUserRepository.findAll()).willReturn(mockUsers);
        given(mockUserRepository.findOne(1L)).willReturn(firstUser);
        given(mockUserRepository.findUsersWithUsername("zjtisking")).willReturn(mockUsers2);

        given(mockUserRepository.findOne(4L)).willReturn(null);

        doAnswer(invocation -> {
            throw new EmptyResultDataAccessException("ERROR MESSAGE FROM MOCK!!!", 1234);
        }).when(mockUserRepository).delete(4L);

        newUser = new User(
                "new_user",
                "111111",
                "New",
                "User",
                "Female",
                "newuser@gmail.com",
                "222-222-2222",
                "1999-10-01"
        );
        given(mockUserRepository.save(newUser)).willReturn(newUser);

        updatedSecondUser = new User(
                "updated_user",
                "222222",
                "Updated",
                "User",
                "Male",
                "updateduser@gmail.com",
                "333-333-3333",
                "2002-10-01"
        );
        given(mockUserRepository.save(updatedSecondUser)).willReturn(updatedSecondUser);
    }

    // Tests for findAllUsers
    @Test
    public void findAllUsers_success_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(status().isOk());
    }

    @Test
    public void findAllUsers_success_returnAllUsersAsJSON() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$", hasSize(2)));
    }

    @Test
    public void findAllUsers_success_returnUserNameForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].userName", is("zjtisking")));
    }

    @Test
    public void findAllUsers_success_returnPasswordForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].password", is("123456")));
    }

    @Test
    public void findAllUsers_success_returnGenderForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].gender", is("Male")));
    }

    @Test
    public void findAllUsers_success_returnFirstNameForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].firstName", is("Jintai")));
    }

    @Test
    public void findAllUsers_success_returnLastNameForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].lastName", is("Zhang")));
    }

    @Test
    public void findAllUsers_success_returnEmailForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].email", is("jintaizhang2017@gmail.com")));
    }

    @Test
    public void findAllUsers_success_returnPhoneNumberForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].phoneNumber", is("224-714-8589")));
    }

    @Test
    public void findAllUsers_success_returnBirthdayForEachUser() throws Exception {

        this.mockMvc
                .perform(get("/"))
                .andExpect(jsonPath("$[0].birthday", is("1992-08-27")));
    }


    // Tests for findUserById happy path
    @Test
    public void findUserById_success_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void findUserById_success_returnUserName() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.userName", is("zjtisking")));
    }

    @Test
    public void findUserById_success_returnPassword() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.password", is("123456")));
    }

    @Test
    public void findUserById_success_returnFirstName() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.firstName", is("Jintai")));
    }

    @Test
    public void findUserById_success_returnLastName() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.lastName", is("Zhang")));
    }

    @Test
    public void findUserById_success_returnGender() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.gender", is("Male")));
    }

    @Test
    public void findUserById_success_returnEmail() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.email", is("jintaizhang2017@gmail.com")));
    }

    @Test
    public void findUserById_success_returnPhoneNumber() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.phoneNumber", is("224-714-8589")));
    }

    @Test
    public void findUserById_success_returnBirthday() throws Exception {

        this.mockMvc
                .perform(get("/1"))
                .andExpect(jsonPath("$.birthday", is("1992-08-27")));
    }

    // Tests for customized findUserByName
    @Test
    public void findUserByName_success_returnsStatusOK() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(status().isOk());
    }

    @Test
    public void findUserByName_success_returnUserName() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(jsonPath("$[0].userName", is("zjtisking")));
    }

    @Test
    public void findUserByName_success_returnPassword() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(jsonPath("$[0].password", is("123456")));
    }

    @Test
    public void findUserByName_success_returnFirstName() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(jsonPath("$[0].firstName", is("Jintai")));
    }

    @Test
    public void findUserByName_success_returnLastName() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(jsonPath("$[0].lastName", is("Zhang")));
    }

    @Test
    public void findUserByName_success_returnGender() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(jsonPath("$[0].gender", is("Male")));
    }

    @Test
    public void findUserByName_success_returnEmail() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(jsonPath("$[0].email", is("jintaizhang2017@gmail.com")));
    }

    @Test
    public void findUserByName_success_returnPhoneNumber() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(jsonPath("$[0].phoneNumber", is("224-714-8589")));
    }

    @Test
    public void findUserByName_success_returnBirthday() throws Exception {

        this.mockMvc
                .perform(get("/username/zjtisking"))
                .andExpect(jsonPath("$[0].birthday", is("1992-08-27")));
    }

    // Tests for findUserById unhappy path
    @Test
    public void findUserById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(get("/4"))
                .andExpect(status().isNotFound());
    }

    @Test
    public void findUserById_failure_userNotFoundReturnsNotFoundErrorMessage() throws Exception {

        this.mockMvc
                .perform(get("/4"))
                .andExpect(status().reason(containsString("User with ID of 4 was not found!")));
    }

    // Tests for deleteUserById happy path
    @Test
    public void deleteUserById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(delete("/1"))
                .andExpect(status().isOk());
    }

    @Test
    public void deleteUserById_success_deletesViaRepository() throws Exception {

        this.mockMvc.perform(delete("/1"));

        verify(mockUserRepository, times(1)).delete(1L);
    }


    // Tests for deleteUserById unhappy path
    @Test
    public void deleteUserById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(delete("/4"))
                .andExpect(status().isNotFound());
    }

    // Tests for createUser
    @Test
    public void createUser_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(status().isOk());
    }

    @Test
    public void createUser_success_returnsUserName() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(jsonPath("$.userName", is("new_user")));
    }

    @Test
    public void createUser_success_returnsPassword() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(jsonPath("$.password", is("111111")));
    }

    @Test
    public void createUser_success_returnsFirstName() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(jsonPath("$.firstName", is("New")));
    }

    @Test
    public void createUser_success_returnsLastName() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(jsonPath("$.lastName", is("User")));
    }

    @Test
    public void createUser_success_returnsGender() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(jsonPath("$.gender", is("Female")));
    }

    @Test
    public void createUser_success_returnsEmail() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(jsonPath("$.email", is("newuser@gmail.com")));
    }

    @Test
    public void createUser_success_returnsPhoneNumber() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(jsonPath("$.phoneNumber", is("222-222-2222")));
    }

    @Test
    public void createUser_success_returnsBirthday() throws Exception {

        this.mockMvc
                .perform(
                        post("/")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(newUser))
                )
                .andExpect(jsonPath("$.birthday", is("1999-10-01")));
    }

    // Tests for updateUserById happy path
    @Test
    public void updateUserById_success_returnsStatusOk() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(status().isOk());
    }

    @Test
    public void updatedUserById_success_returnsUserName() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(jsonPath("$.userName", is("updated_user")));
    }

    @Test
    public void updatedUserById_success_returnsPassword() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(jsonPath("$.password", is("222222")));
    }

    @Test
    public void updatedUserById_success_returnsFirstName() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(jsonPath("$.firstName", is("Updated")));
    }

    @Test
    public void updatedUserById_success_returnsLastName() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(jsonPath("$.lastName", is("User")));
    }

    @Test
    public void updatedUserById_success_returnsGender() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(jsonPath("$.gender", is("Male")));
    }

    @Test
    public void updatedUserById_success_returnsEmail() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(jsonPath("$.email", is("updateduser@gmail.com")));
    }

    @Test
    public void updatedUserById_success_returnsPhoneNumber() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(jsonPath("$.phoneNumber", is("333-333-3333")));
    }

    @Test
    public void updatedUserById_success_returnsBirthday() throws Exception {

        this.mockMvc
                .perform(
                        patch("/1")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(jsonPath("$.birthday", is("2002-10-01")));
    }

    // Tests for updateUserById unhappy path
    @Test
    public void updateUserById_failure_userNotFoundReturns404() throws Exception {

        this.mockMvc
                .perform(
                        patch("/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(status().isNotFound());
    }

    @Test
    public void updateUserById_failure_userNotFoundReturnsNotFoundErrorMessage() throws Exception {

        this.mockMvc
                .perform(
                        patch("/4")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(jsonObjectMapper.writeValueAsString(updatedSecondUser))
                )
                .andExpect(status().reason(containsString("User with ID of 4 was not found!")));
    }

}
