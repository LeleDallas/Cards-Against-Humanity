import { Gutter } from "antd/es/grid/row";
import { isMobile } from "react-device-detect";

export const gutterRules: Gutter | [Gutter, Gutter] = isMobile ? [64, 32] : [32, 0]
export const buttonRulesWidth = isMobile ? 250 : 150

export const cardHeight = isMobile ? "18em" : "25em"
export const cardWidth = isMobile ? "13.75em" : "18.75em"