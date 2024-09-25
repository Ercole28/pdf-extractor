// | ---- Libraries 📦 ---- |
import fs from "fs";
import dotenv from "dotenv";
import express, { Request, Response } from "express";
import cors from "cors";
import multer from "multer";
import pdfExtractor from "./utils/pdfExtractor";
import PDFDocument from "pdfkit";
import { v4 as uuidv4 } from "uuid";
// | ---- Configs & Setups ⚒️ ---- |
dotenv.config();
const upload = multer({ dest: "uploads/" });
// | ---- Typings 📝 ---- |
import { RequiredExtractedData } from "./typings/all";

// | ---- App ✨ ---- |
const app = express();
const port: number = parseInt(process.env.APP_PORT || "4000", 10);
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: `Welcome to ${process.env.APP_NAME} app's API endpoint 👋`,
  });
});
app.post(
  "/extract-pdf",
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

      const outputPDFPath = `extracted-${uuidv4()}-${
        originalFileName.split(".")[0]
      }.pdf`;

      const doc = new PDFDocument();
      const writeStream = fs.createWriteStream(`processed/${outputPDFPath}`);
      doc.pipe(writeStream);

      // Formatting Docs 📄
      doc.font("Helvetica-Bold").fontSize(16).text("REQUIRED EXTRACTED DATA", {
        align: "center",
      });
      // Section H
      doc
        .moveDown()
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("H. BUKTI PEMOTONGAN/PEMUNGUTAN");
      doc
        .font("Helvetica")
        .text(`H.1 Nomor: ${requiredExtractedData.H["H.1 Nomor:"]}`, {
          indent: 20,
        });
      doc
        .font("Helvetica")
        .text(
          `H.2 Pembetulan Ke-: ${requiredExtractedData.H["H.2 Pembetulan Ke-"]}`,
          {
            indent: 20,
          }
        );
      // Section A
      doc
        .moveDown()
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("A. IDENTITAS WAJIB PAJAK YANG DIPOTONG/DIPUNGUT");
      doc
        .font("Helvetica")
        .text(`A.1 NPWP: ${requiredExtractedData.A["A.1 NPWP"]}`, {
          indent: 20,
        });
      doc
        .font("Helvetica")
        .text(`A.2 NIK: ${requiredExtractedData.A["A.2 NIK"]}`, {
          indent: 20,
        });
      doc
        .font("Helvetica")
        .text(`A.3 Nama: ${requiredExtractedData.A["A.3 Nama"]}`, {
          indent: 20,
        });
      // Section B
      doc
        .moveDown()
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("B. PAJAK PENGHASILAN YANG DIPOTONG/DIPUNGUT");
      doc
        .font("Helvetica")
        .text(
          `B.1 Masa-Pajak (mm-yyyy): ${requiredExtractedData.B["B.1 Masa-Pajak (mm-yyyy)"]}`,
          {
            indent: 20,
          }
        );
      doc
        .font("Helvetica")
        .text(
          `B.2 Kode Objek Pajak: ${requiredExtractedData.B["B.2 Kode Objek Pajak"]}`,
          {
            indent: 20,
          }
        );
      doc
        .font("Helvetica")
        .text(
          `B.3 Dasar Pengenaan Pajak (Rp): ${requiredExtractedData.B["B.3 Dasar Pengenaan Pajak (Rp)"]}`,
          { indent: 20 }
        );
      doc
        .font("Helvetica")
        .text(
          `B.4 Dikenakan Tarif Lebih Tinggi: ${requiredExtractedData.B["B.4 Dikenakan Tarif Lebih Tinggi (Tidak memiliki NPWP)"]}`,
          { indent: 20 }
        );
      doc
        .font("Helvetica")
        .text(`B.5 Tarif (%): ${requiredExtractedData.B["B.5 Tarif (%)"]}`, {
          indent: 20,
        });
      doc
        .font("Helvetica")
        .text(
          `B.6 PPh yang Dipotong/Dipungut/DTP (Rp): ${requiredExtractedData.B["B.6 PPh yang Dipotong/Dipungut/DTP (Rp)"]}`,
          { indent: 20 }
        );
      // Nested B.7 to B.12
      doc.font("Helvetica").text("B.7 Dokumen Referensi:", { indent: 20 });
      doc
        .font("Helvetica")
        .text(
          `- Nomor Dokumen: ${requiredExtractedData.B["B.7 Dokumen Referensi"]["Nomor Dokumen"]}`,
          { indent: 40 }
        );
      doc
        .font("Helvetica")
        .text(
          `- Nama Dokumen: ${requiredExtractedData.B["B.7 Dokumen Referensi"]["Nama Dokumen"]}`,
          { indent: 40 }
        );
      doc
        .font("Helvetica")
        .text(
          `- Tanggal: ${requiredExtractedData.B["B.7 Dokumen Referensi"]["Tanggal"]}`,
          {
            indent: 40,
          }
        );

      doc
        .font("Helvetica")
        .text("B.8 Dokumen Referensi untuk Faktur Pajak:", { indent: 20 });
      doc
        .font("Helvetica")
        .text(
          `- Nomor Faktur Pajak: ${requiredExtractedData.B["B.8 Dokumen Referensi untuk Faktur Pajak, apabila ada:"]["Nomor Faktur Pajak"]}`,
          { indent: 40 }
        );
      doc
        .font("Helvetica")
        .text(
          `- Tanggal: ${requiredExtractedData.B["B.8 Dokumen Referensi untuk Faktur Pajak, apabila ada:"]["Tanggal"]}`,
          { indent: 40 }
        );

      doc
        .font("Helvetica")
        .text("B.9 PPh dibebankan berdasarkan SKB:", { indent: 20 });
      doc
        .font("Helvetica")
        .text(
          `- Nomor: ${requiredExtractedData.B["B.9 PPh dibebankan berdasarkan Surat Keterangan Bebas (SKB)"]["Nomor"]}`,
          { indent: 40 }
        );
      doc
        .font("Helvetica")
        .text(
          `- Tanggal: ${requiredExtractedData.B["B.9 PPh dibebankan berdasarkan Surat Keterangan Bebas (SKB)"]["Tanggal"]}`,
          { indent: 40 }
        );

      doc
        .font("Helvetica")
        .text(
          `B.10 PPh yang ditanggung oleh Pemerintah (DTP): ${requiredExtractedData.B["B.10 Ph yang ditanggung oleh Pemerintah (DTP) berdasarkan :"]}`,
          { indent: 20 }
        );
      doc
        .font("Helvetica")
        .text(
          `B.11 PPh berdasarkan PP Nomor 23 Tahun 2018: ${requiredExtractedData.B["B.11 PPh dalam hal transaksi menggunakan Surat Keterangan berdasarkan PP Nomor 23 Tahun 2018 dengan Nomor :"]}`,
          { indent: 20 }
        );
      doc
        .font("Helvetica")
        .text(
          `B.12 Fasilitas PPh: ${requiredExtractedData.B["B.12 PPh yang dipotong/dipungut yang diberikan fasilitas PPh berdasarkan: "]}`,
          { indent: 20 }
        );

      // Section C
      doc
        .moveDown()
        .font("Helvetica-Bold")
        .fontSize(10)
        .text("C. IDENTITAS PEMOTONG/PEMUNGUT");
      doc
        .font("Helvetica")
        .text(`C.1 NPWP: ${requiredExtractedData.C["C.1 NPWP"]}`, {
          indent: 20,
        });
      doc
        .font("Helvetica")
        .text(
          `C.2 Nama Wajib Pajak: ${requiredExtractedData.C["C.2 Nama Wajib Pajak"]}`,
          {
            indent: 20,
          }
        );
      doc
        .font("Helvetica")
        .text(`C.3 Tanggal: ${requiredExtractedData.C["C.3 Tanggal"]}`, {
          indent: 20,
        });
      doc
        .font("Helvetica")
        .text(
          `C.4 Nama Penandatangan: ${requiredExtractedData.C["C.4 Nama Penandatangan"]}`,
          {
            indent: 20,
          }
        );

      doc.end();

      writeStream.on("finish", () => {
        res.json({
          success: true,
          data: {
            raw: requiredExtractedData,
            downloadURL: `${process.env.APP_URL}/download/${outputPDFPath}`,
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
  const filePath = `processed/${req.params.filePath}`;
  console.log("File Path 🗃️", filePath);

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
