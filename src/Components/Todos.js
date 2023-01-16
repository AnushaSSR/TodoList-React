import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";

//Todo Component to get the data and perform Add, Update and delted call sto API
const Todos = () => {
  //state component of todoData
  const [todoData, setTodoData] = useState([]);

  //to fetch data from api on useEffect
  useEffect(() => {
    (async () => {
      await fetch(
        "https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10"
      )
        .then((response) => response.json())
        .then((json) => setTodoData(json));
    })();
  });

  //handler to get data from children component - backpropping
  const addTodo = (payload) => {
    //data to add upon post call to API fetched from child
    const newTodo = {
      userId: payload.userId,
      title: payload.title,
      id: payload.id,
      completed: false,
    };

    const updatedTodos = [...todoData, newTodo];
    //set the todoDta to data from add Todo component
    setTodoData(updatedTodos);
  };

  return (
    <div>
      {/* //sending props to add Todo to add a new todo */}
      <AddTodo addTodo={addTodo}>Added todo is</AddTodo>

      {/* //sending props to TodoList to display the todo details*/}
      <TodoList todos={todoData}></TodoList>
    </div>
  );
};

export default Todos;
