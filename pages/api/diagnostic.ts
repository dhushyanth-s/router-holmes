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
      `Select  Temperature, X_loc, Y_loc FROM Diagnostics d1, Router r1
      WHERE Timestamp = (SELECT MAX(Timestamp) FROM Diagnostics d2 WHERE d1.Router_Id = d2.Router_Id) AND r1.ID = d1.Router_ID;`
    );
    res.status(200).json(rows);
    return;
  } catch (e) {
    console.log(e);
  }
  res.status(404).json({ message: "Not Found" });
};
