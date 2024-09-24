import fs from "fs";
import {
  PDFExtract,
  PDFExtractOptions,
  PDFExtractResult,
} from "pdf.js-extract";
import {
  ContentItem,
  TransformedItem,
  RequiredExtractedData,
} from "../typings/all";

const pdfExtractor = (filePath: string): Promise<RequiredExtractedData> => {
  const pdfExtract = new PDFExtract();
  const options: PDFExtractOptions = {
    firstPage: 1,
    verbosity: -1,
    normalizeWhitespace: false,
    disableCombineTextItems: false,
  };

  const dataBuffer: Buffer = fs.readFileSync(filePath);

  return new Promise((resolve, reject) => {
    pdfExtract.extractBuffer(
      dataBuffer,
      options,
      (err: Error | null, data: PDFExtractResult | undefined) => {
        if (err) {
          reject(err);
          return;
        }
        const rawContentData = data?.pages[0]?.content;
        if (!rawContentData) {
          reject(new Error("No data found in PDF"));
          return;
        }
        const transformedContentData: TransformedItem[] = rawContentData
          .filter(
            (item: ContentItem) =>
              item.str !== "" && item.str !== " " && item.str !== ":"
          )
          .map((item: ContentItem, index: number) => ({
            index: index + 1,
            text: item.str,
            position: {
              x: item.x,
              y: item.y,
            },
            dimensions: {
              width: item.width,
              height: item.height,
            },
          }));
        const requiredExtractedData: RequiredExtractedData = {
          "BUKTI PEMOTONGAN/PEMUNGUTAN": {
            "H.1 Nomor:": "",
            "H.2 Pembetulan Ke-": "",
          },
          "A. IDENTITAS WAJIB PAJAK YANG DIPOTONG/DIPUNGUT": {
            "A.1 NPWP": "",
            "A.2 NIK": "",
            "A.3 NITKU": "",
            "A.4 Nama": "",
          },
          "B. PAJAK PENGHASILAN YANG DIPOTONG/DIPUNGUT": {
            "B.1 Masa-Pajak (mm-yyyy)": "",
            "B.2 Kode Objek Pajak": "",
            "B.3 Dasar Pengenaan Pajak (Rp)": "",
            "B.4 Dikenakana Tarif Lebih Tinggi (Tidak memiliki NPWP)": "",
            "B.5 Tarif (%)": "",
            "B.6 PPh yang Dipotong/Dipungut/DTP (Rp)": "",
            "Keterangan Kode Objek Pajak": "",
            "B.7 Dokumen Referensi": {
              "Nomor Dokumen": "",
              "Nama Dokumen": "",
              Tanggal: "",
            },
            "B.8 Dokumen Referensi untuk Faktur Pajak, apabila ada:": {
              "Nomor Faktur Pajak": "",
              Tanggal: "",
            },
            "B.9 PPh dibebankan berdasarkan Surat Keterangan Bebas (SKB)": {
              Nomor: "",
              Tanggal: "",
            },
            "B.10 Ph yang ditanggung oleh Pemerintah (DTP) berdasarkan :": "",
            "B.11 PPh dalam hal transaksi menggunakan Surat Keterangan berdasarkan PP Nomor 23 Tahun 2018 dengan Nomor :":
              "",
            "B.12 PPh yang dipotong/dipungut yang diberikan fasilitas PPh berdasarkan: ":
              "",
          },
          "C. IDENTITAS PEMOTONG/PEMUNGUT": {
            "C.1 NPWP": transformedContentData
              .filter((item) => item.position.y === 514.37)
              .map((item) => item.text)
              .join(""),
            "C.2 NITKU": transformedContentData
              .filter(
                (item) => item.position.y === 529.37 && item.text !== "C.2"
              )
              .map((item) => item.text)
              .join(""),
            "C.3 Nama Wajib Pajak": transformedContentData[39]?.text || "",
            "C.4 Tanggal": "",
            "C.5 Nama Penandatangan": transformedContentData[43]?.text || "",
          },
        };

        resolve(requiredExtractedData);
      }
    );
  });
};

export default pdfExtractor;
