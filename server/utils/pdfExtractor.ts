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
              x1: 248.85,
              x2: 367.9,
              y1: 92.7,
              y2: 104.7,
              separator: "",
            }),
            "H.2 Pembetulan Ke-": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 278.38,
              x2: 290.38,
              y1: 109.7,
              y2: 121.7,
              separator: "",
            }),
          },
          A: {
            "A.1 NPWP": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 103.5,
              y1: 148.5,
              y2: 160.5,
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
            "A.3 NITKU": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 103.5,
              y1: 179.5,
              y2: 191.5,
              separator: "",
            }),
            "A.4 Nama": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 103.5,
              y1: 195.5,
              y2: 207.5,
              separator: " ",
            }),
          },
          B: {
            "B.1 Masa-Pajak (mm-yyyy)": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 40,
              x2: 70,
              y1: 285.5,
              y2: 301.5,
              separator: "",
            }),
            "B.2 Kode Objek Pajak": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 110,
              x2: 161,
              y1: 285.5,
              y2: 301.5,
              separator: "",
            }),
            "B.3 Dasar Pengenaan Pajak (Rp)": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 197.85,
              x2: 257.85,
              y1: 285.5,
              y2: 301.5,
              separator: "",
            }),
            "B.4 Dikenakan Tarif Lebih Tinggi (Tidak memiliki NPWP)": "",
            "B.5 Tarif (%)": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 400.68,
              x2: 425.68,
              y1: 285.5,
              y2: 301.5,
              separator: "",
            }),
            "B.6 PPh yang Dipotong/Dipungut/DTP (Rp)":
              getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 478.2,
                x2: 538.2,
                y1: 285.5,
                y2: 301.5,
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
                x1: 122,
                x2: 190,
                y1: 362.6,
                y2: 374.6,
                separator: "",
              }),
              Tanggal:
                getValueWithCoordinateRange({
                  data: transformedContentData,
                  x2ValueUnknown: false,
                  x1: 362.4,
                  x2: 386.4,
                  y1: 362.6,
                  y2: 374.6,
                  separator: "",
                }) +
                "-" +
                getValueWithCoordinateRange({
                  data: transformedContentData,
                  x2ValueUnknown: false,
                  x1: 421.42,
                  x2: 445.42,
                  y1: 362.6,
                  y2: 374.6,
                  separator: "",
                }) +
                "-" +
                getValueWithCoordinateRange({
                  data: transformedContentData,
                  x2ValueUnknown: false,
                  x1: 482.45,
                  x2: 530.45,
                  y1: 362.6,
                  y2: 374.6,
                  separator: "",
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
              x1: 172.83,
              y1: 508.37,
              y2: 520.37,
              separator: "",
            }),
            "C.2 NITKU": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 178.83,
              y1: 523.37,
              y2: 535.37,
              separator: "",
            }),
            "C.3 Nama Wajib Pajak": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: true,
              x1: 172.83,
              y1: 538.37,
              y2: 550.37,
              separator: "",
            }),
            "C.4 Tanggal":
              getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 183,
                x2: 201,
                y1: 554,
                y2: 566,
                separator: "",
              }) +
              "-" +
              getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 226,
                x2: 250,
                y1: 554,
                y2: 566,
                separator: "",
              }) +
              "-" +
              getValueWithCoordinateRange({
                data: transformedContentData,
                x2ValueUnknown: false,
                x1: 277,
                x2: 325,
                y1: 554,
                y2: 566,
                separator: "",
              }),
            "C.5 Nama Penandatangan": getValueWithCoordinateRange({
              data: transformedContentData,
              x2ValueUnknown: false,
              x1: 172.83,
              x2: 184.83,
              y1: 564.4,
              y2: 578.4,
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
