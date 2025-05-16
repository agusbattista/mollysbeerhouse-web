class Alerta {
  constructor(colorBotones, colorFondo, colorTexto) {
    this.colorBotones = colorBotones;
    this.colorFondo = colorFondo;
    this.colorTexto = colorTexto;
  }

  alertCargando = () => {
    Swal.fire({
      title: "Enviando mensaje...",
      text: "Por favor espera un momento",
      allowOutsideClick: false,
      background: this.colorFondo,
      color: this.colorTexto,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  };

  alertExito = (
    titulo = "¡Éxito!",
    mensaje = "Mensaje enviado correctamente"
  ) => {
    Swal.fire({
      icon: "success",
      title: titulo,
      text: mensaje,
      confirmButtonColor: this.colorBotones,
      background: this.colorFondo,
      color: this.colorTexto,
    });
  };

  alertError = (mensaje = "Hubo un problema al enviar el mensaje") => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: mensaje,
      confirmButtonColor: this.colorBotones,
      background: this.colorFondo,
      color: this.colorTexto,
    });
  };
}

export default Alerta;
