const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mysql = require('mysql');

app.use(bodyParser.json());

const con = mysql.createConnection({
    host: 'localhost',
    user: 'user_name',
    password: 'password',
    database: 'database_name'
})



con.connect((err) => {
    if (err) throw err;
    console.log("connection created");
}
)

//show data
app.get('/api/product/', (request, Response) => {
    let sql = "select * from product";
    let query = con.query(sql, (err, result) => {
        if (err) throw err;
        Response.send(JSON.stringify({ "status": 200, "error": null, "response": result }))
    });
});

app.post('/api/products', (request, response) => {
    console.log(request.body);
    let data = { product_name: request.body.product_name, product_price: request.body.product_price };
    let sql = "INSERT INTO product SET ?";
    let query = con.query(sql, data, (err, results) => {
        if (err) throw err;
        response.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//show single product
app.get('/api/add/products/:id', (req, res) => {
    let sql = "SELECT * FROM product WHERE product_id=" + req.params.id;
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        res.send(JSON.stringify({ "status": 200, "error": null, "response": results }));
    });
});

//update product

app.put('/api/edit/product/:id', (request, response) => {
    let sql = "update product SET product_name='" + request.body.product_name + "',product_price='" + request.body.product_price + "' WHERE product_id='" + request.params.id + "'";
    let query = con.query(sql, (err, result) => {
        if (err) throw err;
        response.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    });
});


//delete product
app.delete('/api/del/product/:id', (request, response) => {
    let sql = "delete from product where product_id='" + request.params.id + "'";
    let query = con.query(sql, (err, result) => {
        if (err) throw err;
        response.send(JSON.stringify({ "status": 200, "error": null, "response": result }));
    });
});


app.listen(3000, () => {
    console.log("server stared...");
});

