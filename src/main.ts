// project 1 digital clock 
function clockTime(): string {
  let date = new Date();
  let second: number | string = date.getSeconds();
  let minuts: number | string = date.getMinutes();
  second = second < 10 ? "0" + second : second;
  minuts = minuts < 10 ? "0" + minuts : minuts;
  let hour = date.getHours();
  let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let day = weekday[date.getDay()];
  let mounth = date.getMonth() + 1;
  let yeurs = date.getFullYear();
  let times = <HTMLElement> document.getElementById('time');
  return times.innerHTML =
      `${hour}:${minuts}:${second} /${day} /${mounth} /${yeurs}`;
}
setInterval(function () { return clockTime(); }, 1000);
// project 2 clock time 
let clockHours = <HTMLElement> document.getElementById("hour");
let clockMinuts = <HTMLElement> document.getElementById("minuts");
let clockSecond = <HTMLElement> document.getElementById("second");
function clock(): void {
  let date = new Date();
  let hour = date.getHours();
  let minuts = date.getMinutes();
  let second = date.getSeconds();
  let hourDeg = (360 / 12) * hour;
  let minutsDeg = (360 / 60) * minuts;
  let secondDeg = (360 / 60) * second;
  clockHours.style.transformOrigin = "bottom center";
  clockHours.style.transform = `rotate(${hourDeg}deg)`;
  clockMinuts.style.transformOrigin = "bottom center";
  clockMinuts.style.transform = `rotate(${minutsDeg}deg)`;
  clockSecond.style.transformOrigin = "bottom center";
  clockSecond.style.transform = `rotate(${secondDeg}deg)`;
}
setInterval(function () { clock(); }, 1000);
// project 3 to Do app
let list = <HTMLElement> document.getElementById("list"), 
  enter = <HTMLInputElement> document.getElementById("tippeList"), 
  creatBtn = <HTMLInputElement> document.getElementById("create"), 
  delet = <HTMLInputElement> document.getElementById("delet");

function createElem() {
  let work = <HTMLElement> document.createElement("div");
  work.className = "work";
  work.innerHTML = enter.innerHTML;
  let deletWork = <HTMLInputElement> document.createElement("input");
  deletWork.type = "button";
  deletWork.value = "x";
  deletWork.className = "deletWork";
  work.appendChild(deletWork);
  list.appendChild(work);
  deletWork.onclick = function () { work.remove(); };
}
enter.addEventListener("keypress", function (event) {
  if (event.key == "Enter") {
      enter.innerHTML == "" ? console.log("write semthing") : createElem();
      enter.innerHTML = "";
  }
});
creatBtn.onclick = function () {
  enter.innerHTML == "" ? console.log("write semthing") : createElem();
  enter.innerHTML = "";
};
delet.onclick = function () { enter.innerHTML = ""; };
// project 4
let balanc = <HTMLElement> document.getElementById("yourIncome"), 
  tracker = <HTMLElement> document.getElementById("tracker"), 
  diffrent = <HTMLElement> document.getElementById("diffrent"), 
  income = <HTMLElement> document.getElementById("mounyPlus"), 
  expense = <HTMLElement> document.getElementById("mounyMinus"), 
  historys = <HTMLElement> document.getElementById("historyItem"), 
  text = <HTMLInputElement> document.getElementById("description"), 
  addnew = <HTMLElement> document.querySelector(".amount"), 
  amounte = <HTMLInputElement> document.getElementById("amountInput"), 
  darkmode = <HTMLElement> document.getElementById("darkmode");
