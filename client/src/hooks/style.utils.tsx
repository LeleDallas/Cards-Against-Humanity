import { Gutter } from "antd/es/grid/row";
import { isMobile } from "react-device-detect";
import jazzHands from '../assets/jazzhands.png';
import berry from '../assets/miracleberry.png';

export const gutterRules: Gutter | [Gutter, Gutter] = isMobile ? [64, 32] : [32, 0]
export const buttonRulesWidth = isMobile ? 250 : 150

export const cardHeight = isMobile ? "18em" : "25em"
export const cardWidth = isMobile ? "13.75em" : "18.75em"

export const waitingMargin = isMobile ? 22 : 0
export const rightRule = isMobile ? 16 : 20

export const whiteContainer = isMobile ? "40%" : "50%"
export const blackContainerTop = isMobile ? "30%" : "50%"
export const blackContainerLeft = isMobile ? "34%" : "53%"
export const blackContainerTransform = isMobile && 'transform: rotate(18deg)'
export const defaultImgDistance = isMobile ? "8em" : "12em"


export const berryImg = !isMobile && <img style={{ width: "9em", position: "absolute", top: "30%", left: 20 }} src={berry} alt="berry" />
export const jazzImg = !isMobile && <img style={{ width: "12em", position: "absolute", top: "40%", right: 20 }} src={jazzHands} alt="jazzHands" />
