# mongoDB-query-quest

# mongoDB-query-quest

1. What is MongoDB, and how does it differ from traditional relational databases?
Answer: MongoDB is a NoSQL, document-oriented database designed to handle large volumes of unstructured or semi-structured data. It stores data in a flexible, JSON-like format called BSON (Binary JSON), which allows for dynamic schemas. Traditional relational databases (e.g., MySQL, PostgreSQL) use a structured schema with tables, rows, and columns, enforcing strict relationships via foreign keys.

Key Differences:
Schema Flexibility: MongoDB doesn’t require a predefined schema, making it ideal for evolving applications, whereas RDBMS requires a fixed schema.
Data Model: MongoDB uses documents within collections; RDBMS uses tables with rows and columns.
Scalability: MongoDB scales horizontally (via sharding), distributing data across servers, while RDBMS typically scales vertically (adding more power to a single server).
Joins: MongoDB avoids complex joins, embedding related data in documents, while RDBMS relies heavily on joins.
Use Case: MongoDB is suited for applications like content management systems or real-time analytics, while RDBMS excels in structured data scenarios like banking systems.
