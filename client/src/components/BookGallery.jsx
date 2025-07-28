import React, { useState } from "react";
import { Row, Col, Card, Button, Modal } from "react-bootstrap";
import { HandThumbsUp } from "react-bootstrap-icons";
import BookCover from "./BookCover";

export default function BookGallery({ books, lastBookRef }) {
  const [selectedBook, setSelectedBook] = useState(null);

  return (
    <>
      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {books.map((book, i) => (
          <Col key={i} ref={i === books.length - 1 ? lastBookRef : null}>
            <Card className="h-100 shadow-sm">
              <div className="d-flex justify-content-center mt-3">
                <BookCover title={book.title} author={book.authors.join(", ")} />
              </div>
              <Card.Body>
                <Card.Title className="fs-5">{book.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {book.authors.join(", ")}
                </Card.Subtitle>
                <Card.Text className="text-muted">
                  {book.publisher}, {book.year}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Button variant="primary" size="sm" disabled>
                    <HandThumbsUp className="me-1" /> {book.likes}
                  </Button>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    onClick={() => setSelectedBook(book)}
                  >
                    Review
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Modal show={!!selectedBook} onHide={() => setSelectedBook(null)} size="lg" centered>
        {selectedBook && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedBook.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h5 className="mb-2">
                by <em>{selectedBook.authors.join(", ")}</em>
              </h5>
              <p className="text-muted">{selectedBook.publisher}, {selectedBook.year}</p>
              <div className="mb-3">
                <Button variant="primary" size="sm" disabled>
                  <HandThumbsUp className="me-1" /> {selectedBook.likes}
                </Button>
              </div>
              <h6>Reviews</h6>
              {selectedBook.reviews.length === 0 ? (
                <p className="text-muted">No reviews</p>
              ) : (
                <ul className="mb-0 list-unstyled">
                  {selectedBook.reviews.map((r, idx) => (
                    <li key={idx} className="mb-3">
                      <p className="mb-0"><strong>{r.text}</strong></p>
                      <span className="text-muted">— {r.author}, {r.company}</span>
                    </li>
                  ))}
                </ul>
              )}
            </Modal.Body>
          </>
        )}
      </Modal>
    </>
  );
}
