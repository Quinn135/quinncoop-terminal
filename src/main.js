// import all command functions from "./commands.js"
// import * as cmd from "./commands.js";

var log = document.getElementById("log");
// var filler = document.getElementById("filler");
var input = document.getElementById("input");
var cursor = document.getElementById("cursor");
var dirElem = document.getElementById("dir");
var helpElem = document.getElementById("help");

const cursorStr = `<span class="inline-block cursorAnimate cursor" id="cursor"></span><span class="loader" id="loader" hidden="true"></span>`;

var dvd = document.getElementById("dvd");
var x = 0;
var y = 0;
var dx = 3;
var dy = 3;
const colors = ["red", "blue", "green", "yellow", "purple", "cyan", "magenta", "orange", "lime", "pink"];
var nowColor = 0;

var hiddenInput = document.getElementById("hiddenInput");

var cursorPos = 0;

window.mobileAndTabletCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

var logs = [];
var logsCrude = [""];
var logIndex = 0;
var logRefIndex = logIndex;

var dir = "/";

var processing = false;

const fileSystem = new Map([
    ["/", { type: "folder" }],
    ["/sites", { type: "folder" }],
    ["/sites/quinncoop.com", { type: "folder", fileName: undefined, children: ["index", "b", "images", "old", "scroll", ""] }],
    ["/sites/quinncoop.html", { type: "file", fileName: "quinncoop.html", content: "https://quinncoop.com/" }],
    ["/sites/quinncoop.com/b.html", { type: "file", fileName: "b.html", content: "https://b.quinncoop.com/" }],
    ["/sites/quinncoop.com/images.html", { type: "file", fileName: "images.html", content: "https://images.quinncoop.com/" }],
    ["/sites/quinncoop.com/old.html", { type: "file", fileName: "old.html", content: "https://old.quinncoop.com/" }],
    ["/sites/quinncoop.com/scroll.html", { type: "file", fileName: "scroll.html", content: "https://scroll.quinncoop.com/" }],
    ["/sites/quinncoop.com/hi.html", { type: "file", fileName: "hi.html", content: "https://hi.quinncoop.com/" }],
    ["/sites/alloew.com", {
        type: "folder", fileName: undefined
    }],
    ["/sites/alloew.html", { type: "file", fileName: "alloew.html", content: "https://alloew.com/" }],
    ["/sites/alloew.com/airlift.html", { type: "file", fileName: "airlift.html", content: "https://airlift.alloew.com/" }],
    ["/sites/alloew.com/bob.html", { type: "file", fileName: "bob.html", content: "https://bob.alloew.com/" }],
    ["/sites/alloew.com/confetti.html", { type: "file", fileName: "confetti.html", content: "https://confetti.alloew.com/" }],
    ["/sites/alloew.com/emoji.html", { type: "file", fileName: "emoji.html", content: "https://emoji.alloew.com/" }],
    ["/sites/alloew.com/hi.html", { type: "file", fileName: "hi.html", content: "https://hi.alloew.com/" }],
    ["/sites/alloew.com/jacob.html", { type: "file", fileName: "jacob.html", content: "https://jacob.alloew.com/" }],
    ["/sites/alloew.com/purple.html", { type: "file", fileName: "purple.html", content: "https://shmurplelurplepurple.alloew.com/" }],
    ["/sites/alloew.com/spend.html", { type: "file", fileName: "spend.html", content: "https://spend.alloew.com/" }],
    ["/sites/alloew.com/think.html", { type: "file", fileName: "think.html", content: "https://think.alloew.com/" }],
    ["/sites/alloew.com/time.html", { type: "file", fileName: "time.html", content: "https://time.alloew.com/" }],
    ["/sites/alloew.com/w.html", { type: "file", fileName: "w.html", content: "https://w.alloew.com/" }],
    ["/sites/alloew.com/b.html", { type: "file", fileName: "b.html", content: "https://b.alloew.com/" }],
    ["/sites/alloew.com/weeb.html", { type: "file", fileName: "weeb.html", content: "https://weeb.alloew.com/" }],
    ["/sites/alloew.com/words.html", { type: "file", fileName: "words.html", content: "https://words.alloew.com/" }],
    ["/aboutme.txt", { type: "file", fileName: "aboutme.txt", content: "/aboutme.txt" }]

]);

