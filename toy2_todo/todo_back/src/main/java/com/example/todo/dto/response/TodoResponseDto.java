package com.example.todo.dto.response;

import com.example.todo.domain.Daily;
import com.example.todo.domain.Status;
import com.example.todo.domain.Todo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter

public class TodoResponseDto {
    private Long id;
    private String content;
    private Status status;
    private Daily daily;
    private LocalDateTime createdAt;

    public TodoResponseDto(Todo todo){
        this.id = todo.getId();
        this.content = todo.getContent();
        this.status =todo.getStatus();
        this.daily = todo.getDaily();
        this.createdAt = todo.getCreatedAt();
    }
}
