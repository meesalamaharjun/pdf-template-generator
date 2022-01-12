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

const k_10_response = {
  assignment_id: "12345abcnd",
  full_name: "full_name",
  bnat_id: "adhjsaj121212",
  assessment_date: "22/11/2021",
  grade: "12",
  enrolment_no: "92828772727",
  state: "state",
  state_percentile: "98.0",
  city: "city",
  city_percentile: "93.0",
  name: "Diksha",

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
  "Mathematical Ability": {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },
  "Verbal Ability": {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },
  "Logical Ability": {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },
  "Environmental Science": {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },
  Science: {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },
  "Social Science": {
    attempted: "20",
    correct: "15",
    incorrect: "5",
    total_time_taken: "10 mins",
    average_time_question: "30 secs",
    percentage: "78",
    percentage_faster: "87",
    max_questions: "30",
  },

  mathematical_ability_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  verbal_ability_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  logical_ability_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  science_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  environmental_science_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  social_science_score: {
    value: "Good",
    narrative: "sample narration good",
  },

  retention_score: {
    value: "Excellent",
    narrative: "sample narration good",
  },
  speed_score: {
    value: "Focus Area",
    narrative: "sample narration good",
  },
  accuracy_score: {
    value: "Focus Area",
    narrative: "sample narration good",
  },

  application_score: {
    value: "Focus Area",
    narrative: "sample narration good",
  },

  numerical_reasoning_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  analytical_reasoning_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  conceptual_understanding_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  spatial_reasoning_score: {
    value: "Good",
    narrative: "sample narration good",
  },
  overall_analysis_score: {
    value: "Good",
    narrative: "sample narration good",
  },
};
async function createPDF(data) {
  var templateHtml = fs.readFileSync(
    path.join(process.cwd(), "src/k10.html"),
    "utf8"
  );
  var template = Handlebars.compile(templateHtml);

  //adding array of subjects in the payload
  // let subjetArray = data.subjects.split(",");

  // let arr = [];

  // if (subjetArray.length === 1) {
  //   if (subjetArray[0].contains("and")) {
  //     let lastElArr = subjetArray[0].split("and");
  //     for (let i = 0; i < lastElArr.length; i++) {
  //       let obj = {};
  //       obj.name = lastElArr[i].trim();
  //       obj.data = { ...data[lastElArr[i].toLowerCase().trim()] };
  //       arr.push(obj);
  //     }
  //   } else {
  //     let obj = {};
  //     obj.name = subjetArray[0].trim();
  //     obj.data = { ...data[subjetArray[0].toLowerCase().trim()] };
  //     arr.push(obj);
  //   }
  // } else {
  //   for (let i = 0; i < subjetArray.length - 1; i++) {
  //     let obj = {};
  //     obj.name = subjetArray[i].trim();
  //     obj.data = { ...data[subjetArray[i].toLowerCase().trim()] };
  //     arr.push(obj);
  //   }
  //   let lastElArr = subjetArray[subjetArray.length - 1].split("and");
  //   for (let i = 0; i < lastElArr.length; i++) {
  //     let obj = {};
  //     obj.name = lastElArr[i].trim();
  //     obj.data = { ...data[lastElArr[i].toLowerCase().trim()] };
  //     arr.push(obj);
  //   }
  // }
  // data.subjetArray = JSON.parse(JSON.stringify(arr));

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

createPDF(k_10_response);
