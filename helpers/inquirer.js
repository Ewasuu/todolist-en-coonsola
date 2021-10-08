const inquirer = require('inquirer')
require('colors')

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: '1',
                name: `${'1.'.green} Crear tareas`
            },
            {
                value: '2',
                name: `${'2.'.green} Listar tareas` 
            },
            {
                value: '3',
                name: `${'3.'.green} Listar tareas completadas`
            },
            {
                value: '4',
                name: `${'4.'.green} Listar tareas pendientes`
            },
            {
                value: '5',
                name: `${'5.'.green} Completar tareas`
            },
            {
                value: '6',
                name: `${'6.'.green} Borrar una tarea`
            },
            {
                value: '0',
                name: `${'0.'.green} Salir \n\n`
            }
        ]
    }
]


const inquirerMenu = async () => {

    console.clear()
    console.log('========================================='.green)
    console.log('Escoge una opcion'.green)
    console.log('========================================='.green)

    const { opcion } = await inquirer.prompt(preguntas)
    return opcion

}

const pausa = async () => {
    const inputPaused = [
        {
            type: 'input',
            name: 'inputPause',
            message: `Presione ${'ENTER'.green} para continuar`
        } 
    ]

    await inquirer.prompt(inputPaused)
}

const leerInput = async (message) =>{
    const question = {
        type: 'input',
        name: 'desc',
        message,
        validate(value){
            if (value.length === 0) throw 'Por favor complete el campo'
            return true
        }
    }

    const { desc } = await inquirer.prompt(question)
    return desc
}
const borrarListadoTareas = async ({tareas = []}) =>{

    const choices = tareas.map( (tarea, i) => {


        return{
            value: i,
            name: `${`${i+1}`.brightGreen}. ${tarea.desc} \n`
        }
    })
    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const { id } = await inquirer.prompt(preguntas)
    return id
}

const mostrarCheckList = async ({tareas = []}) =>{

    const choices = tareas.map( (tarea, i) => {


        return{
            value: i,
            name: `${`${i+1}`.brightGreen}. ${tarea.desc} \n`
        }
    })
    const preguntas = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Borrar',
            choices
        }
    ]
    const { ids } = await inquirer.prompt(preguntas)
    return ids
}

const confirmar = async ({ mensaje }) => {
    const pregunta = {
        type: 'confirm',
        name: 'confirmacion',
        message: mensaje
    }

    const { confirmacion } = await inquirer.prompt(pregunta)
    return confirmacion
}

module.exports = {
    inquirerMenu, 
    pausa,
    leerInput,
    borrarListadoTareas,
    confirmar,
    mostrarCheckList
}