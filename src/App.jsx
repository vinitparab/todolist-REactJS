"use client";
import React, { useState } from "react";

const App = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [maintask, setmaintask] = useState([]);
  const submithandler = (e) => {
    e.preventDefault();

    setmaintask([...maintask, { title, desc, completed: false }]);
    settitle("");
    setdesc("");
    console.log(maintask);
  };
  const deleteHandler = (i) => {
    let copytask = [...maintask];
    copytask.splice(i, 1);
    setmaintask(copytask);
  };
  const completeHandler = (i) => {
    const updatedTasks = [...maintask];
    updatedTasks[i].completed = true;
    setmaintask(updatedTasks);
  };

  let renderTask = <h2>No Task available</h2>;
  if (maintask.length > 0) {
    renderTask = maintask.map((t, i) => {
      return (
        <li key={i} className="flex items-center justify-between">
          <div className="flex justify-between mb-5 w-2/3">
            <h5
              className={`text-2xl font-semibold ${
                t.completed ? "line-through text-green-700" : ""
              }`}
            >
              {t.title}
            </h5>
            <p
              className={`text-xl font-semibold ${
                t.completed ? "line-through text-green-700" : ""
              }`}
            >
              {t.desc}
            </p>
          </div>
          <button
            onClick={() => {
              deleteHandler(i);
            }}
            className="border-2 border-zinc-800 m-5 px-4 rounded bg-emerald-800 text-white"
          >
            Delete
          </button>
          <button
            onClick={() => {
              completeHandler(i);
            }}
            className="border-2 border-zinc-800 m-5 px-4 rounded bg-emerald-800 text-white"
          >
            complete
          </button>
        </li>
      );
    });
  }
  return (
    <>
      <h1 className="bg-black text-white flex  items-center justify-center font-semibold h-20  text-4xl">
        Vinit's Todo List
      </h1>
      <div className="flex items-center justify-center">
        <form onSubmit={submithandler}>
          <input
            type="text"
            placeholder="Enter Task Here"
            className="border-zinc-800 border-2 m-5 px-4 py-2"
            value={title}
            onChange={(e) => {
              settitle(e.target.value);
            }}
          />

          <input
            type="text"
            placeholder="Enter Description Here"
            className="border-zinc-800 border-2 m-5 px-4 py-2"
            value={desc}
            onChange={(e) => {
              setdesc(e.target.value);
            }}
          />

          <button
            className="border-2 border-zinc-800 m-5 px-4 rounded bg-emerald-800 text-white disabled:opacity-50"
            disabled={title.trim() === "" || desc.trim() === ""}
          >
            {" "}
            Add Task
          </button>
        </form>
      </div>
      <hr />
      <div className="bg-slate-200 p-8 ">
        <ul>{renderTask}</ul>
      </div>
    </>
  );
};

export default App;
