export default {
  formatNestedData: async () => {
    try {
      const input = cari_judul_baru.text.trim(); // Ambil input pencarian
      const minLength = 4; // Minimal panjang karakter yang diizinkan
      const validPattern = /^[a-zA-Z0-9\s]+$/; // Hanya huruf, angka, dan spasi yang diperbolehkan

      // Cek panjang minimal
      if (input.length < minLength) {
        //showAlert("Masukkan minimal 3 karakter!", "warning");
        return; // Tidak melanjutkan jika input tidak valid
      }

      // Cek apakah hanya satu huruf atau karakter tidak valid
      if (!validPattern.test(input)) {
        showAlert("Gunakan hanya huruf dan angka!", "error");
        return; // Tidak melanjutkan jika input tidak valid
      }
      await untuk_js_function.run();
      const data = untuk_js_function.data;
      const nestedResult = {};

      data.forEach((row) => {
        // Tambahkan Peraturan jika belum ada
        if (!nestedResult[row.id_peraturan]) {
          nestedResult[row.id_peraturan] = {
            id: row.id_peraturan,
            judul_peraturan: row.judul_peraturan,
            deskripsi: row.deskripsi || "-",
            tanggal_diterbitkan: row.tanggal_diterbitkan || "-",
						status: row.status || "-",
            bab: {}
          };
        }

        // Tambahkan Bab jika ada
        if (row.id_bab && !nestedResult[row.id_peraturan].bab[row.id_bab]) {
          nestedResult[row.id_peraturan].bab[row.id_bab] = {
            id: row.id_bab,
            judul_bab: row.judul_bab,
            nomor_bab: row.nomor_bab,
            isi_bab: row.isi_bab || "-",
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
              isi_subbab: row.isi_subbab || "-",
              penjelasan: []
            };
          }

          // Tambahkan Penjelasan jika ada
          if (row.id_penjelasan) {
            currentBab.subbab[row.id_subbab].penjelasan.push(
              `- **${row.jenis_konten}**: ${row.konten}`
            );
          }
        }
      });

      // Ubah ke format Markdown untuk tampilan lebih rapi
      let markdown = "";
      Object.values(nestedResult).forEach((peraturan) => {
        markdown += `## ${peraturan.judul_peraturan}\n`;
        markdown += `*Deskripsi:* ${peraturan.deskripsi}\n`;
        markdown += `*Tanggal Diterbitkan:* ${peraturan.tanggal_diterbitkan}\n\n`;
				//markdown += `Status Peraturan: ${peraturan.status}\n\n`;
				markdown += `Status Peraturan: <span style="background-color: ${peraturan.status === 'active' ? 'green' : 'transparent'}; color: ${peraturan.status === 'active' ? 'white' : 'black'}; padding: 3px;">${peraturan.status}</span>\n\n`;

        Object.values(peraturan.bab).forEach((bab) => {
          markdown += `### Bab ${bab.nomor_bab}: ${bab.judul_bab}\n`;
          markdown += `${bab.isi_bab}\n\n`;

          Object.values(bab.subbab).forEach((subbab) => {
            markdown += `#### Subbab ${subbab.nomor_subbab}: ${subbab.judul_subbab}\n`;
            markdown += `${subbab.isi_subbab}\n\n`;

            if (subbab.penjelasan.length > 0) {
              markdown += "**Penjelasan:**\n";
              markdown += subbab.penjelasan.join("\n") + "\n\n";
            }
          });
        });

        markdown += "---\n\n";
      });

      return markdown;
    } catch (error) {
      console.error("Error fetching data:", error);
      return "Terjadi kesalahan dalam mengambil data.";
    }
  }
};
