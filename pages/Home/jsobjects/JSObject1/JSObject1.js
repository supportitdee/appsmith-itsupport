export default {
  formatNestedData: async () => {
    try {
      // Cek apakah ada input pencarian sebelum menjalankan query
      if (!cari_judul_baru.text) {
        return [];
      }

      // Jalankan query berdasarkan input pencarian
      await untuk_js_function.run();

      // Ambil data dari hasil query
      const data = untuk_js_function.data;

      // Objek untuk menyimpan data dalam struktur nested
      const nestedResult = {};

      data.forEach((row) => {
        // Tambahkan Peraturan jika belum ada
        if (!nestedResult[row.id_peraturan]) {
          nestedResult[row.id_peraturan] = {
            id: row.id_peraturan,
            judul_peraturan: row.judul_peraturan,
            deskripsi: row.deskripsi || "", // Pastikan deskripsi masuk
            tanggal_diterbitkan: row.tanggal_diterbitkan || "", // Pastikan tanggal masuk
            bab: {}
          };
        }

        // Tambahkan Bab jika ada
        if (row.id_bab && !nestedResult[row.id_peraturan].bab[row.id_bab]) {
          nestedResult[row.id_peraturan].bab[row.id_bab] = {
            id: row.id_bab,
            judul_bab: row.judul_bab,
            nomor_bab: row.nomor_bab,
            isi_bab: row.isi_bab || "", // Tambahkan isi_bab jika ada
            subbab: {}
          };
        }

        // Tambahkan Subbab jika ada
        if (row.id_subbab && row.id_bab) {
          const currentBab = nestedResult[row.id_peraturan].bab[row.id_bab];
          if (!currentBab.subbab[row.id_subbab]) {
            currentBab.subbab[row.id_subbab] = {
              id: row.id_subbab,
              judul_subbab: row.judul_subbab,
              nomor_subbab: row.nomor_subbab,
              isi_subbab: row.isi_subbab || "", // Tambahkan isi_subbab jika ada
              penjelasan: []
            };
          }

          // Tambahkan Penjelasan jika ada
          if (row.id_penjelasan) {
            currentBab.subbab[row.id_subbab].penjelasan.push({
              id: row.id_penjelasan,
              konten: row.konten
            });
          }
        }
      });

      // Kembalikan data yang sudah di-nested dalam bentuk array
      return Object.values(nestedResult);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  }
};
