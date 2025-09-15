import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export function Register() {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation({
        mutationFn: (newUser) => 
            axios.post(`${process.env.REACT_APP_API_URL}/register`, newUser, {
                headers: { "Content-Type": "application/json" },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["users"]);
            navigate("/dashboard");
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login && mdp) {
            mutation.mutate({ login, password: mdp});
        };
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
            <input type="text" value={mdp} onChange={(e) => setMdp(e.target.value)} />
            <button className="bg-blue-500 text-white p-4 rounded-lg" type="submit">Créer</button>
        </form>
    )
}