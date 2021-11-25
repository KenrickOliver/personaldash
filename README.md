# Personal Dash

A personal productivity Web App that mimics a dashboard layout.<br />
A Live Demo of the app can be found here: [Live Site](https://kenrickoliver.github.io/personaldash/).

Some of the Apps main features include:
- Consuming data from 3rd party APIs to fetch random quotes.
- Uses the built in geolocation web API to get current user position to then fetch the weather based on location.
- Simple CRUD functionality with the ability to create/edit/delete notes.
- Notes also get saved to localStorage(persistent data).
- Fully Responsive Web App.

## Features

### Display random motivational quote
This is one of the simpler features of this App. All we are doing is dispalying a random motivational quote in the top left hand corner of the app. The quotes are fetched from a 3rd party API and we are using a random number to select which quote we use.
```
function getQuote() {
  fetch("https://type.fit/api/quotes")
    .then((res) => res.json())
    .then((data) => {
      let randInd = Math.floor(Math.random() * data.length);
      let auth = data[randInd].author ? data[randInd].author : "Unknown";
      quote.innerHTML = `${data[randInd].text}`;
      author.innerHTML = `${auth}`;
    })
    .catch((err) => {
      console.log(err);
      let txt = "Once you choose hope, anythings possible.";
      let auth = "Christopher Reeve";
      quote.innerHTML = `${txt}`;
      author.innerHTML = `${auth}`;
    });
}
getQuote();

```
We are using the built in fetch function in JavaScript to make the API call. We fetch the quote AND the author of said quote.
Sometimes there is no author so we conditonally check for this and then just display "Unknown" if no author is provided.<br />
As you can see we are also error checking using the .catch method and we have a default fallback quote we can display incase something goes wrong when we make the API call.<br />
Lastly, as soon as the app loads the getQuote function is called so each time the app is loaded OR refreshed, it should trigger an API call to get a differnt quote.