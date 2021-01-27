import React from "react";

import { Card } from "react-bootstrap";

export const EmptyTodoContent = () => {
  return (
    <div
      style={{
        height: "100%",
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card style={{ width: "100%" }}>
        <Card.Body>Henüz eklenmiş bir görev bulunmamaktadır.</Card.Body>
      </Card>
    </div>
  );
};
