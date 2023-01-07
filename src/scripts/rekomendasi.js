import axios from "axios";
import helper from "./main";

const baseURL = "https://masak-apa-tomorisakura.vercel.app";
const randomPageMasakan = Math.round(Math.random() * 100);

let kolomMasakan1 = document.getElementById("kolom-masakan-1");
let kolomMasakan2 = document.getElementById("kolom-masakan-2");
let daftarRekomendasiMasakan = document.getElementById(
  "daftar-rekomendasi-masakan"
);

const rekomendasiMasakan = () => {
  axios
    .get(`${baseURL}/api/recipes/${randomPageMasakan}`)
    .then((response) => {
      let datas = response.data.results;

      let gambarMasakan1 = "";
      let gambarMasakan2 = "";

      for (let i = 0; i < 10; i++) {
        i < 5
          ? (gambarMasakan1 += `<img class="kolom-masakan-gambar" src="${datas[i].thumb}">`)
          : (gambarMasakan2 += `<img class="kolom-masakan-gambar" src="${datas[i].thumb}">`);
      }

      if (!kolomMasakan1 | !kolomMasakan2) return false;
      kolomMasakan1.innerHTML = gambarMasakan1;
      kolomMasakan2.innerHTML = gambarMasakan2;

      let senarai = "";

      datas.forEach((i) => {
        senarai += `<li>${helper.clearJudul(i.title)}</li>`;
      });

      daftarRekomendasiMasakan.innerHTML = senarai;
    })
    .catch((response) => {
      if (response.code == "ERR_NETWORK") {
        return helper.notifikasi("Masalah", "Sepertinya ada masalah pada API");
      }
    });
};

export default rekomendasiMasakan;
