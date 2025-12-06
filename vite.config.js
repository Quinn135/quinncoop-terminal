import { defineConfig } from 'vite'
import { execSync } from "child_process"
import tailwindcss from '@tailwindcss/vite'

const commandsStr = `<div class="line flex flex-row"><span class="green">user@quinncoop.com</span>:<span class="blue">/</span>&amp;&nbsp;<span class="flex flex-nowrap">help</span></div><div class="line flex flex-row flex-wrap">Commands: <br>ls&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - lists directory (folders in blue and files in white)<br>cd [folder]&nbsp; - enter a directory, leave blank to go to /<br>open [file]&nbsp; - opens a file<br>clear&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - clears the terminal<br>help&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - lists available commands<br></div>`;

export default defineConfig({
    plugins: [tailwindcss(), {
        name: "generate-help", async transformIndexHtml(html) {
            var newHtml = html.replace('<!-- replace -->',
                commandsStr.replaceAll("\n", "<br>"));

            var commitNum = execSync("git rev-list --count HEAD").toString().trim();
            newHtml = newHtml.replace('{version}', "#" + commitNum);

            return newHtml;
        }
    }], server: { port: 3000 }
})