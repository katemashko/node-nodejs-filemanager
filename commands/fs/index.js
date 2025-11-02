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

// ******** create file ********
async function add(newFileName) {
  if (!newFileName) {
    throw new Error("Invalid input");
  }

  const fullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    newFileName
  );

  if (await navigation.fileExists(fullFilePath)) {
    throw new Error("File already exists");
  }

  const newFile = await fsPromise.open(fullFilePath, "w");
  console.log(`File ${newFileName} was created successfully`);
  await newFile.close();
}

// ******** rename file ********
async function rn(filePath, newFileName) {
  if (!filePath || !newFileName) {
    throw new Error("Invalid input");
  }

  const oldFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    filePath
  );

  // C:\Users\katem\hello.txt
  // privet.txt
  const newFilePath = path.resolve(path.dirname(oldFilePath), newFileName);

  if (!(await navigation.fileExists(oldFilePath))) {
    throw new Error("File does not exist");
  }

  await fsPromise.rename(oldFilePath, newFilePath);
  console.log("File was renamed successfully");
}

export { add, cat, rn };
