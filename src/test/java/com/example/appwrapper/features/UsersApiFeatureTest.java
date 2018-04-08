package com.example.appwrapper.features;

import com.example.appwrapper.models.User;
import com.example.appwrapper.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.stream.Stream;

import static io.restassured.RestAssured.given;
import static io.restassured.RestAssured.when;
import static io.restassured.http.ContentType.JSON;
import static org.hamcrest.Matchers.containsString;
import static org.hamcrest.Matchers.is;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class UsersApiFeatureTest {

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUp() {
        userRepository.deleteAll();
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
    }

    // Tests for CRUD manipulations for User
    @Test
    public void shouldAllowFullCrudForAUser() throws Exception {

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

        Stream.of(firstUser, secondUser)
                .forEach(user -> {
                    userRepository.save(user);
                });

        when()
                .get("http://localhost:8080/users")
                .then()
                .statusCode(is(200))
                .and().body(containsString("zjtisking"))
                .and().body(containsString("tiantian"));

        User userNotYetInDb = new User(
                "new_user",
                "111111",
                "New",
                "User",
                "Female",
                "newuser@gmail.com",
                "222-222-2222",
                "1999-10-01"
        );

        given()
                .contentType(JSON)
                .and().body(userNotYetInDb)
                .when()
                .post("http://localhost:8080/users")
                .then()
                .statusCode(is(200))
                .and().body(containsString("new_user"));

        when()
                .get("http://localhost:8080/users")
                .then()
                .statusCode(is(200))
                .and().body(containsString("zjtisking"))
                .and().body(containsString("tiantian"))
                .and().body(containsString("new_user"));

        when()
                .get("http://localhost:8080/users/" + secondUser.getId())
                .then()
                .statusCode(is(200))
                .and().body(containsString("tiantian"))
                .and().body(containsString("Tian"))
                .and().body(containsString("Li"));


        secondUser.setFirstName("changed_name");
        given()
                .contentType(JSON)
                .and().body(secondUser)
                .when()
                .patch("http://localhost:8080/users/" + secondUser.getId())
                .then()
                .statusCode(is(200))
                .and().body(containsString("changed_name"));

        when()
                .delete("http://localhost:8080/users/" + secondUser.getId())
                .then()
                .statusCode(is(200));

    }

    // End-to-end test for one user api
    @Test
    public void shouldReturnErrorMessageWhenFindingUnexistingUser() throws Exception {

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



        Stream.of(firstUser)
                .forEach(user -> {
                    userRepository.save(user);
                });

        when()
                .get("http://localhost:8080/users/100")
                .then()
                .statusCode(is(404))
                .and().body(containsString("User with ID of 100 was not found!"));

    }

}
