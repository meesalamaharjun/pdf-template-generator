const compileHTML = require("./bdt/bdt");
const path=require('path');


compileHTML().then(data=>{
    console.log("Successfully generated the PDF");
})
.catch(err=>{
    console.log("Something went wrong",err)
}) 
