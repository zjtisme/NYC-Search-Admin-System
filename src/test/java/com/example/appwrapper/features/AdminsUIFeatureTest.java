package com.example.appwrapper.features;

import com.example.appwrapper.models.Admin;
import com.example.appwrapper.models.User;
import com.example.appwrapper.repositories.AdminRepository;
import com.example.appwrapper.repositories.UserRepository;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static com.codeborne.selenide.CollectionCondition.size;
import static com.codeborne.selenide.Condition.*;
import static com.codeborne.selenide.Selenide.*;
import static com.codeborne.selenide.WebDriverRunner.getWebDriver;


@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.DEFINED_PORT)
public class AdminsUIFeatureTest {
    private User firstUser;
    private User secondUser;
    private Long firstUserId;
    private Long secondUserId;
    private Admin admin;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Before
    public void setUp() {
        userRepository.deleteAll();
        adminRepository.deleteAll();
        firstUser = new User(
                "zjtisking",
                "123456",
                "Jintai",
                "Zhang",
                "Male",
                "jintaizhang2017@gmail.com",
                "224-714-8589",
                "1992-08-27"
        );
        firstUser = userRepository.save(firstUser);
        firstUserId = firstUser.getId();

        secondUser = new User(
                "tiantian",
                "654321",
                "Tian",
                "Li",
                "Female",
                "tiantian2017@gmail.com",
                "222-111-4444",
                "1994-10-09"
        );
        secondUser = userRepository.save(secondUser);
        secondUserId = secondUser.getId();

        admin = new Admin(
                "admin",
                "admin"
        );
        admin = adminRepository.save(admin);
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
        adminRepository.deleteAll();
    }

    @Test
    public void shouldAllowFullCrudManagementForUsers() throws Exception {
        System.setProperty("selenide.browser", "Chrome");
//        System.setProperty("selenide.headless", "true");
        System.setProperty("selenide.timeout", "15000");

        open("http://localhost:3000");

        $("#signup-button").should(appear);
        $("#signup-button").click();
        $("#signup-page").should(appear);

        $("#admin-signup-change-button").click();
        $("#admin-signup-confirm-button").should(appear);

        $("#signup-username").sendKeys("new admin");
        $("#signup-password1").sendKeys("123");
        $("#signup-password2").sendKeys("123");

        $("#admin-signup-confirm-button").click();

        $("#admin-page").should(appear);
        $("#private-welcome-text").shouldHave(text("Welcome Admin new admin!"));

        $("#configure-button").click();
        $("#configure-page").should(appear);

        $("#configure-username").clear();
        $("#configure-username").sendKeys("updated admin");
        $("#configure-confirm-button").click();

        $("#private-welcome-text").shouldHave(text("Welcome Admin updated admin!"));

        $("#logout-button").click();

        $("#home-page").should(appear);

        $("#login-button").click();
        $("#login-page").should(appear);

        $("#admin-login-change-button").click();
        $("#admin-login-confirm-button").should(appear);

        $("#login-username").sendKeys("updated admin");
        $("#login-password").sendKeys("123");
        $("#admin-login-confirm-button").click();

        $("#admin-page").should(appear);
        $("#private-welcome-text").shouldHave(text("Welcome Admin updated admin!"));

        $$("[data-users-display]").shouldHave(size(2));
        $("#user-"+firstUserId+"-username").shouldHave(value("zjtisking"));
//        $("#user-"+firstUserId+"-password").shouldHave(value("123456"));
        $("#user-"+secondUserId+"-username").shouldHave(value("tiantian"));
//        $("#user-"+secondUserId+"-password").shouldHave(value("654321"));

        $("#adduser-button").should(appear);
        $("#adduser-button").click();

        $("#adduser-page").should(appear);
        $("#adduser-username").sendKeys("new user");
        $("#adduser-password").sendKeys("123");
        $("#adduser-firstname").sendKeys("new");
        $("#adduser-lastname").sendKeys("user");
        $("#adduser-gender").selectOption(1);
        $("#adduser-email").sendKeys("newuser@gmail.com");
        $("#adduser-phonenumber").sendKeys("321-654-0987");
        $("#adduser-birthday").sendKeys("01-01-2000");
        $("#adduser-confirm-button").click();

        $("#adduser-page").shouldNot(appear);
        $$("[data-users-display]").shouldHave(size(3));

        $("#user-"+firstUserId+"-modifyButton").click();
        $("#user-"+firstUserId+"-username").clear();
        $("#user-"+firstUserId+"-username").sendKeys("updated user");
        $("#user-"+firstUserId+"-confirmButton").click();

        $$("[data-users-display]").shouldHave(size(3));
        $("#user-"+firstUserId+"-username").shouldHave(value("updated user"));

        $("#user-"+firstUserId+"-deleteButton").click();
        getWebDriver().switchTo().alert().accept();

        $$("[data-users-display]").shouldHave(size(2));

        $("#admin-search-bar").should(appear);
        $("#admin-search-bar").sendKeys("n");
        $$("[data-users-display]").shouldHave(size(2));

        $("#admin-search-bar").clear();
        $("#admin-search-bar").sendKeys("new");
        $$("[data-users-display]").shouldHave(size(1));

        $("#logout-button").click();
        $("#home-page").should(appear);
    }

}
