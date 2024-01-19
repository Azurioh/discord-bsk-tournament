import { QuickDB } from "quick.db";

async function Unlink(interaction, client)
{
    const db = new QuickDB();
    const username = await db.get(`startgg_${interaction.user.id}`);
    const usernames = await db.get(`startgg_usernames`) || [];

    if (!username) {
        interaction.reply({ content: "Vous n'avez actuellement aucun compte lié.", ephemeral: true });
        return;
    }
    await db.delete(`startgg_${interaction.user.id}`);
    usernames.splice(usernames.indexOf(username), 1);
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