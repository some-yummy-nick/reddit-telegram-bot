const Telegraf = require("telegraf");
const axios = require("axios");

const channel = "@redditNewPost";
const botToken = "1386956276:AAErBWHHOXrvKU91-7u8juy0ZyABQhjeUG8";

const startBot = () => {
    const redditBot = new Telegraf(botToken);
    redditBot.command("hello", ctx => {
        ctx.reply("Yo!");
        getAndPost(ctx)
    });

    const getAndPost = (ctx) => {
        axios.get("https://reddit.com/r/memes/top.json?limit=1")
            .then(res => {
                const data = res.data.data;
                postToChannel(data, ctx);
            })
            .catch(err => console.log(err))

    };

    const postToChannel = (post, ctx) => {
        post.children.map((post, i) => {
            ctx.telegram.sendPhoto(channel, post.data.url);
        })
    };

    redditBot.launch()
};

module.exports.startBot = startBot;
