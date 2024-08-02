let display = document.getElementById("display");
let button = document.getElementsByClassName("js-button");

let operatorList = ["+", "-", "*", "/"];//連続入力不可にする文字のリスト

let mode = "integerMode";//入力中の数値に小数点が含まれているか判別する変数

//クリックイベントをボタン全体に適用
for(let i = 0; i < button.length; i++) {
    button[i].addEventListener("click", getValue);
}

//入力された値をディスプレイに表示
function getValue() {
    //ACを押した時
    if(this.value === "AC") {
        display.value = "0";
        mode = "integerMode";//ACを押したら整数モードに戻す
    //=を押した時
    } else if(this.value === "=") {
        display.value = eval(display.value);
        if(display.value.includes(".")) {
            mode = "decimalMode";//計算結果に小数点が含まれていたら小数入力モードにする
        } else {
            mode = "integerMode";//=を押したら整数モードに戻す
        }
    //0または00を押した時
    } else if(this.value === "0" || this.value === "00") {
        if(display.value === "0") {
            return;
        } else if(operatorList.includes(display.value.slice(-2, -1)) && display.value.slice(-1) === "0") {//演算子の後に0を連続入力できない
            return;
        } else if(operatorList.includes(display.value.slice(-1))) {//演算子の後に00を入力できない
            display.value += "0";
        } else {
            display.value += this.value;
        }
    //演算子が入力された時
    } else if(operatorList.includes(this.value)) {
        if(operatorList.includes(display.value.slice(-1))) {
            display.value = display.value.slice(0, -1) + this.value;//演算子を連続で入力できない(別の演算子の場合は置き換える)
        } else if(display.value.slice(-1) === "." || display.value === "0") {//初期状態と小数点の後は演算子を入力できない
            return;
        } else {
            display.value += this.value;
            mode = "integerMode";//演算子が入力されたら整数モードに戻す
        }
    //小数点が入力された時
    } else if(this.value === ".") {
        //小数点と演算子の後は入力できない、小数点入力モードの時は入力できない
        if(mode === "decimalMode" || operatorList.concat(".").includes(display.value.slice(-1))) {
            return;
        } else {
            display.value += this.value;
            mode = "decimalMode";//小数点が入力されたら小数点入力モードにする
        }
    //1~9の数字が押された時
    } else if(display.value === "0") {
        display.value = this.value;//初期状態の時は上書きする
    } else {
        display.value += this.value;
    }
}