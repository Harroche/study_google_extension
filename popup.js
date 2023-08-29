document.addEventListener("DOMContentLoaded",function(){
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click",function(){
        const fileContent = "This is the content of the generated file.";
        chrome.runtime.sendMessage({ action: "generateFile", fileContent });
    });
});