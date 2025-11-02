import path from "node:path";
import os from "node:os";
import fs from "node:fs/promises";

const homeDirectory = os.homedir();
let currentWorkingDirectory = homeDirectory;
const rootDirectory = path.parse(homeDirectory).root;

//  ******** current ********
function getCurrentWorkingDirectory() {
  return currentWorkingDirectory;
}

function showCurrentWorkingDirectory() {
  console.log(`You are currently in ${currentWorkingDirectory}`);
}

//  ******** up ********
function up() {
  if (currentWorkingDirectory !== rootDirectory) {
    const parentDirectory = path.resolve(currentWorkingDirectory, "..");
    currentWorkingDirectory = parentDirectory;
  } else {
    console.log("You are already at root directory");
  }
}

//  ******** cd ********
async function cd(cdPath) {
  if (!cdPath) {
    throw new Error("Invalid input");
  }

  const changedWorkingDirectory = path.isAbsolute(cdPath)
    ? path.resolve(cdPath)
    : path.resolve(currentWorkingDirectory, cdPath);

  if (changedWorkingDirectory === rootDirectory) {
    console.log("You are already at root directory");
  }

  if (!(await pathExists(changedWorkingDirectory))) {
    throw new Error("Invalid input");
  }
  currentWorkingDirectory = changedWorkingDirectory;
}

// ******** list ********

async function ls() {
  const directories = [];
  const files = [];
  const directoryItems = await fs.readdir(currentWorkingDirectory);

  for (const directoryItem of directoryItems) {
    const itemPath = path.join(currentWorkingDirectory, directoryItem);
    const stat = await fs.stat(itemPath);

    if (!stat.isDirectory()) {
      directories.push(directoryItem);
    } else {
      files.push(directoryItem);
    }
  }

  directories.sort();
  files.sort();

  console.log("----\t----\t\t ----");
  console.log("(index)\tType\t\t Name");

  let index = 0;
  directories.forEach((dir) => {
    console.log(`${index++}\t"directory"\t ${dir}`);
  });
  files.forEach((file) => {
    console.log(`${index++}\t"file"     \t ${file}`);
  });
}

// ******** path exists ********
async function pathExists(itemPath) {
  try {
    await fs.access(itemPath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

// ******** file exists ********
async function fileExists(fileName) {
  try {
    await fs.access(fileName, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export {
  cd,
  fileExists,
  getCurrentWorkingDirectory,
  ls,
  pathExists,
  showCurrentWorkingDirectory,
  up,
};
