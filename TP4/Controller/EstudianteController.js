import  express from 'express';
var router = express.Router();
import estudianteDAO from '../DAO/EstudianteDAO.js';
import Response from '../Model/Response.js';
import EnumResponse from '../Helper/EnumResponse.js';
import Estudiante from '../Model/Estudiante.js';
router.get('/', function(req, res, next) {
    res.send('sas ');
});

var callback = {mensaje : "",error : false}
var response;
  router.get('/', (req, res) => {
    res.send("Test Ok");
  });
  router.route('/GetByAge')
  .get(function(req, res) {
      let minAge =  req.query.minAge;
      let maxAge = req.query.maxAge;
      try {
        let result = estudianteDAO.GetByAge(minAge,maxAge,callback);
        if (result == undefined) {
            result = null;
        }
        if (callback.error) {
          response = new Response.Response(true, EnumResponse.RES_402, callback.mensaje, null);
        }else{
          response = new Response.Response(false, EnumResponse.RES_200, null, result);
        }
      } catch (error) {
        response = new Response.Response(true, EnumResponse.RES_500, error.message, null);
      }
      res.send(response);
  })
  router.route('/GetByDni')
  .get(function(req, res) {
      let dni =  req.query.dni;
      try {
        let result = estudianteDAO.GetByDni(dni,callback);
        if (result == undefined ) {
            result = null;
        }
        if (callback.error) {
          response = new Response.Response(true, EnumResponse.RES_402, callback.mensaje, null);
        }else{
          response = new Response.Response(false, EnumResponse.RES_200, null, result);
        }
      } catch (error) {
        response = new Response.Response(true, EnumResponse.RES_500, error.message, null);
      }
      res.send(response);
  })
  router.route('/GetAll')
  .get(function(req, res) {
    try {
      let result = estudianteDAO.GetAll(callback);
      if (callback.error) {
        response = new Response.Response(true, EnumResponse.RES_402, callback.mensaje, null);
      }else{
        response = new Response.Response(false, EnumResponse.RES_200, null, result);
      }
    } catch (error) {
      response = new Response.Response(true, EnumResponse.RES_500, error.message, null);
    }
    res.send(response);
  })
  router.route('/')
  .post(function(req, res) {
    let estudiante;
    try {
      estudiante= new Estudiante.Estudiante(req.body.nombre,req.body.apellido,req.body.edad,req.body.dni);
    } catch (error) {
      response = new Response.Response(true, EnumResponse.RES_402, error.message, null);
      res.send(response);
      return false;
    }
    try {
        estudianteDAO.AddEstudiante(estudiante, callback);
        if (callback.error) {
          response = new Response.Response(true, EnumResponse.RES_402, callback.mensaje, null);
        }else{
          response = new Response.Response(false, EnumResponse.RES_200, null, null);
        }
    } catch (error) {
      response = new Response.Response(true, EnumResponse.RES_500, error.message, null);
    }
    res.send(response);
  })
  .put(function(req, res) {
    try {
      let estudiante = new Estudiante.Estudiante(req.body.nombre,req.body.apellido,req.body.edad,req.body.dni,req.body.id);
      estudianteDAO.Update(estudiante,callback);
      if (callback.error) {
        response = new Response.Response(true, EnumResponse.RES_402, callback.mensaje, null);
      }else{
        response = new Response.Response(false, EnumResponse.RES_200, null, null);
      }
    } catch (error) {
        response = new Response.Response(true,EnumResponse.RES_500,error.message,null);
    }
    res.send(response);
  })
  .delete(function (req, res) {
    let id =  req.query.id;
    try {
      estudianteDAO.Delete(id,callback)
      if (callback.error) {
        response = new Response.Response(true, EnumResponse.RES_402, callback.mensaje, null);
      }else{
        response = new Response.Response(false, EnumResponse.RES_200, null, null);
      }
    } catch (error) {
        response = new Response.Response(true,EnumResponse.RES_500,error.message,null);
    }
    res.send(response);
  });



export { router as router }


  

