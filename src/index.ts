import * as core from "@actions/core"
import JSON5 from "json5"
import fs from "fs"
import util from "util"
const readFileAsync = util.promisify(fs.readFile)

function getNestedObject(nestedObj: any, pathArr: string[]) {
  return pathArr.reduce(
    (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
    nestedObj
  )
}

async function run() {
  const path: string = core.getInput("path"),
    prop: string[] = core.getInput("prop_path").split(".")
  try {
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
