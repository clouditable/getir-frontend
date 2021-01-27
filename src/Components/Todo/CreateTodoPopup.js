import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { createTodoService, updateTodoService } from "../../services/todo/api";
export const CreateTodoPopup = ({ handleClose, todo }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(todo?.content || "");
  const handleSubmit = () => {
    if (!todo?._id) {
      dispatch(createTodoService({ content }));
    } else {
      dispatch(updateTodoService({ todoId: todo._id, content }));
    }
  };
  return (
    <Modal show={true}>
      <Modal.Header>
        <Modal.Title>{todo ? "Görevi Güncelle" : "Yeni Görev"}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Görev İçeriği</Form.Label>
            <Form.Control
              placeholder="Görev içeriğini giriniz"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleClose} variant="secondary">
          İptal
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!content.trim()}
          variant="primary"
        >
          Kaydet
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
