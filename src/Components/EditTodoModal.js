import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditTodoModal({
  todos,
  setTodoData,
  showEditModal,
  setShowEditModal,
  showItemDetails,
  setShowItemDetails,
}) {
  const handleClose = () => {
    setShowEditModal(false);
    return;
  };

  const handleCloseAndUpdate = () => {
    setShowEditModal(false);
    fetch(`https://jsonplaceholder.typicode.com/todos/${showItemDetails.id}`, {
      method: "PUT",
      body: JSON.stringify({
        title: showItemDetails.title,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        const updatedList = todos.filter((element) => {
          if (json.id === element.id) {
            element.title = showItemDetails.title;
            element.completed = showItemDetails.status;
          }
          return true;
        });
        setTodoData(updatedList);
        toast("Todo updated succesfully!");
      });
  };

  const handleTitleChange = (event) => {
    showItemDetails.title = event.target.value;
    setShowItemDetails(showItemDetails);
  };
  const handleStatusChange = (event) => {
    showItemDetails.status = event.target.value;
    setShowItemDetails(showItemDetails);
  };
  return (
    <>
      <Modal
        show={showEditModal}
        onHide={() => handleClose()}
        style={{ background: "gray" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="hidden"
            className="form-control"
            name="id"
            defaultValue={showItemDetails.id}
          />
          <div className="ms-3 mb-2 form-group">
            <label htmlFor="title" className="form-label">
              Todo :{" "}
            </label>
            <input
              type="text"
              className="ms-2 form-control text-center"
              name="title"
              style={{ width: 80 + "%" }}
              defaultValue={showItemDetails.title}
              onChange={handleTitleChange}
            />
          </div>
          <div className="ms-3 form-group">
            <label htmlFor="status" className="form-label">
              Status :{" "}
            </label>
            <select
              name="status"
              defaultValue={showItemDetails.status}
              className="ms-2 mb-3 form-control form-select text-center"
              style={{ width: 80 + "%" }}
              onChange={handleStatusChange}
            >
              <option value={true}>completed</option>
              <option value={false}>pending</option>
            </select>
          </div>
          <div className="mb-3 submit-btn text-center">
            <Button variant="primary" onClick={() => handleCloseAndUpdate()}>
              {" "}
              Update{" "}
            </Button>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditTodoModal;
