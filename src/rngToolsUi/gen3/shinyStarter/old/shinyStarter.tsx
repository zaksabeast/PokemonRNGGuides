/*
TODO:

  add filter stat
    based on input

  display real results

  cleanup

*/


import { Formik, FormikConfig } from "formik";
import { Field, RngToolForm, ResultColumn, RngToolSubmit } from "~/components";
import { FormikRadio, RadioGroup } from "../../../components/radio";
import { FormikInput } from "../../../components/input";
import {Result} from "./calc";
import {FindTargetAdv} from "./findTargetAdv";

import {StarterSpecies} from "./findTargetAdv";
import { Button } from "../../../components/button";
import {
  CaughtMon,
} from "./caughtMon";
import {
  Gender,
  Nature,
  Species,
  Ivs,
  rngTools,
} from "~/rngTools";
import React from "react";
import { MultiTimer } from "../../../components/multiTimer";
import {Stat} from "../../../types/stat";
import { getStatMoreLessFromNature } from "~/types/nature";

export type Game = "emerald" | "rs";


type Props = {
  game?: Game;
};

const BASE_STATS = {
  "Mudkip":{hp:10, atk:10, def:10, spa:10, spd:10, spe:10},
  "Treecko":{hp:11, atk:11, def:11, spa:11, spd:11, spe:11},
  "Torchic":{hp:12, atk:12, def:12, spa:12, spd:12, spe:12},
} as const;

const getStatRangeForStarter = async (starter: StarterSpecies) => {
  const baseStats = BASE_STATS[starter];
  const minStats = await rngTools.gen3_calculate_minmax_stats(baseStats, 5, true);
  const maxStats = await rngTools.gen3_calculate_minmax_stats(baseStats, 5, false);

  return {
    hp:  { min: minStats.hp,  max: maxStats.hp },
    atk: { min: minStats.atk, max: maxStats.atk },
    def: { min: minStats.def, max: maxStats.def },
    spa: { min: minStats.spa, max: maxStats.spa },
    spd: { min: minStats.spd, max: maxStats.spd },
    spe: { min: minStats.spe, max: maxStats.spe },
  };
};

