import { PermissionFlagsBits, PermissionsBitField } from "discord.js";
import { QuickDB } from "quick.db";

const db = new QuickDB();
const usernames = await db.get(`startgg_usernames`) || [];
const choices = [];
let info = {};

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

function Call(interaction, client) 
{
    const username = interaction.options.getString("pseudo");

    for (let i = 0; i < usernames.length; i++) {
        if (username === usernames[i].startgg) {
            SendMessage(interaction, usernames[i].discordId);
            return;
        }
    }
    interaction.reply({ content: "Aucune donnée sur l'utilisateur n'a été trouvé dans la base de donnée", ephemeral: true });
    return;
}

for (let i = 0; i < usernames.length && i < 100; i++) {
    info.name = `${usernames[i].startgg}`;
    info.value = usernames[i].startgg;
    choices.push(info);
}
const command = {
    name: "call",
    description: "Ping un utilisateur en DM",
    options: [
        {
            name: "pseudo",
            description: "Pseudo startgg de l'utilisateur",
            type: 3,
            choices: choices,
            required: true,
        },
    ],
    default_member_permissions: 8,
    run: (interaction, client) => Call(interaction, client),
}

export default command;