import { ActivityType } from "discord.js";

function Ready(client)
{
    client.user.setPresence({
        activities: [{ name: "En développement...", type: ActivityType.Streaming, url: "https://twitch.tv/bsktv_" }],
        status: 'dnd',
    });
    console.log(`Bot connected on the account: ${client.user.tag}`);
}

const event = {
    name: "ready",
    run: (client) => Ready(client),
}

export default event;