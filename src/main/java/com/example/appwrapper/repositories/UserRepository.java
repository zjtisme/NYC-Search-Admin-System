package com.example.appwrapper.repositories;

import com.example.appwrapper.models.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {

}
