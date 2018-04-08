package com.example.adminsapi.repositories;

import com.example.adminsapi.models.Admin;
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
public class AdminRepositoryTest {

    @Autowired
    private TestEntityManager entityManager;

    @Autowired
    private AdminRepository adminRepository;

    @Before
    public void setUp() {
        adminRepository.deleteAll();
        Admin firstAdmin = new Admin(
                "admin1",
                "123"
        );

        Admin secondAdmin = new Admin(
                "admin2",
                "456"
        );

        entityManager.persist(firstAdmin);
        entityManager.persist(secondAdmin);
        entityManager.flush();
    }

    @After
    public void tearDown() {
        adminRepository.deleteAll();
    }

    @Test
    public void findAll_returnsAllAdmins() {
        List<Admin> adminsFromDb = adminRepository.findAll();

        assertThat(adminsFromDb.size(), is(2));
    }

    @Test
    public void findAll_returnsUserName() {
        List<Admin> usersFromDb = adminRepository.findAll();
        String secondAdminsUserName = usersFromDb.get(1).getUserName();

        assertThat(secondAdminsUserName, is("admin2"));
    }

    @Test
    public void findAll_returnsPassword() {
        List<Admin> usersFromDb = adminRepository.findAll();
        String secondAdminsPassword = usersFromDb.get(1).getPassword();

        assertThat(secondAdminsPassword, is("456"));
    }

    @Test
    public void findAdminsWithUsername_returnsAllAdmins() {
        List<Admin> usersFromDb = adminRepository.findAdminsWithUsername("admin2");

        assertThat(usersFromDb.size(), is(1));
    }

    @Test
    public void findAdminsWithUsername_returnsUserName() {
        List<Admin> usersFromDb = adminRepository.findAdminsWithUsername("admin2");
        String secondAdminsUserName = usersFromDb.get(0).getUserName();

        assertThat(secondAdminsUserName, is("admin2"));
    }

    @Test
    public void findAdminsWithUsername_returnsPassword() {
        List<Admin> usersFromDb = adminRepository.findAdminsWithUsername("admin2");
        String secondAdminsPassword = usersFromDb.get(0).getPassword();

        assertThat(secondAdminsPassword, is("456"));
    }

}
