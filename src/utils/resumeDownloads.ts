import { jsPDF } from "jspdf";

async function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.crossOrigin = "anonymous";
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Failed to load resume image."));
    image.src = src;
  });
}

async function imageToDataUrl(src: string): Promise<string> {
  const response = await fetch(src);
  const blob = await response.blob();

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error("Failed to read resume image."));
    reader.readAsDataURL(blob);
  });
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
  const imageDataUrl = await imageToDataUrl(imageSrc);
  const html = `
    <html xmlns:o="urn:schemas-microsoft-com:office:office"
          xmlns:w="urn:schemas-microsoft-com:office:word"
          xmlns="http://www.w3.org/TR/REC-html40">
      <head>
        <meta charset="utf-8">
        <title>${title}</title>
        <style>
          body { margin: 0; padding: 24px; background: #ffffff; text-align: center; }
          img { max-width: 100%; height: auto; }
        </style>
      </head>
      <body>
        <img src="${imageDataUrl}" alt="${title}">
      </body>
    </html>
  `;

  const blob = new Blob(["\ufeff", html], {
    type: "application/msword",
  });

  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${fileBaseName}.doc`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
}
