window.onload = () => {
    let width = 0;
    let height = 0;
    let div = 0;
    let form = 0;
    let inputHeight = 0;
    let inputWidth = 0;
    let inputCB = 0;
    let btn = 0;
    let svgDivExist = false;
    let svgExist = false;
    let svg = 0;

    let resButton = document.querySelector('.openResBtn');

    resButton.addEventListener('click', function () {
        fieldCreator();
    })

    function fieldCreator() {
        if (!svgDivExist) {
            svgDivExist = true;
            div = document.createElement('div');
            div.classList.add('newDiv', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'p-3', 'm-3', 'rounded');
            div.scrollIntoView();
            resButton.after(div);
            form = document.createElement('form');
            div.appendChild(form);
            animate(div);

            inputHeight = document.createElement('input');
            inputHeight.type = 'text';
            inputHeight.id = 'inputHeight';
            inputHeight.placeholder = 'Введіть висоту фігури';
            inputHeight.classList.add('form-control');
            form.appendChild(inputHeight);

            inputWidth = document.createElement('input');
            inputWidth.type = 'text';
            inputWidth.id = 'inputWidth';
            inputWidth.placeholder = 'Введіть ширину фігури';
            inputWidth.classList.add('form-control', 'mt-3', 'mb-3');
            form.appendChild(inputWidth);

            let labelCB = document.createElement('label');
            labelCB.classList.add('form-check-label', 'd-inline-flex');
            labelCB.for = 'inputCB';
            labelCB.innerText = 'Бажаєте отримати еліпс?';
            form.appendChild(labelCB);

            inputCB = document.createElement('input');
            inputCB.type = 'checkbox';
            inputCB.id = 'inputCB';
            inputCB.classList.add('form-check-input', 'ms-3', 'me-auto', 'd-inline-flex');
            form.appendChild(inputCB);

            btn = document.createElement('button');
            btn.classList.add('btn', 'btn-secondary', 'd-block', 'm-auto', 'mt-3');
            btn.innerText = 'Отримати фігуру';
            btn.disabled = true;
            form.appendChild(btn);

            inputHeight.addEventListener('focusout', function () {
                heightNotEmpty();
                fillChecker();
            })

            inputWidth.addEventListener('focusout', function () {
                widthNotEmpty();
                fillChecker();
            })

            btn.addEventListener('click', function () {
                event.preventDefault();
                if (!svgExist) {
                    figCreator(inputHeight.value, inputWidth.value, inputCB.checked);
                    svgExist = true;
                    btn.innerText = 'Видалити фігуру';
                }
                else {
                    svg.remove(svg);
                    svgExist = false;
                    btn.innerText = 'Отримати фігуру';
                }
            })
        }
        else {
            div.remove(div);
            svgDivExist = false;
            svgExist = false;
        }
    }

    function heightNotEmpty() {
        if (svgDivExist) {
            if ((/^\d+\.?\d+$/g).test(inputHeight.value)) {
                inputHeight.style.borderColor = '';
                return true;
            }
            else {
                inputHeight.style.borderColor = 'red';
                return false;
            }
        }
    }

    function widthNotEmpty() {
        if (svgDivExist) {
            if ((/^\d*\.?\d+$/g).test(inputWidth.value)) {
                inputWidth.style.borderColor = '';
                return true;
            }
            else {
                inputWidth.style.borderColor = 'red';
                return false;
            }
        }
    }

    function fillChecker() {
        if (heightNotEmpty() && widthNotEmpty()) {
            btn.disabled = false;
            btn.classList.add('btn-success');
            btn.classList.remove('btn-secondary');
            return true;
        }
        else {
            btn.disabled = true;
            btn.classList.remove('btn-success');
            btn.classList.add('btn-secondary')
            return false;
        }
    }

    function figCreator(figHeight, figWidth, CBstatus) {
        if (!svgExist) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('height', figHeight);
            svg.setAttribute('width', figWidth);
            div.appendChild(svg);
            svg.classList.add('m-3');
            animate(svg);

            svg.addEventListener('click', function () {
                svg.remove(svg);
                svgExist = false;
                btn.innerText = 'Отримати фігуру';
            })

            if (CBstatus == false) {
                let rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
                rect.setAttribute('style', 'fill: yellow; stroke: blue; stroke-width: 5');
                rect.setAttribute('height', figHeight);
                rect.setAttribute('width', figWidth);
                svg.appendChild(rect);
            }
            else {
                let ellipse = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
                ellipse.setAttribute('style', 'fill: yellow; stroke: blue; stroke-width: 5');
                ellipse.setAttribute('cx', `${figWidth / 2}`);
                ellipse.setAttribute('cy', `${figHeight / 2}`);
                ellipse.setAttribute('rx', `${figWidth / 2 - 2.5}`);
                ellipse.setAttribute('ry', `${figHeight / 2 - 2.5}`);
                svg.appendChild(ellipse);
            }
        }
    }

    function animate(element) {
        element.animate([{ opacity: 0 },
        { opacity: 1 }], 300)
    }
}