import QRCode from 'qrcode';
import { PDFDocument, rgb } from 'pdf-lib';
import { NextResponse } from 'next/server';
import CreateSquareImage from '../../../function/squareImage'
import fs from 'fs';
import fontkit from '@pdf-lib/fontkit';


// โหลดฟอนต์จากไฟล์ TTF
const calibriFontBytes = fs.readFileSync('public/fonts/CALIBRI.TTF');
const calibriFontฺBoldBytes = fs.readFileSync('public/fonts/CALIBRIB.TTF');


export async function POST(request: Request) {
  const { invoiceNo, origin, qty, size } = await request.json();

  // Create a new PDF document
  const pdfDoc = await PDFDocument.create();

    // Register fontkit with PDFDocument
    pdfDoc.registerFontkit(fontkit);

    // ฝังฟอนต์ Calibri
    const calibriFont = await pdfDoc.embedFont(calibriFontBytes);
    const calibriFontBold = await pdfDoc.embedFont(calibriFontฺBoldBytes);

  // Create a white square image with a black border
  const squareImageBuffer = CreateSquareImage(100, 'black', 'white'); // Adjust size as needed

  // Loop through each quantity and generate the content
  if (size == 'Large') {
    for (let i = 1; i <= qty; i++) {
      for (let j = 1; j <= 2; j++) {
        const qrCodeText = `${invoiceNo}\r${i}`;
        const qrCodeDataURL = await QRCode.toDataURL(qrCodeText);
  
        const page = pdfDoc.addPage([842, 595]); // A4 Landscape page size
        const { width, height } = page.getSize();
  
        let fontSize = origin.length > 18 ? 60 : 66;
  
        page.drawText('STANLEY', {
          x: 59,
          y: height - 163,
          size: fontSize,
          font: calibriFontBold,
        });
  
        page.drawText(invoiceNo, {
          x: 59,
          y: height - 236,
          size: fontSize,
          font: calibriFontBold,
        });
  
        page.drawText(origin, {
          x: 59,
          y: height - 310,
          size: fontSize,
          font: calibriFontBold,
        });
  
        page.drawText(`C/NO. ${i} - ${qty}`, {
          x: 59,
          y: height - 383,
          size: fontSize,
          font: calibriFontBold,
        });
  
        // Add QR code
        const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
        const qrCodeImage = await pdfDoc.embedPng(qrCodeBuffer);
        page.drawImage(qrCodeImage, {
          x: 614,
          y: height - 178,
          width: 116,
          height: 116,
        });
  
        // Add square image below QR code
        const squareImage = await pdfDoc.embedPng(squareImageBuffer);
        page.drawImage(squareImage, {
          x: 628,
          y: height - 482,
          width: 86,
          height: 86,
        });
  
        page.drawText('MADE IN THAILAND', {
          x: 59,
          y: height - 460,
          size: fontSize,
          font: calibriFontBold,
        });
      }
    }
  }else if (size == 'Small') {
    for (let i = 1; i <= qty; i += 2) {
      for (let n = 0; n < 2; n++) {
        const qrCodeText1 = `${invoiceNo}\r${i}`;
        const qrCodeDataURL1 = await QRCode.toDataURL(qrCodeText1);

        const qrCodeText2 = `${invoiceNo}\r${i + 1}`;
        const qrCodeDataURL2 = await QRCode.toDataURL(qrCodeText2);

        const page = pdfDoc.addPage([595, 842]); // A4 page size
        const { width, height } = page.getSize();

        let fontSize = origin.length > 18 ? 47 : 54;

        // First set of data
        page.drawText('STANLEY', {
          x: 26,
          y: height - 129,
          size: fontSize,
          font: calibriFontBold,
        });

        page.drawText(invoiceNo, {
          x: 26,
          y: height - 195,
          size: fontSize,
          font: calibriFontBold,
        });

        page.drawText(origin, {
          x: 26,
          y: height - 261,
          size: fontSize,
          font: calibriFontBold,
        });

        page.drawText(`C/No. ${i} - ${qty}`, {
          x: 26,
          y: height - 327,
          size: fontSize,
          font: calibriFontBold,
        });

        // First QR Code
        const qrCodeBuffer1 = Buffer.from(qrCodeDataURL1.split(',')[1], 'base64');
        const qrCodeImage1 = await pdfDoc.embedPng(qrCodeBuffer1);
        page.drawImage(qrCodeImage1, {
          x: 478,
          y: height - 158,
          width: 90,
          height: 90,
        });

        // Add square image below first QR code
        const squareImage1 = await pdfDoc.embedPng(squareImageBuffer);
        page.drawImage(squareImage1, {
          x: 488,
          y: height - 347,
          width: 66,
          height: 66,
        });

        page.drawText('MADE IN THAILAND', {
          x: 26,
          y: height - 393,
          size: fontSize,
          font: calibriFontBold,
        });

        // Second set of data
        page.drawText('STANLEY', {
          x: 26,
          y: height - 510,
          size: fontSize,
          font: calibriFontBold,
        });

        page.drawText(invoiceNo, {
          x: 26,
          y: height - 576,
          size: fontSize,
          font: calibriFontBold,
        });

        page.drawText(origin, {
          x: 26,
          y: height - 642,
          size: fontSize,
          font: calibriFontBold,
        });

        page.drawText(`C/No. ${i + 1} - ${qty}`, {
          x: 26,
          y: height - 708,
          size: fontSize,
          font: calibriFontBold,
        });

        // Second QR Code
        const qrCodeBuffer2 = Buffer.from(qrCodeDataURL2.split(',')[1], 'base64');
        const qrCodeImage2 = await pdfDoc.embedPng(qrCodeBuffer2);
        page.drawImage(qrCodeImage2, {
          x: 478,
          y: height - 538,
          width: 90,
          height: 90,
        });

        // Add square image below second QR code
        const squareImage2 = await pdfDoc.embedPng(squareImageBuffer);
        page.drawImage(squareImage2, {
          x: 488,
          y: height - 730,
          width: 66,
          height: 66,
        });

        page.drawText('MADE IN THAILAND', {
          x: 26,
          y: height - 774,
          size: fontSize,
          font: calibriFontBold,
        });
      }
    }
  }

  // Serialize the PDF to bytes
  const pdfBytes = await pdfDoc.save();

  // Return the PDF as a response
  return new NextResponse(pdfBytes, {
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename=export.pdf',
    },
  });
}
