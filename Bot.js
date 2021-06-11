let Discord;
let Database;
if (typeof window !== "undefined") {
    Discord = DiscordJS;
    Database = EasyDatabase;
} else {
    Discord = require("discord.js");
    Database = require("easy-json-database");
}
const delay = (ms) => new Promise((resolve) => setTimeout(() => resolve(), ms));
const s4d = {
    Discord,
    client: null,
    tokenInvalid: false,
    reply: null,
    joiningMember: null,
    database: new Database("./db.json"),
    checkMessageExists() {
        if (!s4d.client) throw new Error('You cannot perform message operations without a Discord.js client')
        if (!s4d.client.readyTimestamp) throw new Error('You cannot perform message operations while the bot is not connected to the Discord API')
    }
};
s4d.client = new s4d.Discord.Client({
    fetchAllMembers: true
});
s4d.client.on('raw', async (packet) => {
    if (['MESSAGE_REACTION_ADD', 'MESSAGE_REACTION_REMOVE'].includes(packet.t)) {
        const guild = s4d.client.guilds.cache.get(packet.d.guild_id);
        if (!guild) return;
        const member = guild.members.cache.get(packet.d.user_id) || guild.members.fetch(d.user_id).catch(() => {});
        if (!member) return;
        const channel = s4d.client.channels.cache.get(packet.d.channel_id);
        if (!channel) return;
        const message = channel.messages.cache.get(packet.d.message_id) || await channel.messages.fetch(packet.d.message_id).catch(() => {});
        if (!message) return;
        s4d.client.emit(packet.t, guild, channel, message, member, packet.d.emoji.name);
    }
});
var member_xp, member_level;

function colourRandom() {
    var num = Math.floor(Math.random() * Math.pow(2, 24));
    return '#' + ('00000' + num.toString(16)).substr(-6);
}

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?create a channel'))) && (s4dmessage.member).hasPermission('MANAGE_CHANNELS')) {
        (s4dmessage.channel).send(String('What is the name of the channel?'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (1 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            (s4dmessage.guild).channels.create((s4d.reply), {
                type: 'text'
            });

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
            s4dmessage.channel.send(String('Stop baiting me!'));
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?create a voice channel'))) && (s4dmessage.member).hasPermission('MANAGE_CHANNELS')) {
        (s4dmessage.channel).send(String('What is the name of the channel?'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (1 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            (s4dmessage.guild).channels.create((s4d.reply), {
                type: 'voice'
            });

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
            s4dmessage.channel.send(String('Stop baiting me!'));
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?Help'))) || (String((s4dmessage.content)).includes(String('?help')))) {
        (s4dmessage.channel).send({
            embed: {
                title: 'Help',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['Reply with:', '\n', '\n', '**?level-help**', '\n', '\n', '**?rules-help**', '\n', '\n', '**?info-help**'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            s4dmessage.react('👍');
            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.channel.send(String('guess you didn\'t need help'));
        });
    }

});


s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?rules-help'))) || (String((s4dmessage.content)).includes(String('?rules help')))) {
        (s4dmessage.channel).send(String((['#1: Do not swear in the server, or attempt to bypass the filter by changing the characters of a banned word.', '\n', '#2: No self-promotion without permission of any staff member. This includes DM self-promotion.', '\n', '#3: Do not post malicious links or files in the server that can steal information.', '\n', '#4: Please keep your topics in the correct channel.', '\n', '#5: Do not harass other users or be toxic, such as by arguing or insulting others.', '\n', '#6: Dont cause spam by posting repeated text or large blocks of text.', '\n', '#7: Please make sure all topics are appropriate for children. - Nothing can be shared that is NSFW, is relating to substance abuse, is disturbing or that displays a grave nature', '\n', '#8: Dont constantly beg for nitro, roles, items or anything similar.', '\n', '#9: Do not use alts maliciously: - Dont join giveaways to give yourself an unfair advantage - Dont try to bypass a punishment given to your main account', '\n', '#10: Hate speech is not allowed and violation of this rule will result in severe punishment', '\n', '#11: No impersonation of well-known people/bots with profile pictures/names.', '\n', '#12: Have common sense', '\n', '#13: Don\'t ask for personal information or distribute any personal information without consent.', '\n', '#14: You aren\'t allowed to misuse spoilers by giving the appearance of swearing or something inappropriate. - Using spoilers around a word that may look like the N word will result in a ban', '\n', '#15: You cannot use your voice to annoy others in any VC (ex. voice changers/earrape)', '\n', '#16: You aren\'t allowed to minimod in the server: - This means acting as a moderator!'].join(''))));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            s4dmessage.channel.send(String('Hope I helped!'));

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?level-help'))) || (String((s4dmessage.content)).includes(String('?level help')))) {
        (s4dmessage.channel).send(String((['You get xp each time you write a message.', '\n', 'Type ?xp to see how many messages away you are from your next level.', '\n', 'Do not spam in order to get xp or you will get punished.'].join(''))));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            s4dmessage.channel.send(String('Hope I helped!'));

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?info help'))) || (String((s4dmessage.content)).includes(String('?info-help')))) {
        (s4dmessage.channel).send(String((['**you already know the name:**', (s4dmessage.guild).name, '\n', '**The server creator:**', '\n', (s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID), '\n', '**Number of members:**', '\n', (s4dmessage.guild).memberCount].join(''))));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            s4dmessage.delete();

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
        });
    }

});


