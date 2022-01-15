const fs = require("fs");
const path = require("path");
const sampleData = require("./data/bdt.json");
const hbs = require("hbs");
const puppeteer=require('puppeteer');

const main = path.resolve(__dirname + "/partials/layout.hbs");
const pdfPath=path.join('pdf', `hello.pdf`);


const registerPartials = () => {
  const partialsDir = path.resolve(__dirname + "/partials");
  const filenames = fs.readdirSync(partialsDir);
  filenames.forEach((file) => {
    const partialName = file.split(".")[0];
    const template = fs.readFileSync(partialsDir + "/" + file, "utf-8");
    hbs.registerPartial(partialName, template);
  });
};


const compileHTML = async() => {
  const options={
    printBackground:true,
    path:pdfPath,
    height:'2000'
  }
  registerPartials();
  const bdtTemplate = fs.readFileSync(main, "utf-8");
  const template = hbs.handlebars.compile(bdtTemplate);
  const html = template(sampleData);
  await fs.writeFileSync('hello.html',html, {
    encoding:'utf-8'
  })
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
    devtools: false,
  });
  var page = await browser.newPage();
  page.setContent(html);
  await page.evaluateHandle("document.fonts.ready");
  await page.waitForNetworkIdle({idleTime:3000, timeout:10000})
  await page.pdf(options);
  await browser.close();  
};



module.exports=compileHTML;