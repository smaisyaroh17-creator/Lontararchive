"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/types/riwayatpengajuan";

function getTechnologies(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is string => typeof item === "string"
    );
  }

  return [];
}

export default function RiwayatPengajuanPage() {
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/masuk");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (!isLoggedIn) return;

    async function fetchProjects() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("detailproyek")
        .select(
          "id, created_at, name, teknologi, deskripsi, url, komentar"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal mengambil riwayat:", error);
        setError("Gagal mengambil data riwayat pengajuan.");
        setLoading(false);
        return;
      }

      setProjects((data ?? []) as Project[]);
      setLoading(false);
    }

    fetchProjects();
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return null;
  }

  return (
    <main className="detail-page">
      <Navbar />

      <section className="detail-container">
        <Link href="/" className="detail-back">
          ← Kembali ke Beranda
        </Link>

        <div className="detail-heading">
          <span className="detail-category">
            PENGAJUAN PROYEK
          </span>

          <h1>Riwayat Pengajuan</h1>

          <p>
            Daftar proyek yang tersimpan dalam arsip LontarArchive.
          </p>
        </div>

        <section className="detail-section">
          <h2>Daftar Proyek</h2>

          {loading ? (
            <p className="detail-muted">
              Memuat data dari Supabase...
            </p>
          ) : error ? (
            <p className="detail-muted">{error}</p>
          ) : projects.length > 0 ? (
            <div className="submission-history-list">
              {projects.map((project) => {
                const technologies = getTechnologies(
                  project.teknologi
                );

                const date = new Date(
                  project.created_at
                ).toLocaleDateString("id-ID", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                });

                return (
                  <article
                    className="submission-history-card"
                    key={project.id}
                  >
                    <div className="submission-history-content">
                      <span className="detail-category">
                        PROYEK #{project.id}
                      </span>

                      <h3>{project.name}</h3>

                      <p>{project.deskripsi}</p>

                      <div className="technology-tags">
                        {technologies.map((item) => (
                          <span
                            className="technology-tag"
                            key={item}
                          >
                            {item}
                          </span>
                        ))}
                      </div>

                      <div className="submission-history-meta">
                        <span>Tanggal data: {date}</span>
                        <span>Status: Belum tersedia</span>
                      </div>

                      <Link
                        href={`/proyek/${project.id}`}
                        className="project-link"
                      >
                        Lihat detail proyek →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty-state">
              <h3>Belum Ada Data Proyek</h3>
              <p>
                Belum ada data proyek yang tersimpan di Supabase.
              </p>
            </div>
          )}
        </section>
      </section>

      <footer className="footer">
        <Link className="brand footer-brand" href="/">
          <span className="brand-mark">L</span>
          <span>
            Lontar<span className="brand-accent">Archive</span>
          </span>
        </Link>

        <p>Arsip proyek KP & PKL di Lontarlab.</p>
        <span>© 2026 LontarArchive</span>
      </footer>
    </main>
  );
}