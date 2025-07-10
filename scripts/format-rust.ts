// `cargo fmt` does not work when run outside of a Rust project directory.
// not even with --manifest-path rng_tools/Cargo.toml

import { spawn } from "child_process";
import path from "path";

const check = process.argv.includes("--check");

const args = check ? ["fmt", "--check"] : ["fmt"];

const cwd = path.join(__dirname, "..", "rng_tools");
const cmd = spawn("cargo", args, { stdio: "inherit", cwd });

cmd.on("exit", (code) => process.exit(code));
