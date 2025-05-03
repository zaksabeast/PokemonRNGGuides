import { RngTask } from "../challenges";
import * as tst from "ts-toolbelt";
import { check, Pass } from "~/typeTest";

export const UniqueIds = () => {
  type TaskIdCount = tst.L.Length<tst.U.ListOf<RngTask["id"]>>;
  type ChallengeCount = tst.L.Length<tst.U.ListOf<RngTask>>;

  check<TaskIdCount, ChallengeCount>(Pass);
};
