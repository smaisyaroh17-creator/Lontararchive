"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/components/AuthProvider";
import { createClient } from "@/lib/supabase/client";
import type { Project } from "@/types/landingpage";

function getTechnologies(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter(
      (item): item is string => typeof item === "string"
    );
  }

  return [];
}

const technologies = [
  "Semua",
  "Next.js",
  "React",
  "PostgreSQL",
  "Tailwind CSS",
];

export default function Home() {
  const { isLoggedIn } = useAuth();

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("Semua");
  const [sort, setSort] = useState("Terbaru");
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchProjects() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from("detailproyek")
        .select(
          "id, created_at, name, teknologi, deskripsi, url, komentar"
        )
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Gagal mengambil data proyek:", error);
        setError("Gagal mengambil data proyek dari database.");
        setLoading(false);
        return;
      }

      setProjects((data ?? []) as Project[]);
      setLoading(false);
    }

    fetchProjects();
  }, []);

  const filteredProjects = projects
    .filter((project) => {
      const projectTechnologies = getTechnologies(project.teknologi);
      const keyword = search.toLowerCase();

      const matchesSearch =
        project.name.toLowerCase().includes(keyword) ||
        project.deskripsi.toLowerCase().includes(keyword) ||
        projectTechnologies.some((item) =>
          item.toLowerCase().includes(keyword)
        );

      const matchesTechnology =
        technology === "Semua" ||
        projectTechnologies.includes(technology);

      return matchesSearch && matchesTechnology;
    })
    .sort((a, b) => {
      if (sort === "Nama A-Z") {
        return a.name.localeCompare(b.name);
      }

      return (
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
      );
    });

  const projectsPerPage = 6;

  const totalPages = Math.max(
    1,
    Math.ceil(filteredProjects.length / projectsPerPage)
  );

  const currentProjects = filteredProjects.slice(
    (page - 1) * projectsPerPage,
    page * projectsPerPage
  );

  function changeTechnology(value: string) {
    setTechnology(value);
    setPage(1);
  }

  function changeSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <main>
      <Navbar />

      <section className="hero">
        <div className="hero-label">
          <span className="status-dot" />
          PUSAT ARSIP PROYEK LONTARLAB
        </div>

        <h1>
          Lontar<span className="brand-accent">Archive</span>
        </h1>

        <p className="hero-description">
          Arsip proyek Kerja Praktik (KP) & Praktik Kerja Lapangan (PKL)
          di Lontarlab.
        </p>

        <p className="hero-subtext">
          Jelajahi dokumentasi proyek dan temukan referensi untuk
          pengembangan proyekmu berikutnya.
        </p>

        <form
          className="search-form"
          onSubmit={(event) => {
            event.preventDefault();
            setPage(1);
            document.getElementById("katalog")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
        >
          <span className="search-icon" aria-hidden="true">
            ⌕
          </span>

          <input
            aria-label="Cari proyek"
            value={search}
            onChange={(event) => changeSearch(event.target.value)}
            placeholder="Cari nama proyek atau teknologi..."
          />

          <button className="button search-button" type="submit">
            Cari Proyek
          </button>
        </form>

        <div className="hero-note">
          <span>⌕</span> Temukan inspirasi dari dokumentasi proyek sebelumnya
        </div>
      </section>

      <section className="catalog-section" id="katalog">
        <div className="section-heading">
          <div>
            <p className="eyebrow">JELAJAHI ARSIP</p>
            <h2>Katalog Proyek</h2>
            <p className="section-description">
              Temukan proyek berdasarkan teknologi yang digunakan.
            </p>
          </div>

          <span className="project-count">
            {loading ? "Memuat..." : `${filteredProjects.length} proyek`}
          </span>
        </div>

        <div className="technology-filters" aria-label="Filter teknologi">
          {technologies.map((item) => (
            <button
              key={item}
              type="button"
              className={`filter-chip ${
                technology === item ? "filter-active" : ""
              }`}
              onClick={() => changeTechnology(item)}
            >
              {item}
            </button>
          ))}
        </div>

        <div className="catalog-toolbar">
          <label>
            <span>Urutkan</span>
            <select
              value={sort}
              onChange={(event) => {
                setSort(event.target.value);
                setPage(1);
              }}
            >
              <option>Terbaru</option>
              <option>Nama A-Z</option>
            </select>
          </label>
        </div>

        {loading ? (
          <div className="empty-state">
            <h3>Memuat katalog proyek...</h3>
            <p>Sedang mengambil data dari Supabase.</p>
          </div>
        ) : error ? (
          <div className="empty-state">
            <h3>Gagal Memuat Proyek</h3>
            <p>{error}</p>
            <button
              className="button"
              type="button"
              onClick={() => window.location.reload()}
            >
              Coba Lagi
            </button>
          </div>
        ) : currentProjects.length > 0 ? (
          <div className="project-grid">
            {currentProjects.map((project) => {
              const projectTechnologies = getTechnologies(
                project.teknologi
              );

              return (
                <article className="project-card" key={project.id}>
                  <div className="project-preview">
                    {project.url ? (
                      <img
                        src={project.url}
                        alt={`Gambar ${project.name}`}
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div className="preview-window">
                        <div className="preview-topbar">
                          <span />
                          <span />
                          <span />
                        </div>

                        <div className="preview-content">
                          <div className="preview-symbol">
                            {project.name.charAt(0)}
                          </div>

                          <div className="preview-line preview-line-long" />
                          <div className="preview-line preview-line-short" />

                          <div className="preview-blocks">
                            <span />
                            <span />
                            <span />
                          </div>
                        </div>
                      </div>
                    )}

                    <span className="category-label">
                      Arsip Proyek
                    </span>
                  </div>

                  <div className="project-card-body">
                    <div className="project-meta">
                      <span>ARSIP PROYEK</span>
                      <span>
                        #{String(project.id).padStart(3, "0")}
                      </span>
                    </div>

                    <h3>{project.name}</h3>

                    <p className="project-description">
                      {project.deskripsi}
                    </p>

                    <div className="technology-tags">
                      {projectTechnologies.map((item) => (
                        <span className="technology-tag" key={item}>
                          {item}
                        </span>
                      ))}
                    </div>

                    <Link
                      className="project-link"
                      href={`/proyek/${project.id}`}
                    >
                      Lihat detail proyek <span>→</span>
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h3>
              {projects.length === 0
                ? "Belum Ada Proyek"
                : "Proyek tidak ditemukan"}
            </h3>
            <p>
              {projects.length === 0
                ? "Belum ada data proyek yang tersedia di katalog."
                : "Coba gunakan kata kunci atau filter teknologi yang berbeda."}
            </p>

            <button
              className="button"
              type="button"
              onClick={() => {
                setSearch("");
                setTechnology("Semua");
                setPage(1);
              }}
            >
              Reset Filter
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          filteredProjects.length > 0 && (
            <div className="pagination">
              <button
                type="button"
                disabled={page === 1}
                onClick={() => setPage((current) => current - 1)}
              >
                ← Sebelumnya
              </button>

              <span>
                Halaman {page} dari {totalPages}
              </span>

              <button
                type="button"
                disabled={page === totalPages}
                onClick={() => setPage((current) => current + 1)}
              >
                Selanjutnya →
              </button>
            </div>
          )}
      </section>

      {!isLoggedIn && (
        <section className="submit-banner" id="ajukan">
          <div>
            <p className="eyebrow">BERKONTRIBUSI</p>
            <h2>Punya proyek yang bisa jadi referensi?</h2>
            <p>
              Dokumentasikan proyek KP atau PKL-mu agar dapat menjadi
              referensi bagi peserta berikutnya.
            </p>
          </div>

          <Link className="button" href="/masuk">
            Ajukan Proyek <span>→</span>
          </Link>
        </section>
      )}

      <section className="persuasive-section">
        <div className="persuasive-content">
          <p className="eyebrow">BERBAGI INSPIRASI</p>

          <h2>
            Jadikan Proyekmu Inspirasi bagi Generasi Berikutnya!
          </h2>

          <p>
            Setiap proyek memiliki proses, pengalaman, dan pembelajaran
            yang berharga. Bagikan hasil proyek KP atau PKL-mu melalui
            LontarArchive agar dapat menjadi referensi dan inspirasi
            bagi peserta berikutnya.
          </p>
        </div>

        <div className="persuasive-visual">
          <div className="persuasive-icon">
            <span>✦</span>
            <span>▤</span>
            <span>✧</span>
          </div>

          <strong>Berbagi Karya,</strong>
          <strong className="brand-accent">
            Menginspirasi Sesama.
          </strong>
          <p>LontarArchive</p>
        </div>
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