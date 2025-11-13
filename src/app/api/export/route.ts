import QRCode from 'qrcode';
import * as ExcelJS from 'exceljs';
import { NextResponse } from 'next/server';
import CreateSquareImage from '../../../function/squareImage'

export async function POST(request: Request) {
  const { invoiceNo, origin, qty, size } = await request.json();

  const workbook = new ExcelJS.Workbook();

  // Create a white square image with a black border

  const squareImageBuffer = CreateSquareImage(100, 'black', 'white'); // Adjust size as needed

  if (size == 'Large') {
    for (let i = 1; i <= qty; i++) {
      // Create two identical sheets for each qty
      for (let j = 1; j <= 2; j++) {
        const qrCodeText = `${invoiceNo}\r${i}`;
        const qrCodeDataURL = await QRCode.toDataURL(qrCodeText);
  
        const worksheet = workbook.addWorksheet(`${i}-${j}`, {
          pageSetup: {
            paperSize: 9,
            orientation: size === 'Large' ? 'landscape' : 'portrait',
          },
        });
        let fontStyle;
        if(origin.length > 18){
           fontStyle = { name: 'Calibri', size: 60, bold: true };
        }else{
           fontStyle = { name: 'Calibri', size: 66, bold: true };
        }

  
        worksheet.addRow([]);
  
        worksheet.getCell('A2').value = 'STANLEY';
        worksheet.getCell('A2').font = fontStyle;
  
        worksheet.getCell('A3').value = invoiceNo;
        worksheet.getCell('A3').font = fontStyle;
  
        worksheet.getCell('A4').value = origin;
        worksheet.getCell('A4').font = fontStyle;
  
        worksheet.getCell('A5').value = `C/NO. ${i} - ${qty}`;
        worksheet.getCell('A5').font = fontStyle;
  
        const qrCodeBuffer = Buffer.from(qrCodeDataURL.split(',')[1], 'base64');
        const qrCodeImageId = workbook.addImage({
          buffer: qrCodeBuffer,
          extension: 'png',
        });
  
        worksheet.addImage(qrCodeImageId, {
          tl: { col: 4.5, row: 0.9 },
          ext: { width: 150, height: 150 },
        });
  
        // Add the white square with black border below the QR code
        const squareImageId = workbook.addImage({
          buffer: squareImageBuffer,
          extension: 'png',
        });
  
        worksheet.addImage(squareImageId, {
          tl: { col: 4.75, row: 5 }, // Adjust row position based on your layout
          ext: { width: 112, height: 112 },
        });
  
        worksheet.getCell('A6').value = 'MADE IN THAILAND';
        worksheet.getCell('A6').font = fontStyle;
  
        worksheet.getColumn(1).width = 40;
        worksheet.getColumn(2).width = 35;
        worksheet.getRow(1).height = 50;
        worksheet.getRow(2).height = 80;
        worksheet.getRow(6).height = 80;
      }
    }


  } else if (size == 'Small') {


    for (let i = 1; i <= qty; i + 2) {

      for(let n=0 ; n < 2 ; n++){

   

      // Generate QR Codes
      const qrCodeText1 = `${invoiceNo}\r${i}`;
      const qrCodeDataURL1 = await QRCode.toDataURL(qrCodeText1);

      const qrCodeText2 = `${invoiceNo}\r${i + 1}`;
      const qrCodeDataURL2 = await QRCode.toDataURL(qrCodeText2);

      

      // Create a new worksheet

      let sheetName = `${i} - ${i + 1}`;
        if(n ==1){
          sheetName = sheetName+ ' COPY'
        }




      const worksheet = workbook.addWorksheet(sheetName, {
        pageSetup: {
          paperSize: 9, // A4 size
          orientation: 'portrait', // Portrait orientation
          margins: {
            top: 0.25, // Top margin in inches
            left: 0.25, // Left margin in inches
            bottom: 0.25, // Bottom margin in inches
            right: 0.25, // Right margin in inches
            header: 0.5, // Header margin in inches
            footer: 0.5, // Footer margin in inches
          }
        },
      });

      let fontStyle;
      if(origin.length > 18){
         fontStyle = { name: 'Calibri', size: 47, bold: true };
      }else{
         fontStyle = { name: 'Calibri', size: 54, bold: true };
      }



      // Add the first set of data
      worksheet.getCell('A2').value = 'STANLEY';
      worksheet.getCell('A2').font = fontStyle;

      worksheet.getCell('A3').value = invoiceNo;
      worksheet.getCell('A3').font = fontStyle;

      worksheet.getCell('A4').value = origin;
      worksheet.getCell('A4').font = fontStyle;

      worksheet.getCell('A5').value = `C/No. ${i} - ${qty}`;
      worksheet.getCell('A5').font = fontStyle;

      // Add the first QR Code
      const qrCodeBuffer1 = Buffer.from(qrCodeDataURL1.split(',')[1], 'base64');
      const imageId1 = workbook.addImage({
        buffer: qrCodeBuffer1,
        extension: 'png',
      });

      worksheet.addImage(imageId1, {
        tl: { col: 2.5, row: 1.5 }, // Adjust the position
        ext: { width: 112, height: 112 },
      });

        // Add the white square with black border below the QR code
        const squareImageId = workbook.addImage({
          buffer: squareImageBuffer,
          extension: 'png',
        });
  
        worksheet.addImage(squareImageId, {
          tl: { col: 2.7, row: 4.5 }, // Adjust row position based on your layout
          ext: { width: 86, height: 86 },
        });
  

      worksheet.getCell('A6').value = 'MADE IN THAILAND';
      worksheet.getCell('A6').font = fontStyle;

      // Add the second set of data below the first set
      const rowOffset = 8;

      worksheet.getCell(`A${2 + rowOffset}`).value = 'STANLEY';
      worksheet.getCell(`A${2 + rowOffset}`).font = fontStyle;

      worksheet.getCell(`A${3 + rowOffset}`).value = invoiceNo;
      worksheet.getCell(`A${3 + rowOffset}`).font = fontStyle;

      worksheet.getCell(`A${4 + rowOffset}`).value = origin;
      worksheet.getCell(`A${4 + rowOffset}`).font = fontStyle;

      worksheet.getCell(`A${5 + rowOffset}`).value = `C/No. ${i + 1} - ${qty}`;
      worksheet.getCell(`A${5 + rowOffset}`).font = fontStyle;

      // Add the second QR Code
      const qrCodeBuffer2 = Buffer.from(qrCodeDataURL2.split(',')[1], 'base64');
      const imageId2 = workbook.addImage({
        buffer: qrCodeBuffer2,
        extension: 'png',
      });

      worksheet.addImage(imageId2, {
        tl: { col: 2.5, row: 1 + rowOffset },
        ext: { width: 112, height: 112 },
      });

      
        // Add the white square with black border below the QR code
        const squareImageId2 = workbook.addImage({
          buffer: squareImageBuffer,
          extension: 'png',
        });
  
        worksheet.addImage(squareImageId2, {
          tl: { col: 2.7, row: 4 + rowOffset }, // Adjust row position based on your layout
          ext: { width: 86, height: 86 },
        });

      worksheet.getCell(`A${6 + rowOffset}`).value = 'MADE IN THAILAND';
      worksheet.getCell(`A${6 + rowOffset}`).font = fontStyle;

      // Set column width and row height
      worksheet.getColumn(1).width = 40;
      worksheet.getColumn(2).width = 35;
      worksheet.getRow(1).height = 50;
      worksheet.getRow(2).height = 80;
      worksheet.getRow(6).height = 80;

    }
      i = i + 2;
    }




  }

  const buffer = await workbook.xlsx.writeBuffer();

  return new NextResponse(buffer, {
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename=export.xlsx',
    },
  });
}
