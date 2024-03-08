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

export type TOption = {
  id: string;
  value: string;
  label: string;
}

export type TQuestion = {
  id: string;
  name: string;
  type: TQuestionType;
  value?: string | number | TIsoDate;
  options?: TOption[];
}

export enum TFilterCondition {
  Equals = 'equals',
  DoesNotEqual = 'does_not_equal',
  GreaterThan = 'greater_than',
  LessThan = 'less_than'
}

export type TFilter = {
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
  totalResponses: number;
  pageCount: number;
}

export type THeaders = {
  Authorization: string;
  "Content-Type": string;
}