// the information 
let objectTransaction = [
  { id: 1, name: "salary", mouny: 2000 },
  { id: 2, name: "book", mouny: -60 },
  { id: 3, name: "game", mouny: 40 },
  { id: 4, name: "pc", mouny: -450 }
];
let transaction = objectTransaction;
// create id 
function generatId(): number {
  return Math.floor(Math.random() * 10000);
}
// local storage 
// let setfromLocalStorage = 
//         JSON.parse(localStorage.getItem("transaction"));
// let action = setfromLocalStorage !== null ? setfromLocalStorage : [];
// function updateItemFromLocalStorage() {
//     localStorage.setItem("transaction",JSON.stringify(transaction));
// }
// start build 
function addTransaction(e: Event) {
  e.preventDefault();
  if (amounte.value.trim() === "" && text.value.trim() === "") {
      alert("write your expends");
  }
  else {
      let newtransaction = {
          id: generatId(),
          name: text.value,
          mouny: +amounte.value
      };
      transaction.push(newtransaction);
      createTransaction(transaction);
      updateValue();
      // setItemFromLocalStorage();
      text.value = "";
      amounte.value = "";
  }
}

// type transactionInter = {
//     id: number,
//     name: string,
//     mouny: number
// }[]

let itemList: HTMLElement;
console.log(transaction)
function createTransaction(transaction: any): void {
  let sign = transaction.mouny > 0 ? "+" : '-';
  itemList = document.createElement("div");
  itemList.className = "del";
  itemList.classList.add(sign === "+" ? "win" : "lose");
  itemList.innerHTML = 
      `<p class="desc">${transaction.name}</p>
      <p class="mouny ${sign === "+" ? "MWin" : "MLose"}>${sign}${Math.abs(transaction.mouny)}</p>
      <button id="remove" onclick="removeItems(${transaction.id})">
          <i class="fa-solid fa-xmark"></i>
      </button>`
  historys.appendChild(itemList);
}
function updateValue(): void {
  let amounts = transaction.map(function (transaction) { return transaction.mouny; });
  let total = amounts
      .reduce(function (acc, value) { return acc += value; })
      .toFixed(2);
  let incomemouny = amounts
      .filter(function (x) { return x > 0; })
      .reduce(function (acc, val) { return acc += val; })
      .toFixed(2);
  let expensemouny = (amounts
      .filter(function (x) { return x < 0; })
      .reduce(function (acc, val) { return acc += val; }) * -1)
      .toFixed(2);
  balanc.innerHTML = "$".concat(total);
  income.innerHTML = "$".concat(incomemouny);
  expense.innerHTML = "$".concat(expensemouny);
}
function removeItems(id: number): void {
  historys.innerHTML = "";
  transaction = transaction.filter(function (item) { return item.id !== id; });
  // getlocalStorage();
  unit();
}
function unit(): void {
  transaction.forEach(createTransaction);
  updateValue();
}
unit();
addnew.addEventListener("submit", addTransaction);
darkmode.addEventListener("click", function () {
  tracker.classList.toggle("backgroundChange");
  historys.style.color = "black";
  text.classList.toggle("backgroundChange");
  amounte.classList.toggle("backgroundChange");
});
// project 5 character counter
let textAria = <HTMLInputElement> document.getElementById("text-counter"), 
  resultLetter = <HTMLElement> document.getElementById("result-characters"), 
  inputWithSP = <HTMLInputElement> document.getElementById("with-space"), 
  inputSP = <HTMLInputElement> document.getElementById("spaces"), 
  inputWithoutSP = <HTMLInputElement> document.getElementById("without-space"), 
  inputVowel = <HTMLInputElement> document.getElementById("vowels"), 
  resetText = <HTMLInputElement> document.getElementById("reset-vowel");

