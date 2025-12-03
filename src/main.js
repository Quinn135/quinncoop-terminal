var log = document.getElementById("log");
var filler = document.getElementById("filler");
var input = document.getElementById("input");
var dirElem = document.getElementById("dir");

var hiddenInput = document.getElementById("hiddenInput");

var cursorPos = 0;

window.mobileAndTabletCheck = function () {
    let check = false;
    (function (a) { if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true; })(navigator.userAgent || navigator.vendor || window.opera);
    return check;
};

var logs = [];
var dir = "/";

const fileSystem = new Map([
    ["/", { type: "folder", children: ["sites"] }],
    ["/sites", { type: "folder", children: ["alloew.com", "quinncoop.com"] }],
    ["/sites/quinncoop.com", { type: "folder", fileName: undefined, children: ["index", "b", "images", "old", "scroll", ""] }],
    ["/sites/quinncoop.com/main", { type: "file", fileName: "main", content: "https://index.quinncoop.com/" }],
    ["/sites/quinncoop.com/b", { type: "file", fileName: "b", content: "https://b.quinncoop.com/" }],
    ["/sites/quinncoop.com/images", { type: "file", fileName: "images", content: "https://imagesquinncoop.com/" }],
    ["/sites/quinncoop.com/old", { type: "file", fileName: "old", content: "https://old.quinncoop.com/" }],
    ["/sites/quinncoop.com/scroll", { type: "file", fileName: "scroll", content: "https://scroll.quinncoop.com/" }],
    ["/sites/quinncoop.com/hi", { type: "file", fileName: "2025", content: "https://hi.quinncoop.com/" }],
    ["/sites/alloew.com", {
        type: "folder", fileName: undefined, children: ["index", "airlift", "bob", "confetti", "emoji", "hi", "jacob",
            "shmurplelurplepurple", "spend", "think", "time", "w", "b", "weeb", "words"]
    }],
    ["/sites/alloew.com/main", { type: "file", fileName: "main", content: "https://alloew.com/" }],
    ["/sites/alloew.com/airlift", { type: "file", fileName: "airlift", content: "https://airlift.alloew.com/" }],
    ["/sites/alloew.com/bob", { type: "file", fileName: "bob", content: "https://bob.alloew.com/" }],
    ["/sites/alloew.com/confetti", { type: "file", fileName: "confetti", content: "https://confetti.alloew.com/" }],
    ["/sites/alloew.com/emoji", { type: "file", fileName: "emoji", content: "https://emoji.alloew.com/" }],
    ["/sites/alloew.com/hi", { type: "file", fileName: "hi", content: "https://hi.alloew.com/" }],
    ["/sites/alloew.com/jacob", { type: "file", fileName: "jacob", content: "https://jacob.alloew.com/" }],
    ["/sites/alloew.com/shmurplelurplepurple", { type: "file", fileName: "shmurplelurplepurple", content: "https://shmurplelurplepurple.alloew.com/" }],
    ["/sites/alloew.com/spend", { type: "file", fileName: "spend", content: "https://spend.alloew.com/" }],
    ["/sites/alloew.com/think", { type: "file", fileName: "think", content: "https://think.alloew.com/" }],
    ["/sites/alloew.com/time", { type: "file", fileName: "time", content: "https://time.alloew.com/" }],
    ["/sites/alloew.com/w", { type: "file", fileName: "w", content: "https://w.alloew.com/" }],
    ["/sites/alloew.com/b", { type: "file", fileName: "b", content: "https://b.alloew.com/" }],
    ["/sites/alloew.com/weeb", { type: "file", fileName: "weeb", content: "https://weeb.alloew.com/" }],
    ["/sites/alloew.com/words", { type: "file", fileName: "words", content: "https://words.alloew.com/" }],

])

function ls() {
    var returnStr = "<span class='flex flex-row flex-wrap gap-x-3'><p style='color: LightGreen'>(folders blue, files white)</p>&nbsp;";
    fileSystem.forEach((elem, path) => {
        if (elem.type == "file") {
            var filePath = path.slice(0, path.indexOf(elem.fileName) - 1);
            console.log(filePath, dir);
            if (filePath == dir) {
                returnStr += `<p>${elem.fileName.replace(`${dir}/`, "")}</p>`;
            }
        } else {
            // console.log(path, path.split("/").length - 1, dir.split("/").length, path.split("/"));
            if (path != dir && elem.type == "folder" && path.split("/").length - 1 == dir.split("/").length && path.indexOf(dir) >= 0) {
                if (dir.split("/")[1] != "") {
                    returnStr += `<p class="blue whitespace-pre-wrap">${path.replace(dir + "/", "")}</p>`;
                }
            } else if (path != dir && elem.type == "folder" && path.split("/").length == dir.split("/").length && path.indexOf(dir) >= 0) {
                console.log(path);
                if (dir.split("/")[1] == "") {
                    returnStr += `<p class="blue whitespace-pre-wrap">${path.replace(dir, "")}</p>`;
                }
            }
        }
    });

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
            console.log(filePath, dir);
            if (filePath == dir) {
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
                console.log(path);
                if (dir.split("/")[1] == "") {
                    dirs.push(path.replace(dir, ""));
                    // returnStr += `<p class="blue whitespace-pre-wrap">${path.replace(dir, "")}</p>`;
                }
            }
        }
    });

    return dirs;
}

