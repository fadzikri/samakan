import axios from "axios";
import restdb from "./restdb";
import helper from "./main";

const daftarRencana = document.getElementById("daftar-rencana");
const rencana = document.getElementById("rencana");
const kirim = document.getElementById("kirim");

if (rencana) {
  kirim.addEventListener("click", () => {
    if (!rencana.value) {
      return helper.notifikasi(
        "Kosong",
        "Isi kolom rencana untuk menambahkan data!"
      );
    }

    let teks = rencana.value;
    teks = teks.replace(/\n|\r/g, "<br>");

    axios
      .post(restdb.url, { teks }, restdb.headers)
      .then((res) => {
        if (res.status == 201) {
          helper.notifikasi("Disimpan", "Rencana berhasil disimpan!");

          rencana.value = "";
          rencanaTampil();
        }
      })
      .catch((res) => {
        if (res.code == "ERR_NETWORK") {
          return helper.notifikasi("Galat", "Periksa sambungan internet!");
        }
      });
  });
}

const rencanaTampil = () => {
  axios
    .get(restdb.url, restdb.headers)
    .then((response) => {
      const datas = response.data;

      datas.length
        ? (daftarRencana.innerHTML = "")
        : (daftarRencana.innerHTML = `
	  <senarai-rencana id="404">
			<teks-rencana>Tidak ada rencana ¯\\_(ツ)_/¯</teks-rencana>
			<hapus-rencana class="btn"></hapus-rencana>
	  </senarai-rencana>
	  `);

      datas.forEach((result) => {
        const senaraiRencana = document.createElement("senarai-rencana");
        const teksRencana = document.createElement("teks-rencana");
        const hapusRencana = document.createElement("hapus-rencana");

        teksRencana.innerHTML = result.teks;

        senaraiRencana.setAttribute("id", result._id);

        hapusRencana.setAttribute("class", "btn");
        hapusRencana.setAttribute("id", result._id);

        senaraiRencana.append(teksRencana, hapusRencana);
        daftarRencana.append(senaraiRencana);
      });

      rencanaHapus();
    })
    .catch((res) => {
      if (res.code == "ERR_NETWORK") {
        return helper.notifikasi("Galat", "Periksa sambungan internet!");
      }
    });
};

const rencanaHapus = () => {
  if (document.getElementById("404")) {
    return false;
  }

  const setIdHapus = document.querySelectorAll("hapus-rencana");
  setIdHapus.forEach((senarai) => {
    senarai.addEventListener("click", (e) => {
      document.getElementById(e.target.id).remove;
      axios
        .delete(`${restdb.url}/${e.target.id}`, restdb.headers)
        .then((res) => {
          if (res.status === 200) {
            helper.notifikasi("Dihapus", "Rencana berhasil dihapus!");
            rencanaTampil();
          }
        })
        .catch((res) => {
          if (res.code === "ERR_BAD_REQUEST") {
            helper.notifikasi("Kosong", "Rencana sudah dihapus!");
          }
        });
    });
  });
};

export default rencanaTampil;
