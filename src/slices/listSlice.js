import { createSlice } from '@reduxjs/toolkit'


const listSlice = createSlice({
    name: 'tasks',
    initialState: {
        list: [],
        pending: [],
        complete: []
    },
    reducers: {
        add: (state, action) => {
            let task = action.payload;
            let ID = new Date().getTime();
            state.list.push({ ID: ID, task: task, isComplete: false });
            state.pending.push({ ID: ID, task: task, isComplete: false });
        },

        markDone: (state, action) => {
            for (let i = 0; i < state.list.length; i++) {
                let currID = state.list[i].ID;
                if (currID === action.payload) {
                    state.list[i].isComplete = true;

                    state.complete.push(state.list[i]);
                    break;
                }
            }
            for (let i = 0; i < state.pending.length; i++) {
                let currID = state.pending[i].ID;
                if (currID === action.payload) {
                    state.pending.splice(i, 1);
                    break;
                }
            }
        },

        markUnDone: (state, action) => {
            for (let i = 0; i < state.list.length; i++) {
                let currID = state.list[i].ID;
                if (currID === action.payload) {
                    state.list[i].isComplete = false;

                    state.pending.push(state.list[i]);
                    break;
                }
            }
            for (let i = 0; i < state.complete.length; i++) {
                let currID = state.complete[i].ID;
                if (currID === action.payload) {
                    state.complete.splice(i, 1);
                    break;
                }
            }
        },

        deleteTask: (state, action) => {
            for (let i = 0; i < state.list.length; i++) {
                let currID = state.list[i].ID;
                if (currID === action.payload) {
                    state.list.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < state.pending.length; i++) {
                let currID = state.pending[i].ID;
                if (currID === action.payload) {
                    state.pending.splice(i, 1);
                    break;
                }
            }
            for (let i = 0; i < state.complete.length; i++) {
                let currID = state.complete[i].ID;
                if (currID === action.payload) {
                    state.complete.splice(i, 1);
                    break;
                }
            }
        },

        deleteCompleted: (state, action) => {
            for (let i = 0; i < state.list.length; i++) {
                if (state.list[i].isComplete) {
                    state.list.splice(i, 1);
                    i--;
                }
            }
            state.complete = [];
        }
    }
});

export const { add, markDone, markUnDone, deleteTask, deleteCompleted } = listSlice.actions

export default listSlice.reducer