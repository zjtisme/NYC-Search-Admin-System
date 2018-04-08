package com.example.appwrapper.features;

import com.example.appwrapper.models.Admin;
import com.example.appwrapper.repositories.AdminRepository;
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
public class AdminsApiFeatureTest {
    @Autowired
    private AdminRepository adminRepository;

    @Before
    public void setUp() {
        adminRepository.deleteAll();
    }

    @After
    public void tearDown() {
        adminRepository.deleteAll();
    }

    @Test
    public void shouldAllowCruForAdmin() throws Exception{
        Admin firstAdmin = new Admin(
                "admin1",
                "123"
        );

        Admin secondAdmin = new Admin(
                "admin2",
                "456"
        );

        Stream.of(firstAdmin, secondAdmin)
                .forEach(user -> {
                    adminRepository.save(user);
                });

        when()
                .get("http://localhost:8080/admins")
                .then()
                .statusCode(is(200))
                .and().body(containsString("admin1"))
                .and().body(containsString("admin2"));

        Admin NotYetInDb = new Admin(
                "new_admin",
                "111"
        );

        given()
                .contentType(JSON)
                .and().body(NotYetInDb)
                .when()
                .post("http://localhost:8080/admins")
                .then()
                .statusCode(is(200))
                .and().body(containsString("new_admin"));

        when()
                .get("http://localhost:8080/admins")
                .then()
                .statusCode(is(200))
                .and().body(containsString("admin1"))
                .and().body(containsString("admin2"))
                .and().body(containsString("new_admin"));

        secondAdmin.setUserName("changed_username");
        given()
                .contentType(JSON)
                .and().body(secondAdmin)
                .when()
                .patch("http://localhost:8080/admins/" + secondAdmin.getId())
                .then()
                .statusCode(is(200))
                .and().body(containsString("changed_username"));
    }
}
