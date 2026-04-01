import {
  rngTools,
  Wild3PaintingAdvsAndDur,
  Wild3PaintingOpts,
} from "~/rngTools";
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

type Result = Wild3PaintingAdvsAndDur;

const getColumns = (): ResultColumn<Result>[] => {
  return [
    {
      title: "Painting Seed",
      dataIndex: "advs",
      render: (advs) => {
        return advs.frame_before_painting === 0
          ? "-"
          : formatHex(advs.frame_before_painting, 2);
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
      dataIndex: "advs",
      render: (advs) => {
        return advs.frame_before_painting === 0
          ? "-"
          : formatLargeInteger(advs.frame_before_painting);
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
      dataIndex: "advs",
      render: (advs) => {
        return advs.frame_before_painting === 0
          ? "-"
          : formatLargeInteger(lcrng_distance(0, advs.frame_before_painting));
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
      dataIndex: "advs",
      render: (advs) => {
        return formatLargeInteger(advs.adv_after_painting);
      },
    },
    {
      title: (
        <>
          Time to create Battle Video <br />
          assuming 10 painting attempts
        </>
      ),
      key: "wait_dur",
      dataIndex: "wait_dur",
      render: (wait_dur) => {
        return formatDuration(wait_dur / GBA_FPS);
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

  const fields: Field[] = [
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
      input: <FormikNumberInput<FormState> name="paintingSeed" numType="hex" />,
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

  return <FormFieldTable fields={fields} />;
};

export const EmeraldSeedToAdvances = () => {
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit: RngToolSubmit<FormState> = async (opts: FormState) => {
    if (!opts.usingPaintingReseeding) {
      setResults([
        {
          advs: {
            frame_before_painting: 0,
            adv_after_painting: opts.targetAdvance,
          },
          wait_dur: await rngTools.evaluate_dur_to_perform_battle_video(
            opts.targetAdvance,
          ),
        },
      ]);
      return;
    }

    if (!opts.findOptimalSeed) {
      const targetSeed = pokerng_with_jump(0, opts.targetAdvance);
      const after = lcrng_distance(opts.paintingSeed, targetSeed);
      setResults([
        {
          advs: {
            frame_before_painting: opts.paintingSeed,
            adv_after_painting: after,
          },
          wait_dur: await rngTools.evaluate_dur_to_perform_painting(
            opts.paintingSeed,
            after,
          ),
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
      .find_all_painting_advs_for_seed(painting_opts, targetSeed)
      .then((results) => {
        results = results.filter((res) => {
          if (res.advs.frame_before_painting === 0) {
            return true;
          }
          return (
            res.advs.frame_before_painting >= opts.min_frame_before_painting &&
            res.advs.adv_after_painting >= opts.min_adv_after_painting
          );
        });
        results.sort((lhs, rhs) => {
          // Painting Seed = 0 goes first.
          if (lhs.advs.frame_before_painting === 0) {
            return -1;
          }
          if (rhs.advs.frame_before_painting === 0) {
            return 1;
          }
          return lhs.wait_dur - rhs.wait_dur;
        });
        setResults(results);
      });
  };

  return (
    <RngToolForm<FormState, Result>
      getColumns={getColumns}
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
