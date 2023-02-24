// Load the selected language from storage and set it as the selected option in the dropdown list
chrome.storage.local.get("selectedLanguage", function (data) {
  var language = data.selectedLanguage || "en";
  document.querySelector("#language option[value='" + language + "']").selected = true;
  
  // Display the actual selected language in the UI
  var languageLabel = document.querySelector("#language option[value='" + language + "']").textContent;
  document.querySelector("#selected-language").textContent = languageLabel;
});

// Save the selected language to storage when the Apply Filter button is clicked
document.getElementById("apply").addEventListener("click", function () {
  var language = document.getElementById("language").value;
  chrome.storage.local.set({ selectedLanguage: language }, function () {
    alert("Filter applied for " + language + " language.");
    
    // Display the actual selected language in the UI
    var languageLabel = document.querySelector("#language option[value='" + language + "']").textContent;
    document.querySelector("#selected-language").textContent = languageLabel;
  });
});

// Update the actual selected language in the UI when the dropdown list is changed
document.getElementById("language").addEventListener("change", function () {
  var language = document.getElementById("language").value;
  
  // Display the actual selected language in the UI
  var languageLabel = document.querySelector("#language option[value='" + language + "']").textContent;
  document.querySelector("#selected-language").textContent = languageLabel;
});

