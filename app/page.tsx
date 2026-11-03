"use client";

import { useState } from "react";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "LontarArchive",
    description:
      "Website arsip proyek KP dan PKL untuk menyimpan dokumentasi serta menjadi referensi bagi peserta berikutnya.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    category: "Website",
  },
  {
    id: 2,
    title: "Sistem Informasi Manajemen",
    description:
      "Contoh proyek sistem informasi untuk membantu pengelolaan data secara terstruktur.",
    technologies: ["React", "PostgreSQL", "Tailwind CSS"],
    category: "Sistem Informasi",
  },
  {
    id: 3,
    title: "Aplikasi Pengolahan Data",
    description:
      "Contoh proyek pengolahan data untuk mendukung kebutuhan informasi dan pelaporan.",
    technologies: ["Python", "PostgreSQL"],
    category: "Data",
  },
  {
    id: 4,
    title: "Website Layanan Digital",
    description:
      "Contoh website layanan digital dengan antarmuka yang sederhana dan mudah digunakan.",
    technologies: ["Next.js", "Tailwind CSS"],
    category: "Website",
  },
  {
    id: 5,
    title: "Aplikasi Mobile",
    description:
      "Contoh pengembangan aplikasi mobile untuk mendukung aktivitas pengguna.",
    technologies: ["Flutter"],
    category: "Mobile",
  },
  {
    id: 6,
    title: "Sistem Pengelolaan Data",
    description:
      "Contoh sistem untuk membantu penyimpanan dan pengelolaan data.",
    technologies: ["Laravel", "PostgreSQL"],
    category: "Sistem Informasi",
  },
];

const technologies = [
  "Semua",
  "Next.js",
  "React",
  "Laravel",
  "Python",
  "PostgreSQL",
  "Tailwind CSS",
  "Flutter",
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [technology, setTechnology] = useState("Semua");
  const [category, setCategory] = useState("Semua Bidang");
  const [sort, setSort] = useState("Terbaru");
  const [page, setPage] = useState(1);

  const filteredProjects = projects
    .filter((project) => {
      const keyword = search.toLowerCase();

      const matchesSearch =
        project.title.toLowerCase().includes(keyword) ||
        project.description.toLowerCase().includes(keyword) ||
        project.technologies.some((item) =>
          item.toLowerCase().includes(keyword)
        );

      const matchesTechnology =
        technology === "Semua" ||
        project.technologies.includes(technology);

      const matchesCategory =
        category === "Semua Bidang" || project.category === category;

      return matchesSearch && matchesTechnology && matchesCategory;
    })
    .sort((a, b) =>
      sort === "Nama A-Z" ? a.title.localeCompare(b.title) : b.id - a.id
    );

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

  function changeCategory(value: string) {
    setCategory(value);
    setPage(1);
  }

  function changeSearch(value: string) {
    setSearch(value);
    setPage(1);
  }

  return (
    <main>
      <header className="navbar">
        <a className="brand" href="#" aria-label="LontarArchive Beranda">
          <span className="brand-mark">L</span>
          <span>
            Lontar<span className="brand-accent">Archive</span>
          </span>
        </a>

        <nav className="nav-links">
          <a className="nav-active" href="#">Beranda</a>
          <a href="#katalog">Jelajahi Proyek</a>
          <a href="#ajukan">Ajukan Proyek</a>
        </nav>

        <div className="nav-actions">
          <a className="login-link" href="/login">Masuk</a>
        </div>
      </header>

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
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            aria-label="Cari proyek"
            value={search}
            onChange={(event) => changeSearch(event.target.value)}
            placeholder="Cari nama proyek, arsitektur, atau teknologi..."
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
              Temukan proyek berdasarkan teknologi dan bidang pengembangannya.
            </p>
          </div>

          <span className="project-count">
            {filteredProjects.length} proyek
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
            <span>Bidang</span>
            <select
              value={category}
              onChange={(event) => changeCategory(event.target.value)}
            >
              <option>Semua Bidang</option>
              <option>Website</option>
              <option>Sistem Informasi</option>
              <option>Data</option>
              <option>Mobile</option>
            </select>
          </label>

          <label>
            <span>Urutkan</span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option>Terbaru</option>
              <option>Nama A-Z</option>
            </select>
          </label>
        </div>

        {currentProjects.length > 0 ? (
          <div className="project-grid">
            {currentProjects.map((project) => (
              <article className="project-card" key={project.id}>
                <div className="project-preview">
                  <div className="preview-window">
                    <div className="preview-topbar">
                      <span />
                      <span />
                      <span />
                    </div>

                    <div className="preview-content">
                      <div className="preview-symbol">
                        {project.title.charAt(0)}
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

                  <span className="category-label">{project.category}</span>
                </div>

                <div className="project-card-body">
                  <div className="project-meta">
                    <span>ARSIP PROYEK</span>
                    <span>#{String(project.id).padStart(3, "0")}</span>
                  </div>

                  <h3>{project.title}</h3>
                  <p className="project-description">
                    {project.description}
                  </p>

                  <div className="technology-tags">
                    {project.technologies.map((item) => (
                      <span className="technology-tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>

                  <a
                    className="project-link"
                    href={`/projects/${project.id}`}
                  >
                    Lihat detail proyek <span>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <div className="empty-icon">⌕</div>
            <h3>Proyek tidak ditemukan</h3>
            <p>Coba gunakan kata kunci atau filter yang berbeda.</p>

            <button
              className="button"
              type="button"
              onClick={() => {
                setSearch("");
                setTechnology("Semua");
                setCategory("Semua Bidang");
                setPage(1);
              }}
            >
              Reset Filter
            </button>
          </div>
        )}

        {filteredProjects.length > 0 && (
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

      <section className="submit-banner" id="ajukan">
        <div>
          <p className="eyebrow">BERKONTRIBUSI</p>
          <h2>Punya proyek yang bisa jadi referensi?</h2>
          <p>
            Dokumentasikan proyek KP atau PKL-mu agar dapat menjadi
            referensi bagi peserta berikutnya.
          </p>
        </div>

        <a className="button" href="/login">
          Ajukan Proyek <span>→</span>
        </a>
      </section>

      <footer className="footer">
        <a className="brand footer-brand" href="#">
          <span className="brand-mark">L</span>
          <span>
            Lontar<span className="brand-accent">Archive</span>
          </span>
        </a>

        <p>Arsip proyek KP & PKL di Lontarlab.</p>
        <span>© 2026 LontarArchive</span>
      </footer>
    </main>
  );
}