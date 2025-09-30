//. Write a MongoDB query to display all the documents in the collection restaurants.
db.hotels.find();

//Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine for all the documents in the collection restaurant.
db.hotels.find({}, { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 });

//Write a MongoDB query to display the fields restaurant_id, name, borough and cuisine, but exclude the field _id for all the documents in the collection restaurant.
db.hotels.find(
  {},
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1, _id: 0 }
);

// Write a MongoDB query to display the fields restaurant_id, name, borough and zip code, but exclude the field _id for all the documents in the collection restaurant.
db.hotels.find(
  {},
  { restaurant_id: 1, name: 1, borough: 1, "address.zipcode": 1, _id: 0 }
);

// Write a MongoDB query to display all the restaurant which is in the borough Bronx.
db.hotels.find({ borough: "Bronx" });

//7.Write a MongoDB query to display the next 5 restaurants after skipping first 5 which are in the borough Bronx.
db.hotels.find({ borough: "Bronx" }).skip(5).limit(5);

//8. Write a MongoDB query to find the restaurants who achieved a score more than 90.
db.hotels.find({ grades: { $elemMatch: { score: { $gt: 90 } } } });
db.hotels.find({ "grades.score": { $gt: 70 } });

// $elemMatch forces MongoDB to look within the same subdocument (element of the grades array).

// It will return documents where at least one grade object has a score > 90.

// 👉 Example:
// If a grades element is { "grade": "A", "score": 95 }, this document qualifies.
// If one element has score: 95 and another has score: 2, it still matches because of the 95.

// Dot notation without $elemMatch means:
// “Does the array grades contain any subdocument where score > 70?”

// MongoDB will check each subdocument independently and match if at least one grades.score is > 70.

// 👉 Example:
// If any grades element has score: 75, the document matches.

//9. Write a MongoDB query to find the restaurants that achieved a score, more than 80 but less than 100.
db.hotels.find({ grades: { $elemMatch: { score: { $gt: 90, $lt: 100 } } } });

//10. Write a MongoDB query to find the restaurants which locate in latitude value less than -95.754168.
db.hotels.find({ "address.coord": { $lt: -95.754168 } });

//11. Write a MongoDB query to find the restaurants that do not prepare any cuisine of 'American' and their grade score more than 70 and latitude less than -65.754168.
db.hotels.find({
  $and: [
    { cuisine: { $ne: "American " } },
    { "grades.score": { $gt: 70 } },
    { "address.coord": { $lt: -65.754168 } },
  ],
});

// 12. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a score more than 70 and located in the longitude less than -65.754168.
// Note : Do this query without using $and operator.
db.hotels.find({
  cuisine: { $ne: "American" },
  "grades.score": { $gt: 70 },
  "address.coord": { $lt: -65.754168 },
});

// Q11: Uses $and explicitly.
// Q12: Uses MongoDB’s implicit AND by writing multiple conditions directly in the query object.

//13. Write a MongoDB query to find the restaurants which do not prepare any cuisine of 'American' and achieved a grade point 'A' not belongs to the borough Brooklyn. The document must be displayed according to the cuisine in descending order.
//Click me to see the solution
db.hotels
  .find({
    $and: [
      { cuisine: { $ne: "American" } },
      { "grades.grade": "A" },
      { borough: { $ne: "borough" } },
    ],
  })
  .sort({ cuisine: -1 });

//14. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Wil' as first three letters for its name.
//Click me to see the solution
db.hotels.find({ name: /^Wil/ }, { name: 1, borough: 1, cuisine: 1 });

//15. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'ces' as last three letters for its name.
//Click me to see the solution//
db.hotels.find({ name: /ces$/ }, { name: 1, borough: 1, cuisine: 1 });

// 16. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which contain 'Reg' as three letters somewhere in its name.
db.hotels.find({ name: /Reg/ }, { name: 1, borough: 1, cuisine: 1 });

// 17. Write a MongoDB query to find the restaurants which belong to the borough Bronx and prepared either American or Chinese dish.
db.hotels.find({
  $and: [
    { borough: { $eq: "Bronx" } },
    { cuisine: { $in: ["American", "Chinese"] } },
  ],
});

// 18. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which belong to the borough Staten Island or Queens or Bronxor Brooklyn.
db.hotels.find(
  {
    borough: { $in: ["Queens", "Brooklyn", "Staten Island", "Bronx"] },
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 19. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which are not belonging to the borough Staten Island or Queens or Bronxor Brooklyn.
db.hotels.find(
  {
    borough: { $nin: ["Queens", "Brooklyn", "Staten Island", "Bronx"] },
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 20. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which achieved a score which is not more than 10.
db.hotels.find({
 "grades.score" : {$lte : 10}
},{restaurant_id:1,name:1,borough:1,cuisine:1})



db.hotels.find({
 "grades.score" : {$not : {$gt :10}}
},{restaurant_id:1,name:1,borough:1,cuisine:1})