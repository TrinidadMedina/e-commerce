/* IMAGEN:

ver los productos totales con los filtros que se hayan implementado

Envío de un email y un mensaje de whatsapp al administrador desde el servidor, a un número de contacto almacenado en una constante global.

El usuario iniciará la acción de pedido en la vista del carrito.
Será enviado una vez finalizada la elección para la realizar la compra de productos.
El email contendrá en su cuerpo la lista completa de productos a comprar y en el asunto la frase 'nuevo pedido de ' y el nombre y email del usuario que los solicitó. 
En el mensaje de whatsapp se debe enviar la misma información del asunto del email.

El usuario recibirá un mensaje de texto al número que haya registrado, indicando que su pedido ha sido recibido y se encuentra en proceso.

en la nube a través de la plataforma PaaS Heroku.
Habilitar el modo cluster para el servidor, como opcional a través de una constante global.

Utilizar alguno de los loggers ya vistos y así reemplazar todos los mensajes a consola por logs eficientes hacia la misma consola. En el caso de errores moderados ó graves el log tendrá además como destino un archivo elegido.
Realizar una prueba de performance en modo local, con y sin cluster, utilizando Artillery en el endpoint del listado de productos (con el usuario vez logueado). Verificar los resultados.
 */