var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
];

//Getting data from the server
var content = document.getElementsByClassName("content")[0];
async function getDetailBySection(section) {
    while (content.childNodes.length) {
        content.removeChild(content.childNodes[0]);
    }
    var key = "EF2dFbix6XHNAhMhfaUFZGPB3j2NH3CM";
    if (section == undefined) {
        var url =
            "https://api.nytimes.com/svc/topstories/v2//home.json?api-key=EF2dFbix6XHNAhMhfaUFZGPB3j2NH3CM";
    } else {
        var url = `https://api.nytimes.com/svc/topstories/v2/${section}.json?api-key=${key}`;
    }
    var response = await fetch(url);
    var data = await response.json();
    data.results.forEach((item) => {
        var capitalSection =
            item.section[0].toUpperCase() + item.section.slice(1);
        var month = months[item.created_date.split("-")[1].slice(1) - 1];
        var day = item.created_date.split("-")[2].slice(0, 2);
        var tempDiv = document.createElement("div");
        tempDiv.setAttribute("class", "margin-top");
        tempDiv.innerHTML = `<div class="card" style="width: 100%;">
        <div class="container">
            <div class="row">
                <div class="card-body"></div>
                <div class="col-8 padding">
                    <h6>${capitalSection}</h6>
                    <h5 class="card-title">${item.title}</h5>
                    <div
                        class="card-subtitle mb-2 text-muted"
                    >
                        ${month} ${day}
                    </div>
                    <p class="card-text">
                    ${item.abstract}
                    </p>
                    <a href="${item.url}" class="card-link"
                        >Continue Reading</a
                    >
                </div>
                <div class="col-4 col-img">
                    <img
                        class="card-img"
                        src="${item.multimedia[item.multimedia.length - 1].url}"
                        alt="Card image cap"
                    />
                </div>
            </div>
        </div>
    </div>`;
        content.appendChild(tempDiv);
    });
}

var sections = document.querySelectorAll(".topic");

sections.forEach((item) => {
    item.addEventListener("click", () => {
        getDetailBySection(item.innerHTML);
    });
});

getDetailBySection();
