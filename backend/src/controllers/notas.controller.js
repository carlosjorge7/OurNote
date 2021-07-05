const notasCtrl = {}

const mysqlConn = require('../database');

notasCtrl.createNota = async (req, res) => {
    try {
        await mysqlConn.query('INSERT INTO notas SET ?', [req.body], (err) => {
            if (!err) {
                res.status(200).json({message: 'Nota guardada'});
            } else {
                res.status(401).json({ message: err })
            }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

notasCtrl.getNotasByUser = async (req, res) => {
    try {
        const { idUsuario } = req.params;
        await mysqlConn.query('SELECT * FROM notas WHERE idUsuario = ?', [idUsuario], (err, rows) => {
          if (!err) {
            res.status(200).json(rows);
          }
          else {
            res.status(401).json({ message: 'Nota not found' })
          }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

notasCtrl.getNota = async (req, res) => {
    try {
        const { idNota } = req.params;
        await mysqlConn.query('SELECT * FROM notas WHERE idNota = ?', [idNota], (err, row) => {
          if (!err) {
            res.status(200).json(row[0]);
          }
          else {
            res.status(401).json({ message: 'Nota not found' })
          }
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

notasCtrl.updateNota = async (req, res) => {
    try {
      let { titulo, descripcion, created_at} = req.body;
      const { idNota } = req.params;
      await mysqlConn.query('UPDATE notas SET titulo = ?, descripcion = ?, created_at = ? WHERE idNota = ?', [titulo, descripcion, created_at, idNota], (err) => {
        if (!err) {
          res.status(200).json({ message: 'Nota actualizada' })
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

notasCtrl.deleteNota = async (req, res) => {
    try {
      const { idNota } = req.params;
      await mysqlConn.query('DELETE FROM notas WHERE idNota = ?', [idNota], (err) => {
        if (!err) {
          res.status(200).json({ message: 'Nota borrada' });
        }
        else {
          res.status(401).json({ message: 'Error al borrar nota' })
        }
      });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

notasCtrl.deleteNotaByUser = async (req, res) => {
    try {
      const { idUsuario } = req.params;
      await mysqlConn.query('DELETE FROM notas WHERE idUsuario = ?', [idUsuario], (err) => {
        if (!err) {
          res.status(200).json({ message: 'Borradas las notas del usuario', idUsuario });
        }
        else {
          res.status(401).json({ message: 'Error al borrar notas del usuario' })
        }
      });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}


module.exports = notasCtrl;