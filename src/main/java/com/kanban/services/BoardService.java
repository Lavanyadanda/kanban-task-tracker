//package com.kanban.services;
//
//import com.kanban.entity.Board;
//import com.kanban.entity.TaskColumn;
//import com.kanban.repository.BoardRepository;
//import com.kanban.repository.TaskColumnRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.time.LocalDateTime;
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class BoardService {
//
//    private final BoardRepository boardRepository;
//    private final TaskColumnRepository columnRepository;
//
//    @Transactional
//    public Board createDefaultBoard() {
//        Board board = Board.builder()
//                .title("Project Workflow")
//                .description("Default Kanban Workspace")
//                .createdAt(LocalDateTime.now())
//                .build();
//
//        Board savedBoard = boardRepository.save(board);
//
//        TaskColumn todo = TaskColumn.builder().name("To Do").position(0).board(savedBoard).build();
//        TaskColumn inProgress = TaskColumn.builder().name("In Progress").position(1).board(savedBoard).build();
//        TaskColumn done = TaskColumn.builder().name("Done").position(2).board(savedBoard).build();
//
//        columnRepository.saveAll(List.of(todo, inProgress, done));
//        return savedBoard;
//    }
//
//    @Transactional(readOnly = true)
//    public List<Board> getAllBoards() {
//        return boardRepository.findAll();
//    }
//
//    @Transactional(readOnly = true)
//    public Board getBoardById(Long id) {
//        return boardRepository.findById(id)
//                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));
//    }
//}

package com.kanban.services;

import com.kanban.entity.Board;
import com.kanban.entity.TaskColumn;
import com.kanban.repository.BoardRepository;
import com.kanban.repository.TaskColumnRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {

    private final BoardRepository boardRepository;
    private final TaskColumnRepository columnRepository;

    @Transactional
    public Board createDefaultBoard() {
        Board board = Board.builder()
                .title("Project Workflow")
                .description("Default Kanban Workspace")
                .createdAt(LocalDateTime.now())
                .build();

        Board savedBoard = boardRepository.save(board);

        TaskColumn todo = TaskColumn.builder().name("To Do").position(0).board(savedBoard).build();
        TaskColumn inProgress = TaskColumn.builder().name("In Progress").position(1).board(savedBoard).build();
        TaskColumn done = TaskColumn.builder().name("Done").position(2).board(savedBoard).build();

        columnRepository.saveAll(List.of(todo, inProgress, done));
        return savedBoard;
    }

    @Transactional(readOnly = true)
    public List<Board> getAllBoards() {
        return boardRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Board getBoardById(Long id) {
        return boardRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Board not found with id: " + id));
    }
}