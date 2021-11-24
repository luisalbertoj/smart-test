/**
 * PreconceptoController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

const uploadFiles = async (req, res) => {
    const params = req.allParams();
    const preconceptos = [];
    for (const element of params.data) {
        if (element[0] !== 'titulo' && element[1] !== 'contenido') {
            const preconcepto = await Preconcepto.findOrCreate(
                { titulo: element[0] },
                { titulo: element[0], concepto: element[1] }
            ).catch((err) => { console.log(err); });
            preconceptos.push(preconcepto);
        }
    }
    return res.ok({ status: 200, data: preconceptos });
}

module.exports = { uploadFiles };

