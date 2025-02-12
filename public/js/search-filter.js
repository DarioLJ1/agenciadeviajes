document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm")
  const resultados = document.getElementById("resultados")
  const buscarBtn = document.getElementById("buscarBtn")
  const viajesOriginales = Array.from(resultados.querySelectorAll(".col-md-6"))

  buscarBtn.addEventListener("click", () => {
    const destino = document.getElementById("destino").value.toLowerCase()
    const fechaInicio = document.getElementById("fechaInicio").value
    const fechaFin = document.getElementById("fechaFin").value

    console.log("Búsqueda iniciada:", { destino, fechaInicio, fechaFin })

    let viajesEncontrados = 0

    viajesOriginales.forEach((viaje) => {
      const titulo = viaje.querySelector("h2").textContent.toLowerCase()
      const fechaViaje = viaje.dataset.fecha
      const [fechaIda, fechaVuelta] = fechaViaje.split(" - ")

      console.log("Evaluando viaje:", { titulo, fechaIda, fechaVuelta })

      const cumpleDestino = destino === "" || titulo.includes(destino)
      const cumpleFechas =
          (fechaInicio === "" || fechaIda >= fechaInicio) && (fechaFin === "" || fechaVuelta <= fechaFin)

      console.log("Resultado de evaluación:", { cumpleDestino, cumpleFechas })

      if (cumpleDestino && cumpleFechas) {
        viaje.classList.remove("oculto")
        viaje.classList.add("destacado")
        viajesEncontrados++
      } else {
        viaje.classList.remove("destacado")
        viaje.classList.add("oculto")
      }
    })

    console.log("Total de viajes encontrados:", viajesEncontrados)

    if (viajesEncontrados === 0) {
      if (!resultados.querySelector(".no-resultados")) {
        const mensaje = document.createElement("p")
        mensaje.textContent = "No se encontraron viajes que coincidan con tu búsqueda."
        mensaje.classList.add("text-center", "no-resultados")
        resultados.appendChild(mensaje)
      }
    } else {
      const mensajeNoResultados = resultados.querySelector(".no-resultados")
      if (mensajeNoResultados) {
        mensajeNoResultados.remove()
      }
    }
  })
})







