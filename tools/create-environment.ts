import 'dotenv/config'

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

const c = [
  `export const environment = {`,
  `articleRootUrl: 'https://magurouhiru.github.io/mysite/',`,
  `};`
]
const strs = envs.map((env) => format(env))
c.push(...strs)

import {writeFile} from 'node:fs/promises'

writeFile("src/environments/environment.ts",c.join("\n"));
