const genSwitch = document.getElementById("historySwitch");

chrome.storage.sync.get("isChecked",function(data){
    genSwitch.checked = data.isChecked;
});

document.addEventListener("DOMContentLoaded",function(){
    const generateButton = document.getElementById("generateButton");
    generateButton.addEventListener("click",function(){
        chrome.runtime.sendMessage({ action: "generateFile" });
    });
});

genSwitch.addEventListener("change",function(){
    const isChecked = genSwitch.checked;
    chrome.storage.sync.set({ isChecked: isChecked });
    chrome.runtime.sendMessage({ action: "invert"});
});