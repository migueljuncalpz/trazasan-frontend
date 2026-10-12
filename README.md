# TrazaSan Frontend

Frontend en Next.js de TrazaSan para el control y la trazabilidad de residuos hospitalarios. Este repositorio, `trazasan-frontend`, contiene la interfaz de usuario; el backend se desarrolla en [trazasan-platform](https://github.com/migueljuncalpz/trazasan-platform).

Actualmente incluye un dashboard responsive, datos de demostración, búsqueda, un formulario que añade registros en memoria y una consulta del estado del backend. La autenticación y la persistencia de los registros están pendientes de implementar.

## Desarrollo local

Requisitos: Node.js 20 o superior y npm.

```bash
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comandos

- `npm run dev`: inicia el entorno de desarrollo.
- `npm run build`: genera la compilación de producción.
- `npm start`: sirve la compilación de producción.
- `npm run lint`: ejecuta ESLint.

## Punto de partida

- `app/page.tsx`: pantalla principal y comportamiento de la demo.
- `app/globals.css`: tema global y tokens visuales.
- `components/ui/`: componentes de interfaz usados por la plantilla.

Los registros añadidos desde el formulario se mantienen solo hasta recargar la página. Conecta el formulario a tu propia API o almacenamiento cuando empieces el desarrollo funcional.
