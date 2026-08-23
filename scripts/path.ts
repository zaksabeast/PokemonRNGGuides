import path from "node:path";
import url from "node:url";

const toNative = (posixPath: string) => posixPath.split("/").join(path.sep);
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
export const toNativeAbsolute = (posixPath: string) =>
  path.resolve(__dirname, toNative(posixPath));
