var express = require("express");
var mysql = require("mysql");
var app = express();
var cors = require("cors");
app.use(cors());
app.use(express.json());
var nodemailer = require("nodemailer");
const multer=require("multer");
const path=require("path");
app.use("/public",express.static("public"))

const con = mysql.createConnection({
    host: "localhost",
    user: "root",         // change as needed
    password: "",         // change as needed
    database: "service_booking" // change as needed
  });

con.connect((err) => {
    if (err) throw err;
    console.log("Connected to MySQL database");
  });

const storage = multer.diskStorage({
    destination: path.join(__dirname, './public/'),
    filename: function (req, file, callback) {
      callback(null, Date.now() + path.extname(file.originalname));
    }
  });

app.post("/api/insert", (req, res) => {
    const { name, email, mobile, password } = req.body;
  
    // Basic validation
    if (!name || !email || !mobile || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    // Check if email already exists
    const checkEmailQuery = "SELECT email FROM users WHERE email = ?";
    con.query(checkEmailQuery, [email], (err, result) => {
      if (err) return res.status(500).json({ message: "Database error" });
  
      if (result.length > 0) {
        return res.status(400).json({ message: "Email already exists" });
      }
    // If email is unique, insert user
      const ins = "INSERT INTO users (name, email, mobile, password) VALUES (?, ?, ?, ?)";
      con.query(ins, [name, email, mobile, password], (err, result) => {
        if (err) return res.status(500).json({ message: "Failed to register user" });
  
        res.status(201).json({ message: "User registered successfully", userId: result.insertId });
      });
    });
  });

  app.post("/api/verify", (req, resp) => {
    var email = req.body.email;
    var password = req.body.password;
    const query = "Select * from users where email=? and password=?";
    con.query(query, [email, password], (err, result) => {
      if (result.length > 0) {
        resp.send(result);
      } else {
        resp.send({ message: "wrong email id or password" });
      }
    });
  });
  

  app.post("/api/forgotpass", (req, res) => {
    const email = req.body.email;
    console.log(email);
    const sel = "select * from users where email = ?";
    con.query(sel, [email], (err, result) => {
      if (result.length > 0) {
        var email = result[0].email;
        var password = result[0].password;
  
        const Smtp = nodemailer.createTransport({
          host: "smtp.gmail.com",
          port: 587,
          secure: false,
          auth: {
            user: "mycity01012024@gmail.com",
            pass: "sywnhxhhcezzlmvj",
          },
        });
  
        const message = {
          from: "Darshan    ",
          to: email,
          subject: "Account Password",
          html: `<p>Hello ${email},</p>
            <p>The password of your account is <br><h2>${password}</h2></p>
            <p>Please do not share this email to anyone for your account security purposes.</p>
            <i>If you have any questions or concerns, please contact our support team.</i>
            <p>Thank you!</p>`,
        };
  
        Smtp.sendMail(message, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            res.send("Email Sent to your registered Email Id");
          }
        });
      } else {
        res.send({ message: "Your Email is not registered!" });
      }
    });
  });

  app.post ("/api/postdest", (req,res)=>{
    let upload = multer({storage:storage}).single('image');
    upload(req,res,function(err){
      if(!req.file){
        console.log("not found")
      }
      else{
        var name = req.body.name;
        var city = req.body.city;
        var price = req.body.price;
        var desc = req.body.desc;
        var imgsrc = req.file.filename;
        //console.log(imgsrc);
        const ins = "Insert into service_booking(name,city,price,description,img) values(?,?,?,?,?)";
        con.query(ins,[name,city,price,desc,imgsrc]);
        res.json("");
      }
    })
  });

  app.post("/api/addservice", (req, res) => {
    let upload = multer({ storage: storage }).single('image'); // 'image' is the name used in FormData
    upload(req, res, function (err) {
      if (!req.file) {
        console.log("Image not found");
        return res.json("Image is required");
      } else {
        var name = req.body.name;
        var description = req.body.description;
        var city = req.body.city;
        var price = req.body.price;
        var imgsrc = req.file.filename;
  
        const ins = "INSERT INTO services (name, description, city, image, price) VALUES (?, ?, ?, ?, ?)";
        con.query(ins, [name, description, city, imgsrc, price], (err, result) => {
          if (err) {
            console.log("DB Error:", err);
            return res.json("Database error");
          }
          res.json("Service added successfully");
        });
      }
    });
  });
  
  app.post('/api/save_booking', (req, res) => {
    const { service_id, user_email, payment_id } = req.body;
    if (!service_id || !user_email || !payment_id) {
      return res.status(400).json({ message: "Missing booking details" });
    }
    const sql = "INSERT INTO bookings (service_id, user_email, payment_id) VALUES (?, ?, ?)";
    con.query(sql, [service_id, user_email, payment_id], (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ message: "Booking failed" });
      }
      
  
      // Semail confirmation
      const Smtp = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: "mycity01012024@gmail.com",
          pass: "sywnhxhhcezzlmvj",
        },
      });
  
      const message = {
        from: "Viseas Booking <mycity01012024@gmail.com>",
        to: user_email,
        subject: "Service Booking Confirmation",
        html: `<p>Hello,</p>
          <p>Your booking for service ID <b>${service_id}</b> is confirmed!</p>
          <p>Payment ID: <b>${payment_id}</b></p>
          <p>Thank you for booking with us.</p>`,
      };
  
      Smtp.sendMail(message, (err, info) => {
        if (err) {
          console.log("Email error:", err);
          // Still return booking success, but mention email failed
          return res.json({ message: "Booking successful, but email failed to send." });
        }
        res.json({ message: "Booking successful! Confirmation email sent." });
      });
    });
  });


  app.get('/api/dest_get', (req, resp) => {
    const ins = "select * from services";
    con.query(ins, (err, result) => {
      if (err) {
        console.error(err);
        return resp.status(500).send([]);
      }
      resp.send(result);
    });
  });
  

app.listen(1221, () => {
    console.log("Server running at http://localhost:1221");
  });