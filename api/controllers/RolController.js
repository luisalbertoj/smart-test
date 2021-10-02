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
const grupos = [
    {nombre: 'Grupo 1', codigo: 'A1'},
    {nombre: 'Grupo 2', codigo: 'A2'},
    {nombre: 'Grupo 3', codigo: 'A3'},
];

const initDb = async (req, res) => {
    console.log('Se crearan datos por defecto para la BD');
    const rolAdmin = await Rol.findOrCreate(
        { nombre: 'administrador' },
        { nombre: 'administrador' }
    );
    const rolDocente = await Rol.findOrCreate(
        { nombre: 'docente' },
        { nombre: 'docente' }
    );
    const rolEstudiante = await Rol.findOrCreate(
        { nombre: 'estudiante' },
        { nombre: 'estudiante' }
    );
    if (!rolAdmin) return res.json({ code: 401, msg: 'El rol admin ya existe' });

    const idPrivilegios = [];
    privilegios.forEach(async (privilegio) => {
        idPrivilegios.push(await Privilegio.findOrCreate(
            { nombre: privilegio.nombre },
            { nombre: privilegio.nombre, roles: [rolAdmin.id] }
        ));
    });

    const idGrupos = [];
    grupos.forEach(async (grupo) => {
        idGrupos.push(await Grupo.findOrCreate(
            {codigo: grupo.codigo},
            {nombre: grupo.nombre, codigo: grupo.codigo, docente: rolAdmin.id},
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
    const docente1 = await Persona.findOrCreate(
        { username: 'fabiola' },
        {
            nombre: 'Fabiola',
            apellido: 'Bohorquez',
            cedula: 11111111,
            email: 'le.bohorquez@mail.udes.edu.co',
            codigo: 11111111,
            username: 'fabiola',
            password: hash,
            idRol: rolDocente.id
        }
    );
    const docente2 = await Persona.findOrCreate(
        { username: 'docente2' },
        {
            nombre: 'Docente',
            apellido: 'del Sistema',
            cedula: 2222222,
            email: 'docente@mail.com',
            codigo: 2222222,
            username: 'docente2',
            password: hash,
            idRol: rolDocente.id
        }
    );
    const estudiante1 = await Persona.findOrCreate(
        { username: 'luis' },
        {
            nombre: 'Luis',
            apellido: 'Jaimes',
            cedula: 10904987152,
            email: 'luis@mail.com',
            codigo: 161322432,
            username: 'luis',
            password: hash,
            idRol: rolEstudiante.id
        }
    );
    const estudiante2 = await Persona.findOrCreate(
        { username: 'viviana' },
        {
            nombre: 'Viviana',
            apellido: 'Patiño',
            cedula: 10904987153,
            email: 'viviana@mail.com',
            codigo: 16132061,
            username: 'viviana',
            password: hash,
            idRol: rolEstudiante.id
        }
    );
    if (!admin) return res.json({ code: 401, msg: 'El usuario admin ya existe' });

    res.json({
        code: 200, msg: 'Datos creados con exito', data: {
            rolAdmin: rolAdmin,
            usuarioAdmin: admin,
            privilegios: idPrivilegios,
            grupos: idGrupos,
            docentes: [docente1, docente2],
            estudiantes: [estudiante1, estudiante2],
        }
    });
};

module.exports = { initDb };

