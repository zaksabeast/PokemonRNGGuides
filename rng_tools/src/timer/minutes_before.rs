use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn minutes_before(milliseconds: &[f32]) -> f32 {
    let sum: f32 = milliseconds.iter().sum();
    (sum / 60000.0).floor()
}

#[cfg(test)]
mod test {
    use super::*;

    #[test]
    fn test_minute_before() {
        let milliseconds = [31283.0, 18910.0, 119453.06];
        assert_eq!(minutes_before(&milliseconds), 2.0);
        let milliseconds = [29573.0, 89626.0];
        assert_eq!(minutes_before(&milliseconds), 1.0);
        let milliseconds = [5000.0, 16715.0];
        assert_eq!(minutes_before(&milliseconds), 0.0);
    }
}
