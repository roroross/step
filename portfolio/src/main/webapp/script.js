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

google.charts.load('current', {'packages':['corechart']});
google.charts.setOnLoadCallback(loadChartFunctions); //setting this to all charts.
//this will load the charts so dont need to call it in the html onload. 

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
    document.getElementById('content-container').innerHTML = '';
    //get the selected dropdown.
    commentLimitSelection = document.getElementById('maxCommentSelected');
    //Retrieving the text of the selected <option> in <select> element. .selectedindex shows the chosen index! //string
    commentLimit = commentLimitSelection.options[commentLimitSelection.selectedIndex].text; 

    //comment of comments itereating thought the values. use "in" and it shows the index. 
    fetch('/data' + '?maxComments=' + commentLimit).then(response => response.json()).then((comments) => {
        for (comment of comments) {
            document.getElementById('content-container').innerHTML += comment.content + '<br>' ;
        }
    });
}

function deleteComment() {
    //make POST request to /delete-data
    const request = new Request('/delete-data', {method: 'POST'});
    //call function to detch comments from server so now deleted comments are removed from apge
    //using promise. these two lines prob couldve been one line of code?
    fetch(request).then(getComment());

}

/** Creates a map and adds it to the page. put in center of Town Hall, and set zoom. */
function createMap() {
    const TownHall = {lat: -33.8732, lng: 151.2071};
    const SGHS = {lat: -33.889829774, lng : 151.218999124};
    const UNSW = {lat : -33.917329664, lng : 151.225332432};
    const map = new google.maps.Map(
        document.getElementById('map'),
        {center: TownHall, zoom: 13});
        // The marker, positioned at Uluru
    const marker = new google.maps.Marker({
        position: TownHall,
        map: map,
        title: 'TownHall Station'
    });
    const TownHallInfoWin =
        new google.maps.InfoWindow({content: 'Townhall Station. A reall cool underground station if you look at the infrastructure layout. \
        (I used to be a Rail intern at a Engineering Firm)'});
    TownHallInfoWin.open(map, marker);
    
    const marker_sghs = new google.maps.Marker({
        position: SGHS,
        map: map,
        title: 'Sydney Girls High School'
    });
    const SGHInfoWin =
        new google.maps.InfoWindow({content: 'Sydney Girls High School, where I went to high school. Fun times!'});
    SGHInfoWin.open(map, marker_sghs);

    const marker_UNSW = new google.maps.Marker({
        position: UNSW,
        map: map,
        title: 'UNSW'
    });
    const UNSWInfoWin =
        new google.maps.InfoWindow({content: 'UNSW, my university. Goodbye to the UNSW 891 bus. You will be missed.'});
    UNSWInfoWin.open(map, marker_UNSW);

    const marker_Kingtea = new google.maps.Marker({
        position: {lat: -33.87757560192759, lng: 151.20434077792177},
        map: map,
    })
    const KTInfoWin = 
        new google.maps.InfoWindow({content: "BBT Rec #1: really nice tea, I like the watermelon crush with cream cheese on top. \
         Can't get it anywhere else other than this BBT Chain!! Really Unique flavour"});
    KTInfoWin.open(map, marker_Kingtea);

    const marker_Ymi = new google.maps.Marker({
        position: {lat: -33.87942790779213, lng: 151.20466664018636},
        map: map,
    });
    const YmiInfoWin =
        new google.maps.InfoWindow({content: 'BBT Rec #2: Yomies Rice X Yogurt. The OG purple rice yoghurt store that inspired the new rice yoghurt trend.\
        Try the purple rice yoghurt flavour, or the hawthorn flavour'});
    YmiInfoWin.open(map, marker_Ymi);

    const marker_Fish = new google.maps.Marker({
        position: {lat: -33.87683779095806, lng: 151.20367581672295},
        map: map,
    });
    const FishInfoWin =
        new google.maps.InfoWindow({content: 'Meal Rec: There is a really good grilled fish place here. Super cheap and Yum!'});
    FishInfoWin.open(map, marker_Fish);
}

/** Creates a chart and adds it to the page. */
function drawDrinksChart() {
  const data = new google.visualization.DataTable();
  data.addColumn('string', 'Drinks');
  data.addColumn('number', 'Count');
        data.addRows([
          ['Water', 16],
          ['Bubble Tea', 14],
          ['Lemon Tea', 7],
          ['Coke', 5],
          ['Apple Juice', 3],
        ]);

  const options = {
    'title': 'Drinks I consume in a week',
    'width':500,
    'height':400
  };
  const chart = new google.visualization.PieChart(
      document.getElementById('chart-container'));
  chart.draw(data, options);
}

/** Fetches bigfoot sightings data and uses it to create a chart. */
function drawCovidChart() {
  //fetch into the /covid data, then convert the response into json, then calling the retrived json  TotalCovidCaseCount 
  //we make a chart of it
  fetch('/Covid-data').then(response => response.json())
  .then((TotalCovidCaseCount) => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Year');
    data.addColumn('number', 'Total Count');
    Object.keys(TotalCovidCaseCount).forEach((year) => {
      data.addRow([year, TotalCovidCaseCount[year]]);
    });

    const options = {
      'title': 'Total Australia Covid Count over 2020 ',
      'width':600,
      'height':500
    };

    const chart = new google.visualization.LineChart(
        document.getElementById('covid-container'));
    chart.draw(data, options);
  });
}

/** Onload function to draw all the chart functions before using webpage */
function loadChartFunctions() {
  drawDrinksChart();
  drawCovidChart();
}