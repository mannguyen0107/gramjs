const { exec } = require("child_process");
const fs = require("fs");
const tsc = exec("tsc");
tsc.on("close", (code) => {
  if (code === 0) {
    fs.copyFileSync("package.json", "dist/package.json");
    fs.copyFileSync("README.md", "dist/README.md");
    fs.copyFileSync("LICENSE", "dist/LICENSE");
    fs.copyFileSync("gramjs/tl/api.d.ts", "dist/tl/api.d.ts");
    fs.copyFileSync("gramjs/define.d.ts", "dist/define.d.ts");
    const npm_publish = exec("npm publish", { cwd: "dist" });
    npm_publish.stdout.on("data", function (data) {
      console.log(data.toString());
    });

    npm_publish.stderr.on("data", function (data) {
      console.error(data.toString());
    });

    npm_publish.on("close", (code) => {
      if (code === 0) {
        console.log("=====================================");
        console.log("FINISHED UPLOADING");
        console.log("=====================================");
      } else {
        throw new Error("something went wrong");
      }
    });
  } else {
    throw new Error("Error happened");
  }
});
