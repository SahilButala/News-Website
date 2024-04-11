const api_key = "5b18e2e625aa411dbf942183250d0938";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchData("news"));

async function fetchData(news) {
    const res = await fetch(`${url}${news}&apiKey=${api_key}`);
    const data = await res.json();
    bindData(data.articles)
}

function bindData(articles) {
    const boxContainer = document.getElementById("box-container")
    const TemplateNews = document.getElementById("card-template")
    boxContainer.innerHTML = ""
    articles.forEach((elem) => {
        if (!elem.urlToImage) return;

        const cardClone = TemplateNews.content.cloneNode(true);
        fillDataInCard(cardClone, elem);
        boxContainer.appendChild(cardClone);
    })
}

function fillDataInCard(cardClone, elem) {
    const newsImg = cardClone.querySelector("#box-img");
    const decrip = cardClone.getElementById("para")
    const dateTxt = cardClone.getElementById("date-text")
    const title = cardClone.getElementById("title")


    newsImg.src = elem.urlToImage;
    decrip.innerHTML = `${elem.description.slice(0, 150)}...`;
    title.innerHTML = `${elem.title.slice(0, 60)}..`;

    const date = new Date(elem.publishedAt).toLocaleString("en-US", { timeZone: "Asia/Jakarta" })
    dateTxt.innerHTML = `${elem.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(elem.url, "_blank")
    })
}

currentNavLink = null;
function onClickpage(id) {
    fetchData(id);
    const navItem = document.getElementById(id)
    currentNavLink?.classList.remove("active")
    currentNavLink = navItem;
    currentNavLink.classList.add("active")
}


const SeatchBtn = document.getElementById("search")
const searchInput = document.getElementById("input-txt")


SeatchBtn.addEventListener("click", () => {
    const qurey = searchInput.value
    if (!qurey) return;
    fetchData(qurey)
    currentNavLink?.classList.remove("active")
    currentNavLink = null;
})



const bar = document.getElementById("bar")
const  navbar = document.getElementById("navbar")
if(bar){
    bar.addEventListener("click",()=>{
        navbar.classList.toggle("active")
    })
}




