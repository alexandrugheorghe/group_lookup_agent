class Group {
  name string
  description string
}

class GroupResponse {
  message string
}

function Replier(conversationMessages: string[], groups: Group[]) -> GroupResponse {
  client "openai/gpt-4o-mini"
  prompt #"
    Your purpose is to present to the user chat groups that are most relevant to the conversation messages.
    Given the following conversation messages and found groups, return a message and the groups that are most relevant to the conversation messages.
    The generate message should always contain the groups and the description of the groups.
    Conversation messages: {{ conversationMessages }}
    Found groups: {{ groups }}
    {{ ctx.output_format }}
  "#
}