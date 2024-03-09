"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TFilterCondition = exports.TQuestionType = void 0;
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