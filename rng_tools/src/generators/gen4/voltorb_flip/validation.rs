use super::board::{VoltorbFlipBoard, VoltorbFlipCard};
use super::config::VoltorbFlipConfig;
use super::count::{get_safe_cols, get_safe_rows};

fn is_multiplier(card: &VoltorbFlipCard) -> bool {
    matches!(card, VoltorbFlipCard::Two | VoltorbFlipCard::Three)
}

pub fn is_board_valid(board: &VoltorbFlipBoard, config: &VoltorbFlipConfig) -> bool {
    let row_safe = get_safe_rows(board); // row contains no Voltorbs
    let col_safe = get_safe_cols(board); // column contains no Voltorbs

    let mut free_total = 0;
    let mut free_per_row = [0; 5];
    let mut free_per_col = [0; 5];

    for (i, card) in board.cards.iter().enumerate() {
        let row = i / 5;
        let col = i % 5;
        if is_multiplier(card) && (row_safe[row] || col_safe[col]) {
            free_total += 1;
            free_per_row[row] += 1;
            free_per_col[col] += 1;
        }
    }

    if free_total >= config.max_free_total {
        return false;
    }

    for i in 0..5 {
        if free_per_row[i] >= config.max_free_per_row_col {
            return false;
        }
        if free_per_col[i] >= config.max_free_per_row_col {
            return false;
        }
    }

    true
}

#[cfg(test)]
mod tests {
    use super::*;

    mod is_board_valid {
        use super::*;
        use VoltorbFlipCard::*;

        mod max_free_per_row {
            use super::*;

            #[test]
            fn pass_without_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 3,
                    max_free_total: 3,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, One, One, One, One],
                    [Two, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(is_board_valid(&board, &config));
            }

            #[test]
            fn pass_with_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 3,
                    max_free_total: 3,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Voltorb, Voltorb, Voltorb, Voltorb, Voltorb],
                    [Two, One, One, One, One],
                    [Two, One, One, One, One],
                    [Two, Voltorb, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(is_board_valid(&board, &config));
            }

            #[test]
            fn fail_without_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 2,
                    max_free_total: 2,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, One, One, One, One],
                    [Two, One, One, One, One],
                    [Two, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(!is_board_valid(&board, &config));
            }

            #[test]
            fn fail_with_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 2,
                    max_free_total: 2,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Voltorb, Voltorb, Voltorb, Voltorb, Voltorb],
                    [Two, One, One, One, One],
                    [Two, One, One, One, One],
                    [Two, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(!is_board_valid(&board, &config));
            }
        }

        mod max_free_per_col {
            use super::*;

            #[test]
            fn pass_without_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 3,
                    max_free_total: 3,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, Two, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(is_board_valid(&board, &config));
            }

            #[test]
            fn pass_with_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 3,
                    max_free_total: 3,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, Two, Two, One, Voltorb],
                    [One, One, Voltorb, One, Voltorb],
                    [One, One, One, One, Voltorb],
                    [One, One, One, One, Voltorb],
                    [One, One, One, One, Voltorb],
                ]);
                assert!(is_board_valid(&board, &config));
            }

            #[test]
            fn fail_without_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 3,
                    max_free_total: 3,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, Two, Two, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(!is_board_valid(&board, &config));
            }

            #[test]
            fn fail_with_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 2,
                    max_free_total: 2,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, Two, Two, One, Voltorb],
                    [One, One, One, One, Voltorb],
                    [One, One, One, One, Voltorb],
                    [One, One, One, One, Voltorb],
                    [One, One, One, One, Voltorb],
                ]);
                assert!(!is_board_valid(&board, &config));
            }
        }

        mod max_free_total {
            use super::*;

            #[test]
            fn pass_without_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 5,
                    max_free_total: 5,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, Two, One, One, One],
                    [Two, Two, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(is_board_valid(&board, &config));
            }

            #[test]
            fn pass_with_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 5,
                    max_free_total: 3,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, Two, Voltorb, One, One],
                    [Two, Two, Voltorb, One, One],
                    [One, Voltorb, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(is_board_valid(&board, &config));
            }

            #[test]
            fn fail_without_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 5,
                    max_free_total: 2,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, Two, One, One, One],
                    [Two, Two, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(!is_board_valid(&board, &config));
            }

            #[test]
            fn fail_with_voltorbs() {
                let config = VoltorbFlipConfig {
                    voltorbs: 2,
                    twos: 2,
                    threes: 2,
                    max_free_per_row_col: 5,
                    max_free_total: 2,
                };
                let board = VoltorbFlipBoard::new_test([
                    [Two, Two, One, One, One],
                    [Two, Two, Voltorb, One, One],
                    [One, Voltorb, One, One, One],
                    [One, One, One, One, One],
                    [One, One, One, One, One],
                ]);
                assert!(!is_board_valid(&board, &config));
            }
        }

        #[test]
        fn does_not_count_ones() {
            let config = VoltorbFlipConfig {
                voltorbs: 2,
                twos: 2,
                threes: 2,
                max_free_per_row_col: 2,
                max_free_total: 2,
            };
            let board = VoltorbFlipBoard::new_test([
                [One, One, One, One, One],
                [One, One, One, One, One],
                [One, One, One, One, One],
                [One, One, One, One, One],
                [One, One, One, One, One],
            ]);
            assert!(is_board_valid(&board, &config));
        }
    }
}
