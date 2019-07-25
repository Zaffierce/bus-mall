'use strict';

var productOneEl = document.getElementById('product-one');
var productTwoEl = document.getElementById('product-two');
var productThreeEl = document.getElementById('product-three');
var formEl = document.getElementById('votes');
var productFieldset = document.getElementById('fieldset');
var productDescriptionEl = document.getElementById('aboutProducts');
var resetButtonEl = document.getElementById('resetChart');

var productsArray = {
  products: {
    name: ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif', 'wine-glass.jpg']
  },
  descriptions: {
    text: ['This beautiful suitcase is one of a kind, a must have for all Star Wars geeks and freaks.', 'Have you ever wanted to chop the shit out of your banana for no reason at all?  Has your husband made you mad?  Why not give this a go!', 'Are you the type to sit in the bathroom until your legs go nub?  What about if you\'ve been sitting there for so long that your arms start to hurt from holding your phone or iPad.  Well worry no more, try this kick ass product today!', 'Have you ever wondered what it would feel like to go play in the rain, but have your shoes filled with water at the same time?!  Try these AMAZING boots and let us know!', 'Do you want to re-live your childhood years when you had that fake oven and played chef?  Try this bad ass little thing, now you have 0 excuses for being late to work in the morning!', 'Do you want to buy possibly the worst object we have in our list?  Well, here ya go.  A great gag-gift!', 'Do you have poor posture?  Do you hate Tim from this office?  Does Tim from the office have bad posture?  Buy this chair for them and all their posture problems will go away!  (Mainly because they won\'t sit in the damn thing but we don\'t care!', 'Have you ever wanted your own 25 foot statue of Cthulu to put in your garden to piss off the Homeowners Association?  Why not buy this super awesome thing!  Tiny human in it\'s hands for scale!', 'Do you think it would be cute if your dog did the duckface with you?  Isn\'t that trend so 2016?  Well, we don\'t judge here so you and your dog can get your duckfaces on together!', 'Ever wonder what happened to Dragon from Shrek...?', 'Are you constantly running out of utensils at work but have a million pens?  Try these handy little things!  One time use though, so you are pretty much killing the environment but whatever.', 'Does your dog run around the house like a crack head at 4am?  Do you hate sweeping the house?  Well, this product is the best thing for you!', 'Are you too "hipster" to cut pizza like literally everyone else in the world and want to use this whacky product to cut your vegan vegetarian all natural pizza? (Can you even make such a thing?) Why not try this product today!', 'Have you ever wanted to sleep in the body of a shark, but actually survive?  Why not buy this and give it a go, this thing is so freaking awesome.  I own like 4 of them myself.', 'Is your baby just starting to crawl around?  Having a hard time keeping up with them?  Put them in this cute outfit and let them wander their hearts content out!  Just follow the clean spots to find them.', 'Do you want to be like Luke and cut open a freezing tauntaun to survive the weather?  Well, we have something kind of simular to that but without the whole cutting open a live animal aspect.... If you\'re into that sort of thing, I know a guy.', 'Ever wonder what happened to My Little Pony...?', 'There\'s definitely a joke here, but for legal reasons I cannot say it.  Buy this gift for your Japanese friends! ほんとに格好', 'Do you have that one friend that drinks just way too much wine but you don\'t know how to make them stop?  Give this glass to them when they are drunk and watch them struggle!']
  }
};

var votesRemaining = 25;            // 
var recentRandomNumbers = [];       //
var allProducts = [];               //  Who likes tons
var votesArray = [];                //  of empty arrays?!
var namesArray = [];                //
var rgbArrayBG = [];                //  I doooooo
var rgbArrayBD = [];                //
var top3Votes = [];                 //  Will use later
var top3Labels = [];                //  Will use later


function Product(name, description, votes, views) {
  this.name = name;
  this.filepath = `images/${name}`;
  this.votes = votes;
  this.views = views;
  this.description = description;

  allProducts.push(this);
}

if (!localStorage.votes) {    //  If localStorage.votes does not exist, create
  createProducts();           //  our products.  Else....
} else {
  allProducts = [];           // Dump the allProducts array
  var getVotes = localStorage.getItem('votes');
  var parseVotes = JSON.parse(getVotes);
  for (var i = 0; i < parseVotes.length; i++) {
    new Product(parseVotes[i].name, parseVotes[i].description, parseVotes[i].votes, parseVotes[i].views);
  }
}

function createProducts() {   // Ran if localStorage.votes does not exist
  for (var i = 0; i < productsArray.products.name.length; i++) {
    new Product(productsArray.products.name[i], productsArray.descriptions.text[i], 0, 0);
  }
}

