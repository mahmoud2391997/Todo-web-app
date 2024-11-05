import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filteredTasksSelector,setReduxSearchTerm,setReduxPriority,prioritySelector } from "../Redux/tasks/ownedTaskSlice";
import { searchFilteredTasksSelector,setSearchQuery,priorityFilteredTasksSelector,setSelectedPriority } from "../Redux/tasks/assignedTaskSlice";

const TaskFilter = ({type}) => {
  const [searchTerm ,setSearchTerm] = useState("")
  const [priority ,setPriority] = useState("All Priorities")
  const dispatch = useDispatch();

const handleSearchChange = (e) => {
  const term = e.target.value;
  setSearchTerm(term)
  console.log(term);
  if (type == "owned") {
    
    dispatch(setReduxSearchTerm(term))
    dispatch(filteredTasksSelector());
  } else {
    dispatch(setSearchQuery(term))
    dispatch(searchFilteredTasksSelector());

  }
};

useEffect (()=>{

  setPriority("All Priorities")
  setSearchTerm("")
  if (type == "owned") {
    dispatch(setReduxSearchTerm(""))
    dispatch(setReduxPriority("All Priorities"))

  } else {

    dispatch(setSearchQuery(""))
    dispatch(setSelectedPriority("All Priorities"))

  }

},[type])
const handlePriorityChange = (e) => {
  setPriority(e.target.value)
  if (type == "owned") {
    
    dispatch(setReduxPriority(e.target.value))
    dispatch(prioritySelector(e.target.value));
  } else {
    dispatch(setSelectedPriority(e.target.value));
    dispatch(priorityFilteredTasksSelector(e.target.value))

  }

  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-gray-100 rounded-lg mb-4">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search tasks..."
        className="p-2 border border-gray-300 rounded-md flex-1"
      />
      <select
      value={priority}
        onChange={handlePriorityChange}
        className="p-2 border border-gray-300 rounded-md"
      >
        <option value="All Priorities">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TaskFilter;
