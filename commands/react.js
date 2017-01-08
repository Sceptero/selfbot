// !react message_id text | text has to be made of unique characters, 1-20 chars
"use strict";

const emojis = ["🇦", "🇧", "🇨", "🇩", "🇪", "🇫", "🇬", "🇭", "🇮", "🇯", "🇰", "🇱", "🇲", "🇳", "🇴", "🇵", "🇶", "🇷", "🇸", "🇹", "🇺", "🇻", "🇼", "🇽", "🇾", "🇿"];

module.exports = {
    trigger: "react",
    action: function (bot, msg, args) {
        let msgId = args[0];
        let text = args[1];
        if (text) text = text.toUpperCase();

        msg.channel.fetchMessages({ limit: 20 }).then((messages) => {
            let message = messages.get(msgId);

            if (message != null && (!text || validateText(text))) {

                let myReactions = message.reactions.filter((reaction) => reaction.me);

                for (let reaction of myReactions)
                    reaction[1].remove();

                if (text == null) return;

                let promise = message.react(emojis[text.charCodeAt(0) - 65]);

                for (let i = 1; i < text.length; i++)
                    promise = promise.then(() => message.react(emojis[text.charCodeAt(i) - 65]));
            }
        });

        msg.delete().catch(console.error);
    }
};

function validateText(text) {
    let rWord = /^[A-Za-z]+$/g;
    let isWord = rWord.test(text);

    let rNotUnique = /^.*(.).*\1.*$/g;
    let isUnique = !rNotUnique.test(text);

    return text.length > 0 && text.length < 21 && isWord && isUnique;
}