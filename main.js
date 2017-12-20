const container = document.querySelector(".container");

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

let initialState = (width, height) => {
    let arr = [];
    for(let i = 0; i < 4; i++){
        let row = [];
        for(let j = 0; j < 4; j++){
        }
        arr.push(row)
    }
    return arr;
}


let shapes = {
    t: () => {
        let arr = initialState();
        arr[0][1] = true;
        arr[1][0] = true;
        arr[1][1] = true;
        arr[1][2] = true;
        return arr;
    },
    l: () => {
        let arr = initialState();
        arr[0][0] = true;
        arr[1][0] = true;
        arr[2][0] = true;
        arr[2][1] = true;
        return arr;
    },
    z: () => {
        let arr = initialState();
        arr[0][0] = true;
        arr[0][1] = true;
        arr[1][1] = true;
        arr[1][2] = true;
        return arr;
    },
    square: () => {
        let arr = initialState();
        arr[0][0] = true;
        arr[0][1] = true;
        arr[1][0] = true;
        arr[1][1] = true;
        return arr;
    },
    line: () => {
        let arr = initialState();
        arr[0][0] = true;
        arr[0][1] = true;
        arr[0][2] = true;
        arr[0][3] = true;
        return arr;
    }
};


let mainState = initialState();
let render = (container) => {
    let elements = '';

    for(let i = 0; i < 4; i++){
        for(let j = 0; j < 4; j++){
            let element = mainState[i][j];
            if(element){
                elements += `<div class="active"></div>`;
            } else {
                elements += `<div></div>`;
            }
        }
    }

    let template = `
		<div class="wrapper">
			${elements}
		</div>
	`;
    if(1){ // Проверить является ли контейнер ДОМ элементом
        container.innerHTML = template;
    }
};


let renderRandomShape = () => {
    let shapesKeys = Object.keys(shapes);
    let random = getRandomInt(0, shapesKeys.length);
    let randomRotate = getRandomInt(0, 4);

    let rotatedState = shapes[shapesKeys[random]]();

    for(let i = 0; i < randomRotate; i++){
        rotatedState = rotateShape(rotatedState);
    };

    mainState = rotatedState;
    render(container);
};

let rotateShape = (state) => {
    let rotatedState = initialState();

    // Check length of field
    for(let i = 0; i < state.length; i++){
        state[i].reverse();
        for(let j = 0; j < state[i].length; j++){
            rotatedState[j][i] = state[i][j];
        }
    }
    return rotatedState;
}

// setInterval(renderRandomShape, 200);

renderRandomShape();


// Создаем кнопки которые будут переворачивать

let rotateLeft = () => {
    mainState = rotateShape(mainState);
    render(container);
}

document.querySelector("#random").addEventListener("click", renderRandomShape);
document.querySelector("#rotate").addEventListener("click", rotateLeft);