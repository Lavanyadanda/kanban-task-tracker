package com.kanban.dto;

import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class MoveTaskRequest {
    @NotNull(message = "Target column ID is required")
    private Long targetColumnId;

    @NotNull(message = "Target position is required")
    private Integer newPosition;
}