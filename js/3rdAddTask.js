window.onload = () => {
    let resOpenBtn = document.querySelector('.openResBtn');

    let canvas;
    let canvasExist = false;
    let header;
    let table;
    let tableExist = false;
    let BTNdiv;
    let error = false;

    resOpenBtn.addEventListener('click', function () {
        if (!tableExist) {
            resOpenBtn.innerText = "Close result";
            addTable();
        }
        else {
            delTable();
            resOpenBtn.innerText = "Result"
        }
    })

    function addTable() {
        tableExist = true;

        header = document.createElement('p');
        header.classList.add('text-center', 'fw-bold')
        header.innerText = 'Введіть % виконання плану по виробництву повітряних кульок за попередні 5 років';
        resOpenBtn.after(header);
        table = document.createElement('table');
        let thr = document.createElement('tr');
        for (let i = 0; i < 5; i++) {
            let th = document.createElement('th');
            th.classList.add('text-center');
            th.innerText = `${new Date().getFullYear() - 5 + i} рік`;
            thr.appendChild(th);
        }
        let thColor = document.createElement('th');
        thColor.innerText = 'Color';
        thColor.classList.add('text-center')
        thr.appendChild(thColor);

        table.appendChild(thr);
        header.after(table);
        let tbr = document.createElement('tr');
        tbr.id = parseInt(Math.random() * 100000);
        for (let i = 0; i < 5; i++) {
            let td = document.createElement('td');
            let TDinput = document.createElement('input');
            TDinput.classList.add('w-100');
            TDinput.addEventListener('focusout', function () { fillCheck(TDinput) });
            td.appendChild(TDinput);
            tbr.appendChild(td);
        }
        let tdColor = document.createElement('td');
        let inputColor = document.createElement('input');
        inputColor.type = 'color';
        tdColor.appendChild(inputColor);
        tbr.appendChild(tdColor);

        table.appendChild(tbr);

        BTNdiv = document.createElement('div');
        BTNdiv.classList.add('m-auto', 'd-flex');
        BTNdiv.id = 'BTNdiv';
        table.after(BTNdiv);

        let BTNdraw = document.createElement('button');
        BTNdraw.classList.add('btn', 'btn-success', 'pt-1', 'pb-1', 'm-1', 'd-inline-flex');
        BTNdraw.id = 'BTNdraw';
        BTNdraw.innerText = 'Draw';

        BTNdraw.addEventListener('click', function () {
            let [...elemArr] = document.querySelectorAll('input');
            for (let i = 0; i < elemArr.length - 1; i++) {
                fillCheck(elemArr[i]);
            }
            if (!canvasExist && !error) { addCanvas(); draw(elemArr) };
        })

        let BTNclear = document.createElement('button');
        BTNclear.id = tbr.id;
        BTNclear.addEventListener('click', function () {
            clearRow(document.querySelectorAll(`input`));
            if (canvasExist) { delCanvas() };
        })
        BTNclear.classList.add('btn', 'btn-danger', 'pt-1', 'pb-1', 'm-1', 'd-inline-flex');
        BTNclear.innerText = 'Clear'

        BTNdiv.appendChild(BTNdraw);
        BTNdiv.appendChild(BTNclear);
    }

    function delTable() {
        if (canvasExist) { delCanvas(); }
        tableExist = false;
        canvasExist = false;
        header.remove(header);
        table.remove(table);
        BTNdiv.remove(BTNdiv);
    }

    function clearRow(elemArr) {
        [...elemArr].forEach(element => {
            element.value = ''
        });
    }

    function addCanvas() {
        canvas = document.createElement('canvas');
        canvas.classList.add('m-auto');
        let marginHeight = parseInt(BTNdiv.scrollHeight) + parseInt(window.getComputedStyle(BTNdiv.parentElement).marginBottom);
        canvas.width = window.innerWidth * 0.8;
        canvas.height = window.innerHeight - marginHeight;
        BTNdiv.after(canvas);
        animate(canvas);
        canvas.style.backgroundColor = 'lightblue';
        BTNdiv.scrollIntoView(true);
        canvasExist = true;
    }

    function delCanvas() {
        canvasExist = false;
        canvas.remove(canvas);
    }

    function draw(dataArr) {
        if (canvasExist) {
            let stepW = canvas.width * 0.8 / 4;
            let dataArrVal = [];

            for (let i = 0; i < dataArr.length - 1; i++) {
                dataArrVal.push(parseInt(dataArr[i].value));
            }

            let stepH = canvas.height * 0.8 / (Math.max(...dataArrVal) - Math.min(...dataArrVal));

            let yCtx = canvas.getContext('2d');
            yCtx.beginPath();
            yCtx.moveTo(canvas.width - canvas.width * 0.9, canvas.height * 0.9);
            yCtx.lineTo(canvas.width - canvas.width * 0.9, canvas.height - canvas.height * 0.9);
            yCtx.lineTo(canvas.width - canvas.width * 0.9 - 5, canvas.height - canvas.height * 0.9 + 10);
            yCtx.lineTo(canvas.width - canvas.width * 0.9 + 5, canvas.height - canvas.height * 0.9 + 10);
            yCtx.lineTo(canvas.width - canvas.width * 0.9, canvas.height - canvas.height * 0.9);
            yCtx.stroke();

            let xCtx = canvas.getContext('2d');
            xCtx.beginPath();
            xCtx.moveTo(canvas.width - canvas.width * 0.9, canvas.height * 0.9);
            xCtx.lineTo(canvas.width * 0.9, canvas.height * 0.9)
            xCtx.lineTo(canvas.width * 0.9 - 10, canvas.height * 0.9 - 5);
            xCtx.lineTo(canvas.width * 0.9 - 10, canvas.height * 0.9 + 5);
            xCtx.lineTo(canvas.width * 0.9, canvas.height * 0.9);
            xCtx.stroke();

            let graphCtx = canvas.getContext('2d');
            graphCtx.beginPath();
            graphCtx.strokeStyle = dataArr[dataArr.length - 1].value;
            graphCtx.lineWidth = 3;

            let curX = canvas.width - canvas.width * 0.9;
            let curY = 0
            if (Math.min(...dataArrVal) != dataArrVal[0]) {
                curY = canvas.height * 0.9 - (dataArrVal[0] - Math.min(...dataArrVal)) * stepH;
            }
            else { curY = canvas.height * 0.9 }

            graphCtx.moveTo(curX, curY);

            for (i = 1; i < dataArrVal.length; i++) {
                curX += stepW;
                curY = curY - dataArrVal[i] * stepH + dataArrVal[i - 1] * stepH;
                graphCtx.lineTo(curX, curY);
            }
            graphCtx.stroke();
        }
    }

    function fillCheck(element) {
        if (element.value == '') {
            element.style.borderColor = 'red';
            error = true;
        }
        else {
            if (/^\d*\.?\d+$/.test(element.value)) {
                element.style.borderColor = '';
                error = false;
            }
            else {
                element.style.borderColor = 'red';
                error = true;
            }
        }
    }

    function animate(element) {
        element.animate([{ opacity: 0 },
        { opacity: 1 }], 500)
    }
}