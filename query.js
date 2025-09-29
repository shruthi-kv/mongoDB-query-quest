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
