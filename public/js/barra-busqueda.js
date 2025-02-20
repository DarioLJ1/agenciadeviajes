document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("searchForm")
  const resultados = document.getElementById("resultados")
  const buscarBtn = document.getElementById("buscarBtn")
  const viajesOriginales = Array.from(resultados.querySelectorAll(".col-md-6"))

  buscarBtn.addEventListener("click", () => {
    const destino = document.getElementById("destino").value.toLowerCase()
    const fechaInicio = document.getElementById("fechaInicio").value
    const fechaFin = document.getElementById("fechaFin").value

    let viajesEncontrados = 0

    viajesOriginales.forEach((viaje) => {
      const titulo = viaje.querySelector("h2").textContent.toLowerCase()
      const fechaViaje = viaje.dataset.fecha
      const [fechaIda, fechaVuelta] = fechaViaje.split(" - ")

      const cumpleDestino = destino === "" || titulo.includes(destino)
      const cumpleFechas =
          (fechaInicio === "" || fechaIda >= fechaInicio) && (fechaFin === "" || fechaVuelta <= fechaFin)

      if (cumpleDestino && cumpleFechas) {
        viaje.classList.remove("oculto")
        viaje.classList.add("destacado")
        viajesEncontrados++
      } else {
        viaje.classList.remove("destacado")
        viaje.classList.add("oculto")
      }
    })

    const mensajeNoResultados = resultados.querySelector(".no-resultados")
    if (viajesEncontrados === 0) {
      if (!mensajeNoResultados) {
        const mensaje = document.createElement("p")
        mensaje.textContent = "No se encontraron viajes que coincidan con tu búsqueda."
        mensaje.classList.add("text-center", "no-resultados")
        resultados.appendChild(mensaje)
      }
    } else if (mensajeNoResultados) {
      mensajeNoResultados.remove()
    }
  })
})







