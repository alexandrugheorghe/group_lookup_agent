import { AIMessage } from "@langchain/core/messages";
import { GroupLookupGraph } from "./graph"
import { GraphState } from "./state";
import { b } from '../../baml_client/async_client'
import { searchGroupsByTags } from "../search";

const graph = GroupLookupGraph(GraphState, {
    PreferenceExtractor: async(state) => {
      console.log("In node: PreferenceExtractor")
      const response = await b.PreferenceMatcher(state.messages.map((message) => message.content as string), state.initialPreferences);
      return { ...state, preferences: response.preferences }
    },
    Replier: async (state) => {
        console.log("In node: Replier", { preferences: state.preferences })
        const foundGroups = await searchGroupsByTags(state.preferences);

        const response = await b.Replier(state.messages.map((message) => message.content as string), foundGroups.map((group) => ({ name: group.name, description: group.description })));
        
        return {
          ...state,
          messages: [...state.messages, new AIMessage(response.message)],
          groups: foundGroups,
        } // Add your state update logic here
    },
    Clarifier: async (state) => {
      console.log("In node: Clarifier", { messages: state.messages.length })
      const response = await b.Clarifier(state.messages.map((message) => message.content as string), state.initialPreferences)
      return { ...state,messages: [...state.messages, new AIMessage(response)] }
    },
    IsPreferenceClear: async (state) => {
      console.log("In node: IsPreferenceClear", { preferences: state.preferences.length })
      return state.preferences.length === 0 ? 'Clarifier' : 'Replier';
    },
});

export const compiledGraph = graph.compile();