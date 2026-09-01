//package com.kanban.controller;
//
//import com.kanban.entity.Board;
//import com.kanban.service.BoardService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//import java.util.Map;
//
//@RestController
//@RequestMapping("/api/v1/boards")
//@RequiredArgsConstructor
//@CrossOrigin(origins = "*")
//public class BoardController {
//
//    private final BoardService boardService;
//
//    @GetMapping
//    public ResponseEntity<List<Board>> getAllBoards() {
//        return ResponseEntity.ok(boardService.getAllBoards());
//    }
//
//    @GetMapping("/{id}")
//    public ResponseEntity<Board> getBoardById(@PathVariable Long id) {
//        return ResponseEntity.ok(boardService.getBoardById(id));
//    }
//
//    @PostMapping
//    public ResponseEntity<Board> createBoard(@RequestBody Map<String, String> payload) {
//        String title = payload.get("title");
//        String description = payload.get("description");
//        return ResponseEntity.ok(boardService.createBoard(title, description));
//    }
//}
package com.kanban.controller;

import com.kanban.entity.Board;
import com.kanban.services.BoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/boards")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BoardController {

    private final BoardService boardService;

    @GetMapping
    public ResponseEntity<List<Board>> getAllBoards() {
        return ResponseEntity.ok(boardService.getAllBoards());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Board> getBoardById(@PathVariable Long id) {
        return ResponseEntity.ok(boardService.getBoardById(id));
    }

    @PostMapping
    public ResponseEntity<Board> createDefaultBoard() {
        return ResponseEntity.ok(boardService.createDefaultBoard());
    }
}