import fs from "node:fs";
import crypto from "crypto";
import path from "node:path";

import * as navigation from "../navigation/index.js";

async function hash(filePath) {
  if (!filePath) {
    throw new Error("Invalid input");
  }

  const fullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    filePath
  );

  if (!(await navigation.fileExists(fullFilePath))) {
    throw new Error("File does not exist");
  }

  const hash = crypto.createHash("SHA256");
  const readFileStream = fs.createReadStream(fullFilePath);

  readFileStream.on("data", (chunk) => {
    hash.update(chunk);
  });

  return new Promise((res, rej) => {
    readFileStream.on("end", () => {
      const hashHex = hash.digest("hex");
      console.log(`Hash: ${hashHex}`);
      res();
    });
    readFileStream.on("error", rej);
  });
}

export { hash };
