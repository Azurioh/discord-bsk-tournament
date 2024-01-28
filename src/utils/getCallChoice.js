import { QuickDB } from "quick.db";

async function getCallChoices()
{
    const db = new QuickDB();
    const usernames = await db.get(`startgg_usernames`) || [];
    const choices = [];
    let info = {};

    for (let i = 0; i < usernames.length && i < 100; i++) {
        info.name = `${usernames[i].startgg}`;
        info.value = usernames[i].startgg;
        choices.push(info);
    }
    return choices;
}

export default getCallChoices;