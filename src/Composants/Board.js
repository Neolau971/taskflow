import { useSelector, useDispatch } from 'react-redux';
import { setLists, addTask } from "../store/tasksSlice";
import { useCallback, useEffect, Suspense, lazy} from 'react';
import { useNavigate } from "react-router-dom";

const List = lazy(() => import('./List'));
const Task = lazy(() => import('./Task'));

export function Board() {
    const lists = useSelector((state) => state.tasks.lists);
    const tasks = useSelector((state) => state.tasks.tasks);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleListChange = useCallback((payload) => dispatch(setLists(payload)), [dispatch]);
    const handleTasksChange = useCallback((payload) => dispatch(addTask(payload)), [dispatch]);
    const handleClickProjet = () => {
        navigate("/project/1")
    }

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("liste"))) {
            dispatch(setLists(JSON.parse(localStorage.getItem("liste"))))
        }
    }, [dispatch])

    return (
        <div>
            <Suspense fallback={<p>Chargement...</p>}>
                <List lists={lists} onListChange={handleListChange} />
                <Task tasks={tasks} onTaskChange={handleTasksChange}/>
                <button onClick={handleClickProjet}>Go to projet #1</button>
            </Suspense>
        </div>
    )
}