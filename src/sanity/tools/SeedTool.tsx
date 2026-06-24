"use client";
import { useState } from "react";

const TYPES = ["service", "certification", "faqItem", "testimonial", "requirementItem", "settings"];

export function SeedTool() {
  const [log, setLog] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const addLog = (msg: string) => setLog((prev) => [...prev, msg]);

  const handleReset = async () => {
    if (!confirm("⚠️ Esto borra TODO el contenido y lo recrea desde el seed. ¿Continuar?")) return;
    setLoading(true);
    setLog([]);
    addLog("Borrando contenido...");
    const res = await fetch("/api/reset-seed", { method: "POST" });
    const data = await res.json();
    if (!res.ok) { addLog("❌ Error: " + data.error); setLoading(false); return; }
    addLog(`✅ Borrados: ${data.deleted.join(", ")}`);
    addLog("Corriendo seed...");
    const res2 = await fetch(`/api/seed?secret=${data.secret}`, { method: "POST" });
    const data2 = await res2.json();
    if (!res2.ok) { addLog("❌ Error en seed: " + data2.error); setLoading(false); return; }
    addLog(`✅ Seed completado: ${(data2.seeded ?? []).join(", ") || "nada nuevo"}`);
    setLoading(false);
  };

  return (
    <div style={{ padding: 32, maxWidth: 600, fontFamily: "sans-serif" }}>
      <h2 style={{ marginBottom: 8 }}>🌱 Herramienta de Seed</h2>
      <p style={{ color: "#666", marginBottom: 24 }}>
        Borra todo el contenido generado automáticamente y lo recrea desde los valores del seed.
        Útil para verificar que el seed está correcto.
      </p>
      <button
        onClick={handleReset}
        disabled={loading}
        style={{
          background: loading ? "#ccc" : "#e03d3d",
          color: "white",
          border: "none",
          borderRadius: 8,
          padding: "12px 24px",
          fontSize: 15,
          cursor: loading ? "not-allowed" : "pointer",
          fontWeight: 600,
        }}
      >
        {loading ? "Procesando..." : "🔄 Resetear y re-sembrar contenido"}
      </button>

      {log.length > 0 && (
        <div style={{ marginTop: 24, background: "#f5f5f5", borderRadius: 8, padding: 16 }}>
          {log.map((line, i) => (
            <div key={i} style={{ fontFamily: "monospace", fontSize: 13, marginBottom: 4 }}>{line}</div>
          ))}
        </div>
      )}
    </div>
  );
}
