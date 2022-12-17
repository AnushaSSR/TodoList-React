import React from "react";
import TodoList from "./TodoList";

export default function Todos() {
  const addTodo = () => {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      body: JSON.stringify({
        title: "Add todo",
        body: "Todo Added",
        userId: 100,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
    console.log("Adding todo");
  };
  return (
    <div>
      <button onClick={addTodo}> Add Todo</button>
      <TodoList></TodoList>
    </div>
  );
}
