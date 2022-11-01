import "sakura.css/css/normalize.css";
import "sakura.css/css/sakura.css";
import "../style/override.css";
import "../style/font-face.css";
import "../style/tags.css";
import "../style/classes.css";
import "../style/popup.css";
import "./komponen";
import "./resep";
import rencanaTampil from "./rencana";
import rekomendasiMasakan from "./rekomendasi";
import Swal from "sweetalert2";

const daftarRencana = document.getElementById("daftar-rencana");
const daftarRekomendasi = document.getElementById("daftar-rekomendasi-masakan");

document.addEventListener("DOMContentLoaded", () => {
  daftarRekomendasi ? rekomendasiMasakan() : false;
  daftarRencana ? rencanaTampil() : false;
});

const helper = {
  notifikasi(judul, teks) {
    Swal.fire({
      title: judul,
      text: teks,
      buttonsStyling: false,
      customClass: {
        confirmButton: "btn swal-ok",
      },
    });
  },
  clearJudul(datas) {
    let judul = datas;
    judul = judul.replace(/cara|resep|(untuk|dengan|yang|agar|a la).*/gi, "");
    judul = judul.replace(/,.*/, "");

    return judul;
  },
};
export default helper;
