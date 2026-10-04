# Changes Made to Fix NotesApi Project

---

## 1. routes/authRoute.js

### 1.1 Fixed import of authMiddleware
- **Problem:** `authMiddleware` was imported using destructuring `{ authMiddleware }`, but it is exported as a default export (`module.exports = authMiddleware`). This caused `authMiddleware` to be `undefined`, crashing the server with `"argument handler must be a function"`.
- **Before:** `const { authMiddleware } = require("../middleware/authMiddleware");`
- **After:** `const authMiddleware = require("../middleware/authMiddleware");`

### 1.2 Removed authMiddleware from register and login routes
- **Problem:** Register and login routes had `authMiddleware` applied, but users don't have a JWT token before they register or log in. This would block all registration and login attempts with a 401 error.
- **Before:** `router.post("/register", authMiddleware, register);` and `router.post("/login", authMiddleware, login);`
- **After:** `router.post("/register", register);` and `router.post("/login", login);`

### 1.3 Added GET routes for pages
- **Problem:** The app has EJS views for login, register, and dashboard but had no GET routes to render them. Navigating to `/login`, `/register`, or `/dashboard` in the browser would return "Cannot GET /login".
- **Added:**
  - `GET /` → redirects to `/login`
  - `GET /register` → renders `register.ejs`
  - `GET /login` → renders `login.ejs`
  - `GET /dashboard` → renders `dashboard.ejs` (protected by authMiddleware)

---

## 2. routes/noteRoute.js

### 2.1 Fixed import of authMiddleware
- **Problem:** Same destructuring import bug as authRoute.js.
- **Before:** `const { authMiddleware } = require("../middleware/authMiddleware");`
- **After:** `const authMiddleware = require("../middleware/authMiddleware");`

---

## 3. routes/userRoute.js

### 3.1 Fixed import of authMiddleware
- **Problem:** Same destructuring import bug as authRoute.js.
- **Before:** `const { authMiddleware } = require("../middleware/authMiddleware");`
- **After:** `const authMiddleware = require("../middleware/authMiddleware");`

### 3.2 Added POST route for profile update
- **Problem:** The `profile.ejs` form uses `method="POST"` (HTML forms can only send GET or POST), but the only update route was `router.patch("/profile", ...)`. So submitting the profile update form would result in no matching route.
- **After:** Added `router.post("/profile", authMiddleware, updateProfile);` alongside the existing PATCH route.

---

## 4. controllers/authController.js

### 4.1 Fixed register to save all form fields
- **Problem:** The register form sends `username`, `email`, `phone`, and `password`, but the controller only destructured `{ email, password }` from `req.body`. The `username` and `phone` fields were silently dropped, so users would be saved without a name or phone number.
- **Before:** `const { email, password } = req.body;` and `new User({ email, password: hashedPassword })`
- **After:** `const { username, email, phone, password } = req.body;` and `new User({ username, email, phone, password: hashedPassword })`

---

## 5. controllers/noteController.js

### 5.1 Fixed getNotes to render EJS view instead of sending JSON
- **Problem:** `getNotes` used `res.send(notes)` which sends raw JSON to the browser. The `Notes.ejs` view expects to be rendered with a `notes` variable using `res.render()`.
- **Before:** `res.send(notes);`
- **After:** `res.render("Notes", { notes });`

### 5.2 Fixed createNote to redirect instead of sending JSON
- **Problem:** After creating a note via the HTML form, `res.send(newNote)` would show raw JSON in the browser instead of redirecting back to the notes page.
- **Before:** `res.send(newNote);`
- **After:** `res.redirect("/notes");`

---

## 6. controllers/userController.js

### 6.1 Fixed getProfile to render EJS view instead of sending JSON
- **Problem:** `getProfile` used `res.send(user)` which sends raw JSON. The `profile.ejs` view expects to be rendered with a `user` variable using `res.render()`.
- **Before:** `res.send(user);`
- **After:** `res.render("profile", { user });`

### 6.2 Fixed updateProfile to redirect instead of sending JSON
- **Problem:** After updating profile via the HTML form, `res.send(profile)` would show raw JSON instead of redirecting back to the profile page.
- **Before:** `res.send(profile);`
- **After:** `res.redirect("/profile");`

---

## 7. views/*.ejs (All 5 EJS files)

### 7.1 Removed stray markdown backtick fences
- **Problem:** All five EJS view files (`login.ejs`, `register.ejs`, `dashboard.ejs`, `Notes.ejs`, `profile.ejs`) had literal ``` (triple backtick) lines inside the `<body>` tag. These are markdown syntax and do not belong in HTML/EJS files. They would render as visible text (```) on the web pages.
- **Fix:** Removed all ``` lines from every view file.

---

## Summary Table

| # | File                        | Issue                                       |
|---|-----------------------------|---------------------------------------------|
| 1 | routes/authRoute.js         | Wrong import syntax for authMiddleware       |
| 2 | routes/authRoute.js         | authMiddleware blocking register & login     |
| 3 | routes/authRoute.js         | Missing GET routes for pages                 |
| 4 | routes/noteRoute.js         | Wrong import syntax for authMiddleware       |
| 5 | routes/userRoute.js         | Wrong import syntax for authMiddleware       |
| 6 | routes/userRoute.js         | Missing POST route for profile update form   |
| 7 | controllers/authController  | Register not saving username & phone         |
| 8 | controllers/noteController  | getNotes sending JSON instead of rendering   |
| 9 | controllers/noteController  | createNote sending JSON instead of redirect  |
| 10| controllers/userController  | getProfile sending JSON instead of rendering |
| 11| controllers/userController  | updateProfile sending JSON instead of redirect|
| 12| views/*.ejs                 | Stray ``` backtick fences in all 5 views     |
