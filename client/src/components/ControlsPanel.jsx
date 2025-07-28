import { Row, Col, Form, InputGroup, Button, FloatingLabel, ButtonGroup } from "react-bootstrap";

export default function ControlsPanel({
  seed,
  setSeed,
  lang,
  setLang,
  likes,
  setLikes,
  reviews,
  setReviews,
  regions,
  getSeed,
  viewMode,
  setViewMode,
  exportCSV
}) {
  return (
    <Form className="mb-4">
      <Row>
        <Col md={3}>
          <FloatingLabel label="Language">
            <Form.Select value={lang} onChange={(e) => setLang(e.target.value)}>
              {regions.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.label}
                </option>
              ))}
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col md={3}>
          <InputGroup>
            <FloatingLabel label="Seed" className="flex-grow-1">
              <Form.Control
                type="text"
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
              />
            </FloatingLabel>
            <Button variant="outline-primary" onClick={getSeed}>
              <i className="bi bi-shuffle"></i>
            </Button>
          </InputGroup>
        </Col>

        <Col md={3}>
          <Form.Group>
            <Form.Label>Likes</Form.Label>
            <Form.Range
              min={0}
              max={10}
              step={0.1}
              value={likes}
              onChange={(e) => setLikes(parseFloat(e.target.value))}
            />
            <div>{likes.toFixed(1)}</div>
          </Form.Group>
        </Col>

        <Col md={3}>
          <FloatingLabel label="Review">
            <Form.Control
              type="number"
              step={0.1}
              value={reviews}
              onChange={(e) => setReviews(parseFloat(e.target.value))}
            />
          </FloatingLabel>
        </Col>
      </Row>

      <Row className="mt-3">
        <Col className="d-flex justify-content-end">
          <ButtonGroup className="me-2">
            <Button
              variant={viewMode === "table" ? "primary" : "outline-primary"}
              onClick={() => setViewMode("table")}
            >
              <i className="bi bi-table"></i> Table
            </Button>
            <Button
              variant={viewMode === "gallery" ? "primary" : "outline-primary"}
              onClick={() => setViewMode("gallery")}
            >
              <i className="bi bi-grid-3x3-gap"></i>Gallery
            </Button>
          </ButtonGroup>
          <Button variant="success" onClick={exportCSV}>
            <i className="bi bi-file-earmark-arrow-down"></i> Export CSV
          </Button>
        </Col>
      </Row>
    </Form>
  );
}
