"use client";

import { FormEvent, useEffect, useState } from "react";

type Nota = {
  id: number;
  titulo: string;
  contenido: string;
  color: string;
  minutos: number;
};

const colores = ["#fff3a6", "#cfe8ff", "#d4f5d0", "#ffd6e0"];
const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3002";

export default function Home() {
  const [notas, setNotas] = useState<Nota[]>([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [minutos, setMinutos] = useState("");
  const [color, setColor] = useState(colores[0]);

  useEffect(() => {
    async function cargarNotas() {
      try {
        const respuesta = await fetch(`${apiUrl}/notas`);
        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar las notas.");
        }

        const notasGuardadas = await respuesta.json();
        setNotas(notasGuardadas);
      } catch {
        alert("No se pudo conectar con el backend.");
      }
    }

    cargarNotas();
  }, []);

  async function guardarNota(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    if (titulo === "" || contenido === "" || Number(minutos) <= 0) {
      return;
    }

    const nota = {
      titulo,
      contenido,
      minutos: Number(minutos),
      color,
    };

    try {
      const respuesta = await fetch(`${apiUrl}/notas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nota),
      });

      if (!respuesta.ok) {
        throw new Error("No se pudo guardar la nota.");
      }

      const notaGuardada = await respuesta.json();
      setNotas((notasActuales) => [...notasActuales, notaGuardada]);
      setTitulo("");
      setContenido("");
      setMinutos("");
    } catch {
      alert("No se pudo guardar la nota. Verifica que el backend esté iniciado.");
    }
  }

  async function borrarNota(id: number) {
    try {
      const respuesta = await fetch(`${apiUrl}/notas/${id}`, { method: "DELETE" });
      if (!respuesta.ok) {
        throw new Error("No se pudo borrar la nota.");
      }

      setNotas((notasActuales) =>
        notasActuales.filter((nota) => nota.id !== id),
      );
    } catch {
      alert("No se pudo borrar la nota.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-800">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-1 text-3xl font-bold">Notas adhesivas</h1>
        <p className="mb-6 text-slate-600">Una lista simple para guardar notas.</p>

        <form
          onSubmit={guardarNota}
          className="mb-8 rounded border border-slate-300 bg-white p-5"
        >
          <h2 className="mb-4 text-xl font-semibold">Crear una nota</h2>

          <label className="mb-3 block">
            Título
            <input
              type="text"
              value={titulo}
              onChange={(evento) => setTitulo(evento.target.value)}
              className="mt-1 w-full rounded border border-slate-300 p-2"
              placeholder="Título de la nota"
              required
            />
          </label>

          <label className="mb-3 block">
            Contenido
            <textarea
              value={contenido}
              onChange={(evento) => setContenido(evento.target.value)}
              className="mt-1 w-full rounded border border-slate-300 p-2"
              placeholder="Escribe algo..."
              rows={3}
              required
            />
          </label>

          <div className="mb-4 flex flex-wrap items-end gap-5">
            <label>
              Minutos
              <input
                type="number"
                min="1"
                value={minutos}
                onChange={(evento) => setMinutos(evento.target.value)}
                className="ml-2 w-24 rounded border border-slate-300 p-2"
                required
              />
            </label>

            <label>
              Color
              <select
                value={color}
                onChange={(evento) => setColor(evento.target.value)}
                className="ml-2 rounded border border-slate-300 p-2"
              >
                {colores.map((colorNota, indice) => (
                  <option key={colorNota} value={colorNota}>
                    Color {indice + 1}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="submit"
            className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
          >
            Guardar nota
          </button>
        </form>

        <h2 className="mb-3 text-xl font-semibold">Mis notas ({notas.length})</h2>

        {notas.length === 0 ? (
          <p className="rounded border border-slate-300 bg-white p-5 text-slate-500">
            Todavía no hay notas.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {notas.map((nota) => (
              <div
                key={nota.id}
                className="rounded border border-slate-300 p-4 shadow-sm"
                style={{ backgroundColor: nota.color }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-bold">{nota.titulo}</h3>
                  <button
                    type="button"
                    onClick={() => borrarNota(nota.id)}
                    className="text-sm text-red-600 hover:underline"
                  >
                    Borrar
                  </button>
                </div>
                <p className="mt-3 whitespace-pre-wrap">{nota.contenido}</p>
                <p className="mt-4 text-sm text-slate-600">
                  Duración: {nota.minutos} minutos
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
