import { QuickDB } from "quick.db";
import updateCallChoices from "../utils/updateCallChoices.js";
 
async function Link(interaction, client)
{
    const db = new QuickDB();
    const username = interaction.options.getString("pseudo");
    const usernames = await db.get(`startgg_usernames`) || [];
    const user_info = {
        discordId: 0,
        startgg: "",
    };
    let index = -1;

    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].startgg === username && usernames[i].discordId !== interaction.user.id) {
            interaction.reply({
                content: "Ce pseudo start.gg est déjà lié à un autre compte Discord, veuillez contacter un administrateur",
                ephemeral: true,
            });
            return;
        }
        if (usernames[i].discordId === interaction.user.id) {
            usernames[i].startgg = username;
            index = i;
        }
    }
    if (index === -1) {
        user_info.discordId = interaction.user.id;
        user_info.startgg = username;
        usernames.push(user_info);
    }
    await db.set("startgg_usernames", usernames);
    await updateCallChoices(client);
    interaction.reply({ 
        content: `Félicitations ! Vous avez lié votre compte Discord avec votre compte start.gg\n\n> start.gg : ${username}`,
        ephemeral: true
    });
    return;
}

const command = {
    name: "link",
    description: "Relie ton pseudo start.gg à ton compte Discord",
    options: [
        {
            name: "pseudo",
            description: "Ton pseudo start.gg",
            type: 3,
            required: true,
        }
    ],
    run: async (interaction, client) => Link(interaction, client)
}

export default command;