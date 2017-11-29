// type text with emojis, 1 - 27 characters, a-Z and spaces allowed | .text message
"use strict";

// A -> 65, 🇦 -> 127462
const TEXT_TO_EMOJI_DISTANCE = 127397;

module.exports = {
    trigger: "text",
    action: function (bot, msg, args) {
        let text = args.join(" ");
        
        if (!text || !validateText(text)) {
            msg.delete();
            return;
        }

        text = text.toUpperCase();
        text = text.split('').map(x => x == " " ? "     " : String.fromCodePoint(x.codePointAt(0) + TEXT_TO_EMOJI_DISTANCE)).join(' ');
        msg.delete();
        msg.channel.send(text);
    }
};

function validateText(text) {
    let rWord = /^[A-Za-z ]+$/g;
    let isWord = rWord.test(text);

    return text.length > 0 && text.length < 28 && isWord;
}