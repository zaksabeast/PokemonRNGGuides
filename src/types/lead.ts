import { isMatching, P } from "ts-pattern";

export const isSynchronizeLead = isMatching({ Synchronize: P.string });
