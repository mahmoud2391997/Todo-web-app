// src/features/todos/KanbanBoard.js
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { addTask, changeTaskState } from "../Redux/todos/actions";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";

const KanbanBoard = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.todos.todos);

  const [isFormOpen, setFormOpen] = useState(false);

  const columns = {
    todo: "Todo",
    doing: "Doing",
    done: "Done",
  };

  // Validation schema for form
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("Title is required"),
    description: Yup.string().required("Description is required"),
    priority: Yup.string().oneOf(
      ["low", "medium", "high"],
      "Select a valid priority"
    ),
    state: Yup.string().oneOf(
      ["todo", "doing", "done"],
      "Select a valid state"
    ),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = (data) => {
    const newTask = {
      ...data,
      id: Date.now().toString(),
    };
    dispatch(addTask(newTask));
    reset();
    setFormOpen(false);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }

    // Dispatch action to update the task's state
    dispatch(changeTaskState(draggableId, destination.droppableId));
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center">Kanban Board</h1>
      <button
        onClick={() => setFormOpen(true)}
        className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
      >
        Add New Task
      </button>

      {isFormOpen && (
        <TaskForm
          closeForm={() => {
            setFormOpen(false);
          }}
        />
      )}

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex justify-between space-x-4 mt-6">
          {Object.entries(columns).map(([columnId, columnTitle]) => (
            <Droppable droppableId={columnId} key={columnId}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="w-1/3 bg-gray-100 p-4 rounded-lg shadow-md"
                >
                  <h3 className="text-lg font-bold mb-4">{columnTitle}</h3>
                  {tasks
                    .filter((task) => task.state === columnId)
                    .map((task, index) => (
                      <Draggable
                        key={task.id}
                        draggableId={task.id}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="bg-white p-4 mb-4 rounded shadow-md"
                          >
                            <TaskCard task={task} />
                          </div>
                        )}
                      </Draggable>
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default KanbanBoard;