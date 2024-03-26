import { Client } from "pg";

export async function findAll() {
    const client = new Client();

    await client.connect();

    const res = await client.query('SELECT * FROM usuario');

    await client.end();

    return res.rows;
}

export async function findById(id: number) {
    const client = new Client()
    await client.connect();

    const res = await client.query('SELECT * FROM usuario WHERE id = $1', [id])

    client.end();

    return res.rows[0];
}

export async function create(nome: String, email: String, password: String, admin: boolean) {
    const client = new Client()
    await client.connect();

    const insertQuery = 'INSERT INTO usuario(nome, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *';
    const res = await client.query(insertQuery, [nome, email, password, admin.toString()])

    client.end();

    return res.rows[0];
}

export async function update(id: number, nome: String, email: String, password: String, admin: boolean) {
    const client = new Client()
    await client.connect();

    const updateQuery = 'UPDATE usuario SET nome = $1, email = $2, password = $3, admin = $4 WHERE id= $5 RETURNING *';
    const res = await client.query(updateQuery, [nome, email, password, admin.toString(), id.toString()])

    client.end();

    return res.rows[0];
}

export async function deleteById(id: number) {
    const client = new Client()
    await client.connect();

    const res = await client.query('DELETE FROM usuario WHERE id = $1', [id.toString()])

    client.end();

    return res.rows[0];
}