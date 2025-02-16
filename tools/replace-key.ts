import 'dotenv/config'

const arg = process.argv[2];
console.log(arg)

function getReplaceTarget() {
  const target = "YOUR_API_KEY_GOES_HERE";
  return {from:target,to:'"'+process.env[target]+'"'}
}

const targetDirs = ["dist","mysite","browser"];
const targetFile = "index.html";

const str = getReplaceTarget();

import {writeFile, readFile} from 'node:fs/promises'
import {join} from 'node:path'

readFile(join(...targetDirs,targetFile),{ encoding: 'utf8' }).then((v)=>{
  writeFile(join(...targetDirs,targetFile),v.replace(str.from, str.to ?? ""),{ encoding: 'utf8' })
})
