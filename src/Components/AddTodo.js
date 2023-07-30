import { useEffect, useState } from "react";

//component to add a new todo to list
const AddTodo = (props) => {
  //initial state of the title and body of the todo
  const [todo, setTodo] = useState({
    title: "",
    body: "",
  });

  //handler to get the data entered in the input fields
  const todoHandler = (event) => {
    const key = event.target.name;
    setTodo({ ...todo, [key]: event.target.value });
  };

  //method to perform a POST api call to URL, to add a new todo to the list
  const addTodo = (event) => {
    event.preventDefault();
    //api calls return response with the body and title sent from inou and default id and userId random value
    fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "POST",
      body: JSON.stringify({
        title: todo.title,
        body: todo.body,
        userId: Math.floor(Math.random() * 100) + 200,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        //to add the value to state
        props.addTodo(json);

        //to clear of form value post submit

        setTodo({
          title: "",
          body: "",
        });
      });
  };

  return (
    <div className="add-todo-container">
      {/* form to add title and body to the todo */}
      <form onSubmit={addTodo} className="add-todo-form">
        <h4> Add a new Todo</h4>
        <div className="form-group">
          <input
            type="text"
            name="title"
            className="form-control"
            onChange={todoHandler}
            value={todo.title}
            placeholder="Add a title"
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="body"
            className="form-control"
            onChange={todoHandler}
            value={todo.body}
            placeholder="Add a body"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Add Todo
        </button>
      </form>
    </div>
  );
};
export default AddTodo;
