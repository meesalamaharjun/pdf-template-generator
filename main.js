const compileHTML = require("./bdt/bdt");


compileHTML().then(data=>{
    console.log("Successfully generated the PDF");
})
.catch(err=>{
    console.log("Something went wrong",err)
})