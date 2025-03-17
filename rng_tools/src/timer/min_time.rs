const MINIMUM_TIME_MS: f32 = 14000.0;
const ONE_MINUTE_MS: f32 = 60000.0;

pub fn to_minimum_length(value: f32) -> f32 {
    if value < MINIMUM_TIME_MS {
        value + ((MINIMUM_TIME_MS - value) / ONE_MINUTE_MS).ceil() * ONE_MINUTE_MS
    } else {
        value
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn less_than_min_length() {
        assert_eq!(to_minimum_length(1_000.0), 61_000.0);
    }

    #[test]
    fn greater_than_min_length() {
        assert_eq!(to_minimum_length(50_000.0), 50_000.0);
    }

    #[test]
    fn equal_to_min_length() {
        assert_eq!(to_minimum_length(14_000.0), 14_000.0);
    }
}
