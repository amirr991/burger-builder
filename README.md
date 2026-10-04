# Булка & Дело — конструктор бургеров

Учебный full-stack проект: React + Vite на клиенте, Django REST Framework и SQLite на сервере.

## Запуск backend

```powershell
cd backend
py -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
py manage.py migrate
py manage.py runserver
```

API создания заказа: `POST http://127.0.0.1:8000/api/orders/`.

Пример тела запроса:

```json
{
  "customer": "Мага",
  "bun": "Бриошь",
  "meat": "Говядина",
  "ingredients": ["Сыр", "Бекон", "Помидор"],
  "quantity": 2
}
```

Backend проверяет имя, варианты булочки и мяса, список добавок и количество (от 1 до 20). После успешного POST ответ содержит сохранённый заказ, его `id` и `created_at`.

## Запуск frontend

В новом окне терминала:

```powershell
cd frontend
npm install
npm run dev
```

Откройте адрес Vite, указанный в терминале (обычно `http://localhost:5173`). Django должен быть запущен отдельно. Адрес API по умолчанию — `http://127.0.0.1:8000/api/orders/`; его можно переопределить переменной `VITE_API_URL`.

Если мясо не выбрано, frontend показывает подсказку и вообще не отправляет POST. При успешном ответе на странице отображаются параметры созданного заказа.
