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
                "H.1 Nomor:": "2000002350",
                "H.2 Pembetulan Ke-": "0"
            },
            "A": {
                "A.1 NPWP": "027957026019000",
                "A.2 NIK": "",
                "A.3 Nama": "SENTRAL MITRA INFORMATIKA Tbk"
            },
            "B": {
                "B.1 Masa-Pajak (mm-yyyy)": "03-2023",
                "B.2 Kode Objek Pajak": "24-100-02",
                "B.3 Dasar Pengenaan Pajak (Rp)": "2,030,000",
                "B.4 Dikenakan Tarif Lebih Tinggi (Tidak memiliki NPWP)": "",
                "B.5 Tarif (%)": "2.00",
                "B.6 PPh yang Dipotong/Dipungut/DTP (Rp)": "40,600",
                "B.7 Dokumen Referensi": {
                    "Nomor Dokumen": "",
                    "Nama Dokumen": "",
                    "Tanggal": ""
                },
                "B.8 Dokumen Referensi untuk Faktur Pajak, apabila ada:": {
                    "Nomor Faktur Pajak": "0100012386501338",
                    "Tanggal": "01-03-2023"
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
                "C.1 NPWP": "011405081092000",
                "C.2 Nama Wajib Pajak": "SARIHUSADA GENERASI MAHARDHIKA",
                "C.3 Tanggal": "08-03-2023",
                "C.4 Nama Penandatangan": "VERA GALUH SUGIJANTO"
            }
        },
        "downloadURL": "localhost:4000/download/extracted-62375150-e953-4968-ab27-06e65e0762b0-new-sample.pdf"
    }
}
```

**B. RUN LOCAL EXTRACTION**

```bash
ts-node test/generateOutputFromSample.ts
```

You can add your pdf file into test directory and change this code block, by default it's new-sample.pdf:

```typescript
const dataBuffer: Buffer = fs.readFileSync("test/new-sample.pdf");
```

The result will showed up on the terminal with a specific format, here's is example the result:

```bash
Required Extracted Data ✨: 
 {
  H: { 'H.1 Nomor:': '2000002350', 'H.2 Pembetulan Ke-': '0' },
  A: {
    'A.1 NPWP': '027957026019000',
    'A.2 NIK': '',
    'A.3 Nama': 'SENTRAL MITRA INFORMATIKA Tbk'
  },
  B: {
    'B.1 Masa-Pajak (mm-yyyy)': '03-2023',
    'B.2 Kode Objek Pajak': '24-100-02',
    'B.3 Dasar Pengenaan Pajak (Rp)': '2,030,000',
    'B.4 Dikenakan Tarif Lebih Tinggi (Tidak memiliki NPWP)': '',
    'B.5 Tarif (%)': '2.00',
    'B.6 PPh yang Dipotong/Dipungut/DTP (Rp)': '40,600',
    'B.7 Dokumen Referensi': { 'Nomor Dokumen': '', 'Nama Dokumen': '', Tanggal: '' },
    'B.8 Dokumen Referensi untuk Faktur Pajak, apabila ada:': { 'Nomor Faktur Pajak': '0100012386501338', Tanggal: '01-03-2023' },
    'B.9 PPh dibebankan berdasarkan Surat Keterangan Bebas (SKB)': { Nomor: '', Tanggal: '' },
    'B.10 Ph yang ditanggung oleh Pemerintah (DTP) berdasarkan :': '',
    'B.11 PPh dalam hal transaksi menggunakan Surat Keterangan berdasarkan PP Nomor 23 Tahun 2018 dengan Nomor :': '',
    'B.12 PPh yang dipotong/dipungut yang diberikan fasilitas PPh berdasarkan: ': ''
  },
  C: {
    'C.1 NPWP': '011405081092000',
    'C.2 Nama Wajib Pajak': 'SARIHUSADA GENERASI MAHARDHIKA',
    'C.3 Tanggal': '08-03-2023',
    'C.4 Nama Penandatangan': 'VERA GALUH SUGIJANTO'
  }
}
```