let i = 0;
function characterLength() {
  let str = textAria.innerHTML.length;
  resultLetter.innerHTML = `${str}`;
}
function characterLengthWitoutSP() {
  let str = textAria.innerHTML.split(" ").join("").length;
  resultLetter.innerHTML = `${str}`;
}
function onlySP() {
  let str = textAria.innerHTML.split(/\w/).join("").length;
  resultLetter.innerHTML = `${str}`;
}
function onlyVowels() {
  let str = <RegExpMatchArray> textAria.innerHTML.match(/[aeuio]/ig);
  let strLenght = str.length
  resultLetter.innerHTML = `${strLenght}`;
}
let vwl = ["a", "e", "u", "i", "o"];
textAria.addEventListener("input", function (event: any): void {
  console.log(event)
  if (vwl.includes(event.data)) {
      resultLetter.innerHTML = `${i++ + 1}`;
  }
  else {
      let str = textAria.innerHTML.match(/[aeuio]/ig);
      resultLetter.innerHTML = `${str}`;
  }
});
function resetAll() {
  return textAria.innerHTML = "";
}
inputWithSP.addEventListener("click", characterLength);
inputWithoutSP.addEventListener("click", characterLengthWitoutSP);
inputSP.addEventListener("click", onlySP);
inputVowel.addEventListener("click", onlyVowels);
resetText.addEventListener("click", resetAll);
// project 6 Generate Pig Latine 
let english = <HTMLElement> document.getElementById("text-english");
let pigLatine = <HTMLElement> document.getElementById("output-in-latin");
let translateBtn = <HTMLElement> document.getElementById("click");
let vowels = ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"];
english.addEventListener("keyup", function (e: KeyboardEvent) {
  let input= (e.target as HTMLInputElement).value;
  let output = input
      .split(" ")
      .map(function (word) {
      if (vowels.includes(word[0])) {
          if (word.slice(word.length - 1).toLowerCase() === "y") {
              return word + "ay";
          }
          else {
              return word + "way";
          }
      }
      if (word.match(/[^aeuioy][^aeuioy]/g)) {
          return word
              .slice(2)
              .concat(word.slice(0, 2))
              .concat("ay");
      }
      else if (word.match(/[^aeuio][aeuioy]/g)) {
          return word
              .slice(1)
              .concat(word.slice(0, 1))
              .concat("ay");
      }
  }).join(" ");
  pigLatine.innerHTML = output;
});
// project 7 rock paper scissors
let yourwin = <HTMLElement> document.getElementById('forYou'), 
  pcWin = <HTMLElement> document.getElementById('forcomputer'), 
  ResultOfGame = <HTMLElement> document.getElementById('WinLose'), 
  playerOne = <HTMLElement> document.getElementById('player1'), 
  playerTwo = <HTMLElement> document.getElementById('player2'), 
  choice = <HTMLElement> document.getElementById('thechoiceGame'), 
  rock = <HTMLElement> document.getElementById('rock'), 
  paper = <HTMLElement> document.getElementById('paper'), 
  scessors = <HTMLElement> document.getElementById('scisser'), 
  btnRslt = <HTMLElement> document.getElementById('btnRslt');
  
