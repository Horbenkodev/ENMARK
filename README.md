# ENMARK — сайт-візитка меблевого магазину

Каталог товарів (столи, стільці, підвіконня) з адмін-панеллю для керування категоріями, підкатегоріями та товарами. Без кошика й оплати — лише каталог і кнопка "Зв'язатися з нами".

## Стек

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19
- [Prisma ORM 7](https://www.prisma.io) + PostgreSQL (адаптер `@prisma/adapter-pg`)
- Tailwind CSS v4
- Проста cookie-based авторизація адмінки (без зовнішніх auth-провайдерів)

> ⚠️ У проєкті встановлена нестандартна версія Next.js з відмінностями від звичної документації. Перед правками коду дивись `node_modules/next/dist/docs/` (детальніше — у `AGENTS.md`).

## Передумови

- Node.js 20+
- Локальний сервер PostgreSQL (або будь-яка інша доступна Postgres-база)

## Локальний запуск

### 1. Встановити залежності

```bash
npm install
```

`postinstall` сам згенерує Prisma Client (`prisma generate`).

### 2. Підняти PostgreSQL

Якщо Postgres ще не встановлений (приклад для Ubuntu/WSL):

```bash
sudo apt update && sudo apt install -y postgresql postgresql-contrib
```

Створити роль і базу для проєкту:

```bash
sudo -u postgres psql -c "CREATE ROLE enmark WITH LOGIN PASSWORD 'enmark' CREATEDB;"
sudo -u postgres psql -c "CREATE DATABASE enmark OWNER enmark;"
```

Перевірити, що сервер запущений і слухає порт 5432:

```bash
pg_lsclusters
```

Альтернатива без встановлення Postgres — безкоштовна хостована база через `npx create-db` (посилання прямо в `prisma/schema.prisma`).

### 3. Налаштувати `.env`

Скопіювати приклад і за потреби підправити:

```bash
cp .env.example .env
```

За замовчуванням там уже прописано:

```
DATABASE_URL="postgresql://enmark:enmark@localhost:5432/enmark?schema=public"
ADMIN_PASSWORD="changeme123"
ADMIN_SESSION_SECRET="..."
```

Якщо міняєш логін/пароль ролі в кроці 2 — онови `DATABASE_URL` відповідно. `ADMIN_PASSWORD` — пароль для входу в `/admin`, `ADMIN_SESSION_SECRET` — випадковий рядок для підпису cookie-сесії (для продакшн-оточення згенеруй свій, окремий від локального).

### 4. Застосувати схему БД і наповнити демо-даними

```bash
npx prisma db push
npm run db:seed
```

`db:seed` створює базові категорії (Столи / Стільці / Підвіконня) і кілька товарів. Підкатегорії сидом не керуються — їх варто створювати вручну через адмінку, оскільки прод і локальна база незалежні одна від одної.

### 5. Запустити dev-сервер

```bash
npm run dev
```

Сайт: [http://localhost:3000](http://localhost:3000)
Адмінка: [http://localhost:3000/admin/login](http://localhost:3000/admin/login) (пароль — значення `ADMIN_PASSWORD` з `.env`)

## Скрипти

| Команда | Опис |
| --- | --- |
| `npm run dev` | Dev-сервер (Turbopack) |
| `npm run build` | Продакшн-збірка |
| `npm start` | `prisma db push --accept-data-loss && next start` — застосовує схему й піднімає прод-сервер (використовується на Railway) |
| `npm run lint` | ESLint |
| `npm run db:seed` | Наповнити БД базовими категоріями/товарами |

## Завантажені зображення товарів

Фото, завантажені через адмінку, зберігаються поза `public/` і віддаються через `src/app/uploads/[filename]/route.ts`. Локально файли лежать у `./uploads`. На Railway для збереження фото між деплоями до сервісу підключений персистентний Volume — шлях монтування підхоплюється автоматично через змінну `RAILWAY_VOLUME_MOUNT_PATH` (див. `src/lib/upload.ts`).

## Деплой

Проєкт захостований на [Railway](https://railway.com) з окремою PostgreSQL-базою (не пов'язана з локальною). Домен: enmark.store. При пуші в `main` Railway сам збирає й піднімає сервіс; `npm start` перед стартом застосовує актуальну Prisma-схему до прод-бази.
