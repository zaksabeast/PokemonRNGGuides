pub fn gen3_tsv(tid: u16, sid: u16) -> u16 {
    (tid ^ sid) >> 3
}

pub fn gen3_psv(pid: u32) -> u16 {
    let pidh = (pid >> 16) as u16;
    let pidl = pid as u16;
    (pidh ^ pidl) >> 3
}

pub fn gen3_shiny(pid: u32, tid: u16, sid: u16) -> bool {
    gen3_psv(pid) == gen3_tsv(tid, sid)
}

pub fn gen6_tsv(tid: u16, sid: u16) -> u16 {
    (tid ^ sid) >> 4
}

pub fn gen6_psv(pid: u32) -> u16 {
    let pidh = (pid >> 16) as u16;
    let pidl = pid as u16;
    (pidh ^ pidl) >> 4
}

#[derive(Clone, Copy, Debug, Eq, PartialEq)]
pub enum ShinyType {
    Star,
    Square,
    NotShiny,
}
