// This code executes when the popup is loaded
const historyArr =["     TIME      :	LINK"];

chrome.history.onVisited.addListener(function(history){
  historyArr.push(dateString()+"\t\t"+history.url);
});
console.log("Started viewing history");
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "generateFile")
  {
    const reader= new FileReader();
    const blob = new Blob([historyArr.join("\n"+"\n")],{ type: 'plain/text'});
    reader.onload = function(event){
      const dataUrl = event.target.result;
      console.log(dataUrl);
    };
    console.log(reader.readAsDataURL(blob)+ " thing");
  }
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
