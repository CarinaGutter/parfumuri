
process.env.PORT = 8080;
//var express = require("express");
//var bodyParser = require("body-parser");
const express = require('express')
const bodyParser = require('body-parser')
var Sequelize  = require("sequelize");
var cors = require("cors");

var sequelize = new Sequelize ('perfumesdb', 'carinagutter', '');
var app = express();

app.use(express.static(__dirname + '/app'))
app.use(bodyParser.json());
app.use(cors());

var nodeadmin = require('nodeadmin');
app.use(nodeadmin(app));

var Perfume = sequelize.define('perfumes', {
        perfume_name: {type: Sequelize.STRING,
            allowNull: false,
                },
       category: {type: Sequelize.STRING,
            validate: {
                isIn: [['M','F','U']],
                 }
                    },
        year: {type: Sequelize.INTEGER,
       allowNull: false,
    }

})

var Brand = sequelize.define('brands', {
        brand_name: {type: Sequelize.STRING,
            allowNull: false,
                },
        locations: {type: Sequelize.INTEGER,
       allowNull: false,
                },
        founder: {type: Sequelize.STRING,
           allowNull: false,
                }
})


Brand.hasMany(Perfume, {
    foreignKey: 'brandId'
})
Perfume.belongsTo(Brand, {
    foreignKey: 'brandId'
})

var Seller = sequelize.define('sellers', {
        username: {type: Sequelize.STRING,
            allowNull: false,
    },
    email: {type: Sequelize.STRING,
            allowNull: false,
            validate: {
                isEmail: true,
        }
    },
    password: { 
        type: Sequelize.STRING,
        allowNull: false
    }
    })


// REST methods
// app.get('/perfumes', function(req,res){
//     res.status(200).send([]);
// });

app.get('/create', function(req, res){
    sequelize
        .sync({force: true})
    .then(() => {
        res.status(200).send('database created!');
    })
    .catch((error) => {
        console.warn(error)
        res.status(500).send('database not created!');
    })
})

app.get('/sellers', (req, res) => {
   Seller
        .findAll({
            attributes: ['id', 'username']
        })
        .then((sellers) => {
            res.status(200).send(sellers)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.get('/brands', (req, res) => {
    Brand
        .findAll({
            attributes: ['id', 'brand_name', 'locations', 'founder']
        })
        .then((brands) => {
            res.status(200).send(brands)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.get('/perfumes', (req, res) => {
    Perfume
        .findAll({
            attributes: ['id', 'perfume_name', 'category', 'year']
        })
        .then((perfumes) => {
            res.status(200).send(perfumes)
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.post('/brands', (request, result) =>{
    Brand.create(request.body)
.then(() => {
        result.status(200).send('inserted')
    })
    .catch((error) => {
        console.warn(error)
        result.status(500).send('not inserted!');
    })
})

app.delete('/brands/:id', (req, res) => {
    Brand
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((brand) => {
            return brand.destroy()
        })
        .then(() => {
            res.status(201).send('removed')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.put('/brands/:id', (req, res) => {
    Brand
        .find({
            where: {
                id: req.params.id
            }
        })
        .then((brand) => {
            return brand.updateAttributes(req.body)
        })
        .then(() => {
            res.status(201).send('modified')
        })
        .catch((error) => {
            console.warn(error)
            res.status(500).send('error')
        })
})

app.listen(process.env.PORT);