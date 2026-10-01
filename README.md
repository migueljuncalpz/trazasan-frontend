# Template de residuos hospitalarios

Base visual en Next.js para desarrollar una aplicación local de control y trazabilidad de residuos hospitalarios.

La plantilla incluye un dashboard responsive, datos de demostración, búsqueda y un formulario que añade registros en memoria. No contiene integraciones de ChatGPT Sites, autenticación, base de datos ni servicios externos.

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
