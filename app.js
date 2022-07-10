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



var canvas = document.getElementById('game');

var context = canvas.getContext('2d');


// thông tin con rắn
var grid = 16;
// khởi tạo đối tượng rắn là 1 ô vuông

var snake = {

    x: 160, //vị trí của snake theo hướng x,y

    y: 160,

    dx: 16, //hướng di chuyển theo phương x hoặc y,ở đây khi start game 
    //snake sẽ di chuyển theo x direction với value = 16

    dy: 0,

    cells: [],

    maxCells: 4

};

var count = 0;

// vị trí quả táo 
var apple = {

    x: 320,

    y: 320

};

// hàm lấy vị trí random của quả táo
function getRandomInt(min, max) {

    return Math.floor(Math.random() * (max - min)) + min;

}


// game loop

function loop() {
    //hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong

    requestAnimationFrame(loop);


    // slow game loop to 15 fps instead of 60 - 60/15 = 4

    if (++count < 15) {

        return;

    }


    count = 0;

    context.clearRect(0, 0, canvas.width, canvas.height);


    snake.x += snake.dx; // mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị

    snake.y += snake.dy;


    // khi snake đụng tường sẽ chạy lại từ edge đối diện

    if (snake.x < 0) {

        snake.x = canvas.width - grid;

    }

    else if (snake.x >= canvas.width) {

        snake.x = 0;

    }


    if (snake.y < 0) {

        snake.y = canvas.height - grid;

    }

    else if (snake.y >= canvas.height) {

        snake.y = 0;

    }


    // Phương thức unshift sẽ thêm một hoặc nhiều phần tử vào đầu mảng

    snake.cells.unshift({ x: snake.x, y: snake.y });



    // thêm 1 ô vuông phía trc thì phải remove 1 cái phía sau để snake move dc.

    if (snake.cells.length > snake.maxCells) {

        snake.cells.pop();

    }


    // draw apple

    context.fillStyle = 'red';

    context.fillRect(apple.x, apple.y, grid - 1, grid - 1);


    // draw snake

    context.fillStyle = 'green';

    snake.cells.forEach(function (cell, index) {

        context.fillRect(cell.x, cell.y, grid - 1, grid - 1);


        // snake ate apple

        if (cell.x === apple.x && cell.y === apple.y) {

            snake.maxCells++;


            apple.x = getRandomInt(0, 25) * grid;

            apple.y = getRandomInt(0, 25) * grid;

        }


        // check va chạm khi rắn đụng đuôi

        for (var i = index + 1; i < snake.cells.length; i++) {



            // va chạm thì reset game

            if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {

                snake.x = 160;

                snake.y = 160;

                snake.cells = [];

                snake.maxCells = 4;

                snake.dx = grid;

                snake.dy = 0;


                apple.x = getRandomInt(0, 25) * grid;

                apple.y = getRandomInt(0, 25) * grid;

            }

        }

    });

}

//bắt sự kiện bàn phím ấn xuống

document.addEventListener('keydown', function (e) {
    console.log(e.keyCode);

    // lọc sự kiện keydown để rắn không di ngược lại

    if (e.which === 37 && snake.dx === 0) {

        snake.dx = -grid;

        snake.dy = 0;

    }

    else if (e.which === 38 && snake.dy === 0) {

        snake.dy = -grid;

        snake.dx = 0;

    }

    else if (e.which === 39 && snake.dx === 0) {

        snake.dx = grid;

        snake.dy = 0;

    }

    else if (e.which === 40 && snake.dy === 0) {

        snake.dy = grid;

        snake.dx = 0;

    }

});


requestAnimationFrame(loop);

