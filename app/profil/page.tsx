"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/components/AuthProvider";

export default function ProfilPage() {
  const { isLoggedIn, email } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.replace("/masuk");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return null;
  }

  const username = email ? email.split("@")[0] : "Pengguna";

  return (
    <main className="detail-page">
      <Navbar />

      <section className="detail-container">
        <Link href="/" className="detail-back">
          ← Kembali ke Beranda
        </Link>

        <div className="detail-heading">
          <span className="detail-category">PROFIL PENGGUNA</span>
          <h1>Profil Saya</h1>
          <p>
            Informasi akun pengguna LontarArchive.
          </p>
        </div>

        <div className="profile-information">
          <div className="profile-avatar">
            {username.charAt(0).toUpperCase()}
          </div>

          <div className="profile-data">
            <h2>{username}</h2>
            <p>{email}</p>
            <span className="profile-status">
              Pengguna LontarArchive
            </span>
          </div>
        </div>

        <section className="detail-section">
          <h2>Informasi Akun</h2>

          <div className="profile-detail-list">
            <div>
              <span>Nama Pengguna</span>
              <strong>{username}</strong>
            </div>

            <div>
              <span>Alamat Email</span>
              <strong>{email}</strong>
            </div>

            <div>
              <span>Status Akun</span>
              <strong>Sudah Masuk</strong>
            </div>
          </div>
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