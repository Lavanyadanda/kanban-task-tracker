//package com.kanban.services;
//
//import com.kanban.dto.CreateTaskRequest;
//import com.kanban.dto.MoveTaskRequest;
//import com.kanban.dto.TaskDto;
//import com.kanban.entity.Task;
//import com.kanban.entity.TaskColumn;
//import com.kanban.repository.TaskColumnRepository;
//import com.kanban.repository.TaskRepository;
//import lombok.RequiredArgsConstructor;
//import org.springframework.stereotype.Service;
//import org.springframework.transaction.annotation.Transactional;
//
//import java.util.List;
//
//@Service
//@RequiredArgsConstructor
//public class TaskService {
//
//    private final TaskRepository taskRepository;
//    private final TaskColumnRepository columnRepository;
//
//    @Transactional
//    public TaskDto createTask(CreateTaskRequest req) {
//        TaskColumn col = columnRepository.findById(req.getColumnId())
//                .orElseThrow(() -> new RuntimeException("Column not found with id: " + req.getColumnId()));
//
//        List<Task> existingTasks = taskRepository.findByColumnIdOrderByPositionAsc(col.getId());
//
//        Task task = Task.builder()
//                .title(req.getTitle())
//                .description(req.getDescription())
//                .priority(req.getPriority())
//                .dueDate(req.getDueDate())
//                .assigneeName(req.getAssigneeName())
//                .position(existingTasks.size())
//                .column(col)
//                .build();
//
//        Task saved = taskRepository.save(task);
//        return mapToDto(saved);
//    }
//
//    @Transactional
//    public void moveTask(Long taskId, MoveTaskRequest req) {
//        Task task = taskRepository.findById(taskId)
//                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
//
//        TaskColumn sourceCol = task.getColumn();
//        TaskColumn targetCol = columnRepository.findById(req.getTargetColumnId())
//                .orElseThrow(() -> new RuntimeException("Target column not found with id: " + req.getTargetColumnId()));
//
//        if (sourceCol.getId().equals(targetCol.getId())) {
//            List<Task> tasks = taskRepository.findByColumnIdOrderByPositionAsc(sourceCol.getId());
//            tasks.remove(task);
//            tasks.add(Math.min(req.getNewPosition(), tasks.size()), task);
//            for (int i = 0; i < tasks.size(); i++) {
//                tasks.get(i).setPosition(i);
//            }
//            taskRepository.saveAll(tasks);
//        } else {
//            List<Task> srcTasks = taskRepository.findByColumnIdOrderByPositionAsc(sourceCol.getId());
//            srcTasks.remove(task);
//            for (int i = 0; i < srcTasks.size(); i++) {
//                srcTasks.get(i).setPosition(i);
//            }
//            taskRepository.saveAll(srcTasks);
//
//            List<Task> destTasks = taskRepository.findByColumnIdOrderByPositionAsc(targetCol.getId());
//            task.setColumn(targetCol);
//            destTasks.add(Math.min(req.getNewPosition(), destTasks.size()), task);
//            for (int i = 0; i < destTasks.size(); i++) {
//                destTasks.get(i).setPosition(i);
//            }
//            taskRepository.saveAll(destTasks);
//        }
//    }
//
//    @Transactional
//    public void deleteTask(Long taskId) {
//        Task task = taskRepository.findById(taskId)
//                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
//        taskRepository.delete(task);
//    }
//
//    private TaskDto mapToDto(Task item) {
//        return TaskDto.builder()
//                .id(item.getId())
//                .title(item.getTitle())
//                .description(item.getDescription())
//                .priority(item.getPriority())
//                .dueDate(item.getDueDate())
//                .position(item.getPosition())
//                .columnId(item.getColumn() != null ? item.getColumn().getId() : null)
//                .assigneeName(item.getAssigneeName())
//                .build();
//    }
//}




package com.kanban.services;

