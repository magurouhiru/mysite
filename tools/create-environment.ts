import 'dotenv/config'

const arg = process.argv[2];
console.log(arg)

function format(env: string) {
  return `const ${env}='${process.env[env]}';`
}

const envs = [
  "FIREBASECONFIG_APIKEY",
  "FIREBASECONFIG_AUTHDOMAIN",
  "FIREBASECONFIG_PROJECTID",
  "FIREBASECONFIG_STORAGEBUCKET",
  "FIREBASECONFIG_MESSAGINGSENDERID",
  "FIREBASECONFIG_APPID",
  "FIREBASECONFIG_MEASUREMENTID",
]

const targetDirs = ["src","environments"];
let targetFile = "";
let pre = `
export const FIREBASECONFIG = {
  apiKey: FIREBASECONFIG_APIKEY,
  authDomain: FIREBASECONFIG_AUTHDOMAIN,
  projectId: FIREBASECONFIG_PROJECTID,
  storageBucket: FIREBASECONFIG_STORAGEBUCKET,
  messagingSenderId: FIREBASECONFIG_MESSAGINGSENDERID,
  appId: FIREBASECONFIG_APPID,
  measurementId: FIREBASECONFIG_MEASUREMENTID,
};
`

switch (arg) {
  case "development":
    targetFile = "environment.development.ts";
    pre = pre + `
import {connectStorageEmulator, getStorage} from "@angular/fire/storage";

export const environment = {
  articleRootUrl: 'http://localhost:4200/',
  storage: () => {
    const storage = getStorage();
    connectStorageEmulator(storage, 'localhost', 9199);
    return storage;
  },
};
`
    break;
  case "production":
    targetFile = "environment.ts";
    pre = pre + `
import {getStorage} from "@angular/fire/storage";

export const environment = {
  articleRootUrl: 'http://localhost:4200/',
  storage: getStorage,
};
`
    break;
}

const strs = envs.map((env) => format(env))
strs.push(pre)

import {writeFile, mkdir} from 'node:fs/promises'
import {join} from 'node:path'

mkdir(join(...targetDirs), {recursive:true}).then(() => {
  writeFile(join(...targetDirs,targetFile),strs.join("\n"))
})
