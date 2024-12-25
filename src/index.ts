import * as core from "@actions/core"
import JSON5 from "json5"
import { globSync } from "glob"
import Fs from "fs"
import util from "util"
const readFileAsync = util.promisify(Fs.readFile)

function getNestedObject(nestedObj: any, pathArr: string[]) {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  )
}

async function run() {
  try {
    const inputPath: string = core.getInput("path"),
      prop: string[] = core.getInput("prop_path").split(".")

    let path: string = inputPath
    if (!Fs.existsSync(path)) {
      const files = globSync(inputPath)
      if (files.length) {
        path = files[0]
      }

      if (!Fs.existsSync(path)) {
        throw Error(`${inputPath} did not match an exact file, nor did it match any file as a glob pattern`)
      }
    }

    const buffer = await readFileAsync(path),
      json = JSON5.parse(buffer.toString()),
      nestedProp = getNestedObject(json, prop)
    if (nestedProp) {
      core.setOutput("prop", nestedProp)
      core.setOutput("propStr", JSON5.stringify(nestedProp))
    } else {
      core.setFailed("no value found :(")
    }
  } catch (err) {
    core.setFailed(err instanceof Error ? err.message : "unknown error")
  }
}

run()
