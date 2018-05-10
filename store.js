#!/usr/bin/env nodejs
var op=process.argv[2];
var arg_1=  process.argv[3];
var arg_2=process.argv[4]
var dict = {};
var filedata;
var fs= require('fs')
if (!fs.existsSync('test.json')) {

 fs.writeFile("./test.json","[]",(err)=>{
  if(err){
  return console.log("error =>",err)  
  }
  else{
    console.log("file successfully created")
  }
}) 
}
switch(op) {
  case "add":
           dict[arg_1]=arg_2;
                    fs.readFile('test.json', function (err, data) {
                      var json = JSON.parse(data)
                      json.push (dict) 
                      console.log(json) 
                      fs.writeFile('test.json', JSON.stringify(json));
                      console.log("added successfully")
                    })
             break;
  case "list":
              var data=fs.readFileSync('test.json')
              filedata = JSON.parse(data);  
              console.log(filedata);  
                break;
      case "get":
                  var data=fs.readFileSync('test.json');
                     filedata = JSON.parse(data);
                     filedata.forEach(function(element) {
                      var el = JSON.parse(element)
                    for(var key in el) {
                    if (key ==  arg_1){
                        var value = el[key];
                        console.log(value);

                      }                       
                    }
                  });

                      break;
      case "remove":
                      var el;
                      var data=fs.readFileSync('test.json');
                      filedata = JSON.parse(data);
                      const toDelete = arg_1;
                      var johnRemoved = filedata.filter(function(el) {
                        delete el[arg_1];
                        return el;
                    });
                    var after=JSON.stringify(johnRemoved).replace(/{},/g, " ");
                    console.log("value was removed successfully!")
                    fs.writeFile('test.json', after);

                break;
      case "clear":
      fs.writeFile('test.json', '[]', function(){console.log('The file was cleared')})       
        break;
  default:
          console.log("invalid input")
} 

