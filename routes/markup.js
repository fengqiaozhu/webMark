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
            let article = $(articalElement.jianshu);
            article.siblings().remove();
            let parents = article.parents();
            let outEleAttr = "" 
            let articalHtml = "";
            parents.each(function(idx){
                if(idx<parents.length-3){
                    $(this).siblings().remove();
                }else if(idx===parents.length-3){
                    outEleAttr = ($(this).attr('class')?`.${$(this).attr('class')}`:false)||($(this).attr('id')?`#${$(this).attr('id')}`:false);
                }
            });
            if(/^\./.test(outEleAttr)){
                articalHtml=`<div class=${outEleAttr.split('.')[1]}>${$(outEleAttr).html()}</div>`
            }else{
                articalHtml=`<div id=${outEleAttr.split('#')[1]}>${$(outEleAttr).html()}</div>`
            }
            res.send({ css: cssHref, html: articalHtml })
        }
    })
})


module.exports = router;