import request from "supertest";
import server from "../../server";

describe("POST /api/products", () => {
  test("Should display validation errors", async () => {
    const response = await request(server).post("/api/products").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(7);

    expect(response.status).not.toBe(201);
    expect(response.body.errors).not.toHaveLength(2);
  });

  test("Should validate that the price is greater than 0", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor 32 Pulgadas",
      price: 0,
      quantity: 5,
      availability: true,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(201);
    expect(response.body.errors).not.toHaveLength(2);
  });

  test("Should validate that the price isn't a string", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Monitor 32 Pulgadas",
      price: "hola",
      quantity: 5,
      availability: true,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(2);

    expect(response.status).not.toBe(201);
    expect(response.body.errors).not.toHaveLength(1);
  });

  test("Should create a new product", async () => {
    const response = await request(server).post("/api/products").send({
      name: "Mouse test2",
      price: 220,
      quantity: "23",
      availability: true,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404);
    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("errors");
  });
});

describe("GET /api/products/:id", () => {
  test("should return a 404 response for a non-existant product", async () => {
    const productId = 2000;
    const response = await request(server).get(`/api/products/${productId}`);

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("error");
    expect(response.body.error).toBe("Producto No Encontrado");
  });

  test("should check a valid ID in the URL", async () => {
    const response = await request(server).get(`/api/products/not-valid-url`);

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  test("Get a JSON response for a single product", async () => {
    const response = await request(server).get(`/api/products/1`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");
  });
});

describe("PUT /api/products/:id", () => {
  test("should check a valid ID in the URL", async () => {
    const response = await request(server)
      .put(`/api/products/not-valid-url`)
      .send({
        name: "Monitor curvo 24 Pulgadas",
        price: 300,
        quantity: 1,
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toHaveLength(1);
    expect(response.body.errors[0].msg).toBe("ID no válido");
  });

  test("Should display validation error messages when updating a product", async () => {
    const response = await request(server).put(`/api/products/1`).send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(7);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should validate that the price is greater than 0", async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: "Monitor curvo 24 Pulgadas",
      price: -300,
      quantity: 1,
    });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("errors");
    expect(response.body.errors).toBeTruthy();
    expect(response.body.errors).toHaveLength(1);

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should return a 404 response for a non-existen product", async () => {
    const Id = 2000;
    const response = await request(server).put(`/api/products/${Id}`).send({
      name: "Monitor curvo 24 Pulgadas",
      price: 300,
      quantity: 1,
    });

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Producto No Encontrado");

    expect(response.status).not.toBe(200);
    expect(response.body).not.toHaveProperty("data");
  });

  test("Should update an existing product with valid data", async () => {
    const response = await request(server).put(`/api/products/1`).send({
      name: "Monitor curvo 24 Pulgadas",
      price: 300,
      quantity: 1,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("data");

    expect(response.status).not.toBe(404)
    expect(response.status).not.toHaveProperty('data')
  });
});

describe("DELETE /api/product/:id", () => {
  test('Should check a valid ID', async () => {
    const response = await request(server).delete(`/api/products/not-valid-id`)

    expect(response.status).toBe(400)
    expect(response.body.errors).toHaveLength(1)
    expect(response.body.errors[0].msg).toBe('ID no válido')

    expect(response.status).not.toBe(200)
    expect(response.body).not.toHaveProperty('data')
  })

  test('Should return a 404 response for a non-existent product', async () => {
    const Id = 2000
    const response = await request(server).delete(`/api/products/${Id}`)

    expect(response.status).toBe(404)
    expect(response.body.error).toBe('Producto No Encontrado')

    expect(response.status).not.toBe(200)
    expect(response.body.data).not.toBe('Producto Eliminado')
  })

  test('Should delete a product', async () => {
    const response = await request(server).delete(`/api/products/1`)

    expect(response.status).toBe(200)
    expect(response.body.data).toBe('Producto Eliminado')

    expect(response.status).not.toBe(404)
    expect(response.status).not.toBe(400)
    expect(response.body.error).not.toBe('Producto No Encontrado')
  })
})