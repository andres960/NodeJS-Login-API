function index(req, res) {
  if (req.session.loggedin) {
		// Output username
    res.redirect('/');
	
  } else {
    //Redirigir al usuario al index
    res.render('login/index');
  }
}


function logout(req, res){
  res.status(400).send('Sesion eliminada');
}


function register(req, res) {
  let email = req.body.email;
  let name = req.body.name;
  let password = req.body.password;

  // Verificar si los campos email, name y password están presentes
  if (!email || !name || !password) {
    return res.status(400).send('El email el nombre y el password son requeridos');
  }

  req.getConnection((err, conn) => {
    if (err) {
      // Error al conectarse a la base de datos u otro error interno
      res.status(500).send('Internal Server Error');
    } else {
      const query = 'INSERT INTO users (email, name, password) VALUES (?, ?, ?)';
      conn.query(query, [email, name, password], (err, result) => {
        if (err) {
          // Error al ejecutar la consulta de inserción
          res.status(500).send('Internal Server Error');
        } else {
          res.status(200).send('User registered successfully');
        }
      });
    }
  });
}



//Funcion para comprobar si el usuario existe, mediante su email y password
//Metodo: POST
//Entrada: RAW/Json
//Salida: 200 - "Success" / 404 - "User Not Found"

function auth(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  // Verificar si los campos email y password están presentes
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  req.getConnection((err, conn) => {
    if (err) {
      // Error al conectarse a la base de datos u otro error internoo
      res.status(500).send('Internal Server Error');
    } else {
      const query = 'SELECT * FROM users WHERE email = ? AND password = ?';
      conn.query(query, [email, password], (err, rows) => {
        if (err) {
          // Error al ejecutar la consulta
          res.status(500).send('Internal Server Error');
        } else {
          if (rows.length > 0) {
            console.log(rows);
            res.status(200).send('Autenticación satisfactoria');
          } else {
            console.log('not');
            res.status(404).send('User Not Found, Error en la autenticacion');
          }
        }
      });
    }
  });
}




module.exports = {
  index: index,
  register: register,
  auth: auth,
  logout: logout,
}
