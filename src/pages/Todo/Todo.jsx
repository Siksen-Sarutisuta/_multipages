import { useState, useEffect, useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { fetchTidos } from "../../data/todos";

import "./Todo.css";
import { Form } from "react-bootstrap";
function Todo() {
  const [todosRaw, setTodosRaw] = useState([]);
  //filters
  const [onlyWating, setOnlyWating] = useState(false);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  //todos
  const [todos, setTodos] = useState([]);
  //display
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);

  const itemsPerPageRef = useRef();
  const onlyWatingRef = useRef();

  useEffect(() => {
    // setCurPage((prev) => (prev > numPages ? numPages : prev));
    setCurPage(1);
  }, [numPages]);

  useEffect(() => {
    console.log(`itemsPerPage: ${itemsPerPage}`);
    setNumPages(Math.ceil(todosRaw.length / itemsPerPage));
  }, [itemsPerPage, todosRaw]);

  useEffect(() => {
    console.log(`onlyWating: ${onlyWating}`);
  }, [onlyWating]);

  useEffect(() => {
    setTodosRaw(fetchTidos());
    setCurPage(1);
  }, []);

  useEffect(() => {
    if (onlyWating) {
      setTodos(todosRaw.filter((todo) => !todo.completed));
    } else {
      setTodos(todosRaw);
    }
  }, [todosRaw, onlyWating, itemsPerPage]);

  //event handlers
  function deleteClick(id) {
    setTodosRaw(todosRaw.filter((todo) => todo.id !== id));
  }
  function waitingClick(id) {
    const todoSelected = todosRaw.find((todo) => todo.id === id);

    todoSelected.completed = true;

    // setTodosRaw(todosRaw) // state does not change
    setTodosRaw([...todosRaw]); // force state change
  }
  function addClick(id, title) {
    const newItem = {
      id,
      title,
      completed: false,
      userId: 1,
    };

    setTodosRaw([...todosRaw, newItem]);
  }

  // modal handlers

  const [show, setShow] = useState(false);

  const newIdRef = useRef();
  const newTitleRef = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="todo-container">
      {/* modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className="bi bi-plus-lg">&nbsp;ADD todo</span>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                type="text"
                autoFocus
                disabled
                value={
                  Number(
                    todosRaw.reduce((prev, todo) => {
                      return todo.id > prev ? todo.id : prev;
                    }, 0)
                  ) + 1
                }
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
              <Form.Label>title:</Form.Label>
              <Form.Control type="text" autoFocus ref={newTitleRef} />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            <span className="bi bi-x-lg">&nbsp;Cancel</span>
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              const id = newIdRef.current.value;
              const title = newTitleRef.current.value.trim();
              if (title === "") {
                alert("title cannot be empty");
                newTitleRef.current.value = "";
                newTitleRef.current.focus();
              } else {
                addClick(id, title);
                handleClose();
              }
            }}
          >
            <span className="bi bi-plus-lg">&nbsp;Add</span>
          </Button>
        </Modal.Footer>
      </Modal>

      {/* filters */}
      <div className="todo-filters-container">
        <div className="form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckChecked"
            // checked
            onClick={(e) => setOnlyWating(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="flexSwitchCheckChecked">
            Show only&nbsp;
            <button className="btn btn-warning">
              Wating&nbsp;<span className="bi bi-clock"></span>
            </button>
          </label>
        </div>
        <select
          className="form-select"
          aria-label="Default select example"
          defaultValue={5}
          style={{ width: "200px" }}
          onChange={(e) => {
            setItemsPerPage(e.target.value);
          }}
        >
          <option value="5" selected>
            5 items per page
          </option>
          <option value="10">10 items per page</option>
          <option value="50">50 items per page</option>
          <option value="100">100 items per page</option>
        </select>
      </div>
      {/* table */}
      <table className="table table-striped" >
        <thead className="table-dark">
          <tr>
            <th style={{ width: "5%" }} valign="middle">ID</th>
            <th valign="middle">TITLE</th>
            <th style={{ textAlign: "right", width: "20%" }} valign="middle">
              Completed&nbsp;
              <button
                className="btn btn-primary"
                onClick={() => {
                  handleShow();
                }}
              >
                <span className="bi bi-plus"></span>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <td><span  className="badge bg-secondary">1</span></td>
            <td style={{ textAlign: "left" }}>Todo 1</td>
            <td style={{ textAlign: "right" }}>done<button className="btn btn-danger"><span className="bi bi-trash"></span></button></td>
          </tr> */}

          {todos
            .filter((todo, index) => {
              const min = (curPage - 1) * itemsPerPage;
              const max = curPage * itemsPerPage - 1;
              return index >= min && index <= max;
            })

            .map((todo) => {
              return (
                <tr key={todo.id}>
                  <td valign="middle">
                    <span
                      className="badge bg-secondary"
                      style={{ width: "3rem" }}
                    >
                      {todo.id}
                    </span>
                  </td>
                  <td style={{ textAlign: "left" }} valign="middle">{todo.title}</td>
                  <td style={{ textAlign: "right" }} valign="middle">
                    {todo.completed ? (
                      <span className="badge bg-success">
                        done&nbsp;
                        <span className="bi bi-check"></span>
                      </span>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={() => {
                          waitingClick(todo.id);
                        }}
                      >
                        waiting&nbsp;
                        <span className="bi bi-clock"></span>
                      </button>
                    )}
                    &nbsp;
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        deleteClick(todo.id);
                      }}
                    >
                      <span className="bi bi-trash"></span>
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      {/* page control */}
      <div>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </button>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => {
            curPage > 1 && setCurPage(curPage - 1);
          }}
          disabled={curPage === 1}
        >
          Previous
        </button>
        <span className="todo-space">
          {curPage}&nbsp;/&nbsp;{numPages}
        </span>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => {
            curPage < numPages && setCurPage(curPage + 1);
          }}
          disabled={curPage === numPages}
        >
          Next
        </button>
        <button
          className="btn btn-outline-primary todo-space"
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Todo;
