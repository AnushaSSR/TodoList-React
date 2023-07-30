import React, { useState, useEffect } from "react";
import AddTodo from "./AddTodo";
import TodoList from "./TodoList";
import "react-toastify/dist/ReactToastify.css";

//Todo Component to get the data and perform Add, Update and delted call sto API
const Todos = (props) => {
  //state component of todoData
  const [todoData, setTodoData] = useState([]);
  //to fetch data from api on useEffect
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_page=1&_limit=10")
      .then((response) => response.json())
      .then((json) => setTodoData(json));
  }, []);

  //handler to get data from children component - backpropping--<TOdo> Notify ewhen added successfully
  const addTodo = (payload) => {
    //data to add upon post call to API fetched from child
    let lastElement = todoData.slice(-1);

    //data to add upon post call to API
    const newTodo = {
      userId: payload.userId,
      title: payload.title,
      id: lastElement[0].userId,
      completed: false,
    };
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=10", {
      method: "POST",
      body: JSON.stringify(newTodo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        json.id = parseInt(lastElement[0].id) + 1;
        setTodoData([...todoData, json]);
      });

    const updatedTodos = [...todoData, newTodo];

    //set the todoData to data from add Todo component
    setTodoData(updatedTodos);
  };

  return (
    <div>
      {/* //sending props to add Todo to add a new todo */}
      <AddTodo addTodo={addTodo}>Added todo is</AddTodo>

      {/* //sending props to TodoList to display the todo details*/}
      <TodoList todos={todoData} setTodoData={setTodoData}></TodoList>
    </div>
  );
};

export default Todos;
