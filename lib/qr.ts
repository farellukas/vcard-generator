import { toString } from "qrcode";

export async function createQR(data: string) {
  const qr = await toString(data);
  return qr;
}

export function encodeSVG(data: string) {
  return `data:image/svg+xml;utf8,${encodeURIComponent(data)}`;
}
