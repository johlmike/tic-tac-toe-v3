/* jshint esversion:6 */

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

        $(".boxes").empty();
        for( let i = 7 ; i > 0 ; i -= 3 ){
            $(".boxes").append('<li class="box" id="b_' + i + '"></li>');
            $(".boxes").append('<li class="box" id="b_' + (i+1) + '"></li>');
            $(".boxes").append('<li class="box" id="b_' + (i+2) + '"></li>');
        }
    };

    exports.showFinish = function(winner) {
        var $finish = $(finishHtml);
        $('#board').remove();
        $('body').prepend($finish);
        $('#restartBtn').on('click', function() {
            exports.showBoard();
        });
    };

    class block {
        constructor(status = 0){ // 0 = nothing
            this.status = status;
        }
        setO() {
            this.status = 1; // 1 = o
        }
        setX() {
            this.status = -1; // -1 = x
        }
    }

    class playBoard {
        constructor(oName, xName = "NPC"){
            this.oName = oName;
            this.xName = xName;
            this.gameStatus = "not_finish";
            this.turn = "o";

            //Same as keyboard's number pad
            this.b_1 = new block();
            this.b_2 = new block();
            this.b_3 = new block();
            this.b_4 = new block();
            this.b_5 = new block();
            this.b_6 = new block();
            this.b_7 = new block();
            this.b_8 = new block();
            this.b_9 = new block();
        }
        checkGameStatus(){
            var blockArray = [this.b_1, this.b_2, this.b_3, this.b_4, this.b_5, this.b_6, this.b_7, this.b_8, this.b_9];
            //check horizontal
            for( let i = 0 ; i < 7 ; i += 3 ){
                if( (blockArray[i].status + blockArray[i+1].status + blockArray[i+2].status) === 3 ){
                    //o win the game
                    this.gameStatus = "o_win";
                    return console.log("o win");
                } else if ( (blockArray[i].status + blockArray[i+1].status + blockArray[i+2].status) === -3 ){
                    //x win the game
                    this.gameStatus = "x_win";
                    return console.log("x win");
                }
            }
            //check vertical
            for( let i = 0 ; i < 3 ; i += 1 ){
                if( (blockArray[i].status + blockArray[i+3].status + blockArray[i+6].status) === 3 ){
                    //o win the game
                    this.gameStatus = "o_win";
                    return console.log("o win");
                } else if ( (blockArray[i].status + blockArray[i+3].status + blockArray[i+6].status) === -3 ){
                    //x win the game
                    this.gameStatus = "x_win";
                    return console.log("x win");
                }
            }
            //check oblique
            if( (blockArray[0].status + blockArray[4].status + blockArray[8].status) === 3 ){
                //o win the game
                this.gameStatus = "o_win";
                return console.log("o win");
            } else if ( (blockArray[0].status + blockArray[4].status + blockArray[8].status) === -3 ){
                //x win the game
                this.gameStatus = "x_win";
                return console.log("x win");
            }

            if ( (blockArray[2].status + blockArray[4].status + blockArray[6].status) === 3 ){
                //x win the game
                this.gameStatus = "o_win";
                return console.log("o win");
            } else if ( (blockArray[2].status + blockArray[4].status + blockArray[6].status) === -3 ){
                //x win the game
                this.gameStatus = "x_win";
                return console.log("x win");
            }
            //check if all block are not 0
            for( let i = 0 ; i < 9 ; i++){
                var check = 0;
                if( blockArray[i].status === 0){
                    this.gameStatus = "not_finish";
                    return console.log("not finish");
                } else {
                    check++;
                }
                if( check === 9 ){
                    this.gameStatus = "draw";
                    return console.log("draw");
                }
            }
        }
    }
    exports.board = new playBoard("player1", "player2");

    return exports;
})();
