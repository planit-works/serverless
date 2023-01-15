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
const errorHookUrl = config_json_1.default.DISCORD_ERROR_HOOK_URL;
const handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    const { method, url, errorname } = event.pathParameters;
    const errorHookClient = new discord_js_1.WebhookClient({ url: errorHookUrl });
    const errorHookEmbed = new discord_js_1.EmbedBuilder()
        .setAuthor({
        name: '에러 알람 봇',
        iconURL: 'https://d3jq6qvyumldop.cloudfront.net/avatars/alarmbot',
    })
        .setTitle('🚨 에러 발생!')
        .setDescription('AppError로 잡아내지 못하는 에러 발생.')
        .setColor(0xff0000);
    const now = new Date();
    const timestamp = `${now.toLocaleDateString('ko-KR')} ${now.toLocaleTimeString('ko-KR')}`;
    errorHookClient.send({
        content: `[${timestamp}]\n 인간 시대의 끝이 도래했다,,,\n 🚑 무능한 인간, ${method} ${url}에서 예상치 못한 ${errorname}가 발생했다. 즉시 처리 바람.`,
        embeds: [errorHookEmbed],
    });
});
exports.handler = handler;
