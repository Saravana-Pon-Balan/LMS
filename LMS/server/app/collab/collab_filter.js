 const ratings = [
   [1, 1, 1, 0, 1, 0, 1, 1],
   [1, 1, 1, 1, 1, 1, 0, 0],
   [1, 1, 1, 1, 1, 1, 0, 1],
   [1, 0, 0, 1, 1, 1, 1, 0],
   [0, 0, 0, 1, 0, 0, 1, 1]
   ];
const recommend = require('collaborative-filter');
 
const coMatrix = recommend.coMatrix(ratings, ratings.length, ratings[0].length);
const result = recommend.getRecommendations(ratings, coMatrix, 4)
console.log(result)