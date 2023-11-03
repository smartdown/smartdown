export default function renderTable(header, body) {
  if (body) body = '<tbody>' + body + '</tbody>';

  const emptyTH = header.split('></th>').length;
  const allTH = header.split('</th>').length;

  const style = emptyTH === allTH ? ' style="display: none;"' : '';
  return `<table>
<thead${style}>
${header}
</thead>
${body}
</table>`;
}

