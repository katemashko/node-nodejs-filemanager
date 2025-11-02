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

// ******** copy file ********
async function cp(sourceFilePath, newDirectoryPath) {
  if (!sourceFilePath || !newDirectoryPath) {
    throw new Error("Invalid input");
  }

  const sourceFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    sourceFilePath
  );

  const newFullDirectoryPath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    newDirectoryPath
  );

  if (!(await navigation.fileExists(sourceFullFilePath))) {
    throw new Error("File does not exist");
  }
  if (await navigation.fileExists(newFullDirectoryPath)) {
    throw new Error("File already exists");
  }

  return new Promise((res, rej) => {
    const readStream = fs.createReadStream(sourceFullFilePath);
    const writeStream = fs.createWriteStream(newFullDirectoryPath);

    readStream.on("error", rej);
    writeStream.on("error", rej);
    writeStream.on("finish", res);

    readStream.pipe(writeStream);
  });
}

// ******** move file ********
async function mv(sourceFilePath, newDirectoryPath) {
  if (!sourceFilePath || !newDirectoryPath) {
    throw new Error("Invalid input");
  }

  const sourceFullFilePath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    sourceFilePath
  );

  const newFullDirectoryPath = path.resolve(
    navigation.getCurrentWorkingDirectory(),
    newDirectoryPath
  );

  if (!(await navigation.fileExists(sourceFullFilePath))) {
    throw new Error("File does not exist");
  }
  if (await navigation.fileExists(newFullDirectoryPath)) {
    throw new Error("File already exists");
  }

  return new Promise((res, rej) => {
    const readStream = fs.createReadStream(sourceFullFilePath);
    const writeStream = fs.createWriteStream(newFullDirectoryPath);

    readStream.on("error", rej);
    writeStream.on("error", rej);
    writeStream.on("finish", () => {
      console.log(
        `File ${sourceFullFilePath} was moved to ${newFullDirectoryPath}`
      );
      fsPromise.unlink(sourceFilePath);
      res();
    });

    readStream.pipe(writeStream);
  });
}

// ******** delete file ********
async function rm(filePath) {
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

  await fsPromise.unlink(fullFilePath);
  console.log("File was deleted");
}

export { add, cat, cp, mv, rn, rm };
