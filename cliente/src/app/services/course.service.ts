import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  public leccion: any = {
    codigo: 'Lección 21 ',
    titulo: 'Casos de uso y casos de prueba',
    slug: 'casos-de-uso-y-casos-de-prueba',
    portada: 'assets/images/courses/leccion21.png',
    estado: 'Leccion Pendiente',
    objetivo: 'Esclarecer la relación entre casos de prueba y casos de uso',
    completado: '0%',
    cantidad_estudiantes: '0',
    fecha_cierre: '30/03/2021',
    presaberes: [
      { nombre: 'Ciclo de vida' },
      { nombre: 'Prueba de software' },
      { nombre: 'Metodologías de desarrollo' },
      { nombre: 'Requisitos del software' },
      { nombre: 'Entorno de pruebas' },
    ],
    introduccion: `
    Los casos de uso juegan un papel importante en diferentes aspectos de la ingeniería de Software.
    Algunas metodologías de desarrollo se orientan por los casos de uso,
    los cuales constituyen el primer modelo donde se ven representados 
    los requisitos funcionales de un sistema. En el entorno de las pruebas de Software; 
    los casos de uso proporcionan una guía a través de los sucesivos flujos del proceso de desarrollo 
    incluidas las pruebas. Los casos de prueba derivados de los casos de uso,
    es una habilidad que permite garantizar un producto de calidad,
    y le dan fundamentos sólidos y garantía a las pruebas del sistema.`,
    nivel_educativo: [
      { nombre: 'Técnico' },
      { nombre: 'Tecnólogo' },
      { nombre: 'Profesional' },
    ],
    objetivos: [
      { nombre: 'Conceptos de casos de uso' },
      { nombre: 'Conceptos de caso de prueba' },
      { nombre: 'Relacion entre caso de uso y caso de prueba' },
      { nombre: 'Formato de caso de prueba' },
    ],
    docente: {
      nombre: 'Viviana Patiño',
      img: 'assets/images/usuarios/viviana.jpeg',
      rol: {
        nombre: 'Docente',
      },
    },
    contenido: {
      aprende: [
        {
          titulo: 'Caso de uso',
          cuerpo: `
          <P ALIGN=CENTER STYLE="margin-top: 0.33in; margin-bottom: 0.19in; page-break-inside: avoid; page-break-after: avoid"><A NAME="_heading=h.fw1m9duamven"></A>
          <FONT SIZE=7><B><FONT SIZE=5 STYLE="font-size: 20pt">Lección 21
     Casos de uso y casos de prueba</FONT></B></FONT></P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     <BR><BR>
     </P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     Caso de uso</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     [2] “Un caso de uso es un conjunto de escenarios que tienen una
     meta de usuario en común”</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     El caso de uso lo podemos describir como aquella representación de
     las actividades que se deben realizar para llevar a cabo un proceso.
     Estos procesos agrupan los requisitos funcionales, usamos los casos
     de uso para determinar unas funcionalidades particulares o un grupo
     de funcionalidades relacionadas.</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     Cada caso de uso debe completar los posibles escenarios para llevar a
     cabo los procesos. Para esclarecer un poco más los casos de uso
     veremos dos ejemplos de cómo actualizar el nombre de usuario en un
     sitio web.</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     Caso de uso: cambiar foto de usuario en sitio web.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Escenario
     1: Cambio de la foto desde la página de perfil.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Escenario
     2: Cambio de la foto desde el panel administrativo en el bloque de
     usuarios.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Actores:</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Administrador.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Usuario
     del sistema.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Recorrido
     de cada escenario</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Pasos
     necesarios en Escenario 1</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">1.
     Acceso al sitio web usando el usuario del sistema.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">2.
     Acceso a página de perfil.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">3.
     Foto de perfil. Clic en actualizar foto.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">4.
     Selección de archivo. Clic en asignar como foto de perfil.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">5.
     Visualización del perfil con la foto actualizada.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Pasos
     necesarios en Escenario 2</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">1.
     Acceso al sitio web usando el usuario del sistema administrador.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">2.
     Acceso a panel administrativo.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">3.
     Acceso a bloque de usuarios.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">4.
     Clic en el usuario deseado. Clic en editar perfil de usuario.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">5.
     Selección de archivo. Clic en asignar como foto de perfil.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">6.
     Visualización del perfil con la foto actualizada.</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     Como podemos observar en el ejemplo anterior siempre existen
     diferentes formas de realizar una acción, cada uno de estos posibles
     caminos siguen conformando la idea inicial de cambiar la foto de
     perfil de un usuario del sistema. Con intención de asegurarnos que
     cada paso se ejecuta de forma correcta se deben definir una serie de
     casos de prueba.</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     Casos de prueba</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     [1] “Un caso de prueba específica que probar en el sistema y está
     formado, además del nombre y una descripción opcional, por un
     conjunto de entradas de prueba, de condiciones bajo las que se deben
     realizar las pruebas, y de resultados esperados”.</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     <SPAN STYLE="background: #ffffff">El caso de prueba es un conjunto de
     condiciones o variables bajo las cuales se determina si una
     aplicación, o una característica o funcionalidad es parcial o es
     completa.</SPAN></P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     Los casos de prueba son las condiciones que establecemos a una
     funcionalidad para determinar su correcto funcionamiento, es decir
     que cumpla el resultado esperado basado en los requerimientos. A cada
     uno de estos casos de prueba le debemos definir el contexto de la
     prueba, descripción de las acciones y resultado esperado.</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     Para dar una mayor comprensión al caso de prueba vamos a definir
     algunos casos para los ejemplos establecidos anteriormente.</P>
     <UL>
       <LI><P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
       Acceso al perfil de usuario. Escenario 1</P>
     </UL>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Contexto:
     Comprobación de correcto acceso a la información del usuario desde
     el bloque perfil del usuario mediante internet.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Acción:
     Clic en perfil de usuario desde el menú en la cabecera del sitio
     web.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Resultado
     esperado:  El sistema permite acceder a la información del usuario
     correctamente mediante cualquier usuario del sistema.</P>
     <UL>
       <LI><P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">
       Acceso al perfil de usuario. Escenario 2</P>
     </UL>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Contexto:
     Comprobación de correcto acceso a la información del usuario desde
     el bloque perfil del usuario mediante internet.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Acción:
     Clic en el bloque de usuarios en el panel administrativo.</P>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in">Resultado
     esperado:  El sistema permite acceder a la información del usuario
     correctamente mediante el usuario administrador.</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     Para finalizar debemos tener claro que los casos de uso nacen para
     detallar funcionalidades del sistema y los casos de prueba son
     aquellas condiciones que se encargan de verificar el correcto
     funcionamiento de los casos de uso, así como verificar los pasos
     para completar la acción, llegando a un resultado esperado.</P>
     <P CLASS="western" STYLE="margin-left: 0in; text-indent: 0in; margin-top: 0.19in; margin-bottom: 0.19in">
     A Continuación, daremos un breve ejemplo de la información que debe
     contener un caso de prueba, pero no te preocupes en próximas
     lecciones se profundizará en la documentación de los casos de
     prueba.</P>
     <H3 CLASS="western"><A NAME="_heading=h.alxpifasn0zx"></A>Ejemplo</H3>
     <TABLE WIDTH=589 CELLPADDING=5 CELLSPACING=0>
       <COL WIDTH=101>
       <COL WIDTH=466>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=40 BGCOLOR="#ffffff" STYLE="border-top: 1.00pt solid #000001; border-bottom: none; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0.07in; padding-bottom: 0in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" ALIGN=CENTER STYLE="margin-top: 0.17in"><FONT SIZE=2>ID</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: 1.00pt solid #000001; border-bottom: none; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding-top: 0.07in; padding-bottom: 0in; padding-left: 0.06in; padding-right: 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Cada
           caso de prueba debe tener un identificador (código) único.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=24 BGCOLOR="#ffffff" STYLE="border-top: 2.25pt solid #000001; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0.07in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Casos
           de prueba</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border: 2.25pt solid #000001; padding: 0.07in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Título
           descriptivo del caso de prueba.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=38 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0in; padding-bottom: 0in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Descripción</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding: 0in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Descripción
           del caso de prueba, indicando sus elementos, funcionalidades y
           acciones a ser ejercidas en el caso de prueba.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=24 BGCOLOR="#ffffff" STYLE="border-top: 2.25pt solid #000001; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0.07in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Fecha</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border: 2.25pt solid #000001; padding: 0.07in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Fecha
           en que fue creado el caso de prueba.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=71 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0in; padding-bottom: 0in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Área
           Funcional / Sub proceso</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding: 0in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Describe
           el área funcional, subproceso o modulo al que está asociado el
           caso de prueba. La intención es poder dividir los casos de prueba
           según la estructura jerárquica funcional del sistema que se está
           probando y los procesos que este soporta.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=54 BGCOLOR="#ffffff" STYLE="border-top: 2.25pt solid #000001; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0.07in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Funcionalidad
           / Característica</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border: 2.25pt solid #000001; padding: 0.07in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Describe
           el título de la característica o funcionalidad que se está
           probando. Por ej. Suscripción al Servicio, Entrega de Orden,
           Selección de Producto, Consulta de Órdenes Pendientes.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=66 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0in; padding-bottom: 0in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Datos /
           Acciones de Entrada</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding: 0in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Se
           especifica cada entrada que se requiere para ejecutar el caso de
           prueba. Etas entradas pueden ser valores o datos de entrada, y
           también acciones (por ejemplo presionar un botón). Deben
           identificarse los archivos o bases de datos involucrados.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=38 BGCOLOR="#ffffff" STYLE="border-top: 2.25pt solid #000001; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0.07in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Resultado
           Esperado</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border: 2.25pt solid #000001; padding: 0.07in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Se
           especifica la salida que se espera de la ejecución de los casos
           de prueba con las entradas indicadas.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=71 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0in; padding-bottom: 0in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Requerimientos
           de Ambiente de Pruebas</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding: 0in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Cualquier
           especificación del hardware y software especial requerido para
           ejecutar el caso de prueba, que no sea común a todos los casos.
           Las que sean comunes a todos los casos se deben especificar en la
           sección de Entornos del Plan de Pruebas de Software.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=54 BGCOLOR="#ffffff" STYLE="border-top: 2.25pt solid #000001; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0.07in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Procedimientos
           especiales requeridos</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border: 2.25pt solid #000001; padding: 0.07in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Se
           describen cualquier restricción o condicionamiento en los
           procedimientos de prueba asociados a cada caso.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=54 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: 1.00pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Dependencias
           con otros casos de Prueba</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding-top: 0in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Lista
           de los identificadores de los casos de prueba que deben ejecutarse
           antes de este caso. También puede incluir un sumario de la
           naturaleza de estas dependencias.</FONT></P>
         </TD>
       </TR>
       <TR>
         <TD COLSPAN=2 WIDTH=577 HEIGHT=24 VALIGN=TOP BGCOLOR="#d9d9d9" STYLE="border-top: none; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding-top: 0in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0.06in">
           <P CLASS="western" ALIGN=CENTER STYLE="margin-top: 0.17in"><FONT SIZE=2><B>Información
           para el seguimiento</B></FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=54 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0in; padding-bottom: 0in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Resultado
           Obtenido</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: none; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding: 0in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Se
           describe el resultado real obtenido de la ejecución del caso de
           prueba (Este es una columna de seguimiento). Si esta difiere del
           resultado esperado, debería especificarse en un reporte de
           incidencia.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=24 BGCOLOR="#ffffff" STYLE="border-top: 2.25pt solid #000001; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0.07in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Estado</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border: 2.25pt solid #000001; padding: 0.07in 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Estado
           actual del caso de prueba.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=38 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Última
           Fecha de Estado</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding-top: 0in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Última
           fecha en que se ejecutó una acción referente al caso o que este
           cambio de estado.</FONT></P>
         </TD>
       </TR>
       <TR></TR>
       <TR VALIGN=TOP>
         <TD WIDTH=101 HEIGHT=37 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: none; padding-top: 0in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Observaciones</FONT></P>
         </TD>
         <TD WIDTH=466 BGCOLOR="#ffffff" STYLE="border-top: none; border-bottom: 2.25pt solid #000001; border-left: 2.25pt solid #000001; border-right: 2.25pt solid #000001; padding-top: 0in; padding-bottom: 0.07in; padding-left: 0.06in; padding-right: 0.06in">
           <P CLASS="western" STYLE="margin-top: 0.17in"><FONT SIZE=2>Observaciones
           relacionadas con la ejecución de los casos y de los resultados
           que se obtuvieron.</FONT></P>
         </TD>
       </TR>
     </TABLE>
     <P CLASS="western" STYLE="margin-top: 0.19in; margin-bottom: 0.19in"><BR><BR>
     </P>
`,
        },
      ],
      practica: {},
      aplica: {},
      retroalimentacion: {},
    },
  };

  constructor() {}

  public get() {
    return this.leccion;
  }
}
