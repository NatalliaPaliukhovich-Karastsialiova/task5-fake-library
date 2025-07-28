import { Table} from "react-bootstrap";
import { useMediaQuery } from 'react-responsive';

export default function BookTableHeader() {
  const isMobile = useMediaQuery({ maxWidth: 700 });
  return (
    <Table hover responsive className="mb-0">
      <thead className="table-light">
        <tr>
          <th style={{ width: "50px" }}></th>
          <th style={{ width: "50px" }}>#</th>

          {!isMobile && (
            <>
              <th className="w-10">ISBN</th>
              <th className="w-30">Title</th>
              <th className="w-30">Author(s)</th>
              <th>Publisher</th>
            </>
          )}
          {isMobile && (
            <th>Book</th>
          )}
        </tr>
      </thead>
    </Table>
  );
}
