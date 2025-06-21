# MOLLY'S Beer House - Website

- Esta web está destinada a la promoción de una cervecería de la ciudad de La Plata. En ella encontraremos las cervezas que se sirven en el bar, las comidas disponibles, una sección de contacto, enlaces a sus redes sociales y un mapa con la dirección del lugar, entre otras cosas.

- El sitio es responsive, accesible e intuitivo.

- La estructura del sitio está creada a partir de HTML semántico para buscar un buen posicionamiento en los buscadores y una mejor accesibilidad para las personas que utilicen lectores en pantalla.

- El uso de CSS busca estetizar la página diferenciando las partes del sitio (contenido, header, footer, etc.) de manera prolija y agradable. Utiliza para ello flexbox, grid y media queries.

- Implementa un menú hamburguesa para pantallas pequeñas mediante CSS y JS.

- La sección de contacto utiliza Formspree para poder redirigir lo ingresado a una cuenta de email. Además, las alertas que corresponden al mismo son estilizadas con sweetalert2.

- La sección de cervezas y favoritos se maneja de manera dinámica mediante JavaScript (vanilla). Las cervezas se obtienen de un JSON estático servido publicamente, se utiliza LocalStorage para persistir los favoritos de manera local, se utiliza async/await para el manejo de operaciones asíncronas y Programación Orientada a Objetos para facilitar el reuso de código y su mantenimiento.

- Se utilizan Unit Tests y Test Doubles para verificar el correcto funcionamiento de los objetos. Estas pruebas se automatizan mediante el framework Jest.

- El deploy del sitio es realizado con GitHub Pages.

- La página web es de software libre bajo la licencia GNU GPL v3.0.

> [!IMPORTANT]
> El sitio está hecho con el fin de demostrar mis habilidades en HTML, CSS y JavaScript.
> No es ni pretende ser el sitio oficial de Molly's.