// get array of choices 
let ndList = Array.from(choice.children);
let lose = 0;
let win = 0;
pcWin.innerHTML = `0${lose}`;
yourwin.innerHTML = `0${win}`;
let _loop_1 = (i_1: number) => {
  // button click delete 
  btnRslt.addEventListener('click', function () {
      rotateTheGame(pcWin, yourwin);
      console.log("work");
  });
  ndList[i_1].addEventListener('click', function () {
      // rotate the game 
      winOrLoseAndRotate(pcWin, yourwin);
      // dscr the result 
      ResultOfGame.style.color = 'white';
      ResultOfGame.innerHTML = 'Play';
      ResultOfGame.className = "";
      // time befor get the result 
      playerOne.innerHTML = "<i class=\"fa-solid fa-hand-back-fist\"></i>";
      playerTwo.innerHTML = "<i class=\"fa-solid fa-hand-back-fist\"></i>";
      // cumputer play 
      let randomPlay = +(Math.random() * 10).toFixed(0);
      console.log(randomPlay);
      // add the animation 
      playerOne.classList.add("startNow");
      playerTwo.classList.add("startNow");
      // set the time before the result 
      setTimeout(function () {
          // cumputer play his choice
          if (randomPlay <= 3) {
              playerTwo.innerHTML = rock.innerHTML;
          }
          else if (randomPlay > 3 && randomPlay <= 6) {
              playerTwo.innerHTML = paper.innerHTML;
          }
          else if (randomPlay > 6) {
              playerTwo.innerHTML = scessors.innerHTML;
          }
          // your choice 
          playerOne.innerHTML = ndList[i_1].innerHTML;
          setTimeout(function () {
              // remove class start icon 
              playerOne.classList.remove("startNow");
              playerTwo.classList.remove("startNow");
              // chack the winner 
              if (playerTwo.innerHTML === rock.innerHTML && playerOne.innerHTML === rock.innerHTML ||
                  playerTwo.innerHTML === paper.innerHTML && playerOne.innerHTML === paper.innerHTML ||
                  playerTwo.innerHTML === scessors.innerHTML && playerOne.innerHTML === scessors.innerHTML) {
                  ResultOfGame.innerHTML = 'Null';
                  ResultOfGame.className = 'lose';
                  ResultOfGame.style.color = '#0084ff';
              }
              else if (playerTwo.innerHTML === rock.innerHTML && playerOne.innerHTML === paper.innerHTML ||
                  playerTwo.innerHTML === scessors.innerHTML && playerOne.innerHTML === rock.innerHTML ||
                  playerTwo.innerHTML === paper.innerHTML && playerOne.innerHTML === scessors.innerHTML) {
                  ResultOfGame.innerHTML = 'Win';
                  ResultOfGame.style.color = '#04eb04';
                  ResultOfGame.className = 'losegame';
                  yourwin.innerHTML = `0${win += 1}`;
              }
              else if (playerOne.innerHTML === rock.innerHTML && playerTwo.innerHTML === paper.innerHTML ||
                  playerOne.innerHTML === scessors.innerHTML && playerTwo.innerHTML === rock.innerHTML ||
                  playerOne.innerHTML === paper.innerHTML && playerTwo.innerHTML === scessors.innerHTML) {
                  ResultOfGame.innerHTML = 'Lose';
                  ResultOfGame.style.color = '#ff3737';
                  ResultOfGame.className = 'losegame';
                  pcWin.innerHTML = `0${lose += 1}`;
              }
              // the winner 
              theResult(pcWin, yourwin);
          }, 1000);
      }, 2800);
  });
};
// loop the array of children 
for (let i_1 = 0; i_1 < ndList.length; i_1++) {
  _loop_1(i_1);
}
function theResult(a: HTMLElement, i: HTMLElement) {
  if (a.innerHTML == `0${3}`) {
      ResultOfGame.innerHTML = 'You Lose the Game';
      ResultOfGame.style.color = '#ff3737';
      ResultOfGame.className = 'wingame';
  }
  else if (i.innerHTML == `0${3}`) {
      ResultOfGame.innerHTML = 'You Win the Game';
      ResultOfGame.style.color = '#04eb04';
      ResultOfGame.className = 'wingame';
  }
}
;
function winOrLoseAndRotate(a: HTMLElement, i: HTMLElement) {
  if (a.innerHTML == `0${3}` || i.innerHTML == `0${3}`) {
      i.innerHTML = `0${win = 0}`;
      a.innerHTML = `0${lose = 0}`;
  }
}
function rotateTheGame(a: HTMLElement, i: HTMLElement) {
  i.innerHTML = `0${win = 0}`;
  a.innerHTML = `0${lose = 0}`;
  ResultOfGame.innerHTML = 'Play';
  ResultOfGame.style.color = 'white';
  playerOne.innerHTML = "<i class=\"fa-solid fa-hand-back-fist\"></i>";
  playerTwo.innerHTML = "<i class=\"fa-solid fa-hand-back-fist\"></i>";
}



// start project recipes app 

// project 8 Recipes App 

let listofFood = <HTMLElement> document.querySelector(".listofFood"),
  recipe = <HTMLElement> document.getElementById("recipe"),
  ingredients = <HTMLElement> document.getElementById("ingredients");

// the menu of food 
let Food = [
  {name: 'Salad', menu: ['Lettuce', 'Green Onion', 'Sweet Peppers', 'Touatoes']},
  {name: 'Pizza', menu: ['Pizza dough', 'White souce', 'Mozzarella', 'Bacon']},
];

// open box to edit 

