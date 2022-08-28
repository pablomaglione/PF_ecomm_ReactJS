Comision 31230 React JS
E-Commerce de Joyeria y Relojeria para proyecto final CoderHouse.
Se muestras los distintos productos(Joyas, Alianzas, Relojes) que tiene el usuario para realizar la compra.

Instalación
Luego de clonar el repositorio, debe instalar la aplicacion mediante "npm install react-app" e iniciarla con "npm start". Se abrira el navegador http://localhost:3000 para su visualizacion.

Dependencias
React
React-Router-DOM
Bootstrap / React Boostrap
React-Hook-Form
Sweetalert2
fortawesome
Firebase.

Descripción del proyecto
El archivo App contiene las rutas del e-commerce.
La carpeta components contiene los componentes utilizados dentro de la app.

Uso de la app
Ingresando a la pagina web, el usuario podra ver todos los productos y hacien click en ver más podrá ver el detalle del mismo, y podrá ingresar la cantidad de productos que quiere, o volver a la pagina de inicio para solicitar otro producto.
Cada producto agregado se ve en el carrito, al que se accede haciendo click en el icono del mismo (arriba a la derecha.)
Para realizar la compra, debe ingresar al carrito, clickar en confirmar compra, y completar el formulario con sus datos.
Desde allí se recibira la orden de compra en la base de firebase, se mostrara el numero de orden generada.
