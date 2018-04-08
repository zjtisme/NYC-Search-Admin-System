package com.example.usersapi.repositories;

import com.example.usersapi.models.User;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findAll();

    // Create a findUserWithUsername function in order to do user login authentication
    @Query("SELECT s FROM User s WHERE s.userName=:userName")
    List<User> findUsersWithUsername(@Param("userName") String userName);
}
