const genSwitch = document.getElementById("historySwitch");
const colouredText=document.getElementById("recording");


chrome.storage.sync.get("colorPresence",function(data){
    if(data.colorPresence)
        colouredText.style.color = data.colorPresence;
});

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
    colouredText.style.color= (isChecked)? "red":"white";
    (isChecked)? saveColour("red"):saveColour("white");
    chrome.storage.sync.set({ isChecked: isChecked });
    chrome.runtime.sendMessage({ action: "invert"});
});

function saveColour(colour){
    chrome.storage.sync.set({"colorPresence":colour});
}

