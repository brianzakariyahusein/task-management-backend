# Dokumentasi API Task Management

## 1️⃣ Autentikasi Pengguna

### 🔹 Registrasi

**Endpoint:** `POST /api/auth/register`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (201 - Created):**

```json
{
  "message": "Registrasi berhasil!",
  "user": {
    "id": "userId",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

---

### 🔹 Login

**Endpoint:** `POST /api/auth/login`

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response (200 - OK):**

```json
{
  "message": "Login berhasil!",
  "token": "JWT_TOKEN"
}
```

---

### 🔹 Forgot Password

**Endpoint:** `POST /api/auth/forgot-password`

**Request Body:**

```json
{
  "email": "john@example.com"
}
```

**Response (200 - OK):**

```json
{
  "message": "Email reset password telah dikirim!"
}
```

---

### 🔹 Reset Password

**Endpoint:** `POST /api/auth/reset-password`

**Request Body:**

```json
{
  "token": "RESET_TOKEN",
  "newPassword": "newpassword123"
}
```

**Response (200 - OK):**

```json
{
  "message": "Password berhasil direset!"
}
```

---

## 2️⃣ Manajemen Task

### 🔹 Buat Task Baru

**Endpoint:** `POST /api/tasks`

**Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN"
}
```

**Request Body:**

```json
{
  "title": "Belajar Node.js",
  "description": "Mempelajari dasar-dasar Node.js",
  "status": "todo" "in progress" "done",
  "dueDate": "2025-03-20T23:59:59.999Z"
}
```

**Response (201 - Created):**

```json
{
  "message": "Task berhasil dibuat!",
  "task": {
    "id": "taskId",
    "title": "Belajar Node.js",
    "description": "Mempelajari dasar-dasar Node.js",
    "status": "todo",
    "dueDate": "2025-03-20T23:59:59.999Z"
  }
}
```

---

### 🔹 Ambil Semua Task

**Endpoint:** `GET /api/tasks`

**Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN"
}
```

**Response (200 - OK):**

```json
[
  {
    "id": "taskId",
    "title": "Belajar Node.js",
    "description": "Mempelajari dasar-dasar Node.js",
    "status": "todo",
    "dueDate": "2025-03-20T23:59:59.999Z"
  }
]
```

---

### 🔹 Ambil Task Berdasarkan ID

**Endpoint:** `GET /api/tasks/:id`

**Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN"
}
```

**Response (200 - OK):**

```json
{
  "id": "taskId",
  "title": "Belajar Node.js",
  "description": "Mempelajari dasar-dasar Node.js",
  "status": "todo",
  "dueDate": "2025-03-20T23:59:59.999Z"
}
```

---

### 🔹 Update Task

**Endpoint:** `PUT /api/tasks/:id`

**Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN"
}
```

**Request Body:**

```json
{
  "id": "taskId",
  "title": "Belajar Node.js",
  "description": "Mempelajari dasar-dasar Node.js",
  "status": "todo" "=>" "done",
  "dueDate": "2025-03-20T23:59:59.999Z"
}
```

**Response (200 - OK):**

```json
{
  "message": "Task berhasil diperbarui!",
  "task": {
    "id": "taskId",
    "title": "Belajar Express.js",
    "description": "Mempelajari dasar-dasar Node.js",
    "status": "done",
    "dueDate": "2025-03-20T23:59:59.999Z"
  }
}
```

---

### 🔹 Hapus Task

**Endpoint:** `DELETE /api/tasks/:id`

**Headers:**

```json
{
  "Authorization": "Bearer JWT_TOKEN"
}
```

**Response (200 - OK):**

```json
{
  "message": "Task berhasil dihapus!"
}
```

---

## 3️⃣ Fitur Tambahan (Akan Datang)

- **Sorting & Filtering Task** 🔍
- **Deadline Reminder via Email** ⏳
- **Pagination untuk task list** 📄
- **Dashboard statistik tugas** 📊

---

**Dokumentasi API ini akan terus diperbarui! 🚀**
