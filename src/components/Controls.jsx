import React, { useState, useRef } from 'react';

// --- Componente: Controls (Panel de Control) ---
function Controls({ 
    data, 
    setData, 
    catalog, 
    onGeneratePdf, 
    onDownloadJson,
    onJsonLoad, 
    disabled,
    selectedType,
    setSelectedType,
    selectedStrain,
    setSelectedStrain
}) {
  const [statusMessage, setStatusMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleTypeChange = (e) => {
    const newType = e.target.value;
    setSelectedType(newType);
    if (catalog[newType]?.length > 0) {
      setSelectedStrain(catalog[newType][0].cepa);
    }
  };
  
  const handleFileChange = (event) => {
      const file = event.target.files[0];
      if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
              try {
                  const jsonData = JSON.parse(e.target.result);
                  onJsonLoad(jsonData); // Llama a la función del padre para actualizar el estado
                  setStatusMessage(`Certificado cargado desde ${file.name}.`);
              } catch (error) {
                  console.error('Error parsing JSON:', error);
                  setStatusMessage('Error al leer el archivo JSON. Verifique el formato.');
              }
          };
          reader.readAsText(file);
      }
  };

  const handleImportClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="controls mb-8 p-6 bg-white rounded-lg shadow-md no-print">
      <h2 className="text-xl font-semibold text-gray-700 mb-4">Panel de Control</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-b pb-4 mb-4">
        <div>
          <label htmlFor="animalType" className="block text-sm font-medium text-gray-700">Tipo de Animal</label>
          <select id="animalType" value={selectedType} onChange={handleTypeChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
            {catalog && Object.keys(catalog).map(key => (<option key={key} value={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</option>))}
          </select>
        </div>
        <div>
          <label htmlFor="strain" className="block text-sm font-medium text-gray-700">Cepa</label>
          <select id="strain" value={selectedStrain} onChange={(e) => setSelectedStrain(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm">
            {catalog && catalog[selectedType]?.map(strain => (<option key={strain.cepa} value={strain.cepa}>{strain.cepa}</option>))}
          </select>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div><label className="block text-sm font-medium text-gray-700">Destinatario (Cliente)</label><input type="text" name="destinatario" value={data.destinatario} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/></div>
        <div><label className="block text-sm font-medium text-gray-700">Fecha</label><input type="text" name="fecha" value={data.fecha} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/></div>
        <div><label className="block text-sm font-medium text-gray-700">Cantidad (Ej: 10)</label><input type="number" name="cantidad" value={data.cantidad} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/></div>
        <div><label className="block text-sm font-medium text-gray-700">Sexo (Ej: Machos)</label><input type="text" name="sexo" value={data.sexo} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/></div>
        <div><label className="block text-sm font-medium text-gray-700">Edad/Peso</label><input type="text" name="edadPeso" value={data.edadPeso} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md"/></div>
        <div><label className="block text-sm font-medium text-gray-700">Identificación</label><input type="text" name="identificacionAnimal" value={data.identificacionAnimal} onChange={handleInputChange} className="mt-1 block w-full p-2 border border-gray-300 rounded-md" readOnly/></div>
      </div>
      
      {statusMessage && <p className="mt-4 text-sm text-center text-gray-600">{statusMessage}</p>}

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <button onClick={onGeneratePdf} disabled={disabled} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed">
            {disabled ? 'Cargando...' : 'Generar PDF'}
        </button>
        <button onClick={onDownloadJson} disabled={disabled} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed">
            Descargar JSON
        </button>
        <button onClick={handleImportClick} disabled={disabled} className="w-full bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed">
            Importar JSON
        </button>
        <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept=".json" 
            className="hidden"
        />
      </div>
    </div>
  );
}

export default Controls;