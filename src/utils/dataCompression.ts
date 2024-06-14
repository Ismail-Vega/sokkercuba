const zlib = require("zlib");
const flatted = require("flatted");

// Function to compress data using zlib (asynchronous)
export async function compressData(data: any): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    try {
      const jsonString = flatted.stringify(data);
      zlib.gzip(jsonString, (err, compressedData) => {
        if (err) {
          reject(err);
        } else {
          resolve(compressedData);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

// Function to decompress data and parse it to JSON (asynchronous)
export async function decompressAndParse(buffer: Buffer) {
  return new Promise((resolve, reject) => {
    try {
      zlib.gunzip(
        buffer,
        (err: any, decompressedData: { toString: (arg0: string) => any }) => {
          if (err) {
            reject(err);
          } else {
            const jsonString = decompressedData.toString("utf-8");
            const parsedData = flatted.parse(jsonString);
            resolve(parsedData);
          }
        }
      );
    } catch (error) {
      reject(error);
    }
  });
}
