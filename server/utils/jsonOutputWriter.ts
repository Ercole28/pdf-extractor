import fs from "fs";

const jsonOutputWriter = (filePath: string, data: any): void => {
  const jsonData: string = JSON.stringify(data, null, 2);

  try {
    fs.writeFileSync(filePath, jsonData);
    console.log(`File saved into ✅: ${filePath}`);
  } catch (error) {
    console.error("Error writing to file ❌:", error);
  }
};

export default jsonOutputWriter;
