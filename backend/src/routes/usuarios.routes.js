const express = require('express');
const router = express.Router();

const usuarioCtrl = require('../controllers/usuarios.controller');
// middleware
const verifyToken = require('../controllers/verify.token');

router.post('/registro', usuarioCtrl.registrar);
router.post('/login', usuarioCtrl.login);
router.get('/:idUsuario', verifyToken, usuarioCtrl.getUsuario);
router.put('/', verifyToken, usuarioCtrl.updateUser);
router.delete('/:idUsuario', verifyToken, usuarioCtrl.deleteUser);
router.get('/', verifyToken, usuarioCtrl.getUsuarios);

module.exports = router;