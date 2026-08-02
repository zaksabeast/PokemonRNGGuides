fn main() -> anyhow::Result<()> {
    let args: Vec<String> = std::env::args().collect();
    let json_dir = args.get(1).map(String::as_str).unwrap_or("json");
    let out_path = args
        .get(2)
        .map(String::as_str)
        .unwrap_or("src/generators/gen4/wild/generated_wild4.rs");

    rng_tools::generators::gen4::wild::gen_wild4::run(json_dir, out_path)
}
