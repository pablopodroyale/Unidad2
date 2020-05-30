import request from 'request-promise-native'
import routePath from '../../TP4/Helper/EnumRoutes.js';
import Estudiante from '../../TP4/Model/Estudiante.js';

const crearCliente = (serverUrl,port) => {
    let estModel;
    const apiPath = routePath.ROUTE_ESTUDIANTE; 
    const resourceUri =  serverUrl + port  + apiPath;

    const crearEstudiante = async(estudiante) =>{
        const postOptions = {
            method : 'POST',
            uri : resourceUri,
            json : true,
            body : null
        }

        if (estudiante) {
            // estModel = new Estudiante.Estudiante(estudiante.nombre,estudiante.apellido,estudiante.edad,estudiante.dni);
            var body = {
                'nombre': estudiante.nombre,
                'apellido': estudiante.apellido,
                'edad': estudiante.edad,
                'dni': estudiante.dni
            };
            postOptions.body = body
        }
        return await request(postOptions);
    }

    const GetAll = async() =>{
        
        const getOptions = {
            method : 'GET',
            uri : resourceUri + "/GetAll",
            json : true,
        }

        return await request(getOptions);
    }

    const GetByDni = async(dni) =>{
        
        const getOptions = {
            method : 'GET',
            uri : resourceUri + "/GetByDni",
            json : true,
            qs: {
                dni: dni // -> uri + '?dni=54548'
            }
        }

        return await request(getOptions);
    }

    const GetByAge = async(minAge,maxAge) =>{
        
        const getOptions = {
            method : 'GET',
            uri : resourceUri + "/GetByAge",
            json : true,
            qs: {
                minAge: minAge, // -> uri + '?dni=54548',
                maxAge : maxAge
            }
        }

        return await request(getOptions);
    }
    const Update = async(estudiante) =>{
        const postOptions = {
            method : 'PUT',
            uri : resourceUri,
            json : true,
            body : null
        }

        if (estudiante) {
            // estModel = new Estudiante.Estudiante(estudiante.nombre,estudiante.apellido,estudiante.edad,estudiante.dni);
            let body = {
                data : Estudiante
            }
            var jsonDataObj = {
                'nombre': estudiante.nombre,
                'apellido': estudiante.apellido,
                'edad': estudiante.edad,
                'dni': estudiante.dni,
                'id': estudiante.id
            };
            postOptions.body = jsonDataObj
        }
        return await request(postOptions);
    }
    const Delete = async(id) =>{
        const options = {
            method : 'DELETE',
            uri : resourceUri ,
            json : true,
            qs: {
                id: id // -> uri + '?dni=54548'
            }
        }
        return await request(options);
    }

    return {
        crearEstudiante,
        GetAll,
        GetByDni,
        GetByAge,
        Update,
        Delete
    }

}

export default{
    crearCliente
}