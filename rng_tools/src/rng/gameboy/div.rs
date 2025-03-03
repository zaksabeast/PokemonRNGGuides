const DIV_CYCLE_LENGTH: usize = 0x4000;

const DIV_INCREMENTS: [u8; 16] = [
    0x12, 0x12, 0x12, 0x13, 0x12, 0x12, 0x13, 0x12, 0x12, 0x13, 0x12, 0x12, 0x13, 0x12, 0x12, 0x13,
];

const ADJUSTED_INDEXES: [usize; 6] = [0x8, 0x9, 0x562, 0x563, 0x22b5, 0x22b6];

fn div_increment(index: usize) -> u8 {
    let is_adjusted = ADJUSTED_INDEXES.iter().any(|&i| i == index);
    let expected_increment = DIV_INCREMENTS[index % 16];
    match (is_adjusted, expected_increment) {
        (true, 0x12) => 0x13,
        (true, 0x13) => 0x12,
        _ => expected_increment,
    }
}

#[derive(Debug, Clone)]
pub struct Div {
    index: usize,
    value: u8,
}

impl Div {
    pub fn new(index: usize, value: u8) -> Self {
        Self { index, value }
    }

    pub fn current_increment(&self) -> u8 {
        div_increment(self.index)
    }

    pub fn next(&mut self) {
        let increment = self.current_increment();
        self.value = self.value.wrapping_add(increment);
        self.index = (self.index + 1) % DIV_CYCLE_LENGTH;
    }

    pub fn value(&self) -> u8 {
        self.value
    }

    pub fn index(&self) -> usize {
        self.index
    }

    pub fn set_value(&mut self, value: u8) {
        self.value = value;
    }

    pub fn set_index(&mut self, index: usize) {
        self.index = index;
    }

    pub fn decrement_index(&mut self, value: usize) {
        self.index = self.index.wrapping_sub(value) % DIV_CYCLE_LENGTH;
    }
}