function generateRandomRGB() {                            //
  for (var i = 0; i < allProducts.length; i++) {          //  Here we do some 
    var r = randomNumber(0, 255);                         //  pretty things with
    var g = randomNumber(0, 255);                         //  rgb to create random
    var b = randomNumber(0, 255);                         //  numbers for each
    var rgbBG = `rgba(${r}, ${g}, ${b}, 0.2)`;            //  r, g and b then feed it
    var rgbBD = `rgba(${r}, ${g}, ${b}, 1)`;              //  into a template literal and
    rgbArrayBG.push(rgbBG);                               //  push it to an array for
    rgbArrayBD.push(rgbBD);                               //  our chart colors
  }
}

// allProducts.sort(function(a, b) {
//   if (a.votes < b.votes) {
//     return 1;
//   } else {
//     return -1;
//   }
// });

// top3Votes.push(allProducts[0].votes)


function makeChart() {
  namesArray = [];
  votesArray = [];
  for (var i = 0; i < allProducts.length; i++) {
    namesArray.push(allProducts[i].name); //labels
    votesArray.push(allProducts[i].votes); //data
  }
  // top3Votes = [];                                     //
  // top3Labels = [];                                    // Taken from Adrian's
  // var top3Obj = allProducts.slice(0, 3);              // idea in class.
  // for (var i = 0; i < top3Obj.length; i++){           // 
  //   top3Labels.push(top3Obj[i].name);                 // Will use for future ideas
  //   top3Votes.push(top3Obj[i].votes);                 //
  // }

  generateRandomRGB();

  var ctx = document.getElementById('myChart').getContext('2d');
  var myChart = new Chart(ctx, {
    type: 'horizontalBar',
    data: {
      labels: namesArray,
      datasets: [{
        label: '# of Votes',
        data: votesArray,
        backgroundColor: rgbArrayBG,
        borderColor: rgbArrayBD,
        borderWidth: 1,
      }],
    },
    options: {
      responsive:true,
      maintainAspectRatio: false,
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true,
          },
        }],
      },
    },
  });
}

function makeElements(element) {
  var randomIndex = getUniqueIndex();
  allProducts[randomIndex].views++;
  element.src = allProducts[randomIndex].filepath;
  element.alt = allProducts[randomIndex].name;
  element.title = allProducts[randomIndex].name;
}

function render() {
  makeElements(productOneEl);
  makeElements(productTwoEl);
  makeElements(productThreeEl);
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueIndex() {
  var randomIndex = randomNumber(0, allProducts.length - 1);

  while (recentRandomNumbers.includes(randomIndex)) {
    randomIndex = randomNumber(0, allProducts.length - 1);
  }
  if (recentRandomNumbers.length > 5) {
    recentRandomNumbers.shift();
  }
  recentRandomNumbers.push(randomIndex);
  return randomIndex;
}


function saveVotes() {
  var jsonVotes = JSON.stringify(allProducts);
  localStorage.setItem('votes', jsonVotes);
}

function handleVote() {
  event.preventDefault();

  if (votesRemaining === 0) {
    formEl.removeEventListener('submit', handleVote);
    saveVotes();
    makeChart();
    alert('Thank you for your votes, you have hit our limit and cannot vote anymore.');
  } else {
    var voteOption = event.target.title; //voteOption = to title, title = name, name = picture.png 

    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].name === voteOption) { //Add to our votes if the picture we clicked on matches the array name
        allProducts[i].votes++;
      }
    }
    render();
    resetProductDescription(); //Resets the product description text else when it re-renders, the previous text stays in place
    votesRemaining--;
  }
}


function productDescription(event) {
  if (event.target.id !== 'fieldset') {
    for (var i = 0; i < allProducts.length; i++) {
      if (event.target.title === allProducts[i].name) {
        var index = allProducts[i].description;
      }
      productDescriptionEl.textContent = index;
    }
  //   event.target.style.color = 'orange';                             //
  //   console.log('inside of something else', event.target.id);        //  Saving this bit
  //   setTimeout(function() {                                          //  for future testing
  //     event.target.style.color = '';                                 //  or other types of
  //   }, 200);                                                         //  shennannigans
  // } else {                                                           //
  //   console.log('inside of fieldset');                               //
  }
}

function resetProductDescription() {
  productDescriptionEl.textContent = ''; //Previously mentioned in handleVote();
}

function resetChart() {
  localStorage.clear(votes); //Clears localStores.votes in case there's something else you dont want to clear
  location.reload(); //Reloads the page
}

formEl.addEventListener('click', handleVote);

productFieldset.addEventListener('mouseover', productDescription, false);

resetButtonEl.addEventListener('click', resetChart);

render();
