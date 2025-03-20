use crate::{gen3_psv, gen3_tsv, gen6_psv, gen6_tsv};
use serde::{Deserialize, Serialize};
use tsify_next::Tsify;
use wasm_bindgen::prelude::*;

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum IdFilter {
    Tid(u16),
    Sid(u16),
    Tsv(u16),
    Pid(u32),
    TidSid { tid: u16, sid: u16 },
    TidPid { tid: u16, pid: u32 },
}

impl IdFilter {
    pub fn filter_gen3(&self, tid: u16, sid: u16) -> bool {
        match self {
            IdFilter::Tid(self_tid) => tid == *self_tid,
            IdFilter::Sid(self_sid) => sid == *self_sid,
            IdFilter::Tsv(self_tsv) => gen3_tsv(tid, sid) == *self_tsv,
            IdFilter::Pid(self_pid) => gen3_tsv(tid, sid) == gen3_psv(*self_pid),
            IdFilter::TidPid {
                tid: self_tid,
                pid: self_pid,
            } => tid == *self_tid && gen3_tsv(tid, sid) == gen3_psv(*self_pid),
            IdFilter::TidSid {
                tid: self_tid,
                sid: self_sid,
            } => tid == *self_tid && sid == *self_sid,
        }
    }

    pub fn filter_gen6(&self, tid: u16, sid: u16) -> bool {
        match self {
            IdFilter::Tid(self_tid) => tid == *self_tid,
            IdFilter::Sid(self_sid) => sid == *self_sid,
            IdFilter::Tsv(self_tsv) => gen6_tsv(tid, sid) == *self_tsv,
            IdFilter::Pid(self_pid) => gen6_tsv(tid, sid) == gen6_psv(*self_pid),
            IdFilter::TidPid {
                tid: self_tid,
                pid: self_pid,
            } => tid == *self_tid && gen6_tsv(tid, sid) == gen6_psv(*self_pid),
            IdFilter::TidSid {
                tid: self_tid,
                sid: self_sid,
            } => tid == *self_tid && sid == *self_sid,
        }
    }
}
