import path from "node:path";
import os from "node:os";
import fs from "node:fs/promises";

const homeDirectory = os.homedir();
let currentWorkingDirectory = homeDirectory;
const rootDirectory = path.parse(homeDirectory).root;

function getCurrentWorkingDirectory() {
  return currentWorkingDirectory;
}

function showCurrentWorkingDirectory() {
  console.log(`You are currently in ${currentWorkingDirectory}`);
}

function up() {
  if (currentWorkingDirectory !== rootDirectory) {
    const parentDirectory = path.resolve(currentWorkingDirectory, "..");
    currentWorkingDirectory = parentDirectory;
  } else {
    console.log("You are already at root directory");
  }
}

async function cd(cdPath) {
  if (!cdPath) {
    throw new Error("Invalid input");
  }

  const changedWorkingDirectory = path.resolve(currentWorkingDirectory, cdPath);
  currentWorkingDirectory = changedWorkingDirectory;
}

export { cd, getCurrentWorkingDirectory, showCurrentWorkingDirectory, up };
