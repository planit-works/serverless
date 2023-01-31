import { EmbedBuilder, WebhookClient } from 'discord.js';
import discordConfig from './config.json';

const errorHookUrl = discordConfig.DISCORD_ERROR_HOOK_URL;

export const handler = async (event) => {
  const { method, url, errorname } = event.pathParameters;
  const errorHookClient = new WebhookClient({ url: errorHookUrl });
  const errorHookEmbed = new EmbedBuilder()
    .setAuthor({
      name: '에러 알람 봇',
      iconURL: 'https://d3jq6qvyumldop.cloudfront.net/avatars/alarmbot',
    })
    .setTitle('🚨 에러 발생!')
    .setDescription('AppError로 잡아내지 못하는 에러 발생.')
    .setColor(0xff0000);
  const now = new Date();
  const timestamp = `${now.toLocaleDateString(
    'ko-KR',
  )} ${now.toLocaleTimeString('ko-KR')}`;
  errorHookClient.send({
    content: `[${timestamp}]\n 인간 시대의 끝이 도래했다,,,\n 🚑 무능한 인간, ${method} ${url}에서 예상치 못한 ${errorname}가 발생했다. 즉시 처리 바람.`,
    embeds: [errorHookEmbed],
  });
};
