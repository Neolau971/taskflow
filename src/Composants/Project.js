import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Project() {
    const navigate = useNavigate();
    const { id } = useParams();
    const { data, isLoading, error } = useQuery({
        queryKey: ["listTasks"],
        queryFn: () => axios.get(`${process.env.REACT_APP_API_URL}/tasks`).then(res => res.data)
    });

    if(isLoading) return <p>Chrgement...</p>;

    if(error) return <p>Erreur de feching...</p>;

    return (
        <div>
            <h1>Project # {id}</h1>
            <ul>
                {data.map((elem) => {
                    return <div key={elem._id}>
                            <>{elem.taskName}</>
                            <> </>
                            <>{elem.status}</>
                            <> </>
                            <>{elem.description}</>
                           </div>
                })}
            </ul>
            <button onClick={() => navigate("/dashboard")}>Go to Board</button>
        </div>
    )
}