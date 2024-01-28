import { QuickDB } from "quick.db";

async function Unlink(interaction, client)
{
    const db = new QuickDB();
    const usernames = await db.get(`startgg_usernames`) || [];
    let index = -1;

    for (let i = 0; i < usernames.length; i++) {
        if (usernames[i].discordId === interaction.user.id) {
            index = i;
        }
    }
    if (index === -1) {
        interaction.reply({ content: "Vous n'avez actuellement aucun compte lié.", ephemeral: true });
        return;
    }
    usernames.splice(index, 1);
    await db.set(`startgg_usernames`, usernames);
    interaction.reply({ content: "Vous avez bien désynchroniser votre compte start.gg de votre compte Discord", ephemeral: true });
    return;
}

const command = {
    name: "unlink",
    description: "Désynchronise ton pseudo start.gg avec ton compte Discord",
    run: async (interaction, client) => Unlink(interaction, client),
}

export default command;