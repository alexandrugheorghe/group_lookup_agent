import { Annotation } from "@langchain/langgraph";
import type { Group } from "../types";
import { Message } from "@langchain/core/messages";
import { allUniqueTags } from "../mockGroups";

function capArrayStart(arr: Array<any>, maxSize: number) {
  if (arr.length <= maxSize) return arr;
  return arr.slice(arr.length - maxSize);
}


export const GraphState = Annotation.Root({
  initialPreferences: Annotation<Array<string>>({
    reducer: () => allUniqueTags,
    default: () => allUniqueTags,
  }),
  preferences: Annotation<Array<string>>({
    reducer: (state: Array<string>, update: Array<string>) => [...update],
    default: () => [],
  }),
  groups: Annotation<Array<Group>>({
    reducer: (state: Array<Group>, update: Array<Group>) => [...state, ...update],
    default: () => [],
  }),
  messages: Annotation<Array<Message>>({
    reducer: (state: Array<Message>, update: Array<Message>) => capArrayStart([...state, ...update], 10),
    default: () => [],
  }),
});

export type GraphStateType = typeof GraphState["spec"];