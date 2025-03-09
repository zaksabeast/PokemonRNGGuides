pub fn gen3_shiny(pid: u32, tid: u16, sid: u16) -> bool {
    let pidh = (pid >> 16) as u16;
    let pidl = pid as u16;
    let psv = (pidh ^ pidl) >> 3;
    let tsv = (tid ^ sid) >> 3;

    psv == tsv
}
