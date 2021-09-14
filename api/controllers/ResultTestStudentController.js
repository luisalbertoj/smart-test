/**
 * ResultTestStudentController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

 const querys = async ( req, res )=>{
    let params = req.allParams();
    let resultado = Object();
    resultado = await ResultTestStudent.find( { where: params.where || {} , sort: params.sort || 'createdAt DESC' } ).paginate(params.skip || 0, params.limit || 10 );
    return res.json({ status: 200, data: resultado, msg: 'Consulta completada' });
  };
module.exports = {querys};

