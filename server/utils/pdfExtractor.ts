// | ---- Libraries 📦 ---- |
import fs from "fs";
import {
  PDFExtract,
  PDFExtractOptions,
  PDFExtractResult,
} from "pdf.js-extract";
// | ---- Utils ⚒️ ---- |
import getValueWithCoordinateRange from "../utils/getValueWithCoordinateRange";
// | ---- Typings 📝 ---- |
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

        // Process & Log the Required Extracted Data
        const requiredExtractedData: RequiredExtractedData = {
          H: {
            "H.1 Nomor:": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 225.05,
              x2: 327.05,
              y1: 72.4,
              y2: 84.4,
              separator: "",
            }),
            "H.2 Pembetulan Ke-": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 234.05,
              x2: 246.05,
              y1: 87.5,
              y2: 99.5,
              separator: "",
            }),
          },
          A: {
            "A.1 NPWP": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 101.78,
              y1: 120.8,
              y2: 132.8,
              separator: "",
            }),
            "A.2 NIK": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 103.5,
              y1: 164.5,
              y2: 176.5,
              separator: "",
            }),
            "A.3 Nama": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 102,
              y1: 146.8,
              y2: 158.8,
              separator: "",
            }),
          },
          B: {
            "B.1 Masa-Pajak (mm-yyyy)": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 37.32,
              x2: 49.32,
              y1: 218.8,
              y2: 224.8,
              separator: "",
            }),
            "B.2 Kode Objek Pajak": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 106.27,
              x2: 130.27,
              y1: 218.8,
              y2: 224.8,
              separator: "",
            }),
            "B.3 Dasar Pengenaan Pajak (Rp)": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 205.72,
              x2: 229.72,
              y1: 218.8,
              y2: 224.8,
              separator: "",
            }),
            "B.4 Dikenakan Tarif Lebih Tinggi (Tidak memiliki NPWP)": "",
            "B.5 Tarif (%)": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 376.72,
              x2: 400.72,
              y1: 218.8,
              y2: 224.8,
              separator: "",
            }),
            "B.6 PPh yang Dipotong/Dipungut/DTP (Rp)":
              getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 474.27,
                x2: 498.27,
                y1: 218.8,
                y2: 224.8,
                separator: "",
              }),
            "B.7 Dokumen Referensi": {
              "Nomor Dokumen": "",
              "Nama Dokumen": "",
              Tanggal: "",
            },
            "B.8 Dokumen Referensi untuk Faktur Pajak, apabila ada:": {
              "Nomor Faktur Pajak": getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 113,
                x2: 160,
                y1: 276.9,
                y2: 300.9,
                separator: "",
              }),
              Tanggal:
                getValueWithCoordinateRange({
                  data: transformedContentData,
                  x2ValueUnknown: false,
                  x1: 357.78,
                  x2: 379.78,
                  y1: 282.9,
                  y2: 294.9,
                  separator: "",
                  sort: true,
                }) +
                "-" +
                getValueWithCoordinateRange({
                  data: transformedContentData,
                  x2ValueUnknown: false,
                  x1: 417.78,
                  x2: 433.78,
                  y1: 282.9,
                  y2: 294.9,
                  separator: "",
                  sort: true,
                }) +
                "-" +
                getValueWithCoordinateRange({
                  data: transformedContentData,
                  x2ValueUnknown: false,
                  x1: 472.78,
                  x2: 508.78,
                  y1: 282.9,
                  y2: 294.9,
                  separator: "",
                  sort: true,
                }),
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
          C: {
            "C.1 NPWP": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 173.78,
              y1: 385.9,
              y2: 398.9,
              separator: "",
              sort: true,
            }),
            "C.2 Nama Wajib Pajak": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 182,
              y1: 395.9,
              y2: 407.9,
              separator: "",
            }),
            "C.3 Tanggal":
              getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 173.78,
                x2: 195.78,
                y1: 405.9,
                y2: 417.9,
                separator: "",
                sort: true,
              }) +
              "-" +
              getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 206.78,
                x2: 228.78,
                y1: 405.9,
                y2: 417.9,
                separator: "",
              }) +
              "-" +
              getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 238.78,
                x2: 280.78,
                y1: 405.9,
                y2: 417.9,
                separator: "",
                sort: true,
              }),
            "C.4 Nama Penandatangan": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 176,
              y1: 415.9,
              y2: 427.9,
              separator: "",
            }),
          },
        };

        resolve(requiredExtractedData);
      }
    );
  });
};

export default pdfExtractor;
