"use client";
import { BuilderComponent, useIsPreviewing } from "@builder.io/react";
import "@/builder/registry";

interface Props {
  content: object | null;
}

export function BuilderPage({ content }: Props) {
  const isPreviewing = useIsPreviewing();

  if (!content && !isPreviewing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-cream">
        <div className="text-center">
          <p className="font-heading text-2xl text-brown-dark mb-2">Página no encontrada</p>
          <a href="/" className="font-body text-rose hover:underline">Volver al inicio</a>
        </div>
      </div>
    );
  }

  return <BuilderComponent model="page" content={content ?? undefined} />;
}
