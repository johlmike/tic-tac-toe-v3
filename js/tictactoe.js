/* jshint esversion:6 */

const ticTacToe = (function() {
    'use strict';
    const exports = {};

    const startHtml = '<div class="screen screen-start" id="start"><header><h1>Tic Tac Toe</h1><a href="#" class="button" id="startBtn">Start game</a></header></div>';
    const boardDivHtml = '<div class="board" id="board"></div>';
    const boardHtml = $('#board').html();
    const finishHtml = '<div class="screen screen-win" id="finish"><header><h1>Tic Tac Toe</h1><p class="message">Winner!</p><a href="#" class="button" id="restartBtn">New game</a></header></div>';
    //Display Start Page
    exports.showStart = function(boardObj) {
        const $start = $(startHtml);
        //remove the original element
        $('#board').remove();
        // prepend the start page element
        $('body').prepend($start);
        //make start button work
        $('#startBtn').on('click', function() {
            exports.showBoard(boardObj);
        });
    };

    //Display Board Page
    exports.showBoard = function(boardObj) {
        const $boardDiv = $(boardDivHtml);
        const $board = $(boardHtml);
        //Ask Player's Name
        const name_1 = prompt('Player O, What is your name?');
        const name_2 = prompt('Player X, What is your name? (If you are alone, type "CPU" to play with AI.)');
        if (name_1 !== null && name_1 !== "")
            boardObj.oName = name_1;
        if (name_2 !== null && name_2 !== "")
            boardObj.xName = name_2;
        //Append the board to the page
        $boardDiv.append($board);
        $('#start').remove();
        $('#finish').remove();
        $('body').prepend($boardDiv);
        //Put in the Player's name
        $("#player1_name").text(boardObj.oName);
        $("#player2_name").text(boardObj.xName);
        //empty the original block
        $(".boxes").empty();
        //Put in the blocks whick have been identify
        for (let i = 7; i > 0; i -= 3) {
            $(".boxes").append(`<li class="box" id="b_${i}"></li>`);
            $(".boxes").append(`<li class="box" id="b_${i+1}"></li>`);
            $(".boxes").append(`<li class="box" id="b_${i+2}"></li>`);
        }
        //Acive the player 1
        $('#player1').addClass("players-turn active");
        //Let block change its style when it has been hovered
        hoverToO();
        //Change the block status when it has been click
        //Block will be set to O
        clickToO(boardObj);
    };
    //Display GameOver Page
    exports.showFinish = function(boardObj) {
        const $finish = $(finishHtml);
        const winner = boardObj.gameStatus;
        $('#board').remove();
        $('body').prepend($finish);
        //Show the correct message according to who is the winner
        if (winner === "o_win") {
            $finish.addClass('screen-win-one');
            $(".message").text(`${boardObj.oName} is Winner!`);
        } else if (winner === "x_win") {
            $finish.addClass('screen-win-two');
            $(".message").text(`${boardObj.xName} is Winner!`);
        } else if (winner === "draw") {
            $finish.addClass('screen-win-tie');
            $(".message").text("It's a Draw!");
        }
        //Click the button to play again
        $('#restartBtn').on('click', function() {
            exports.showBoard(boardObj);
        });
    };

    //Change Player
    exports.changePlayer = function(boardObj) {
        if (boardObj.turn === "o") {
            //Change turn to x
            boardObj.turn = "x";
            //Delete player 1 's class
            $('#player1').removeClass('players-turn active');
            //Change to player 2
            $('#player2').addClass("players-turn active");
            //Let block hover can change the style to X
            hoverToX();
            //Change the block status when it has been click
            //Block will be set to X
            clickToX(boardObj);
        } else {
            //Change turn to o
            boardObj.turn = "o";
            //Delete player 2 's class
            $('#player2').removeClass('players-turn active');
            //Change to player 1
            $('#player1').addClass("players-turn active");
            //Let block hover can change the style to O
            hoverToO();
            //Change the block status when it has been click
            //Block will be set to O
            clickToO(boardObj);
        }
    };
    function hoverToO() {
        $('.box').hover(function() {
            if ($(this).hasClass('box-filled-1') === false && $(this).hasClass('box-filled-2') === false) {
                $(this).css('background-color', '#FFA000');
                $(this).css('background-image', 'url(img/o.svg)');
            }
        }, function() {
            if ($(this).hasClass('box-filled-1') === false && $(this).hasClass('box-filled-2') === false) {
                $(this).css('background-color', '#EFEFEF');
                $(this).css('background-image', '');
            }
        });
    }

    function hoverToX() {
        $('.box').hover(function() {
            if ($(this).hasClass('box-filled-1') === false && $(this).hasClass('box-filled-2') === false) {
                $(this).css('background-color', '#3688C3');
                $(this).css('background-image', 'url(img/x.svg)');
            }
        }, function() {
            if ($(this).hasClass('box-filled-1') === false && $(this).hasClass('box-filled-2') === false) {
                $(this).css('background-color', '#EFEFEF');
                $(this).css('background-image', '');
            }
        });
    }

    function clickToO(boardObj) {
        $('.box').off('click');
        $('.box').click(function(event) {
            if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
                //Get block's id
                const blockName = $(this).attr('id');
                //Set this block to O
                boardObj[blockName].setO();
                $(this).addClass('box-filled-1');
                //Change Player
                exports.changePlayer(boardObj);
                //Check Game Status
                boardObj.checkGameStatus();
            }
        });
    }

    function clickToX(boardObj) {
        $('.box').off('click');
        $('.box').click(function(event) {
            if (!$(this).hasClass('box-filled-1') && !$(this).hasClass('box-filled-2')) {
                //Get block's id
                const blockName = $(this).attr('id');
                //Set this block to X
                boardObj[blockName].setX();
                $(this).addClass('box-filled-2');
                //Change Player
                exports.changePlayer(boardObj);
                //Check Game Status
                boardObj.checkGameStatus();
            }
        });
    }


    //The Block Object
    class block {
        constructor(status = 0) { // 0 = nothing
            this.status = status;
        }
        setO() {
            this.status = 1; // 1 = o
        }
        setX() {
            this.status = -1; // -1 = x
        }
    }
    //An Object store all info about Game
    exports.playBoard = class playBoard {
        constructor() {
            this.oName = "Player1";
            this.xName = "Player2";
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
        checkGameStatus() {
                const blockArray = [this.b_1, this.b_2, this.b_3, this.b_4, this.b_5, this.b_6, this.b_7, this.b_8, this.b_9];
                //check horizontal
                for (let i = 0; i < 7; i += 3) {
                    if ((blockArray[i].status + blockArray[i + 1].status + blockArray[i + 2].status) === 3) {
                        //o win the game
                        this.gameStatus = "o_win";
                        exports.showFinish(this);
                        return this.reset();
                    } else if ((blockArray[i].status + blockArray[i + 1].status + blockArray[i + 2].status) === -3) {
                        //x win the game
                        this.gameStatus = "x_win";
                        exports.showFinish(this);
                        return this.reset();
                    }
                }
                //check vertical
                for (let i = 0; i < 3; i += 1) {
                    if ((blockArray[i].status + blockArray[i + 3].status + blockArray[i + 6].status) === 3) {
                        //o win the game
                        this.gameStatus = "o_win";
                        exports.showFinish(this);
                        return this.reset();
                    } else if ((blockArray[i].status + blockArray[i + 3].status + blockArray[i + 6].status) === -3) {
                        //x win the game
                        this.gameStatus = "x_win";
                        exports.showFinish(this);
                        return this.reset();
                    }
                }
                //check oblique
                if ((blockArray[0].status + blockArray[4].status + blockArray[8].status) === 3) {
                    //o win the game
                    this.gameStatus = "o_win";
                    exports.showFinish(this);
                    return this.reset();
                } else if ((blockArray[0].status + blockArray[4].status + blockArray[8].status) === -3) {
                    //x win the game
                    this.gameStatus = "x_win";
                    exports.showFinish(this);
                    return this.reset();
                }

                if ((blockArray[2].status + blockArray[4].status + blockArray[6].status) === 3) {
                    //x win the game
                    this.gameStatus = "o_win";
                    exports.showFinish(this);
                    return this.reset();
                } else if ((blockArray[2].status + blockArray[4].status + blockArray[6].status) === -3) {
                    //x win the game
                    this.gameStatus = "x_win";
                    exports.showFinish(this);
                    return this.reset();
                }
                //check if all block are not 0
                let checkDraw = 0;
                for (let i = 0; i < 9; i++) {
                    if (blockArray[i].status !== 0) {
                        checkDraw++;
                    }
                }
                if (checkDraw === 9) {
                    this.gameStatus = "draw";
                    exports.showFinish(this);
                    return this.reset();
                }
            }
            //Reset Board Object
        reset() {
            this.oName = "Player1";
            this.xName = "Player2";
            this.gameStatus = "not_finish";
            this.turn = "o";
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
    };

    return exports;
})();
