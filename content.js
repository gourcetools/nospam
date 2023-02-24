// Load the selected language from storage
chrome.storage.local.get("selectedLanguage", function (data) {
  var language = data.selectedLanguage || "en";
  
  // Loop through all text nodes in the webpage
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
  while (walker.nextNode()) {
    var node = walker.currentNode;
    
    // Check if the text node is in the selected language
    var text = node.nodeValue.trim().toLowerCase();
    if (text !== "" && !text.includes(language)) {
      // Hide the text node if it is not in the selected language
      node.parentElement.style.display = "none";
    }
  }
});

// Listen for changes to the DOM and reapply the filter
var observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
      // Rerun the filter when new nodes are added to the DOM
      chrome.storage.local.get("selectedLanguage", function (data) {
        var language = data.selectedLanguage || "en";
      
        var walker = document.createTreeWalker(mutation.addedNodes[0], NodeFilter.SHOW_TEXT, null, false);
        while (walker.nextNode()) {
          var node = walker.currentNode;
        
          var text = node.nodeValue.trim().toLowerCase();
          if (text !== "" && !text.includes(language)) {
            node.parentElement.style.display = "none";
          }
        }
      });
    }
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});

