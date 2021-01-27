import React, { useEffect, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Loading } from "../Components/Common/Loading";
import { CreateTodoPopup } from "../Components/Todo/CreateTodoPopup";
import { EmptyTodoContent } from "../Components/Todo/EmptyTodoContent";
import {
  deleteTodoService,
  fetchTodosService,
  updateTodoService,
} from "../services/todo/api";
export const TodoListScreen = () => {
  const dispatch = useDispatch();
  const [selectedTodo, setSelectedTodo] = useState(null);
  const { todo } = useSelector((state) => ({
    todo: state.todo,
  }));

  useEffect(() => dispatch(fetchTodosService()), []);

  const [showPopup, togglePopup] = useState(false);

  const toggleCreatePopup = () => togglePopup(!showPopup);

  const { data, isLoading } = todo;

  const toggleStatus = (item) => {
    const status = !item?.completed;
    dispatch(updateTodoService({ status, todoId: item._id }));
  };

  const deleteTodo = (todoId) => {
    dispatch(deleteTodoService({ todoId }));
  };

  useEffect(() => {
    togglePopup(false);
    setSelectedTodo(null);
  }, [data]);

  useEffect(() => {
    if (selectedTodo) {
      toggleCreatePopup();
    }
  }, [selectedTodo]);
  return (
    <div
      style={{
        margin: 20,
      }}
    >
      <Button
        style={{ float: "right", marginBottom: 20 }}
        onClick={toggleCreatePopup}
        variant="success"
      >
        Yeni Görev Oluştur
      </Button>
      {showPopup ? (
        <CreateTodoPopup todo={selectedTodo} handleClose={toggleCreatePopup} />
      ) : null}
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container>
          <Row>
            {data.length ? (
              data.map((item) => (
                <Col md={4}>
                  <Card
                    key={item._id}
                    style={{
                      height: 300,
                      margin: 10,
                    }}
                  >
                    <Button
                      style={{ float: "right" }}
                      onClick={() => deleteTodo(item._id)}
                      variant="danger"
                    >
                      Sil
                    </Button>
                    <Card.Body
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <Card.Title style={{ textAlign: "center" }}>
                        {item.content}
                      </Card.Title>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginTop: 20,
                        }}
                      >
                        <Button
                          onClick={() => setSelectedTodo(item)}
                          variant="info"
                        >
                          Güncelle
                        </Button>
                        <Button
                          onClick={() => toggleStatus(item)}
                          variant={item.completed ? "warning" : "success"}
                        >
                          <i
                            className={
                              item.completed ? "fa fa-close" : "fa fa-check"
                            }
                            aria-hidden="true"
                          ></i>
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : isLoading ? (
              <Col md={12}>
                <Loading />
              </Col>
            ) : (
              <Col md={12}>
                <EmptyTodoContent />
              </Col>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
};
