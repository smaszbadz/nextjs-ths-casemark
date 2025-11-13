import { createCanvas } from 'canvas';

function CreateSquareImage(size: number, borderColor: string, backgroundColor: string): Buffer {
  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  // Fill the background
  ctx.fillStyle = backgroundColor;
  ctx.fillRect(0, 0, size, size);

  // Draw the border
  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, size, size);

  return canvas.toBuffer('image/png');
}

export default  CreateSquareImage