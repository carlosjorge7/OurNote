const usuarioCtrl = {}

const mysqlConn = require('../database');

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

usuarioCtrl.registrar = async (req, res) => {
  try {
    req.body.contrasena = bcrypt.hashSync(req.body.contrasena, 10)
    await mysqlConn.query('INSERT INTO usuarios SET ?', [req.body]);

    const user = await getEmail(req.body.email);
    
    const token = jwt.sign({ id: req.body.idUsuario }, 'secret', {
      expiresIn: 60 * 60 * 24 // 1 dia en segundos
    });
    // IMPORTANTE !! Hay que sacar el idUsuario de alguna manera
    res.status(200).json({ auth: true, token: token, message: `Bienvenido ${req.body.email}`, idUsuario: user.idUsuario});
  }
  catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

usuarioCtrl.login = async (req, res) => {
  try {
      const user = await getEmail(req.body.email)
      if (user === undefined) {
        res.status(401).send('El email no existe');
      }
      else {
        const match = await bcrypt.compareSync(req.body.contrasena, user.contrasena);
        if (!match) {
          res.status(401).send('La contraseña no es correcta');
        }
        else {
          const token = jwt.sign({ id: req.body.idUsuario }, 'secret', {
            expiresIn: 60 * 60 * 24 // 1 dia en segundos
          });
          res.status(200).json({ auth: true, token: token, idUsuario: user.idUsuario, message: `Bienvenido ${user.email}`});
        }
      }
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

usuarioCtrl.getUsuario = async (req, res) => {
  try {
      const { idUsuario } = req.params;
      await mysqlConn.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario], (err, rows) => {
        if (!err) {
          res.status(200).json(rows[0]);
        }
        else {
          res.status(401).send('User not found');
        }
      });
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

usuarioCtrl.updateUser = async (req, res) => {
  try {
      let { email, contrasena } = req.body;
      const { idUsuario } = req.params;
      contrasena = bcrypt.hashSync(contrasena, 10);
      await mysqlConn.query('UPDATE usuarios SET email = ?, contrasena = ? WHERE idUsuario = ?', [email, contrasena, idUsuario], (err) => {
        if (!err) {
          res.status(200).json({ message: 'Usuario actualizado' })
        }
        else {
          res.status(401).json({ message: 'Error al actualizar' })
        }
      });
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

usuarioCtrl.deleteUser = async (req, res) => {
  try {
      const { idUsuario } = req.params;
      await mysqlConn.query('DELETE FROM usuarios WHERE idUsuario = ?', [idUsuario], (err) => {
        if (!err) {
          res.status(200).json({ message: 'Usuario borrado' });
        }
        else {
          res.status(401).json({ message: 'User not found' })
        }
      });
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

// for admins
usuarioCtrl.getUsuarios = async (req, res) => {
  try {
      await mysqlConn.query('SELECT * FROM usuarios ', (err, rows) => {
        if (!err) {
          res.status(200).json(rows);
        }
        else {
          res.status(401).json({ message: 'Users not found' })
        }
      });
  }
  catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
}

// Funciones auxiliares
const getEmail = (email) => {
  return new Promise((resolve, reject) => {
    mysqlConn.query('SELECT * FROM  usuarios WHERE email = ?', [email], (err, rows) => {
      if (err) reject(err)
      resolve(rows[0])
    });
  });
}

module.exports = usuarioCtrl;