import {
    StateGraph,
    START,
    END,
    type AnnotationRoot,
} from "@langchain/langgraph";
import type { GraphStateType } from "./state";

export function GroupLookupGraph<TAnnotation extends AnnotationRoot<GraphStateType>>(
  graphState: TAnnotation,
  impl: {
    PreferenceExtractor: (state: TAnnotation["State"]) => Promise<TAnnotation["Update"]>,
    Replier: (state: TAnnotation["State"]) => Promise<TAnnotation["Update"]>,
    Clarifier: (state: TAnnotation["State"]) => Promise<TAnnotation["Update"]>,
    IsPreferenceClear: (state: TAnnotation["State"]) => Promise<'Replier' | 'Clarifier'>,
  }
) {
  return new StateGraph(graphState)
    .addNode("PreferenceExtractor", impl.PreferenceExtractor)
    .addNode("Replier", impl.Replier)
    .addNode("Clarifier", impl.Clarifier)
    .addEdge(START, "PreferenceExtractor")
    .addEdge("Replier", END)
    .addEdge("Clarifier", END)
    .addConditionalEdges(
        "PreferenceExtractor",
        impl.IsPreferenceClear,
        [
            "Replier",
            "Clarifier",
        ]
    )
}