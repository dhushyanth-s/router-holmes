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
      `Select unix_timestamp(Timestamp) as Timestamp, X_loc,Y_loc from Request, Router
	  WHERE Person_ID = ? AND Request.Router_ID = Router.ID
	  ORDER BY Timestamp`,
      [req.body.id]
    );
    res.status(200).json([{ waypoints: rows }]);
    return;
  } catch (e) {
    console.log(e);
  }
  res.status(404).json({ message: "Not Found" });
};
