const fs = require("fs");
const path = require("path");
const sampleData = require("./data/k12.json");
const hbs = require("hbs");
const puppeteer = require("puppeteer");
const {
  dateFormat,
} = require("./utils/helpers");

const main = path.resolve(__dirname + "/partials/layout.hbs");
const pdfPath = path.join("pdf", `k12.pdf`);

 let subjetArray = sampleData.subjects.split(",");

  let arr = [];

  if (subjetArray.length === 1) {
    if (subjetArray[0].contains("and")) {
      let lastElArr = subjetArray[0].split("and");
      for (let i = 0; i < lastElArr.length; i++) {
        let obj = {};
        obj.name = lastElArr[i].trim();
        obj.data = { ...sampleData[lastElArr[i].toLowerCase().trim()] };
        arr.push(obj);
      }
    } else {
      let obj = {};
      obj.name = subjetArray[0].trim();
      obj.data = { ...sampleData[subjetArray[0].toLowerCase().trim()] };
      arr.push(obj);
    }
  } else {
    for (let i = 0; i < subjetArray.length - 1; i++) {
      let obj = {};
      obj.name = subjetArray[i].trim();
      obj.data = { ...sampleData[subjetArray[i].toLowerCase().trim()] };
      arr.push(obj);
    }
    let lastElArr = subjetArray[subjetArray.length - 1].split("and");
    for (let i = 0; i < lastElArr.length; i++) {
      let obj = {};
      obj.name = lastElArr[i].trim();
      obj.data = { ...sampleData[lastElArr[i].toLowerCase().trim()] };
      arr.push(obj);
    }
  }
  sampleData.subjetArray = JSON.parse(JSON.stringify(arr));

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
  hbs.registerHelper("dateFormat", dateFormat);
};

const compileHTML = async () => {
  const options = {
    printBackground: true,
    path: pdfPath,
  };
//   const gradeImages = getGradeImages(sampleData.grade);
  console.log("Registering the partials");
  registerPartials();
  console.log("Registering the helpers");
  registerHelpers();
  console.log("Generating the template");
  const bdtTemplate = fs.readFileSync(main, "utf-8");
  const template = hbs.handlebars.compile(bdtTemplate);
  const html = template({...sampleData});
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
