"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getStartAndEndDates = void 0;
function getStartAndEndDates(date) {
    return __awaiter(this, void 0, void 0, function* () {
        const month = date.getMonth();
        let startMonth, endMonth, semester;
        if (month >= 0 && month <= 3) {
            startMonth = 0; // January
            endMonth = 3; // April
            semester = `Sping` + date.getFullYear();
        }
        else if (month >= 4 && month <= 7) {
            startMonth = 4; // May
            endMonth = 7; // August
            semester = `Summer` + date.getFullYear();
        }
        else {
            startMonth = 8; // September
            endMonth = 11; // December
            semester = `Fall` + date.getFullYear();
        }
        const start_date = (new Date(date.getFullYear(), startMonth, 1)).toISOString().slice(0, 10); // first day of startMonth
        const end_date = (new Date(date.getFullYear(), endMonth + 1, 0)).toISOString().slice(0, 10); // last day of endMonth
        return { start_date, end_date, semester };
    });
}
exports.getStartAndEndDates = getStartAndEndDates;
