package com.example.todo.dto.response;

import com.example.todo.domain.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UserResponseDto {

    private String nickname;
    private Long id;

    @Builder
    public UserResponseDto(User user){
        this.id = user.getId();
        this.nickname = user.getNickname();
    }
}
