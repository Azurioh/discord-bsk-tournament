import { QuickDB } from "quick.db";
import updateCallChoices from "../utils/updateCallChoices.js";
import getCallChoices from "../utils/getCallChoice.js";

async function ForceLink(interaction, client)
{
    const db = new QuickDB();
    const usernames = await db.get(`startgg_usernames`) || [];
    const username = interaction.options.getString("pseudo");
    const discordUser = interaction.guild.members.cache.get(interaction.options.getUser("utilisateur").id);
    const user_info = {};

    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].startgg === username) {
            interaction.reply({ 
                content: `Le pseudo \`${username}\` est déjà lié à un utilisateur | (${discordUser})`,
                ephemeral: true
            });
            return;
        }
    }
    user_info.startgg = username;
    user_info.discordId = discordUser.user.id;
    usernames.push(user_info);
    await db.set("startgg_usernames", usernames);
    await updateCallChoices(client);
    interaction.reply({
        content: `Le pseudo \`${username}\` a bien été asigné à ${discordUser}`,
        ephemeral: true
    });
    return;
}

async function ForceUnlink(interaction, client)
{
    const db = new QuickDB();
    const usernames = await db.get(`startgg_usernames`) || [];
    const username = interaction.options.getString("pseudo");
    let discordId;

    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].startgg === username) {
            discordId = usernames[i].discordId;
            usernames.splice(i, 1);
            await db.set("startgg_usernames", usernames);
            await updateCallChoices(client);
            interaction.reply({
                content: `Le pseudo \`${username}\` a bien été retiré de <@${discordId}>`,
                ephemeral: true
            });
            return;
        }
    }
    interaction.reply({
        content: `Aucun utilisateur n'est lié au pseudo \`${username}\``,
        ephemeral: true,
    });
    return;
}

async function Force(interaction, client) 
{
    const subcommand = interaction.options.getSubcommand();

    return subcommand === "link" ? await ForceLink(interaction, client) : await ForceUnlink(interaction, client);
}

const command = {
    name: "force",
    description: "Commandes administrateurs",
    options: [
        {
            name: "link",
            description: "Force l'association entre un compte Discord et un pseudo startgg",
            type: 1,
            options: [
                {
                    name: "pseudo",
                    description: "Le pseudo startgg",
                    type: 3,
                    required: true,
                },
                {
                    name: "utilisateur",
                    description: "L'utilisateur souhaité",
                    type: 6,
                    required: true,
                },
            ],
        },
        {
            name: "unlink",
            description: "Force la désassociation d'un compte Discord et d'un pseudo startgg",
            type: 1,
            options: [
                {
                    name: "pseudo",
                    description: "Pseudo startgg",
                    type: 3,
                    choices: await getCallChoices(),
                    required: true,
                },
            ],
        },
    ],
    default_member_permissions: 8,
    run: async (interaction, client) => Force(interaction, client)
}

export default command;