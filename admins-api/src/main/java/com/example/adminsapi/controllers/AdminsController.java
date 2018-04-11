package com.example.adminsapi.controllers;

import com.example.adminsapi.models.Admin;
import com.example.adminsapi.repositories.AdminRepository;
import javassist.NotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@RestController
public class AdminsController {

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PasswordEncoder encoder;

    @GetMapping("/")
    public List<Admin> findAllAdmins() {
        return adminRepository.findAll();
    }

    @GetMapping("/username/{username}")
    public List<Admin> findAdminByUserName(@PathVariable String username) {
        return adminRepository.findAdminsWithUsername(username);
    }

    @GetMapping("/checkpassword/{adminId}/{text}")
    public Boolean checkAdminPassword(@PathVariable Long adminId, @PathVariable String text) {
        Admin cand = adminRepository.findOne(adminId);
        String password = cand.getPassword();

        if(encoder.matches(text, password)) {
            return true;
        } else {
            return false;
        }
    }


    @PostMapping("/")
    public Admin createNewAdmin(@RequestBody Admin newAdmin) {
        String plainPass = newAdmin.getPassword();
        newAdmin.setPassword(encoder.encode(plainPass));
        return adminRepository.save(newAdmin);
    }

    @PatchMapping("/{adminId}")
    public Admin updateAdminById(@PathVariable Long adminId, @RequestBody Admin updatedAdmin) throws NotFoundException {
        Admin adminFromDb = adminRepository.findOne(adminId);

        if(adminFromDb == null) {
            throw new NotFoundException("Admin with ID of " + adminId + " was not found!");
        }

        adminFromDb.setUserName(updatedAdmin.getUserName());
        if(adminFromDb.getPassword().equals(updatedAdmin.getPassword())) {
            adminFromDb.setPassword(updatedAdmin.getPassword());
        } else {
            adminFromDb.setPassword(encoder.encode(updatedAdmin.getPassword()));
        }

        return adminRepository.save(adminFromDb);
    }

    @ExceptionHandler
    void handleAdminNotFound(
            NotFoundException exception,
            HttpServletResponse response) throws IOException {

        response.sendError(HttpStatus.NOT_FOUND.value(), exception.getMessage());
    }
}
