import fs from "fs/promises";
import path from "node:path";
import { promisify } from "node:util";
import globModule from "glob";

const glob = promisify(globModule);

export function copyFiles({ src, dest }) {
  return {
    name: "copy-files",
    hooks: {
      "astro:build:start": async () => {
        try {
          // Get the list of files
          const files = await glob(`${src}/**/*.{png,jpg,jpeg,gif,webp}`, {
            nodir: true,
          });

          if (!Array.isArray(files)) {
            console.error("Expected an array of file paths, but got:", files);
            throw new Error("Glob did not return an array of file paths.");
          }

          // Ensure destination directory exists
          await fs.mkdir(dest, { recursive: true });

          // Copy each file to the destination
          await Promise.all(
            files.map(async (file) => {
              const destPath = path.join(dest, path.relative(src, file));
              await fs.copyFile(file, destPath);
            }),
          );

          console.log(`Successfully copied ${files.length} files to ${dest}`);
        } catch (err) {
          console.error("Error during file copy:", err);
          throw err;
        }
      },
    },
  };
}
