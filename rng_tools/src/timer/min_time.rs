const ONE_MINUTE_MS: f32 = 60000.0;

pub fn to_minimum_length(min_time_ms: f32, ms: f32) -> f32 {
    let min_time_ms = f32::max(min_time_ms, 0.0);
    if ms < min_time_ms {
        ms + ((min_time_ms - ms) / ONE_MINUTE_MS).ceil() * ONE_MINUTE_MS
    } else {
        ms
    }
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn less_than_min_length() {
        assert_eq!(to_minimum_length(10_000.0, 1_000.0), 61_000.0);
        assert_eq!(to_minimum_length(14_000.0, 1_000.0), 61_000.0);
    }

    #[test]
    fn greater_than_min_length() {
        assert_eq!(to_minimum_length(10_000.0, 50_000.0), 50_000.0);
        assert_eq!(to_minimum_length(14_000.0, 50_000.0), 50_000.0);
    }

    #[test]
    fn equal_to_min_length() {
        assert_eq!(to_minimum_length(10_000.0, 10_000.0), 10_000.0);
        assert_eq!(to_minimum_length(14_000.0, 14_000.0), 14_000.0);
    }

    #[test]
    fn negative_min_length() {
        assert_eq!(to_minimum_length(-14_000.0, 1_000.0), 1000.0);
    }
}
