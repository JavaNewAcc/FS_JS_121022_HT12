window.onload = () => {
    let canvasExist = false;
    let canvas;
    let i = 0;

    let openResBtn = document.querySelector('.openResBtn');
    openResBtn.classList.add('mb-3');

    openResBtn.addEventListener('click', function () {

        if (!canvasExist) {
            let marginHeight = parseInt(window.getComputedStyle(openResBtn).marginTop) + parseInt(window.getComputedStyle(openResBtn).marginBottom) * 2 + openResBtn.scrollHeight;

            canvasAdd(window.innerHeight - marginHeight, window.innerWidth * 0.75);
            drawCircle();

            canvasExist = true;
            openResBtn.innerHTML = 'Close canvas'
        }

        else {
            canvasDel();
            canvasExist = false;
        }
    })

    function canvasAdd(height, width) {
        canvas = document.createElement('canvas');
        canvas.id = 'canvas';
        canvas.height = height;
        canvas.width = width;
        canvas.style.backgroundColor = 'lightblue';
        canvas.classList.add('m-auto');
        openResBtn.after(canvas);
        openResBtn.scrollIntoView(true);
    }

    function canvasDel() {
        canvas.remove(canvas);
        openResBtn.innerHTML = 'Open canvas'
    }

    function drawCircle() {
        let ctx = canvas.getContext('2d');
        let radius = 0;

        ctx.beginPath();
        if (canvas.width < canvas.height) {
            radius = canvas.width / 2 * 0.9;
        }
        else { radius = canvas.height / 2 * 0.9; }

        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, 360);
        ctx.strokeStyle = 'red';
        ctx.strokeWidth = '5px';
        ctx.stroke()

        ctx.font = '700 20px Arial';
        ctx.textAlign = 'center';
        ctx.fillText("Hello!", canvas.width / 2, canvas.height / 2);

    }
}
