"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/components/AuthProvider";

export default function AjukanProyek() {
  const { isLoggedIn, email } = useAuth();

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [technology, setTechnology] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [message, setMessage] = useState("");

  function handleImages(event: ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files || []);

    if (selectedFiles.length > 8) {
      setMessage("Maksimal 8 gambar dokumentasi.");
      setImages(selectedFiles.slice(0, 8));
      return;
    }

    setImages(selectedFiles);
    setMessage("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isLoggedIn) {
      setMessage("Silakan masuk terlebih dahulu.");
      return;
    }

    setMessage(
      "Pengajuan berhasil diuji! Data belum disimpan ke database. Fitur penyimpanan dan unggah gambar akan dihubungkan setelah integrasi Supabase dan Cloudflare R2."
    );
  }

  return (
    <main className="submission-page">
      <Navbar />

      <section className="submission-container">
        <Link href="/" className="detail-back">
          ← Kembali ke Beranda
        </Link>

        <div className="submission-heading">
          <p className="eyebrow">KONTRIBUSI ARSIP</p>
          <h1>Ajukan Proyek</h1>
          <p>
            Bagikan hasil proyek KP atau PKL kamu agar dapat menjadi
            referensi bagi peserta berikutnya.
          </p>
        </div>

        {!isLoggedIn ? (
          <div className="submission-notice">
            <strong>Masuk diperlukan</strong>
            <p>
              Kamu harus masuk terlebih dahulu untuk mengajukan proyek.
            </p>
            <Link href="/masuk" className="button">
              Masuk Sekarang
            </Link>
          </div>
        ) : (
          <form className="submission-form" onSubmit={handleSubmit}>
            <div className="submission-notice">
              <strong>Informasi Pengaju</strong>
              <p>
                Proyek ini diajukan oleh:
                <strong className="submission-author">
                  {" "}{email || "Pengguna"}
                </strong>
              </p>
            </div>

            <div className="submission-field">
              <label htmlFor="project-name">Nama Proyek *</label>
              <input
                id="project-name"
                type="text"
                placeholder="Masukkan nama proyek"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </div>

            <div className="submission-field">
              <label htmlFor="project-category">Jenis Proyek *</label>
              <select
                id="project-category"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="">Pilih jenis proyek</option>
                <option value="Website">Website</option>
                <option value="Mobile">Mobile</option>
                <option value="Desktop">Desktop</option>
                <option value="UI/UX">UI/UX</option>
              </select>
            </div>

            <div className="submission-field">
              <label htmlFor="project-description">
                Deskripsi Proyek *
              </label>
              <textarea
                id="project-description"
                placeholder="Jelaskan tujuan, fungsi, dan gambaran proyek..."
                rows={5}
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>

            <div className="submission-field">
              <label htmlFor="project-technology">
                Teknologi yang Digunakan *
              </label>
              <input
                id="project-technology"
                type="text"
                placeholder="Contoh: Next.js, TypeScript, PostgreSQL"
                value={technology}
                onChange={(event) => setTechnology(event.target.value)}
                required
              />
              <span className="field-hint">
                Pisahkan setiap teknologi menggunakan tanda koma.
              </span>
            </div>

            <div className="submission-field">
              <label htmlFor="project-images">
                Dokumentasi Proyek
              </label>
              <input
                id="project-images"
                type="file"
                accept="image/*"
                multiple
                onChange={handleImages}
              />
              <span className="field-hint">
                Pilih maksimal 8 gambar dokumentasi.
              </span>

              {images.length > 0 && (
                <div className="selected-images">
                  <strong>{images.length} gambar dipilih:</strong>
                  {images.map((image, index) => (
                    <span key={`${image.name}-${index}`}>
                      {index + 1}. {image.name}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="submission-notice">
              <strong>Informasi Persetujuan</strong>
              <p>
                Proyek yang diajukan akan melalui proses pemeriksaan
                admin sebelum ditampilkan di katalog LontarArchive.
              </p>
            </div>

            {message && (
              <div className="submission-message" role="status">
                {message}
              </div>
            )}

            <div className="submission-actions">
              <Link href="/" className="cancel-button">
                Batal
              </Link>

              <button type="submit" className="button">
                Ajukan Proyek →
              </button>
            </div>
          </form>
        )}
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