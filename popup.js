document.addEventListener('DOMContentLoaded', () => {
  let siteList = document.getElementById('site-list');

  // Load tracked sites from storage
  chrome.storage.local.get('trackedSites', (data) => {
    let sites = data.trackedSites || [];
    sites = new Set(sites); // convert array back to set
    sites.forEach(site => {
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.textContent = site;
      button.addEventListener('click', () => {
        chrome.windows.create({ url: "https://" + site, type: "normal" });
      });
      listItem.appendChild(button);
      siteList.appendChild(listItem);
    });
  });
});
