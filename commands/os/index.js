import os, { cpus } from "node:os";

const allowedArguments = [
  "--EOL",
  "--cpus",
  "--homedir",
  "--username",
  "--architecture",
];

async function executeOsCommand(arg) {
  //   unknown arg
  if (!allowedArguments.includes(arg)) {
    throw new Error("Unexpected os argument");
  }

  if (arg === "--EOL") {
    getEOL();
  }

  if (arg === "--cpus") {
    getCpu();
  }

  if (arg === "--homedir") {
    getHomeDir();
  }

  if (arg === "--username") {
    getSystemUsername();
  }

  if (arg === "--architecture") {
    getCpuArchitecture();
  }
}

// ******** EOL ********
function getEOL() {
  const osEOL = os.EOL;
  console.log(`System EOL: ${JSON.stringify(osEOL)}`);
}

// ******** cpus ********
function getCpu() {
  const cpus = os.cpus();
  console.log(`Overall amount of CPUs: ${cpus.length}`);

  cpus.forEach((cpu, i) => {
    console.log(
      `CPU ${i + 1}: CPU model ${cpu.model.trim()}; CPU speed ${(
        cpu.speed / 1000
      ).toFixed(2)} GHz`
    );
  });
}

// ******** homedir ********
function getHomeDir() {
  const homeDir = os.homedir();
  console.log(`Home directory ${homeDir}`);
}

// ******** system username ********
function getSystemUsername() {
  const systemUserInfo = os.userInfo();
  console.log(`System username: ${systemUserInfo.username}`);
}

// ******** cpu architecture  ********
function getCpuArchitecture() {
  const cpuArchitecture = os.arch();
  console.log(`CPU architecture: ${cpuArchitecture}`);
}

export {
  getEOL,
  getHomeDir,
  getCpu,
  getCpuArchitecture,
  getSystemUsername,
  executeOsCommand,
};
