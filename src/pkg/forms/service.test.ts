import { NewService, WithFilloutClient } from './service'
import { NewClient } from './fillout/client'

jest.mock('./fillout/client', () => ({
  NewClient: jest.fn()
}))

describe("Fetch Form Contents: ", () => {
  it("Should fetch form contents with filters", async () => {
    const mockClient = NewClient();
    mockClient.FetchFormContents = jest.fn().mockResolvedValue(mockFormContents);

    const service = NewService([WithFilloutClient(mockClient)]);
    service!.FetchContentsWithFilters = jest.fn()

    // Call the function
    const result = await service!.FetchContentsWithFilters({
      id: 'cLZojxk94ous',
      filters: mockFilters
    });

    // Assertions
    expect(result).toEqual({
      responses: [
        {
          "id": "dSRAe3hygqVwTpPK69p5td",
          "name": "Please select a date to schedule your yearly check-in.",
          "type": "DatePicker",
          "value": "2024-05-17T23:20:05.324Z"
        },
      ],
      totalResponses: 1,
      pageCount: 0
    });
    expect(mockClient.FetchFormContents).toHaveBeenCalledWith({ formId: 'some-id' });
  })
})

const mockFilters = `[{ "id": "dSRAe3hygqVwTpPK69p5td", "condition": "less_than", "value": "2024-05-16T23:20:05.324Z" }]`

const mockFormContents = {
  "id": "cLZojxk94ous",
  "name": "Tech Screen Questionnaire",
  "questions": [
    {
      "id": "bE2Bo4cGUv49cjnqZ4UnkW",
      "name": "What is your name?",
      "type": "ShortAnswer"
    },
    {
      "id": "dSRAe3hygqVwTpPK69p5td",
      "name": "Please select a date to schedule your yearly check-in.",
      "type": "DatePicker",
      "value": "2024-05-17T23:20:05.324Z"
    },
    {
      "id": "fFnyxwWa3KV6nBdfBDCHEA",
      "name": "How many employees work under you?",
      "type": "NumberInput"
    },
    {
      "id": "jB2qDRcXQ8Pjo1kg3jre2J",
      "name": "Which department do you work in?",
      "type": "MultipleChoice",
      "options": [
        {
          "id": "5htRiCardXxV2vZm19dczD",
          "value": "Engineering",
          "label": "Engineering"
        },
        {
          "id": "1vSpMUqsU9mXzKQbrqxJVj",
          "value": "Upper management",
          "label": "Upper management"
        },
      ]
    },
    {
      "id": "kc6S6ThWu3cT5PVZkwKUg4",
      "name": "What is your email?",
      "type": "EmailInput"
    }
  ],
  "calculations": [],
  "urlParameters": [],
  "documents": []
}
