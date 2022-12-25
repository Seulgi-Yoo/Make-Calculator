const calculator = document.querySelector(".calculator"); // calculator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const buttons = calculator.querySelector(".button-container"); // button-container 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.

const operator = document.querySelector(".operator"); // coperator 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const result = document.querySelector(".result"); // result 엘리먼트와, 그 자식 엘리먼트의 정보를 모두 담고 있습니다.
const preview = document.querySelector(".preview"); // preview 엘리먼트 정보 가져오기

function calculate(n1, operator, n2) {
  let result = 0;
  // TODO : n1과 n2를 operator에 따라 계산하는 함수를 만드세요.
  // ex) 입력값이 n1 : '1', operator : '+', n2 : '2' 인 경우, 3이 리턴됩니다.
  if (operator === "+") {
    result = Number(n1) + Number(n2);
  } else if (operator === "-") {
    result = Number(n1) - Number(n2);
  } else if (operator === "*") {
    result = Number(n1) * Number(n2);
  } else if (operator === "/") {
    result = Number(n1) / Number(n2);
  }
  return result;
}
let firstNum = ""; // 첫번째 숫자
let operatorForAdvanced = ""; // 연산기호
let previousKey = ""; // 직전 키
let previousNum = ""; // 직전 숫자

buttons.addEventListener("click", function (event) {
  // 버튼을 눌렀을 때 작동하는 함수입니다.

  const target = event.target; // 클릭된 HTML 엘리먼트의 정보가 저장되어 있습니다.
  const action = target.classList[0]; // 클릭된 HTML 엘리먼트에 클레스 정보를 가져옵니다.
  const buttonContent = target.textContent; // 클릭된 HTML 엘리먼트의 텍스트 정보를 가져옵니다.
  // ! 위 코드(Line 19 - 21)는 수정하지 마세요.

  if (target.matches("button")) {
    // TODO : 계산기가 작동할 수 있도록 아래 코드를 수정하세요. 작성되어 있는 조건문과 console.log를 활용하시면 쉽게 문제를 풀 수 있습니다.
    // 클릭된 HTML 엘리먼트가 button이면
    if (action === "number") {
      // 그리고 버튼의 클레스가 number이면 아래 코드가 작동됩니다.
      if (previousKey !== "enter") {
        // 기존 계산기 숫자가 0이고, 오퍼레이터 버튼이 안눌린 상태
        if (result.textContent === "0" && operatorForAdvanced === "") {
          result.textContent = buttonContent;
          preview.style.display = "block";
          preview.textContent = buttonContent; // 계산 식 미리보기
          firstNum = result.textContent; // 첫번째 숫자를 변수에 할당
          console.log("숫자 " + buttonContent + " 버튼");
        }
        // 기존 계산기 숫자가 0이 아니고, 오퍼레이터 버튼이 안눌린 상태 + 직전 키가 엔터가 아닐 때 (두자릿수 이상 누르기 위한 코드)
        else if (result.textContent !== "0" && operatorForAdvanced === "") {
          result.textContent += buttonContent;
          preview.textContent += buttonContent;
          firstNum = result.textContent;
          console.log("숫자 " + buttonContent + " 버튼");
        }
        // 기존 계산기 숫자가 0이 아니고, 오퍼레이터 버튼이 눌린 상태
        else if (result.textContent !== "0" && operatorForAdvanced !== "") {
          // 직전키가 오퍼레이터 값일 때,
          if (previousKey === operatorForAdvanced) {
            result.textContent = buttonContent;
            preview.textContent += buttonContent;
            previousKey = result.textContent; // 직전키를 변수에 할당 (직전키가 오퍼레이터냐 숫자냐에 따라 계산기의 다양한 기능을 구현하기 위함)
            previousNum = result.textContent; // 직전 숫자를 변수에 할당
            console.log("숫자 " + buttonContent + " 버튼");
          }
          // 직전키가 오퍼레이터 값이 아닐 때,(두자릿수 이상 누르기 위한 코드)
          // ex) 15+17을 하기 위해 15와 +, 1을 누른 상태(17을 완성하기 위한 코드)
          else if (previousKey !== operatorForAdvanced) {
            result.textContent = result.textContent + buttonContent;
            previousNum = result.textContent;
            preview.textContent += buttonContent;
            console.log("숫자 " + buttonContent + " 버튼");
          }
        }
        // 직전 키가 엔터이면
      } else if (previousKey === "enter") {
        result.textContent = "";
        result.textContent = result.textContent + buttonContent;
        previousKey = result.textContent; // 직전키를 변수에 할당
        previousNum = result.textContent;
        preview.textContent = buttonContent;
        console.log("숫자 " + buttonContent + " 버튼");
      }
    }
  }

  if (action === "operator") {
    if (previousKey !== "enter") {
      if (operatorForAdvanced === "") {
        operatorForAdvanced = buttonContent; // 오퍼레이터 누를 때 누른 텍스트 정보 할당
        previousKey = operatorForAdvanced; // 직전키에 오퍼레이터 텍스트 정보 할당
        preview.textContent += buttonContent;
        console.log("연산자 " + buttonContent + " 버튼");
      } else if (operatorForAdvanced !== "") {
        alert("연산은 한 번만 가능합니다.");
      }
    } else {
      alert('"AC"버튼으로 초기화 후 사용하세요.');
    }
  }

  if (action === "decimal") {
    console.log("소수점 버튼");
  }

  if (action === "ac") {
    result.textContent = "0";
    preview.style.display = "none";
    firstNum = "";
    previousNum = "";
    operatorForAdvanced = "";
    previousKey = "";
    console.log("초기화 버튼");
  }

  if (action === "enter") {
    previousKey = "enter"; // 직전키에 "enter" 문자열 할당

    // 첫번째 숫자가 입력되어 있고, 오퍼레이트 버튼이 안눌린 상태
    if (firstNum !== "" && operatorForAdvanced === "") {
      result.textContent = firstNum;
    }
    // 첫번째 숫자가 입력되어 있고, 직전 숫자가 없을 때
    else if (firstNum !== "" && previousNum === "") {
      // 기존에 작성했던 calculate 함수를 이용하여 계산 상황에 따른 전달인자와 함께 호출
      result.textContent = calculate(
        result.textContent,
        operatorForAdvanced,
        result.textContent
      );
    }
    // 직전 키가 계산 값과 같을 때
    else if (previousKey === result.textContent) {
      result.textContent = calculate(
        firstNum,
        operatorForAdvanced,
        previousNum
      );
    }
    // 직전 키가 계산 값과 다르고, 직전 숫자가 입력되어 있을 때
    else if (previousKey !== result.textContent && previousNum !== "") {
      result.textContent = calculate(
        result.textContent,
        operatorForAdvanced,
        previousNum
      );
    }
    // 직전 키가 계산 값과 다르고, 직전 숫자가 없을 때
    else if (previousKey !== result.textContent && previousNum === "") {
      result.textContent = firstNum;
    }
    preview.textContent = result.textContent;
    operatorForAdvanced = ""; // 오퍼레이트 초기화
    previousNum = ""; // 직전 숫자 초기화
    console.log("계산 버튼");
  }
});
  