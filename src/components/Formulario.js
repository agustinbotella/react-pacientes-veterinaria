import React, {Fragment, useState} from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crea un state de cita. Es de una cita individual, NO de todo el arreglo.
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        motivo: ''
    })

    //Crea un State de errores al validar el formulario
    const [error, actualizarError] = useState(false);

    //Funcion que se ejecuta cada vez que el usuario escribe en el imput
    const actualizarState = e => {
        //Muestro en consola que y en que campo esta escribiendo el usuario
        console.log('Escribiendo ' + e.target.value +' en ' + e.target.name);
        actualizarCita({
            //Generamos una copia del state cita. Si no lo hacemos, solo vamos a poder reemplazar un elemento del objeto
            //cada vez que se genera onChange
            ...cita,
            [e.target.name] : e.target.value
        });
    }

    //Extraer los valores para no tener que escribir cita.mascota, cita.propietario, etc.
    const {mascota, propietario, fecha, hora, motivo} = cita;

    //Cuando el usuario presiona el boton submit
    const submitCita = e => {
        //Prevenimos la accion por default, que es que mande un query string por el metodo GET.
        //Obligamos a que solo envie el formulario al presionar el boton y no haga otras acciones por default.
        e.preventDefault();

        //Validar
        //Con trim() eliminamos los espacios en blanco al comienzo y al final del string
        if (mascota.trim() === '' || propietario.trim() === '' || fecha.trim() === '' || hora.trim() === '' || motivo.trim() === '') {
            actualizarError(true);
            return;
        }

        //Eliminar el mensaje previo
        actualizarError(false);

        //Asignar el ID (key)
        //Usamos la libreria uuid y le agremamos el elemento 'id'al objeto cita.
        cita.id= uuid();
        console.log(cita);

        //Crear la cita (colocarla en el state principal)
        //Se lo pasamos a App.js para que guarde la nueva cita en el arreglo citas
        crearCita(cita);

        //Reiniciar el form
        //Hacemos que el objeto cita quede vacio y no siga mostrando el texto anterior al envio del form en el browser
        actualizarCita({
                mascota: '',
                propietario: '',
                fecha: '',
                hora: '',
                motivo: ''
        })

        console.log('Formulario enviado')
    }

    return (
        <Fragment>
            <h2>Crear cita</h2>

            {   //Ternario, ya que no puedo utilizar un if aca por ser un fragment.
                // Si error es true, muestra el texto de error. Si no nada.
            error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null }

            <form
                onSubmit={submitCita}
            >
                <label>Nombre Mascota:</label>
                <input
                    type="text"
                    name= "mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Propietario:</label>
                <input
                    type="text"
                    name= "propietario"
                    className="u-full-width"
                    placeholder="Nombre del dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha:</label>
                <input
                    type="date"
                    name= "fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora:</label>
                <input
                    type="time"
                    name= "hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Motivo de consulta:</label>
                <textarea
                    name= "motivo"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={motivo}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                    onChange={actualizarState}
                >Agendar Cita</button>
            </form>
        </Fragment>
    );
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;