import React from "react";
import { Spinner } from "react-bootstrap";
export const Loading = () => {
  return (
    <Spinner animation="border" role="status">
      <span className="sr-only">Yükleniyor...</span>
    </Spinner>
  );
};
