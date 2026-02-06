# AURUM main page (Vite + TypeScript)

Используется:
- Vite
- TypeScript
- Less
- ESM-импорты
- Tree-shaking
- Вынос внешних библиотек в отдельный файл

---

## Структура проекта

```text
/
├─ index.html        — HTML главной страницы (точка входа)
├─ script.ts         — основной скрипт лендинга (TypeScript, ESM)
├─ style.less        — стили конкретной страницы
├─ ui-kit.less       — общий UI-kit (CSS-переменные, дизайн-токены)
├─ vite.config.ts    — конфигурация Vite
├─ tsconfig.json     — конфигурация TypeScript
├─ package.json
├─ README.md
├─ .gitignore
├─ dist/             — production-сборка (генерируется)
│  ├─ index.html
│  ├─ ui-kit.css     — UI-kit, общий для всех страниц
│  ├─ style.css      — стили текущей страницы
│  ├─ script.js      — основной JS
│  └─ modules.js     — внешние библиотеки (GSAP, Swiper, lodash)
└─ node_modules/
```

---

## Установка зависимостей

```bash
npm install
```

---

## Режим разработки

```bash
npm run dev
```

---

## Сборка проекта

```bash
npm run build
```

---

## production-билд

- style.less компилируется в style.css

- script.ts компилируется в script.js

- Все реально используемые зависимости из node_modules
выносятся в отдельный файл modules.js

Код:

- минифицируется

- проходит tree-shaking

- В index.html автоматически добавляются:
```html
<link rel="stylesheet" href="/style.css">

<script type="module" src="/script.js"></script>
```

- Если внешние библиотеки импортированы, но не используются, они полностью удаляются из билда и modules.js не создаётся.

