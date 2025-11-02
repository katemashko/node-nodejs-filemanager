import fs from "node:fs";
import zlib from "node:zlib";
import path from "node:path";
import { pipeline } from "node:stream";
import { promisify } from "node:util";

import * as navigation from "../navigation/index.js";

// ******** compress ********
const asyncPipeline = promisify(pipeline);

async function compress(sourceFilePath, newDestinationPath) {
  if (!sourceFilePath || !newDestinationPath) {
    throw new Error("Invalid input");
  }

  const sourceFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    sourceFilePath
  );

  //   C:\Users\katem\hallo.txt C:\Users\katem\hallo.txt.br
  const newFullDestinationPath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    newDestinationPath
  );

  if (!(await navigation.fileExists(sourceFullFilePath))) {
    throw new Error("Source file does not exist");
  }

  if (await navigation.fileExists(newFullDestinationPath)) {
    throw new Error("File already exists");
  }

  const brotli = zlib.createBrotliCompress();
  const sourceFile = fs.createReadStream(sourceFullFilePath);
  const destinationFile = fs.createWriteStream(newFullDestinationPath);

  await asyncPipeline(sourceFile, brotli, destinationFile);
  console.log(`File was compressed to ${newFullDestinationPath}`);
}

// ******** decompress ********
async function decompress(sourceFilePath, newDestinationPath) {
  if (!sourceFilePath || !newDestinationPath) {
    throw new Error("Invalid input");
  }

  const sourceFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    sourceFilePath
  );

  const newFullDestinationPath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    newDestinationPath
  );

  if (!(await navigation.fileExists(sourceFullFilePath))) {
    throw new Error("Source file does not exist");
  }

  if (await navigation.fileExists(newFullDestinationPath)) {
    throw new Error("File already exists");
  }

  const brotli = zlib.createBrotliDecompress();
  const sourceFile = fs.createReadStream(sourceFullFilePath);
  const destinationFile = fs.createWriteStream(newFullDestinationPath);

  await asyncPipeline(sourceFile, brotli, destinationFile);
  console.log(`File was decompressed to ${newFullDestinationPath}`);
}

export { compress, decompress };
