import getCallChoices from "./getCallChoice.js";

async function updateCallChoices(client)
{
    const choices = await getCallChoices();

    let com = client.commands.find(cmd => cmd.name === "call");
    if (com) {
        com.options[0].choices = choices;
    }
    com = client.commands.find(cmd => cmd.name === "force");
    if (com) {
        com.options[1].options[0].choices = choices;
    }
}

export default updateCallChoices;