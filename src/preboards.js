exports.source = `
<!DOCTYPE html>
<html>
  <head>
    <link
      href="https://fonts.googleapis.com/css?family=Shippori+Mincho&display=block"
      rel="stylesheet"
      rel="preload"
      as="style"
    />
    <link
      href="https://fonts.googleapis.com/css?family=Roboto&display=block"
      rel="stylesheet"
      rel="preload"
      as="style"
    />
    <style>
      .header {
        display: flex;
      }
      .logo {
        height: 85px;
        width: 180px;
      }
      .logo-container {
        display: flex;
        flex-direction: row-reverse;
      }
      .title-container {
        width: 80%;
        font-family: "Roboto";
        font-size: 26px;
        font-weight: bold;
      }
      .student-details {
        display: flex;
        margin-top: 20px;
      }
      .student-date {
        font-size: 22px;
        font-family: "Roboto";
        font-weight: bold;
        color: white;
        background: red;
        border-radius: 5px;
        height: 35px;
        width: 200px;
        text-align: center;
        margin-right: 20px;
        align-items: center;
        display: flex;
        justify-content: center;
      }
      .student-name {
        font-family: "Shippori Mincho";
        font-size: 24px;
        font-weight: bold;
        align-items: center;
        display: flex;
        justify-content: center;
      }
      .student-grade {
        font-size: 20px;
        margin: 20px 0 0 10px;
        font-family: "Roboto";
      }
      .student-marks-header {
        height: 40px;
        width: 240px;
        background: grey;
        font-size: 22px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        margin: 100px 0 0 50px;
        position: absolute;
        top: 120px;
        left: 100px;
        opacity: 0.8;
        color: white;
        font-family: "Roboto";
        font-weight: bold;
      }
      .student-marks-detials {
        width: 600px;
        background-color: palegoldenrod;
      }
      .student-marks {
        margin-top: 100px;
      }
      .empty-div {
        height: 30px;
      }
      .student-marks-table-header {
        display: flex;
      }
      .student-marks-header-cell {
        width: 150px;
        font-size: 18px;
        font-weight: bold;
        padding-top: 10px;
        height: 35px;
      }
      .first {
        margin-left: 20px;
      }
      .last {
        margin-right: 20px;
      }
      .table-cell-border {
        border-top: 0.5px solid;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <div class="title-container">All India Mock Test</div>
      <div class="logo-container">
        <img
          class="logo"
          alt="logo"
          src="https://logos-world.net/wp-content/uploads/2021/08/Byjus-Symbol.png"
        />
      </div>
    </div>
    <div class="student-details">
      <div class="student-date">6th September</div>
      <div class="student-name">Sanchit Agarwal</div>
    </div>
    <div class="student-grade">10TH CBSE | PCB</div>
    <div class="student-marks">
      <div class="student-marks-header">Marks Scorecard</div>
      <div class="student-marks-detials">
        <div class="empty-div"></div>
        <div class="student-marks-table-header">
          <div class="student-marks-header-cell first">Subject</div>
          <div class="student-marks-header-cell">Marks Obtained</div>
          <div class="student-marks-header-cell">Total Marks</div>
          <div class="student-marks-header-cell last">Percentage</div>
        </div>
        <div class="student-marks-table-header table-cell-border">
          <div class="student-marks-header-cell first">mathematics</div>
          <div class="student-marks-header-cell">65</div>
          <div class="student-marks-header-cell">100</div>
          <div class="student-marks-header-cell last">65%</div>
        </div>
      </div>
    </div>
  </body>
</html>

`;