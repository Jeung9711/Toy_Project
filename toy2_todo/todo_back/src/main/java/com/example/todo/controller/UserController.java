package com.example.todo.controller;

import com.example.todo.dto.request.UserRequestDto;
import com.example.todo.dto.response.UserResponseDto;
import com.example.todo.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    /***
     * 회원정보로 회원가입
     * @param userRequestDto
     * @return
     */
    @PostMapping
    public ResponseEntity<String> saveUser(@RequestBody UserRequestDto userRequestDto) {

        return ResponseEntity.ok().body(userService.save(userRequestDto));
    }

    /**
     * 로그인 정보로 로그인
     *
     * @param userRequestDto
     * @return
     */
    @GetMapping
    public ResponseEntity<UserResponseDto> loginUser(@RequestBody UserRequestDto userRequestDto) {
        UserResponseDto response = userService.login(userRequestDto);

        if (response == null) return ResponseEntity.badRequest().body(null);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(response);
    }
}
