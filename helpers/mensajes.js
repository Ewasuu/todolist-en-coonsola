require('colors')

// First try withou inquire. This file is not important

const mostrarMenu = () => {

    return new Promise( resolve => {

        console.clear()
        console.log('========================================='.green)
        console.log('Escoge una opcion'.green)
        console.log('========================================='.green)
        console.log(` ${'1.'.brightYellow} Crear tareas \n`)
        console.log(` ${'2.'.brightYellow} Listar tareas \n`)
        console.log(` ${'3.'.brightYellow} Listar tareas completadas \n`)
        console.log(` ${'4.'.brightYellow} Listar tareas pendientes \n`)
        console.log(` ${'5.'.brightYellow} Completar tareas \n`)
        console.log(` ${'6.'.brightYellow} Borrar una tarea \n`)
        console.log(` ${'0.'.brightYellow} Salir \n\n`)

        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        readline.question('Escoge una opcion: ', (opt) => {
            readline.close()
            resolve(opt)

        })

    })

}

const pausa = () => {
    return new Promise( resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`Presione ${ 'ENTER'.green }` , (opt) => {
            readline.close()
            resolve()
        })
    })
}

module.exports = {
    mostrarMenu,
    pausa
}