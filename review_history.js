const historyArr =["     TIME      :	LINK"];
let running = false;

//adds visted urls to string array
chrome.history.onVisited.addListener(function(history){
  if(running)  
    historyArr.push(dateString()+"\t\t"+history.url);
});


console.log("Started viewing history");

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateFile")
  {
    //creates the text files and downloads it locally 
    if(running)
    {
      const reader= new FileReader();
      const blob = new Blob([historyArr.join("\n\n")],{ type: 'plain/text'});
      reader.onload = function(event){
        const dataUrl = event.target.result;
        const link = document.createElement('a');
        link.href=dataUrl;
        link.download="download link";
        link.click();
        console.log(dataUrl);
      };
      console.log(reader.readAsDataURL(blob)+ " thing");
    }
  }
  //resets recorder
  else if(request.action === "nonRecord")
  {
    historyArr.length=0;
    historyArr.push("     TIME      :	LINK");
    running=false;
  }
  else if (request.action === "record")
    running=true;
});

//returns a string of the date and time
function dateString(){
  const date = new Date();
  let str = date.getDate().toString()+"/";
  str+= date.getMonth().toString()+"/";
  str+= date.getFullYear().toString() +" ";
  str+= date.getHours().toString()+":";
  let min=date.getMinutes().toString();
  if(min.length==1)
      min = "0"+min;
  return str+min;
}


