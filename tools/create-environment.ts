import 'dotenv/config'

const arg = process.argv[2];
console.log(arg)

const targetDirs = ["src","environments"];
let targetFile = "";
const r:string[] = [];

switch (arg) {
  case "development":
    targetFile = "environment.development.ts";
    r.push(...[`export const environment = {`,
      `articleRootUrl: 'http://localhost:4200/',`,
      `};`,
    ]);
    break;
  case "production":
    targetFile = "environment.ts";
    r.push(...[`export const environment = {`,
      `articleRootUrl: 'https://magurouhiru.github.io/mysite/',`,
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
 return `export const ${env}='${process.env[env]}';`
}

const strs = envs.map((env) => format(env))
r.push(...strs)

import {writeFile, mkdir} from 'node:fs/promises'
import {join} from 'node:path'

mkdir(join(...targetDirs), {recursive:true}).then(() => {
  writeFile(join(...targetDirs,targetFile),r.join("\n"))
})
