/**
 * PreconceptoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const uploadFiles = async (req, res) => {
    const params = req.allParams();
    const preconceptos = [];
    params.data.forEach(async element => {
        if(element[0] === 'titulo' && element[1] === 'contenido') return 0;
        const preconcepto = await Preconcepto.create({titulo: element[0], concepto: element[1]}).fetch();
        preconceptos.push(preconcepto);
    });
    return res.ok({ status: 200, data: preconceptos });
} 

module.exports = { uploadFiles };

