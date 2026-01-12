function Clarifier(userMessages: string[], preferences: string[]) -> string {
  client "openai/gpt-4o-mini"
  prompt #"
    Given the following user message and existing preferences in our system, return a clarifying question that is most relevant to the user message.
    User Messages: {{ userMessages }}
    Existing preferences in our system: {{ preferences }}
    {{ ctx.output_format }}
  "#
}