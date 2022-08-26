axios = require('axios').default
cheerio = require('cheerio')
express = require('express')
app = express()
app.use(express.static('public'))
port = 80
function randsel(arrg) {
	target = (Math.floor(Math.random() * arrg.length))
	return arrg[target]
}
async function extGlowF() {
	response = await axios.get('https://www.etsy.com/shop/GlowFyourself')
	$ = cheerio.load(response.data)
	elements = $('[data-listing-id]')
	tears = []
	for(i = 0; i < elements.length; i++) {
		tears.push($(elements[i]).attr('data-listing-id'))
		
	}
	return('https://www.etsy.com/listing/' + randsel(tears))
}
async function penis() {
	response = await axios.get('https://plushiedepot.com/collections/penis-plushies')
	$ = cheerio.load(response.data)
	elements = $('[id^=title-template--] a')
	tears = []
	for(i = 0; i < elements.length; i++) {
		tears.push($(elements[i]).attr('href'))
	}
	return('https://plushiedepot.com' + randsel(tears))
	
} 
async function penisDeco() {
	response = await axios.get('https://www.etsy.com/search?q=penis+deco')
	$ = cheerio.load(response.data)
	elements = $('[data-listing-id]')
	tears = []
	for(i = 0; i < elements.length; i++) {
		tears.push($(elements[i]).attr('data-listing-id'))
		
	}
	return('https://www.etsy.com/listing/' + randsel(tears))
}
app.get('/api', async (req, res) => {
	siteList = [extGlowF, penis, penisDeco]
	res.json(await randsel(siteList)());
})
//main()
app.listen(port, () => {
  console.log(`App listening on ${port}`)
})