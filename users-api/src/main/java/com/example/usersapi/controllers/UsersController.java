package com.example.usersapi.controllers;

import com.example.usersapi.models.User;
import com.example.usersapi.repositories.UserRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCrypt;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class UsersController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/")
    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{userId}")
    public User findUserById(@PathVariable Long userId) throws NotFoundException{
        User foundUser = userRepository.findOne(userId);

        if (foundUser == null) {
            throw new NotFoundException("User with ID of " + userId + " was not found!");
        }

        return foundUser;
    }

    @GetMapping("/username/{userName}")
    public List<User> findUserByUserName(@PathVariable String userName) {
        return userRepository.findUsersWithUsername(userName);
    }

    @GetMapping("/checkpassword/{userId}/{text}")
    public Boolean checkUserPassword(@PathVariable Long userId, @PathVariable String text) {
        User cand = userRepository.findOne(userId);
        String password = cand.getPassword();

        if(encoder.matches(text, password)) {
            return true;
        } else {
            return false;
        }
    }

    @PostMapping("/")
    public User createNewUser(@RequestBody User newUser) {
        String plainPass = newUser.getPassword();
        newUser.setPassword(encoder.encode(plainPass));
        return userRepository.save(newUser);
    }

    @DeleteMapping("/{userId}")
    public HttpStatus deleteUserById(@PathVariable Long userId) throws EmptyResultDataAccessException {
        userRepository.delete(userId);
        return HttpStatus.OK;
    }

    @PatchMapping("/{userId}")
    public User updateUserById(@PathVariable Long userId, @RequestBody User userRequest) throws NotFoundException{

        User userFromDb = userRepository.findOne(userId);

        if (userFromDb == null) {
            throw new NotFoundException("User with ID of " + userId + " was not found!");
        }

        userFromDb.setUserName(userRequest.getUserName());
        userFromDb.setFirstName(userRequest.getFirstName());
        userFromDb.setLastName(userRequest.getLastName());
        if(userFromDb.getPassword().equals(userRequest.getPassword())) {
            userFromDb.setPassword(userRequest.getPassword());
        } else {
            userFromDb.setPassword(encoder.encode(userRequest.getPassword()));
        }
        userFromDb.setGender(userRequest.getGender());
        userFromDb.setEmail(userRequest.getEmail());
        userFromDb.setBirthday(userRequest.getBirthday());
        userFromDb.setPhoneNumber(userRequest.getPhoneNumber());

        return userRepository.save(userFromDb);
    }

    @ExceptionHandler
    void handleUserNotFound(
            NotFoundException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }

    @ExceptionHandler
    void handleDeleteNotFoundException(
            EmptyResultDataAccessException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value());
    }
}
