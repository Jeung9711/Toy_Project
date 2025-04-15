package com.example.todo.domain;


import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "userId", nullable = false)
    private Long userId;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "status", nullable = false, columnDefinition = "VARCHAR(255) default 'TODO'")
    @Enumerated(EnumType.STRING)
    private Status status;

    @Column(name = "daily", nullable = false, columnDefinition = "VARCHAR(255) default 'NO'")
    @Enumerated(EnumType.STRING)
    private Daily daily;

    private LocalDateTime createdAt;

    @Builder
    public Todo(String content, Long userId, Status status, Daily daily) {
        this.content = content;
        this.userId = userId;
        this.status = status;
        this.daily = daily;
    }

    public void updateStatus(Status status) {
        this.status = status;
    }

    public void updateDaily(Daily daily) {
        this.daily = daily;
    }

    @PrePersist
    public void prePersist() {
        if (this.createdAt == null) this.createdAt = LocalDateTime.now();
    }

}
