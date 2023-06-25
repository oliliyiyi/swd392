"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.query = exports.db = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
exports.db = promise_1.default.createPool({
    host: "us-cdbr-east-06.cleardb.net",
    user: "b7cb6abdc6e09c",
    password: "c1ca7b98",
    database: "heroku_dc76636fca04c0f",
    port: 3306,
});
function query(sql, values) {
    return __awaiter(this, void 0, void 0, function* () {
        let connection;
        try {
            connection = yield exports.db.getConnection();
            const [rows, fields] = yield connection.query(sql, values);
            return rows;
        }
        catch (error) {
            console.error(error);
            throw new Error(error);
        }
        finally {
            if (connection) {
                if (typeof connection.release === 'function') {
                    connection.release();
                }
            }
        }
    });
}
exports.query = query;
// export async function query1(sql: string, val: any) {
//   return new Promise((resolve, rejects) => {
//     db.query(sql, val, function (err, results, fields) {
//       if (err) {
//         return rejects(err);
//       }
//       return resolve(results);
//     });
//   });
// }
