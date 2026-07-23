// components/inactivity-logout.tsx

"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

// Tempo de inatividade em minutos antes de deslogar automaticamente
const MINUTOS_INATIVIDADE = 15;

const EVENTOS = ["mousemove", "mousedown", "keydown", "touchstart", "scroll"];

export function InactivityLogout() {
  const router = useRouter();
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const supabase = createClient();

    async function logoutPorInatividade() {
      await supabase.auth.signOut();
      router.push("/login");
      router.refresh();
    }

    function resetarTimer() {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(
        logoutPorInatividade,
        MINUTOS_INATIVIDADE * 60 * 1000
      );
    }

    EVENTOS.forEach((evento) =>
      window.addEventListener(evento, resetarTimer, { passive: true })
    );

    resetarTimer();

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      EVENTOS.forEach((evento) =>
        window.removeEventListener(evento, resetarTimer)
      );
    };
  }, [router]);

  return null;
}