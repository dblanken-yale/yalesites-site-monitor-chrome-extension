let monitoredDomains = new Set(["panthonsite.io", "lndo.site"]);
let trackedSites = new Set();

// Function to extract domain from URL
function extractDomain(url) {
  let domain;
  // Find & remove protocol (http, https, etc.) and get domain
  if (url.indexOf("://") > -1) {
    domain = url.split('/')[2];
  } else {
    domain = url.split('/')[0];
  }
  // Remove port number
  domain = domain.split(':')[0];
  // Remove query string
  domain = domain.split('?')[0];

  return domain;
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url) {
    let domain = extractDomain(changeInfo.url);
    for (let monitoredDomain of monitoredDomains) {
      if (domain.includes(monitoredDomain)) {
        trackedSites.add(domain);
        chrome.storage.local.set({ trackedSites: Array.from(trackedSites) });
        break;
      }
    }
  }
});
