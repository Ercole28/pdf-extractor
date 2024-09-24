# **TECHNICAL TEST PT.SISI REPOSITORY**

This repository is made for technical test from PT.Sinergi Informatika Semen Indonesia (PT.SISI) in order to screening job applicants. The goal of this test is to able to make an simple app that can be able to extract PDF file with a specific format which is "Proof of Tax Deduction for Purchasing Goods".

It must be build with NodeJS for BE and any kind of JS Frameworks for FE.

## **CLIENT 💻**

**CHANGE TO DIRECTORY**

```bash
cd client
```

**INSTALL DEPEDENCIES & PACKAGES**

```bash
npm install
```

**RUN APP**

```bash
npm run dev
```

## **SERVER 🗃️**

**CHANGE TO DIRECTORY**

```bash
cd server
```

**INSTALL DEPEDENCIES & PACKAGES**

```bash
npm install
```

There are two type to run this app either you want to run it as API or LOCAL you can choose what you want depends on what you prefer:

**A. RUN API SERVER**

```bash
npm start
```

Example API Result of /extract-pdf route:

```json
{
    "success": true,
    "data": {
        "raw": {
            "H": {
                "H.1 Nomor:": "3000000010",
                "H.2 Pembetulan Ke-": "0"
            },
            "A": {
                "A.1 NPWP": "704511111011000/0704511111011000",
                "A.2 NIK": "",
                "A.3 NITKU": "0704511111011000000000",
                "A.4 Nama": "SINERGI INFORMATIKA SEMEN INDONESIA"
            },
            "B": {
                "B.1 Masa-Pajak (mm-yyyy)": "8-2024",
                "B.2 Kode Objek Pajak": "24-104-24",
                "B.3 Dasar Pengenaan Pajak (Rp)": "1.948.650,00",
                "B.4 Dikenakan Tarif Lebih Tinggi (Tidak memiliki NPWP)": "",
                "B.5 Tarif (%)": "2.00",
                "B.6 PPh yang Dipotong/Dipungut/DTP (Rp)": "38.973,00",
                "B.7 Dokumen Referensi": {
                    "Nomor Dokumen": "",
                    "Nama Dokumen": "",
                    "Tanggal": ""
                },
                "B.8 Dokumen Referensi untuk Faktur Pajak, apabila ada:": {
                    "Nomor Faktur Pajak": "010.006-24.22222222",
                    "Tanggal": "24-08-2024"
                },
                "B.9 PPh dibebankan berdasarkan Surat Keterangan Bebas (SKB)": {
                    "Nomor": "",
                    "Tanggal": ""
                },
                "B.10 Ph yang ditanggung oleh Pemerintah (DTP) berdasarkan :": "",
                "B.11 PPh dalam hal transaksi menggunakan Surat Keterangan berdasarkan PP Nomor 23 Tahun 2018 dengan Nomor :": "",
                "B.12 PPh yang dipotong/dipungut yang diberikan fasilitas PPh berdasarkan: ": ""
            },
            "C": {
                "C.1 NPWP": "929333330303000/0929333330303000",
                "C.2 NITKU": "0929333330303000000000",
                "C.3 Nama Wajib Pajak": "JAYA RAYA",
                "C.4 Tanggal": "01-90-2024",
                "C.5 Nama Penandatangan": "HARTONO"
            }
        },
        "downloadURL": "localhost:4000/download/extracted-cb72e211-95a8-4a57-9817-2166825caf8d-sample-processed.pdf"
    }
}
```

**B. RUN LOCAL EXTRACTION**

```bash
ts-node test/generateOutputFromSample.ts
```

You can add your pdf file into test directory and change this code block, by default it's sample.pdf:

```typescript
const dataBuffer: Buffer = fs.readFileSync("test/sample.pdf");
```

The result will showed up on the terminal with a specific format, here's is example the result:

```bash
Required Extracted Data ✨: 
 {
  H: { 'H.1 Nomor:': '3000000010', 'H.2 Pembetulan Ke-': '0' },
  A: {
    'A.1 NPWP': '704511111011000/0704511111011000',
    'A.2 NIK': '',
    'A.3 NITKU': '0704511111011000000000',
    'A.4 Nama': 'SINERGI INFORMATIKA SEMEN INDONESIA'
  },
  B: {
    'B.1 Masa-Pajak (mm-yyyy)': '8-2024',
    'B.2 Kode Objek Pajak': '24-104-24',
    'B.3 Dasar Pengenaan Pajak (Rp)': '1.948.650,00',
    'B.4 Dikenakan Tarif Lebih Tinggi (Tidak memiliki NPWP)': '',
    'B.5 Tarif (%)': '2.00',
    'B.6 PPh yang Dipotong/Dipungut/DTP (Rp)': '38.973,00',
    'B.7 Dokumen Referensi': { 'Nomor Dokumen': '', 'Nama Dokumen': '', Tanggal: '' },
    'B.8 Dokumen Referensi untuk Faktur Pajak, apabila ada:': {
      'Nomor Faktur Pajak': '010.006-24.22222222',
      Tanggal: '24-08-2024'
    },
    'B.9 PPh dibebankan berdasarkan Surat Keterangan Bebas (SKB)': { Nomor: '', Tanggal: '' },
    'B.10 Ph yang ditanggung oleh Pemerintah (DTP) berdasarkan :': '',
    'B.11 PPh dalam hal transaksi menggunakan Surat Keterangan berdasarkan PP Nomor 23 Tahun 2018 dengan Nomor :': '',
    'B.12 PPh yang dipotong/dipungut yang diberikan fasilitas PPh berdasarkan: ': ''
  },
  C: {
    'C.1 NPWP': '929333330303000/0929333330303000',
    'C.2 NITKU': '0929333330303000000000',
    'C.3 Nama Wajib Pajak': 'JAYA RAYA',
    'C.4 Tanggal': '01-90-2024',
    'C.5 Nama Penandatangan': 'HARTONO'
  }
}
```
