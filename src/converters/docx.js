import * as pdfjsLib from 'pdfjs-dist'
import { Document, Packer, Paragraph, TextRun } from 'docx'

// Configure PDFJS worker
// Using version 4.0.370 since the plan uses v4.0.0+
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.0.370/pdf.worker.min.mjs'

export async function convertPdfToWord(file, { onProgress } = {}) {
  onProgress?.(10, 'Loading PDF engine…')
  const arrayBuffer = await file.arrayBuffer()

  onProgress?.(30, 'Reading PDF pages…')
  const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer })
  const pdf = await loadingTask.promise
  const numPages = pdf.numPages

  const paragraphs = []

  for (let i = 1; i <= numPages; i++) {
    onProgress?.(Math.round(30 + (i / numPages) * 50), `Extracting text page ${i} of ${numPages}…`)
    const page = await pdf.getPage(i)
    const textContent = await page.getTextContent()

    // Sort text items from top-left to bottom-right
    const items = textContent.items.sort((a, b) => {
      const yDiff = a.transform[5] - b.transform[5]
      if (Math.abs(yDiff) < 5) {
        return a.transform[4] - b.transform[4]
      }
      return -yDiff // PDF y-axis goes upwards
    })

    let pageText = ''
    let lastY = null

    for (const item of items) {
      if (item.str === undefined) continue
      const currentY = item.transform[5]
      if (lastY !== null && Math.abs(currentY - lastY) > 8) {
        pageText += '\n'
      }
      pageText += item.str + ' '
      lastY = currentY
    }

    const lines = pageText.split('\n')
    for (const line of lines) {
      if (line.trim().length > 0) {
        paragraphs.push(
          new Paragraph({
            children: [new TextRun({ text: line.trim() })]
          })
        )
      }
    }

    // Add page break if not the last page
    if (i < numPages) {
      paragraphs.push(
        new Paragraph({
          children: [new TextRun({ text: '', pageBreak: true })]
        })
      )
    }
  }

  onProgress?.(90, 'Generating Word document…')
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs
      }
    ]
  })

  const docBlob = await Packer.toBlob(doc)
  return {
    blob: docBlob,
    filename: file.name.replace(/\.pdf$/i, '.docx')
  }
}
