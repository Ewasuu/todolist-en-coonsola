const Tarea = require("./tarea")
require('colors')

class Tareas {
    
    _listado = {}

    get listadoArr(){

        const listado = []

        Object.keys(this._listado).forEach( key => listado.push(this._listado[key]))

        return listado
    }

    constructor(){
        this._listado = {}
    }

    cargarTareasFromArray(tareas = []){
        Object.assign(this._listado, tareas)
    }

    crearTarea(desc = '') {

        const tarea = new Tarea(desc)

        this._listado[tarea.id] = tarea

    }

    listadoCompleto(){
        this.listadoArr.forEach( (tarea, i) => {
            tarea.terminadoEn? console.log(` ${`${i + 1}`.brightGreen}. ${`${tarea.desc}`.white}:: ${'Completada'.brightGreen} \n`) : console.log(` ${`${i + 1}`.brightGreen}. ${`${tarea.desc}`.white}:: ${'Pendiente'.brightRed} \n`)
        })
    }
    
    listarPendientesCompletadas({ completado }){
        let contador = 0

        if (completado) {
            this.listadoArr.forEach( (tarea) => {
                if (tarea.terminadoEn){
                    contador++
                    console.log(` ${`${contador}`.brightGreen}. ${`${tarea.desc}`.white}:: ${tarea.terminadoEn} \n`)
                }  
            })
        }else{
            this.listadoArr.forEach( (tarea) => {
                if (!tarea.terminadoEn){
                    contador++
                    console.log(` ${`${contador}`.brightRed}. ${`${tarea.desc}`.white} \n`)
                }  
            })
        }
    }

    completarTarea(ids = []){
        ids.forEach(id => {
            const tarea = this._listado[id]
            if (!tarea.terminadoEn) {
                tarea.terminadoEn = new Date().toISOString()
            }else{
                tarea.terminadoEn = null
            }
        })
    }

    borrarTarea(id = ''){
        if (this._listado[id]) {
            delete this._listado[id]
        }
    }
}

module.exports = Tareas