s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?create a category'))) && (s4dmessage.member).hasPermission('MANAGE_CHANNELS')) {
        (s4dmessage.channel).send(String('What is the name of the category?'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (1 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            (s4dmessage.guild).channels.create((s4d.reply), {
                type: 'category'
            });

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
            s4dmessage.channel.send(String('Stop baiting me!'));
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?announce'))) && (s4dmessage.member).hasPermission('ADMINISTRATOR')) {
        (s4dmessage.channel).send(String('What do i announce?'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            s4d.client.channels.cache.find((channel) => channel.name === '📢┃announcements').send(String((s4d.reply)));

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
            s4dmessage.channel.send(String('Maybe it wasn\'t anything important.'));
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?update'))) && (s4dmessage.member).hasPermission('ADMINISTRATOR')) {
        (s4dmessage.channel).send(String('What do i update?'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (5 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            s4d.client.channels.cache.find((channel) => channel.name === '📌┃updates').send(String((s4d.reply)));

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
            s4dmessage.channel.send(String('Maybe it wasn\'t anything important.'));
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if (!((s4dmessage.member).user.bot)) {
        member_xp = s4d.database.get(String(('xp-' + String(s4dmessage.author.id))));
        member_level = s4d.database.get(String(('level-' + String(s4dmessage.author.id))));
        if (!member_xp) {
            member_xp = 0;
        } else if (!member_level) {
            member_level = 0;
        }
        s4d.database.set(String(('xp-' + String(s4dmessage.author.id))), (member_xp + 1));
        member_xp = member_xp + 1;
        if (member_xp > 100) {
            s4d.database.set(String(('level-' + String(s4dmessage.author.id))), (member_level + 1));
            member_level = member_level + 1;
            s4dmessage.channel.send(String((['Congratulations, ', s4dmessage.member, 'you jumped to level ', member_level, '!!'].join(''))));
        }
        if ((s4dmessage.content) == '?level') {
            s4dmessage.channel.send(String(([s4dmessage.member, ', you are currently level: ', member_level].join(''))));
        } else if ((s4dmessage.content) == '?xp') {
            s4dmessage.channel.send(String(([s4dmessage.member, ', you need ', 100 - member_xp, ' to jump to level ', member_level + 1].join(''))));
        }
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('?server name change'))) && (s4dmessage.member).hasPermission('ADMINISTRATOR')) {
        (s4dmessage.channel).send(String('What do you want to change it to?'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (1 * 60 * 1000),
            max: 1
           }).then(async (collected) => {
            s4d.reply = collected.first().content;
            s4dmessage.channel.send(String('Ok, changed it!'));
            (s4dmessage.guild).setName((s4d.reply));


            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.channel.send(String('Ok, no change'));
            s4dmessage.delete();
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((s4dmessage.content) == '?roleadd' && (s4dmessage.member).hasPermission('MANAGE_ROLES')) {
        (s4dmessage.channel).send(String('What Role?'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (2 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            (s4dmessage.mentions.members.first()).roles.add((Array.prototype.concat.apply([], s4d.client.guilds.cache.array().map((g) => g.roles.cache.array())).find((role) => role.name === (s4d.reply))));

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.react(':thumbsdown:');
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((((s4dmessage.content) || '').startsWith('?teach me spanish' || '')) || (((s4dmessage.content) || '').startsWith('teach me spanish' || ''))) {
        (s4dmessage.channel).send(String('I\'ll teach you have a nice day in Spanish, say anything.'));
        (s4dmessage.channel).awaitMessages((m) => m.author.id === (s4dmessage.member).id, {
            time: (1 * 60 * 1000),
            max: 1
        }).then(async (collected) => {
            s4d.reply = collected.first().content;
            s4dmessage.channel.send(String('que tenga un buen día'));

            s4d.reply = null;
        }).catch(async (e) => {
            console.error(e);
            s4dmessage.delete();
            s4dmessage.channel.send(String('vete a la mierda'));
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((s4dmessage.content) == 'bake me a cake' || (s4dmessage.content) == 'Bake me a cake') {
        await delay(Number(5) * 1000);
        (s4dmessage.channel).send(String('🎂'));
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((((s4dmessage.content) || '').startsWith('?kick' || '')) || (((s4dmessage.content) || '').startsWith('?Kick' || '')) && (s4dmessage.member).hasPermission('KICK_MEMBERS')) {
        s4dmessage.channel.send(String(([s4dmessage.member, 'Has kicked', s4dmessage.mentions.members.first(), 'they can still join back'].join(''))));
        (s4dmessage.mentions.members.first()).send(String(([s4dmessage.mentions.members.first(), 'You have been kicked from', (s4dmessage.guild).name, 'You can still join back.'].join(''))));
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('pillu'))) || (String((s4dmessage.content)).includes(String('pylly')))) {
        s4dmessage.delete();
        (s4dmessage.member).send({
            embed: {
                title: 'Do not swear!',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['You have been warned in ', (s4dmessage.guild).name, ' for swearing.', '\n', 'Be sure to read the rules that this wont happen again. Also S n o w y y does not allow swearing.'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((((s4dmessage.content) || '').startsWith(' Wants to be obama' || '')) || (((s4dmessage.content) || '').startsWith(' wants to be obama' || ''))) {
        (s4dmessage.mentions.members.first()).setNickname('Obama');
        s4dmessage.channel.send(String(('You have turned in to Obama by' + String(s4dmessage.member))));
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('fuck'))) || (String((s4dmessage.content)).includes(String('bitch')))) {
        s4dmessage.delete();
        (s4dmessage.member).send({
            embed: {
                title: 'Do not swear!',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['You have been warned in ', (s4dmessage.guild).name, ' for swearing.', '\n', 'Be sure to read the rules that this wont happen again. Also S n o w y y does not allow swearing.'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((((s4dmessage.content) || '').startsWith('?ban' || '')) && (s4dmessage.member).hasPermission('BAN_MEMBERS')) {
        s4dmessage.channel.send(String(([s4dmessage.member, 'Has banned', s4dmessage.mentions.members.first()].join(''))));
        (s4dmessage.mentions.members.first()).send(String(([s4dmessage.mentions.members.first(), 'You have been banned for some good reason from ', (s4dmessage.guild).name, 'by ', s4dmessage.member].join(''))));
        (s4dmessage.mentions.members.first()).ban();
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('frick'))) || (String((s4dmessage.content)).includes(String('nigga')))) {
        s4dmessage.delete();
        (s4dmessage.member).send({
            embed: {
                title: 'Do not swear!',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['You have been warned in ', (s4dmessage.guild).name, ' for swearing.', '\n', 'Be sure to read the rules that this wont happen again. Also  does not S n o w y y allow swearing.'].join('')),
                

            }
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('neekeri'))) || (String((s4dmessage.content)).includes(String('cock')))) {
        s4dmessage.delete();
        (s4dmessage.member).send({
            embed: {
                title: 'Do not swear!',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['You have been warned in ', (s4dmessage.guild).name, ' for swearing.', '\n', 'Be sure to read the rules that this wont happen again. Also S n o w y y does not allow swearing.'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('shit'))) || (String((s4dmessage.content)).includes(String('dick')))) {
        s4dmessage.delete();
        (s4dmessage.member).send({
            embed: {
                title: 'Do not swear!',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['You have been warned in ', (s4dmessage.guild).name, ' for swearing.', '\n', 'Be sure to read the rules that this wont happen again. Also S n o w y y does not allow swearing.'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('pillu'))) || (String((s4dmessage.content)).includes(String('perse')))) {
        s4dmessage.delete();
        (s4dmessage.member).send({
            embed: {
                title: 'Do not swear!',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['You have been warned in ', (s4dmessage.guild).name, ' for swearing.', '\n', 'Be sure to read the rules that this wont happen again. Also S n o w y y does not allow swearing.'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
    }

});

 s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('saatana'))) || (String((s4dmessage.content)).includes(String('paska')))) {
        s4dmessage.delete();
        (s4dmessage.member).send({
            embed: {
                title: 'Do not swear!',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['You have been warned in ', (s4dmessage.guild).name, ' for swearing.', '\n', 'Be sure to read the rules that this wont happen again. Also S n o w y y does not allow swearing.'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
    }

});

s4d.client.on('message', async (s4dmessage) => {
    if ((String((s4dmessage.content)).includes(String('juusto'))) || (String((s4dmessage.content)).includes(String('vitu')))) {
        s4dmessage.delete();
        (s4dmessage.member).send({
            embed: {
                title: 'Do not swear!',
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['You have been warned in ', (s4dmessage.guild).name, ' for swearing.', '\n', 'Be sure to read the rules that this wont happen again. Also S n o w y y does not allow swearing.'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
    }

});


s4d.client.on('message', async (s4dmessage) => {
    if ((((s4dmessage.content) || '').startsWith('?Serverinfo' || '')) || (((s4dmessage.content) || '').startsWith('?serverinfo' || ''))) {
        s4dmessage.react('📊');
        s4dmessage.channel.send({
            embed: {
                title: ((s4dmessage.guild).name),
                color: (colourRandom()),
                image: {
                    url: null
                },

                description: (['Member count:', '\n', (s4dmessage.guild).memberCount, '\n', 'The owner of the server:', '\n', (s4dmessage.guild).owner || await (s4dmessage.guild).members.fetch((s4dmessage.guild).ownerID), '\n', 'Head over to #📜┃info for more information.'].join('')),
                footer: {
                    text: null
                },
                thumbnail: {
                    url: null
                }

            }
        });
    }

});

s4d.client.login('').catch((e) => {
    s4d.tokenInvalid = true;
    s4d.tokenError = e;
});

s4d.client.on('message', async (s4dmessage) => {
    if ((((s4dmessage.content) || '').startsWith('?warn' || '')) && (s4dmessage.member).hasPermission('KICK_MEMBERS')) {
        s4dmessage.channel.send(String(([s4dmessage.member, 'Has Warned', s4dmessage.mentions.members.first()].join(''))));
        (s4dmessage.mentions.members.first()).send(String(([s4dmessage.mentions.members.first(), 'You have been Warned in ', (s4dmessage.guild).name, ' by', s4dmessage.member].join(''))));
    }

});

s4d.client.on('ready', async () => {
    s4d.client.user.setActivity(String('https://discord.gg/cz4uJY8sUU┃?help'));

});

s4d.client.on('message', async (s4dmessage) => {
    if ((s4dmessage.content) == 'ping') {
        s4dmessage.channel.send(String('pong!'));
    }

});

s4d.client.on('guildMemberAdd', async (param1) => {
    s4d.joiningMember = param1;
    s4d.client.channels.cache.find((channel) => channel.name === '📣┃welcomes').send(String((['Welcome to Mikeyman\'s Café', '\n', 'This is just Mikeyman official discord server but with a fancy name', '\n', 'Hope you have fun and enjoy!'].join(''))));
    s4d.joiningMember = null
});

s4d.client.on('message', async (s4dmessage) => {
    if ((s4dmessage.content) == 'pong') {
        s4dmessage.channel.send(String('ping!'));
    }

});

s4d.client.on('guildMemberRemove', async (param1) => {
    s4d.leavingMember = param1;
    s4d.client.channels.cache.find((channel) => channel.name === '🔔┃leave-announcements').send(String((['Bye!', '\n', 'Hope youhad a great time!', '\n', 'Everone he\'s gone let\'s party!'].join(''))));
    s4d.leavingMember = null
});

s4d;
