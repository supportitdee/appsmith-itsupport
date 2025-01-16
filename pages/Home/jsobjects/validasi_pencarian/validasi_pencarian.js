export default {
  validateSearch: () => {
    const input = cari_judul_baru.text.trim(); // Ambil input pencarian
    const minLength = 3; // Minimal panjang karakter yang diizinkan
    const validPattern = /^[a-zA-Z0-9\s]+$/; // Hanya huruf, angka, dan spasi yang diperbolehkan

    // Cek panjang minimal
    if (input.length < minLength) {
      showAlert("Masukkan minimal 3 karakter!", "warning");
      return null; // Mengembalikan null jika input tidak valid
    }

    // Cek apakah hanya satu huruf atau karakter tidak valid
    if (!validPattern.test(input)) {
      showAlert("Gunakan hanya huruf dan angka!", "error");
      return null; // Mengembalikan null jika input tidak valid
    }

    return input; // Mengembalikan input yang valid
  },

  runSearch: () => {
    const input = this.validateSearch();
    if (input) {
      console.log("Input valid:", input);  // Hanya menampilkan input yang valid
      return input;  // Kembalikan input yang valid
    }
    return null;  // Mengembalikan null jika tidak valid
  }
};
