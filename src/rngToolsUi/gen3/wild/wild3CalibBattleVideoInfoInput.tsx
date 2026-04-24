import z from "zod";
import { FormFieldTable, FormikNumberInput, FormikSwitch, RngToolForm } from "~/components";
import { gen3Consoles } from "~/types/console";
import { BattleVideoInfo } from "../battleVideo/battleVideo";

const Validator = z
  .object({
    existingBattleVideoAdv: z.number().min(0).max(0xffff_ffff),
    usingBattleVideoWithoutPainting:z.boolean(),
    

    console: z.enum(gen3Consoles),
  });

export type FormState = z.infer<typeof Validator>;

const initialValues:FormState = {
    existingBattleVideoAdv:0,
    usingBattleVideoWithoutPainting:false,
    console:"GBA",
};

const Fields = () => {
  const usingPaintingReseeding = false;
  const usingBattleVideoWithoutPainting = false; //NO_PROD
  
  return <FormFieldTable fields={[{
        label: "Advances between painting and existing Battle Video",
        input: (
          <FormikNumberInput<FormState>
            name="existingBattleVideoAdv"
            numType="decimal"
          />
        ),
        indent: 1,
        show: usingPaintingReseeding,
      },
      
          {
            label: "Using Battle Video?",
            input: <FormikSwitch<FormState> name="usingBattleVideoWithoutPainting" />,
            show: !usingPaintingReseeding,
          },
          {
            label: "Battle Video advance",
            input: (
              <FormikNumberInput<FormState>
                name="existingBattleVideoAdv"
                numType="decimal"
              />
            ),
            show: !usingPaintingReseeding && usingBattleVideoWithoutPainting,
            indent: 1,
          }]} />
};

export type Props = {
  targetPaintingAdvs:{before:number, after:number};
  setBattleVideoInfo:(info:BattleVideoInfo) => void;
};

export const BattleVideoInfoInput = ({} : Props) => {
  
    return (
        <RngToolForm<FormState>
          formContainerId="wild3-calib-battle-video-info-input"
          initialValues={initialValues}
          validationSchema={Validator}
        >
          <Fields />
        </RngToolForm>
      </Flex>
    );
};

//NO_PROD TODO
/*
  const usingBattleVideoWithoutPainting = useWatch<
    FormState,
    "usingBattleVideoWithoutPainting"
  >({ name: "usingBattleVideoWithoutPainting" });
      */
