pub fn gen34_tsv(tid: u16, sid: u16) -> u16 {
    (tid ^ sid) >> 4
}

pub fn gen34_psv(pid: u32) -> u16 {
    let pidh = (pid >> 16) as u16;
    let pidl = pid as u16;
    (pidh ^ pidl) >> 4
}

pub fn gen3_shiny(pid: u32, tid: u16, sid: u16) -> bool {
    let pidh = (pid >> 16) as u16;
    let pidl = pid as u16;
    let psv = (pidh ^ pidl) >> 3;
    let tsv = (tid ^ sid) >> 3;

    psv == tsv
}
