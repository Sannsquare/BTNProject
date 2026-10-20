const form = document.getElementById("formPengaduan");
const pesan = document.getElementById("pesan");
const hitung = document.getElementById("hitung");
const setuju = document.getElementById("setuju");
const kirim = form.querySelector(".btn");
const jenis = document.getElementById("jenis");

// Penghitung karakter 0/1000
pesan.addEventListener("input", () => {
  hitung.textContent = pesan.value.length;
});

// Tombol kirim nonaktif jika pernyataan tidak dicentang
setuju.addEventListener("change", () => {
  kirim.disabled = !setuju.checked;
});

// Hanya angka pada nomor telepon
document.getElementById("telepon").addEventListener("input", (e) => {
  e.target.value = e.target.value.replace(/[^\d+]/g, "");
});

// Validasi sederhana
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let valid = true;

  form.querySelectorAll("[required]:not([type=radio])").forEach((el) => {
    const kosong = !el.value.trim();
    el.classList.toggle("is-invalid", kosong);
    if (kosong) valid = false;
  });

  // Jenis pengaduan wajib dipilih
  const jenisBelumDipilih = !form.querySelector('input[name="jenis"]:checked');
  jenis.classList.toggle("is-invalid", jenisBelumDipilih);
  if (jenisBelumDipilih) valid = false;

  if (!valid) {
    // Fokus ke isian pertama yang bermasalah sesuai urutan di halaman
    const pertama = form.querySelector(".is-invalid");
    if (pertama === jenis) {
      pertama.scrollIntoView({ behavior: "smooth", block: "center" });
      pertama.querySelector("input").focus({ preventScroll: true });
    } else {
      pertama.focus();
    }
    return;
  }

  // TODO: kirim data ke server di sini (fetch/axios)
  alert("Pengaduan Anda berhasil dikirim.");
  form.reset();
  hitung.textContent = "0";
});

// Hapus tanda error saat pengguna mengetik
form.addEventListener("input", (e) => e.target.classList.remove("is-invalid"));
jenis.addEventListener("change", () => jenis.classList.remove("is-invalid"));