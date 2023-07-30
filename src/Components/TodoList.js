import React from "react";
import "../assets/css/Todos.css"; //import styke sheet

//Todo list component to diusplay the display along with update and delet buttons for each of the todo itme
const TodoList = (props) => {
  //Api Put call to json placholder Url , returns dummy response
  const updateTodo = (todoid) => {
    console.log("updating todo", todoid);
    if (todoid > 200) {
      todoid = 1;
    }
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoid}`, {
      method: "PUT",
      body: JSON.stringify({
        title: "update title",
        body: "update body",
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  };

  //Api Delete call to Url , returns dummy response
  const deleteTodo = (todoid) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoid}`, {
      method: "DELETE",
    });
  };

  return (
    <div className="todo-div">
      {console.log(props.todos)}

      {props.todos &&
        props.todos.map((todo) => (
          <div key={todo.id} className="todos-container">
            {/* Todo card */}
            <div className="card text-center">
              <div className="card-header key-value">
                <span className="key">Id:</span>
                <span className="value"> {todo.id}</span>
              </div>
              <div className="card-body">
                <h5 className="card-title key-value">
                  <span className="key">Title:</span>
                  <span className="value"> {todo.title}</span>
                </h5>
                <p className="card-text key-value">
                  <span className="key">Status:</span>
                  <span className="value">
                    {todo.completed ? "completed" : "pending"}
                  </span>
                </p>
                {/* button to make a update call to api */}
                <button
                  onClick={() => updateTodo(todo.id)}
                  className="ms-2 btn btn-success"
                >
                  Update
                </button>

                {/* button to make a delete call to api */}
                <button
                  onClick={() => deleteTodo(todo.id)}
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
