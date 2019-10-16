const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");
let T3model = require("../models/T3model");
let { T3Schema } = T3model
let id;

router.post("/game", (req, res) => {
  let newGame = new T3model();
  newGame
    .save()
    .then(doc => {
      id = doc._id;
      res.send(doc);
    })
    .catch(err => {
      console.log("err", err);
      res.send(err);
    });
}); 

router.put("/game", (req, res) => {
  let board;
  let table;
  let v;
  const {char, index} = req.query;
  console.log("char:", char);
  let i = Number(index - 1);
  
  const Game = mongoose.model("Game", T3model.T3Schema);
  Game.find({_id: id}, function (err, doc){
    board = doc[0];
    if (char != "x" && char != "o"){
      res.send('Sorry. That is not a valid character.');
    } else if (i > 8){
        res.send('Sorry. That is not a valid position.');
    } else if (board.table[i] === "-") {
      board.table[i] = char;
      board.__v++;
      table = board.table;
      v = board.__v;
      Game.findOneAndUpdate({ _id: id }, { table: table, __v: v }, { new: true, runValidators: true, useFindAndModify: false })
        .then(doc => {
          setWinner = () => {
            console.log("Winner!");
            Game.findOneAndUpdate({ _id: id }, { winner: true }, { new: true, runValidators: true, useFindAndModify: false })
              .then(doc => {
                res.send(doc);
              })
              .catch(err => {
                res.send(err);
              });
          };
          const t = doc.table;
          if (v >= 5){
            if ((t[6] === t[4] && t[6] === t[2] && t[6]!="-") ||
              (t[3] === t[4] && t[3] === t[5] && t[3]!="-") ||
              (t[6] === t[7] && t[6] === t[8] && t[6]!="-") ||
              (t[6] === t[3] && t[6] === t[0] && t[6]!="-") ||
              (t[7] === t[4] && t[7] === t[1] && t[7]!="-") ||
              (t[8] === t[5] && t[8] === t[2] && t[8]!="-") ||
              (t[0] === t[4] && t[0] === t[8] && t[0]!="-") ||
              (t[0] === t[1] && t[0] === t[2] && t[0]!="-")) {
                setWinner();
              } else {
                res.send(board);
              }
          } else {
            res.send(board)
          }
        })
        .catch(err => {
          console.log(err);
          res.send(err);
        });
    } else if (board.table[i] !== "-") {
      res.send("That position is already taken.");
    } else if (err){
      res.send(err)
    }
  })
});

module.exports = router;