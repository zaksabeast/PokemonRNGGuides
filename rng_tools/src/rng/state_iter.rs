use super::Rng;

pub struct StateIterator<T> {
    rng: T,
}

impl<T: Rng + Clone> StateIterator<T> {
    pub fn new(rng: T) -> Self {
        Self { rng }
    }
}

impl<T: Rng + Clone> Iterator for StateIterator<T> {
    type Item = T;

    fn next(&mut self) -> Option<T> {
        let current = Some(self.rng.clone());
        self.rng.next();
        current
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[derive(Clone)]
    struct FakeRng {
        state: u32,
    }

    impl Rng for FakeRng {}

    impl Iterator for FakeRng {
        type Item = u32;

        fn next(&mut self) -> Option<Self::Item> {
            self.state = self.state.wrapping_add(1);
            Some(self.state)
        }
    }

    #[test]
    fn demo_state_iterator() {
        let result: Vec<u32> = StateIterator::new(FakeRng { state: 0 })
            .skip(0)
            .take(3)
            .map(|rng| {
                // Use the rng at the current state here
                // This will return the current rng, just for demo purposes
                rng.state
            })
            .collect();

        assert_eq!(result, [0x00000000, 0x00000001, 0x00000002]);
    }
}
