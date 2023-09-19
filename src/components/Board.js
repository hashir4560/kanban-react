// Board.jS
 
import '../styles/Board.css';
import React, { useState } from "react";
import Column from "./Column";
import TaskForm from "./TaskForm";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
<Droppable droppableId="Backlog"/>
const initialColumns = {
  backlog: {
    title: "Backlog",
    taskIds: [],
  },
  todo: {
    title: "To Do",
    taskIds: [],
  },
  inProgress: {
    title: "In Progress",
    taskIds: [],
  },
  done: {
    title: "Done",
    taskIds: [],
  },
};


const initialTasks = {
  "task-1": { id: "task-1", content: "Task 1" },
  "task-2": { id: "task-2", content: "Task 2" },
  // Add more tasks as needed
};

const Board = () => {
  const [columns, setColumns] = useState(initialColumns);
  const [tasks, setTasks] = useState(initialTasks);

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const startColumn = columns[source.droppableId];
    const endColumn = columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = [...startColumn.taskIds];
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      setColumns({
        ...columns,
        [newColumn.title.toLowerCase()]: newColumn,
      });
    } else {
      const startTaskIds = [...startColumn.taskIds];
      startTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startTaskIds,
      };

      const endTaskIds = [...endColumn.taskIds];
      endTaskIds.splice(destination.index, 0, draggableId);
      const newEndColumn = {
        ...endColumn,
        taskIds: endTaskIds,
      };

      setColumns({
        ...columns,
        [newStartColumn.title.toLowerCase()]: newStartColumn,
        [newEndColumn.title.toLowerCase()]: newEndColumn,
      });
    }
  };

  const addTask = (content) => {
    const newTaskId = `task-${Object.keys(tasks).length + 1}`;
    const newTask = { id: newTaskId, content };

    setTasks({
      ...tasks,
      [newTaskId]: newTask,
    });

    const newBacklog = {
      ...columns.backlog,
      taskIds: [...columns.backlog.taskIds, newTaskId],
    };

    setColumns({
      ...columns,
      backlog: newBacklog,
    });
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="board">
        {Object.keys(columns).map((columnId) => {
          const column = columns[columnId];
          const columnTasks = column.taskIds.map((taskId) => tasks[taskId]);

          return (
            <Column
              key={column.title}
              column={column}
              tasks={columnTasks}
            />
          );
        })}
        <TaskForm addTask={addTask} />
      </div>
    </DragDropContext>
  
  );
};

export default Board;
