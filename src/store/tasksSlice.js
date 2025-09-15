import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
    name: 'tasks',
    initialState: {lists: [], tasks: []},
    reducers: {
        setTasks: (state, action) => { state.tasks = action.payload; },
        addTask: (state, action) => { 
            state.tasks.push(action.payload);
            state.lists = [...state.lists, [action.payload]];
        },
        setLists: (state, action) => { state.lists = action.payload; }
    }
});

export const { setLists, setTasks, addTask } = tasksSlice.actions;
export default tasksSlice.reducer;