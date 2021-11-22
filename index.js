let target = "";
let correct = false;
let count = 0;

// startBtn
const startBtn = document.querySelector(".btn-start");

startBtn.addEventListener("click", function () {
  correct = false;

  if (count !== 0) {
    resetRecord();
  } else {
    visibleInput();
  }

  target = randomNumber();
  inactiveStartBtn();

  console.log(target);
});

function randomNumber() {
  let number = "";
  let numArray = [];

  while (number.length < 3) {
    var temp = Math.floor(Math.random() * 10);

    if (!numArray.includes(temp)) {
      numArray.push(temp);
      number += temp;
    }
  }

  return number;
}

function visibleInput() {
  const inputDiv = document.querySelector(".input");
  inputDiv.style.display = "block";
}

function inactiveStartBtn() {
  startBtn.disabled = true;
  startBtn.style.backgroundColor = "#bbdabf";
}

function activeStartBtn() {
  startBtn.disabled = false;
  startBtn.style.backgroundColor = "#51cf66";
}

// input
const input = document.querySelector("input");

input.addEventListener("click", function () {
  input.value = "";
});

input.addEventListener("keyup", (event) => enterkey(event));

function enterkey(event) {
  let key = event.key || event.keyCode;

  if (key === "Enter" || key === 13) {
    if (count >= 10) {
      alert("기회는 10번입니다.");
    } else if (correct) {
      alert("게임을 계속하려면 재시작 버튼을 눌러주세요.");
    } else if (input.value.length !== 3 || containNotNumber(input.value)) {
      alert("3자리 수를 입력해주세요.");
    } else {
      count++;

      const strike = countStrike(target, input.value);
      const ball = countBall(target, input.value) - strike;

      addRecord(input.value, strike, ball, count);

      if (strike === 3) {
        addComent("정답!");
        correct = true;
        restart();
      } else if (count === 10) {
        addComent("다음 기회에ㅜㅜ");
        restart();
      }
    }

    input.value = "";
  }
}

function containNotNumber(x) {
  for (var i = 0; i < 3; i++) {
    if (isNaN(x[i])) {
      return true;
    }
  }
  return false;
}

function restart() {
  activeStartBtn();
  startBtn.textContent = "재시작";
}

function countStrike(target, input) {
  let strike = 0;

  for (var i = 0; i < 3; i++) {
    if (target[i] === input[i]) {
      strike++;
    }
  }

  return strike;
}

function countBall(target, input) {
  let ball = 0;

  for (var i = 0; i < 3; i++) {
    if (target.includes(input[i])) {
      ball++;
    }
  }

  return ball;
}

// record
const main = document.querySelector("main");
let recordDiv = document.createElement("div");

function addRecord(input, strike, ball, count) {
  const record = document.createElement("p");
  if (strike === 0 && ball === 0) {
    record.innerHTML = `${count}번째 입력: ${input} - 3 아웃`;
  } else if (strike === 0) {
    record.innerHTML = `${count}번째 입력: ${input} - ${ball} 볼`;
  } else if (ball === 0) {
    record.innerHTML = `${count}번째 입력: ${input} - ${strike} 스트라이크`;
  } else {
    record.innerHTML = `${count}번째 입력: ${input} - ${strike} 스트라이크 ${ball} 볼`;
  }

  recordDiv.appendChild(record);
  main.appendChild(recordDiv);
}

function resetRecord() {
  count = 0;
  main.removeChild(recordDiv);
  recordDiv = document.createElement("div");
}

function addComent(str) {
  const coment = document.createElement("p");
  coment.style.color = "red";
  coment.innerHTML = str;

  recordDiv.appendChild(coment);
}
