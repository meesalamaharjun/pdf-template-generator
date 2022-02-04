const compileHTML = require("./k10/k10");


compileHTML().then(data=>{
    console.log("Successfully generated the PDF");
})
.catch(err=>{
    console.log("Something went wrong",err)
})