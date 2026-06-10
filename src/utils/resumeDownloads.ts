import { jsPDF } from "jspdf";
import {
  AlignmentType,
  Document,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from "docx";

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load resume image."));
    image.src = src;
  });
}

async function imageToArrayBuffer(src: string): Promise<ArrayBuffer> {
  const response = await fetch(src);
  const blob = await response.blob();
  return blob.arrayBuffer();
}

export async function downloadResumeAsPdf(imageSrc: string, fileBaseName: string) {
  const image = await loadImage(imageSrc);
  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "pt",
    format: "a4",
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 24;
  const availableWidth = pageWidth - margin * 2;
  const availableHeight = pageHeight - margin * 2;
  const scale = Math.min(availableWidth / image.width, availableHeight / image.height);
  const renderWidth = image.width * scale;
  const renderHeight = image.height * scale;
  const x = (pageWidth - renderWidth) / 2;
  const y = (pageHeight - renderHeight) / 2;

  pdf.setFillColor(255, 255, 255);
  pdf.rect(0, 0, pageWidth, pageHeight, "F");
  pdf.addImage(imageSrc, "PNG", x, y, renderWidth, renderHeight, undefined, "FAST");
  pdf.save(`${fileBaseName}.pdf`);
}

export async function downloadResumeAsWord(imageSrc: string, fileBaseName: string, title: string) {
  const image = await loadImage(imageSrc);
  const imageBuffer = await imageToArrayBuffer(imageSrc);

  const pageWidth = 816;
  const pageHeight = 1056;
  const margin = 36;
  const maxWidth = pageWidth - margin * 2;
  const maxHeight = pageHeight - margin * 2 - 56;
  const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
  const renderWidth = Math.round(image.width * scale);
  const renderHeight = Math.round(image.height * scale);

  const doc = new Document({
    sections: [
      {
        properties: {
          page: {
            size: {
              width: "8.5in",
              height: "11in",
            },
            margin: {
              top: "0.5in",
              right: "0.5in",
              bottom: "0.5in",
              left: "0.5in",
            },
          },
        },
        children: [
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: { after: 240 },
            children: [
              new TextRun({
                text: title,
                bold: true,
                size: 28,
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new ImageRun({
                type: "png",
                data: new Uint8Array(imageBuffer),
                transformation: {
                  width: renderWidth,
                  height: renderHeight,
                },
              }),
            ],
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${fileBaseName}.docx`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
