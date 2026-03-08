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
} from "~/components";
import React from "react";
import { formatHex } from "~/utils/formatHex";
import { formatLargeInteger } from "~/utils/formatLargeInteger";
import { formatDuration } from "~/utils/formatDuration";
import { z } from "zod";
import { useWatch } from "react-hook-form";
import { Tooltip } from "antd";

type Result = Wild3PaintingAdvs;

const getColumns = (): ResultColumn<Result>[] => {
  return [
    {
      title: "Painting Seed",
      dataIndex: "adv_before_painting",
      render: (adv_before_painting) => {
        return adv_before_painting === 0
          ? "-"
          : formatHex(adv_before_painting, 2);
      },
    },
    {
      title: (
        <>
          Advances Before
          <br /> Painting Reseeding
        </>
      ),
      key: "adv_before_painting",
      dataIndex: "adv_before_painting",
      render: (adv_before_painting) => {
        return adv_before_painting === 0
          ? "-"
          : formatLargeInteger(adv_before_painting);
      },
    },
    {
      title: (
        <>
          Advances After
          <br /> Painting Reseeding
        </>
      ),
      key: "adv_after_painting",
      dataIndex: "adv_after_painting",
      render: (adv_after_painting) => {
        return formatLargeInteger(adv_after_painting);
      },
    },
    {
      title: "Wait Duration",
      dataIndex: "adv_after_painting",
      render: (adv_after_painting, values) => {
        const durInAdvances = adv_after_painting + values.adv_before_painting;
        return formatDuration(durInAdvances / 59.7275);
      },
    },
  ];
};
const Validator = z.object({
  targetSeed: z.number().int().min(0).max(0xffffffff),
  usingPaintingReseeding: z.boolean(),
  findOptimalSeed: z.boolean(),
  // Permit over 0xFFFF even if not possible with painting. It's still useful to support for other type of reseeding or for emulator users.
  paintingSeed: z.number().int().min(0).max(0xffffffff),
  minAdvBefore: z.number().int().min(0).max(0xffffffff),
  minAdvAfter: z.number().int().min(0).max(0xffffffff),
});

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  targetSeed: 0xabcdef,
  usingPaintingReseeding: false,
  findOptimalSeed: true,
  paintingSeed: 0,
  minAdvBefore: 1000,
  minAdvAfter: 10000,
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
              Target seed at start of the player action{" "}
              <Icon name="InformationCircle" size={16} />
            </div>
          </Tooltip>
        ),
        key: "targetSeed",
        input: <FormikNumberInput<FormState> name="targetSeed" numType="hex" />,
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
      },
      {
        label: "Painting seed",
        input: (
          <FormikNumberInput<FormState> name="paintingSeed" numType="hex" />
        ),
        show: usingPaintingReseeding && !findOptimalSeed,
      },
      {
        label: (
          <Tooltip title="To ensure there is enough time between booting the game and interacting with the painting.">
            <div>
              Min advances before reseeding{" "}
              <Icon name="InformationCircle" size={16} />
            </div>
          </Tooltip>
        ),
        key: "minAdvBefore",
        input: (
          <FormikNumberInput<FormState> name="minAdvBefore" numType="decimal" />
        ),
        show: usingPaintingReseeding && findOptimalSeed,
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
        key: "minAdvAfter",
        input: (
          <FormikNumberInput<FormState> name="minAdvAfter" numType="decimal" />
        ),
        show: usingPaintingReseeding && findOptimalSeed,
      },
    ];
  }, [usingPaintingReseeding, findOptimalSeed]);

  return <FormFieldTable fields={fields} />;
};

export const EmeraldSeedToAdvances = () => {
  const columns = React.useMemo(() => getColumns(), []);
  const [results, setResults] = React.useState<Result[]>([]);

  const onSubmit = React.useCallback<RngToolSubmit<FormState>>(
    async (opts: FormState) => {
      if (!opts.usingPaintingReseeding) {
        rngTools.lcrng_distance(0, opts.targetSeed).then((adv) => {
          setResults([
            {
              adv_before_painting: 0,
              adv_after_painting: adv,
            },
          ]);
        });
        return;
      }

      if (!opts.findOptimalSeed) {
        rngTools
          .lcrng_distance(opts.paintingSeed, opts.targetSeed)
          .then((after) => {
            setResults([
              {
                adv_before_painting: opts.paintingSeed,
                adv_after_painting: after,
              },
            ]);
          });
        return;
      }

      const painting_opts: Wild3PaintingOpts = {
        min_adv_before_painting: 0,
        min_adv_after_painting: 0,
      };
      rngTools
        .find_painting_advs_for_seed(painting_opts, opts.targetSeed)
        .then((results) => {
          results = results.filter((res) => {
            if (res.adv_before_painting === 0) {
              return true;
            }
            return (
              res.adv_before_painting >= opts.minAdvBefore &&
              res.adv_after_painting >= opts.minAdvAfter
            );
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
    },
    [setResults],
  );

  return (
    <RngToolForm<FormState, Result>
      columns={columns}
      rowKey="adv_before_painting"
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
