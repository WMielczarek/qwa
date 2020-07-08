package com.anonyep.qwa.repository;

import java.util.Optional;

import com.anonyep.qwa.model.Role;
import com.anonyep.qwa.model.RoleName;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;



@Repository
public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByName(RoleName roleName);
}
