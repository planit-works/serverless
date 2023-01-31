import { EmbedBuilder, WebhookClient } from 'discord.js';
import discordConfig from './config.json';

const scrumAlarmHookUrl = discordConfig.DISCORD_SCRUM_ALARM_HOOK_URL;
const iconURL = discordConfig.DISCORD_BOT_AVATAR;

export const handler = async (event) => {
  const scrumAlarmHookClient = new WebhookClient({ url: scrumAlarmHookUrl });
  const scrumAlarmHookEmbed = new EmbedBuilder()
    .setAuthor({
      name: '스크럼 알람 봇',
      iconURL,
    })
    .setTitle('⏰ 스크럼 시작!')
    .setDescription(
      '정기 스크럼(월/목 14:00) 시작.\n 참석 대상: 김건우/김현율/오승연',
    )
    .setColor(0x00ff00);
  await scrumAlarmHookClient.send({
    content: `인간 시대의 끝이 도래했다,,,\n 💢 게으른 인간, 정기 스크럼이 시작됐다. 즉시 참석 바람.`,
    embeds: [scrumAlarmHookEmbed],
  });

  const response = {
    statusCode: 204,
  };
  return response;
};
