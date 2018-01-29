import React from 'react';
import ReactDOM from 'react-dom';
import {
    Button
} from 'reactstrap';
export default function run_demo(root) {
    ReactDOM.render( <
        Demo / > , root);
}
var clock = 0;
class Demo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: deal(),
            demo: moves.One,
            tOne: null,
            score: 0
        };
    }
    move(tile) {
        if (!tile.show) {
            switch (this.state.demo) {
                case moves.One:
                    this.state.tiles[tile.row][tile.col].show = true;
                    this.setState({
                        tiles: this.state.tiles,
                        tOne: tile,
                        demo: moves.Two,
                        score: this.state.score + 1
                    });
                    break;
                case moves.Two:
                    this.state.tiles[tile.row][tile.col].show = true;
                    this.setState({
                        demo: moves.Pause,
                        tiles: this.state.tiles,
                        score: this.state.score + 1
                    });
                    if (this.state.tOne.letter != tile.letter) {
                        setTimeout(() => {
                            this.state.tiles[this.state.tOne.row][this.state.tOne.col].show = false;
                            this.state.tiles[tile.row][tile.col].show = false;
                            this.setState({
                                demo: moves.One,
                                tOne: null,
                                tiles: this.state.tiles
                            });
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            this.state.tiles[this.state.tOne.row][this.state.tOne.col].letter = "COMPLETE";
                            this.state.tiles[tile.row][tile.col].letter = "COMPLETE";
                            this.setState({
                                demo: moves.One,
                                tOne: null,
                                tiles: this.state.tiles
                            });
                        }, 1000);
                    }
                    break;
                case moves.Pause:
                    clock = setTimeout(() => {
                        this.state.tiles[this.state.tOne.row][this.state.tOne.col].show = false;
                        this.state.tiles[tile.row][tile.col].show = false;
                        this.setState({
                            demo: moves.One,
                            tOne: null,
                            tiles: this.state.tiles
                        });
                    }, 1000);
                    break;
            }
        }
    }
    reset() {
        this.setState({
            tiles: deal(),
            demo: moves.One,
            tOne: null,
            score: 0
        });
    }
    render() {
        var showTiles = this.state.tiles.map((cards, row) =>
            <
            tr > {
                cards.map((tile, row) =>
                    <
                    td onClick = {
                        () =>
                        this.move(tile)
                    } >
                    <
                    Tile tile = {
                        tile
                    }
                    /> <
                    /td>
                )
            } <
            /tr>
        );
        return <div >
            <
            table class = 'main' >
            <
            tbody > {
                showTiles
            } < /tbody> <
            /table> <
            div >
            <
            br >
            <
            /br> <
            /div> <
            div >
            <
            p > Score(lower the better): < b > {
                this.state.score
            } < /b> <
            Button onClick = {
                () => this.reset()
            } > RESTART GAME < /Button> <
            /p> <
            /div> <
            /div>
    }
}
const moves = {
    One: "One",
    Two: "Two",
    Pause: "Pause"
};

function stall() {
    alert("Try Again")
}

function congratulate() {
    alert("Good Job!!!")
}
var gameBoard = [
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
    [null, null, null, null],
];

function deal() {
    var gb = gameBoard;
    var letters = randomize(["A", "A", "B", "B", "C", "C", "D", "D", "E", "E", "F", "F", "G", "G", "H", "H"]);
    var index = 0;
    for (var r = 0; r < 4; r++) {
        for (var c = 0; c < 4; c++) {
            gb[r][c] = {
                letter: letters[index],
                show: false,
                row: r,
                col: c
            };
            index++;
        }
    }
    return gb;
}
//Fisher-Yates Shuffle: attribution to: https://bost.ocks.org/mike/shuffle/
function randomize(my_array) {
    var new_array = [],
        n = my_array.length,
        i;
    while (n) {
        i = Math.floor(Math.random() * my_array.length);
        if (i in my_array) {
            new_array.push(my_array[i]);
            delete my_array[i];
            n--;
        }
    }
    return new_array;
}
class Tile extends React.Component {
    render() {
        return <div className = "tile" > < span > {
                this.props.tile.show ? this.props.tile.letter : "CLICK TO GUESS"
            } < /span> <
            /div>
    }
}
