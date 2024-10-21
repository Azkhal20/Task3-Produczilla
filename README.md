# Instalasi
1. **Clone Repository**
   - Pertama, clone repository ini ke komputer kamu dengan perintah berikut:
     ```bash
     git clone https://github.com/username/repository.git
     ```

2. **Masuk ke Direktori Project**
   - Setelah selesai meng-clone, masuk ke folder project dengan perintah:
     ```bash
     cd repository
     ```

3. **Instal Dependensi**
   - Instal semua dependensi yang diperlukan dengan menjalankan:
     ```bash
     npm install
     ```

# Cara Menjalankan Project

### Untuk Mengenkripsi File
Gunakan perintah berikut untuk mengenkripsi file. Ganti `path/to/your/file.txt` dengan path file yang ingin kamu enkripsi dan `yourPassword` dengan password yang kamu pilih.

```bash
npx ts-node src/index.ts encrypt ./test.txt myPassword
```
### Output
```bash
File 'test.txt' berhasil dienkripsi menjadi 'test_encrypted.txt'
```

### Untuk Mendekripsi File
path/to/your/encrypted_file.txt dengan path file terenkripsi yang ingin kamu dekripsi dan yourPassword dengan password yang digunakan saat enkripsi.

```bash
npx ts-node src/index.ts decrypt ./test_encrypted.txt myPassword
```
### Output
```bash
File 'test_encrypted.txt' berhasil didekripsi menjadi 'test.txt'

```

# Penanganan Error
```bash
Error: Password yang dimasukkan salah
```
### Jika File Tidak Ditemukan
```bash
Error: ENOENT: no such file or directory, open 'C:\path\to\file.txt'
```
