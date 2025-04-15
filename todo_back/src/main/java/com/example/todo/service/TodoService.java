package com.example.todo.service;

import com.example.todo.domain.Daily;
import com.example.todo.domain.Status;
import com.example.todo.domain.Todo;
import com.example.todo.dto.request.TodoRequestDto;
import com.example.todo.dto.request.UpdateTodoRequestDto;
import com.example.todo.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    /* user id 기반으로 오늘 할 일 저장 */
    public Long saveTodo(TodoRequestDto todoRequestDto) {
        Todo todo = Todo.builder()
                .userId(todoRequestDto.getUserId())
                .content(todoRequestDto.getContent())
                .status(Status.TODO)
                .daily(Daily.NO)
                .build();
        todoRepository.save(todo);
        return (todo.getId());
    }

    public Long saveDailyToto(TodoRequestDto todoRequestDto) {
        Todo request = Todo.builder()
                .content(todoRequestDto.getContent())
                .daily(Daily.YES)
                .status(Status.TODO)
                .userId(todoRequestDto.getUserId())
                .build();

        todoRepository.save(request);

        return request.getId();

    }

    public Long deleteById(Long id) {
        todoRepository.deleteById(id);
        return id;
    }

    public Long updateTodo(Long id) {
        Todo todo = todoRepository.findById(id).orElseThrow(
                () -> new IllegalArgumentException("Not Found : " + id)
        );
        todo.updateStatus(todo.getStatus()==Status.TODO?Status.DONE:Status.TODO);

        return todo.getId();
    }
}
