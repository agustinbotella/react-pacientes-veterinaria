import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //Citas en local storage
  //Revisa si existen citas en local storage. En caso de que no hayan, inicia con un arreglo vacio
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales) {citasIniciales = []}

  const [citas, guardarCitas] = useState(citasIniciales);

  //userEffect para realizar ciertas operaciones cuando el state cambia
  //Se le pasa un array [citas] para que cada vez que el array cambie se ejecute useEffect
  //Le estamos indicando que si detecta un cambio en citas guarde el arreglo en local storage
  //Con JSON.stringify se convierte el array a un string, que es lo unico que soporta el local storage
  useEffect( () => {

    let citasIniciales = JSON.parse(localStorage.getItem('citas'));

    if (citasIniciales) {
      localStorage.setItem('citas', JSON.stringify(citas))
    } else {
      localStorage.setItem('citas', JSON.stringify([]))
    }

  }, [citas] );

  //Funcion que tome las citas actuales y agrega la nueva
  //Como solo le paso un parametro, elimino los parentesis y pongo cita solo
  const crearCita = cita => {
      guardarCitas([
        //Tomamos el arrglo de citas (una copia) y le agregamos una nueva cita
        ...citas, cita
      ]);
  }

  //Funcion para eliminar una cita por su ID
  //Desde Cita.js se pasa el ID de la cita que se quiere filtrar. Luego se genera un nuevo arreglo llamado nuevasCitas
  //donde se filtran todos los ID diferentes al ID que que estamos buscando. Al filtrarse se genera un nuevo arreglo.
  const eliminarCita = id => {
      const nuevasCitas = citas.filter(cita => cita.id !== id);
      //Guardamos ese nuevo arreglo de citas en el State "citas". No podemos guardarlo con un =, unicamente con el
      //setState del State, que es guardarCitas y le pasamos el nuevo arreglo. Como ya es un objeto no incluimos parentesis
      guardarCitas(nuevasCitas);
  }

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
          <div className="row">

              <div className="one-half column">
                  <Formulario 
                    crearCita={crearCita}
                  />
              </div>
              <div className="one-half column">
                  <h2>Administracion de Citas</h2>

                      {
                      //Ternario, ya que no puedo utilizar un if aca por ser un fragment.
                      //Si no hay citas (citas.lenth === 0), muestra el texto indicando que no hay citas.
                      //Si no muestras las citas que hay.
                      citas.length === 0 ? <p className="alerta-error">No existen citas</p> : null
                      }

                  {citas.map(cita => (
                    <Cita
                      key={cita.id}
                      cita={cita}
                      eliminarCita={eliminarCita}
                    />
                  ))}
              </div>
            
          </div>

      </div>
    </Fragment>
  );
}

export default App;
