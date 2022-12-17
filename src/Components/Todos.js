import React, { useState } from "react";
import TodoList from "./TodoList";

export default function Todos() {
  const [todoData, setTodoData] = useState();
  const addTodo = () => {
    fetch("https://jsonplaceholder.typicode.com/todos", {
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
    console.log("after adding", todoData);
  };
  return (
    <div>
      <button onClick={addTodo}> Add Todo</button>
      <TodoList></TodoList>
    </div>
  );
}
