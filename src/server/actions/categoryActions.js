"use server";

import { query } from "src/server/db/db";

//insert
export async function insertCategory({ label, key }) {
  try {
    const result = await query(
      `INSERT INTO category (name,label) values ('${key}','${label}')`
    );
    return { status: 200, insertId: result.insertId };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

//rows number
export async function getRowsNumber() {
  try {
    const [result] = await query(`SELECT COUNT(*) as rowsNumber FROM category`);
    return { status: 200, rowsNumber: result.rowsNumber };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

//select page
export async function getCategories(
  { page, pageSize } = { page: 1, pageSize: 10 }
) {
  const offset = (page - 1) * pageSize;
  try {
    const result = await query(
      `SELECT * FROM category ORDER BY ID DESC LIMIT ${pageSize} OFFSET ${offset}`
    );
    return { status: 200, response: result };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

//select category
export async function getCategory({ ID }) {
  try {
    const [result] = await query(`SELECT * FROM category WHERE ID=${ID}`);
    return { status: 200, response: result };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

// update category
export async function updateCategory({ ID, name, label }) {
  try {
    const result = await query(
      `UPDATE category SET name='${name}',label='${label}' WHERE ID=${ID}`
    );
    if (result.affectedRows)
      return { status: 200, affectedRows: result.affectedRows };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

// remove category
export async function deleteCategory({ ID }) {
  try {
    const result = await query(`DELETE FROM category WHERE ID=${ID}`);
    if (result.affectedRows)
      return { status: 200, affectedRows: result.affectedRows };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}

// search category
export async function searchCategory({ name, label }) {
  let where = 1;
  where += name ? ` and name like '%${name}%'` : "";
  where += label ? ` and label like '%${label}%'` : "";
  try {
    const result = await query(`SELECT * FROM category WHERE ${where}`);
    return {
      status: 200,
      response: result,
    };
  } catch (error) {
    return { status: 500, message: error.message };
  }
}
