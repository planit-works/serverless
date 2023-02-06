const { EmbedBuilder, WebhookClient } = require('discord.js');

const scrumAlarmHookUrl = process.env.DISCORD_ALARM_HOOK_URL;
const iconURL = process.env.DISCORD_BOT_AVATAR;

module.exports.handler = async function (event) {
  const type = event.resources.at(0);
  let title, description, content;
  if (type === process.env.JIRA_EVENT_TYPE) {
    title = '⏰ 지라 정리!';
    description = '지라 업데이트 필요.\n 대상: 김건우/김현율/오승연';
    content =
      '인간 시대의 끝이 도래했다,,,\n 💢 나태한 인간, 지라 정리가 필요하다. 즉시 실행 바람.';
  }
  if (type === process.env.SCRUM_EVENT_TYPE) {
    title = '⏰ 스크럼 시작!';
    description =
      '정기 스크럼(월/목 14:00) 시작.\n 참석 대상: 김건우/김현율/오승연';
    content =
      '인간 시대의 끝이 도래했다,,,\n 💢 게으른 인간, 정기 스크럼이 시작됐다. 즉시 참석 바람.';
  }
  const scrumAlarmHookClient = new WebhookClient({ url: scrumAlarmHookUrl });
  const scrumAlarmHookEmbed = new EmbedBuilder()
    .setAuthor({
      name: '알람 봇',
      iconURL,
    })
    .setTitle(`⏰ ${title}`)
    .setDescription(`${description}`)
    .setColor(0x00ff00);
  await scrumAlarmHookClient.send({
    content,
    embeds: [scrumAlarmHookEmbed],
  });

  const response = {
    statusCode: 204,
  };
  return response;
};
