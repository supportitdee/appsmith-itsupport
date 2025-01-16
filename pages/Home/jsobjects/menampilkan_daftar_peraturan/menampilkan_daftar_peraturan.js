export default {
  formatNestedData: () => {
    // Ambil data dari hasil query
    const data = tampil_dta.data; // Pastikan mengganti Query1 dengan nama query Anda

    // Objek untuk menyimpan data nested
    const nestedResult = {};

    data.forEach((row) => {
      // Tambahkan Peraturan jika belum ada
      if (!nestedResult[row.id_peraturan]) {
        nestedResult[row.id_peraturan] = {
          id: row.id_peraturan,
          judul_peraturan: row.judul_peraturan,
          bab: {}
        };
      }

      // Tambahkan Bab jika ada
      if (row.id_bab && !nestedResult[row.id_peraturan].bab[row.id_bab]) {
        nestedResult[row.id_peraturan].bab[row.id_bab] = {
          id: row.id_bab,
          judul_bab: row.judul_bab,
          nomor_bab: row.nomor_bab,
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
  }
};
