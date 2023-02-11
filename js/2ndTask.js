window.onload = () => {
    let div = 0;
    let form = 0;
    let inputQtty = 0;
    let inputRadius = 0;
    let btn = 0;
    let formDivExist = false;
    let svgExist = false;
    let svg = 0;
    let i = 0;

    let resButton = document.querySelector('.openResBtn');

    resButton.addEventListener('click', function () {
        fieldCreator();
    })

    function fieldCreator() {
        if (!formDivExist) {
            formDivExist = true;
            div = document.createElement('div');
            div.classList.add('newDiv', 'd-flex', 'flex-column', 'justify-content-center', 'align-items-center', 'p-3', 'm-3', 'rounded');
            resButton.after(div);
            form = document.createElement('form');
            form.classList.add('col-12', 'col-sm-8', 'col-md-5', 'col-lg-4')
            div.appendChild(form);
            div.setAttribute('height', '85vh');
            div.setAttribute('width', '85vw');
            div.setAttribute('backgroundColor', 'red');
            animate(div, 300);

            inputQtty = document.createElement('input');
            inputQtty.type = 'text';
            inputQtty.id = 'inputQtty';
            inputQtty.placeholder = 'Введіть кількість кругляшків';
            inputQtty.classList.add('form-control');
            form.appendChild(inputQtty);

            inputRadius = document.createElement('input');
            inputRadius.type = 'text';
            inputRadius.id = 'inputRadius';
            inputRadius.placeholder = 'Введіть радіус кругляшків';
            inputRadius.classList.add('form-control', 'mt-3', 'mb-3');
            form.appendChild(inputRadius);

            btn = document.createElement('button');
            btn.classList.add('btn', 'btn-secondary', 'd-block', 'm-auto', 'mt-3', 'mb-3');
            btn.innerText = 'Отримати фігури';
            btn.disabled = true;
            form.appendChild(btn);

            inputQtty.addEventListener('focusout', function () {
                qttyNotEmpty();
                fillChecker();
            })

            inputRadius.addEventListener('focusout', function () {
                radiusNotEmpty();
                fillChecker();
            })

            btn.addEventListener('click', function () {
                event.preventDefault();
                svgBGcreator();
                if (svgExist) {
                    for (i = 0; i < parseInt(inputQtty.value); i++) {
                        figCreator(parseInt(inputRadius.value));
                    }
                    svgExist = true;
                }
            })
            div.scrollIntoView(false);
        }
        else {
            div.remove(div);
            formDivExist = false;
            svgExist = false;
        }
    }

    function qttyNotEmpty() {
        if (formDivExist) {
            if ((/^\d+$/).test(inputQtty.value)) {
                inputQtty.style.borderColor = '';
                return true;
            }
            else if (inputQtty.value == "") {
                inputQtty.style.borderColor = '';
                return false;
            }
            else {
                inputQtty.style.borderColor = 'red';
                return false;
            }
        }
    }

    function radiusNotEmpty() {
        if (formDivExist) {
            if ((/^\d*\.?\d+$/).test(inputRadius.value)) {
                inputRadius.style.borderColor = '';
                return true;
            }
            else if (inputRadius.value == "") {
                inputRadius.style.borderColor = '';
                return false;
            }
            else {
                inputRadius.style.borderColor = 'red';
                return false;
            }
        }
    }

    function fillChecker() {
        if (qttyNotEmpty() && radiusNotEmpty()) {
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

    function svgBGcreator() {
        if (!svgExist) {
            svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('height', `85vh`);
            svg.setAttribute('width', `85vw`);
            svg.style.backgroundColor = 'lightblue';
            div.appendChild(svg);
            animate(svg, 1000);
            div.scrollIntoView(false)
            svgExist = true;
        }
    }

    function figCreator(radius) {
        if (svgExist) {
            let circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('style', 'fill: yellow; stroke: blue; stroke-width: 3');
            circle.setAttribute('cx', `${svg.clientWidth * Math.random()}`);
            circle.setAttribute('cy', `${svg.clientHeight * Math.random()}`);
            circle.setAttribute('r', radius);
            circle.setAttribute('style', 'fill: yellow; stroke: blue; stroke-width: 5');
            circle.addEventListener('click', function () { circle.remove(circle); })
            setTimeout(function () { animate(svg.appendChild(circle), 500) }, (1000 * i / inputQtty.value));
        }
    }

    function animate(element, interval) {
        element.animate([{ opacity: 0 },
        { opacity: 1 }], interval)
    }
}