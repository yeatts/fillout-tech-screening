"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFilterCondition = exports.TQuestionType = exports.dummyResponse = void 0;
exports.dummyResponse = {
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
};
var TQuestionType;
(function (TQuestionType) {
    TQuestionType["Address"] = "Address";
    TQuestionType["AudioRecording"] = "AudioRecording";
    TQuestionType["Calcom"] = "Calcom";
    TQuestionType["Calendly"] = "Calendly";
    TQuestionType["Captcha"] = "Captcha";
    TQuestionType["Checkbox"] = "Checkbox";
    TQuestionType["Checkboxes"] = "Checkboxes";
    TQuestionType["ColorPicker"] = "ColorPicker";
    TQuestionType["CurrencyInput"] = "CurrencyInput";
    TQuestionType["DatePicker"] = "DatePicker";
    TQuestionType["DateRange"] = "DateRange";
    TQuestionType["DateTimePicker"] = "DateTimePicker";
    TQuestionType["Dropdown"] = "Dropdown";
    TQuestionType["EmailInput"] = "EmailInput";
    TQuestionType["FileUpload"] = "FileUpload";
    TQuestionType["ImagePicker"] = "ImagePicker";
    TQuestionType["LocationCoordinates"] = "LocationCoordinates";
    TQuestionType["LongAnswer"] = "LongAnswer";
    TQuestionType["Matrix"] = "Matrix";
    TQuestionType["MultiSelect"] = "MultiSelect";
    TQuestionType["MultipleChoice"] = "MultipleChoice";
    TQuestionType["NumberInput"] = "NumberInput";
    TQuestionType["OpinionScale"] = "OpinionScale";
    TQuestionType["Password"] = "Password";
    TQuestionType["Payment"] = "Payment";
    TQuestionType["PhoneNumber"] = "PhoneNumber";
    TQuestionType["Ranking"] = "Ranking";
    TQuestionType["RecordPicker"] = "RecordPicker";
    TQuestionType["ShortAnswer"] = "ShortAnswer";
    TQuestionType["Signature"] = "Signature";
    TQuestionType["Slider"] = "Slider";
    TQuestionType["StarRating"] = "StarRating";
    TQuestionType["Switch"] = "Switch";
    TQuestionType["TimePicker"] = "TimePicker";
    TQuestionType["URLInput"] = "URLInput";
})(TQuestionType || (exports.TQuestionType = TQuestionType = {}));
var TFilterCondition;
(function (TFilterCondition) {
    TFilterCondition["Equals"] = "equals";
    TFilterCondition["DoesNotEqual"] = "does_not_equal";
    TFilterCondition["GreaterThan"] = "greater_than";
    TFilterCondition["LessThan"] = "less_than";
})(TFilterCondition || (exports.TFilterCondition = TFilterCondition = {}));
