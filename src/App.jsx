import { useReducer, useState } from "react";
import TodoList from "./components/TodoList";

import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { toggleTheme } from './slices/themeSlice';

const ACTIONS = {
  LIST: 'add-to-list',
  DONE: 'mark-task-complete',
  DEL: 'clear-task',
  deleteCOMPLETED: 'delete-completed-tasks'
}

function reducer(state, action) {
  switch (action.type) {

    case ACTIONS.LIST:
      let task = action.payload;
      let ID = new Date().getTime();
      state.list.push({ ID: ID, task: task, isComplete: false });
      state.pending.push({ ID: ID, task: task, isComplete: false });
      return { ...state };

    case ACTIONS.DONE:
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
      return { ...state };

    case ACTIONS.DEL:
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
      return { ...state };

    case ACTIONS.deleteCOMPLETED:
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].isComplete) {
          state.list.splice(i, 1);
          i--;
        }
      }
      state.complete = [];
      return { ...state };

    default:
      return state;
  }
}



function App() {
  let { theme } = useSelector(state => state.theme);
  const dispatchREDUX = useDispatch();

  let [state, dispatch] = useReducer(reducer, { list: [], pending: [], complete: [] });
  let [filter, setFilter] = useState('list');

  function markDone(ID) {
    console.log(ID);
    dispatch({ type: ACTIONS.DONE, payload: ID })
  }

  function clearTask(ID) {
    console.log(ID);
    dispatch({ type: ACTIONS.DEL, payload: ID })
  }

  return (
    <div className={`container ${theme}-cont`}>
      <div className="cover-pic"></div>
      <main className={`card ${theme}`}>

        <div className={`header ${theme}`}>
          <p className="title">TODO</p>
          <button className="mode" onClick={() => {
            dispatchREDUX(toggleTheme());
          }}>
            <img className="icon" src={theme === 'light' ? '/images/icon-moon.svg' : '/images/icon-sun.svg'} alt="" />
          </button>
        </div>

        <input type="text" placeholder="Create a new todo" className={`input-bar ${theme}`} onKeyDown={(e) => {
          if (e.key === 'Enter') {
            dispatch({ type: ACTIONS.LIST, payload: e.target.value });
            e.target.value = '';
          }
        }}
        />

        <section className={`list ${theme}`}>
          {state[filter].map((elem) => { return <TodoList key={elem.ID} ID={elem.ID} task={elem.task} isComplete={elem.isComplete} handleDone={markDone} handleDel={clearTask} /> })}
        </section>

        <footer className={`filters ${theme}-foot`}>
          <p className="left">{`${state.pending.length} tasks left`}</p>

          <button className="all" onClick={() => {
            setFilter('list');
          }}>All</button>

          <button className="active" onClick={() => {
            setFilter('pending');
          }}>Active</button>

          <button className="completed" onClick={() => {
            setFilter('complete');
          }}>Completed</button>

          <button className="clear-completed" onClick={() => {
            dispatch({ type: ACTIONS.deleteCOMPLETED })
          }}>Clear Completed</button>
        </footer>
      </main>
    </div>
  );
}

export default App;
