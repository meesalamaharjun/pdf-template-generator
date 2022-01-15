const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const sampleData = require("./data/bdt.json");
const hbs = require("hbs");

const main = path.resolve(__dirname + "/partials/layout.hbs");

const registerPartials = () => {
  const partialsDir = path.resolve(__dirname + "/partials");
  const filenames = fs.readdirSync(partialsDir);
  filenames.forEach((file) => {
    const partialName = file.split(".")[0];
    const template = fs.readFileSync(partialsDir + "/" + file, "utf-8");
    hbs.registerPartial(partialName, template);
  });
};

const compileHTML = () => {
  registerPartials();
  const bdtTemplate = fs.readFileSync(main, "utf-8");
  const template = hbs.handlebars.compile(bdtTemplate);
  const html = template(sampleData);
  fs.writeFileSync('index.html',html);
};


compileHTML();