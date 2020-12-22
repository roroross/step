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

function getComment() {
   //when it was text, it shows all the bracklets and text was. json makes it parse intop json
   //fetching all my comments now from the /data. fetch runs the doget method.
   //iterate over the comments array to get  out of the content.
 
   //initiatise it so it doesnt append and append and append
    document.getElementById('content-container').innerHTML = ''
    //comment of comments itereating thought the values. use "in" and it shows the index
    fetch('/data').then(response => response.json()).then((comments) => {
        for (comment of comments) {
            document.getElementById('content-container').innerHTML += comment.content + '<br>' ;
        }
    });
}
