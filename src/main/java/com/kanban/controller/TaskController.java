//package com.kanban.controller;
//
//import com.kanban.dto.CreateTaskRequest;
//import com.kanban.dto.MoveTaskRequest;
//import com.kanban.dto.TaskDto;
//import com.kanban.services.TaskService;
//import jakarta.validation.Valid;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//@RestController
//@RequestMapping("/api/v1/tasks")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
//public class TaskController {
//
//    private final TaskService taskService;
//
//    @PostMapping
//    public ResponseEntity<TaskDto> createTask(@Valid @RequestBody CreateTaskRequest request) {
//        return ResponseEntity.ok(taskService.createTask(request));
//    }
//
//    @PatchMapping("/{id}/move")
//    public ResponseEntity<TaskDto> moveTask(@PathVariable Long id, @Valid @RequestBody MoveTaskRequest request) {
//        return ResponseEntity.ok(taskService.moveTask(id, request));
//    }
//
//    @DeleteMapping("/{id}")
//    public ResponseEntity<Void> deleteTask(@PathVariable Long id) {
//        taskService.deleteTask(id);
//        return ResponseEntity.noContent().build();
//    }
//}
/*
package com.kanban.controller;

import com.kanban.dto.CreateTaskRequest;
import com.kanban.dto.MoveTaskRequest;
import com.kanban.dto.TaskDto;
import com.kanban.services.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> create(@Valid @RequestBody CreateTaskRequest req) {
        return ResponseEntity.ok(taskService.createTask(req));
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<Void> move(@PathVariable Long id, @Valid @RequestBody MoveTaskRequest req) {
        taskService.moveTask(id, req);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}*/


/*
package com.kanban.controller;

import com.kanban.dto.CreateTaskRequest;
import com.kanban.dto.MoveTaskRequest;
import com.kanban.dto.TaskDto;
import com.kanban.services.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> create(@Valid @RequestBody CreateTaskRequest req) {
        return ResponseEntity.ok(taskService.createTask(req));
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<Void> move(@PathVariable Long id, @Valid @RequestBody MoveTaskRequest req) {
        taskService.moveTask(id, req);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
//    @PutMapping("/{id}")
//    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @Valid @RequestBody com.kanban.dto.UpdateTaskRequest req) {
//        return ResponseEntity.ok(taskService.updateTask(id, req));
//    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable Long id, @Valid @RequestBody CreateTaskRequest req) {
        return ResponseEntity.ok(taskService.updateTask(id, req));
    }

}*/



package com.kanban.controller;

import com.kanban.dto.CreateTaskRequest;
import com.kanban.dto.MoveTaskRequest;
import com.kanban.dto.TaskDto;
import com.kanban.dto.UpdateTaskRequest;
import com.kanban.services.TaskService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/tasks")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class TaskController {

    private final TaskService taskService;

    @PostMapping
    public ResponseEntity<TaskDto> create(@Valid @RequestBody CreateTaskRequest req) {
        return ResponseEntity.ok(taskService.createTask(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TaskDto> update(@PathVariable Long id, @Valid @RequestBody UpdateTaskRequest req) {
        return ResponseEntity.ok(taskService.updateTask(id, req));
    }

    @PatchMapping("/{id}/move")
    public ResponseEntity<Void> move(@PathVariable Long id, @Valid @RequestBody MoveTaskRequest req) {
        taskService.moveTask(id, req);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        taskService.deleteTask(id);
        return ResponseEntity.noContent().build();
    }
}