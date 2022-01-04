const Handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");

Handlebars.registerHelper("print_person", function () {
  return this.firstname + " " + this.lastname;
});
Handlebars.registerHelper("dateFormat", function dateFormat(date) {
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
  ];
  const dateArray = date.split("/");
  const final = new Date(`${dateArray[1]}/${dateArray[0]}/${dateArray[2]}`);
  const month = months[final.getMonth()];
  const day = final.getDate();
  return `${month} ${day}, ${dateArray[2]}`;
});

const data = {
  assignment_id: "12345abcnd",
  full_name: "Diksha Ghanshyam Birhade",
  bnat_id: "adhjsaj121212",
  assessment_date: "22/11/2021",
  grade: "12",
  name: "Diksha",
  enrolment_no: "92828772727",
  state: "Maharashtra",
  state_percentile: "98.0",
  city: "Pune",
  city_percentile: "93.0",
  subjects: "Physics, Chemistry, Mathematics and Biology",
  exam_type: "jee+neet",
  target_exam: "JEE/NEET 2023",
  overall_analytics: {
    rank: "10",
    total_score: "30.0",
    overall_percentage: "90.0",
    percentage_faster: "45.0",
    overall_percentile: "93.4",
    percentage_better: "N/A",
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "2 mins, 52 secs",
    average_time_question: "30 secs",
    max_questions: "25",
    max_score: "100",
  },
  physics: {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },
  chemistry: {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },
  mathematics: {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },
  biology: {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },

  retention_score: {
    value: "Excellent",
    narrative: "sample narration good",
  },
  application_score: {
    value: "Focus Area",
    narrative: "sample narration good",
  },
  physics_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  chemistry_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  mathematics_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  overall_analysis_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  biology_score: {
    value: "Good",
    narrative: "sample narration good",
  },
};

async function createPDF(data) {
  var templateHtml = fs.readFileSync(
    path.join(process.cwd(), "src/k12.html"),
    "utf8"
  );
  var template = Handlebars.compile(templateHtml);
  var html = template(data);

  var milis = new Date();
  milis = milis.getTime();

  var pdfPath = path.join("pdf", `${data.name}-${milis}.pdf`);

  var options = {
    printBackground: true,
    path: pdfPath,
  };

  const browser = await puppeteer.launch({
    args: ["--no-sandbox"],
    headless: true,
    devtools: false,
  });

  var page = await browser.newPage();
  page.setContent(html);

  // await page.goto(`data:text/html,${html}`, {
  // 	waitUntil: 'networkidle0'
  // });
  // await page.waitForSelector('img');
  await page.evaluateHandle("document.fonts.ready");
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
