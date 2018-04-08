package com.example.appwrapper.repositories;

import com.example.appwrapper.models.Admin;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AdminRepository extends CrudRepository<Admin, Long> {
    List<Admin> findAll();

    @Query("SELECT s FROM Admin s WHERE s.userName=:userName")
    List<Admin> findAdminsWithUsername(@Param("userName") String userName);
}
