export const dummyResponse = {
  "id": "cLZojxk94ous",
  "name": "Tech Screen Questionnaire",
  "questions": [
    {
      "id": "4KC356y4M6W8jHPKx9QfEy",
      "name": "Anything else you'd like to share before your call?",
      "type": "LongAnswer"
    },
    {
      "id": "bE2Bo4cGUv49cjnqZ4UnkW",
      "name": "What is your name?",
      "type": "ShortAnswer",
      "value": "Jeremy"
    },
    {
      "id": "dSRAe3hygqVwTpPK69p5td",
      "name": "Please select a date to schedule your yearly check-in.",
      "type": "DatePicker",
      "value": "2024-05-16T23:20:05.324Z"
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
        {
          "id": "e4qgpfVGZfD3FixUBU1CqJ",
          "value": "Human resources",
          "label": "Human resources"
        },
        {
          "id": "okokaN19gTvEBbACGFj6jc",
          "value": "Recruiting",
          "label": "Recruiting"
        }
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
  "documents": [],
  "totalResponses": 1,
  "pageCount": 1
}

export enum TQuestionType {
  Address = 'Address',
  AudioRecording = 'AudioRecording',
  Calcom = 'Calcom',
  Calendly = 'Calendly',
  Captcha = 'Captcha',
  Checkbox = 'Checkbox',
  Checkboxes = 'Checkboxes',
  ColorPicker = 'ColorPicker',
  CurrencyInput = 'CurrencyInput',
  DatePicker = 'DatePicker',
  DateRange = 'DateRange',
  DateTimePicker = 'DateTimePicker',
  Dropdown = 'Dropdown',
  EmailInput = 'EmailInput',
  FileUpload = 'FileUpload',
  ImagePicker = 'ImagePicker',
  LocationCoordinates = 'LocationCoordinates',
  LongAnswer = 'LongAnswer',
  Matrix = 'Matrix',
  MultiSelect = 'MultiSelect',
  MultipleChoice = 'MultipleChoice',
  NumberInput = 'NumberInput',
  OpinionScale = 'OpinionScale',
  Password = 'Password',
  Payment = 'Payment',
  PhoneNumber = 'PhoneNumber',
  Ranking = 'Ranking',
  RecordPicker = 'RecordPicker',
  ShortAnswer = 'ShortAnswer',
  Signature = 'Signature',
  Slider = 'Slider',
  StarRating = 'StarRating',
  Switch = 'Switch',
  TimePicker = 'TimePicker',
  URLInput = 'URLInput'
}

export type TIsoDate = string;
export type TQuestionValue = string | number | TIsoDate;

export type TOption = {
  id: string;
  value: string;
  label: string;
}

export type TQuestion = {
  id: string;
  name: string;
  type: string;
  value?: TQuestionValue;
  options?: TOption[];
}

export enum TFilterCondition {
  Equals = 'equals',
  DoesNotEqual = 'does_not_equal',
  GreaterThan = 'greater_than',
  LessThan = 'less_than'
}

type TFilter = {
  id: string;
  condition: TFilterCondition;
  value: number | string;
}

export type TFilters = TFilter[]

export type TRequest = {
  id: string;
  filters: string;
}

export type TResponse = {
  id: string;
  name: string;
  questions: TQuestion[];
  calculations: any,
  urlParameters: any,
  documents: any,
  totalResponses: number;
  pageCount: number;
}

export type THeaders = {
  Authorization: string;
  "Content-Type": string;
}
