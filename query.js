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
db.hotels.find(
  {
    "grades.score": { $lte: 10 },
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

db.hotels.find(
  {
    "grades.score": { $not: { $gt: 10 } },
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 21. Write a MongoDB query to find the restaurant Id, name, borough and cuisine for those restaurants which prepared dish except 'American' and 'Chinees' or restaurant's name begins with letter 'Wil'.

db.hotels.find(
  {
    $or: [
      { name: /^Wil/ },
      {
        $and: [
          { cuisine: { $ne: "American" } },
          { cuisine: { $ne: "Chinees" } },
        ],
      },
    ],
  },
  { restaurant_id: 1, name: 1, borough: 1, cuisine: 1 }
);

// 22. Write a MongoDB query to find the restaurant Id, name, and grades for those restaurants which achieved a grade of "A" and scored 11 on an ISODate "2014-08-11T00:00:00Z" among many of survey dates..
db.hotels
  .find(
    {
      grades: {
        $elemMatch: {
          date: ISODate("2014-08-11T00:00:00Z"),
          grade: "A",
          score: 11,
        },
      },
    },
    {
      restaurant_id: 1,
      name: 1,
      grades: 1,
    }
  )
  .pretty();

// 23. Write a MongoDB query to find the restaurant Id, name and grades for those restaurants where the 2nd element of grades array contains a grade of "A" and score 9 on an ISODate "2014-08-11T00:00:00Z".
db.hotels
  .find(
    {
      "grades.1.grade": "A",
      "grades.1.score": 9,
      "grades.1.date": ISODate("2014-08-11T00:00:00Z"),
    },
    {
      restaurant_id: 1,
      name: 1,
      grades: 1,
    }
  )
  .pretty();

// 24. Write a MongoDB query to find the restaurant Id, name, address and geographical location for those restaurants where 2nd element of coord array contains a value which is more than 42 and upto 52..
db.hotels.find(
  {
    "address.coord.1": { $gt: 42, $lte: 52 },
  },
  { restaurant_id: 1, name: 1, address: 1, coord: 1 }
);

// 25. Write a MongoDB query to arrange the name of the restaurants in ascending order along with all the columns.
db.hotels.find().sort({ name: 1 });

// 26. Write a MongoDB query to arrange the name of the restaurants in descending along with all the columns.
db.hotels.find().sort({ name: -1 });

// 27. Write a MongoDB query to arranged the name of the cuisine in ascending order and for that same cuisine borough should be in descending order.
db.hotels.find().sort({ cuisine: 1 }, { borough: -1 });

// 28. Write a MongoDB query to know whether all the addresses contains the street or not.
db.hotels.find({
  "address.street": { $exists: true },
});

// 29. Write a MongoDB query which will select all documents in the restaurants collection where the coord field value is Double.
db.hotels.find({
  "address.coord": { $type: 1 },
});

// 30. Write a MongoDB query which will select the restaurant Id, name and grades for those restaurants which returns 0 as a remainder after dividing the score by 7.
db.restaurants.find(
  { "grades.score": { $mod: [7, 0] } },
  { restaurant_id: 1, name: 1, grades: 1 }
);

//31. Write a MongoDB query to find the restaurant name, borough, longitude and attitude and cuisine for those restaurants which contains 'mon' as three letters somewhere in its name.
db.hotels.find(
  { name: /mon/ },
  {
    restaurant_id: 1,
    name: 1,
    borough: 1,
    "address.coord.0": 1,
    "address.coord.1": 1,
    cuisine: 1,
  }
);
// -----or ------
db.hotels.find(
  {
    name: { $regex: /mon/i },
  },

  {
    restaurant_id: 1,
    name: 1,
    borough: 1,
    "address.coord.0": 1,
    "address.coord.1": 1,
    cuisine: 1,
  }
);
//32. Write a MongoDB query to find the restaurant name, borough, longitude and latitude and cuisine for those restaurants which contain 'Mad' as first three letters of its name.
db.hotels.find(
  {
    name: { $regex: /^Mad/ },
  },

  {
    restaurant_id: 1,
    name: 1,
    borough: 1,
    "address.coord.0": 1,
    "address.coord.1": 1,
    cuisine: 1,
  }
);


//33. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5.
db.hotels.find({
  "grades.score"  : {$lt :5}
})


//34. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan.
db.hotels.find({
  $and :[
    {"grades.score" :{$lt :5}},
    {borough :"Manhattan"}
  ]
})

//35. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn.
db.hotels.find({
  $and :[
    {"grades.score" : {$lt :5}},
    {$or :[{borough : "Brooklyn"},{borough :"Manhattan"}]}
  ]
})
//36. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.
db.hotels.find({
    $and: [
        {
            $or: [
                {borough: "Manhattan"},
                {borough: "Brooklyn"}
            ]
        },
        {
            $nor: [
                {cuisine: "American"},
                {cuisine: "Chinese"}
            ]
        },
        {
grades: {
                $elemMatch: {
score: { $lt: 5 }
                }
            }
        }
    ]
})
//37. Write a MongoDB query to find the restaurants that have at least one grade with a score of less than 5 and that are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
db.hotels.find({
    $and: [
        {
            $or: [
                {borough: "Manhattan"},
                {borough: "Brooklyn"}
            ]
        },
        {
            $nor: [
                {cuisine: "American"},
                {cuisine: "Chinese"}
            ]
        },
        {
grades: {
                $elemMatch: {
score: { $lt: 5 }
                }
            }
        }
    ]
})
//38. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6.
db.hotels.find(
  {
    $and : [{"grades.score":2},{"grades.score" :6}]
  }
)

//39. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan.
db.hotels.find(
  {
    $and : [{"grades.score":2},{"grades.score" :6},{borough :"Manhattan"}]
  }
)
//40. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
db.hotels.find(
  {
    $and : [{"grades.score":2},{"grades.score" :6},
            {$or : [{borough :"Manhattan"},{borough :"Brooklyn"}]}
            
           ]
  }
)

/// or

db.restaurants.find({
  $and: [
    {"grades.score": 2},
    {"grades.score": 6},
    {"borough": {"$in": ["Manhattan", "Brooklyn"]}}
  ]
})



// 41. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.

db.hotels.find({
  $and :[
    {$and :[{"grades.score" : 2},{"grades.score" :6}]},
    {$or : [{borough : "Manhattan"},{borough : "Brooklyn"}]}
  ]
}).count()


// 42. Write a MongoDB query to find the restaurants that have a grade with a score of 2 and a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.

db.hotels.find({
  $and: [
    {"grades.score": 2},
    {"grades.score": 6},
    {"borough": "Manhattan"},
    {$nor : [{"cuisine" : "American"},{"cuisine" : "Chinese"} ]}
  ]
}).count()

// 43. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6.
db.hotels.find({$or :[{"grades.score" :2},{"grades.score" : 6}]})

// 44. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan.

// 45. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn.
db.hotels.find({$and :[

    {$or :[{"borough" :"Manhattan"},{"borough" : "Brooklyn"}]},
  {$or :[{"grades.score" :2},{"grades.score" : 6}]}
]})

// 46. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American.

db.hotels.find({$and :[

    {$or :[{"borough" :"Manhattan"},{"borough" : "Brooklyn"}]},
  {$or :[{"grades.score" :2},{"grades.score" : 6}]},
  {cuisine : {$ne :"American"}}
]})

// 47. Write a MongoDB query to find the restaurants that have a grade with a score of 2 or a grade with a score of 6 and are located in the borough of Manhattan or Brooklyn, and their cuisine is not American or Chinese.
db.hotels.find({$and :[

    {$or :[{"borough" :"Manhattan"},{"borough" : "Brooklyn"}]},
  {$or :[{"grades.score" :2},{"grades.score" : 6}]},
  {$nor : [{cuisine:"American"},{cuisine:"American"}]}
]})

// 48. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5.
db.hotels.find({"grades.score" : {$gt:5}}).count()

//--------or ------

  db.restaurants.find({
  "grades": {
    "$not": {
      "$elemMatch": {
        "score": {
          "$lte": 5
        }
      }
    }
  }
})

// 49. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan.
db.hotels.find({"grades.score" : {$gt:5}},
               {borough : "Manhattan"}
              ).count()

// 50. Write a MongoDB query to find the restaurants that have all grades with a score greater than 5 and are located in the borough of Manhattan or Brooklyn.

db.hotels.find({"grades.score" : {$gt:5}},
               {$and : [{borough : "Manhattan"},{borough : "Brooklyn"}]}
               
              ).count()


// 51. Write a MongoDB query to find the average score for each restaurant.
db.hotels.aggregate([
  {$unwind : "$grades"},
  {$group : {
    _id :"$name",
    avgScore : {$avg : "grades.score"}
  }}
])

// 52. Write a MongoDB query to find the highest score for each restaurant.
db.hotels.aggregate([
  {$unwind : "$grades"},
  {$group : {
    _id :"$name",
    maxScore : {$max :"grades.score"}
  }}
])

// 53. Write a MongoDB query to find the lowest score for each restaurant.
db.hotels.aggregate([
  {$unwind : "$grades"},
  {$group : {
    _id :"$name",
    minScore : {$min :"grades.score"}
  }}
])

// 54. Write a MongoDB query to find the count of restaurants in each borough.
db.hotels.aggregate([
  {$group : {_id:"borough", count :{$sum :1}}}
])

// 55. Write a MongoDB query to find the count of restaurants for each cuisine.
db.hotels.aggregate([
  {$group : {_id :"cuisine", count : {$sum:1}}}
])

// 56. Write a MongoDB query to find the count of restaurants for each cuisine and borough.

db.hotels.aggregate([
  {$group : {_id :{cuisine:"cuisine", borough: "$borough"}, count : {$sum:1}}}
])
// 57. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine.
db.hotels.aggregate([
  {$unwind : "$grades"},
  {$match : { "grades.grade" : 'A' }},
  {$group : {_id:"cuisine", count : {$sum:1}}}
])

// 58. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each borough.
// 59. Write a MongoDB query to find the count of restaurants that received a grade of 'A' for each cuisine and borough.
db.hotels.aggregate([
  {$unwind : "$grades"},
  {$match : {"grades.grade" :'A'}},
  {$group : {_id :{cuisine :"cuisine", borough:"borough" , count :{$sum:1}}}}
])

// 60. Write a MongoDB query to find the number of restaurants that have been graded in each month of the year.



