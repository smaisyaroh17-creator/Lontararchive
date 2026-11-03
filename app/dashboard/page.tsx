"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type UserSession = {
  name: string;
  email: string;
  role: string;
};

export default function UserDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<UserSession | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem("lontar-user");

    if (!savedUser) {
      router.replace("/login");
      return;
    }

    try {
      const account: UserSession = JSON.parse(savedUser);

      if (account.role === "admin") {
        router.replace("/admin");
        return;
      }

      setUser(account);
    } catch {
      localStorage.removeItem("lontar-user");
      router.replace("/login");
    } finally {
      setLoading(false);
    }
  }, [router]);

  function handleLogout() {
    localStorage.removeItem("lontar-user");
    router.push("/");
  }

  if (loading || !user) {
    return <main className="user-dashboard-loading">Memuat dashboard...</main>;
  }

  return (
    <main className="user-dashboard">
      <header className="navbar">
        <Link href="/" className="brand">
          <span className="brand-mark">L</span>
          <span>
            Lontar<span className="brand-accent">Archive</span>
          </span>
        </Link>

        <nav className="nav-links">
          <Link href="/">Beranda</Link>
          <Link href="/#katalog">Jelajahi Proyek</Link>
          <Link href="/ajukan-proyek">Ajukan Proyek</Link>
        </nav>

        <button
          className="dashboard-logout"
          type="button"
          onClick={handleLogout}
        >
          Keluar
        </button>
      </header>

      <section className="user-dashboard-container">
        <div className="user-welcome">
          <div>
            <p className="eyebrow">DASHBOARD PENGGUNA</p>
            <h1>Halo, {user.name}!</h1>
            <p>
              Selamat datang di ruang pengguna LontarArchive.
              Kelola pengajuan dan temukan referensi proyek di sini.
            </p>
          </div>

          <div className="user-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
        </div>

        <section className="user-profile-card">
          <h2>Informasi Akun</h2>

          <div className="user-profile-details">
            <div>
              <span>Nama</span>
              <strong>{user.name}</strong>
            </div>

            <div>
              <span>Email</span>
              <strong>{user.email}</strong>
            </div>

            <div>
              <span>Peran</span>
              <strong>
                {user.role === "mahasiswa"
                  ? "Mahasiswa KP/PKL"
                  : "Staf Lontarlab"}
              </strong>
            </div>
          </div>
        </section>

        <section className="user-dashboard-grid">
          <article className="user-feature-card">
            <div className="user-feature-icon">＋</div>
            <h2>Ajukan Proyek</h2>
            <p>
              Kirim dokumentasi proyek KP atau PKL agar dapat
              menjadi referensi bagi pengguna lain.
            </p>
            <Link href="/ajukan-proyek" className="button">
              Ajukan Sekarang →
            </Link>
          </article>

          <article className="user-feature-card">
            <div className="user-feature-icon">⌕</div>
            <h2>Jelajahi Proyek</h2>
            <p>
              Cari dan pelajari berbagai proyek yang sudah
              tersedia di arsip Lontarlab.
            </p>
            <Link href="/#katalog" className="button">
              Lihat Katalog →
            </Link>
          </article>

          <article className="user-feature-card">
            <div className="user-feature-icon">▤</div>
            <h2>Proyek Saya</h2>
            <p>
              Nantinya kamu dapat melihat status pengajuan
              dan daftar proyek yang sudah kamu kirim.
            </p>
            <span className="feature-coming-soon">
              Akan tersedia setelah integrasi database
            </span>
          </article>
        </section>

        <div className="user-dashboard-note">
          <strong>Informasi</strong>
          <p>
            Dashboard ini masih menggunakan akun simulasi.
            Data pengajuan dan profil belum tersimpan ke database.
          </p>
        </div>
      </section>

      <footer className="footer">
        <Link href="/" className="brand footer-brand">
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