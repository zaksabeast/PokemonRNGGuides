use super::board::{VoltorbFlipBoard, VoltorbFlipCard};
use super::config::{VoltorbFlipLevel, select_board};
use super::validation::is_board_valid;
use crate::rng::{Rng, mt::MT};
use serde::{Deserialize, Serialize};
use tsify::Tsify;
use wasm_bindgen::prelude::*;

fn place_cards_on_board(
    board: &mut VoltorbFlipBoard,
    rng: &mut MT,
    card_type: VoltorbFlipCard,
    count: usize,
) {
    let mut attempts = 0;
    let mut placed = 0;

    while placed < count {
        let index = rng.rand::<u32>() as usize % 25;

        if board.cards[index] == VoltorbFlipCard::One {
            board.cards[index] = card_type;
            placed += 1;
        } else {
            attempts += 1;
            if attempts >= 100 {
                break;
            }
        }
    }
}

pub fn generate_board(rng: &mut MT, level: VoltorbFlipLevel) -> VoltorbFlipBoard {
    let mut board = VoltorbFlipBoard::default();

    let config = select_board(level, rng.rand::<u32>());

    for _ in 0..1000 {
        board = VoltorbFlipBoard::default();
        place_cards_on_board(&mut board, rng, VoltorbFlipCard::Voltorb, config.voltorbs);
        place_cards_on_board(&mut board, rng, VoltorbFlipCard::Two, config.twos);
        place_cards_on_board(&mut board, rng, VoltorbFlipCard::Three, config.threes);

        if is_board_valid(&board, config) {
            break;
        }
    }

    board
}

#[derive(Debug, Clone, PartialEq, Tsify, Serialize, Deserialize)]
#[tsify(into_wasm_abi, from_wasm_abi)]
pub struct GenerateVoltorbFlipBoardsOpts {
    pub seed: u32,
    pub quit_first_board: bool,
    pub board_levels: Vec<VoltorbFlipLevel>,
}

#[wasm_bindgen]
pub fn generate_voltorb_flip_boards(opts: &GenerateVoltorbFlipBoardsOpts) -> Vec<VoltorbFlipBoard> {
    let mut rng = MT::new(opts.seed);
    opts.board_levels
        .iter()
        .enumerate()
        .map(|(i, level)| {
            let board = generate_board(&mut rng, *level);

            let should_advance = !opts.quit_first_board || (opts.quit_first_board && i != 0);
            if should_advance {
                rng.advance(board.get_flip_advances());
            }

            board
        })
        .collect()
}

#[cfg(test)]
mod tests {
    use crate::assert_list_eq;

    use super::*;
    use VoltorbFlipCard::*;

    #[test]
    fn single_board() {
        let v = Voltorb;
        let o = One;
        let t = Two;
        let h = Three;

        let mut rng = MT::new(0x530702d4);
        let result = generate_board(&mut rng, VoltorbFlipLevel::Lvl1);
        let expected = VoltorbFlipBoard::new_test([
            [v, o, o, h, o],
            [v, t, h, o, v],
            [v, v, v, t, o],
            [o, o, o, o, o],
            [o, o, o, o, o],
        ]);
        assert_eq!(result, expected);
    }

    #[test]
    fn multiple_boards() {
        let v = Voltorb;
        let o = One;
        let t = Two;
        let h = Three;

        let opts = GenerateVoltorbFlipBoardsOpts {
            seed: 0x530702d4,
            quit_first_board: true,
            board_levels: vec![
                VoltorbFlipLevel::Lvl1,
                VoltorbFlipLevel::Lvl1,
                VoltorbFlipLevel::Lvl2,
                VoltorbFlipLevel::Lvl3,
                VoltorbFlipLevel::Lvl4,
                VoltorbFlipLevel::Lvl5,
                VoltorbFlipLevel::Lvl8,
                VoltorbFlipLevel::Lvl8,
            ],
        };
        let result = generate_voltorb_flip_boards(&opts);
        let expected = [
            VoltorbFlipBoard::new_test([
                [v, o, o, h, o],
                [v, t, h, o, v],
                [v, v, v, t, o],
                [o, o, o, o, o],
                [o, o, o, o, o],
            ]),
            VoltorbFlipBoard::new_test([
                [o, v, t, v, v],
                [o, o, o, o, t],
                [o, t, t, o, v],
                [o, o, o, o, v],
                [v, o, o, h, o],
            ]),
            VoltorbFlipBoard::new_test([
                [v, o, h, o, o],
                [o, o, v, o, o],
                [o, v, h, o, o],
                [v, o, v, h, o],
                [v, h, o, v, o],
            ]),
            VoltorbFlipBoard::new_test([
                [v, h, o, o, v],
                [o, v, h, o, o],
                [o, v, o, h, o],
                [t, o, v, o, h],
                [v, o, o, v, v],
            ]),
            VoltorbFlipBoard::new_test([
                [t, o, t, o, v],
                [o, h, o, o, o],
                [v, v, v, h, o],
                [v, v, o, v, h],
                [o, o, v, t, o],
            ]),
            VoltorbFlipBoard::new_test([
                [v, o, h, o, h],
                [t, v, t, t, v],
                [v, v, v, o, v],
                [v, t, o, o, o],
                [o, v, t, t, v],
            ]),
            VoltorbFlipBoard::new_test([
                [o, v, o, v, v],
                [h, v, h, o, h],
                [v, h, v, h, v],
                [h, v, o, v, v],
                [o, o, h, o, o],
            ]),
            VoltorbFlipBoard::new_test([
                [o, v, t, o, t],
                [v, t, t, t, v],
                [t, v, o, v, v],
                [t, v, v, o, h],
                [h, v, t, v, o],
            ]),
        ];

        assert_list_eq!(result, expected);
    }
}
