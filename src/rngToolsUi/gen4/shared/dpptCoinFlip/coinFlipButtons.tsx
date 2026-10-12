import { PixelImage } from "~/components";
import { FormSection, OutlinedButton, TextField } from "~/components/form";
import { useActiveRouteTranslations } from "~/hooks/useActiveRoute";
import styled from "@emotion/styled";
import { sanitizeFlips } from "./utils";
import { getErrorMessage } from "../advanceFilter/utils";

const CoinButtons = styled.div({
  display: "grid",
  gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
  gap: 8,
});

const CoinFace = styled.span({
  display: "flex",
  paddingBlock: 8,
});

type Props = {
  hasResults: boolean;
  coinFlipFilter: string;
  maxCoinFlips: number;
  onCoinFlipFilterChange: (value: string) => void;
  headsTrackerId: string;
  tailsTrackerId: string;
};

export const CoinFlipFilterButtons = ({
  hasResults,
  coinFlipFilter,
  maxCoinFlips,
  onCoinFlipFilterChange,
  headsTrackerId,
  tailsTrackerId,
}: Props) => {
  const t = useActiveRouteTranslations();

  const handleAddHeads = () => {
    onCoinFlipFilterChange(sanitizeFlips(`${coinFlipFilter}, H`));
  };

  const handleAddTails = () => {
    onCoinFlipFilterChange(sanitizeFlips(`${coinFlipFilter}, T`));
  };

  return (
    <FormSection>
      <CoinButtons>
        <OutlinedButton trackerId={headsTrackerId} onClick={handleAddHeads}>
          <CoinFace>
            <PixelImage name="DpptHeads" />
          </CoinFace>
        </OutlinedButton>
        <OutlinedButton trackerId={tailsTrackerId} onClick={handleAddTails}>
          <CoinFace>
            <PixelImage name="DpptTails" />
          </CoinFace>
        </OutlinedButton>
      </CoinButtons>
      <TextField
        label={t["Coin Flips"]}
        placeholder="HTH"
        errorMessage={getErrorMessage({
          filter: coinFlipFilter,
          hasResults,
          maxResults: maxCoinFlips,
          unitName: "coin flips",
        })}
        value={coinFlipFilter}
        onChange={onCoinFlipFilterChange}
      />
    </FormSection>
  );
};
