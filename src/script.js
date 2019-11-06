const engLower = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'backspace', 'tab', 113, 119, 101, 114, 116, 121, 117, 105, 111, 112, 91, 93, 92, 'del', 'capslock', 97, 115, 100, 102, 103, 104, 106, 107, 108, 59, 39, 13, 'shiftL', 122, 120, 99, 118, 98, 110, 109, 44, 46, 47, 'shiftR', 'ctrlL', 'altL', 32, 'altR', 'ctrlR'];
const engUpper = [96, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'backspace', 'tab', 81, 87, 69, 82, 84, 89, 85, 73, 79, 80, 91, 93, 92, 'del', 'capslock', 65, 83, 68, 70, 71, 72, 74, 75, 76, 59, 39, 13, 'shiftL', 90, 88, 67, 86, 66, 78, 77, 44, 46, 47, 'shiftR', 'ctrlL', 'altL', 32, 'altR', 'ctrlR'];
const rusLower = [1105, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'backspace', 'tab', 1081, 1094, 1091, 1082, 1077, 1085, 1075, 1096, 1097, 1079, 1093, 1098, 92, 'del', 'capslock', 1092, 1099, 1074, 1072, 1087, 1088, 1086, 1083, 1076, 1078, 1101, 13, 'shiftL', 1103, 1095, 1089, 1084, 1080, 1090, 1100, 1073, 1102, 46, 'shiftR', 'ctrlL', 'altL', 32, 'altR', 'ctrlR'];
const rusUpper = [1025, 49, 50, 51, 52, 53, 54, 55, 56, 57, 48, 45, 61, 'backspace', 'tab', 1049, 1062, 1059, 1050, 1045, 1053, 1043, 1064, 1065, 1047, 1061, 1066, 92, 'del', 'capslock', 1060, 1067, 1042, 1040, 1055, 1056, 1054, 1051, 1044, 1046, 1069, 13, 'shiftL', 1071, 1063, 1057, 1052, 1048, 1058, 1068, 1041, 1070, 46, 'shiftR', 'ctrlL', 'altL', 32, 'altR', 'ctrlR'];

let xLang = engLower;

document.body.insertAdjacentHTML('afterbegin', '<textarea id="inp" type="text"></textarea>');

// Drawing keyboard  
function init(Lang) {
    document.body.insertAdjacentHTML('beforeend', '<div id="keyboard"></div>');
	let out = '';   
	for (let i = 0; i < Lang.length; i++) {
        
        if (i == 14 || i == 29 || i == 42 || i == 54) {
            out += '<div class="clearfix"></div>';
        }

        switch(Lang[i]) {
            case 13:
                out += `<div class="k-key enter" data="${Lang[i]}">ENTER</div>`;
                break;
            
            case 32:
                out += `<div class="k-key space" data="${Lang[i]}">SPACE</div>`;
                break;

            case 'shiftL': 
                out += `<div class="k-key shift">shift</div>`;
                break;
            
            case 'shiftR': 
                out += `<div class="k-key shift">shift</div>`;
                break;    
            
            case 'tab': 
                out += `<div class="k-key tab">tab</div>`;
                break;
                
            case 'capslock': 
                out += `<div class="k-key capslock">capslock</div>`;
                break;    
            
            case 'ctrlL': 
                out += `<div class="k-key ctrl">ctrl</div>`;
                break;    

            case 'ctrlR': 
                out += `<div class="k-key ctrl">ctrl</div>`;
                break;    
            
            case 'altL': 
                out += `<div class="k-key alt">alt</div>`;
                break;
            
            case 'altR': 
                out += `<div class="k-key alt">alt</div>`;
                break;    

            case 'backspace': 
                out += `<div class="k-key backspace">backspace</div>`;
                break;    
            
            case 'del': 
                out += `<div class="k-key del">del</div>`;
                break;

            default:
                out += `<div class="k-key" data="${Lang[i]}">${String.fromCharCode(Lang[i])}</div>`; 
                break;
        } 
	}
	document.querySelector('#keyboard').innerHTML = out;
}

init(xLang);
inputScreen();


// Language change
const keys = [];
document.addEventListener("keydown",function(event){
    if (keys.indexOf(event.key)<0){
        keys.push(event.key);
    }
    if ((keys[0] === "Control" && keys[1] === "Alt") || (keys[0] === "Alt" && keys[1] === "Control")) {
        switch(xLang) {
            case engLower:
                xLang = rusLower;
                break; 
            case engUpper:
                xLang = rusUpper; 
                break;
            case rusLower:
                xLang = engLower;
                break; 
            case rusUpper:
                xLang = engUpper;
                break;
        }
        let divKeyboard = document.querySelector('#keyboard');
        divKeyboard.innerHTML = "";
        init(xLang);
        inputScreen();
    }
});

document.addEventListener("keyup",function(event){
    keys.splice(keys.indexOf(event.key),1);
});

// Event CapsLock
addEventListener("keydown", capsEvent);

function capsEvent(event) {
    if (event.key == "CapsLock") {
        switch(xLang) {
            case engLower:
                xLang = engUpper;
                break; 
            case engUpper:
                xLang = engLower; 
                break;
            case rusLower:
                xLang = rusUpper;
                break; 
            case rusUpper:
                xLang = rusLower;
                break;
        }
        let divKeyboard = document.querySelector('#keyboard');
        divKeyboard.innerHTML = "";
        init(xLang);
        inputScreen();
    }
}

// Input from keyboard 
document.onkeypress = function (event) {
    document.querySelector(`#keyboard .k-key[data = "${event.keyCode}"]`).classList.add('active');
    let input = document.querySelector('#inp');
    input.value += String.fromCharCode(event.keyCode);
}

document.onkeyup = function () {
    document.querySelectorAll('#keyboard .k-key').forEach(function (element) {
        element.classList.remove('active');
    });
}

// Input from screen
function inputScreen() {
    document.querySelectorAll('#keyboard .k-key').forEach(function(element){
        element.onmousedown  = function(){
        let code = this.getAttribute('data');
        this.classList.add('active');
        let input = document.querySelector('#inp');
        input.value += String.fromCharCode(code);
        }
        element.onmouseup = function() {
            element.classList.remove('active');
        }
    });
}


