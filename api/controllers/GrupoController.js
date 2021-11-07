/**
 * GrupoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
 const query = async (req, res) => {
    const params = req.allParams();
    const grupos = await Grupo.find().where(params.where || {}).populate(params.populate || "").skip(params.skip || 1).limit(params.limit || 100).sort(params.sort || 'ASC');
    if(!tickets) { res.json({code: 400, data: [], msg: 'No hay grupos registrados'}); }
    res.json({code: 200, data: grupos , msg: 'Grupos cargados'});
};
module.exports = {
  query
};

