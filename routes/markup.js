let express = require('express');
let router = express.Router();
let request = require('request');
let cheerio = require('cheerio');

let articalElement = {
    jianshu: ".article"
}
router.get('/', (req, res, next) => {
    res.render('showpage', { title: '文档' })
})

router.post('/spidepage', (req, res, next) => {
    let url = req.body.url;
    let option = {}
    request(url, (err, resp, body) => {
        if (!err && resp.statusCode == 200) {
            let $ = cheerio.load(body);
            let cssHref = [];
            $('link').each(function () {
                let href = $(this).attr('href');
                if (/\.css$/.test(href)) {
                    cssHref.push(href);
                }
            })
            res.send({ css: cssHref, html: $(articalElement.jianshu).html() })
        }
    })
})


module.exports = router;