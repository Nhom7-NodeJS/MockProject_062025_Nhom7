"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReporterIncidentRelationship = exports.ReportStatus = exports.CrimeType = exports.SeverityLevel = void 0;
var SeverityLevel;
(function (SeverityLevel) {
    SeverityLevel["MINOR"] = "Minor";
    SeverityLevel["MODERATE"] = "Moderate";
    SeverityLevel["SERIOUS"] = "Serious";
    SeverityLevel["CRITICAL"] = "Critical";
})(SeverityLevel || (exports.SeverityLevel = SeverityLevel = {}));
var CrimeType;
(function (CrimeType) {
    CrimeType["CRIMES_AGAINST_PERSONS"] = "Crimes Against Persons";
    CrimeType["CRIMES_AGAINST_PROPERTY"] = "Crimes Against Property";
    CrimeType["WHITE_COLLAR_CRIMES"] = "White-Collar Crimes";
    CrimeType["CYBER_CRIMES"] = "Cyber Crimes";
    CrimeType["DRUG_RELATED_CRIMES"] = "Drug-related Crimes";
    CrimeType["PUBLIC_ORDER_CRIMES"] = "Public Order Crimes";
})(CrimeType || (exports.CrimeType = CrimeType = {}));
var ReportStatus;
(function (ReportStatus) {
    ReportStatus["APPROVED"] = "Approved";
    ReportStatus["PENDING"] = "Pending";
    ReportStatus["REJECTED"] = "Rejected";
})(ReportStatus || (exports.ReportStatus = ReportStatus = {}));
var ReporterIncidentRelationship;
(function (ReporterIncidentRelationship) {
    ReporterIncidentRelationship["VICTIM"] = "Victim";
    ReporterIncidentRelationship["WITNESS"] = "Witness";
    ReporterIncidentRelationship["BYSTANDER"] = "Bystander";
})(ReporterIncidentRelationship || (exports.ReporterIncidentRelationship = ReporterIncidentRelationship = {}));
