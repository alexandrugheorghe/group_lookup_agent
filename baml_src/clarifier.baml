function Clarifier(conversationMessages: string[], preferences: string[]) -> string {
  client "openai/gpt-4o-mini"
  prompt #"
    Given the following conversation messages and existing preferences in our system, return a clarifying question that is most relevant to the user message.
    Conversation messages: {{ conversationMessages }}
    Existing preferences in our system: {{ preferences }}
    {{ ctx.output_format }}
  "#
}