const fs = require("fs");
const path = require("path");
const sampleData = require("./data/bdt.json");
const staticData=require('./data/static.json');
const hbs = require("hbs");
const puppeteer = require("puppeteer");
const {
  scoreCircleOffset,
  getSubjectIcon,
  formatDate,
  progressBarOffset,
  progressBarWidth,
  progressBarGradient,
  progressTextPosition,
  getGradeImages,
  getGapText,
  roundIt,
} = require("./utils/helpers");

const main = path.resolve(__dirname + "/partials/layout.hbs");
const pdfPath = path.join("pdf", `hello.pdf`);

const registerPartials = () => {
  const partialsDir = path.resolve(__dirname + "/partials");
  const filenames = fs.readdirSync(partialsDir);
  filenames.forEach((file) => {
    const partialName = file.split(".")[0];
    const template = fs.readFileSync(partialsDir + "/" + file, "utf-8");
    hbs.registerPartial(partialName, template);
  });
};

const registerHelpers = () => {
  hbs.registerHelper("scoreCircleOffset", scoreCircleOffset);
  hbs.registerHelper("roundIt", roundIt);
  hbs.registerHelper("getSubjectIcon", getSubjectIcon);
  hbs.registerHelper("formatDate", formatDate);
  hbs.registerHelper("progressBarOffset", progressBarOffset);
  hbs.registerHelper("progressBarWidth", progressBarWidth);
  hbs.registerHelper("progressBarGradient", progressBarGradient);
  hbs.registerHelper("progressTextPosition", progressTextPosition);
  hbs.registerHelper("getGradeImages", getGradeImages);
  hbs.registerHelper("getGapText", getGapText);
};

const compileHTML = async () => {
  const options = {
    printBackground: true,
    path: pdfPath,
    height:'1256',
  };
  const gradeImages = getGradeImages(sampleData.grade);
  console.log("Registering the partials");
  registerPartials();
  console.log("Registering the helpers");
  registerHelpers();
  console.log("Generating the template");
  const bdtTemplate = fs.readFileSync(main, "utf-8");
  const template = hbs.handlebars.compile(bdtTemplate);
  const html = template({...sampleData, gradeImages,learningReport:staticData["learning-report-data"]});
  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
    devtools: false,
  });
  var page = await browser.newPage();
  await page.setContent(html);
  await page.evaluateHandle("document.fonts.ready");
  await page.pdf(options);
  await browser.close();
};

module.exports = compileHTML;
