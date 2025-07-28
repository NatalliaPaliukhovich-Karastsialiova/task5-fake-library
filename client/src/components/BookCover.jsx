import React from "react";
import { Card } from "react-bootstrap";
import { Book } from "react-bootstrap-icons";

export default function BookCover({ title, author }) {
  return (
    <Card
      style={{
        width: "200px",
        height: "250px",
        backgroundColor: "#fff",
        border: "1px solid #dee2e6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        textAlign: "center",
        fontSize: "0.75rem",
        paddingBlock: "15px"
      }}
    >
      <div style={{ fontWeight: "bold" }}>{title}</div>
      <Book size={32} className="text-muted mb-2" />
      <div className="text-muted" style={{ fontSize: "0.7rem" }}>
        {author}
      </div>
    </Card>
  );
}
