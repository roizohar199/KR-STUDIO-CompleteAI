import { Client } from "basic-ftp";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function deploy() {
  const client = new Client();
  try {
    await client.access({
      host: "46.202.156.142",
      user: "u112570103",
      password: "Roizohar1985!",
      secure: false,
    });
    console.log('Current working directory:', await client.pwd());
    // נסה להדפיס את התיקיות
    console.log('Root folders:', await client.list("/"));
    console.log('Domains folders:', await client.list("/domains"));
    // העלה לנתיב המלא
    await client.ensureDir("/domains/mixifyai.k-rstudio.com/public_html");
    await client.clearWorkingDir();
    await client.uploadFromDir(__dirname + "/dist");
    console.log("העלאה הסתיימה!");
  } catch (err) {
    console.error(err);
  }
  client.close();
}

deploy();