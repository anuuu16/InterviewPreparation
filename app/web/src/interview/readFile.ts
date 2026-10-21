/** Read a resume or job description from a file: plain text, Markdown or PDF. Everything stays in the browser. */
export async function readFileText(file: File): Promise<string> {
  const name = file.name.toLowerCase();
  if (name.endsWith('.pdf') || file.type === 'application/pdf') return readPdf(file);
  if (name.endsWith('.docx') || name.endsWith('.doc')) throw new Error('Word files are not supported yet. Save as PDF or paste the text.');
  return file.text();
}

async function readPdf(file: File): Promise<string> {
  // loaded on demand: the PDF reader is large and only needed when someone uploads a PDF
  const pdfjs = await import('pdfjs-dist');
  const worker = (await import('pdfjs-dist/build/pdf.worker.min.mjs?url')).default;
  pdfjs.GlobalWorkerOptions.workerSrc = worker;
  const doc = await pdfjs.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages: string[] = [];
  for (let p = 1; p <= doc.numPages; p += 1) {
    const content = await (await doc.getPage(p)).getTextContent();
    let lastY: number | null = null;
    let line = '';
    const out: string[] = [];
    for (const item of content.items) {
      if (!('str' in item)) continue;
      const y = item.transform[5] as number;
      if (lastY !== null && Math.abs(y - lastY) > 2) { out.push(line); line = ''; }
      line += (line && !line.endsWith(' ') && !item.str.startsWith(' ') ? ' ' : '') + item.str;
      lastY = y;
    }
    out.push(line);
    pages.push(out.join('\n'));
  }
  return pages.join('\n').replace(/[ \t]+\n/g, '\n').trim();
}
