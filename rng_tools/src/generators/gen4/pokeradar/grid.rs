pub(crate) const RING_TILE_COUNT: [u16; 4] = [32, 24, 16, 8];

#[derive(Debug, Clone, Copy, PartialEq, Eq)]
pub(crate) struct GridCoords {
    pub x: i32,
    pub z: i32,
}

pub(crate) fn ring_offset_to_coords(ring: i32, rand: u16) -> GridCoords {
    let size = 9 - ring * 2;
    let rand = rand as i32;
    let row = rand / size;
    if row == 0 {
        return GridCoords {
            x: rand % size,
            z: 0,
        };
    }
    if row == 1 {
        return GridCoords {
            x: rand % size,
            z: size - 1,
        };
    }
    let r = rand - size * 2;
    let ox = if r % 2 == 0 { 0 } else { size - 1 };
    GridCoords {
        x: ox,
        z: r / 2 + 1,
    }
}

pub(crate) fn patch_grid_coords(ring: i32, rand: u16) -> GridCoords {
    let offset = ring_offset_to_coords(ring, rand);
    GridCoords {
        x: ring + offset.x,
        z: ring + offset.z,
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_ring_sizes() {
        assert_eq!(ring_offset_to_coords(0, 0), GridCoords { x: 0, z: 0 });
        assert_eq!(ring_offset_to_coords(0, 31), GridCoords { x: 8, z: 7 });

        assert_eq!(ring_offset_to_coords(1, 0), GridCoords { x: 0, z: 0 });
        assert_eq!(ring_offset_to_coords(1, 23), GridCoords { x: 6, z: 5 });

        assert_eq!(ring_offset_to_coords(2, 0), GridCoords { x: 0, z: 0 });
        assert_eq!(ring_offset_to_coords(2, 15), GridCoords { x: 4, z: 3 });

        assert_eq!(ring_offset_to_coords(3, 0), GridCoords { x: 0, z: 0 });
        assert_eq!(ring_offset_to_coords(3, 7), GridCoords { x: 2, z: 1 });
    }

    #[test]
    fn test_ring0_all_sides() {
        //UPPER SIDE
        assert_eq!(ring_offset_to_coords(0, 0), GridCoords { x: 0, z: 0 });
        assert_eq!(ring_offset_to_coords(0, 4), GridCoords { x: 4, z: 0 });
        assert_eq!(ring_offset_to_coords(0, 8), GridCoords { x: 8, z: 0 });

        //BOTTOM SIDE
        assert_eq!(ring_offset_to_coords(0, 9), GridCoords { x: 0, z: 8 });
        assert_eq!(ring_offset_to_coords(0, 13), GridCoords { x: 4, z: 8 });
        assert_eq!(ring_offset_to_coords(0, 17), GridCoords { x: 8, z: 8 });

        //LEFT SIDE
        assert_eq!(ring_offset_to_coords(0, 18), GridCoords { x: 0, z: 1 });
        assert_eq!(ring_offset_to_coords(0, 24), GridCoords { x: 0, z: 4 });
        assert_eq!(ring_offset_to_coords(0, 30), GridCoords { x: 0, z: 7 });

        //RIGHT SIDE
        assert_eq!(ring_offset_to_coords(0, 19), GridCoords { x: 8, z: 1 });
        assert_eq!(ring_offset_to_coords(0, 25), GridCoords { x: 8, z: 4 });
        assert_eq!(ring_offset_to_coords(0, 31), GridCoords { x: 8, z: 7 });
    }

    #[test]
    fn test_ring_bounds() {
        for ring in 0..4 {
            let size = 9 - ring * 2;
            let count = RING_TILE_COUNT[ring as usize];

            for i in 0..count {
                let coords = ring_offset_to_coords(ring, i);

                assert!(coords.x >= 0);
                assert!(coords.z >= 0);

                assert!(coords.x < size);
                assert!(coords.z < size);
            }
        }
    }

    #[test]
    fn test_ring_border() {
        for ring in 0..4 {
            let size = 9 - ring * 2;
            let count = RING_TILE_COUNT[ring as usize];

            for i in 0..count {
                let coords = ring_offset_to_coords(ring, i);

                assert!(
                    coords.x == 0 || coords.x == size - 1 || coords.z == 0 || coords.z == size - 1
                );
            }
        }
    }

    #[test]
    fn test_ring_unique_positions() {
        use std::collections::HashSet;

        for ring in 0..4 {
            let mut set = HashSet::new();

            let count = RING_TILE_COUNT[ring as usize];

            for i in 0..count {
                assert!(set.insert((
                    ring_offset_to_coords(ring, i).x,
                    ring_offset_to_coords(ring, i).z
                )));
            }
        }
    }

    #[test]
    fn test_patch_coords() {
        assert_eq!(patch_grid_coords(0, 0), GridCoords { x: 0, z: 0 });
        assert_eq!(patch_grid_coords(1, 0), GridCoords { x: 1, z: 1 });
        assert_eq!(patch_grid_coords(2, 0), GridCoords { x: 2, z: 2 });
        assert_eq!(patch_grid_coords(3, 0), GridCoords { x: 3, z: 3 });
    }

    #[test]
    fn test_patch_grid_bounds() {
        for ring in 0..4 {
            let count = RING_TILE_COUNT[ring as usize];

            for i in 0..count {
                let coords = patch_grid_coords(ring, i);

                assert!(coords.x >= 0 && coords.x < 9);
                assert!(coords.z >= 0 && coords.z < 9);
            }
        }
    }
}
