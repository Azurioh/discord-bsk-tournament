import { ActivityType, Events } from "discord.js";
import deployCommands from "../utils/deployCommands.js";

function Ready(client)
{
    deployCommands(client);
    client.user.setPresence({
        activities: [{ name: "En développement...", type: ActivityType.Streaming, url: "https://twitch.tv/bsktv_" }],
        status: 'dnd',
    });
    console.log(`Bot connected on the account: ${client.user.tag}`);
}

const event = {
    name: Events.ClientReady,
    run: (client) => Ready(client),
}

export default event;