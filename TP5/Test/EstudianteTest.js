//Tests
import enumServer from '../../TP4/Helper/EnumServers.js';
import enumPort from '../../TP4/Helper/enumPort.js';
import enumStatus from '../../TP4/Helper/EnumResponse.js';
import factoryServer from '../../TP4/Helper/factoryServer.js';
import crearCliente from './Cliente.js';
import Response from '../../TP4/Model/Response.js';
import util from 'util';
var callback = {mensaje : "",error : false}
const dniPrueba = 7687684764;
const idPrueba = '3d005a0014aafbd13409abd2244a2d70c79f516e';

async function TestCrearEstudianteCompleto(cliente){
    
    // let testFailed = false;
    let response;
    try {
        response =  await cliente.crearEstudiante({
            nombre: 'testPostOk',
            apellido: 'testPostOk',
            edad:'55',
            dni: '5481488'
        })
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
    // let estudiante = new Estudiante.Estudiante('Pablo','Podgaiz',35,31090720);
};

async function TestCrearEstudianteIncompleto(cliente){
    
    // let testFailed = false;
    let response;
    try {
        response =  await cliente.crearEstudiante({
            nombre: 'testnombreIncompleto',
            apellido: 'testApellidoIncompleto',
            edad:'30',
            dni: ''
        })
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
    // let estudiante = new Estudiante.Estudiante('Pablo','Podgaiz',35,31090720);
};


async function TestGetByDni(cliente){
    let response;
    try {
        response =  await cliente.GetByDni(dniPrueba)
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
}
async function TestGetByDniError(cliente){
    let response;
    try {
        response =  await cliente.GetByDni(undefined)
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
}

async function TestGetByAge(cliente){
    const getName = () =>{
        return "TestGetByAge";
    }
    let response;
    try {
        response =  await cliente.GetByAge(10,50);
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
    
}
async function TestGetByAgeError(cliente){
    const getName = () =>{
        return "TestGetByAge";
    }
    let response;
    try {
        response =  await cliente.GetByAge(undefined,undefined);
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
    
}
async function TestGetAll(cliente){
    let response;
    try {
        response =  await cliente.GetAll()
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
}

async function TestUpdateCompleto(cliente){
    
    // let testFailed = false;
    let response;
    try {
        response =  await cliente.Update({
            nombre: 'testPostOkupdate',
            apellido: 'testPostOkupdate',
            edad:'55',
            dni: '7687684764',
            id : idPrueba
        })
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
    // let estudiante = new Estudiante.Estudiante('Pablo','Podgaiz',35,31090720);
};
async function TestDelete(cliente){
    let response;
    try {
        response =  await cliente.Delete(idPrueba)
    } catch (error) {
        response = new Response.Response(true, enumStatus.RES_500, error.message, null);
    }
    return response;
}
async function main() {
    const tests = [
        TestCrearEstudianteCompleto,
        TestCrearEstudianteIncompleto,
        TestGetAll,
        TestGetByDni,
        TestGetByDniError,
        TestGetByDniError,
        TestGetByAge,
        TestGetByAgeError,
        TestUpdateCompleto,
        TestDelete
    ]

    const app = factoryServer.CreateServer(enumServer.EXPRESS);
    const serverUrl = "http://127.0.0.1:";
    const server = app.listen(enumPort.RAND_PORT, async ()=>{
        const actualPort = server.address().port;
        const cli = crearCliente.crearCliente(serverUrl,actualPort);

        let done = 0;
        let passed = 0;
        let errors = 0;

        console.log('Running tests...\n');

        for (const test of tests) {
            // console.log(test.getName());
            const result = await test(cli);
            if (result.codigo != enumStatus.RES_200) {
                console.log(util.inspect(result));
                errors ++;
            }else{
                if (result.respuesta != null) {
                    console.log(util.inspect(result.respuesta));
                }
                passed ++;
            }
            done ++;
        }
        console.log("Done:" + done);
        console.log("Passed:" +passed);
        console.log("Failed:" + errors);
    });
}

export default{
    main
}


