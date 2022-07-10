// /***
//  * cho canvas thành 2d
//  * định nghĩa 1 ô có blocksize là bao nhiu
//  * Định nghĩa ra con rắn  bao gồm: vị trí ban đầu của con rắn khi game mới băt đầu, hướng đi của Snake khi game start,1 array chứa vị trí của snake trong tương lai,độ dài snake
//  * định nghĩa ra một biến chứa giá trị bằng 0 để điều chỉnh tốc độ của con rắn
//  * định nghĩa ra vị trí quả táo lúc start game
//  * hàm lấy số ngẫu nhiên để quả táo xuất hiện ngẫu nhiên
//  * hàm loop animation
//  * chỉnh tốc độ rắn
//  * mỗi lần chạy lại hàm rắn sẽ cộng thêm 1 ô
//  * xử lý khi snake đụng tường
//  * xử lí thêm các ô khi con rắn chạy
//  * vẽ quả táo
//  * vẽ con rắn
//  * xữ lý khi  snake eat apple
//  * check va chạm khi rắn cắn vào đuôi mình
//  * xử lý sự kiện nhấn phím mũi tên điều khiển rắn
//  */

const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d');

let blocksize = 16;

const snake = {
    x: 160,
    y: 160,
    dx: 16,
    dy: 0,
    cell: [],
    maxcell: 4
}

var count = 0;

const apple = {
    x: 320,
    y: 320
}

function randomApple(min, max) {
    return Math.floor(Math.random() * (max - min))
}


function start() {
    requestAnimationFrame(start)

    if (++count < 4) {
        return;
    }
    count = 0;

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    snake.x += snake.dx
    snake.y += snake.dy

    if (snake.x < 0) {
        snake.x = canvas.width - blocksize
    } else if (snake.x >= canvas.width) {
        snake.x = 0
    } else if (snake.y >= canvas.height) {
        snake.y = 0
    } else if (snake.y < 0) {
        snake.y = canvas.height
    }

    snake.cell.unshift({ x: snake.x, y: snake.y })

    if (snake.cell.length > snake.maxcell) {
        snake.cell.pop()
    }

    ctx.fillStyle = 'red';
    ctx.fillRect(apple.x, apple.y, blocksize - 1, blocksize - 1)

    snake.cell.forEach((item, index) => {
        ctx.fillStyle = 'black'
        ctx.fillRect(item.x, item.y, blocksize - 1, blocksize - 1)

        if (item.x === apple.x && item.y === apple.y) {
            snake.maxcell++

            apple.x = randomApple(0, 25) * blocksize
            apple.y = randomApple(0, 25) * blocksize
        }

        for (let a = index + 1; a < snake.cell.length; a++) {
            if (item.x === snake.cell[a].x && item.y === snake.cell[a].y) {
                snake.x = 160
                snake.y = 160
                snake.dx = 16
                snake.dy = 0
                snake.cell = []
                snake.maxcell = 4
            }
        }
    })

    document.onkeydown = function (e) {
        if (e.which === 37 && snake.dx === 0) {
            snake.dx = -blocksize
            snake.dy = 0
        } else if (e.which === 38 && snake.dy === 0) {
            snake.dy = -blocksize
            snake.dx = 0
        } else if (e.which === 39 && snake.dx === 0) {
            snake.dx = blocksize
            snake.dy = 0
        } else if (e.which === 40 && snake.dy === 0) {
            snake.dy = blocksize
            snake.dx = 0
        }
    }

}
requestAnimationFrame(start)
