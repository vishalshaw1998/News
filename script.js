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
var container = document.createElement("div");
container.setAttribute("class", "container");
container.innerHTML = `<div class="row flex">
<div class="col align-left flex">
    <div
        class="btn btn-link"
        type="button"
        data-toggle="collapse"
        data-target="#collapseOne"
        aria-expanded="true"
        aria-controls="collapseOne"
    >
        <i class="fa fa-bars fa-3x" aria-hidden="true"></i>
    </div>
    <div
        class="heading"
        style="align-self: center; margin-left: 30%;"
    >
        The Good NEWS
    </div>
</div>
</div>
<div id="collapseOne" class="collapse show forButton">
<div class="row">
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Arts</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Automobiles</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Books</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Business</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Fashion</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Food</span>
    </div>
</div>
<br />
<div class="row">
    <div class="col-md-2 col-sm-6 offset-1">
        <span class="border-botm topic">Health</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Home</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Insider</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Magazine</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Movies</span>
    </div>
</div>
<br />
<div class="row">
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">World</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Science</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Sports</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Technology</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Politics</span>
    </div>
    <div class="col-md-2 col-sm-6">
        <span class="border-botm topic">Opinion</span>
    </div>
</div>
<br />
</div>
<br />
<div class="row">
<div class="col">
    <div class="content1">
        <div class="content"></div>
    </div>
</div>
</div>`;
document.body.appendChild(container);
//Getting data from the server
var content = document.getElementsByClassName("content")[0];
async function getDetailBySection(section) {
    try {
        while (content.childNodes.length) {
            content.removeChild(content.childNodes[0]);
        }
        var key = "EF2dFbix6XHNAhMhfaUFZGPB3j2NH3CM";
        if (section == undefined || section == "Home") {
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
            if (capitalSection == "Us") {
                capitalSection = "US";
            }
            var month = months[item.created_date.split("-")[1].slice(1) - 1];
            var day = item.created_date.split("-")[2].slice(0, 2);
            var tempDiv = document.createElement("div");
            tempDiv.setAttribute("class", "margin-top");
            tempDiv.innerHTML = `<div class="card" style="width: 100%;">
        <div class="container">
            <div class="row">
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
                        class="card-img img-fluid img-responsive"
                        src="${item.multimedia[item.multimedia.length - 1].url}"
                        alt="Card image cap"
                    />
                </div>
            </div>
        </div>
    </div>`;
            content.appendChild(tempDiv);
        });
    } catch (err) {
        console.log(err);
    }
}

var sections = document.querySelectorAll(".topic");

sections.forEach((item) => {
    item.addEventListener("click", () => {
        getDetailBySection(item.innerHTML);
    });
});

getDetailBySection();
