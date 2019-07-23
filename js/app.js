'use strict';

var productOneEl = document.getElementById('product-one');
var productOneInputEl = document.getElementById('productOne');
var productTwoEl = document.getElementById('product-two');
var productTwoInputEl = document.getElementById('productTwo');
var productThreeEl = document.getElementById('product-three');
var productThreeInputEl = document.getElementById('productThree');
// var productContainerEl = document.getElementById('productList');
var formEl = document.getElementById('votes');

var recentRandomNumbers = [];
var allProducts = [];

function Product(name) {
  this.name = name;
  this.filepath = `images/${name}`;
  this.votes = 0;
  this.views = 0;

  allProducts.push(this);
}

new Product('bag.jpg');
new Product('banana.jpg');
new Product('bathroom.jpg');
new Product('boots.jpg');
new Product('breakfast.jpg');
new Product('bubblegum.jpg');
new Product('chair.jpg');
new Product('cthulhu.jpg');
new Product('dog-duck.jpg');
new Product('dragon.jpg');
new Product('pen.jpg');
new Product('pet-sweep.jpg');
new Product('scissors.jpg');
new Product('shark.jpg');
new Product('sweep.png'); //is .png
new Product('tauntaun.jpg');
new Product('unicorn.jpg');
new Product('usb.gif'); //is .gif
new Product('wine-glass.jpg');

function render() {
  var randomIndex = getUniqueIndex();
  allProducts[randomIndex].views++;
  productOneEl.src = allProducts[randomIndex].filepath;
  productOneEl.alt = allProducts[randomIndex].name;
  productOneEl.title = allProducts[randomIndex].name;
  productOneInputEl.value = allProducts[randomIndex].name;

  randomIndex = getUniqueIndex();
  allProducts[randomIndex].views++;
  productTwoEl.src = allProducts[randomIndex].filepath;
  productTwoEl.alt = allProducts[randomIndex].name;
  productTwoEl.title = allProducts[randomIndex].name;
  productTwoInputEl.value = allProducts[randomIndex].name;

  randomIndex = getUniqueIndex();
  allProducts[randomIndex].views++;
  productThreeEl.src = allProducts[randomIndex].filepath;
  productThreeEl.alt = allProducts[randomIndex].name;
  productThreeEl.title = allProducts[randomIndex].name;
  productThreeInputEl.value = allProducts[randomIndex].name;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getUniqueIndex() {
  var randomIndex = randomNumber(0, allProducts.length - 1);

  while (recentRandomNumbers.includes(randomIndex)) {
    randomIndex = randomNumber(0, allProducts.length - 1);
  }

  if (recentRandomNumbers.length > 4) {
    recentRandomNumbers.shift();
  }

  console.log(recentRandomNumbers);
  recentRandomNumbers.push(randomIndex);
  return randomIndex;
}

var count = 0;
function handleVote() {
  if (count > 24) {
    event.preventDefault();
    alert('Thank you for your votes, you have hit our limit and cannot vote anymore.');
    return;
  } else {
    event.preventDefault();
    var voteOption = event.target.product.value;
    var voteOptionSplit = voteOption.split('.')[0];
    console.log(voteOptionSplit);

    for (var i = 0; i < allProducts.length; i++) {
      if (allProducts[i].name === voteOption) {
        allProducts[i].votes++;
      }
    }
    render();
    count++;
    console.log(`Count is ${count}`);
  }
}

formEl.addEventListener('submit', handleVote);

render();
