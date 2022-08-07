import React from 'react'

export default function TodoList(props) {
    return (
        <div className="task-indiv">
            <button className={`task-done ${props.isComplete ? 'active-state' : ''}`} onClick={() => {
                if (!props.isComplete) {
                    props.handleDone(props.ID);
                }
                else{
                    props.handleUnDone(props.ID);
                }
            }
            }>
                <img src='/images/icon-check.svg' alt="" />
            </button>
            <div className={`task-name ${props.isComplete ? 'strike' : ''}`}>{props.task}</div>
            <button className='task-delete' onClick={() => { props.handleDel(props.ID) }}>
                <img src='/images/icon-cross.svg' alt="" />
            </button>
        </div>
    )
}