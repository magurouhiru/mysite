import 'dotenv/config'

const arg = process.argv[2];
console.log(arg)

let target = "";
const r = [];

switch (arg) {
  case "development":
    target = "./src/environments/environment.development.ts";
    r.push(...[`export const environment = {`,
      `articleRootUrl: 'http://localhost:4200/',`,
      `};`,
    ]);
    break;
  case "production":
    target = "./src/environments/environment.ts";
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

import {writeFile} from 'node:fs/promises'

writeFile(target,r.join("\n"),{flag:"w+"});
