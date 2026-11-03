"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const dummyAccounts = [
  {
    email: "mahasiswa@lontar.test",
    password: "123456",
    name: "Andi Pratama",
    role: "mahasiswa",
  },
  {
    email: "staf@lontar.test",
    password: "123456",
    name: "Siti Rahma",
    role: "staf",
  },
  {
    email: "admin@lontar.test",
    password: "123456",
    name: "Administrator",
    role: "admin",
  },
];

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const account = dummyAccounts.find(
      (item) =>
        item.email === email &&
        item.password === password
    );

    if (!account) {
      setMessage("Email atau kata sandi tidak sesuai.");
      return;
    }

    const session = {
      name: account.name,
      email: account.email,
      role: account.role,
    };

    localStorage.setItem("lontar-user", JSON.stringify(session));

    if (account.role === "admin") {
      router.push("/admin");
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <main className="auth-page">
      <Link href="/" className="auth-back">
        ← Kembali ke beranda
      </Link>

      <section className="auth-card">
        <Link href="/" className="brand auth-brand">
          <span className="brand-mark">L</span>
          <span>
            Lontar<span className="brand-accent">Archive</span>
          </span>
        </Link>

        <div className="auth-heading">
          <h1>Selamat datang kembali</h1>
          <p>Masuk untuk melanjutkan ke LontarArchive.</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Alamat email</label>

          <input
            id="email"
            type="email"
            placeholder="Masukkan alamat email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />

          <label htmlFor="password">Kata sandi</label>

          <input
            id="password"
            type="password"
            placeholder="Masukkan kata sandi"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />

          <button className="button auth-submit" type="submit">
            Masuk
          </button>

          {message && (
            <p className="auth-message" role="alert">
              {message}
            </p>
          )}
        </form>

        <div className="dummy-account-info">
          <strong>Akun untuk pengujian</strong>
          <p>Mahasiswa: mahasiswa@lontar.test</p>
          <p>Staf: staf@lontar.test</p>
          <p>Admin: admin@lontar.test</p>
          <p>Password semua akun: 123456</p>
        </div>

        <p className="auth-note">
          Gunakan akun yang tersedia untuk simulasi pengembangan
          LontarArchive.
        </p>
      </section>

      <p className="auth-footer">
        © 2026 LontarArchive · Arsip proyek KP & PKL Lontarlab
      </p>
    </main>
  );
}