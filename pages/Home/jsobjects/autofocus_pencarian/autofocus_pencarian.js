export default {
  formatNestedData: async () => {
    try {
      const input = cari_judul_baru.text.trim();
      const minLength = 3;
      const validPattern = /^[a-zA-Z0-9\s]+$/;

      // Validasi input pencarian
      if (input.length < minLength) {
        return "Masukkan minimal 3 karakter untuk pencarian!";
      }

      if (!validPattern.test(input)) {
        return "Gunakan hanya huruf dan angka!";
      }

      await untuk_js_function.run();
      const data = untuk_js_function.data;
      const nestedResult = {};

      data.forEach((row) => {
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

        if (row.id_bab && !nestedResult[row.id_peraturan].bab[row.id_bab]) {
          nestedResult[row.id_peraturan].bab[row.id_bab] = {
            id: row.id_bab,
            judul_bab: row.judul_bab,
            nomor_bab: row.nomor_bab,
            isi_bab: row.isi_bab || "-",
            subbab: {}
          };
        }

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

          if (row.id_penjelasan) {
            currentBab.subbab[row.id_subbab].penjelasan.push(
              `- <strong>${row.jenis_konten}</strong>: ${row.konten}`
            );
          }
        }
      });

      // Highlight pencarian
      let markdown = "";
      Object.values(nestedResult).forEach((peraturan) => {
        let title = peraturan.judul_peraturan;
        let description = peraturan.deskripsi;
        let status = peraturan.status;

        // Highlight pencarian
        const query = cari_judul_baru.text.trim();
        if (query) {
          const regex = new RegExp(`(${query})`, "gi");
          title = title.replace(regex, `<mark>$1</mark>`);
          description = description.replace(regex, `<mark>$1</mark>`);
        }

        // Tambahkan status dengan warna
        const statusColor =
          status.toLowerCase() === "active" ? "green" : "gray";

        markdown += `<h2>${title}</h2>`;
        markdown += `<p><strong>Deskripsi:</strong> ${description}</p>`;
        markdown += `<p><strong>Tanggal Diterbitkan:</strong> ${peraturan.tanggal_diterbitkan}</p>`;
        markdown += `<p><strong>Status:</strong> <span style="background-color: ${statusColor}; color: white; padding: 3px;">${status}</span></p>`;

        Object.values(peraturan.bab).forEach((bab) => {
          let babTitle = bab.judul_bab;
          if (query) {
            babTitle = babTitle.replace(regex, `<mark>$1</mark>`);
          }
          markdown += `<h3>Bab ${bab.nomor_bab}: ${babTitle}</h3>`;
          markdown += `<p>${bab.isi_bab}</p>`;

          Object.values(bab.subbab).forEach((subbab) => {
            let subTitle = subbab.judul_subbab;
            if (query) {
              subTitle = subTitle.replace(regex, `<mark>$1</mark>`);
            }
            markdown += `<h4>Subbab ${subbab.nomor_subbab}: ${subTitle}</h4>`;
            markdown += `<p>${subbab.isi_subbab}</p>`;

            if (subbab.penjelasan.length > 0) {
              markdown += `<p><strong>Penjelasan:</strong></p>`;
              markdown += `<ul><li>${subbab.penjelasan.join("</li><li>")}</li></ul>`;
            }
          });
        });

        markdown += "<hr>";
      });

      return markdown;
    } catch (error) {
      console.error("Error fetching data:", error);
      return "Terjadi kesalahan dalam mengambil data.";
    }
  }
};
