import React, { useState } from "react";
import "../assets/css/Todos.css"; //import style sheet
import EditTodoModal from "./EditTodoModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//Todo list component to display the todo data along with update and delet buttons for each of the todo itme
const TodoList = (props) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showItemDetails, setShowItemDetails] = useState({
    id: "",
    title: "",
    status: "",
  });

  const openPopup = (id, title, status) => {
    setShowItemDetails({ id: id, title: title, status: status });
    setShowEditModal(true);
  };

  //Api Delete call to Url , returns dummy response
  const deleteTodo = (todoid) => {
    fetch(`https://jsonplaceholder.typicode.com/todos/${todoid}`, {
      method: "DELETE",
    }).then(() => {
      const todoListModified = props.todos.filter((element) => {
        if (element.id !== todoid) {
          return true;
        }
      });
      props.setTodoData(todoListModified);
      toast("Todo Deleted.");
    });
  };

  return (
    <div className="todo-div">
      {props.todos &&
        props.todos.map((todo) => (
          <div key={todo.id} className="todos-container">
            {/* Todo card */}
            <div className="card text-center">
              <div className="card-header key-value">
                <span className="key">Id : </span>
                <span className="value"> {todo.id}</span>
              </div>
              <div className="card-body">
                <h5 className="card-title key-value">
                  <span className="key">Todo : </span>
                  <span className="value"> {todo.title}</span>
                </h5>
                <p className="card-text key-value">
                  <span className="key">Status : </span>
                  <span className="value">
                    {todo.completed ? "completed" : "pending"}
                  </span>
                </p>
                {/* button to make a update call to api */}
                <button
                  className="ms-2 btn btn-primary"
                  onClick={() => openPopup(todo.id, todo.title, todo.completed)}
                >
                  Edit Todo
                </button>
                {/* button to make a delete call to api */}
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="ms-2 btn btn-danger"
                >
                  Delete
                </button>
                <ToastContainer />
              </div>
            </div>
            <EditTodoModal
              setTodoData={props.setTodoData}
              todos={props.todos}
              setShowEditModal={setShowEditModal}
              showEditModal={showEditModal}
              showItemDetails={showItemDetails}
              setShowItemDetails={setShowItemDetails}
            ></EditTodoModal>

            {/* Edit Modal */}
          </div>
        ))}
    </div>
  );
};
export default TodoList;
