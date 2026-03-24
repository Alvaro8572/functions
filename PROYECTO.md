# .functions - Documentación del Proyecto

## Descripción General

**.functions** es una aplicación web progresiva que agrupa un conjunto de herramientas de utilidad organizadas en tres módulos principales: matemáticas, nutrición y productividad. El proyecto está diseñado con una interfaz moderna tipo "dark theme" con efectos glassmorphism y animaciones fluidas.

## Stack Tecnológico

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Framework CSS**: Tailwind CSS (via CDN)
- **Fuentes**: Google Fonts (JetBrains Mono, Inter)
- **Almacenamiento**: LocalStorage (para persistencia de datos)
- **Arquitectura**: SPA (Single Page Application) - carga dinámica de secciones

## Estructura del Proyecto

```
.functions/
├── index.html      # Página principal
├── script.js       # Lógica JavaScript y módulos HTML
├── styles.css      # Estilos personalizados
├── math.html       # Módulo de matemáticas (independiente)
├── nutrition.html  # Módulo de nutrición (independiente)
└── README.md       # Documentación
```

## Módulos de la Aplicación

### 1. .math_generator

| Herramienta | Descripción |
|-------------|-------------|
| **Triangle 180°** | Genera 3 ángulos interiores válidos que suman 180° con animación |
| **Fibonacci** | Calcula y muestra la secuencia de Fibonacci (1 ≤ n ≤ 100) |
| **Polygons** | Busca el nombre de un polígono según su número de lados (3-20) |
| **Binomial Generator** | Genera expresiones algebraicas (a ± b)² |
| **Polynomial Generator** | Genera expresiones polinómicas aleatorias |
| **Unit Converter** | Convierte entre unidades de peso, longitud y temperatura |

### 2. .nutrition_tools

| Herramienta | Descripción |
|-------------|-------------|
| **BMI Calculator** | Calcula el Índice de Masa Corporal (IMC) con categorización |

### 3. .productivity_tools

| Herramienta | Descripción |
|-------------|-------------|
| **Secure PIN Generator** | Genera PINs numéricos seguros (4 o 6 dígitos) |
| **Word Generator** | Muestra palabras en inglés con su significado |
| **Password Generator** | Genera contraseñas aleatorias seguras (8-32 caracteres) |

## Características Adicionales

### Daily Lab (Sistema de Missions)
- Sistema gamificado que genera 3 misiones diarias aleatorias
- Persistencia en LocalStorage con reseteo diario
- Animación de confetti al completar todas las misiones
- Badge de progreso en el panel flotante

### UI/UX
- Diseño responsive (mobile-first)
- Efectos glassmorphism con backdrop-filter
- Animaciones de entrada (fade-in)
- Paleta de colores consistente por módulo
- Tipografía monoespaciada para datos técnicos

## Estructura de Datos

### LocalStorage Keys
```
dailyLabData: {
    date: "YYYY-MM-DD",
    selectedMissions: [{ id, title, icon }],
    completed: { missionId: boolean },
    allCompleteShown: boolean
}
```

### Base de Datos de Alimentos
```javascript
foodDatabase = {
    "Pizza": { carbs, sugars, saturated_fats, fiber, protein },
    // ... 10 alimentos predefinidos
}
```

## Fórmulas Implementadas

### BMI (Índice de Masa Corporal)
```
IMC = peso(kg) / altura(m)²
Categorías: <18.5 (Bajo peso), 18.5-24.9 (Normal), 25-29.9 (Sobrepeso), ≥30 (Obesidad)
```

### Score Nutricional
```
Score = 100 - (2 × azúcares) - (3 × grasas saturadas) - (1 × carbohidratos) 
        + (4 × fibra) + (2 × proteínas)
```

### Conversión de Unidades
- Peso: g, kg, lb, oz
- Longitud: m, km, mi, ft, in
- Temperatura: °C, °F, K

## Seguridad del Generador de PINs

El generador de PINs valida:
- No repetirlos más de 2 veces consecutivas
- Evitar patrones comunes (1234, 0000, etc.)
- Descartar años (1900-2099)
- Limitar dígitos repetidos (máximo 2)

## Instalación

1. Clonar o descargar el repositorio
2. Abrir `index.html` en un navegador moderno
3. No requiere servidor web (funciona offline)

## Compatibilidad

- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Autor

Desarrollado como proyecto personal de herramientas de utilidad.