function ls() {
    var returnStr = "<span class='flex flex-row flex-wrap gap-x-3'><p style='color: #fbcfa0' class='w-full'>folders are blue, files are white:</p>";
    fileSystem.forEach((elem, path) => {
        if (elem.type == "file") {
            var filePath = path.slice(0, path.indexOf(elem.fileName) - 1);
            console.log(filePath);
            // console.log(filePath, dir);
            if (filePath == dir || filePath == "" && dir == "/") {
                returnStr += `<p>${elem.fileName.replace(`${dir}/`, "")}</p>`;
            }
        } else {
            // console.log(path, path.split("/").length - 1, dir.split("/").length, path.split("/"));
            if (path != dir && elem.type == "folder" && path.split("/").length - 1 == dir.split("/").length && path.indexOf(dir) >= 0) {
                if (dir.split("/")[1] != "") {
                    returnStr += `<p class="blue whitespace-pre-wrap">${path.replace(dir + "/", "")}</p>`;
                }
            } else if (path != dir && elem.type == "folder" && path.split("/").length == dir.split("/").length && path.indexOf(dir) >= 0) {
                // console.log(path);
                if (dir.split("/")[1] == "") {
                    returnStr += `<p class="blue whitespace-pre-wrap">${path.replace(dir, "")}</p>`;
                }
            }
        }
    });
    // files = lsArrayFiles()
    // dirs = lsArrayDirectories()

    // dirs.forEach((d) => {
    //     returnStr += `<p class="blue whitespace-pre-wrap">${d}</p>`;
    // });

    // files.forEach((f) => {
    //     returnStr += `<p>${f}</p>`;
    // });

    if (returnStr == "") {
        returnStr == "No folders or files present...";
    }

    returnStr += "</span>";
    return returnStr;
}

function lsArrayFiles() {
    var files = [];

    fileSystem.forEach((elem, path) => {
        if (elem.type == "file") {
            var filePath = path.slice(0, path.indexOf(elem.fileName) - 1);
            // console.log(filePath, dir);
            if (filePath == dir || filePath == "" && dir == "/") {
                files.push(elem.fileName.replace(`${dir}/`, ""));
                // returnStr += `<p>${elem.fileName.replace(`${dir}/`, "")}</p>`;
            }
        }
    });

    return files;
}

function lsArrayDirectories() {
    var dirs = [];

    fileSystem.forEach((elem, path) => {
        if (elem.type == "folder") {
            // if (path != dir && elem.type == "folder" && path.split("/").length == dir.split("/").length && path.indexOf(dir) >= 0) {
            // }

            if (path != dir && elem.type == "folder" && path.split("/").length - 1 == dir.split("/").length && path.indexOf(dir) >= 0) {
                if (dir.split("/")[1] != "") {
                    dirs.push(path.replace(dir + "/", ""));
                    // returnStr += `<p class="blue whitespace-pre-wrap">${path.replace(dir + "/", "")}</p>`;
                }
            } else if (path != dir && elem.type == "folder" && path.split("/").length == dir.split("/").length && path.indexOf(dir) >= 0) {
                // console.log(path);
                if (dir.split("/")[1] == "") {
                    dirs.push(path.replace(dir, ""));
                    // returnStr += `<p class="blue whitespace-pre-wrap">${path.replace(dir, "")}</p>`;
                }
            }
        }
    });

    return dirs;
}

