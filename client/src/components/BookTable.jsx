import React from "react";
import { Table, Button } from "react-bootstrap";
import { ChevronDown, ChevronUp, HandThumbsUp } from "react-bootstrap-icons";
import BookCover from "./BookCover";
import { useMediaQuery } from 'react-responsive';

export default function BookTable({ books, expandedIndex, setExpandedIndex, lastBookRef }) {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  return (
    <Table hover responsive className="align-middle">
      <tbody>
        {books.map((book, i) => (
          <React.Fragment key={i}>
            <tr
              onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}
              style={{ cursor: "pointer" }}
              className={expandedIndex === i ? "table-primary" : ""}
            >
              <td className="text-center" style={{ width: "50px" }}>
                {expandedIndex === i ? <ChevronUp /> : <ChevronDown />}
              </td>
              <td style={{ width: "50px" }}>{book.index + 1}</td>
              {!isMobile && (
                <>
                  <td className="w-10">{book.isbn}</td>
                  <td className="w-30">{book.title}</td>
                  <td className="w-30">{book.authors.join(", ")}</td>
                  <td>{book.publisher}</td>
                </>
              )}
              {isMobile && (
                <>
                  <td>
                    <p><strong>ISBN: </strong>{book.isbn}</p>
                    <p><strong>Title: </strong>{book.title}</p>
                    <p><strong>Authors: </strong>{book.authors.join(", ")}</p>
                    <p><strong>Publisher: </strong>{book.publisher}</p>
                  </td>
                </>
              )}
            </tr>

            {expandedIndex === i && (
              <tr>
                <td colSpan="6" className="p-0">
                  <div className="p-3 border rounded bg-light d-flex w-100 flex-wrap align-items-center justify-content-space-between">
                    <div className="d-flex flex-column align-items-center me-5">
                      <BookCover title={book.title} author={book.authors.join(", ")} />
                      <Button variant="primary" size="sm" className="my-3" style={{ cursor: "default" }}>
                        <HandThumbsUp className="me-1" /> {book.likes}
                      </Button>
                    </div>
                    <div className="flex-grow-1 flex-shrink-0" style={{ minWidth: "250px" }}>
                      <h5 className="mb-1 fs-2">
                        {book.title}{" "}
                        <small className="text-muted">Paperback</small>
                      </h5>
                      <p className="mb-1 fs-4">
                        by <em>{book.authors.join(", ")}</em>
                      </p>
                      <p className="text-muted mb-2 fs-5">
                        {book.publisher}, {book.year}
                      </p>
                      <h6 className="fs-4 mb-2">Review</h6>
                      {book.reviews.length === 0 && <p className="text-muted">No reviews</p>}
                      <ul className="mb-0 list-unstyled">
                        {book.reviews.map((r, idx) => (
                          <li key={idx} className="mb-3">
                            <p className="mb-0"><strong>{r.text}</strong></p>
                            <span className="text-muted">— {r.author}, {r.company}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            )}

            {i === books.length - 1 && (
              <tr ref={lastBookRef}>
                <td colSpan="6" className="text-center text-muted">
                  Loading more...
                </td>
              </tr>
            )}
          </React.Fragment>
        ))}
      </tbody>
    </Table>
  );
}
