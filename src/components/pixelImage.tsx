import styled from "@emotion/styled";

import Aggron from "~/assets/box-sprites/aggron.png";
import Axew from "~/assets/box-sprites/axew.png";
import Beedrill from "~/assets/box-sprites/beedrill.png";
import Bellsprout from "~/assets/box-sprites/bellsprout.png";
import Bulbasaur from "~/assets/box-sprites/bulbasaur.png";
import Charmander from "~/assets/box-sprites/charmander.png";
import Chesnaught from "~/assets/box-sprites/chesnaught.png";
import Chikorita from "~/assets/box-sprites/chikorita.png";
import Combusken from "~/assets/box-sprites/combusken.png";
import Conkeldurr from "~/assets/box-sprites/conkeldurr.png";
import Cyndaquil from "~/assets/box-sprites/cyndaquil.png";
import Deino from "~/assets/box-sprites/deino.png";
import Delphox from "~/assets/box-sprites/delphox.png";
import Duosion from "~/assets/box-sprites/duosion.png";
import Eelektross from "~/assets/box-sprites/eelektross.png";
import Emboar from "~/assets/box-sprites/emboar.png";
import Gothita from "~/assets/box-sprites/gothita.png";
import Greninja from "~/assets/box-sprites/greninja.png";
import Grotle from "~/assets/box-sprites/grotle.png";
import Grovyle from "~/assets/box-sprites/grovyle.png";
import Honedge from "~/assets/box-sprites/honedge.png";
import Horsea from "~/assets/box-sprites/horsea.png";
import Klink from "~/assets/box-sprites/klink.png";
import Leavanny from "~/assets/box-sprites/leavanny.png";
import Litwick from "~/assets/box-sprites/litwick.png";
import Luxio from "~/assets/box-sprites/luxio.png";
import Marill from "~/assets/box-sprites/marill.png";
import Marshtomp from "~/assets/box-sprites/marshtomp.png";
import Monferno from "~/assets/box-sprites/monferno.png";
import Onix from "~/assets/box-sprites/onix.png";
import Pidgeot from "~/assets/box-sprites/pidgeot.png";
import Prinplup from "~/assets/box-sprites/prinplup.png";
import Ralts from "~/assets/box-sprites/ralts.png";
import Rhyorn from "~/assets/box-sprites/rhyorn.png";
import Roselia from "~/assets/box-sprites/roselia.png";
import Rotom from "~/assets/box-sprites/rotom.png";
import Samurott from "~/assets/box-sprites/samurott.png";
import Scatterbug from "~/assets/box-sprites/scatterbug.png";
import Serperior from "~/assets/box-sprites/serperior.png";
import Spheal from "~/assets/box-sprites/spheal.png";
import Squirtle from "~/assets/box-sprites/squirtle.png";
import Staravia from "~/assets/box-sprites/staravia.png";
import Swinub from "~/assets/box-sprites/swinub.png";
import Togekiss from "~/assets/box-sprites/togekiss.png";
import Totodile from "~/assets/box-sprites/totodile.png";
import Venipede from "~/assets/box-sprites/venipede.png";
import Vigoroth from "~/assets/box-sprites/vigoroth.png";
import DpptHeads from "~/assets/dppt_heads.webp";
import DpptTails from "~/assets/dppt_tails.webp";

const image = {
  Aggron,
  Axew,
  Beedrill,
  Bellsprout,
  Bulbasaur,
  Charmander,
  Chesnaught,
  Chikorita,
  Combusken,
  Conkeldurr,
  Cyndaquil,
  Deino,
  Delphox,
  Duosion,
  Eelektross,
  Emboar,
  Gothita,
  Greninja,
  Grotle,
  Grovyle,
  Honedge,
  Horsea,
  Klink,
  Leavanny,
  Litwick,
  Luxio,
  Marill,
  Marshtomp,
  Monferno,
  Onix,
  Pidgeot,
  Prinplup,
  Ralts,
  Rhyorn,
  Roselia,
  Rotom,
  Samurott,
  Scatterbug,
  Serperior,
  Spheal,
  Squirtle,
  Staravia,
  Swinub,
  Togekiss,
  Totodile,
  Venipede,
  Vigoroth,
  DpptHeads,
  DpptTails,
} as const;

const _PixelImage = styled.img({
  imageRendering: "pixelated",
});

type Props = {
  name: keyof typeof image;
};

export const PixelImage = ({ name }: Props) => {
  return <_PixelImage src={image[name]} />;
};
