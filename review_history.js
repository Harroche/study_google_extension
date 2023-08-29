// This code executes when the popup is loaded
const historyArr =[];

chrome.history.onVisited.addListener(function(result){
  historyArr.push(result.url);
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
