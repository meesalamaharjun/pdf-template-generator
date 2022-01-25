function dateFormat(date) {
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
}

module.exports = {
  dateFormat,
};