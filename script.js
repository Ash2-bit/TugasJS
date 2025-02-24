const inputBox = document.getElementById("input-box");  
const listContainer = document.getElementById("list-container");

// Fungsi untuk menampilkan notifikasi
function showNotification(message, type = "info") {
    let notification = document.createElement("div");
    notification.className = `notification ${type}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    // Hapus notifikasi setelah 2 detik
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Fungsi untuk menambah tugas
function addTask() {
    if (!confirm("Apakah Anda yakin ingin menambahkan tugas ini?")) return;
    
    if (inputBox.value.trim() === "") {
        showNotification("Anda harus menulis sesuatu!", "warning");
        return;
    }

    let li = document.createElement("li");
    li.innerHTML = inputBox.value;

    let editButton = document.createElement("button");
    editButton.textContent = "ubah ✏️"; // Ikon edit
    editButton.className = "edit-btn";
    editButton.onclick = function () {
        editTask(li);
    };

    let deleteButton = document.createElement("span");
    deleteButton.innerHTML = "\u00d7"; // Simbol "X" untuk menghapus
    deleteButton.onclick = function () {
        confirmDelete(li);
    };

    li.appendChild(editButton);
    li.appendChild(deleteButton);
    listContainer.appendChild(li);
    showNotification("Tugas berhasil ditambahkan!", "success");
    inputBox.value = "";

    saveData();
}

// Fungsi untuk mengedit tugas
function editTask(li) {
    if (!confirm("Apakah Anda yakin ingin mengedit tugas ini?")) return;
    
    let newValue = prompt("Edit tugas:", li.firstChild.textContent);
    if (newValue !== null && newValue.trim() !== "") {
        li.firstChild.textContent = newValue;
        showNotification("Tugas diperbarui!", "success");
        saveData();
    }
}

// Fungsi konfirmasi sebelum menghapus tugas
function confirmDelete(li) {
    if (confirm("Apakah Anda yakin ingin menghapus tugas ini?")) {
        li.remove();
        showNotification("Tugas dihapus!", "error");
        saveData();
    }
}

// Event listener untuk klik pada daftar tugas
listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        if (confirm("Apakah Anda yakin ingin menandai tugas ini sebagai selesai?")) {
            e.target.classList.toggle("checked");
            showNotification("Tugas selesai!", "success");
            saveData();
        }
    }
}, false);

// Fungsi untuk menyimpan data ke localStorage
function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

// Fungsi untuk menampilkan tugas yang tersimpan
function showTask() {
    listContainer.innerHTML = localStorage.getItem("data") || "";

    // Tambahkan kembali event listener untuk tombol edit setelah halaman dimuat
    document.querySelectorAll(".edit-btn").forEach(button => {
        button.onclick = function () {
            editTask(button.parentElement);
        };
    });
}


// Fungsi untuk menghapus semua data tersimpan
function clearAllTasks() {
    if (confirm("Apakah Anda yakin ingin menghapus semua tugas?")) {
        localStorage.removeItem("data"); // Hapus data dari localStorage
        listContainer.innerHTML = ""; // Hapus semua tugas dari tampilan
        showNotification("Semua tugas telah dihapus!", "error");
    }
}

// Tambahkan event listener ke tombol hapus semua (jika ada)
document.getElementById("clear-btn")?.addEventListener("click", clearAllTasks);


// Memuat tugas yang tersimpan saat halaman dimuat
document.addEventListener("DOMContentLoaded", showTask);
