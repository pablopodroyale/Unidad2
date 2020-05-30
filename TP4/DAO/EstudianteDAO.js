// import fs from 'fs';
import fs from "fs"
import util from 'util'
import config from '../Helper/Config.js'
import FunctionHelper from '../Helper/FunctionHelper.js'
import path from 'path';
import { get } from "http";

 function AddEstudiante (estudiante,callback) {
    let result = true;
    estudiante.setId(FunctionHelper.GenerateId());
    //Transformar el estudiante en objeto
    //Pasarlo a Json
    //Guardarlo en el path Estudiantes.js
    let estudiantesToSave = [];
    let estudiantesFromdb = getAll();
    if (estudiantesFromdb != "") {
        let  estudiantesFromDb = JSON.parse(estudiantesFromdb);
        if (estudiantesFromDb != undefined) {
            for (let index = 0; index < estudiantesFromDb.length; index++) {
                let element = estudiantesFromDb[index];
                estudiantesToSave.push(element);
            }
        }
    }
    //Si no existe el estduiante por dni lo guardo
    if (estudiantesToSave.filter(e => e.dni === estudiante.dni).length == 0) {
        estudiantesToSave.push(estudiante);
        try {
            saveEstudiantes(estudiantesToSave);
        } catch (error) {
            callback.error = true;
            callback.mensaje = "Error de conexion";
        }
    }else{
        callback.error = true;
        callback.mensaje = "Error, Estudiante ya existe";
    }
}
 function getAll() {
    // return  new Promise((resolve, reject) => {
    //     fs.readFile(config.PATH_ESTUDIANTES_FILE_DB, 'utf8', function (err, data) {
    //       if (err) {
    //         reject(err);
    //       }
    //       resolve(data);
    //     });
    //   });
    return fs.readFileSync(config.PATH_ESTUDIANTES_FILE_DB, 'utf8');
}

function saveEstudiantes(estudiantesToSave,mensaje) {
    estudiantesToSave = JSON.stringify(estudiantesToSave);
        fs.writeFile(config.PATH_ESTUDIANTES_FILE_DB, estudiantesToSave, 'utf8', function (err) {
            if (err) {
                mensaje.mensaje = err.message;
                throw new Error(err);
            }
        });
}


function GetAll(callback){
    let result =[];
    let estudiantesFromDb;
    try {
         estudiantesFromDb =getAll();
        if (estudiantesFromDb != "") {
            estudiantesFromDb = JSON.parse(estudiantesFromDb);
            result = estudiantesFromDb;
        }else{
            callback.mensaje = "No se encontraron resultados";
        }
    } catch (error) {
        callback.error = true;
        callback.mensaje = error.message;
    }
    
   return result;
}

function GetByAge(minAge,maxAge,callback) {
    let result = [];
    let estudiantesFromDb;
    if (minAge == undefined || maxAge == undefined) {
        result = null;
        callback.error = true;
        callback.mensaje = "Error, parametros vacios";
     }else{
        try {
            estudiantesFromDb = getAll();
           if (estudiantesFromDb != "") {
               estudiantesFromDb = JSON.parse(estudiantesFromDb);
               result = estudiantesFromDb.filter(e => (parseInt(e.edad) >= parseInt( minAge)) && (parseInt(e.edad) <= parseInt(maxAge)));
            //    result = estudiantesFromDb;
           }else{
               callback.mensaje = "No se encontraron resultados";
           }
       } catch (error) {
           callback.error = true;
           callback.mensaje = error.message;
       }
     }
   
    return result;
}

function GetByDni(dni, callback) {
    let result = [];
    if (dni == undefined) {
       result = null;
       callback.error = true;
       callback.mensaje = "Error, dni vacio";
    }else{
        let estudiantesFromDb;
        try {
            estudiantesFromDb = getAll();

           if (estudiantesFromDb != "") {
               estudiantesFromDb = JSON.parse(estudiantesFromDb);
               estudiantesFromDb = estudiantesFromDb.find(e =>e.dni === dni);
               result = estudiantesFromDb;
           }else{
               callback.mensaje = "No se encontraron resultados";
           }
       } catch (error) {
           callback.error = true;
           callback.mensaje = error.message;
       }
    }
    
    return result;
}

function Update(estudiante,callback) {
    let result = true;
    let estudiantesFromDb = getAll();
    let estudianteToUpdate;
    if (estudiantesFromDb != "") {
      //Parsear la lista   
      estudiantesFromDb = JSON.parse(estudiantesFromDb);
      //Buscar el estudiante
      estudianteToUpdate = estudiantesFromDb.find(e =>e.id === estudiante.getId());
      if (estudianteToUpdate != undefined) {
          //Setearle el estudiante que viene
          estudianteToUpdate = estudiante;
        //Filtrar los estudiantes
          let estudiantesSinSeleccionado = estudiantesFromDb.filter(e => e.id != estudiante.getId());
          estudiantesSinSeleccionado.push(estudianteToUpdate);
          try {
            saveEstudiantes(estudiantesSinSeleccionado);
            callback.mensaje ="Estudiante actualizado";
            callback.error = false;
        } catch (error) {
            result = false;
            callback.error = true;
            callback.mensaje = "Error de conexion";
        }
      }
      else{
            callback.error = true;
          callback.mensaje = "Error,Estudiante inexistente";
      }
    }
    return result;
}

function Delete(id,callback) {
    // let result = true;
    let estudiantesFromDb = getAll();
    if (estudiantesFromDb != "") {
      //Parsear la lista  
      estudiantesFromDb = JSON.parse(estudiantesFromDb);
      if ( estudiantesFromDb.find(e => e.id === id) != undefined) {
      
        let estudiantesSinSeleccionado = estudiantesFromDb.filter(e => e.id != id);
        try {
            saveEstudiantes(estudiantesSinSeleccionado);
            callback.mensaje = "Estudiante eliminado";
            callback.error = false;
        } catch (error) {
            callback.error = true;
            callback.mensaje = "Error de conexion";
        }
      }else{
        callback.error = true;
        callback.mensaje = "Estudiante inexistente";
      }
     
    }else{
        callback.error = true;
        callback.mensaje = "Error,Estudiante inexistente";
    }
}

export default  
{
    AddEstudiante,
    GetAll,
    GetByAge,
    GetByDni,
    Update,
    Delete
}