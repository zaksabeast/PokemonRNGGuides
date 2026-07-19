use super::count::{get_safe_cols, get_safe_rows};
use serde::{Deserialize, Serialize};
use tsify::Tsify;

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub enum VoltorbFlipCard {
    Voltorb,
    One,
    Two,
    Three,
}

pub struct RowIter<'a> {
    board: &'a VoltorbFlipBoard,
    row: usize,
    index: usize,
}

impl<'a> Iterator for RowIter<'a> {
    type Item = &'a VoltorbFlipCard;

    fn next(&mut self) -> Option<Self::Item> {
        if self.row < 5 && self.index < 5 {
            let item = &self.board.cards[self.row * 5 + self.index];
            self.index += 1;
            Some(item)
        } else {
            None
        }
    }
}

pub struct ColIter<'a> {
    board: &'a VoltorbFlipBoard,
    col: usize,
    index: usize,
}

impl<'a> Iterator for ColIter<'a> {
    type Item = &'a VoltorbFlipCard;

    fn next(&mut self) -> Option<Self::Item> {
        if self.col < 5 && self.index < 5 {
            let item = &self.board.cards[self.index * 5 + self.col];
            self.index += 1;
            Some(item)
        } else {
            None
        }
    }
}

#[derive(Debug, Clone, Copy, PartialEq, Eq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct VoltorbFlipBoard {
    pub(super) cards: [VoltorbFlipCard; 25],
}

impl Default for VoltorbFlipBoard {
    fn default() -> Self {
        VoltorbFlipBoard {
            cards: [VoltorbFlipCard::One; 25],
        }
    }
}

impl VoltorbFlipBoard {
    #[cfg(test)]
    pub fn new_test(cards: [[VoltorbFlipCard; 5]; 5]) -> Self {
        let mut flat_cards = [VoltorbFlipCard::One; 25];
        for (i, row) in cards.iter().enumerate() {
            for (j, &card) in row.iter().enumerate() {
                flat_cards[i * 5 + j] = card;
            }
        }
        VoltorbFlipBoard { cards: flat_cards }
    }

    pub(super) fn row(&self, row: usize) -> RowIter<'_> {
        RowIter {
            board: self,
            row,
            index: 0,
        }
    }

    pub(super) fn col(&self, col: usize) -> ColIter<'_> {
        ColIter {
            board: self,
            col,
            index: 0,
        }
    }

    pub(super) fn get_flip_advances(&self) -> usize {
        // Get an unused rand once for every non-voltorb card that has voltorbs in its row and column
        let mut advances = 0;
        let safe_rows = get_safe_rows(self);
        let safe_cols = get_safe_cols(self);

        for (i, card) in self.cards.iter().enumerate() {
            let row = i / 5;
            let col = i % 5;
            if *card != VoltorbFlipCard::Voltorb && (!safe_rows[row] && !safe_cols[col]) {
                advances += 1;
            }
        }

        advances
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use VoltorbFlipCard::*;

    #[test]
    fn row_iter() {
        let mut board = VoltorbFlipBoard { cards: [One; 25] };

        board.cards[5] = Voltorb;
        board.cards[6] = Two;
        board.cards[7] = One;
        board.cards[8] = Three;
        board.cards[9] = Voltorb;

        let row_iter = board.row(0);
        let row_cards: Vec<VoltorbFlipCard> = row_iter.cloned().collect();
        assert_eq!(row_cards, [One, One, One, One, One]);

        let row_iter = board.row(1);
        let row_cards: Vec<VoltorbFlipCard> = row_iter.cloned().collect();
        assert_eq!(row_cards, [Voltorb, Two, One, Three, Voltorb]);
    }

    #[test]
    fn col_iter() {
        let mut board = VoltorbFlipBoard { cards: [One; 25] };

        board.cards[1] = Voltorb;
        board.cards[6] = Two;
        board.cards[11] = One;
        board.cards[16] = Three;
        board.cards[21] = Voltorb;

        let col_iter = board.col(0);
        let col_cards: Vec<VoltorbFlipCard> = col_iter.cloned().collect();
        assert_eq!(col_cards, [One, One, One, One, One]);

        let col_iter = board.col(1);
        let col_cards: Vec<VoltorbFlipCard> = col_iter.cloned().collect();
        assert_eq!(col_cards, [Voltorb, Two, One, Three, Voltorb]);
    }

    #[test]
    fn new_test() {
        let cards = [
            [One, One, One, One, One],
            [Voltorb, Two, One, Three, Voltorb],
            [One, One, One, One, One],
            [One, One, One, One, One],
            [One, One, One, One, One],
        ];

        let board = VoltorbFlipBoard::new_test(cards);

        let expected = [
            One, One, One, One, One, Voltorb, Two, One, Three, Voltorb, One, One, One, One, One,
            One, One, One, One, One, One, One, One, One, One,
        ];

        assert_eq!(board.cards, expected);
    }

    mod get_flip_advances {
        use super::*;

        #[test]
        fn calc() {
            let board = VoltorbFlipBoard::new_test([
                [Three, One, One, One, Voltorb],
                [One, One, One, One, One],
                [Voltorb, Voltorb, One, One, One],
                [One, Voltorb, Voltorb, Three, One],
                [One, One, One, Voltorb, Three],
            ]);
            let result = board.get_flip_advances();
            let expected = 14;

            assert_eq!(result, expected);
        }
    }
}
