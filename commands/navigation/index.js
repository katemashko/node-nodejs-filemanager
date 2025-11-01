import path from "node:path";
import os from "node:os";

const homeDirectory = os.homedir();
let currentWorkingDirectory = homeDirectory;
const rootDirectory = path.parse(homeDirectory).root;

function getCurrentWorkingDirectory() {
  return currentWorkingDirectory;
}

function showCurrentWorkingDirectory() {
  console.log(`You are currently in ${currentWorkingDirectory}`);
}

async function cd(cdPath) {
  if (!cdPath) {
    throw new Error("Invalid input");
  }
}

export { cd, getCurrentWorkingDirectory, showCurrentWorkingDirectory };
