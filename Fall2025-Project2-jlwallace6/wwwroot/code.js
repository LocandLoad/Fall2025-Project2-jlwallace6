
var imgs = [
    "SoTrue-232.jpg",
    "sisphus.png",
    "pizzaHat.png"
]
var currentImg = 0;
var body = document.body;
header = $('header');

var searchButton = document.getElementById("searchButton");

searchButton.addEventListener("click", () => {
    query = document.getElementById("query").value;
    googleSearch(query);
});

var luckButton = document.getElementById("lucky");

luckButton.addEventListener("click", () => {
    query = document.getElementById("query").value;
    luckySearch(query);
});

async function googleSearch(query) {
    if (query == "")
    {
        return;
    }

    try {
        const response = await fetch(`/api/search/google?query=${encodeURIComponent(query)}`);

        const data = await response.json();

        searchResultsDiv = document.getElementById("searchResults");
        searchResultsDiv.style.visibility = "visible";
        searchResultsDiv.innerHTML = "<h2>Search Results:</h2>";
        
        data.items?.forEach((item, index) => {
            searchResultsDiv.innerHTML += `<p><a href="${item.link}" target="_blank">${item.title}</a><br>${item.snippet}</p><hr>`;
        });
        document.getElementById("searchResults").scrollIntoView({
            behavior: "smooth",
            block: "start" 
        });
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}

async function luckySearch(query) {
    if (query == "") {
        return;
    }

    try {
        const response = await fetch(`/api/search/google?query=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
      
        window.location.href = data.items[0].link;
    } catch (error) {
        console.error("Error fetching search results:", error);
    }
}

header.click(function () {
    ++currentImg;
    currentImg = (currentImg) % imgs.length;
    var urlStr = 'url(\"' + imgs[currentImg] + '\")';
    body.style.backgroundImage = urlStr;
    
});

function getTime() {
    const now = new Date();
    const timeEl = document.getElementById("time");
    //timeEl.textContent = "Current time: " + now.toLocaleTimeString();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    timeEl.textContent = `${hours}:${minutes}`;
    timeEl.style.visibility = "visible";
    $("#time").dialog({title: "Time"});
}