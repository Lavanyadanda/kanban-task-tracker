//package com.kanban.config;
//
//import com.kanban.dto.CreateTaskRequest;
//import com.kanban.entity.Board;
//import com.kanban.entity.TaskPriority;
//import com.kanban.repository.BoardRepository;
//import com.kanban.services.BoardService;
//import com.kanban.services.TaskService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.boot.CommandLineRunner;
//import org.springframework.stereotype.Component;
//
//import java.time.LocalDate;
//
//@Component
//@RequiredArgsConstructor
//public class DataInitializer implements CommandLineRunner {
//
//    private final BoardRepository boardRepository;
//    private final BoardService boardService;
//    private final TaskService taskService;
//
//    @Override
//    public void run(String... args) {
//        if (boardRepository.count() == 0) {
//            Board board = boardService.createBoard("Sprint 1 Kanban Board", "Engineering backlog and sprint tasks");
//
//            Long todoColId = board.getColumns().get(0).getId();
//            Long inProgressColId = board.getColumns().get(1).getId();
//
//            CreateTaskRequest task1 = new CreateTaskRequest();
//            task1.setTitle("Setup MySQL Database");
//            task1.setDescription("Configure datasource URL and user credentials");
//            task1.setPriority(TaskPriority.HIGH);
//            task1.setAssigneeName("Alex");
//            task1.setDueDate(LocalDate.now().plusDays(2));
//            task1.setColumnId(todoColId);
//            taskService.createTask(task1);
//
//            CreateTaskRequest task2 = new CreateTaskRequest();
//            task2.setTitle("Develop Drag-and-Drop UI");
//            task2.setDescription("Implement React frontend for task movement");
//            task2.setPriority(TaskPriority.CRITICAL);
//            task2.setAssigneeName("Sarah");
//            task2.setDueDate(LocalDate.now().plusDays(4));
//            task2.setColumnId(inProgressColId);
//            taskService.createTask(task2);
//        }
//    }
//}


package com.kanban.config;

import com.kanban.dto.CreateTaskRequest;
import com.kanban.entity.Board;
import com.kanban.entity.TaskColumn;
import com.kanban.entity.TaskPriority;
import com.kanban.repository.BoardRepository;
import com.kanban.repository.TaskColumnRepository;
import com.kanban.services.BoardService;
import com.kanban.services.TaskService;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.List;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final BoardRepository boardRepository;
    private final TaskColumnRepository columnRepository;
    private final BoardService boardService;
    private final TaskService taskService;

    @Override
    public void run(String... args) {
        if (boardRepository.count() == 0) {
            Board board = boardService.createDefaultBoard();
            List<TaskColumn> columns = columnRepository.findByBoardIdOrderByPositionAsc(board.getId());

            if (!columns.isEmpty()) {
                TaskColumn todoCol = columns.get(0);

                CreateTaskRequest task1 = new CreateTaskRequest();
                task1.setTitle("Setup MySQL Database");
                task1.setDescription("Install and configure kanban_db schema");
                task1.setPriority(TaskPriority.HIGH);
                task1.setAssigneeName("Dev Team");
                task1.setDueDate(LocalDate.now().plusDays(2));
                task1.setColumnId(todoCol.getId());
                taskService.createTask(task1);

                CreateTaskRequest task2 = new CreateTaskRequest();
                task2.setTitle("Implement Drag & Drop");
                task2.setDescription("Connect React Beautiful DnD to patch move endpoint");
                task2.setPriority(TaskPriority.CRITICAL);
                task2.setAssigneeName("Dev Team");
                task2.setDueDate(LocalDate.now().plusDays(4));
                task2.setColumnId(todoCol.getId());
                taskService.createTask(task2);
            }
        }
    }
}