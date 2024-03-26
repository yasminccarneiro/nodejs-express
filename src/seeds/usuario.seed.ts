import { Client } from "pg"
import { fakerPT_BR as faker } from '@faker-js/faker'

async function main() {
    const client = new Client()
    await client.connect();

    const insertQuery = 'INSERT INTO usuario(nome, email, password, admin) VALUES ($1, $2, $3, $4) RETURNING *'; // Incluído '*' para retornar todas as colunas

    try {
        for (let index = 0; index < 10; index++) {
            const randomFirstName = faker.person.firstName();
            const randomLastName = faker.person.lastName();
            const randomName = `${randomFirstName} ${randomLastName}`;
            const randomEmail = faker.internet.email({ firstName: randomFirstName, lastName: randomLastName });
            const randomPassword = faker.internet.password();
            const randomAdmin = faker.datatype.boolean();

            const res = await client.query(insertQuery, [randomName, randomEmail, randomPassword, randomAdmin.toString()]);

            console.log(res.rows[0]); // Imprime o resultado da inserção
        }
    } catch (error) {
        console.error('Erro:', error);
    } finally {
        await client.end();
    }
}

main();
