import { PDFDocument, degrees } from 'pdf-lib'
import JSZip from 'jszip'

export async function merge(files, { onProgress } = {}) {
  const merged = await PDFDocument.create()
  for (let i = 0; i < files.length; i++) {
    onProgress?.(Math.round((i / files.length) * 80), `Merging file ${i + 1} of ${files.length}…`)
    const buf  = await files[i].arrayBuffer()
    const doc  = await PDFDocument.load(buf)
    const pgs  = await merged.copyPages(doc, doc.getPageIndices())
    pgs.forEach(p => merged.addPage(p))
  }
  onProgress?.(95, 'Saving…')
  const bytes = await merged.save()
  return { blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'merged.pdf' }
}

export async function split(file, pageRange, { onProgress } = {}) {
  const buf   = await file.arrayBuffer()
  const src   = await PDFDocument.load(buf)
  const total = src.getPageCount()
  const pages = parsePageRange(pageRange, total)
  const zip   = new JSZip()

  for (let i = 0; i < pages.length; i++) {
    onProgress?.(Math.round((i / pages.length) * 90), `Extracting page ${pages[i]}…`)
    const doc    = await PDFDocument.create()
    const [page] = await doc.copyPages(src, [pages[i] - 1])
    doc.addPage(page)
    zip.file(`page-${pages[i]}.pdf`, await doc.save())
  }

  onProgress?.(95, 'Zipping…')
  const zipBlob = await zip.generateAsync({ type: 'blob' })
  return { blob: zipBlob, filename: 'split-pages.zip' }
}

export async function rotate(file, deg, { onProgress } = {}) {
  onProgress?.(20, 'Loading PDF…')
  const buf = await file.arrayBuffer()
  const doc = await PDFDocument.load(buf)
  onProgress?.(50, 'Rotating pages…')
  doc.getPages().forEach(p => p.setRotation(degrees(deg)))
  const bytes = await doc.save()
  return { blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'rotated.pdf' }
}

export async function compress(file, { onProgress } = {}) {
  onProgress?.(20, 'Loading PDF…')
  const buf  = await file.arrayBuffer()
  const doc  = await PDFDocument.load(buf, { updateMetadata: false })
  onProgress?.(60, 'Compressing…')
  const bytes = await doc.save({ useObjectStreams: true, addDefaultPage: false })
  return { blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'compressed.pdf' }
}

export async function imagesToPdf(files, { onProgress } = {}) {
  const doc = await PDFDocument.create()
  for (let i = 0; i < files.length; i++) {
    onProgress?.(Math.round((i / files.length) * 90), `Embedding image ${i + 1} of ${files.length}…`)
    const buf  = await files[i].arrayBuffer()
    let img

    if (files[i].type === 'image/jpeg') {
      img = await doc.embedJpg(buf)
    } else {
      const blob   = new Blob([buf], { type: files[i].type })
      const bitmap = await createImageBitmap(blob)
      const canvas = new OffscreenCanvas(bitmap.width, bitmap.height)
      canvas.getContext('2d').drawImage(bitmap, 0, 0)
      bitmap.close()
      const pngBlob  = await canvas.convertToBlob({ type: 'image/png' })
      img = await doc.embedPng(await pngBlob.arrayBuffer())
    }

    const page = doc.addPage([img.width, img.height])
    page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height })
  }
  const bytes = await doc.save()
  return { blob: new Blob([bytes], { type: 'application/pdf' }), filename: 'images.pdf' }
}

function parsePageRange(str, total) {
  const pages = new Set()
  str.split(',').forEach(part => {
    part = part.trim()
    if (part.includes('-')) {
      const [a, b] = part.split('-').map(Number)
      for (let i = a; i <= Math.min(b, total); i++) pages.add(i)
    } else {
      const n = parseInt(part)
      if (n >= 1 && n <= total) pages.add(n)
    }
  })
  return Array.from(pages).sort((a, b) => a - b)
}
