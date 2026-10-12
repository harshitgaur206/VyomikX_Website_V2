import QRCode from "qrcode"
import sharp from "sharp"
import jsQR from "jsqr"
import fs from "fs"
import path from "path"

async function run() {
  const upiUrl = "upi://pay?pa=mr.professor2770@okhdfcbank&pn=Nigam%20Chaudhary&aid=uGICAgKDzhtPBMg"

  // 1. Generate high-resolution base QR code (1024x1024)
  const qrBuffer = await QRCode.toBuffer(upiUrl, {
    errorCorrectionLevel: "H",
    type: "png",
    margin: 2,
    width: 1024,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  })

  // 2. Center badge dimensions (keep small enough for 30% error correction tolerance)
  // At 1024x1024, a 160x160 circular badge covers only ~2.4% of total area, guaranteeing 100% scan rate.
  const badgeSize = 160
  const badgeSvg = Buffer.from(`
    <svg width="${badgeSize}" height="${badgeSize}" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <circle cx="50" cy="50" r="48" fill="#ffffff" stroke="#cbd5e1" stroke-width="2.5"/>
      <!-- Crisp GPay multi-color badge -->
      <path d="M43.7 20.3C42.8 17.5 40.8 15.2 38.2 13.9L17.5 3.3C12.1 0.5 5.5 2.7 2.7 8.1 -0.1 13.5 2.1 20.1 7.5 22.9L28.2 33.5C29.6 34.2 31.1 34.6 32.7 34.6 36.3 34.6 39.8 32.8 41.7 29.5 44.5 24.8 44.1 21.8 43.7 20.3Z" transform="translate(18, 22) scale(0.65)" fill="#4285F4"/>
      <path d="M81.5 28.5L61.6 18.3C56.2 15.5 49.6 17.7 46.8 23.1L45.8 25C44.4 27.6 44 30.6 44.8 33.5 45.6 36.4 47.6 38.7 50.2 40L70.1 50.2C71.5 50.9 73 51.3 74.6 51.3 78.2 51.3 81.7 49.5 83.6 46.2 86.4 41.5 86 38.5 85.6 37 84.7 34.2 83.5 31.5 81.5 28.5Z" transform="translate(18, 22) scale(0.65)" fill="#34A853"/>
      <path d="M70.1 50.2L50.2 40C47.6 38.7 45.6 36.4 44.8 33.5 44 30.6 44.4 27.6 45.8 25L41.7 29.5C39.8 32.8 36.3 34.6 32.7 34.6 31.1 34.6 29.6 34.2 28.2 33.5L20.8 47.5C18 52.9 20.2 59.5 25.6 62.3L45.5 72.5C46.9 73.2 48.4 73.6 50 73.6 53.6 73.6 57.1 71.8 59 68.5L72.2 45.7C71.6 47.3 70.9 48.8 70.1 50.2Z" transform="translate(18, 22) scale(0.65)" fill="#FBBC04"/>
      <path d="M70.1 50.2C70.9 48.8 71.6 47.3 72.2 45.7L83.6 46.2C81.7 49.5 78.2 51.3 74.6 51.3 73 51.3 71.5 50.9 70.1 50.2Z" transform="translate(18, 22) scale(0.65)" fill="#EA4335"/>
    </svg>
  `)

  const finalPng = await sharp(qrBuffer)
    .composite([{ input: badgeSvg, gravity: "center" }])
    .png({ compressionLevel: 9 })
    .toBuffer()

  // 3. Verify scan reliability with jsQR
  const raw = await sharp(finalPng).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const decoded = jsQR(new Uint8ClampedArray(raw.data), raw.info.width, raw.info.height)
  console.log("Decoded URI:", decoded?.data)

  if (decoded && decoded.data === upiUrl) {
    fs.writeFileSync("public/donate/upi-qr.png", finalPng)
    console.log("Successfully wrote 1024x1024 crystal clear public/donate/upi-qr.png!")
  } else {
    // Fallback: save pure QR without badge if decoding failed
    fs.writeFileSync("public/donate/upi-qr.png", qrBuffer)
    console.log("Saved pure high-res QR without badge to ensure 100% scan compatibility.")
  }
}

run().catch(console.error)

