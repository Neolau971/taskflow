import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";

const Button = styled.button`
background: #2563eb;
color: white;
font-weight: bold;

&:hover {
background: #1e40af;
}
`;

export function Login() {
    const [login, setLogin] = useState("");
    const [mdp, setMdp] = useState("");
    const queryClient = useQueryClient();
    const navigate = useNavigate();

        const mutation = useMutation({
        mutationFn: (user) => 
            axios.post(`${process.env.REACT_APP_API_URL}/login`, user, {
                headers: { "Content-Type": "application/json" },
            }).then((res) => {
                if (!res.status === 200) {
                    throw new Error("Erreur de connexion");
                }

                return res;
            }),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            queryClient.invalidateQueries(["login"]);
            navigate("/dashboard");
        },
        onError: (error) => {
            console.error("Erreur login", error);
        }
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        if (login && mdp) {
            mutation.mutate({ login, password: mdp});
        };
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div>
                    <input type="text" value={login} onChange={(e) => setLogin(e.target.value)} />
                    <input type="text" value={mdp} onChange={(e) => setMdp(e.target.value)} />
                    <button className="bg-blue-500 text-white p-4 rounded-lg" type="submit">Envoyer</button>
                </div>
                <Button onClick={() => navigate("/register")}>Créer utilisateur</Button>
            </form>
        </div>
    )
}