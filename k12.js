const compileHTML = require("./k12/k12");


compileHTML().then(data=>{
    console.log("Successfully generated the PDF");
})
.catch(err=>{
    console.log("Something went wrong",err)
})