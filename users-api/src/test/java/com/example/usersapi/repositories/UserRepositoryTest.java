package com.example.usersapi.repositories;

import com.example.usersapi.models.User;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.autoconfigure.orm.jpa.TestEntityManager;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.hamcrest.core.Is.is;
import static org.junit.Assert.assertThat;

@RunWith(SpringRunner.class)
@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class UserRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private UserRepository userRepository;

    @Before
    public void setUp() {
        userRepository.deleteAll();
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

        entityManager.persist(firstUser);
        entityManager.persist(secondUser);
        entityManager.flush();
    }

    @After
    public void tearDown() {
        userRepository.deleteAll();
    }

    // Tests for findAll method
    @Test
    public void findAll_returnsAllUsers() {
        List<User> usersFromDb = userRepository.findAll();

        assertThat(usersFromDb.size(), is(2));
    }

    @Test
    public void findAll_returnsUserName() {
        List<User> usersFromDb = userRepository.findAll();
        String secondUsersUserName = usersFromDb.get(1).getUserName();

        assertThat(secondUsersUserName, is("tiantian"));
    }

    @Test
    public void findAll_returnsFirstName() {
        List<User> usersFromDb = userRepository.findAll();
        String secondUsersFirstName = usersFromDb.get(1).getFirstName();

        assertThat(secondUsersFirstName, is("Tian"));
    }

    @Test
    public void findAll_returnsLastName() {
        List<User> usersFromDb = userRepository.findAll();
        String secondUsersLastName = usersFromDb.get(1).getLastName();

        assertThat(secondUsersLastName, is("Li"));
    }

    @Test
    public void findAll_returnsPassword() {
        List<User> usersFromDb = userRepository.findAll();
        String secondUsersPassword = usersFromDb.get(1).getPassword();

        assertThat(secondUsersPassword, is("654321"));
    }

    @Test
    public void findAll_returnsGender() {
        List<User> usersFromDb = userRepository.findAll();
        String secondUsersGender = usersFromDb.get(1).getGender();

        assertThat(secondUsersGender, is("Female"));
    }

    @Test
    public void findAll_returnsEmail() {
        List<User> usersFromDb = userRepository.findAll();
        String secondUsersEmail = usersFromDb.get(1).getEmail();

        assertThat(secondUsersEmail, is("tiantian2017@gmail.com"));
    }

    @Test
    public void findAll_returnsPhoneNumber() {
        List<User> usersFromDb = userRepository.findAll();
        String secondUsersPhoneNumber = usersFromDb.get(1).getPhoneNumber();

        assertThat(secondUsersPhoneNumber, is("222-111-4444"));
    }

    @Test
    public void findAll_returnsBirthday() {
        List<User> usersFromDb = userRepository.findAll();
        String secondUsersBirthday = usersFromDb.get(1).getBirthday();

        assertThat(secondUsersBirthday, is("1994-10-09"));
    }

    // Tests for findUsersWithUsername method
    @Test
    public void findUsersWithUsername_returnsAllUsers() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");

        assertThat(usersFromDb.size(), is(1));
    }

    @Test
    public void findUsersWithUsername_returnsUserName() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");
        String secondUsersUserName = usersFromDb.get(0).getUserName();

        assertThat(secondUsersUserName, is("tiantian"));
    }

    @Test
    public void findUsersWithUsername_returnsFirstName() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");
        String secondUsersFirstName = usersFromDb.get(0).getFirstName();

        assertThat(secondUsersFirstName, is("Tian"));
    }

    @Test
    public void findUsersWithUsername_returnsLastName() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");
        String secondUsersLastName = usersFromDb.get(0).getLastName();

        assertThat(secondUsersLastName, is("Li"));
    }

    @Test
    public void findUsersWithUsername_returnsPassword() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");
        String secondUsersPassword = usersFromDb.get(0).getPassword();

        assertThat(secondUsersPassword, is("654321"));
    }

    @Test
    public void findUsersWithUsername_returnsGender() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");
        String secondUsersGender = usersFromDb.get(0).getGender();

        assertThat(secondUsersGender, is("Female"));
    }

    @Test
    public void findUsersWithUsername_returnsEmail() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");
        String secondUsersEmail = usersFromDb.get(0).getEmail();

        assertThat(secondUsersEmail, is("tiantian2017@gmail.com"));
    }

    @Test
    public void findUsersWithUsername_returnsPhoneNumber() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");
        String secondUsersPhoneNumber = usersFromDb.get(0).getPhoneNumber();

        assertThat(secondUsersPhoneNumber, is("222-111-4444"));
    }

    @Test
    public void findUsersWithUsername_returnsBirthday() {
        List<User> usersFromDb = userRepository.findUsersWithUsername("tiantian");
        String secondUsersBirthday = usersFromDb.get(0).getBirthday();

        assertThat(secondUsersBirthday, is("1994-10-09"));
    }


}
