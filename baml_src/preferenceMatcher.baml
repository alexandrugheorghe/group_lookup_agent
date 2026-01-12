class PreferencesResponse {
  preferences string[]
}

function PreferenceMatcher(userMessages: string[], preferences: string[]) -> PreferencesResponse {
  client "openai/gpt-4o-mini"
  prompt #"
    Given the following user messages and existing preferences in our system, return the preferences that are most relevant to the user message.
    If no preferences are relevant, return an empty array.
    User Messages: {{ userMessages }}
    Existing preferences in our system: {{ preferences }}
    {{ ctx.output_format }}
  "#
}