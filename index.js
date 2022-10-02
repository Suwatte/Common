const json = require("./package.json");
const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");
function main() {
  const out = path.join(process.cwd(), "public");

  // Bundle Libraries
  fs.rmSync(out, { recursive: true, force: true });
  shelljs.exec(
    "browserify -o ./public/lib.js -r cheerio -r crypto-js -r he -r lodash -r moment"
  );

  // Generate Versioning
  const data = JSON.stringify({
    version: json.version,
    timestamp: new Date(),
    file: "lib.js",
  });
  const versioningPath = path.join(out, "versioning.json");
  fs.writeFileSync(versioningPath, data);
}

main();
