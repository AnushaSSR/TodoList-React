import React from "react";
import "../assets/css/Todos.css";

//Todo list component to diusplay the display along with update and delet buttons for each of the todo itme
const TodoList = (props) => {
  //Api Put call to json placholder Url , returns dummy response
  const updateTodo = (todo) => {
    console.log("updating todo", todo);
    fetch("https://jsonplaceholder.typicode.com/todos/1", {
      method: "PUT",
      body: JSON.stringify({
        title: "foo",
        body: "check",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  //Api Delete call to Url , returns dummy response
  const deleteTodo = (todo) => {
    fetch("https://jsonplaceholder.typicode.com/posts/1", {
      method: "DELETE",
    });
  };

  return (
    <div className="todo-div">
      {props.todos &&
        props.todos.map((todo) => (
          <div key={todo.id} className="todos-container">
            {/* Todo card */}
            <div class="card text-center">
              <div class="card-header key-value">
                <span className="key">Id:</span>
                <span className="value"> {todo.id}</span>
              </div>
              <div class="card-body">
                <h5 class="card-title key-value">
                  <span className="key">Title:</span>
                  <span className="value"> {todo.title}</span>
                </h5>
                <p class="card-text key-value">
                  <span className="key">Status:</span>
                  <span className="value">
                    {todo.completed ? "completed" : "pending"}
                  </span>
                </p>
                {/* button to make a update call to api */}
                <button
                  onClick={() => updateTodo(todo)}
                  className="ms-2 btn btn-success"
                >
                  Update
                </button>

                {/* button to make a delete call to api */}
                <button
                  onClick={() => deleteTodo(todo)}
                  className="ms-2 btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};
export default TodoList;
