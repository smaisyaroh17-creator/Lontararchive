"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  category: string;
  year: string;
  author: string;
  images: string[];
};

const projects: Project[] = [
  {
    id: 1,
    title: "LontarArchive",
    description:
      "Website arsip proyek KP dan PKL untuk menyimpan dokumentasi serta menjadi referensi bagi peserta berikutnya. Website ini dikembangkan untuk mempermudah pencarian, penyimpanan, dan pengelolaan dokumentasi proyek.",
    technologies: ["Next.js", "TypeScript", "PostgreSQL"],
    category: "Website",
    year: "2026",
    author: "Contoh Peserta KP",
    images: ["01", "02", "03"],
  },
  {
    id: 2,
    title: "Sistem Informasi Manajemen",
    description:
      "Contoh proyek sistem informasi untuk membantu pengelolaan data secara terstruktur dan mempermudah proses administrasi.",
    technologies: ["React", "PostgreSQL", "Tailwind CSS"],
    category: "Sistem Informasi",
    year: "2025",
    author: "Contoh Peserta KP",
    images: ["01", "02"],
  },
  {
    id: 3,
    title: "Aplikasi Pengolahan Data",
    description:
      "Contoh proyek pengolahan data untuk mendukung kebutuhan informasi dan pelaporan.",
    technologies: ["Python", "PostgreSQL"],
    category: "Data",
    year: "2025",
    author: "Contoh Peserta KP",
    images: ["01", "02"],
  },
  {
    id: 4,
    title: "Website Layanan Digital",
    description:
      "Contoh website layanan digital dengan antarmuka yang sederhana dan mudah digunakan.",
    technologies: ["Next.js", "Tailwind CSS"],
    category: "Website",
    year: "2025",
    author: "Contoh Peserta KP",
    images: ["01", "02"],
  },
  {
    id: 5,
    title: "Aplikasi Mobile",
    description:
      "Contoh pengembangan aplikasi mobile untuk mendukung aktivitas pengguna.",
    technologies: ["Flutter"],
    category: "Mobile",
    year: "2025",
    author: "Contoh Peserta KP",
    images: ["01", "02"],
  },
  {
    id: 6,
    title: "Sistem Pengelolaan Data",
    description:
      "Contoh sistem untuk membantu penyimpanan dan pengelolaan data.",
    technologies: ["Laravel", "PostgreSQL"],
    category: "Sistem Informasi",
    year: "2025",
    author: "Contoh Peserta KP",
    images: ["01", "02"],
  },
];

export default function ProjectDetail() {
  const params = useParams<{ id: string }>();
  const project = projects.find(
    (item) => item.id === Number(params.id)
  );

  if (!project) {
    return (
      <main className="detail-page">
        <div className="detail-not-found">
          <h1>Proyek Tidak Ditemukan</h1>
          <p>Maaf, proyek yang kamu cari tidak tersedia.</p>
          <Link href="/" className="button">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="detail-page">
      <header className="navbar">
        <Link className="brand" href="/">
          <span className="brand-mark">L</span>
          <span>
            Lontar<span className="brand-accent">Archive</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Beranda</Link>
          <Link href="/#katalog">Jelajahi Proyek</Link>
        </nav>

        <div className="nav-actions">
          <Link className="login-link" href="/login">
            Masuk
          </Link>
        </div>
      </header>

      <section className="detail-container">
        <Link href="/" className="detail-back">
          ← Kembali ke katalog
        </Link>

        <div className="detail-heading">
          <span className="detail-category">
            {project.category}
          </span>

          <h1>{project.title}</h1>

          <p>
            Dokumentasi proyek Kerja Praktik / Praktik Kerja
            Lapangan Lontarlab.
          </p>
        </div>

        <div className="detail-information">
          <div>
            <span>TAHUN</span>
            <strong>{project.year}</strong>
          </div>

          <div>
            <span>PENYUSUN</span>
            <strong>{project.author}</strong>
          </div>

          <div>
            <span>BIDANG</span>
            <strong>{project.category}</strong>
          </div>
        </div>

        <section className="detail-section">
          <h2>Deskripsi Proyek</h2>
          <p>{project.description}</p>
        </section>

        <section className="detail-section">
          <h2>Teknologi yang Digunakan</h2>

          <div className="technology-tags">
            {project.technologies.map((technology) => (
              <span className="technology-tag" key={technology}>
                {technology}
              </span>
            ))}
          </div>
        </section>

        <section className="detail-section">
          <h2>Dokumentasi Proyek</h2>
          <p className="detail-muted">
            Dokumentasi tampilan dan hasil pengerjaan proyek.
          </p>

          <div className="detail-gallery">
            {project.images.map((image, index) => (
              <div className="detail-image" key={image}>
                <div className="detail-image-placeholder">
                  <span>Gambar {index + 1}</span>
                  <strong>{project.title}</strong>
                </div>
                <p>Dokumentasi {index + 1}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="detail-section comment-section">
          <h2>Komentar</h2>
          <p className="detail-muted">
            Belum ada komentar pada proyek ini.
          </p>

          <div className="comment-notice">
            Silakan masuk menggunakan akun yang telah disetujui
            untuk berpartisipasi dalam diskusi proyek.
            <Link href="/login"> Masuk di sini.</Link>
          </div>
        </section>

        <div className="detail-bottom">
          <Link href="/" className="button">
            ← Kembali ke Katalog
          </Link>
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