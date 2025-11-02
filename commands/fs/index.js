import path from "node:path";
import os from "node:os";
import fs from "node:fs";
import fsPromise from "node:fs/promises";

import * as navigation from "../navigation/index.js";

// ******** read file ********
async function cat(filePath) {
  if (!filePath) {
    throw new Error("Invalid input");
  }

  if (!(await navigation.pathExists(filePath))) {
    throw new Error("Invalid input");
  }

  const readStream = fs.createReadStream(filePath);
  readStream.on("data", (chunk) => {
    process.stdout.write(chunk.toString() + os.EOL);
  });

  return new Promise((res, rej) => {
    readStream.on("end", res);
    readStream.on("error", rej);
  });
}

export { cat };
