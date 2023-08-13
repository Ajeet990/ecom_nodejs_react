const sql = require("./db.js");
const jwt = require('jsonwebtoken')
const {JWT_SECRET} = require('../../env.js')

// constructor
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
  this.password = user.password;
  this.address = user.address;
  this.phone = user.phone;
  this.profile = user.profile;
};

User.create = (newUser, result) => {
    console.log(newUser);
  sql.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created user: ", { id: res.insertId, ...newUser });
    result(
        null,
        {
            isSuccess: true,
            message:"Successfully registered"
        }
    );
  });
};

User.getAllUsers = (result) => {
    sql.query("select * from users",(err, res) => {
        if (err) {
            result(err, null)
            return
        }
        if (res.length) {
            result(null, res)
            return
        }
        result(null, {"message":"No users registerd till now"})
    })
}

User.login = (userDetails, result) => {
    sql.query(
        "select * from users where email = ? and password = ?",
        [userDetails.email, userDetails.password],
        (err, res) => {
            if (err) {
                result(err, null)
                return
            }
            if (res.length > 0) {
                const JWT_token = jwt.sign({id: res[0].id, email:res[0].email, name:res[0].name}, JWT_SECRET,{ expiresIn: '300s' })
                result(
                        null,
                        {
                            isSuccess:true,
                            message:"Login success",
                            data:res,
                            token:JWT_token
                        }
                )
                return
            } else {
                result(
                    null,
                    {
                        isSuccess:false,
                        message:"Email or password missmatched, please try again",
                        data:[],
                        token:null
                    }
                )
            }
        }
    )
}

User.findUserById = (id, result) => {
    sql.query("select * from users where id = ?", [id], (err, data) => {
        if (err) {
            result(err, null)
            return
        }
        result(null, data)
    })
}

// Tutorial.findById = (id, result) => {
//   sql.query(`SELECT * FROM tutorials WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log("found tutorial: ", res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found Tutorial with the id
//     result({ kind: "not_found" }, null);
//   });
// };

// Tutorial.getAll = (title, result) => {
//   let query = "SELECT * FROM tutorials";

//   if (title) {
//     query += ` WHERE title LIKE '%${title}%'`;
//   }

//   sql.query(query, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// Tutorial.getAllPublished = result => {
//   sql.query("SELECT * FROM tutorials WHERE published=true", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log("tutorials: ", res);
//     result(null, res);
//   });
// };

// Tutorial.updateById = (id, tutorial, result) => {
//   sql.query(
//     "UPDATE tutorials SET title = ?, description = ?, published = ? WHERE id = ?",
//     [tutorial.title, tutorial.description, tutorial.published, id],
//     (err, res) => {
//       if (err) {
//         console.log("error: ", err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found Tutorial with the id
//         result({ kind: "not_found" }, null);
//         return;
//       }

//       console.log("updated tutorial: ", { id: id, ...tutorial });
//       result(null, { id: id, ...tutorial });
//     }
//   );
// };

// Tutorial.remove = (id, result) => {
//   sql.query("DELETE FROM tutorials WHERE id = ?", id, (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Tutorial with the id
//       result({ kind: "not_found" }, null);
//       return;
//     }

//     console.log("deleted tutorial with id: ", id);
//     result(null, res);
//   });
// };

// Tutorial.removeAll = result => {
//   sql.query("DELETE FROM tutorials", (err, res) => {
//     if (err) {
//       console.log("error: ", err);
//       result(null, err);
//       return;
//     }

//     console.log(`deleted ${res.affectedRows} tutorials`);
//     result(null, res);
//   });
// };

module.exports = User;