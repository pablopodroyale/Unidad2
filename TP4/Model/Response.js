/**
 * error, codigo,mensaje,respuesta
 */
class Response{
    constructor(error, codigo, mensaje, respuesta){
        this.error = error;
        this.codigo = codigo;
        this.mensaje = mensaje;
        this.respuesta = respuesta;
    }
}

export default{
    Response
}