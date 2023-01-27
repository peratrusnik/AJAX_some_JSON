
let datasetDiv = document.querySelector('.dataset')
let myLinks = document.querySelectorAll('.myLink')
let visited = {}

myLinks.forEach((link) => link.addEventListener('click', getData))

function getData(e) {
    e.preventDefault()
    let url = this.getAttribute('href')
    if (visited.hasOwnProperty(this.innerText)) {
        createTable(visited[this.innerText])
    } else {
            sendRequest(url, this.innerText)        
        }
}

function sendRequest(url, category) {

    
    document.body.classList.add('loading')
    let xml = new XMLHttpRequest();
    xml.open('get', url);
    xml.onreadystatechange = function () {
        if (xml.readyState === 4 && xml.status === 200) {
            let data = JSON.parse(xml.responseText)
            createTable(data)
            visited[category] = data
            document.body.classList.remove('loading')
        }
}
    xml.send();
    
    // document.body.classList.add('loading')
    // fetch(url)
    //     .then((res) => res.json())
    //     .then((data) => {
    //         createTable(data)
    //         document.body.classList.remove('loading')
    //     })
    //     .catch(() => {
    //     datasetDiv.innerHTML = '<h2>Error</h2>'
    // })
}

function createTable(data) {
    console.log(data);

    let text = ''

    text += `<table class="table">`
    text += `<thead>`
    text += `<tr>`
    for(const th in data[0]){
    text +=  `<th>${th}</th>`
    }
    text += `</tr >`
    text += `</thead>`
    
    text += `<tbody>`
    data.forEach((el) => {
    text += '<tr>'
        for (const td in el) {
            text += `<td>${el[td]}</td>` 
        }
    text += '</tr>'
    });  
    text += `</tbody>`

    text += `</table>`

    datasetDiv.innerHTML = text.trim()
}