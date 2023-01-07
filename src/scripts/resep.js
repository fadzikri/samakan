import axios from "axios";
import Swal from "sweetalert2";
import helper from "./main";

const baseURL = "https://masak-apa-tomorisakura.vercel.app/api";
const cariInput = document.getElementById("cari-input");
const cariBtn = document.getElementById("cari-btn");

if (cariBtn) {
  cariBtn.addEventListener("click", () => {
    if (!cariInput.value) {
      return helper.notifikasi(
        "Kosong",
        "Isi kolom cari untuk mendapatkan resep!"
      );
    }

    helper.notifikasi("Tunggu", "Sedang mencari dan mengambil data resep");

    axios
      .get(`${baseURL}/search/?q=${cariInput.value}`)
      .then((res) => {
        if (!res.data.results.length) {
          return helper.notifikasi("Kosong", "Resep tersebut tidak ada!");
        }

        const cari = document.getElementById("cari");
        cari.innerHTML = "";

        res.data.results.forEach((tautan) => {
          let judul = helper.clearJudul(tautan.title);

          let tautanCari = document.createElement("tautan-cari");
          let senaraiCari = document.createElement("senarai-cari");
          let detailCari = document.createElement("detail-cari");

          senaraiCari.innerHTML = judul;
          detailCari.setAttribute("class", "btn");
          detailCari.setAttribute("id", tautan.key);

          tautanCari.append(senaraiCari, detailCari);
          cari.append(tautanCari);
        });

        cariInput.value = "";
        setResepId();
      })
      .catch((res) => {
        if (res.code == "ERR_NETWORK") {
          return helper.notifikasi("Masalah", "Seperti ada masalah pada API");
        }
      });
  });
}

const setResepId = () => {
  document.querySelectorAll("detail-cari").forEach((elemen) => {
    elemen.addEventListener("click", (e) => {
      axios
        .get(`${baseURL}/recipe/${e.target.id}`)
        .then((res) => {
          showResep(res.data.results);
        })
        .catch(() => {
          helper.notifikasi("Masalah", "Seperti ada masalah pada API");
        });
    });
  });
};

const showResep = (datas) => {
  let judul = helper.clearJudul(datas.title);

  let gambar = datas.thumb;
  if (!gambar) {
    gambar = `<div><p>Tidak ada gambar</p></div>`;
  } else {
    gambar = `<img src="${datas.thumb}" class="popup-gambar">`;
  }

  let bahan = "";
  datas.ingredient.forEach((bhn) => {
    bahan += `<li>${bhn}</li>`;
  });
  datas.needItem.forEach((bhn) => {
    bahan += `<li>${bhn.item_name}</li>`;
  });

  let steps = "";
  datas.step.forEach((stp) => {
    steps += `<li>${stp.replace(/^\d./, "")}</li>`;
  });

  Swal.fire({
    html: `
	<div class="popup-detail">
	<h2>${judul}</h2>
	${gambar}
	<h4>Bahan-bahan</h4>
	<ul>${bahan}</ul>
	<h4>Langkah-Langkah</h4>
	<ul>${steps}</ul>
	</div>
	`,
    buttonsStyling: false,
    width: "100%",
    customClass: {
      confirmButton: "btn swal-ok",
    },
  });
};
