const express = require ("express");
const jwt = require ("jsonwebtoken");

const app = express();

app.get("/api",(req,res)=>{
    res.json({
        message: "Welcome to the API Service"
});
});

app.post("/api/posts", verifyToken, (req, res) => { 
    jwt.verify(req.token, "secretkey", (err, authData) => { 
        if (err) { 
            res.sendStatus(403); 
        } else { 
            res.json({ 
                message: "POST created...", 
                authData
            }); 
        }
    }); 
});

app.post("/api/login", (req, res) => { 
    const user = { 
        id: 1, 
        username: "gabo", 
        email: "leogaborojas1@gmail.com" 
    }; 
    
    jwt.sign({ user: user }, "secretkey", (err, token) => { 
        res.json({ 
            token 
        }); 
    });
});

function verifyToken (req, res, next) {
const bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== "undefined") { 
        const bearerToken = bearerHeader.split(" ")[1];
        req.token = bearerToken; 
        next(); 
    } else { 
        res.sendStatus (403);
    }
}

app.listen(3000, () => console.log("started"))