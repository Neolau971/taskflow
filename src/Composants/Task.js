import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const Task = React.memo(function Task({tasks, onTaskChange}) {
    const [task, setTask] = useState({taskName: "test", status: "test", description: "test"});
    const queryClient = useQueryClient();
    const token = localStorage.getItem("token");

    const handleChangeName = (e) => {
        setTask({...task, taskName: e.target.value});
    };

    const handleChangeStatus = (e) => {
        setTask({...task, status: e.target.value});
    };

    const handleChangeDesc = (e) => {
        setTask({...task, description: e.target.value});
    };

    const mutation = useMutation({
        mutationFn: (newTask) =>
            axios.post(`${process.env.REACT_APP_API_URL}/tasks`, newTask, {
                headers: { 
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                 },
            }).then((res) => {
                if (!res.ok) {
                    throw new Error("Erreur fetch tasks");
                }
                
                return res;
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
        },
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        onTaskChange(task);
        mutation.mutate(task);
    };

    return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text"
        value={task.taskName}  
        onChange={handleChangeName}
        placeholder="Entrer nom tache"
      />
      <input 
        type="text"
        value={task.status}  
        onChange={handleChangeStatus}
        placeholder="Entrer status tache"
      />
      <input 
        type="text"
        value={task.description}  
        onChange={handleChangeDesc}
        placeholder="Entrer description tache"
      />
      <button type="submit">Créer Tache</button>
    </form>
    )
})

export default Task;