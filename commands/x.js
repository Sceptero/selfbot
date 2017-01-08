// eval js code in sandboxed vm | .x js_code
"use strict";

const {VM} = require('vm2');
let vm = new VM();

const ZERO_WIDTH_SPACE = String.fromCharCode(8203);

module.exports = {
    trigger: "x",
    action: function (bot, msg, args) {

        let code = args.join(" ");
        let split = code.split("\n");
        code = [];

        for (let x of split) {
            if (!x.startsWith("```")) code.push(x);
        }

        code = code.join("\n").trim();

        if (code == "new.") {
            vm = new VM();
            msg.delete();
            return;
        }

        try {
            let evaled = vm.run(code);
            if (typeof evaled !== 'string')
                evaled = require('util').inspect(evaled);
            msgEdit(msg, code, evaled);
        }
        catch (error) {
            msgEdit(msg, code, error);
        }
    }
};

function clean(text) {
    if (typeof (text) === "string") {
        return text.replace(/`/g, "`" + ZERO_WIDTH_SPACE).replace(/@/g, "@" + ZERO_WIDTH_SPACE);
    }
    else {
        return text;
    }
}

let embedCode = {
    color: 0xEEEEEE,
    fields: [
        {
            name: "Input",
            value: "",
            inline: false
        },
        {
            name: "Output",
            value: "",
            inline: true
        }
    ]
}

function msgEdit(msg, pre, post) {
    embedCode.fields[0].value = "```js\n" + clean(pre) + "\n```";
    embedCode.fields[1].value = "```js\n" + clean(post) + "\n```";
    msg.edit("", { embed: embedCode }).catch((error) => {
        console.log(error);
        msg.delete();
    });
}

// function msgEdit(msg, pre, post) {
//     let newMsgContent = "```js\n// INPUT\n" + clean(pre) + "\n\n// OUTPUT\n" + clean(post) + "\n```";
//     msg.edit(newMsgContent);
// }