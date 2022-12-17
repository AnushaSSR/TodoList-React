import React, { useState, useEffect } from "react";

export default function TodoList() {
  const [todoData, settodoData] = useState();
  useEffect(() => {
    (async () => {
      await fetch(
        "https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10"
      )
        .then((response) => response.json())
        .then((json) => settodoData(json));
    })();
    console.log("Use Effect called");
    console.log(todoData);
  }, []);
  const updateTodo = (todo) => {
    console.log("updating todo", todo);
    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      method: "PUT",
      body: JSON.stringify({
        title: "foo",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  const deleteTodo = (todo) => {
    console.log("deleteing todo", todo);
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });
  };

  return (
    <div>
      {console.log("render", todoData)}
      {todoData &&
        todoData.map((todo) => (
          <div key={todo.id}>
            Todo Id: {todo.id}
            <br />
            Todo Title: {todo.title}
            <br />
            Todo status:{todo.completed ? "completed" : "pending"}
            <button onClick={() => updateTodo(todo)}>Update</button>
            <button onClick={() => deleteTodo(todo)}>Delete</button>
          </div>
        ))}
    </div>
  );
}
