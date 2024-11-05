// src/features/todos/KanbanBoard.js
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import {
  createOwnedTask,
  fetchOwnedTasks,
  moveTask,
  changeOwnedTasksState,
  filteredTasksSelector,
} from "../Redux/tasks/ownedTaskSlice";
import {
  searchFilteredTasksSelector,
  fetchAssignedTasks,
  
  moveAssignedTask,
} from "../Redux/tasks/assignedTaskSlice";
import TaskFilter from "../components/TaskFilter";
import NavBar from "../components/Navbar";

const KanbanBoard = ({ type }) => {
  const dispatch = useDispatch();
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [formType, setFormType] = useState("Add");
  const [isFormOpen, setFormOpen] = useState(false);
  

  
  const { items,filteredTasks, status, error,searchTerm,priority } = useSelector((state) =>
    type === 'owned' ? state.ownedTasks : state.assignedTasks
);

useEffect(() => {
  if (status === 'idle') {
    dispatch(type === 'owned' ? fetchOwnedTasks() : fetchAssignedTasks());

  }
}, [status, dispatch, type]);

 

  useEffect(() => {
    setFormOpen(false);
  }, [type]);
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
    dispatch(createOwnedTask(newTask));
    reset();
    setFormOpen(false);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination || source.droppableId === destination.droppableId) {
      return;
    }
    if (type == "owned") {
      dispatch(
        moveTask({ taskId: draggableId, newState: destination.droppableId })
      );

      // Dispatch action to update the task's state
      dispatch(
        changeOwnedTasksState({
          taskId: draggableId,
          state: destination.droppableId,
        })
      );
      dispatch(filteredTasksSelector());

    } else {
      dispatch(
        moveAssignedTask({
          taskId: draggableId,
          newState: destination.droppableId,
        })
      );

      // Dispatch action to update the task's state
      dispatch(
        searchFilteredTasksSelector()
      );
    }
  };


 

  return (
    <>
      <NavBar />
      <div className="p-4">
        {type === 'owned' ? (
          <h1 className="text-2xl font-bold text-center">Owned Tasks Kanban Board</h1>
        ) : (
          <h1 className="text-2xl font-bold text-center">Assigned Tasks Kanban Board</h1>
        )}

        <TaskFilter type={type}/>

        {status === 'loading' && <p>Loading tasks...</p>}
        {status === 'failed' && <p>Error: {error}</p>}

        {status === 'succeeded' && (
          <>
            {type === 'owned' && !isFormOpen && (
              <button
                onClick={() => {
                  setFormOpen(true);
                  setFormType('Add');
                }}
                className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
              >
                Add New Task
              </button>
            )}

            {isFormOpen && (
              <TaskForm
                closeForm={() => {
                  setFormOpen(false);
                }}
                taskToEdit={taskToEdit}
                formType={formType}
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
                        {
                        
                        (searchTerm || priority != "All Priorities" ? filteredTasks : items)
                          .filter((task) => task.state === columnId)
                          .map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-white p-4 mb-4 rounded shadow-md"
                                >
                                  <TaskCard
                                    task={task}
                                    edit={setFormOpen}
                                    setFormType={setFormType}
                                    setTaskToEdit={setTaskToEdit}
                                    type={type}
                                  />
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
          </>
        )}
      </div>
    </>
  );
};


export default KanbanBoard;
