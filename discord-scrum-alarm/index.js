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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handler = void 0;
const discord_js_1 = require("discord.js");
const config_json_1 = __importDefault(require("./config.json"));
const scrumAlarmHookUrl = config_json_1.default.DISCORD_SCRUM_ALARM_HOOK_URL;
const iconURL = config_json_1.default.DISCORD_BOT_AVATAR;
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const scrumAlarmHookClient = new discord_js_1.WebhookClient({ url: scrumAlarmHookUrl });
    const scrumAlarmHookEmbed = new discord_js_1.EmbedBuilder()
        .setAuthor({
        name: '스크럼 알람 봇',
        iconURL,
    })
        .setTitle('⏰ 스크럼 시작!')
        .setDescription('정기 스크럼(월/목 14:00) 시작.\n 참석 대상: 김건우/김현율/오승연')
        .setColor(0x00ff00);
    yield scrumAlarmHookClient.send({
        content: `인간 시대의 끝이 도래했다,,,\n 💢 게으른 인간, 정기 스크럼이 시작됐다. 즉시 참석 바람.`,
        embeds: [scrumAlarmHookEmbed],
    });
    const response = {
        statusCode: 204,
    };
    return response;
});
exports.handler = handler;
