import loadClient from "./utils/loadClient.js";
import { config } from "dotenv";

config();
const client = loadClient();

if (client === null) {
    console.error("An error has occured, closing the program...");
    exit(0);
} else {
    client.login(client.config.TOKEN);
}