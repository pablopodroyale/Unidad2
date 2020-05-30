const ERROR_EMPTY_NAME = "Error, el nombre es obligatorio";
const ERROR_EMPTY_APELLIDO = "Error, el apellido es obligatorio";
const ERROR_EMPTY_EDAD = "Error, la edad es obligatoria";
const ERROR_EMPTY_DNI = "Error, el dni es obligatorio";
const ERROR_EMPTY_ID = "Error, el id es obligatorio";

class Estudiante{
   
    constructor(nombre,apellido,edad,dni,id){
        this.setNombre(nombre);
        this.setApellido(apellido);
        this.setEdad(edad);
        this.setDni(dni);
        this.setId(id);
    }

    setId(id) {
        // if (id === "" || id === null || id === undefined) {
        //     throw new Error(ERROR_EMPTY_ID);
        // }
        this.id = id;
    }

    getId(){
        return this.id;
    }

    setDni(dni) {
        if (dni === "" || dni === null || dni === undefined ) {
            throw new Error(ERROR_EMPTY_DNI);
        }
        this.dni = dni;
    }

    getDni(){
        return this.dni;
    }

    setEdad(edad) {
         if (edad === "" || edad === null || edad === undefined) {
            throw new Error(ERROR_EMPTY_EDAD);
        }
        this.edad = edad;
    }

    setApellido(apellido) {
        if (apellido === "" || apellido === null || apellido === undefined) {
            throw new Error(ERROR_EMPTY_APELLIDO);
        }
        this.apellido = apellido;
    }

    getApellido(){
        return this.apellido;
    }

    setNombre(nombre) {
        if (nombre === "" || nombre === null || nombre === undefined)  {
            throw new Error(ERROR_EMPTY_NAME);
        }
        this.nombre = nombre;
    }
    getNombre(){
        return this.nombre;
    }
}

export default{
    Estudiante
}