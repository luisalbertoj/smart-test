import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { QuestionBase } from 'src/app/models/question-base';
import { QuestionService } from 'src/app/services/question.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  lessonTitle = '';
  leccion = {
    codigo: '1.1',
    nombre: '1.1 Fundamentos de pruebas de software',
    slug: '1.1-Fundamentos-de-pruebas-de-software',
    aprender: [
      {
        titulo: '¿Qué es una prueba?',
        contenido: `
        <P STYLE="margin-bottom: 0.11in"><FONT COLOR="#ff0000"><FONT FACE="Arial, serif"><FONT SIZE=3><B>Lección
1.1 Fundamentos de pruebas de software</B></FONT></FONT></FONT></P>
<P STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3><B>¿Qué
es una prueba?</B></FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>El
proceso que consiste en todas las actividades del ciclo de vida,
tanto estáticas como dinámicas relacionadas con la planificación,
preparación y evaluación de productos de software y productos
relacionados con el trabajo para determinar que cumplen los
requisitos especificados, para demostrar que son aptos para el
propósito y para detectar defectos.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Para
terminar de entender las pruebas debemos diferenciar los términos
error, fallo y defecto. Estos conceptos están relacionados entre si,
pero tienen significados diferentes.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in">“<FONT FACE="Arial, serif"><FONT SIZE=3>Una
persona puede cometer un </FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>error</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>
que a su vez puede producir un </FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>defecto</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>
en el código de programa o en un documento. Si se ejecuta un defecto
en el código, el sistema puede no hacer lo que debiera (o hacer algo
que no debiera), lo que provocaría un </FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>fallo</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>”</FONT></FONT></P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3><U>Error:</U></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>
	está provocado por la acción humana, por ejemplo el error lo
	provocará el desarrollador que realizará una incorrecta
	interpretación de un método del programa que producirá un
	resultado no esperado.</FONT></FONT></P>
	<LI><P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3><U>Defecto:</U></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>
	provocado por un error de implementación, por ejemplo el defecto lo
	provocará el haber utilizado el operador “x + y &gt; z” en vez
	de “x + y =&gt; z”</FONT></FONT></P>
	<LI><P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3><U>Fallo:</U></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>
	al ejecutar el programa con un defecto obtendremos resultados no
	deseados, por ejemplo, cuando el resultado de la suma de los dos
	componentes fuese igual, no obtendríamos los mismos resultados al
	compararlos con las sentencias indicadas anteriormente. En sistemas
	muy complejos, como pueden ser una lanzadera espacial o una central
	eléctrica, pueden llegar a producir efectos catastróficos.</FONT></FONT></P>
</UL>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3><B>Importancia
de las pruebas de software</B></FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Hoy
en día, forman parte de nuestras vidas multitud de sistemas que
contienen software, como por ejemplo los coches, smartphones,
sistemas de producción de energía, programas bancarios, etc.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Para
entender la importancia de las pruebas de software es importante
saber un poco de historia, en las cuales no se han podido completar
los objetivos por no hacer previamente pruebas.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
        `,
      },
      {
        titulo: 'Historia',
        contenido: `
        <P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3><B>Historia</B></FONT></FONT></P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>El
	lanzamiento de la lanzadera Ariane-5 vuelo 501 (</FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>1996</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>)</FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>
	</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>fue
	considerado uno de los fallos de programación más caros de la
	historia hasta ese momento, sólo la carga que llevaba tenía un
	valor de 500 millones de dólares. Fue un cohete lanzado por la ESA
	(European Space Agency’s o agencia espacial europea) destruido
	aproximadamente a los 40 segundos de ser lanzado.</FONT></FONT>
	<FONT FACE="Arial, serif"><FONT SIZE=3>Según el informe de la ESA
	[WEB04], el fallo de la Ariane</FONT></FONT></P>
</UL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>501
fue causado por la completa pérdida de guía e información de
orientación treinta y siete segundos después del comienzo de la
secuencia de ignición del motor principal. Esta pérdida de
información se debió a errores de especificación y diseño en el
software del sistema de referencia inercial. Las extensas revisiones
y test llevados a cabo durante el programa de desarrollo del Ariane-5
no incluyeron el adecuado análisis y prueba del sistema de
referencia inercial o del sistema de control de vuelo completo, lo
cual podría haber detectado los fallos potenciales.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-bottom: 0.11in"><BR><BR>
</P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>El
	lanzamiento de la sonda Mariner 1 de la NASA (</FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>1962</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>),
	tuvo que ser abortado por un fallo de software que afectaba a la
	trayectoria del cohete. El cohete fue destruido antes de que soltara
	la sonda que transportaba, ya que corría peligro de estrellarse en
	las rutas marítimas del atlántico norte. El coste aproximado del
	proyecto de la sonda Mariner 1 fue de 554 millones de dólares.</FONT></FONT></P>
</UL>
<P ALIGN=JUSTIFY STYLE="margin-left: 0.5in; margin-bottom: 0.11in"><BR><BR>
</P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Therac
	25, una máquina de radioterapia producida por la Atomic Energy of
	Canada Limited (AECL) en </FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>1985</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>,
	fue la causante de la muerte de tres personas directamente y otras
	tres sufrieron graves daños por la administración de sobredosis
	masivas de radiación. Una de las razones de que se produjera esta
	sobredosis fue un mal diseño del software, el código fuente no
	había sido revisado de forma independiente.</FONT></FONT></P>
</UL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0.11in"><BR><BR>
</P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Thomas
	Nicely, de la Universidad de Lynchburg, descubrió un error en la
	unidad de coma flotante del Pentium en </FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>1994</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>.
	El divisor en la unidad de coma flotante contaba con una tabla de
	división incorrecta, donde faltaban cinco entradas sobre mil, que
	provocaba errores de redondeo. Aunque el error afectaba a pocos
	usuarios, este hecho hizo mucho daño a la imagen de Pentium y el
	costo total fue de 475 millones de dólares. Finalmente reemplazó
	los chips de todos los usuarios que lo solicitaron.</FONT></FONT></P>
</UL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0.11in"><BR><BR>
</P>
<UL>
	<LI><P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>En
	otoño de </FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3><B>1994</B></FONT></FONT><FONT FACE="Arial, serif"><FONT SIZE=3>,
	la compañía Disney lanzó su primer juego multimedia en formato
	CD-ROM. Las ventas fueron enormes ya que fue uno de los juegos más
	comprados la navidad de ese año. El 26 de diciembre, el
	departamento de atención al cliente de Disney se vio desbordado por
	las llamadas de un gran número de usuarios descontentos que habían
	comprado el juego. Resulta que Disney no realizó pruebas en los
	diferentes modelos de PC disponibles en el mercado. Solo se
	realizaron pruebas sobre los PC que utilizaban los desarrolladores.</FONT></FONT></P>
</UL>
<P STYLE="margin-left: 0.5in; margin-bottom: 0.11in"><BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Como
se puede apreciar en los ejemplos anteriores, no probar adecuadamente
el software, antes de ponerlo en producción, puede producir no sólo
pérdidas económicas, sino también daños personales, llegando
incluso a producir la muerte en algunos casos.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Hoy
el funcionamiento de casi todas las empresas depende en gran medida
del software, ya sea por el sistema de finanzas de dicha empresa o
por la maquinaria que lleva a cabo la fabricación de los productos,
por lo que las empresas dependen del funcionamiento del software y de
que éste pueda llegar a causar grandes fallos como los mencionados
anteriormente que llevan a la pérdida de miles de millones de euros.
No a todas las empresas les afectan de la misma manera los fallos
producidos en el software, por lo que tenemos que evaluar los riesgos
de éste, ya que pueden llegar a producir pérdidas irreparables.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3><B>Objetivo
principal de las pruebas de software</B></FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Aportar
calidad al producto que se está desarrollando.</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3><B>Principio
de Pareto “Regla del 80/20”</B></FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><FONT FACE="Arial, serif"><FONT SIZE=3>Es
uno de los principios que se suelen aplicar a la hora de realizar las
pruebas, este principio dice:</FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in">“<FONT FACE="Arial, serif"><FONT SIZE=3><I>El
80% de los fallos de un software es generado por un 20% del código
de dicho software, mientras que el otro 80% genera tan solo un 20% de
los fallos”</I></FONT></FONT></P>
<P ALIGN=JUSTIFY STYLE="margin-bottom: 0.11in"><BR><BR>
</P>
        `,
      },
    ],
    practicar: [
      {
        titulo: 'Actividad 1',
        contenido: ``,
      },
      {
        titulo: 'Actividad 2',
        contenido: ``,
      },
      {
        titulo: 'Actividad 3',
        contenido: ``,
      },
      {
        titulo: 'Actividad 4',
        contenido: ``,
      },
    ],
    aplicar: [
      {
        titulo: 'Aplicar 1',
        contenido: `
        <label for="w3review">Review of W3Schools:</label>
        <input type="text">
        `,
      },
    ],
  };
  activeLink = this.leccion.aprender[0];

  questions$: Observable<QuestionBase<any>[]>;

  constructor(service: QuestionService) {
    this.lessonTitle = localStorage.getItem('lesson-selected');
    this.questions$ = service.getQuestions();
  }

  ngOnInit(): void {}
  guardar() {
	  Swal.fire('Ok', 'Respuestas Guardadas', 'success');
  }
}