function cd(arg) {
    if (arg[0] == "/") {
        if (fileSystem.has(arg)) {
            if (fileSystem.get(arg).type == "folder") {
                dir = arg;
                return "Moved to " + dir;
            } else {
                return "Not a folder";
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
            return "No such directory";
        }
    }
    return "Something broke";
}

function openFile(arg) {
    var files = lsArrayFiles();
    if (files.includes(arg)) {
        var file = dir + "/" + files[files.indexOf(arg)];
        if (fileSystem.has(file)) {
            var url = fileSystem.get(file).content;
            window.open(url);
            return "Opened in new tab";
        } else {
            return "File system error";
        }
    } else {
        return "No such file";
    }

    return "Something broke";
}

const commands = [
    { command: "ls", callback: ls, args: false, description: "lists directory (folders in blue and files in white)" },
    { command: "cd", argsDesc: "[folder]", callback: cd, args: 1, description: "enter a directory" },
    { command: "open", argsDesc: "[file]", callback: openFile, args: 1, description: "opens a file (opens website in a new tab)" }
];

function help() {
    var returnStr = "Commands: \n";

    console.log("help");

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
        console.log(additional.length);
        paddedCommand = paddedCommand + additional.replaceAll(" ", "&nbsp;");

        returnStr += paddedCommand + " - " + command_.description + "\n";
    }

    return returnStr;
}

commands.push({ command: "help", callback: help, args: false, description: "lists available commands" });

window.addEventListener("load", () => {
    input.focus();

    if (window.mobileAndTabletCheck()) {
        window.addEventListener("click", () => {
            hiddenInput.focus();
        })
    }
})

window.addEventListener("keydown", (e) => {
    var updated = false;

    if (!e.ctrlKey && !e.altKey && e.key.length == 1) {
        input.textContent += e.key;
        updated = true;
        cursorPos++;
        e.preventDefault();
    }

    if (e.code == "Backspace") {
        console.log("backspace");
        input.textContent = input.textContent.slice(0, input.textContent.length - 1);
        e.preventDefault();
    }

    if (updated) {
        // Cursor white
        input.classList.remove("cursorAnimate");
        void input.offsetWidth; // random thing to force "reflow"
        input.classList.add("cursorAnimate");
    }

    if (e.code == "Enter") {
        e.preventDefault();

        var inputted = input.textContent;
        var command = inputted.split(" ")[0].toLowerCase();

        var result = "";
        var found = false;

        logs.push({ time: Date.now(), command: inputted, dir: dir, result: undefined });

        for (var i = 0; i < commands.length; i++) {
            var command_ = commands[i];
            console.log(command_.command);
            if (command_.command == command) {
                if (command_.args != false) {
                    console.log(inputted.split(" ").length - 1 == command_.args);
                    if (inputted.split(" ").length - 1 == command_.args) {
                        if (command_.args == 1) {
                            result = command_.callback(inputted.split(" ")[1]);
                            found = true;
                        }
                    } else {
                        result = "<p style='color: red'>Incorrect number of arguments: cd requires one argument</p>";
                    }
                } else {
                    result = command_.callback();
                }
                found = true;
                break;
            }
        }

        if (!found) {
            result = "<p style='color: red'>Command not found! Type \"help\" for help</p>";
        }

        logs[logs.length - 1].result = result;

        // <div class="line flex flex-row">
        //     <span class="green">user@quinncoop.com</span>:<span class="blue">~</span>&&nbsp;
        //     <span class="flex flex-nowrap"></span>
        // </div>

        var divResult = document.createElement("div");
        divResult.classList.add("line", "flex", "flex-row", "flex-wrap");
        divResult.innerHTML = result.replaceAll("\n", "<br>");

        var div = document.createElement("div");
        div.classList.add("line", "flex", "flex-row");

        var spanUser = document.createElement("span");
        spanUser.classList.add("green");
        spanUser.textContent = "user@quinncoop.com";

        var spanDir = document.createElement("span");
        spanDir.classList.add("blue");
        spanDir.textContent = logs[logs.length - 1].dir;

        var spanCommand = document.createElement("span");
        spanCommand.classList.add("flex", "flex-nowrap");
        spanCommand.textContent = inputted;

        div.appendChild(spanUser);
        div.innerHTML += ":";
        div.appendChild(spanDir);
        div.innerHTML += "&&nbsp;";
        div.appendChild(spanCommand);

        input.textContent = "";
        log.appendChild(div);
        log.appendChild(divResult);

        dirElem.textContent = dir;
        
        window.scrollTo(0, document.body.scrollHeight);
    }
})
