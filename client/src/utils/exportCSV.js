export function exportToCSV(data, filename = "books.csv") {
  const headers = ["#", "ISBN", "Title", "Authors", "Publisher", "Likes", "Reviews"];

  const csvRows = [
    headers.join(","),
    ...data.map(book => {
      const authors = book.authors.join("; ");
      const reviews = book.reviews
        .map(r => `${r.text} — ${r.author} (${r.company})`)
        .join("; ");

      return [
        book.index + 1,
        book.isbn,
        book.title,
        authors,
        book.publisher,
        book.likes,
        reviews
      ]
        .map(value => `"${String(value).replace(/"/g, '""')}"`)
        .join(",");
    }),
  ];

  const csvContent = csvRows.join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
