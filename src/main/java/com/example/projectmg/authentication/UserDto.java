package com.example.projectmg.authentication;

import com.example.projectmg.core.BaseDto;
import lombok.Data;
import lombok.EqualsAndHashCode;

@EqualsAndHashCode(callSuper = true)
@Data
public class UserDto extends BaseDto {
    private String username;
    private String firstName , lastName;
    private String password;
}
