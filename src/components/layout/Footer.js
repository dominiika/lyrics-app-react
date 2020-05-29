import React from "react";
import { Row, Col, Container } from "react-bootstrap";

function Footer() {
  return (
    <footer>
      <Row>
        <Col sm={12} className="mb-3">
          <Container>
            <p className="bright-yellow text-center">
              <i className="fas fa-microphone pr-1"></i>
              <span className="brand-logo">LyricsApp</span> is a perfect place
              for people who want to explore cool songs.
            </p>
          </Container>
        </Col>
        <Col xs={12} sm={12}>
          <Container>
            <h1 className="icons text-center">
              <a
                href="https://www.linkedin.com/in/dominika-gajda-483910194/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-linkedin-in mr-5"></i>
              </a>
              <a href="mailto:dominika.gajda@gmail.com">
                <i className="far fa-envelope mr-5"></i>
              </a>
              <a
                href="https://github.com/dominiika/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-github"></i>
              </a>
            </h1>
          </Container>
        </Col>
      </Row>
      <p className="copyright">© 2020 Dominika Gajda</p>
    </footer>
  );
}

export default Footer;
