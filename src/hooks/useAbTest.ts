import md5 from "md5";
import { track, getDeviceId } from "~/analytics";
import React from "react";
import { atom, useAtom } from "jotai";

const md5Sum = (source: string): Uint8Array => {
  const sourceBytes = md5(source);
  const sourceBytesArray = new Uint8Array(sourceBytes.length);
  for (let i = 0; i < sourceBytes.length; i++) {
    sourceBytesArray[i] = sourceBytes.charCodeAt(i);
  }
  return sourceBytesArray;
};

const hashToNumber = (hash: Uint8Array): number => {
  return hash.reduce((acc, byte) => (acc * 256 + byte) >>> 0, 0);
};

type AbTestConfig = {
  cohorts: string[];
  controlCohort: string;
};

type AbTestConfigs = Record<string, AbTestConfig>;

const abTests = {
  // Temporarily keep at least one for type purposes
  supportUsIcon: {
    cohorts: ["coffee", "heart"],
    controlCohort: "heart",
  },
  guidePokeball: {
    cohorts: ["on", "off"],
    controlCohort: "off",
  },
} as const satisfies AbTestConfigs;

type AbTest = typeof abTests;
type AbTestName = keyof AbTest;

const getAbCohort = <T extends AbTestName>(
  abTestName: T,
): AbTest[T]["cohorts"][number] => {
  const { cohorts, controlCohort } = abTests[abTestName];
  const deviceId = getDeviceId();
  if (deviceId == null) {
    return controlCohort;
  }

  const hash = md5Sum(deviceId);
  const hashNumber = hashToNumber(hash);
  const cohortIndex = hashNumber % cohorts.length;
  return cohorts[cohortIndex];
};

type JoinedCohorts = Record<AbTestName, boolean>;

const joinedCohorts = atom<JoinedCohorts>({
  supportUsIcon: false,
  guidePokeball: false,
} satisfies JoinedCohorts);

export const useAbCohort = <T extends AbTestName>(abTestName: T) => {
  const cohort = getAbCohort(abTestName);
  const [joined, setJoined] = useAtom(joinedCohorts);
  const hasJoined = joined[abTestName];

  React.useEffect(() => {
    if (!hasJoined) {
      track("Assigned Cohort", { testName: abTestName, cohort });
      setJoined((prev) => ({ ...prev, [abTestName]: true }));
    }
  }, [hasJoined, setJoined, abTestName, cohort]);

  return cohort;
};
