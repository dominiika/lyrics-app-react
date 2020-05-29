import React from "react";
import { Container } from "react-bootstrap";
import HeaderBackground from "../layout/HeaderBackground";

function NotFound() {
  return (
    <div>
      <HeaderBackground />
      <Container className="error-container">
        <h2 className="main-h text-center">
          <strong>404 – page not found</strong>
        </h2>
        <p className="text-center pt-2">
          The page you're requesting doesn't exist.
        </p>
        <h1 className="text-center">:(</h1>
      </Container>
    </div>
  );
}

export default NotFound;
