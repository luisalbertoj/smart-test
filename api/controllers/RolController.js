/**
 * RolController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */
const bcrypt = require("bcrypt");
const privilegios = [
    { nombre: 'lecciones' },
    { nombre: 'Crear lecciones' },
    { nombre: 'Resultados lecciones' },
    { nombre: 'Mis pruebas' },
    { nombre: 'Crear pruebas' },
    { nombre: 'Resultados conocimiento' },
    { nombre: 'Ver recurso' },
    { nombre: 'Nuevo recurso' },
    { nombre: 'Mis laboratorios' },
    { nombre: 'Ver reporte' },
    { nombre: 'Admin usuario' },
    { nombre: 'Admin nuevo usuario' },
    { nombre: 'Admin privilegios' },
    { nombre: 'Admin IE lessons' },
    { nombre: 'Admin IE preconceptos' },
];

const initDb = async (req, res) => {
    console.log('Se crearan datos por defecto para la BD');
    const rolAdmin = await Rol.findOrCreate(
        { nombre: 'administrador' },
        { nombre: 'administrador' }
    );
    console.log('Rol administrador', rolAdmin);
    if (!rolAdmin) return res.json({ code: 401, msg: 'El rol admin ya existe' });

    const idPrivilegios = [];
    privilegios.forEach(async (privilegio) => {
        idPrivilegios.push(await Privilegio.findOrCreate(
            { nombre: privilegio.nombre },
            { nombre: privilegio.nombre, roles: [rolAdmin.id] }
        ));
    });

    const hash = await bcrypt.hash('123456', 10);

    const admin = await Persona.findOrCreate(
        { username: 'administrador' },
        {
            nombre: 'Administrador',
            apellido: 'del Sistema',
            cedula: 1090498715,
            email: 'luisalbertoj.tober@gmail.com',
            codigo: 16132243,
            username: 'administrador',
            password: hash,
            idRol: rolAdmin.id
        }
    );
    console.log('Usuario admin', admin);
    if (!admin) return res.json({ code: 401, msg: 'El usuario admin ya existe' });

    res.json({
        code: 200, msg: 'Datos creados con exito', data: {
            rolAdmin: rolAdmin,
            usuarioAdmin: admin
        }
    });
};

module.exports = { initDb };

