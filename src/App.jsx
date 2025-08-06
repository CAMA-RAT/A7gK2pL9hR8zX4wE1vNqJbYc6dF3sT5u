import React, { useState, useEffect, useRef } from 'react';
import Controls from './components/Controls';
import Certificate from './components/Certificate';
import './App.css';

// --- Catálogo de Datos (Este podría ir en su propio archivo e importarse) ---
const catalogData = {
  "rata": [
    { "cepa": "Wistar", "genero": "Rattus", "especie": "norvegicus", "tipoAnimal": "Rata", "identificación": "141-H009-3" },
    { "cepa": "Sprague Dawley", "genero": "Rattus", "especie": "norvegicus", "tipoAnimal": "Rata", "identificación": "002-H034-3" }
  ],
  "raton": [
    { "cepa": "CD1", "genero": "Mus", "especie": "musculus", "tipoAnimal": "Ratón", "identificación": "030-H043-3" },
    { "cepa": "BALB/c", "genero": "Mus", "especie": "musculus", "tipoAnimal": "Ratón", "identificación": "047-H002-3" },
    { "cepa": "C57BL/6", "genero": "Mus", "especie": "musculus", "tipoAnimal": "Ratón", "identificación": "044-H045-1" }
  ]
};

// --- Componente Principal: App ---
export default function App() {
  const [libsLoaded, setLibsLoaded] = useState(false);
  const [selectedType, setSelectedType] = useState('rata');
  const [selectedStrain, setSelectedStrain] = useState(catalogData.rata[0].cepa);
  
  const [certificateData, setCertificateData] = useState({
    destinatario: '',
    claveCertificado: 'AUT-B-A-1220-067', // Valor constante
    ciudad: 'Ciudad de México',
    fecha: '',
    cantidad: '',
    sexo: '',
    tipoAnimal: '',
    edadPeso: '',
    generoAnimal: '',
    especieAnimal: '',
    cepaAnimal: '',
    identificacionAnimal: '',
    areaResponsable: 'Bioterios',
    cedulaResponsable: '6917459'
  });
  const certificateRef = useRef();

  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve(script);
        script.onerror = () => reject(new Error(`Script load error for ${src}`));
        document.body.appendChild(script);
      });
    };

    Promise.all([
      loadScript('https://cdn.tailwindcss.com'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'),
      loadScript('https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'),
    ]).then(() => {
      setLibsLoaded(true);
      console.log("All libraries loaded successfully.");
    }).catch(error => console.error("Failed to load libraries:", error));
  }, []);

   useEffect(() => {
    if (!selectedType || !selectedStrain) return;

    const strainData = catalogData[selectedType]?.find(s => s.cepa === selectedStrain);

    if (strainData) {
      // CORRECCIÓN AQUÍ: Extraemos y renombramos las propiedades
      const { identificación, genero, especie, ...restOfData } = strainData; 
      setCertificateData(prevData => ({
        ...prevData,
        ...restOfData,
        generoAnimal: genero, // Asignamos 'genero' a 'generoAnimal'
        especieAnimal: especie, // Asignamos 'especie' a 'especieAnimal'
        identificacionAnimal: identificación,
      }));
    }
  }, [selectedType, selectedStrain]);

  const createPdfBlob = async (dataToRender) => {
    if (!libsLoaded) {
        alert("Las librerías de generación de PDF aún no han cargado.");
        return null;
    }

    setCertificateData(dataToRender);
    await new Promise(resolve => setTimeout(resolve, 50));
    
    const element = certificateRef.current;
    if (!element) return null;

    const { jsPDF } = window.jspdf;
    const html2canvas = window.html2canvas;

    const canvas = await html2canvas(element, { scale: 2.5, useCORS: true, backgroundColor: null });
    const imgData = canvas.toDataURL('image/png');
    
    const pdf = new jsPDF({ orientation: 'p', unit: 'mm', format: 'a4' });
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    
    return pdf.output('blob');
  };

  const handleGeneratePdf = async () => {
    const pdfBlob = await createPdfBlob(certificateData);
    if (pdfBlob) {
        const fileName = `Certificado_${(certificateData.destinatario || 'Cliente').replace(/\s/g, '_')}.pdf`;
        const link = document.createElement('a');
        link.href = URL.createObjectURL(pdfBlob);
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }
  };

  const handleDownloadJson = () => {
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(certificateData, null, 2)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "certificado_data.json";
    link.click();
  };

  const handleJsonLoad = (jsonData) => {
    setCertificateData(prevData => ({ ...prevData, ...jsonData }));
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap'); /* <-- CAMBIA AQUÍ */
          .font-inter { /* <-- CAMBIA AQUÍ */
            font-family: 'Inter', sans-serif;
          }
        `}
      </style>
      <div className="bg-gray-100 p-4 sm:p-8 font-montserrat">
        <div className="container mx-auto max-w-4xl">
          <Controls 
            data={certificateData} 
            setData={setCertificateData} 
            catalog={catalogData}
            onGeneratePdf={handleGeneratePdf}
            onDownloadJson={handleDownloadJson}
            onJsonLoad={handleJsonLoad}
            disabled={!libsLoaded}
            selectedType={selectedType}
            setSelectedType={setSelectedType}
            selectedStrain={selectedStrain}
            setSelectedStrain={setSelectedStrain}
          />
          <Certificate ref={certificateRef} data={certificateData} />
        </div>
      </div>
    </>
  );
}