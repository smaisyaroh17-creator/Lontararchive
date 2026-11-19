"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Navbar() {
  const { isLoggedIn, email, logout } = useAuth();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/");
  }

  return (
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

        {!isLoggedIn && (
          <Link href="/#ajukan">Ajukan Proyek</Link>
        )}
      </nav>

      <div className="nav-actions">
        {!isLoggedIn ? (
          <Link className="login-button" href="/masuk">
            Masuk
          </Link>
        ) : (
          <>
            <div className="profile-menu-wrapper">
              <button
                type="button"
                className="profile-menu-button"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                {email ? email.split("@")[0] : "Pengguna"}
                <span>⌄</span>
              </button>

              {profileMenuOpen && (
                <div className="profile-dropdown">
                  <Link href="/profil">Profil Saya</Link>
                  <Link href="/riwayat-pengajuan">
                    Riwayat Pengajuan
                  </Link>
                  <button type="button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
            </div>

            <Link
              href="/ajukanproyek"
              className="add-project-button"
              aria-label="Ajukan Proyek"
              title="Ajukan Proyek"
            >
              +
            </Link>
          </>
        )}
      </div>
    </header>
  );
}