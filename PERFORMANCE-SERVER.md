# Performance — серверная часть (нужно сделать на хостинге/бэкенде)

Код-оптимизации уже внесены в проект. Оставшиеся две задачи решаются **не в коде**, а на сервере.
Они дают самый большой выигрыш из оставшихся (~1.0–1.6 сек).

---

## 1. Включить HTTP/2 (экономия ~1070–1560 мс) 🔴

Сейчас все запросы идут по `http/1.1`, поэтому браузер не может грузить файлы параллельно.
HTTP/2 — это мультиплексирование (много файлов по одному соединению).

### Nginx

HTTP/2 работает только с HTTPS. В блоке `server` добавьте `http2`:

```nginx
server {
    listen 443 ssl;
    http2 on;                 # <-- включить HTTP/2 (nginx >= 1.25.1)
    server_name geniusstorerf.ru;

    ssl_certificate     /etc/letsencrypt/live/geniusstorerf.ru/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/geniusstorerf.ru/privkey.pem;

    location / {
        proxy_pass http://127.0.0.1:3000;   # порт, где крутится `next start`
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

> На старых nginx (< 1.25.1) синтаксис другой:
> `listen 443 ssl http2;` (http2 прямо в строке listen).

Проверка и перезапуск:

```bash
sudo nginx -t && sudo systemctl reload nginx
```

Как убедиться, что включилось:

```bash
curl -I --http2 https://geniusstorerf.ru
# в ответе должно быть: HTTP/2 200
```

То же самое нужно сделать для домена картинок **admin.geniusstorerf.ru** — он тоже на http/1.1.

---

## 2. Кэш-заголовки для картинок с admin.geniusstorerf.ru (экономия ~1400–2200 KiB при повторных визитах) 🟡

Сейчас картинки с `admin.geniusstorerf.ru/media/...` отдаются с `Cache TTL: None` —
браузер каждый раз скачивает их заново.

### Если медиа отдаёт Nginx напрямую

```nginx
location /media/ {
    expires 30d;
    add_header Cache-Control "public, max-age=2592000, immutable";
}
```

### Если медиа отдаёт Django (бэкенд на admin.geniusstorerf.ru)

Лучше отдавать `/media/` через nginx (см. выше). Если всё же через Django —
добавьте заголовок в ответ (например, через middleware или `whitenoise`):

```python
# settings.py (если используете WhiteNoise для media)
WHITENOISE_MAX_AGE = 2592000  # 30 дней
```

> **Важно:** ставьте длинный кэш только если имена файлов не переиспользуются
> (у вас имена вида `95eb9aef-...png` — уникальные, так что `immutable` безопасен).

---

## 3. Бонус: сжать сами картинки на бэкенде

Картинки баннеров приходят как PNG по 900 KiB. Фронт уже прогоняет их через
оптимизацию Next.js (WebP + нужный размер), но если на бэкенде при загрузке
сжимать их в WebP/JPEG — будет ещё легче и для самого admin-домена.

---

## Что уже сделано в коде (для справки)

| Что | Где | Эффект |
|---|---|---|
| Баннер героя грузится на сервере (был клиентский `fetch`) | `components/home/hero.jsx` | LCP −1.4 сек |
| Убраны `unoptimized` + `quality=100` у баннера | `components/home/hero-carousel.jsx` | картинка 916KB → ~150KB |
| Фоновые PNG → WebP (consultation, homeabout, about) | `public/imgs`, `public/about` | −2.2 MB |
| `preconnect` к admin.geniusstorerf.ru | `app/layout.jsx` | −290 мс |
| Убран неиспользуемый шрифт Geist Mono | `app/layout.jsx` | −1 woff2 |
| `browserslist` (меньше полифилов) | `package.json` | −13 KB JS |
