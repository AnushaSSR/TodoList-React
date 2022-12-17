import React, { useState, useEffect } from "react";

export default function TodoList() {
  const [todoData, settodoData] = useState();
  useEffect(() => {
    (async () => {
      await fetch("https://jsonplaceholder.typicode.com/todos")
        .then((response) => response.json())
        .then((json) => settodoData(json));
    })();
    console.log("Use Effect called");
    console.log(todoData);
  }, []);

  return (
    <div>
      {console.log("render", todoData)}
      {todoData &&
        todoData.map((todo) => (
          <div>
            Todo Id: {todo.id}
            <br />
            Todo Title: {todo.title}
            <br />
            Todo status:{todo.completed ? "completed" : "pending"}
          </div>
        ))}
    </div>
  );
}