import com.kanban.dto.CreateTaskRequest;
import com.kanban.dto.MoveTaskRequest;
import com.kanban.dto.TaskDto;
import com.kanban.entity.Task;
import com.kanban.entity.TaskColumn;
import com.kanban.repository.TaskColumnRepository;
import com.kanban.repository.TaskRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class TaskService {

    private final TaskRepository taskRepository;
    private final TaskColumnRepository columnRepository;

    @Transactional
    public TaskDto createTask(CreateTaskRequest req) {
        TaskColumn col = columnRepository.findById(req.getColumnId())
                .orElseThrow(() -> new RuntimeException("Column not found with id: " + req.getColumnId()));

        List<Task> existingTasks = taskRepository.findByColumnIdOrderByPositionAsc(col.getId());

        Task task = Task.builder()
                .title(req.getTitle())
                .description(req.getDescription())
                .priority(req.getPriority())
                .dueDate(req.getDueDate())
                .assigneeName(req.getAssigneeName())
                .position(existingTasks.size())
                .column(col)
                .build();

        Task saved = taskRepository.save(task);
        return mapToDto(saved);
    }

    @Transactional
    public void moveTask(Long taskId, MoveTaskRequest req) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

        TaskColumn sourceCol = task.getColumn();
        TaskColumn targetCol = columnRepository.findById(req.getTargetColumnId())
                .orElseThrow(() -> new RuntimeException("Target column not found with id: " + req.getTargetColumnId()));

        if (sourceCol.getId().equals(targetCol.getId())) {
            List<Task> tasks = taskRepository.findByColumnIdOrderByPositionAsc(sourceCol.getId());
            tasks.remove(task);
            tasks.add(Math.min(req.getNewPosition(), tasks.size()), task);
            for (int i = 0; i < tasks.size(); i++) {
                tasks.get(i).setPosition(i);
            }
            taskRepository.saveAll(tasks);
        } else {
            List<Task> srcTasks = taskRepository.findByColumnIdOrderByPositionAsc(sourceCol.getId());
            srcTasks.remove(task);
            for (int i = 0; i < srcTasks.size(); i++) {
                srcTasks.get(i).setPosition(i);
            }
            taskRepository.saveAll(srcTasks);

            List<Task> destTasks = taskRepository.findByColumnIdOrderByPositionAsc(targetCol.getId());
            task.setColumn(targetCol);
            destTasks.add(Math.min(req.getNewPosition(), destTasks.size()), task);
            for (int i = 0; i < destTasks.size(); i++) {
                destTasks.get(i).setPosition(i);
            }
            taskRepository.saveAll(destTasks);
        }
    }
//    @Transactional
//    public TaskDto updateTask(Long taskId, com.kanban.dto.UpdateTaskRequest req) {
//        Task task = taskRepository.findById(taskId)
//                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
//
//        task.setTitle(req.getTitle());
//        task.setDescription(req.getDescription());
//        task.setPriority(req.getPriority());
//        task.setDueDate(req.getDueDate());
//        task.setAssigneeName(req.getAssigneeName());
//
//        Task saved = taskRepository.save(task);
//        return mapToDto(saved);
//    }

    @Transactional
    public TaskDto updateTask(Long taskId, com.kanban.dto.UpdateTaskRequest req) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));

        task.setTitle(req.getTitle());
        task.setDescription(req.getDescription());
        task.setPriority(req.getPriority());
        task.setDueDate(req.getDueDate());
        task.setAssigneeName(req.getAssigneeName());

        Task saved = taskRepository.save(task);
        return mapToDto(saved);
    }

    @Transactional
    public void deleteTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + taskId));
        taskRepository.delete(task);
    }

    private TaskDto mapToDto(Task item) {
        return TaskDto.builder()
                .id(item.getId())
                .title(item.getTitle())
                .description(item.getDescription())
                .priority(item.getPriority())
                .dueDate(item.getDueDate())
                .position(item.getPosition())
                .columnId(item.getColumn() != null ? item.getColumn().getId() : null)
                .assigneeName(item.getAssigneeName())
                .build();
    }
}