const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.static('public'))

const router = express.Router()
router.use(express.urlencoded({extended: true}));
router.use(express.json());


const server = app.listen(PORT, () =>{
    console.log('servidor levantado en el puerto ' + server.address().port)
});

server.on('error', (error) => console.log(`hubo un error ${error}`));

const productos = [];
let id = 1;

router.get('/productos',(req, res)=>{
    res.json(productos)
})

router.get('/productos/:id', (req, res)=>{
    let id = req.params.id;
    let producto = productos.find(produc => produc.id == id)
    if(producto != undefined){
            res.json(producto)
        }else{
            res.json({mensaje: `Producto con el id ${id} no encontrado`})
        }
})

router.post('/productos', (req, res)=>{
    let i = productos.length 
    console.log(req.body)
    productos.push(req.body)
    productos[i].id = id;
    id++;
    res.json({mensaje: "Producto agregado correctamente"})
})

router.put('/productos/:id', (req, res)=>{
    let id = req.params.id;
    let index = id-1;
    let producto = productos.find(produc => produc.id == id)
    
    if(producto != undefined){
            productos.splice(index, 1, req.body)
            productos[index].id = id
            res.json({
                result: 'ok',
                id: req.params.id,
                nuevo: req.body
            })

        }else{
            res.json({mensaje: `Producto con el id ${id} no encontrado`})
        }

})

router.delete('/productos/:id', (req, res)=>{
    let id = req.params.id;
    let index = id - 1;
    let producto = productos.find(produc => produc.id == id)

    if(producto != undefined){
        productos.splice(index, 1)
        res.json({mensaje: "Producto borrado"})
    }else{
        res.json({mensaje: `Producto con el id ${id} no encontrado`})
    }
})

app.use("/api", router)