function cd(args) {
    // console.log(JSON.stringify(args));
    if (args.length == 1 + 1) {
        var arg = args[1];
        if (arg[0] == "/") {
            if (fileSystem.has(arg)) {
                if (fileSystem.get(arg).type == "folder") {
                    dir = arg;
                    return "Moved to " + dir;
                } else {
                    return "That is a file, not a directory";
                }
            } else {
                return "Doesn't exist";
            }
        } else {
            var dirs = lsArrayDirectories();

            if (dirs.includes(arg)) {
                if (dir.endsWith("/")) {
                    dir += arg;
                } else {
                    dir += "/" + arg;
                }
                return "Moved into " + dir;
            } else if (arg == "..") {
                if (("" + dir.split("/")).length - 1 > 1) {
                    var dirA = dir.split("/");
                    var newDir = "/";
                    for (var i = 0; i < dirA.length - 1; i++) {
                        newDir += dirA[i];
                    }
                    dir = newDir;

                    return "Moved to " + dir;
                } else {
                    return "Already at root";
                }
            } else {
                if (lsArrayFiles().includes(arg)) {
                    return "That is a file, not a directory";
                }
                return "No such directory";
            }
        }
    } else if (args.length == 1) {
        dir = "/";
        return "Moved to /";
    } else {
        return "<p style='color: red'>You provided too many arguments</p>";
    }
}

function openFile(args) {
    if (args.length == 1 + 1) {
        var arg = args[1];
        var files = lsArrayFiles();
        if (files.includes(arg)) {
            var file = dir + "/" + files[files.indexOf(arg)];
            if (dir == "/") {
                file = "/" + files[files.indexOf(arg)];
            }
            if (fileSystem.has(file)) {
                var url = fileSystem.get(file).content;
                if (file.endsWith(".html")) {
                    window.open(url);
                    return "Opened in new tab";
                } else if (file.endsWith(".txt")) {
                    if (url.startsWith("/")) {
                        url = window.location.origin + url;
                    }
                    return fetch("https://alloew.com/").then(res => res.text()).catch(() => "<p style='color: red'>Failed to load file</p>");
                }
            } else {
                return "<p style='color: red'>File system error</p>";
            }
        } else {
            if (lsArrayDirectories().includes(arg)) {
                return "<p style='color: red'>That is a directory, not a file</p>";
            }
            return "No such file";
        }
    } else {
        return "<p style='color: red'>Incorrect number of arguments - open [file]</p>"
    }
}

function clear() {
    log.innerHTML = "";

    return "";
}

function toggleDvd() {
    x = 0;
    y = 0;
    dx = Math.abs(dx);
    dy = Math.abs(dy);
    nowColor = 0;
    dvd.style.background = colors[nowColor];
    dvd.style.left = x;
    dvd.style.top = y;
    dvd.hidden = !dvd.hidden;

    return "The dvd thing is now " + (dvd.hidden ? "off" : "on");
}

const commands = [
    { command: "ls", callback: ls, args: false, additionalArgs: [fileSystem], returns: true, description: "lists directory (folders in blue and files in white)" },
    { command: "cd", argsDesc: "[folder]", callback: cd, args: 1, additionalArgs: [fileSystem], returns: true, description: "enter a directory, leave blank to go to /" },
    { command: "open", argsDesc: "[file]", callback: openFile, args: 1, additionalArgs: [fileSystem], returns: true, description: "opens a file" },
    { command: "clear", callback: clear, args: false, returns: false, description: "clears the terminal" },
    { command: "help", callback: help, args: false, returns: true, description: "lists available commands" },
    { command: "dvd", callback: toggleDvd, args: false, returns: true, description: "toggles the dvd thing" }
];

function help() {
    var returnStr = "Commands: \n";

    // console.log("help");

    var maxCommandLength = 0;
    for (var i = 0; i < commands.length; i++) {
        var command_ = commands[i];
        if (command_.argsDesc) {
            if (command_.command.length + command_.argsDesc.length + 2 > maxCommandLength) {
                maxCommandLength = command_.command.length + command_.argsDesc.length + 2;
            }
        } else {
            if (command_.command.length + 2 > maxCommandLength) {
                maxCommandLength = command_.command.length + 2;
            }
        }
    }

    for (var i = 0; i < commands.length; i++) {
        var command_ = commands[i];

        var paddedCommand = command_.command;
        if (command_.argsDesc) {
            paddedCommand += " " + command_.argsDesc;
        }
        var additional = ""
        while ((paddedCommand + additional).length < maxCommandLength) {
            additional += " ";
        }
        // console.log(additional.length);
        paddedCommand = paddedCommand + additional.replaceAll(" ", "&nbsp;");

        returnStr += paddedCommand + " - " + command_.description + "\n";
    }

    return returnStr;
}

