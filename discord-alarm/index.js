const { EmbedBuilder, WebhookClient } = require('discord.js');

const scrumAlarmHookUrl = process.env.DISCORD_ALARM_HOOK_URL;
const iconURL = process.env.DISCORD_BOT_AVATAR;

module.exports.handler = async function (event) {
  const { title, description, content } = JSON.parse(event.body);
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
