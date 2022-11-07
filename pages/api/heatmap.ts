import type { NextApiRequest, NextApiResponse } from "next";
import mysql from "mysql2/promise";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const db = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "password",
      database: "dev",
    });

    const [rows, fields] = await db.query(
      "Select COUNT(Person_Id) as Freq,X_loc,Y_loc FROM Request r1, Router ro1 WHERE Timestamp = (SELECT MAX(Timestamp) FROM Request r2 WHERE r1.Router_Id = r2.Router_Id) AND r1.Router_Id = ro1.ID GROUP BY Router_Id;"
    );
    res.status(200).json(rows);
    return;
  } catch (e) {
    console.log(e);
  }
  res.status(404).json({ message: "Not Found" });
};