export const Gen3ShinyStarter = ({ game = "emerald" }: Props) => {

  const [tid, setTid] = React.useState<string>("0");
  const [sid, setSid] = React.useState<string>("0");
  const [pokemonSpecies, setPokemonSpecies] = React.useState<StarterSpecies>("Mudkip");

  const [targetAdv, setTargetAdv] = React.useState<number>(0);

  return (
    <Formik
      enableReinitialize
      initialValues={{}}
      onSubmit={() => {}}
      onReset={() => {}}
    >
      {(formik) => {
              
        //const initialValues = getInitialValuesFindShiny();

        const [results, setResults] = React.useState<Result[]>([]);
        const [nature, setNature] = React.useState<Nature | null>(null);
        const [gender, setGender] = React.useState<Gender | null>(null);

        const [latestHitAdv, setLatestHitAdv] = React.useState<number | null>(null);

        //NO_PROD use getStatRangeForStarter

        const setCaughtStats = (val:any) => {
          //setCaughtStats_raw(val);

          const newNature = null; //NO_PROD calculateNature(val.natureStatMore, val.natureStatLess, nature);
          if (newNature !== nature)
              setNature(newNature);
        };

        const onSubmitFindTarget = React.useCallback<
          RngToolSubmit<{}>
        >(
          async (values) => {
            //const adv = await findTargetAdvanceForShinyPokemon(game, values);
            //if (adv !== null) setTargetAdv(adv);
          },
          [game],
        );

        const onSubmitFindMatchingCaught = React.useCallback<RngToolSubmit<{}>>(
          async (values) => {
            //NO_PROD
            setResults([
              {
                adv: 1510,
                diffWithTarget: 10,
                stats: "5/6/1/5/4/6",
                nature: "Adamant",
                gender: "Male",
              },
              {
                adv: 1484,
                diffWithTarget: -16,
                stats: "1/6/1/3/4/6",
                nature: "Quirky",
                gender: "Female",
              },
            ]);
          },
          [game],
        );

        const getColumns = (): ResultColumn<Result>[] => {
          const columns: ResultColumn<Result>[] = [
            {
              title: "Advance",
              dataIndex: "adv",
              key: "adv",
            },
            {
              title: "Difference w/ Target",
              dataIndex: "diffWithTarget",
              key: "diffWithTarget",
              render: (val) => {
                if (val > 0) return `+${val}`;
                return "" + val;
              },
            },
            {
              title: "Stats",
              dataIndex: "stats",
              key: "stats",
            },
            {
              title: "Nature",
              dataIndex: "nature",
              key: "nature",
            },
            {
              title: "Gender",
              dataIndex: "gender",
              key: "gender",
            },
            {
              title: "",
              dataIndex: "adv",
              key: "adv",
              render(adv) {
                return (
                  <Button
                    trackerId="shinyStarter_adv"
                    onClick={() => {
                      setLatestHitAdv(adv);
                    }}
                  >
                    Update Calibration
                  </Button>
                );
              },
            },
          ];
          return columns;
        };

        const columns = React.useMemo(() => getColumns(), []);

        const getFields = () => {
          const milliseconds = Math.round((targetAdv * 1000) / 59.7275); //NO_PROD
          const minutesBeforeTarget = Math.floor(milliseconds / 60000);
          const fields: Field[] = [
            {
              label: "Target advance for shiny Pokémon",
              input: <>{targetAdv}</>,
            },
            {
              label: "Latest hit advance (calibration)",
              input: <>{latestHitAdv === null ? "-" : latestHitAdv}</>,
            },
            {
              label: "Timer",
              direction: "column",
              input: (
                <MultiTimer
                  minutesBeforeTarget={minutesBeforeTarget}
                  milliseconds={[5000, milliseconds]}
                  startButtonTrackerId={"shinyStarter-startTimer"}
                  stopButtonTrackerId={"shinyStarter-stopTimer"}
                />
              ),
            },
          ];


          /*
          const onNatureBtnChanged = (stat: Stat, natureState: NatureStatState) => {
            if (natureState === "nochange") {
              if (caughtStats.natureStatMore === stat)
                setCaughtStats({
                  ...caughtStats,
                  natureStatMore: null,
                });
              else if (caughtStats.natureStatLess === stat)
                setCaughtStats({
                  ...caughtStats,
                  natureStatLess: null,
                });
              return;
            } else if (natureState === "more") {
              setCaughtStats({
                ...caughtStats,
                natureStatMore: stat,
                natureStatLess:
                  caughtStats.natureStatLess === stat
                    ? null
                    : caughtStats.natureStatLess,
              });
              return;
            } else if (natureState === "less") {
              setCaughtStats({
                ...caughtStats,
                natureStatMore:
                  caughtStats.natureStatMore === stat
                    ? null
                    : caughtStats.natureStatMore,
                natureStatLess: stat,
              });
              return;
            }
          };
          */
         /*

          const onNatureInputChanged = (e:string) => {
            const [statMore, statLess] = getStatMoreLessFromNature(e as Nature);

            if (statMore === statLess){
              setCaughtStats({
                ...caughtStats,
                natureStatMore: null,
                natureStatLess: null,
              });
            } else {
              setCaughtStats({
                ...caughtStats,
                natureStatMore: statMore,
                natureStatLess: statLess,
              });
            }

            setNature(e as Nature);
          };

          const onStatValueChanged = (stat: Stat, value: number) => {
            setCaughtStats({
              ...caughtStats,
              [stat]: { ...caughtStats[stat], value },
            });
          };

          const clear = () => {
            setCaughtStats({
              natureStatMore: null,
              natureStatLess: null,
              hp: { ...caughtStats.hp, value: null },
              atk: { ...caughtStats.atk, value: null },
              def: { ...caughtStats.def, value: null },
              spa: { ...caughtStats.spa, value: null },
              spd: { ...caughtStats.spd, value: null },
              spe: { ...caughtStats.spe, value: null },
            });
            setNature(null);
          };
          */

          fields.push({
            label: "Caught Pokémon",
            direction: "column",
            input: (<></>
              /*
              <CaughtMon
                clear={clear}
                {...caughtStats}
                canBeMaleOrFemale={true}
                gender={gender}
                onGenderChanged={setGender}
                nature={nature ?? ""}
                onNatureInputChanged={onNatureInputChanged}
                onNatureBtnChanged={onNatureBtnChanged}
                onValueChanged={onStatValueChanged}
              />
              */
            ),
          });

          return fields;
        };

        return (
          <>
            <FindTargetAdv 
              pokemonSpecies={pokemonSpecies}
              setPokemonSpecies={setPokemonSpecies}
              tid={tid}
              setTid={setTid}
              sid={sid}
              setSid={setSid}
              onTargetAdvCalculated={setTargetAdv}
            />

            {targetAdv !== -1 && ( //NO_PROD
              <RngToolForm<{}, Result>
                getFields={getFields}
                columns={columns}
                results={results}
                initialValues={{}}
                submitButtonLabel="Find advances matching caught Pokémon"
                onSubmit={onSubmitFindMatchingCaught}
                rowKey="adv"
                submitTrackerId="shinyStarter_findMatchingCaught"
              />
            )}
          </>
        );
      }}
    </Formik>
  );
};
