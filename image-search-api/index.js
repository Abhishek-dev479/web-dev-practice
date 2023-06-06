const accessKey = '61ST_CFZ9xvflcoDlhTjIJFdW36diUyolwhUPletMxU';


let search = document.getElementById('search');
let submit  = document.getElementById('submit');
let box = document.getElementById('box');
let loadMore = document.getElementById('loadMore');
let results = document.getElementById('results');
let colors = document.getElementsByClassName('color');  
let page = 1;

let color = '';
let latest = false;
let safe = false;
function loadImages(boo){
    if(boo){
        box.innerHTML = '';
    }
    let text = search.value;
    if(text == '') return;
    let url = '';
    let l = 'relevant';
    let s = 'low';
    if(latest) l = 'latest'
    if(safe) s = 'high'
    if(color) url = `https://api.unsplash.com/search/photos/?query=${text}&content_filter=${s}&order_by=${l}&color=${color}&page=${page}&per_page=30&client_id=${accessKey}`;
    else url = `https://api.unsplash.com/search/photos/?query=${text}&content_filter=${s}&order_by=${l}&page=${page}&per_page=30&client_id=${accessKey}`;
    fetch(url)
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        noOfResults = res.total;
        results.innerHTML = `<center><h2>${noOfResults} results found</h2></center>`
        if(noOfResults == 0) return;
        for(let i=0; i<30; i++){
            let desc = res.results[i].alt_description;
            desc == null ? desc = '' : desc = desc;
            let src = res.results[i].urls.small;
            let div = document.createElement('div');
            div.className = 'boxes'
            div.innerHTML = `<img src=${src} class="image"><span class="description">${desc}</span>`
            box.appendChild(div);
        }
        if(noOfResults != 0) loadMore.style.visibility = 'visible';
        loadMore.addEventListener('click', function(){
            page++;
            console.log('hello');
            loadImages(false);
        });
    })
    .catch((err) => {
        console.log(err);
    })
}

let latestFilter = document.getElementById('latestFilter');
let safeFilter = document.getElementById('safeFilter');

latestFilter.addEventListener('change', function(){
    latest = this.checked;
    loadImages(true);
})

safeFilter.addEventListener('change', function(){
    safe = this.checked;
    loadImages(true);
})    

submit.addEventListener('click', function(event){
    event.preventDefault();
    console.log(document.getElementsByTagName('body')[0].backgroundImage);
    document.getElementsByTagName('body')[0].style.backgroundImage = 'none';
    document.getElementById('header').style.visibility = 'hidden';
    color = '';
    loadImages(true);
    Array.from(colors).forEach((e, i) => {
        console.log(e);
        e.addEventListener('click', function(){
            color = e.id;
            loadImages(true);
        })
    });  
})
