# AURUM main page (Vite + TypeScript)

Используется:
- Vite
- TypeScript (ESNext)
- Less
- ESM-импорты
- Tree-shaking
- Вынос внешних библиотек в отдельный vendor-файл

---

## Структура проекта

/
├─ index.html        — HTML лендинга  
├─ script.ts         — основной скрипт (TypeScript, ESM)  
├─ style.less        — стили лендинга  
├─ vite.config.ts    — конфигурация Vite  
├─ tsconfig.json     — конфигурация TypeScript  
├─ package.json  
├─ dist/             — результат сборки (генерируется)  
└─ node_modules/  

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

