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
    
    // העלה לנתיב המלא
    await client.ensureDir("/domains/mixifyai.k-rstudio.com/public_html");
    await client.clearWorkingDir();
    
    console.log('Uploading files...');
    
    // העלאת כל התוכן מתיקיית dist ישירות
    await client.uploadFromDir(__dirname + "/dist");
    console.log('✅ All files from dist uploaded');
    
    console.log("העלאה הסתיימה!");
  } catch (err) {
    console.error('Error during deployment:', err);
  } finally {
    client.close();
  }
}

deploy();