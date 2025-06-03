let graficoChart = null;


async function obtenerValor() {

  const MontoInput = document.getElementById("montoaconvertir").value;
  const moneda = document.getElementById("selectMoneda").value;
  const resultado = document.getElementById("resultado");

  if (!MontoInput || MontoInput <= 0) {
    resultado.textContent = "Ingrese un monto válido"
  } else {
    resultado.textContent = " ";
  }



  try {
    const respuesta = await fetch(`https://mindicador.cl/api/${moneda}`);
    const datosApi = await respuesta.json();


    //Calculo conversión
    const valorMoneda = datosApi.serie[0].valor;
    // console.log(`Valor del ${moneda} hoy: ${valorMoneda}`);

    const conversion = (MontoInput / valorMoneda).toFixed(2);
    resultado.textContent = `Resultado: $${conversion}`;


    //Gráfico
    const labelsFecha = datosApi.serie.slice(0, 10).reverse().map(lf => new Date(lf.fecha).toLocaleDateString('es-CL', { day: "numeric", month: "short", year: "numeric" }));
    console.log(`Array Labels Fecha: ${labelsFecha}`);

    const valorXDia = datosApi.serie.slice(0, 10).reverse().map(lf => lf.valor);

    if (graficoChart) {
      graficoChart.destroy();
    }

    const graficoConversion = document.getElementById("grafico");
    const dataGraficoChart = {
      labels: labelsFecha,
      datasets: [{
        label: `Historial últimos 10 días - ${moneda.toUpperCase()}`,
        data: valorXDia,
        borderColor: 'rgb(0,255,255)',
        // backgroundColor: 'rgba(0,255,255)',
        pointBorderColor: 'rgb(0,255,255)',
        pointRadius: 4,
        pointHoverRadius: 8,
        pointHitRadius: 30,
        pointBorderWidth: 2,

      }],
      options: {
        plugins: {
          customCanvasBackgroundColor: {
            color: 'lightGreen',
          }
        }
      }

    }
    graficoChart = new Chart(graficoConversion, {
      type: 'line',
      data: dataGraficoChart
    })

    console.log(datosApi);
  } catch (error) {

    alert(`No hemos podido realizar la conversión, intentelo nuevamente más tarde`);
    console.log(`Encontramos el siguiente error ${error}`);
  }

}



//  document.getElementById('resultado').textContent = "Resulado: $ ";


