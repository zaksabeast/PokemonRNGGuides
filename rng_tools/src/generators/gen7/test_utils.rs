use super::Timeline;

// Low 7 bits are not all 0, so an idle model doesn't blink.
pub(super) const NO_BLINK: u64 = 0b0000_0001;
// Low 7 bits are all 0, so an idle model blinks.
pub(super) const BLINK: u64 = 0b1000_0000;

pub(super) fn step_to_advance(timeline: &mut Timeline, advance: usize) {
    while timeline.current().advance < advance {
        timeline.step();
    }
    assert_eq!(timeline.current().advance, advance, "skipped {advance}");
}
