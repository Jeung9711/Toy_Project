package com.example.todo.dto.request;

import com.example.todo.domain.Todo;
import com.example.todo.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

    private String email;

    private String nickname;

    private String password;

}
