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

// | ---- Extract PDF 🗃️ ---- |
const pdfExtract = new PDFExtract();
const options: PDFExtractOptions = {
  firstPage: 1,
  verbosity: -1,
  normalizeWhitespace: true,
  disableCombineTextItems: false,
};

const dataBuffer: Buffer = fs.readFileSync("test/sample.pdf");
pdfExtract.extractBuffer(
  dataBuffer,
  options,
  (err: Error | null, data: PDFExtractResult | undefined) => {
    if (err) {
      console.log(err);
      return;
    }
    const rawContentData = data?.pages[0]?.content;

    if (!rawContentData) {
      console.log("Data does not exist ❌");
      return;
    }

    // console.log("Raw Text 📝");
    // console.log(rawContentData);

    // Transform and Remove White Spaces & Blank Text
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
    // Convert into JSON & Store it on /output directory
    const jsonData: string = JSON.stringify(transformedContentData, null, 2);
    try {
      fs.writeFileSync("output/output.json", jsonData);
      console.log(`Data has been written to output/output.json`);
    } catch (error) {
      console.error("Error writing to file:", error);
    }

    // Conclusion ✨: From Observation of Comparing X and Y values and the sample file
    // 12x = 4 letters

    // Process & Log the Required Extracted Data
    const requiredExtractedData: RequiredExtractedData = {
      H: {
        "H.1 Nomor:": "",
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
        "B.6 PPh yang Dipotong/Dipungut/DTP (Rp)": getValueWithCoordinateRange({
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
          "Nomor Faktur Pajak": transformedContentData
            .filter(
              (item) =>
                item.position.y >= 362.6 &&
                item.position.y <= 374.6 &&
                item.position.x >= 122 &&
                item.position.x <= 190
            )
            .map((item) => item.text)
            .join(""),
          Tanggal:
            transformedContentData
              .filter(
                (item) =>
                  item.position.y >= 362.6 &&
                  item.position.y <= 374.6 &&
                  item.position.x >= 362.4 &&
                  item.position.x <= 386.4
              )
              .sort((a, b) => a.position.x - b.position.x)
              .map((item) => item.text)
              .join("") +
            "-" +
            transformedContentData
              .filter(
                (item) =>
                  item.position.y >= 362.6 &&
                  item.position.y <= 374.6 &&
                  item.position.x >= 421.42 &&
                  item.position.x <= 445.42
              )
              .sort((a, b) => a.position.x - b.position.x)
              .map((item) => item.text)
              .join("") +
            "-" +
            transformedContentData
              .filter(
                (item) =>
                  item.position.y >= 362.6 &&
                  item.position.y <= 374.6 &&
                  item.position.x >= 482.45 &&
                  item.position.x <= 530.45
              )
              .sort((a, b) => a.position.x - b.position.x)
              .map((item) => item.text)
              .join(""),
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
        "C.1 NPWP": transformedContentData
          .filter((item) => item.position.y === 514.37)
          .map((item) => item.text)
          .join(""),
        "C.2 NITKU": transformedContentData
          .filter((item) => item.position.y === 529.37 && item.text !== "C.2")
          .map((item) => item.text)
          .join(""),
        "C.3 Nama Wajib Pajak": transformedContentData[39]?.text || "",
        "C.4 Tanggal":
          transformedContentData
            .filter(
              (item) =>
                item.position.y >= 554 &&
                item.position.y <= 566 &&
                item.position.x >= 183 &&
                item.position.x <= 201
            )
            .sort((a, b) => a.position.x - b.position.x)
            .map((item) => item.text)
            .join("") +
          "-" +
          transformedContentData
            .filter(
              (item) =>
                item.position.y >= 554 &&
                item.position.y <= 566 &&
                item.position.x >= 226 &&
                item.position.x <= 250
            )
            .sort((a, b) => a.position.x - b.position.x)
            .map((item) => item.text)
            .join("") +
          "-" +
          transformedContentData
            .filter(
              (item) =>
                item.position.y >= 554 &&
                item.position.y <= 566 &&
                item.position.x >= 277 &&
                item.position.x <= 325
            )
            .sort((a, b) => a.position.x - b.position.x)
            .map((item) => item.text)
            .join(""),
        "C.5 Nama Penandatangan": transformedContentData[43]?.text || "",
      },
    };
    console.log("Required Extracted Data ✨: ", requiredExtractedData);
  }
);
