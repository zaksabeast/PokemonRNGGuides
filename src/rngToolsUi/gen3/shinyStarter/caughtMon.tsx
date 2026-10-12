import React from "react";
import { z } from "zod";
import { Flex, ResultColumn, Icon } from "~/components";
import {
  FormRadioField,
  FormSection,
  NatureField,
  StatRadioFields,
  ToolForm,
  type ToolFormSubmit,
} from "~/components/form";
import { nature } from "~/types/nature";
import { CaughtMonResult, generateCaughtMonResults } from "./calc";
import { Button } from "~/components/button";
import type { Game, TargetStarter } from "./index";
import { toOptions } from "~/utils/options";
import { StatFieldsSchema } from "~/types";

const Validator = z
  .object({
    nature: z.enum(nature),
    gender: z.enum(["Male", "Female"]),
  })
  .extend(StatFieldsSchema.shape);

export type FormState = z.infer<typeof Validator>;

const initialValues: FormState = {
  hpStat: 0,
  atkStat: 0,
  defStat: 0,
  spaStat: 0,
  spdStat: 0,
  speStat: 0,
  nature: "Adamant",
  gender: "Male",
};

type Props = {
  game: Game;
  targetAdvance: number;
  targetStarter: TargetStarter;
  setLatestHitAdv: (hitAdv: number) => void;
  crossOutSid: (sid: number) => void;
  sid: number;
};

export const CaughtMon = ({
  game,
  targetAdvance,
  targetStarter,
  setLatestHitAdv,
  crossOutSid,
  sid,
}: Props) => {
  const [results, setResults] = React.useState<CaughtMonResult[]>([]);

  const onSubmit: ToolFormSubmit<FormState> = async (opts) => {
    setResults(
      await generateCaughtMonResults(game, targetAdvance, targetStarter, opts),
    );
  };

  const columns: ResultColumn<CaughtMonResult>[] = [
    { title: "Target advance", dataIndex: "targetAdvance" },
    {
      title: "Hit advance",
      dataIndex: "advance",
      render: (val, values) => {
        const diffWithTarget = val - values.targetAdvance;
        if (diffWithTarget === 0) {
          return `${val}`;
        }
        if (diffWithTarget > 0) {
          return `${val} (+${diffWithTarget})`;
        }
        return `${val} (${diffWithTarget})`;
      },
    },
    {
      title: "",
      dataIndex: "advance",
      render: (advance, values) => {
        if (values.advance === values.targetAdvance) {
          return (
            <Flex vertical>
              <div>If shiny: Your SID is {sid}.</div>
              <div>If not shiny: Your SID is not {sid}.</div>
              <div>
                <Button
                  type="text"
                  color="PrimaryText"
                  trackerId="shinyStarter_crossOutSid"
                  onClick={() => {
                    crossOutSid(sid);
                    setResults([]);
                  }}
                >
                  Cross out SID {sid}
                </Button>
              </div>
            </Flex>
          );
        }

        return (
          <Button
            type="text"
            color="PrimaryText"
            trackerId="shinyStarter_adv"
            onClick={() => {
              setLatestHitAdv(advance);
              setResults([]);
            }}
          >
            <Icon name="Update" size={20} /> Update Calibration
          </Button>
        );
      },
    },
  ];

  const { minMaxStats } = targetStarter;

  return (
    <ToolForm<FormState, CaughtMonResult>
      formContainerId="generate-gen3-caught-starter"
      columns={columns}
      results={results}
      initialValues={initialValues}
      validationSchema={Validator}
      onSubmit={onSubmit}
      submitTrackerId="generate_gen3_caught_starter"
      submitButtonLabel="Find starter Pokémon"
      rowKey="advance"
    >
      <FormSection title="Caught Pokémon">
        <FormRadioField<FormState>
          name="gender"
          label="Gender"
          cellSize="word"
          options={toOptions(["Male", "Female"] as const)}
        />
        <NatureField<FormState> name="nature" />
      </FormSection>

      <FormSection title="Stats">
        <StatRadioFields<FormState> minMaxStats={minMaxStats} />
      </FormSection>
    </ToolForm>
  );
};
