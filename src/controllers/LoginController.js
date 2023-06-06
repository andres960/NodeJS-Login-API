function index(req, res) {
  if (req.session.loggedin) {
		// Output username
    res.redirect('/');
	
  } else {
    //Redirigir al usuario al index
    res.render('login/index');
  }
}



//FUNCION PARA RETORNAR LA VISTA PARA REGISTRAR USUARIOS
function register(req, res) {
  res.render('login/register');
}
function auth(req, res) {
  let email = req.body.email;
  let password = req.body.password;

  // Verificar si los campos email y password están presentes
  if (!email || !password) {
    return res.status(400).send('Email and password are required');
  }

  req.getConnection((err, conn) => {
    if (err) {
      // Error al conectarse a la base de datos u otro error interno
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
            res.status(200).send('Success');
          } else {
            console.log('not');
            res.status(404).send('User Not Found');
          }
        }
      });
    }
  });
}



//Funcion para cerrar la sesion
function logout(req, res) {
  if (req.session.loggedin) {
    req.session.destroy();
  }
  res.redirect('/');
}


module.exports = {
  index: index,
  register: register,
  auth: auth,
  logout: logout,
}
