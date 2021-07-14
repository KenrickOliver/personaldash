const timeHeading = document.querySelector('.time-heading')
const dateHeading = document.querySelector('.date-heading')
const quote = document.getElementById("quote")
const author = document.getElementById("author")

const saveBtn = document.getElementById('input-button')

saveBtn.addEventListener('click', () => {
    console.log('click')
})

// Function to getquote
function getQuote() {
    
    fetch("https://type.fit/api/quotes")
        .then(res => res.json())
        .then((data) => {
            let randInd = Math.floor(Math.random() * data.length)
            let auth = (data[randInd].author ? data[randInd].author : 'Unknown')
            quote.innerHTML = `${data[randInd].text}`
            author.innerHTML = `${auth}`
  })
        .catch(err => {
            console.log(err)
            let txt = 'Once you choose hope, anythings possible.';
            let auth = 'Christopher Reeve'
            quote.innerHTML = `${txt}`
            author.innerHTML = `${auth}`
        })
}
getQuote();

//Function to get and display the current Date/Time
function setTime() {
    let today = new Date();
    let date = 'Date: ' + today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
    let time = 'Time: ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()+" "+(today.getHours()<12 ? 'AM' : 'PM');

    timeHeading.innerHTML = time;
    dateHeading.innerHTML = date;
}

setInterval(setTime, 1000); //Update the time every second(1000 milliseconds)