require('colors')
const { escribirDB, leerDB } = require('./helpers/guardararchivo')
const { 
    inquirerMenu, 
    pausa, 
    leerInput, 
    borrarListadoTareas,
    confirmar, 
    mostrarCheckList
} = require('./helpers/inquirer')
const Tareas = require('./models/tareas')

const main = async () => {
    console.clear()
    
    let opt = ''
    const tareas = new Tareas()
    const tareasDB = leerDB()
    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }


    do{
        opt = await inquirerMenu()
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion:')
                tareas.crearTarea(desc)
               break;
            case '2':
                tareas.listadoCompleto()
                break;
            case '3':
                tareas.listarPendientesCompletadas({completado: true})
                break;
            case '4':
                tareas.listarPendientesCompletadas({completado: false})
                break;
            case '5':
                const ids = await mostrarCheckList({tareas: tareas.listadoArr})
                const ok = await confirmar({mensaje: '¿Estas seguro que culminaste estas tareas?'})
                if (ok) {
                    tareas.completarTarea(ids)
                    console.log('Se han completado las tareas')
                }
                break;
            case '6':
                const id = await borrarListadoTareas({tareas: tareas.listadoArr})
                const confirmacion = await confirmar({mensaje: '¿Estas seguro que deseas borrar esta tarea?'})
                if (confirmacion) {
                    tareas.borrarTarea(id)
                    console.log('Se ha borrado la tarea')
                }
                break;
        }

        escribirDB(tareas.listadoArr)
        opt !== '0'?  await pausa() : console.clear()

    }while(opt !== '0')

}

main()