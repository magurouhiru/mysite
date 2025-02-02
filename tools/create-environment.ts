import 'dotenv/config'

const arg = process.argv[2];
console.log(arg)

const targetDirs = ["src","environments"];
let targetFile = "";
const r = [
  `export const FIREBASECONFIG = {`,
    `apiKey: FIREBASECONFIG_APIKEY,`,
    `authDomain: FIREBASECONFIG_AUTHDOMAIN,`,
    `projectId: FIREBASECONFIG_PROJECTID,`,
    `storageBucket: FIREBASECONFIG_STORAGEBUCKET,`,
    `messagingSenderId: FIREBASECONFIG_MESSAGINGSENDERID,`,
    `appId: FIREBASECONFIG_APPID,`,
    `measurementId: FIREBASECONFIG_MEASUREMENTID,`,
  `};`,
];

switch (arg) {
  case "development":
    targetFile = "environment.development.ts";
    r.push(...[`export const environment = {`,
      `articleRootUrl: 'http://localhost:4200/',`,
      `useEmulators: true,`,
      `};`,
    ]);
    break;
  case "production":
    targetFile = "environment.ts";
    r.push(...[`export const environment = {`,
      `articleRootUrl: 'https://magurouhiru.github.io/mysite/',`,
      `useEmulators: false,`,
      `};`,
    ]);
    break;
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

function format(env: string) {
 return `const ${env}='${process.env[env]}';`
}

const strs = envs.map((env) => format(env))
strs.push(...r)

import {writeFile, mkdir} from 'node:fs/promises'
import {join} from 'node:path'

mkdir(join(...targetDirs), {recursive:true}).then(() => {
  writeFile(join(...targetDirs,targetFile),strs.join("\n"))
})
