// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}

function random_fun_fact() {
    const facts = 
        ['I watched the Star Wars series for the first time this year :")', 
        'I had a mushroom bob hair cut for 12 years - all the way from primary to the end of high school.', 
        'During quarantine I picked up vegetable gardening! I grew 10 tomatoes :D ',
        'I used to have 4 chickens, and one night there was a chicken massacre from a fox(?!). Only one survived. :(',
        'One time when I was walking around the block, a possum climbed up my leg onto my back! I was so surprised I strained my neck LOL.',
        'I was one of the first female cadets in a tradionally male only Army Cadet Unit. I then became the first female officer in the Company Command.' ];
    
    //Pick a random greeting. random returns random float from 0 - 1. times by length of the list so it gives us it in the range
    //0.x * length will always be between 0 - length
    const fun_fact = facts[Math.floor(Math.random() * facts.length)];

    // Add it to the page
    const fact_container = document.getElementById('fun_fact_container');
    fact_container.innerText = fun_fact;
}


/**
 * Generates a URL for a random image in the images directory and adds an img
 * element with that URL to the page.
 */
function random_image() {
  // The images directory contains 12 images, so generate a random index between
  // 1 and 12.
  const imageIndex = Math.floor(Math.random() * 12) + 1;
  const imgUrl = 'images/Rosanna' + imageIndex + '.JPG';

  const imgElement = document.createElement('img');
  imgElement.src = imgUrl;

  const imageContainer = document.getElementById('random_image_container');
  // Remove the previous image.
  imageContainer.innerHTML = '';
  imageContainer.appendChild(imgElement);
}


//================================================================


/**
 * Javascript Fetches the content from the server and adds it to the DOM.
 */
function getHelloRosanna() {
  console.log('Fetching the content from the serlvet.');

  // The fetch() function returns a Promise because the request is asynchronous.
  /* fetch('/data') sends a request to the /data URL. 
  The server responds to this request with the content , 
  exactly like when you navigated to the URL with your browser.
  
  The fetch() function makes a request in the background, 
  so it returns a Promise, which is stored in the responsePromise variable

  #MOST IMPORTANT: SENDS REQUEST TO /DATA*/
  const responsePromise = fetch('/data');

  /*
    the responsePromise variable points to a Promise, and the code call the then() func, 
    passing the handleresponse function in as an argument.
    JS can reference a function using the name.
  */
  // When the request is complete, pass the response into handleResponse().
  // tells JavaScript to call the handleResponse() function when the server returns a response.
  responsePromise.then(handleResponse);
}

/**
 * Handles response by converting it to text and passing the result to
 * addContentToDom().
 */
function handleResponse(response) {
  console.log('Handling the response and converting to text.');

  // response.text() returns a Promise, because the response is a stream of
  // content and not a simple variable.
  //const textPromise = response.text();
  const textPromise = response.json();

  // When the response is converted to text, pass the result into the
  // addContentToDom() function.
  textPromise.then(addContentToDom);
}

/** Adds the servlet Content to the DOM. */
function addContentToDom(content) {
  console.log('Adding content to dom: ' + content);

  const contentContainer = document.getElementById('content-container');
  contentContainer.innerText = content;
}

function getRandomQuoteUsingArrowFunctions() {
  fetch('/random-quote').then(response => response.text()).then((quote) => {
    document.getElementById('quote-container').innerText = quote;
  });
}

/**
 * Fetches stats from the servers and adds them to the DOM.
 */
function getServerStats() {
    //send a request to /sercer-stats, parses the reso=ponse to json, then can reference the field in stats
  fetch('/server-stats').then(response => response.json()).then((stats) => {
    // stats is an object, not a string, so we have to
    // reference its fields to create HTML content

    const statsListElement = document.getElementById('server-stats-container');
    statsListElement.innerHTML = '';
    statsListElement.appendChild(
        createListElement('Start time: ' + stats.startTime));
    statsListElement.appendChild(
        createListElement('Current time: ' + stats.currentTime));
    statsListElement.appendChild(
        createListElement('Max memory: ' + stats.maxMemory));
    statsListElement.appendChild(
        createListElement('Used memory: ' + stats.usedMemory));
  });
}
