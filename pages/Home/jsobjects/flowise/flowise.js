export default {
  queryFlowise: async (question) => {
    const response = await fetch(
      "https://flowise.cptsnj.online/api/v1/prediction/f7614cd1-d95c-4050-9534-b96a0c538f67",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ "question": question })
      }
    );
    const result = await response.json();
    return result;  // Hasil dari API bisa digunakan lebih lanjut
  }
};
