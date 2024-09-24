// | ---- Libraries 📦 ---- |
import fs from "fs";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import multer from "multer";
import pdfExtractor from "./utils/pdfExtractor";
import PDFDocument from "pdfkit";
// | ---- Configs & Setups ⚒️ ---- |
dotenv.config();
const upload = multer({ dest: "uploads/" });
// | ---- Typings 📝 ---- |
import { RequiredExtractedData } from "./typings/all";

// | ---- App ✨ ---- |
const app = express();
const port: number = parseInt(process.env.APP_PORT || "4000", 10);
app.get("/", (req: Request, res: Response) => {
  res.json({
    message: `Welcome to ${process.env.APP_NAME} app's API endpoint 👋`,
  });
});
app.post(
  "/uploads",
  upload.single("file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded ⚠️" });
    }

    try {
      const filePath = req.file.path;
      const originalFileName = req.file.originalname;
      const requiredExtractedData: RequiredExtractedData = await pdfExtractor(
        filePath
      );

      const outputPDFPath = `processed/extracted-${originalFileName}.pdf`;
      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(outputPDFPath);
      doc.pipe(writeStream);
      doc.text("Hello World", 100, 100); // Adding "Hello World" text to the PDF
      doc.end();

      writeStream.on("finish", () => {
        res.json({
          success: true,
          data: {
            raw: requiredExtractedData,
            downloadURL: `/download/${outputPDFPath}`,
          },
        });

        fs.unlinkSync(filePath); // Delete the uploaded file
      });
    } catch (error) {
      console.error("Error processing PDF:", error);
      res.status(500).json({ error: "Failed to process PDF" });
    }
  }
);
app.get("/download/:filePath", (req: Request, res: Response) => {
  const filePath = req.params.filePath;

  res.download(filePath, "processed.pdf", (err) => {
    if (err) {
      console.error("Error sending file:", err);
      res.status(500).send("Failed to download the file.");
    }
  });
});

app.listen(port, () => {
  console.log(`PDF Extractor API Run on port: ${port} | 📜 `);
});
