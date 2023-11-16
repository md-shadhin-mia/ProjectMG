package com.example.projectmg.authentication;

import com.example.projectmg.core.BaseEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Entity
@Data
@Table(name = "users", indexes = {
    @Index(name = "idx_username", columnList = "username", unique = true)
})
public class User extends BaseEntity {
    @Column(unique = true, nullable = false)
    String username;
    private String firstName , lastName;
    @JsonIgnore
    private String password;
}
