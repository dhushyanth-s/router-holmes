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
      "Select SUM(Req_data) as Sum from Request;"
    );

    const [rows1, fields1] = await db.query(
      "select COUNT(ID) as People FROM People;"
    );

    res.status(200).json([rows, rows1]);
    return;
  } catch (e) {
    console.log(e);
  }
  res.status(404).json({ message: "Not Found" });
};
