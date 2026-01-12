class Group {
  name string
  description string
}

class GroupResponse {
  message string
}

function Replier(userMessages: string[], groups: Group[]) -> GroupResponse {
  client "openai/gpt-4o-mini"
  prompt #"
    Your purpose is to present to the user chat groups that are most relevant to the user messages.
    Given the following user messages and found groups, return a message and the groups that are most relevant to the user messages.
    User Messages: {{ userMessages }}
    Found groups: {{ groups }}
    {{ ctx.output_format }}
  "#
}