window.addEventListener("load", () => {
    window.scrollTo(0, document.body.scrollHeight);

    // helpElem.innerHTML = help().replaceAll("\n", "<br>");

    if (window.mobileAndTabletCheck()) {
        window.addEventListener("click", () => {
            hiddenInput.focus();
        })
    }
})

window.addEventListener("resize", () => {
    window.scrollTo(0, document.body.scrollHeight);
});

window.addEventListener("paste", (e) => {
    e.preventDefault();

    if (!processing) {
        var text = "";
        if (e.clipboardData || e.originalEvent.clipboardData) {
            text = (e.originalEvent || e).clipboardData.getData('text/plain');
        } else if (window.clipboardData) {
            text = window.clipboardData.getData('Text');
        }


        input.innerHTML = input.textContent + text.replaceAll("\n", "").replaceAll("\r", "") + cursorStr;
        logsCrude[logIndex] = input.textContent;
        logRefIndex = logIndex;
        window.scrollTo(0, document.body.scrollHeight);
    }
});

window.addEventListener("keydown", async (e) => {
    var updated = false;

    if (!e.ctrlKey && !e.altKey && e.key.length == 1 && !processing) {
        input.innerHTML = input.textContent + e.key + cursorStr;
        logsCrude[logIndex] = input.textContent;
        logRefIndex = logIndex;
        updated = true;
        cursorPos++;
        e.preventDefault();
    }

    if (e.ctrlKey && !processing) {
        if (e.code == "KeyC") {
            inputted = input.textContent;
            logsCrude[logIndex] = "";
            logRefIndex = logIndex;
            logsCrude.push("");
            logIndex++;

            logs.push({ time: Date.now(), command: inputted, dir: dir, result: "" });

            // var divResult = document.createElement("div");
            // divResult.classList.add("line", "flex", "flex-row", "flex-wrap");
            // divResult.innerHTML = result.replaceAll("\n", "<br>");

            var div = document.createElement("div");
            div.classList.add("line", "inline-block", "text-nowrap");

            var spanUser = document.createElement("span");
            spanUser.classList.add("green", "text-nowrap");
            spanUser.textContent = "user@quinncoop.com";

            var spanDir = document.createElement("span");
            spanDir.classList.add("blue", "text-nowrap");
            spanDir.textContent = logs[logs.length - 1].dir;

            var spanCommand = document.createElement("span");
            spanCommand.classList.add("inline-block", "wrap-anywhere");
            spanCommand.textContent = inputted;

            div.appendChild(spanUser);
            div.innerHTML += ":";
            div.appendChild(spanDir);
            div.innerHTML += "&&nbsp;";
            div.appendChild(spanCommand);

            input.innerHTML = cursorStr;
            log.appendChild(div);
            // log.appendChild(divResult);

            dirElem.textContent = dir;

            window.scrollTo(0, document.body.scrollHeight);
            // } if (e.code == "KeyV") {
            //     navigator.clipboard.readText().then((text) => {
            //         input.textContent += text;
            //     })
        }
    }

    if (e.code == "ArrowUp") {
        // if (logRefIndex - 1 > logsCrude.length - 1) {
        //     logRefIndex--;
        //     input.textContent = logsCrude[logRefIndex];
        // }
    }

    if (e.code == "Backspace" && !processing) {
        // console.log("backspace");
        input.innerHTML = input.textContent.slice(0, input.textContent.length - 1) + cursorStr;
        logsCrude[logIndex] = input.textContent;
        e.preventDefault();
    }

    if (updated) {
        // Cursor white
        cursor.classList.remove("cursorAnimate");
        void cursor.offsetWidth; // random thing to force "reflow"
        cursor.classList.add("cursorAnimate");
        window.scrollTo(0, document.body.scrollHeight);
    }

    if (e.code == "Enter" && !processing) {
        e.preventDefault();

        var inputted = input.textContent;
        logsCrude[logIndex] = input.textContent;
        logsCrude.push("");
        logIndex++;
        var command = inputted.split(" ")[0].toLowerCase();

        var result = "";
        var found = false;

        logs.push({ time: Date.now(), command: inputted, dir: dir, result: undefined });

        for (var i = 0; i < commands.length; i++) {
            var command_ = commands[i];
            // console.log(command_.command);
            if (command_.command == command) {
                if (command_.args != false) {
                    if (command_.additionalArgs) {
                        processing = true;
                        document.getElementById("loader").hidden = false;
                        result = await command_.callback(inputted.split(" "), command_.additionalArgs);
                    } else {
                        processing = true;
                        document.getElementById("loader").hidden = false;
                        result = await command_.callback(inputted.split(" "));
                    }
                } else {
                    if (inputted.split(" ").length > 1) {
                        result = "<p style='color: red'>This command does not take any arguments</p>";
                    } else {
                        if (command_.additionalArgs) {
                            processing = true;
                            document.getElementById("loader").hidden = false;
                            result = await command_.callback(command_.additionalArgs);
                        } else {
                            processing = true;
                            document.getElementById("loader").hidden = false;
                            result = await command_.callback();
                        }
                    }
                }

                found = true;
                break;
            }
        }

        if (!found) {
            result = "<p style='color: red'>Command not found! Type \"help\" for help</p>";
        }

        logs[logs.length - 1].result = result;
        if (command_.returns || !found) {

            // <div class="line flex flex-row">
            //     <span class="green">user@quinncoop.com</span>:<span class="blue">~</span>&&nbsp;
            //     <span class="flex flex-nowrap"></span>
            // </div>

            var divResult = document.createElement("div");
            divResult.classList.add("line", "inline-block", "wrap-anywhere");
            divResult.innerHTML = result;

            var div = document.createElement("div");
            div.classList.add("line", "inline-block");

            var spanUser = document.createElement("span");
            spanUser.classList.add("green", "text-nowrap");
            spanUser.textContent = "user@quinncoop.com";

            var spanDir = document.createElement("span");
            spanDir.classList.add("blue", "text-nowrap");
            spanDir.textContent = logs[logs.length - 1].dir;

            var spanCommand = document.createElement("span");
            spanCommand.classList.add("inline-block", "wrap-anywhere");
            spanCommand.textContent = inputted;

            div.appendChild(spanUser);
            div.innerHTML += ":";
            div.appendChild(spanDir);
            div.innerHTML += "&&nbsp;";
            div.appendChild(spanCommand);

            input.innerHTML = cursorStr;
            log.appendChild(div);
            log.appendChild(divResult);

            dirElem.textContent = dir;
        } else {
            input.innerHTML = cursorStr;
            dirElem.textContent = dir;
        }

        processing = false;
        document.getElementById("loader").hidden = true;
        window.scrollTo(0, document.body.scrollHeight);
    }
})

window.setInterval(() => {
    if (!dvd.hidden) {
        const maxX = window.innerWidth - 100;
        const maxY = window.innerHeight - 100;

        var tempDX = dx;
        var tempDY = dy;

        if (x + dx > maxX) {
            dx = -Math.abs(dx);
        } if (x + dx < 0) {
            dx = Math.abs(dx);
        } if (y + dy > maxY) {
            dy = -dy;
            nowColor = (nowColor + 1) % colors.length;
            dvd.style.backgroundColor = colors[nowColor];
        } if (y + dy < 0) {
            dy = Math.abs(dy);
        }

        if (dx != tempDX || dy != tempDY) {
            nowColor = (nowColor + 1) % colors.length;
            dvd.style.backgroundColor = colors[nowColor];
        }

        x += dx;
        y += dy;

        dvd.style.left = x + "px";
        dvd.style.top = y + "px";
    }
}, 10);