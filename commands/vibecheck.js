const { AttachmentBuilder, EmbedBuilder, SlashCommandBuilder, channelLink } = require('discord.js');
const { getPost, getImage, getPostById } = require('random-reddit');
// const reddit = require('random-reddit');
const wait = require('node:timers/promises').setTimeout;
const src = require('../lib/data').src;
// const anime_src = require()

module.exports = {
    data: new SlashCommandBuilder()
        .setName('vibecheck')
        .setDescription('Checks your vibe.')
        .addStringOption(option => 
            option.setName('vibe')
                .setDescription('Tell me which one you wanna vibe.')
                .setRequired(true)
                .addChoices(
                    { name: 'kpop', value: 'kpop'},
                    { name: 'memes', value: 'memes'},
                    { name: 'anime art', value: 'animeart'}
                )
            ),
    async execute(interaction) {

        var imgurl, 
            imglabel,
            gal01,
            posturl;

        let uservibe = interaction.options.getString('vibe');
        // const vibe = src.includes(uservibe);
        console.table(src[uservibe]);
        getPost(src[uservibe])
            .then(post => {     
                // console.table(post);
                imgurl = post.thumbnail;
                imglabel = post.title;
                posturl = post.url;
                console.log(`response: ${imgurl}`);
                console.log(`responseURL: ${post.url}`);
                
                if(post.is_self === true) {
                    console.log('return');
                    interaction.editReply('Your vibe sucks! **Try again.**');
                    return;
                }

                if(post.is_gallery === true) {
                    console.log(`GalleryDATA: ${JSON.stringify(post.gallery_data)}`);
                    // gal01 = 'https://i.redd.it/' + post.gallery_data[0].filter((p) => p.media_id) + '.jpg';
                    // gal01 = JSON.stringify(post.gallery_data);
                    var obj = JSON.parse(JSON.stringify(post.gallery_data));
                    var res =[];
                    for(var i in obj) res.push(obj[i]);
                    // gal01 = Object.values(post.gallery_data);
                    console.table(res[0][0]);
                    console.table(res[0][0].media_id);
                    gal01 = 'https://i.redd.it/' + res[0][0].media_id + '.jpg';
                    gal02 = 'https://i.redd.it/' + res[0][1].media_id + '.jpg';

                    const arrayOfObj = Object.entries(post.media_metadata).map((e) => ( { [e[0]]: e[1] } ));
                    const res1 = Object.entries(arrayOfObj).map((e) => ( { [e[0]]: e[1] } ));
                    var myData = Object.keys(post.media_metadata).map(key => {
                        return post.media_metadata[key];
                    })
                    console.table(myData[0].e);
                    console.table(post.media_metadata);
                    if(myData[0].e != 'Image') gal01 = 'https://i.redd.it/' + res[0][0].media_id + '.gif';
                    if(myData[0].e === 'Image' && myData[0].m === 'image/png') gal01 = 'https://i.redd.it/' + res[0][0].media_id + '.png';
                    // console.log(`Gallery01 1st: ${JSON.parse(gal01[0])}`);
                }else {
                    console.log(`Not gallery`);
                    if(!post.media) imgurl = post.url;
                }

                if(post.preview && post.media) {
                    var obj = JSON.parse(JSON.stringify(post.media));
                    var res =[];
                    for(var i in obj) res.push(obj[i]);
                    // console.table(res[1].thumbnail_url);
                    (!res[1].thumbnail_url) ? imgurl = res[0].thumbnail_url : imgurl = res[1].thumbnail_url;
                    console.log(`RESthumbnail: ${imgurl}`);
                } else {
                    console.log(`Not GIF`);
                }
            });

        if (!imgurl) {
            await interaction.deferReply();
            await wait(4000);

            if(gal01) imgurl = gal01;
            console.log(`imgurl :${imgurl}`)
            // const file = new AttachmentBuilder('./assets/gowonwink.gif');
            const exampleEmbed = {
                color: 0x1ABC9C,
                title: imglabel,
                url: posturl,
                // author: {
                //     name: 'Some name',
                //     icon_url: 'https://i.imgur.com/AfFp7pu.png',
                //     url: 'https://discord.js.org',
                // },
                // description: 'Some description here',
                // thumbnail: {
                //     url: 'https://i.imgur.com/AfFp7pu.png',
                // },
                image: {
                    // url: 'attachment://maido.jpg',
                    // url: `https://picsum.photos/seed/${seed}/${h}/${w}.jpg`,
                    url: imgurl,
                },
            };
            // var img2url;
            // (gal02) ? img2url = gal02 : img2url = gal01;
            // const embed2 = {
            //     url: posturl,
            //     image: {
            //         url: imgurl,
            //     },
            // }
            
            // const file = new AttachmentBuilder(imgurl);
            await interaction.editReply({ embeds: [exampleEmbed] });
        }
    }
}