use super::board::{VoltorbFlipBoard, VoltorbFlipCard};

fn count_voltorbs_in_row_col<'a>(cards: impl Iterator<Item = &'a VoltorbFlipCard>) -> usize {
    cards
        .filter(|card| **card == VoltorbFlipCard::Voltorb)
        .count()
}

pub fn get_safe_rows(board: &VoltorbFlipBoard) -> [bool; 5] {
    let mut safe_rows = [true; 5];
    for row in 0..5 {
        let row_cards = board.row(row);
        safe_rows[row] = count_voltorbs_in_row_col(row_cards) == 0;
    }
    safe_rows
}

pub fn get_safe_cols(board: &VoltorbFlipBoard) -> [bool; 5] {
    let mut safe_cols = [true; 5];
    for col in 0..5 {
        let col_cards = board.col(col);
        safe_cols[col] = count_voltorbs_in_row_col(col_cards) == 0;
    }
    safe_cols
}

#[cfg(test)]
mod tests {
    use super::*;

    mod count_voltorbs_in_row_col {
        use super::*;
        use VoltorbFlipCard::*;

        #[test]
        fn count() {
            let count = count_voltorbs_in_row_col([One, Two, Three, Voltorb].iter());
            assert_eq!(count, 1);
        }
    }

    mod get_safe_rows {
        use super::*;
        use VoltorbFlipCard::*;

        #[test]
        fn safe_rows() {
            let board = VoltorbFlipBoard::new_test([
                [One, Two, Three, One, One],
                [One, Two, Three, Voltorb, One],
                [One, Two, Three, Voltorb, One],
                [One, Two, Three, One, One],
                [One, Two, Three, Voltorb, One],
            ]);

            let result = get_safe_rows(&board);
            let expected = [true, false, false, true, false];

            assert_eq!(result, expected);
        }
    }

    mod get_safe_cols {
        use super::*;
        use VoltorbFlipCard::*;

        #[test]
        fn safe_cols() {
            let board = VoltorbFlipBoard::new_test([
                [One, Two, Three, One, One],
                [One, Two, Three, Voltorb, One],
                [One, Two, Three, Voltorb, One],
                [One, Two, Three, One, One],
                [One, Two, Three, Voltorb, One],
            ]);

            let result = get_safe_cols(&board);
            let expected = [true, true, true, false, true];

            assert_eq!(result, expected);
        }
    }
}
