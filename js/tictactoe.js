var ticTacToe = (function() {
    var exports = {};

    var startHtml = '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button" id="startBtn">Start game</a></header></div>';
    var boardDivHtml = '<div class="board" id="board"></div>';
    var boardHtml = $('#board').html();
    //筆記：在finish div，根據贏家，加上class，詳細看CSS檔
    var finishHtml = '<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner!</p><a href="#" class="button" id="restartBtn">New game</a></header></div>';

    //Display Start Page
    exports.showStart = function() {
        var $start = $(startHtml);
        //remove the original element
        $('#board').remove();
        //prepend the start page element
        $('body').prepend($start);
        //make start button work
        $('#startBtn').on('click', function() {
            exports.showBoard();
        });
    };

    //Display Board Page
    exports.showBoard = function() {
        var $boardDiv = $(boardDivHtml);
        var $board = $(boardHtml);
        $boardDiv.append($board);
        $('#start').remove();
        $('#finish').remove();
        $('body').prepend($boardDiv);


        //純粹測試用，請記得刪除
        setTimeout(exports.showFinish, 1000);
    };

    exports.showFinish = function(winner) {
        var $finish = $(finishHtml);
        $('#board').remove();
        $('body').prepend($finish);
        $('#restartBtn').on('click', function() {
            exports.showBoard();
        });
    };


    return exports;

})();