let addRecipe = <HTMLElement> document.getElementById("AddRecipe");
let overly = <HTMLElement> document.querySelector('.overly');
addRecipe.addEventListener("click", () => {
  overly.style.display = "block";
});

// create and push new food 
function pushNewRecipe() : void {
  if (recipe.innerHTML === "" || ingredients.innerHTML === "") {
      alert("write some food");
  } else {
      let newFd = {
          name: recipe.innerHTML,
          menu: ingredients.innerHTML.split(","),
      }
      
      Food.push(newFd);
      createNewRcp(newFd);
  }
}

interface FoodParam {
  name: string,
  menu: string[]
}

let foodnumber = 1;

// the content of new food 
function createNewRcp(food: FoodParam) : void {
  console.log(food)
  let newRecipe = document.createElement("li");
  newRecipe.className = "food";
  newRecipe.id = "food";
  newRecipe.innerHTML = 
  `<div class="name-Food">
      <div onclick='swipToggle(food, "${food.name}")' id="nameFd">${food.name}</div>
  </div>
  <div class="menuFood" id="menuFood" style="transition: all 0.3s ease; display: none;">
      <p>Ingredients</p>
      <br>
      <ul class="menu" id="menu">
          ${food.menu.map((ing) => `<li>${ing}</li>`).join('')}
      </ul>
      <div class="deletEdit">
          <button class="deletF" id="deletF" onclick="deletRecipe('${food.name}', '${food}')">Delete <i class="fa-solid fa-trash"></i></button>
          <button class="editF" id="editF" onclick='showEditbox("${food.name}", "${food.menu}")'>Edit <i class="fa-regular fa-pen-to-square"></i></button>
      </div>
  </div>
  <p id="rcp">recipe #<span id="numberOfrcp">${foodnumber++}</span></p>`;
  
  listofFood.appendChild(newRecipe);
  
  let nameFd = <HTMLElement> document.getElementById('nameFd');
  
  // swip Ingredients
  for (let i = 0; i < nameFd.length; i++) {
      nameFd[i].addEventListener("click", () => {
              console.log(ndList)
              let menuFd = Array.from(ndList);
          for (let i = 0; i < menuFd.length; i++) {
              return menuFd[i].style.display === "block" ?menuFd[i].style.display = 'none' : menuFd[i].style.display = 'block';
          } 
          // swipIngr
      });
  } 

  let recipe = <HTMLElement> document.getElementById('recipe');
  let ingredient = <HTMLElement> document.getElementById('ingredients');
  recipe.innerHTML = '';
  ingredient.innerHTML = '';
  overly.style.display = 'none';
}

// delet some food 
function deletRecipe(name: string, foods: {}[]) {
  foods = [];
  let newFood = Food.filter(fd => fd.name !== name);
  test(newFood);
};


function swipToggle(food: Node, name: string) {
  const arrOfFood = [...food];

  let currentFood = arrOfFood.filter(nameFood => nameFood.firstElementChild.childNodes[1].innerHTML === name);
  
  let ndList = currentFood[0].childNodes[2];
  
  ndList.style.display === "none" ? ndList.style.display = "block": ndList.style.display = "none";
}


// toggle show the ingredients
function swipIngr() {
};

function test(newFood :{name: string;menu: string[];}[]) {
  // console.log(newFood)
  Food.forEach(createNewRcp)
  // newFood ? newFood.forEach(createNewRcp): Food.forEach(createNewRcp);
}
test();

// add new food
let add = <HTMLElement> document.getElementById('add');
add.onclick = () => {
  pushNewRecipe();
}

// close the overly 
let closeElem = <HTMLElement> document.getElementById('close');
closeElem.onclick = () => {
  overly.style.display = 'none';
}

// save the changes food 
let save = <HTMLElement> document.getElementById('save');
save.onclick = () => {
  overly.style.display = 'none';
}

function showEditbox(name: string, menu: string[]) {
  Food.filter(item => item.name !== name);
  overly.style.display = 'block';
  recipe.innerHTML = name;
  ingredients.value = menu;
}




// export {}