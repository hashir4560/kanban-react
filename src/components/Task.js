import React from "react";
import '../styles/Task.css';
import { Draggable } from "react-beautiful-dnd";

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="task"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.content}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
