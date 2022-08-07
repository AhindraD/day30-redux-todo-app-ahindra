import { useState } from "react";
import TodoList from "./components/TodoList";

import { useSelector } from 'react-redux/es/exports';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { toggleTheme } from './slices/themeSlice';
import { add, markDone, markUnDone, deleteTask, deleteCompleted } from "./slices/listSlice";


function App() {
  let { theme } = useSelector(state => state.theme);
  let tasks = useSelector(state => state.tasks);
  const dispatchREDUX = useDispatch();

  let [filter, setFilter] = useState('list');

  function mark(ID) {
    console.log(ID);
    dispatchREDUX(markDone(ID))
  }

  function unMark(ID) {
    console.log(ID);
    dispatchREDUX(markUnDone(ID))
  }

  function clearTask(ID) {
    console.log(ID);
    dispatchREDUX(deleteTask(ID))
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
            dispatchREDUX(add(e.target.value));
            e.target.value = '';
          }
        }}
        />

        <section className={`list ${theme}`}>
          {tasks[filter].map((elem) => { return <TodoList key={elem.ID} ID={elem.ID} task={elem.task} isComplete={elem.isComplete} handleDone={mark} handleDel={clearTask} handleUnDone={unMark} /> })}
        </section>

        <footer className={`filters ${theme}-foot`}>
          <p className="left">{`${tasks.pending.length} tasks left`}</p>

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
            dispatchREDUX(deleteCompleted())
          }}>Clear Completed</button>
        </footer>
      </main>
    </div>
  );
}

export default App;
