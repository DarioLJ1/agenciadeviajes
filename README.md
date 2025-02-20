Agencia de Viajes

Descripción:
Este proyecto es una plataforma digital para la gestión de una agencia de viajes. Permite a los usuarios explorar destinos,
agregar sus testimonios y encontrar su viaje deseado escribiendo en el filtro el nombre del destino o la fecha...

Mejora Realizada:
He añadido un filtro en la parte de viajes donde escribiendo el nombre del destino o introduciendo la fecha de inicio o la fecha de fin, fitra
el viaje disponible para esa fecha.
En la parte de los viajes, el viaje que cumpla con los requisitos aparecera con un borde rojo, ademas los viajes que no cumplan los requisitos desaparecerán

Explicación Código:
El código solo se ejecuta cuando la página ha terminado de cargarse completamente.
Formulario de búsqueda
Selecciono el contenedor donde se muestran los resultados
Obtengo el botón de búsqueda
Almaceno una lista de todos los viajes
Con el evento click obtengo:
Los valores ingresados en los campos de destino, fecha de inicio y fecha de fin.
Filtrado de Viajes:
Recorro todos los viajes originales y evalúa si cumplen con los criterios ingresados
Destino: Si está vacío, muestro todos los viajes.
Fechas: Verifico si el viaje está dentro del rango ingresado.
Si el viaje cumple con los criterios lo muestro y lo añado a la clase "destacado".
Si no cumple, lo oculto con la clase "oculto".
Cuento la cantidad de viajes encontrados.
Para el mensaje "no se encontraron resultados" :
Si no encuentro ningún viaje añado un mensaje indicando que no hay coincidencias.

Otra modificación:

He añadio dos botones para editar y eliminar testimonios, para darle mas uso a la base de datos.
