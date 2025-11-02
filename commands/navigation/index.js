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

// ******** path exists ********
async function pathExists(itemPath) {
  try {
    await fs.access(itemPath, fs.constants.F_OK);
    return true;
  } catch (error) {
    return false;
  }
}

export { cd, getCurrentWorkingDirectory, showCurrentWorkingDirectory, up };
