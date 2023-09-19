import React from "react";
import '../styles/Column.css';
import Task from "./Task";
import { Droppable } from "react-beautiful-dnd";

const Column = ({ column, tasks }) => {

  return (
    <div className="column">
      <h2 className="column-title">{column.title}</h2>
      <Droppable droppableId={column.title.toLowerCase()}>
        {(provided) => (
          <div
            className="task-list"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
