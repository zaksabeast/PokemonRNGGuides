import styled from "@emotion/styled";

import AggronImg from "~/assets/box-sprites/aggron.png";
import AxewImg from "~/assets/box-sprites/axew.png";
import BeedrillImg from "~/assets/box-sprites/beedrill.png";
import BellsproutImg from "~/assets/box-sprites/bellsprout.png";
import BulbasaurImg from "~/assets/box-sprites/bulbasaur.png";
import CharmanderImg from "~/assets/box-sprites/charmander.png";
import ChesnaughtImg from "~/assets/box-sprites/chesnaught.png";
import ChikoritaImg from "~/assets/box-sprites/chikorita.png";
import CombuskenImg from "~/assets/box-sprites/combusken.png";
import ConkeldurrImg from "~/assets/box-sprites/conkeldurr.png";
import CyndaquilImg from "~/assets/box-sprites/cyndaquil.png";
import DeinoImg from "~/assets/box-sprites/deino.png";
import DelphoxImg from "~/assets/box-sprites/delphox.png";
import DuosionImg from "~/assets/box-sprites/duosion.png";
import EelektrossImg from "~/assets/box-sprites/eelektross.png";
import EmboarImg from "~/assets/box-sprites/emboar.png";
import GothitaImg from "~/assets/box-sprites/gothita.png";
import GreninjaImg from "~/assets/box-sprites/greninja.png";
import GrotleImg from "~/assets/box-sprites/grotle.png";
import GrovyleImg from "~/assets/box-sprites/grovyle.png";
import HonedgeImg from "~/assets/box-sprites/honedge.png";
import HorseaImg from "~/assets/box-sprites/horsea.png";
import KlinkImg from "~/assets/box-sprites/klink.png";
import LeavannyImg from "~/assets/box-sprites/leavanny.png";
import LitwickImg from "~/assets/box-sprites/litwick.png";
import LuxioImg from "~/assets/box-sprites/luxio.png";
import MarillImg from "~/assets/box-sprites/marill.png";
import MarshtompImg from "~/assets/box-sprites/marshtomp.png";
import MonfernoImg from "~/assets/box-sprites/monferno.png";
import OnixImg from "~/assets/box-sprites/onix.png";
import PidgeotImg from "~/assets/box-sprites/pidgeot.png";
import PrinplupImg from "~/assets/box-sprites/prinplup.png";
import RaltsImg from "~/assets/box-sprites/ralts.png";
import RhyornImg from "~/assets/box-sprites/rhyorn.png";
import RoseliaImg from "~/assets/box-sprites/roselia.png";
import RotomImg from "~/assets/box-sprites/rotom.png";
import SamurottImg from "~/assets/box-sprites/samurott.png";
import ScatterbugImg from "~/assets/box-sprites/scatterbug.png";
import SerperiorImg from "~/assets/box-sprites/serperior.png";
import SphealImg from "~/assets/box-sprites/spheal.png";
import SquirtleImg from "~/assets/box-sprites/squirtle.png";
import StaraviaImg from "~/assets/box-sprites/staravia.png";
import SwinubImg from "~/assets/box-sprites/swinub.png";
import TogekissImg from "~/assets/box-sprites/togekiss.png";
import TotodileImg from "~/assets/box-sprites/totodile.png";
import VenipedeImg from "~/assets/box-sprites/venipede.png";
import VigorothImg from "~/assets/box-sprites/vigoroth.png";

const image = {
  Aggron: AggronImg,
  Axew: AxewImg,
  Beedrill: BeedrillImg,
  Bellsprout: BellsproutImg,
  Bulbasaur: BulbasaurImg,
  Charmander: CharmanderImg,
  Chesnaught: ChesnaughtImg,
  Chikorita: ChikoritaImg,
  Combusken: CombuskenImg,
  Conkeldurr: ConkeldurrImg,
  Cyndaquil: CyndaquilImg,
  Deino: DeinoImg,
  Delphox: DelphoxImg,
  Duosion: DuosionImg,
  Eelektross: EelektrossImg,
  Emboar: EmboarImg,
  Gothita: GothitaImg,
  Greninja: GreninjaImg,
  Grotle: GrotleImg,
  Grovyle: GrovyleImg,
  Honedge: HonedgeImg,
  Horsea: HorseaImg,
  Klink: KlinkImg,
  Leavanny: LeavannyImg,
  Litwick: LitwickImg,
  Luxio: LuxioImg,
  Marill: MarillImg,
  Marshtomp: MarshtompImg,
  Monferno: MonfernoImg,
  Onix: OnixImg,
  Pidgeot: PidgeotImg,
  Prinplup: PrinplupImg,
  Ralts: RaltsImg,
  Rhyorn: RhyornImg,
  Roselia: RoseliaImg,
  Rotom: RotomImg,
  Samurott: SamurottImg,
  Scatterbug: ScatterbugImg,
  Serperior: SerperiorImg,
  Spheal: SphealImg,
  Squirtle: SquirtleImg,
  Staravia: StaraviaImg,
  Swinub: SwinubImg,
  Togekiss: TogekissImg,
  Totodile: TotodileImg,
  Venipede: VenipedeImg,
  Vigoroth: VigorothImg,
} as const;

const _PixelImage = styled.img({
  imageRendering: "pixelated",
});

export const PixelImage = ({ name }: { name: keyof typeof image }) => {
  return <_PixelImage src={image[name]} />;
};
