# 🎨 Guía de Personalización de Colores

## ¿Cómo cambiar el tema de colores del portfolio?

### Cambio Completo (1 minuto)

Edita el archivo `tailwind.config.mjs` y cambia solo estas 3 líneas:

```javascript
primary: {
  DEFAULT: '#f97316',    // 👈 Color principal (botones, iconos, links)
  light: '#fb923c',      // 👈 Color claro (fondos suaves, hovers)
  dark: '#ea580c',       // 👈 Color oscuro (texto, bordes)
  // ...resto se genera automáticamente
}
```

### Ejemplos de Paletas Listas para Usar

#### Azul (original)
```javascript
DEFAULT: '#3b82f6',  // Azul principal
light: '#60a5fa',    // Azul claro
dark: '#2563eb',     // Azul oscuro
```

#### Verde
```javascript
DEFAULT: '#10b981',  // Verde principal
light: '#34d399',    // Verde claro
dark: '#059669',     // Verde oscuro
```

#### Morado
```javascript
DEFAULT: '#8b5cf6',  // Morado principal
light: '#a78bfa',    // Morado claro
dark: '#7c3aed',     // Morado oscuro
```

#### Rojo
```javascript
DEFAULT: '#ef4444',  // Rojo principal
light: '#f87171',    // Rojo claro
dark: '#dc2626',     // Rojo oscuro
```

## Colores Usados en el Portfolio

| Clase Tailwind | Dónde se usa | Para qué sirve |
|----------------|--------------|----------------|
| `bg-primary` | Botones, fondos destacados | Color de marca principal |
| `text-primary` | Links, títulos importantes | Texto destacado |
| `from-primary-600` | Gradientes | Inicio de degradados |
| `to-primary-900` | Gradientes | Fin de degradados |
| `bg-primary-50` | Fondos suaves | Secciones claras |
| `text-primary-200` | Texto sobre fondos oscuros | Legibilidad |
| `border-primary-900` | Divisores | Separadores visuales |
| `hover:bg-primary-700` | Botones al pasar ratón | Interacciones |

## Tras Cambiar Colores

1. **Guarda** el archivo `tailwind.config.mjs`
2. **Recarga** el navegador (si tienes `npm run dev` corriendo)
3. ¡Listo! Todos los colores se actualizan automáticamente

## Colores que NO debes tocar

- `gray-*`: Usados para textos, fondos neutros
- `white`: Fondos claros
- `green-*`: Indicadores de éxito (badges de proyectos)

---

💡 **Tip**: Usa [Tailwind Color Generator](https://uicolors.app/create) para generar paletas completas desde un color base.
