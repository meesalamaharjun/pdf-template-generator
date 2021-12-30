
const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

Handlebars.registerHelper('print_person', function () {
    return this.firstname + ' ' + this.lastname
})
Handlebars.registerHelper('dateFormat', function dateFormat(date) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  const final = new Date(date);
  const month = months[final.getMonth() - 1];
  const day = final.getDate();
  return day + "th " + month;
});


const data = {
  name: "Yashaswini",
  exam_name: "Comprehensive Evaluation",
  grade: "10TH CBSE",
	date: "05/12/2018",
	age: 28,
	birthdate: "12/07/1990",
  marks: [{
    subject: "Mathematics",
    marks: 60,
    total_marks: 100,
    percentage: 60,
  }, {
    subject: "Physics",
    marks: 75,
    total_marks: 100,
    percentage: 75,
  }],
  subjects: {
    "mathematics": {
      "score": "80",
      "score_percentage": "80",
      "total_marks": "20",
      "top_score_percentage": "90",
      "average_score_percentage": "80",
    },
  },
  col: "green"
};

async function createPDF(data){

	var templateHtml = fs.readFileSync(path.join(process.cwd(), 'src/k12.html'), 'utf8');
	var template = Handlebars.compile(templateHtml);
	var html = template(data);

	var milis = new Date();
	milis = milis.getTime();

	var pdfPath = path.join('pdf', `${data.name}-${milis}.pdf`);

	var options = {
		printBackground: true,
		path: pdfPath
	}

	const browser = await puppeteer.launch({
		args: ['--no-sandbox'],
		headless: true,
    devtools:false
	});

	var page = await browser.newPage();
  page.setContent(html)
	
	// await page.goto(`data:text/html,${html}`, {
	// 	waitUntil: 'networkidle0'
	// });
  // await page.waitForSelector('img');
  await page.evaluateHandle('document.fonts.ready');
  // await page.emulateMedia('screen');
  // await page.addStyleTag({ content: '@page { size: auto; }' })
  await page.waitFor(2000);
  // await page.screenshot({
	// 	path: 'capture.jpg',
  //   dumpio: true,
	// 	fullPage: true
	// });
	await page.pdf(options);
	await browser.close();
}


createPDF(data);