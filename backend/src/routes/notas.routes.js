const express = require('express');
const notasCtrl = require('../controllers/notas.controller');
const router = express.Router();

const verifyToken = require('../controllers/verify.token');

router.post('/', verifyToken, notasCtrl.createNota)
router.get('/:idUsuario', verifyToken, notasCtrl.getNotasByUser)
router.get('/nota/:idNota', verifyToken, notasCtrl.getNota)
router.put('/:idNota', verifyToken, notasCtrl.updateNota)
router.delete('/:idNota', verifyToken, notasCtrl.deleteNota)
router.delete('/user/:idUsuario', verifyToken,notasCtrl.deleteNotaByUser);

module.exports = router;