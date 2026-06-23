"use client";

import { useState } from "react";

// Base de datos de recetas económicas (precio por porción en €)
const recetas = [
  { nombre: "Pasta con verduras", precio: 2.5 },
  { nombre: "Pollo con arroz", precio: 3.0 },
  { nombre: "Ensalada con huevo", precio: 2.0 },
  { nombre: "Sopa + pan", precio: 1.5 },
  { nombre: "Tortilla + ensalada", precio: 2.0 },
  { nombre: "Pizza casera", precio: 3.5 },
  { nombre: "Arroz con verduras", precio: 2.0 },
  { nombre: "Lentejas guisadas", precio: 1.8 },
  { nombre: "Tacos económicos", precio: 2.5 },
];


export default function HomePage() {
  const [presupuesto, setPresupuesto] = useState("");
  const [personas, setPersonas] = useState("");
  const [menu, setMenu] = useState<string | null>(null);

  const generarMenu = () => {
    
    const presupuestoNum = parseFloat(presupuesto);
    const personasNum = parseInt(personas);

    if (isNaN(presupuestoNum) || isNaN(personasNum) || presupuestoNum <= 0 || personasNum <= 0) {
      alert("Por favor, ingresa un presupuesto y número de personas válidos.");
      return;
    }

    
    const costoTotal = presupuestoNum / personasNum;

    
    const recetasSeleccionadas = recetas.filter((receta) => receta.precio <= costoTotal);

    if (recetasSeleccionadas.length === 0) {
      setMenu("No se encontraron recetas dentro de tu presupuesto.");
      return;
    }

    
    const menuGenerado = recetasSeleccionadas
      .slice(0, 7) 
      .map((receta, index) => `Día ${index + 1}: ${receta.nombre} (€${receta.precio.toFixed(2)})`)
      .join("\n");

    setMenu(menuGenerado);
  };  

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>    
      <h1>Generador de Menú Semanal Económico</h1>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Presupuesto total (€):
          <input
            type="number"
            value={presupuesto}
            onChange={(e) => setPresupuesto(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label>
          Número de personas:
          <input
            type="number"
            value={personas}
            onChange={(e) => setPersonas(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <button onClick={generarMenu} style={{ padding: "10px 20px", fontSize: "16px" }}>
        Generar Menú
      </button>
      {menu && (
        <div style={{ marginTop: "20  px", whiteSpace: "pre-line" }}>
          <h2>Menú Semanal:</h2>
          <pre>{menu}</pre>
        </div>
      )}
    </div>
  );
}
