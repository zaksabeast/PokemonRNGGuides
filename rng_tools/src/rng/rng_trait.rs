use std::iter::Skip;
use std::ops::Rem;

pub trait GetRand<T> {
    fn get(&mut self) -> T;
}

pub trait Rng: Iterator {
    fn rand<T>(&mut self) -> T
    where
        Self: GetRand<T>,
    {
        self.get()
    }

    fn rand_max<T>(&mut self, max: T) -> T
    where
        Self: GetRand<T>,
        T: Rem<Output = T>,
    {
        self.rand::<T>() % max
    }

    fn advance(&mut self, count: usize) {
        for _ in 0..count {
            self.next();
        }
    }
}

impl<T: Iterator> Rng for Skip<T> {}
