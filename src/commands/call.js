import { QuickDB } from "quick.db";
import getCallChoices from "../utils/getCallChoice.js";

function SendMessage(interaction, userId)
{
    const user = interaction.guild.members.cache.get(userId);

    if (!user) {
        interaction.reply({ content: "Le membre n'est pas présent sur le serveur", ephemeral: true });
        return;
    }
    try {
        user.send({ content: "Votre match va commencer ! Vous avez 5 minutes pour être au bureau des TO sous peine d'être disqualifié" });
        interaction.reply({ content: "Message envoyé à l'utilisateur", ephemeral: true });
    } catch (err) {
        console.error(err);
        interaction.reply({ content: `Impossible d'envoyer le message à l'utilisateur. Voici son compte Discord: ${user}`, ephemeral: true });
    }
    return;
}

async function Call(interaction, client) 
{
    const db = new QuickDB();
    const username = interaction.options.getString("pseudo");
    const usernames = await db.get(`startgg_usernames`) || [];

    for (let i = 0; i < usernames.length; i++) {
        if (username === usernames[i].startgg) {
            SendMessage(interaction, usernames[i].discordId);
            return;
        }
    }
    interaction.reply({ content: "Aucune donnée sur l'utilisateur n'a été trouvé dans la base de donnée", ephemeral: true });
    return;
}

const command = {
    name: "call",
    description: "Ping un utilisateur en DM",
    options: [
        {
            name: "pseudo",
            description: "Pseudo startgg de l'utilisateur",
            type: 3,
            choices: await getCallChoices(),
            required: true,
        },
    ],
    default_member_permissions: 8,
    run: (interaction, client) => Call(interaction, client),
}

export default command;