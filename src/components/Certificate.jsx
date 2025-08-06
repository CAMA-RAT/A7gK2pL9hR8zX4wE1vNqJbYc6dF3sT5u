import React from 'react';

// --- Componente: Certificate (Plantilla Visual) ---
const Certificate = React.forwardRef(({ data }, ref) => {
  const getCantidadDesc = () => {
    const cantidad = parseInt(data.cantidad, 10) || 0;
    const tipo = data.tipoAnimal || 'animal';
    const sexo = data.sexo || '';
    
    let plural = tipo;
    if (cantidad !== 1) {
        if (tipo.toLowerCase() === 'ratón') plural = 'Ratones';
        else if (tipo.toLowerCase() === 'rata') plural = 'Ratas';
        else plural = tipo + 's';
    }
    return `${cantidad} ${plural} ${sexo}`;
  };

  // Estilo para la marca de agua como fondo CSS, apuntando a un archivo local
  const mainStyle = {
    backgroundImage: `
      linear-gradient(rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.85)),
      url('/marca-agua.png')
    `,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: '80%',
  };

  return (
    <div ref={ref} id="certificateTemplateArea" className="bg-white shadow-2xl rounded-lg border border-gray-200">
      <header className="p-10 border-b-2 border-gray-100">
        <div className="flex justify-between items-start">
          <div className="w-1/2 pr-4">
            <img src="/logo.png" alt="Logo Principal" className="h-20 w-auto" />
            <div className="mt-6 text-left text-sm text-gray-600">
              <p className="font-bold text-base text-gray-800">{data.destinatario || 'Nombre del Cliente Aquí'}</p>
              <p>Presente</p>
            </div>
          </div>
          <div className="w-1/2 pl-2 text-right text-sm text-gray-500 pt-10">
            <p><span className="font-bold text-gray-700">Clave:</span> {data.claveCertificado}</p>
            <p className="mt-1">{data.ciudad || 'Ciudad de México'} a {data.fecha}</p>
          </div>
        </div>
      </header>

      <main className="p-10" style={mainStyle}>
        <h2 className="text-2xl font-bold text-center my-6 tracking-widest text-gray-800 border-b pb-4">CERTIFICADO DE SALUD</h2>
        <p className="text-sm leading-relaxed mb-4 text-justify text-gray-700">
          De acuerdo a La Norma Oficial Mexicana NOM-062-ZOO-1999, Especificaciones cuidado y uso de los animales de laboratorio. Apartado
          4.5 Certificado de Salud y calidad. Se hace constatar que <span className="font-bold text-gray-900">{getCantidadDesc()}</span> de <span className="font-bold text-gray-900">{data.edadPeso || '[Edad/Peso]'}</span>, del género <span className="italic font-bold text-gray-900">{data.generoAnimal || '[Género]'}</span> de la especie
          <span className="italic font-bold text-gray-900"> {data.especieAnimal || '[Especie]'}</span> de la cepa <span className="font-bold text-gray-900">{data.cepaAnimal || '[Cepa]'}</span>, con la siguiente identificación: <span className="font-bold text-gray-900">{data.identificacionAnimal || '[Identificación]'}</span>. No representan riesgo alguno de enfermedad infecto-
          contagiosa, ya que fueron producidos y mantenidos bajo condiciones controladas de manejo, alimentación, reproductivas y de alojamiento
          bajo los procedimientos normalizados de operación de <span className="font-bold text-gray-900">Harlan Laboratories Israel</span> en el Bioterio tipo barrera de <span className="font-bold text-gray-900">Modelos Animales y Servicios S.A. de C.V.</span>, 
          de acuerdo a La Norma Oficial Mexicana NOM-062-ZOO-1999. Los animales descritos fueron examinados por un Médico
          Veterinario Zootecnista y a la revisión clínica, no observan ningún signo de sospecha de alguna enfermedad. Además, fueron sometidos a
          análisis microbiologicos, por lo que se diagnostican clínicamente sanos.
        </p>
        <div className="mt-20 text-center text-sm text-gray-800">
          <p className="mb-8 tracking-widest">ATENTAMENTE</p>
          <div className="border-b border-gray-400 w-64 mx-auto mt-16 mb-4"></div>
          <p className="font-bold">M.V.Z. Abel Zapata Arenas</p>
          <p className="text-xs text-gray-600">Responsable autorizado en el área de:</p>
          <p className="text-gray-700">{data.areaResponsable || 'Bioterios'}</p>
          <p className="text-xs text-gray-600 mt-2">Con la clave: <span className="font-bold text-gray-700">MR-0724-09-006-16</span></p>
          <p className="text-xs text-gray-600">Cédula Profesional: <span className="font-bold text-gray-700">{data.cedulaResponsable || '6917459'}</span></p>
        </div>
      </main>
    
      <section className="mt-4 p-10 bg-gray-50 rounded-b-lg">
        <h3 className="text-center text-base font-bold text-gray-700 mb-4">Recomendaciones</h3>
        <div className="text-xs text-gray-600 space-y-3 text-justify">
            <p>
                Se recomienda que los animales de reciente recepción sean examinados por el personal competente que su institución determine, y puestos en jaulas limpias en
                un área de recepción exclusiva (cuarentena), y que esta área, cuente con los parámetros medioambientales mínimos que sugiere la NOM-062-ZOO-1999.
            </p>
            <p>
                Se sugiere dar a los animales un periodo mínimo de ajuste medioambiental en sus nuevas instalaciones de cuando menos dos días para estabilizar la función
                inmunitaria, los niveles de corticosterona y otros parámetros fisiológicos (Small, 1984; Toth y January, 1990); sin embargo, los animales de nuevo ingreso deberán
                ser sometidos invariablemente a un periodo cuarentenario determinado a criterio del Médico Veterinario (NOM-062-ZOO-1999). Los animales que pasado ese
                periodo lleguen a presentar signos sugerentes de enfermedad, o que no han podido reestablecerse después del transporte, se deben separar del resto y ser
                resguardados en un lugar apropiado para observación y si es necesario recibir el tratamiento correspondiente.
            </p>
            <p>
                Durante el periodo de cuarentena se recomienda alojar una sola especie animal, para evitar factores estresantes o contaminación cruzada de los mismos.
            </p>
        </div>
      </section>

      <footer className="mt-10 pt-6 border-t bg-sky-800 p-8 rounded-b-lg text-white text-xs">
        <div className="flex flex-col sm:flex-row justify-between w-full sm:gap-4">
          <div className="mb-4 sm:mb-0">
            <p className="font-bold">Modelos Animales y Servicios, S.A. de C.V.</p>
            <p>Edificio H, Mario Molina 3er piso, Circuito Mario de la Cueva S/N,</p>
            <p>Coyoacán, C.U., 04510 Ciudad de México.</p>
            <p>www.modelosanimales.com.mx</p>
          </div>
          <div className="text-left sm:text-right">
            <p>Lic. Monica Valdivia</p>
            <p>WhatsApp 55 5409 9941</p>
            <p>e-mail: ventas@modelosanimales.com.mx</p>
          </div>
        </div>
        <p className="text-center mt-8 text-white font-bold tracking-wider">CLAVE: {data.claveCertificado}</p>
      </footer>
    </div>
  );
});

export default Certificate;