export enum ActionType {
  RESET = "RESET",
  END = "END",
  TYPINGINSERT = "TYPING/INSERT",
  TYPINGDELETE = "TYPING/DELETE",
  SETCURRENTINDEX = "SET/CURRENTINDEX",
}

export type ActionItemType =
  | { type: ActionType.RESET; payload?: undefined }
  | { type: ActionType.END; payload?: undefined }
  | { type: ActionType.TYPINGDELETE; payload: boolean }
  | { type: ActionType.TYPINGINSERT; payload: string | null }
  | { type: ActionType.SETCURRENTINDEX; payload: number };

export { reset as RESET } from "./reset";
export { setCurrentIndex as SETCURRENTINDEX } from "./setCurrentIndex";
export { end as END } from "./end";
export { typingInsert as TYPINGINSERT } from "./typingInsert";
export { typingDelete as TYPINGDELETE } from "./typingDelete";
