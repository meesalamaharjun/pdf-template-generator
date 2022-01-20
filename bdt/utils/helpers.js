const staticData = require("../data/static.json");
function scoreCircleOffset(percentage) {
  const offsetValueFromPercentage = percentage * (440 / 100);
  return 440 - offsetValueFromPercentage;
}


function roundIt(percentage) {
  return Math.round(+(percentage));
}


function formatDate(dateString) {
  var pr = new Intl.PluralRules("en-GB", { type: "ordinal" });

  const suffixes = new Map([
    ["one", "st"],
    ["two", "nd"],
    ["few", "rd"],
    ["other", "th"],
  ]);

  const formatOrdinals = (n) => {
    const rule = pr.select(n);
    const suffix = suffixes.get(rule);
    return `${n}${suffix}`;
  };

  const dateParts = dateString.split('/')

  const date = new Date(`${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`);

  const day = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
  }).format(date);

  const month = new Intl.DateTimeFormat("en-GB", {
    month: "short",
  }).format(date);

  return `${formatOrdinals(day)} ${month}`;
}

function progressBarGradient(score) {
  let parsedScore = parseInt(score, 10);
  if (parsedScore <= 50) return "rangePoor";
  else if (parsedScore > 50 && parsedScore <= 80) return "rangeOkay";
  else return "rangeGood";
}

function progressTextPosition(percentage) {
  let parsedPercentage = parseInt(percentage, 10);
  return parsedPercentage > 8 ? parsedPercentage - 8 : parsedPercentage;
}

const getGradeImages = (grade) => {
  return {
    "first":staticData.section_images[grade][0],
    "second":staticData.section_images[grade][1],
  };
};

const getSubjectIcon=(subject)=>{
  return staticData.subject_icons[subject];
}


const getGapText=(score)=>{
  if(score>0&&score<=50){
    return "SIGNIFICANT GAP"
  }
  else if(score>50&&score<=80){
    return "MODERATE GAP"
  }
  else if(score>80&&score<=100){
    return "LOW GAP"
  }
}



module.exports = {
  scoreCircleOffset,
  getSubjectIcon,
  formatDate,
  progressBarGradient,
  progressTextPosition,
  getGradeImages,
  getGapText,
  roundIt
};
