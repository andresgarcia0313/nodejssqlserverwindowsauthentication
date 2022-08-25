const mssql = require('mssql/msnodesqlv8')//Agregar librerias realizadas
const db = new mssql.ConnectionPool({//Crear variable de agrupamiento de conexiones ver https://es.wikipedia.org/wiki/Connection_pool
    database: 'master', server: 'KUP\\SQLEXPRESS', driver: 'msnodesqlv8', options: { trustedConnection: true }
})//Autenticación de windows o con el usuario de windows actual sin necesidad de contraseñas
async function execute() { //Función asincronica
    await db.connect();//espere a que se logre la conexión
    let sqls = [];//Cree array para almacenar promesas o variables que almacenaran información en un futuro
    let query1='select 1234 as Columna1';//Crear consulta 1
    let query2='select 2 as Col2';//Crear consulta 2
    sqls.push(db.request().query(query1));//Ejecute sql y no espere resultados y continue con el codigo
    sqls.push(db.request().query(query2));//Ejecute sql y no espere resultados y continue con el codigo
    console.log("Registro 1->Columna1:"+((await sqls[0]).recordset[0].Columna1));//Esperar la respuesta de sql de una unica consulta
    let results = await Promise.all(sqls);//Espere que finalice todas las consultas sql antes de continuar
    for (let result of results) console.log(result.recordset); //Mostrar datos de todas las consultas
    db.close();//cierre la unica conexión que se abrio para todas las consultas 
}
execute();//Inicia la ejecución de código