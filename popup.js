document.addEventListener("DOMContentLoaded",function(){
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click",function(){
        const fileContent = "This is empty text";
        chrome.runtime.sendMessage({ action: "generateFile", fileContent });
    });
});