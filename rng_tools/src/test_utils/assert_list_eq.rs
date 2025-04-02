#[cfg(test)]
#[macro_export]
macro_rules! assert_list_eq {
    ($result:expr, $expected:expr) => {
        assert_eq!($result.len(), $expected.len());
        $result
            .into_iter()
            .zip($expected.into_iter())
            .enumerate()
            .for_each(|(index, (result, expected))| {
                assert_eq!(result, expected, "index: {}", index);
            });
    };
}
