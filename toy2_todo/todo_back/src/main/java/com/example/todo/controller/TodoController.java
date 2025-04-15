package com.example.todo.controller;


import com.example.todo.dto.request.TodoRequestDto;
import com.example.todo.dto.request.UpdateTodoRequestDto;
import com.example.todo.service.TodoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/todo")
public class TodoController {

    private final TodoService todoService;

    /**
     * GET--> 모든 정보 불러와서 프론트에서 연습겸 파싱 해보기
     */


    /**
     * @param todoRequestDto
     * @return id number
     * 오늘 할 일 추가
     */
    @PostMapping()
    public ResponseEntity<Long> saveTodo(@RequestBody TodoRequestDto todoRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.saveTodo(todoRequestDto));
    }

    /**
     * 매일 할 일 추가
     *
     * @param todoRequestDto
     * @return
     */
    @PostMapping("/daily")
    public ResponseEntity<Long> saveTodoDaily(@RequestBody TodoRequestDto todoRequestDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(todoService.saveDailyToto(todoRequestDto));
    }

    /**
     * 회원 아이디로 일반 할일 삭제
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deleteTodo(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.deleteById(id));
    }

    /***
     * 할 일 상태 변경 (완료 NNNY,미완료 NNNN)
     * @param id
     * @return
     */
    @PutMapping("/{id}")
    public ResponseEntity<Long> updateTodo(@PathVariable Long id) {
        return ResponseEntity.ok(todoService.updateTodo(id));
    }

    /* health check */
    @GetMapping("/check")
    public String healthCheck() {
        return "health check";
    }


}
