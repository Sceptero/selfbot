// eval js code without VM (not safe, don't use on server bots) | !eval js_code
"use strict";

const Discord = require("discord.js");

const ZERO_WIDTH_SPACE = String.fromCharCode(8203);

module.exports = {
    trigger: "eval",
    action: function (bot, msg, args) {

        let code = args.join(" ");
        let split = code.split("\n");
        code = [];

        for (let x of split) {
            if (!x.startsWith("```")) code.push(x);
        }

        code = code.join("\n").trim();

        try {
            var evaled = eval(code);
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
    color: 15658734,
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
    msg.edit("", { embed: embedCode });
}