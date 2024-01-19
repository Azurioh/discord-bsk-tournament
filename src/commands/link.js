import { QuickDB } from "quick.db";

async function Link(interaction, client)
{
    const db = new QuickDB();
    const username = interaction.options.getString("pseudo");
    const usernames = await db.get(`startgg_usernames`) || [];
    const username_in_db = await db.get(`startgg_${interaction.user.id}`);

    await db.set(`startgg_${interaction.user.id}`, username);
    if (username_in_db) {
        usernames.splice(usernames.indexOf(username_in_db), 1);
    }
    usernames.push(username);
    await db.set("startgg_usernames", usernames);
    interaction.reply({ 
        content: `Félicitations ! Vous avez lié votre compte Discord avec votre compte start.gg\n\n> start.gg : ${username}`,
        ephemeral: true
    });
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