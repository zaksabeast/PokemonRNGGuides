import { rngTools, Wild3PaintingAdvs, Wild3PaintingOpts } from "~/rngTools";
import {
  ResultColumn,
  Link,
  RngToolSubmit,
  RngToolForm,
  FormikNumberInput,
  FormikSwitch,
  FormFieldTable,
  Icon,
  Field,
} from "~/components";
import React from "react";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatDuration } from "~/utils/formatDuration";
import { z } from "zod";
import { useWatch } from "react-hook-form";
import { Tooltip } from "antd";
import { GBA_FPS } from "~/utils/consts";
import { lcrng_distance, pokerng_with_jump } from "~/utils/lcrng";
import { FormikEmeraldTargetAdvance } from "~/components/emeraldTargetAdvance";

const THRESHOLD_ADV_FOR_BATTLE_FOR_BATTLE_VIDEO = 5 * 3600;
const AVG_RETRY_PER_ATTEMPT = 10;
const FRAME_BEFORE_SCORE_MULT = 20;

type Result = Wild3PaintingAdvs;

const getColumns = (): ResultColumn<Result>[] => {
  return [
    {
      title: "Painting Seed",
      dataIndex: "frame_before_painting",
      render: (frame_before_painting) => {
        return frame_before_painting === 0
          ? "-"
          : formatHex(frame_before_painting, 2);
      },
    },
    {
      title: (
        <>
          Frames before
          <br /> reseeding
        </>
      ),
      key: "frame_before_painting",
      dataIndex: "frame_before_painting",
      render: (frame_before_painting) => {
        return frame_before_painting === 0
          ? "-"
          : formatLargeInteger(frame_before_painting);
      },
    },
    {
      title: (
        <>
          RNG state after <br />
          reseeding <br />
          (in advances)
        </>
      ),
      key: "frame_before_painting",
      dataIndex: "frame_before_painting",
      render: (frame_before_painting) => {
        return frame_before_painting === 0
          ? "-"
          : formatLargeInteger(lcrng_distance(0, frame_before_painting));
      },
    },
    {
      title: (
        <>
          Additional advances <br />
          after reseeding <br />
          to hit target
        </>
      ),
      key: "adv_after_painting",
      dataIndex: "adv_after_painting",
      render: (adv_after_painting) => {
        return formatLargeInteger(adv_after_painting);
      },
    },
    {
      title: (
        <>
          Time to create Battle Video <br />
          assuming {AVG_RETRY_PER_ATTEMPT} painting attempts
        </>
      ),
      key: "manipDur",
      dataIndex: "adv_after_painting",
      render: (adv_after_painting, values) => {
        const bv_wait_divider =
          adv_after_painting > THRESHOLD_ADV_FOR_BATTLE_FOR_BATTLE_VIDEO
            ? 2
            : 1;
        const wait_before_bv = Math.floor(adv_after_painting / bv_wait_divider);

        if (values.frame_before_painting === 0) {
          const time_for_bv = 3600 * 3; // ~3 minutes to create battle video. +0.5 min additional buffer

          const total = wait_before_bv + time_for_bv;
          return formatDuration(total / GBA_FPS);
        }

        const time_for_validating_painting = 3600 * 5; // ~4.5 minutes / attempt to create battle video + catching high-level pokemon. +0.5min buffer.

        const total =
          (values.frame_before_painting + time_for_validating_painting) *
            AVG_RETRY_PER_ATTEMPT +
          wait_before_bv;
        return formatDuration(total / GBA_FPS);
      },
    },
  ];
};
const Validator = z.object({
  targetAdvance: z.number().int().min(0).max(0xffffffff),
  usingPaintingReseeding: z.boolean(),
  findOptimalSeed: z.boolean(),
  // Permit over 0xFFFF even if not possible with painting. It's still useful to support for other type of reseeding or for emulator users.
  paintingSeed: z.number().int().min(0).max(0xffffffff),
  min_frame_before_painting: z.number().int().min(0).max(0xffffffff),
  min_adv_after_painting: z.number().int().min(0).max(0xffffffff),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  targetAdvance: 1_000_000,
  usingPaintingReseeding: true,
  findOptimalSeed: true,
  paintingSeed: 0,
  min_frame_before_painting: 800, // Assuming dead battery.
  min_adv_after_painting: 7000, // About 4800 advances from painting to battle video. then 2200 advances buffer.
};

const MyFields = () => {
  const usingPaintingReseeding = useWatch<FormState, "usingPaintingReseeding">({
    name: "usingPaintingReseeding",
  });
  const findOptimalSeed = useWatch<FormState, "findOptimalSeed">({
    name: "findOptimalSeed",
  });

  const fields = React.useMemo(() => {
    return [
      {
        label: (
          <Tooltip title="Possible player actions are Sweet Scent, fishing, and Rock Smash.">
            <div>
              Target at start of the player action{" "}
              <Icon name="InformationCircle" size={16} />
            </div>
          </Tooltip>
        ),
        key: "targetSeed",
        input: <FormikEmeraldTargetAdvance name="targetAdvance" />,
      },
      {
        label: (
          <>
            Using{" "}
            <Link href="/emerald-painting-rng/" newTab>
              Painting Reseeding
            </Link>
            ?
          </>
        ),
        key: "usingPaintingReseeding",
        input: <FormikSwitch<FormState> name="usingPaintingReseeding" />,
      },
      {
        label: "Find optimal painting seed?",
        input: <FormikSwitch<FormState> name="findOptimalSeed" />,
        show: usingPaintingReseeding,
        indent: 1,
      },
      {
        label: "Painting seed",
        input: (
          <FormikNumberInput<FormState> name="paintingSeed" numType="hex" />
        ),
        show: usingPaintingReseeding && !findOptimalSeed,
        indent: 1,
      },
      {
        label: (
          <Tooltip title="To ensure there is enough time between booting the game and interacting with the painting.">
            <div>
              Min frames before reseeding{" "}
              <Icon name="InformationCircle" size={16} />
            </div>
          </Tooltip>
        ),
        key: "min_frame_before_painting",
        input: (
          <FormikNumberInput<FormState>
            name="min_frame_before_painting"
            numType="decimal"
          />
        ),
        show: usingPaintingReseeding && findOptimalSeed,
        indent: 1,
      },
      {
        label: (
          <Tooltip title="To ensure there is enough time between interacting with the painting, catching a Pokémon to validate the seed, and starting a battle video.">
            <div>
              Min advances after reseeding{" "}
              <Icon name="InformationCircle" size={16} />
            </div>
          </Tooltip>
        ),
        key: "min_adv_after_painting",
        input: (
          <FormikNumberInput<FormState>
            name="min_adv_after_painting"
            numType="decimal"
          />
        ),
        show: usingPaintingReseeding && findOptimalSeed,
        indent: 1,
      },
    ];
  }, [usingPaintingReseeding, findOptimalSeed]);

  return <FormFieldTable fields={fields} />;
};

export const EmeraldSeedToAdvances = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts: FormState) => {
      if (!opts.usingPaintingReseeding) {
        setResults([
          {
            frame_before_painting: 0,
            adv_after_painting: opts.targetAdvance,
          },
        ]);
        return;
      }

      if (!opts.findOptimalSeed) {
        const targetSeed = pokerng_with_jump(0, opts.targetAdvance);
        const after = lcrng_distance(opts.paintingSeed, targetSeed);
        setResults([
          {
            frame_before_painting: opts.paintingSeed,
            adv_after_painting: after,
          },
        ]);
        return;
      }

      const painting_opts: Wild3PaintingOpts = {
        min_frame_before_painting: 0,
        min_adv_after_painting: 0,
      };

      const targetSeed = pokerng_with_jump(0, opts.targetAdvance);
      rngTools
        .find_painting_advs_for_seed(painting_opts, targetSeed)
        .then((results) => {
          results = results.filter((res) => {
            if (res.frame_before_painting === 0) {
              return true;
            }
            return (
              res.frame_before_painting >= opts.min_frame_before_painting &&
              res.adv_after_painting >= opts.min_adv_after_painting
            );
          });
          results.sort((lhs, rhs) => {
            // Painting Seed = 0 goes first.
            if (lhs.frame_before_painting === 0) {
              return -1;
            }
            if (rhs.frame_before_painting === 0) {
              return 1;
            }
            const durA =
              lhs.frame_before_painting * FRAME_BEFORE_SCORE_MULT +
              lhs.adv_after_painting;
            const durB =
              rhs.frame_before_painting * FRAME_BEFORE_SCORE_MULT +
              rhs.adv_after_painting;
            return durA - durB;
          });
          setResults(results);
        });
        results.sort((lhs, rhs) => {
          // Painting Seed = 0 goes first.
          if (lhs.adv_before_painting === 0) {
            return -1;
          }
          if (rhs.adv_before_painting === 0) {
            return 1;
          }
          const durA = lhs.adv_before_painting + lhs.adv_after_painting;
          const durB = rhs.adv_before_painting + rhs.adv_after_painting;
          return durA - durB;
        });
        setResults(results);
      });
  };

  return (
    <RngToolForm<FormState, Result>
      columns={columns}
      rowKey="frame_before_painting"
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="emerald_seed_to_advances"
    >
      <MyFields />
    </RngToolForm>
  );
};
