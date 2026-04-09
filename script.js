/* ================================================================================
================================================================================
                            .FUNCTIONS - script.js
                         DOCUMENTACIÓN EDUCATIVA
================================================================================
================================================================================

DESCRIPCIÓN:
Este archivo contiene toda la lógica JavaScript de la aplicación .functions.
Es el "cerebro" de la aplicación.

ESTRUCTURA DEL ARCHIVO:
1. Sistema de Renderizado Inicial (ForceRenderOnLoad)
   - Renderiza contenido de respaldo si algo falla
   - Previene pantalla en blanco

2. Templates HTML (mathHTML, nutritionHTML, productivityHTML)
   - Contienen el HTML de cada sección
   - Son "strings" de JavaScript que se insertan en el DOM

3. Funciones de Navegación
   - loadSection() - Carga una sección específica
   - showMainMenu() - Vuelve al menú principal

4. Herramientas de Matemáticas
   - generateTriangle() - Genera ángulos de triángulo
   - generateFibonacci() - Genera secuencia de Fibonacci
   - generatePolygon() - Busca nombre de polígono
   - generateBinomial() - Genera expresiones binomiales
   - generatePolynomial() - Genera polinomios
   - convertUnit() - Convierte unidades
   - animateValue() - Animación de números

 5. Herramientas de Nutrición
    - calculateIMC() - Calcula IMC

 6. Herramientas de Productividad
   - generatePIN() - Genera PIN seguro
   - isValidPIN() - Valida PINs
   - copyPIN() - Copia PIN al portapapeles
   - generateWord() - Genera palabras con significados
   - generatePassword() - Genera contraseñas seguras
   - copyPassword() - Copia contraseña

CONCEPTOS CLAVE:
- DOM (Document Object Model): Representación del HTML en JavaScript
- Template Strings: Cadenas con comillas invertidas (`) que permiten插入 HTML
- Event Listeners: Funciones que se ejecutan en respuesta a eventos
- localStorage: Almacenamiento en el navegador
- Canvas API: Para dibujar gráficos y animaciones

================================================================================
*/

// ================================================================================
// SISTEMA DE TRADUCCIONES (i18n)
// ================================================================================

/*
OBJETO: translations
----------------------------------------------------------------------
Contiene todas las traducciones de la aplicación.
Se accede mediante: translations[currentLang][clave]
*/
const translations = {
    en: {
        appTitle: "functions",
        appSubtitle: "Tools for math, nutrition & productivity",
        
        // Main menu
        menu_math: "Mathematics",
        menu_nutrition: "Nutrition",
        menu_productivity: "Productivity",
        
        // Math tools
        triangle: "Triangle 180°",
        triangle_desc: "Generate 3 valid interior angles",
        generate_angles: "Generate Angles",
        fibonacci: "Fibonacci",
        fibonacci_desc: "Sequence (1 ≤ n ≤ 100)",
        n_placeholder: "n",
        calculate: "Calculate",
        fibonacci_error: "Error: n must be between 1 and 100.",
        fibonacci_placeholder: "Sequence will appear here...",
        polygons: "Polygons",
        polygons_desc: "Name by sides (3-20)",
        sides_placeholder: "Sides",
        search: "Search",
        result_label: "Result",
        polygon_placeholder: "Polygon name",
        binomial: "Binomial Generator",
        binomial_desc: "Generate (a ± b)^2 expressions",
        generate: "Generate",
        polynomial: "Polynomial Generator",
        polynomial_desc: "Generate polynomial expressions",
        
        // Unit Converter
        unit_converter: "Unit Converter",
        value_placeholder: "Value",
        from_label: "From",
        to_label: "To",
        weight: "Weight",
        length: "Length",
        temperature: "Temperature",
        grams: "Grams (g)",
        kilograms: "Kilograms (kg)",
        pounds: "Pounds (lb)",
        ounces: "Ounces (oz)",
        meters: "Meters (m)",
        kilometers: "Kilometers (km)",
        miles: "Miles (mi)",
        feet: "Feet (ft)",
        inches: "Inches (in)",
        celsius: "Celsius (°C)",
        fahrenheit: "Fahrenheit (°F)",
        kelvin: "Kelvin (K)",
        convert: "Convert",
        
        // Nutrition tools
        bmi_calculator: "BMI Calculator",
        bmi_desc: "Calculate your Body Mass Index",
        weight_kg: "Weight (kg)",
        height_cm: "Height (cm)",
        calculate_bmi: "Calculate BMI",
        your_bmi: "Your BMI",
        underweight: "Underweight",
        normal: "Normal",
        overweight: "Overweight",
        obesity: "Obesity",
        
        // Productivity tools
        pin_generator: "Secure PIN Generator",
        pin_desc: "Generate strong numeric PINs for mobile devices",
        pin_length: "PIN Length",
        generate_pin: "Generate PIN",
        word_generator: "Word Generator",
        word_desc: "Discover interesting English words",
        generate_word: "Generate Word",
        word_meaning: "Meaning",
        password_generator: "Password Generator",
        password_desc: "Generate a strong 16-character password",
        password_length: "Password Length",
        generate_password: "Generate",
        copied: "Copied!",
        
        // Daily Lab
        daily_lab: "Daily Lab",
        daily_lab_desc: "Complete today's experiments",
        mission_complete: "Mission Complete!",
        all_complete: "All missions completed!",
        progress: "Progress",
        
        // Missions
        mission_pin: "Generate a PIN",
        mission_password: "Generate any password",
        mission_longpwd: "Generate a long password (10+)",
        mission_fibonacci: "Use the Fibonacci generator",
        mission_triangle: "Generate triangle angles",
        mission_polygon: "Search for a polygon",
        mission_bmi: "Calculate your BMI",
        mission_unit: "Use the Unit Converter",
        
        // Settings
        settings: "Settings",
        language: "Language",
        english: "English",
        spanish: "Spanish",
        
        // Errors
        error_load: "App failed to load. Check console.",
        enter_value: "Please enter a value",
        select_units: "Please select both units",
        invalid_input: "Please enter valid numbers",
        
        // Additional mappings
        pin_length_4: "4 digits",
        pin_length_6: "6 digits",
        copy: "Copy",
        length_8: "8",
        length_16: "16",
        length_32: "32",
        binomial_result_a: "a² + 2ab + b²",
        binomial_result_b: "a² - 2ab + b²",
        polynomial_result: "ax² + bx + c",
        
        // Labels
        "Select a food": "Select a food",
        "Select Food A": "Select Food A",
        "Select Food B": "Select Food B"
    },
    es: {
        appTitle: "functions",
        appSubtitle: "Herramientas de matemáticas, nutrición y productividad",
        
        // Main menu
        menu_math: "Matemáticas",
        menu_nutrition: "Nutrición",
        menu_productivity: "Productividad",
        
        // Math tools
        triangle: "Triángulo 180°",
        triangle_desc: "Genera 3 ángulos internos válidos",
        generate_angles: "Generar Ángulos",
        fibonacci: "Fibonacci",
        fibonacci_desc: "Secuencia (1 ≤ n ≤ 100)",
        n_placeholder: "n",
        calculate: "Calcular",
        fibonacci_error: "Error: n debe estar entre 1 y 100.",
        fibonacci_placeholder: "La secuencia aparecerá aquí...",
        polygons: "Polígonos",
        polygons_desc: "Nombre por lados (3-20)",
        sides_placeholder: "Lados",
        search: "Buscar",
        result_label: "Resultado",
        polygon_placeholder: "Nombre del polígono",
        binomial: "Generador Binomial",
        binomial_desc: "Genera expresiones (a ± b)^2",
        generate: "Generar",
        polynomial: "Generador Polinomial",
        polynomial_desc: "Genera expresiones polinómicas",
        
        // Unit Converter
        unit_converter: "Conversor de Unidades",
        value_placeholder: "Valor",
        from_label: "De",
        to_label: "A",
        weight: "Peso",
        length: "Longitud",
        temperature: "Temperatura",
        grams: "Gramos (g)",
        kilograms: "Kilogramos (kg)",
        pounds: "Libras (lb)",
        ounces: "Onzas (oz)",
        meters: "Metros (m)",
        kilometers: "Kilómetros (km)",
        miles: "Millas (mi)",
        feet: "Pies (ft)",
        inches: "Pulgadas (in)",
        celsius: "Celsius (°C)",
        fahrenheit: "Fahrenheit (°F)",
        kelvin: "Kelvin (K)",
        convert: "Convertir",
        
        // Nutrition tools
        bmi_calculator: "Calculadora de IMC",
        bmi_desc: "Calcula tu Índice de Masa Corporal",
        weight_kg: "Peso (kg)",
        height_cm: "Altura (cm)",
        calculate_bmi: "Calcular IMC",
        your_bmi: "Tu IMC",
        underweight: "Bajo peso",
        normal: "Normal",
        overweight: "Sobrepeso",
        obesity: "Obesidad",
        
        // Productivity tools
        pin_generator: "Generador de PIN Seguro",
        pin_desc: "Genera PINs numéricos seguros para móviles",
        pin_length: "Longitud del PIN",
        generate_pin: "Generar PIN",
        word_generator: "Generador de Palabras",
        word_desc: "Descubre palabras interesantes en inglés",
        generate_word: "Generar Palabra",
        word_meaning: "Significado",
        password_generator: "Generador de Contraseñas",
        password_desc: "Genera una contraseña fuerte de 16 caracteres",
        password_length: "Longitud de Contraseña",
        generate_password: "Generar",
        copied: "¡Copiado!",
        
        // Daily Lab
        daily_lab: "Daily Lab",
        daily_lab_desc: "Completa los experimentos de hoy",
        mission_complete: "¡Misión Completada!",
        all_complete: "¡Todas las misiones completadas!",
        progress: "Progreso",
        
        // Missions
        mission_pin: "Generar un PIN",
        mission_password: "Generar cualquier contraseña",
        mission_longpwd: "Generar contraseña larga (10+)",
        mission_fibonacci: "Usar el generador de Fibonacci",
        mission_triangle: "Generar ángulos de triángulo",
        mission_polygon: "Buscar un polígono",
        mission_bmi: "Calcula tu IMC",
        mission_unit: "Usar el Conversor de Unidades",
        
        // Settings
        settings: "Configuración",
        language: "Idioma",
        english: "Inglés",
        spanish: "Español",
        
        // Errors
        error_load: "La app no pudo cargar. Revisa la consola.",
        enter_value: "Por favor ingresa un valor",
        select_units: "Por favor selecciona ambas unidades",
        invalid_input: "Por favor ingresa números válidos",
        
        // Additional mappings
        pin_length_4: "4 dígitos",
        pin_length_6: "6 dígitos",
        copy: "Copiar",
        length_8: "8",
        length_16: "16",
        length_32: "32",
        binomial_result_a: "a² + 2ab + b²",
        binomial_result_b: "a² - 2ab + b²",
        polynomial_result: "ax² + bx + c",
        
        // Labels
        "Select a food": "Seleccionar un alimento",
        "Select Food A": "Seleccionar Alimento A",
        "Select Food B": "Seleccionar Alimento B"
    }
};

// Idioma actual (se carga desde localStorage o usa inglés por defecto)
let currentLang = localStorage.getItem("lang") || "en";

/*
FUNCIÓN: t(key)
----------------------------------------------------------------------
Retorna la traducción para la clave dada en el idioma actual.

Parámetros:
- key: Clave de traducción (ej: "menu_math", "bmi_calculator")

Retorna:
- String con la traducción
*/
function t(key) {
    return translations[currentLang][key] || translations["en"][key] || key;
}

/*
FUNCIÓN: setLanguage(lang)
----------------------------------------------------------------------
Cambia el idioma de la aplicación.

Parámetros:
- lang: "en" o "es"

Acciones:
1. Guarda el idioma en localStorage
2. Actualiza la variable currentLang
3. Actualiza todos los textos visibles
4. Recarga la sección actual
*/
function setLanguage(lang) {
    if (lang !== "en" && lang !== "es") return;
    
    currentLang = lang;
    localStorage.setItem("lang", lang);
    
    // Actualizar textos de la UI
    updateUITexts();
    
    // Si hay una sección cargada, recargarla
    const container = document.getElementById('content-container');
    if (container && container.style.display !== 'none') {
        // Determinar qué sección está activa
        const activeSection = container.querySelector('.section-title');
        if (activeSection) {
            if (activeSection.textContent.includes('.math') || activeSection.textContent.includes('máticas')) {
                loadSection('math');
            } else if (activeSection.textContent.includes('.nutrition') || activeSection.textContent.includes('trición')) {
                loadSection('nutrition');
            } else if (activeSection.textContent.includes('.productivity') || activeSection.textContent.includes('ductividad')) {
                loadSection('productivity');
            }
        }
    }
    
    // Actualizar el selector de idioma
    const langSelector = document.getElementById('lang-selector');
    if (langSelector) {
        langSelector.value = lang;
    }
}

/*
FUNCIÓN: updateUITexts()
----------------------------------------------------------------------
Actualiza todos los textos estáticos de la interfaz.
Se llama cuando se cambia el idioma.
*/
function updateUITexts() {
    // Título de la app - NO se traduce (permanece "functions")
    // Subtitle - NO se traduce (permanece "System Ready. Select Module.")
    
    // Botones del menú principal - descripciones traducidas
    const menuMathDesc = document.getElementById('menu-math-desc');
    if (menuMathDesc) menuMathDesc.textContent = currentLang === 'es' ? 'Matemáticas' : 'Mathematics';
    
    const menuNutritionDesc = document.getElementById('menu-nutrition-desc');
    if (menuNutritionDesc) menuNutritionDesc.textContent = currentLang === 'es' ? 'Nutrición' : 'Nutrition';
    
    const menuProductivityDesc = document.getElementById('menu-productivity-desc');
    if (menuProductivityDesc) menuProductivityDesc.textContent = currentLang === 'es' ? 'Productividad' : 'Productivity';
    
    // Daily Lab
    const dailyLabTitle = document.getElementById('daily-lab-title');
    if (dailyLabTitle) dailyLabTitle.textContent = t('daily_lab');
    
    const dailyLabDesc = document.getElementById('daily-lab-desc');
    if (dailyLabDesc) dailyLabDesc.textContent = t('daily_lab_desc');
    
    const progressLabel = document.getElementById('progress-label');
    if (progressLabel) progressLabel.textContent = t('progress');
    
    // Settings
    const langLabel = document.getElementById('lang-label');
    if (langLabel) langLabel.textContent = t('language');
}

/*
FUNCIÓN: translateSection()
----------------------------------------------------------------------
Traduce todos los elementos de la sección actualmente visible.
Utiliza mapeo de contenido para traducir elementos comunes.
*/
function translateSection() {
    const container = document.getElementById('content-container');
    if (!container) return;
    
    // Mapeo de texto a clave de traducción
    const textMappings = {
        // Math tools
        "Triangle 180°": "triangle",
        "Generate 3 valid interior angles.": "triangle_desc",
        "Generate Angles": "generate_angles",
        "Fibonacci": "fibonacci",
        "Sequence (1 ≤ n ≤ 100).": "fibonacci_desc",
        "n": "n_placeholder",
        "Calculate": "calculate",
        "Error: n must be between 1 and 100.": "fibonacci_error",
        "Sequence will appear here...": "fibonacci_placeholder",
        "Polygons": "polygons",
        "Name by sides (3-20).": "polygons_desc",
        "Sides": "sides_placeholder",
        "Search": "search",
        "Result": "result_label",
        "Polygon name": "polygon_placeholder",
        "Binomial Generator": "binomial",
        "Generate (a ± b)^2 expressions.": "binomial_desc",
        "Generate": "generate",
        "Polynomial Generator": "polynomial",
        "Generate polynomial expressions.": "polynomial_desc",
        
        // Unit Converter
        "Unit Converter": "unit_converter",
        "Value": "value_placeholder",
        "From": "from_label",
        "To": "to_label",
        "Weight": "weight",
        "Length": "length",
        "Temperature": "temperature",
        "Grams (g)": "grams",
        "Kilograms (kg)": "kilograms",
        "Pounds (lb)": "pounds",
        "Ounces (oz)": "ounces",
        "Meters (m)": "meters",
        "Kilometers (km)": "kilometers",
        "Miles (mi)": "miles",
        "Feet (ft)": "feet",
        "Inches (in)": "inches",
        "Celsius (°C)": "celsius",
        "Fahrenheit (°F)": "fahrenheit",
        "Kelvin (K)": "kelvin",
        "Convert": "convert",
        
        // Nutrition
        "BMI Calculator": "bmi_calculator",
        "Calculate your Body Mass Index": "bmi_desc",
        "Weight (kg)": "weight_kg",
        "Height (cm)": "height_cm",
        "Calculate BMI": "calculate_bmi",
        "Your BMI": "your_bmi",
        "Underweight": "underweight",
        "Normal": "normal",
        "Overweight": "overweight",
        "Obesity": "obesity",
        
        // Productivity
        "Secure PIN Generator": "pin_generator",
        "Generate strong numeric PINs for mobile devices": "pin_desc",
        "PIN Length": "pin_length",
        "4 digits": "pin_length_4",
        "6 digits": "pin_length_6",
        "Generate PIN": "generate_pin",
        "Copy": "copy",
        "Word Generator": "word_generator",
        "Discover interesting English words": "word_desc",
        "Generate Word": "generate_word",
        "Meaning": "word_meaning",
        "Password Generator": "password_generator",
        "Generate a strong 16-character password": "password_desc",
        "Password Length": "password_length",
        "8": "length_8",
        "16": "length_16",
        "32": "length_32",
        "Generate": "generate_password",
        "Copied!": "copied",
        
        // Binomial output
        "a² + 2ab + b²": "binomial_result_a",
        "a² - 2ab + b²": "binomial_result_b",
        
        // Polynomial output
        "ax² + bx + c": "polynomial_result"
    };
    
    // Traducir elementos por contenido de texto
    const elements = container.querySelectorAll('h3, p, button, span, label');
    elements.forEach(el => {
        const text = el.textContent.trim();
        if (textMappings[text]) {
            el.textContent = t(textMappings[text]);
        }
    });
    
    // Traducir placeholders
    const inputElements = container.querySelectorAll('input, select');
    inputElements.forEach(el => {
        const placeholder = el.placeholder;
        if (placeholder && textMappings[placeholder]) {
            el.placeholder = t(textMappings[placeholder]);
        }
        
        // Traducir opciones de select
        const options = el.querySelectorAll('option');
        options.forEach(opt => {
            const optText = opt.textContent;
            if (textMappings[optText]) {
                opt.textContent = t(textMappings[optText]);
            }
        });
    });
    
    // NOT translating section titles - they should stay as:
    // .math_tools, .nutrition_tools, .productivity_tools
}

// ================================================================================
// SISTEMA DE RENDERIZADO INICIAL (FALLBACK)
// ================================================================================
// Este código se ejecuta primero para garantizar que siempre haya contenido visible.
// El sistema de fallback fue removido - el HTML ya contiene todo el contenido necesario

// ================================================================================
// TEMPLATES HTML
// ================================================================================
// Los templates son cadenas de texto que contienen HTML.
// Se usan para crear secciones dinámicas de la aplicación.
// Cada template se inserta en el DOM cuando el usuario selecciona una sección.

/* ------------------------------------------------------------------------------
TEMPLATE: mathHTML
------------------------------------------------------------------------------ */
/*
Contiene el HTML para la sección de herramientas matemáticas.
Incluye:
- Triangle 180°: Generador de ángulos de triángulo
- Fibonacci: Generador de secuencia de Fibonacci
- Polygons: Buscador de nombres de polígonos
- Binomial Generator: Generador de expresiones binomiales
- Polynomial Generator: Generador de polinomios
- Unit Converter: Conversor de unidades

Cómo funciona:
1. El usuario hace clic en ".math_generator" en el menú
2. loadSection('math') inserta este template en #content-container
3. Los botones dentro del template llaman a sus funciones correspondientes
*/
const mathHTML = `
<!-- Grid responsive: 1 columna en móvil, 3 en desktop -->
<div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
    
    <!-- TARJETA: Triangle 180° -->
    <!-- Cada herramienta está en una "tarjeta" con bordes redondeados -->
    <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-emerald-500">
        <!-- Encabezado con icono -->
        <div class="flex items-center gap-2 mb-2">
            <div class="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
                <!-- SVG de calculadora/icono -->
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                        d="M9 7h6m0 36v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-white">Triangle 180°</h3>
        </div>
        
        <p class="text-sm text-slate-400">Generate 3 valid interior angles.</p>

        <!-- Campos de entrada para los ángulos (solo lectura) -->
        <div class="flex gap-2 items-center justify-between bg-slate-800/50 p-3 rounded-xl border border-slate-700">
            <!-- type="number" readonly: campo numérico que no se puede editar -->
            <input type="number" id="angle1" readonly class="w-full bg-transparent text-center text-white font-mono text-lg focus:outline-none" placeholder="0°">
            <span class="text-slate-500 font-bold">+</span>
            <input type="number" id="angle2" readonly class="w-full bg-transparent text-center text-white font-mono text-lg focus:outline-none" placeholder="0°">
            <span class="text-slate-500 font-bold">+</span>
            <input type="number" id="angle3" readonly class="w-full bg-transparent text-center text-white font-mono text-lg focus:outline-none" placeholder="0°">
            <span class="text-slate-500 font-bold">=</span>
            <span class="text-emerald-400 font-bold">180°</span>
        </div>

        <!-- Botón para generar ángulos -->
        <!-- onclick: La función que se ejecuta al hacer clic -->
        <button onclick="generateTriangle()" class="w-full py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold transition-colors text-sm">
            Generate Angles
        </button>
    </div>

    <!-- TARJETA: Fibonacci -->
    <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-purple-500">
        <div class="flex items-center gap-2 mb-2">
            <div class="p-2 bg-purple-500/20 rounded-lg text-purple-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-white">Fibonacci</h3>
        </div>

        <p class="text-sm text-slate-400">Sequence (1 ≤ n ≤ 100).</p>

        <!-- Input + Botón en la misma fila -->
        <div class="flex gap-2">
            <!-- placeholder: Texto que aparece cuando el campo está vacío -->
            <input type="number" id="fib-input" placeholder="n" class="w-20 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-center focus:border-purple-500 transition-colors">
            <button onclick="generateFibonacci()" class="flex-1 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-semibold transition-colors text-sm">
                Calculate
            </button>
        </div>

        <!-- Mensaje de error (oculto por defecto) -->
        <div id="fib-error" class="hidden text-red-400 text-xs font-mono bg-red-900/20 p-2 rounded border border-red-900/50">
            Error: n must be between 1 and 100.
        </div>

        <!-- Área de salida para la secuencia -->
        <!-- max-h: altura máxima con scroll -->
        <div id="fib-output" class="flex-1 bg-slate-900/50 rounded-xl p-3 border border-slate-800 min-h-[120px] max-h-[200px] overflow-y-auto custom-scroll flex flex-wrap content-start gap-2">
            <span class="text-slate-600 text-sm italic w-full text-center mt-8">Sequence will appear here...</span>
        </div>
    </div>

    <!-- TARJETA: Polygons -->
    <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-amber-500">
        <div class="flex items-center gap-2 mb-2">
            <div class="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-white">Polygons</h3>
        </div>

        <p class="text-sm text-slate-400">Name by sides (3-20).</p>

        <div class="flex gap-2">
            <input type="number" id="poly-input" placeholder="Sides" class="w-20 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-center focus:border-amber-500 transition-colors">
            <button onclick="generatePolygon()" class="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold transition-colors text-sm">
                Search
            </button>
        </div>

        <!-- Campo de resultado (solo lectura) -->
        <div class="relative mt-2">
            <label class="text-xs text-slate-500 absolute -top-2 left-3 bg-[#1e293b] px-1">Result</label>
            <input type="text" id="poly-output" readonly class="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white font-bold text-center tracking-wide placeholder-slate-600 focus:border-amber-500 transition-colors" placeholder="Polygon name">
        </div>
    </div>

    <!-- TARJETA: Binomial Generator -->
    <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-cyan-500">
        <div class="flex items-center gap-2 mb-2">
            <div class="p-2 bg-cyan-500/20 rounded-lg text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-white">Binomial Generator</h3>
        </div>

        <p class="text-sm text-slate-400">Generate (a ± b)^2 expressions.</p>

        <button onclick="generateBinomial()" class="w-full py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg font-semibold transition-colors text-sm">
            Generate
        </button>

        <div id="binomial-output" class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <p id="binomial-result" class="text-2xl font-bold text-cyan-400 mono"></p>
        </div>
    </div>

    <!-- TARJETA: Polynomial Generator -->
    <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-teal-500">
        <div class="flex items-center gap-2 mb-2">
            <div class="p-2 bg-teal-500/20 rounded-lg text-teal-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-white">Polynomial Generator</h3>
        </div>

        <p class="text-sm text-slate-400">Generate polynomial expressions.</p>

        <button onclick="generatePolynomial()" class="w-full py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-lg font-semibold transition-colors text-sm">
            Generate
        </button>

        <div id="polygen-output" class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
            <p id="polygen-result" class="text-2xl font-bold text-teal-400 mono"></p>
        </div>
    </div>

    <!-- TARJETA: Unit Converter -->
    <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-indigo-500">
        <div class="flex items-center gap-2 mb-2">
            <div class="p-2 bg-indigo-500/20 rounded-lg text-indigo-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
            </div>
            <h3 class="text-lg font-bold text-white">Unit Converter</h3>
        </div>

        <div class="space-y-2">
            <input type="number" id="unit-value" placeholder="Value" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white text-center focus:border-indigo-500 transition-colors">
            
            <!-- select: Menú desplegable -->
            <select id="unit-from" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-indigo-500 transition-colors">
                <option value="">From</option>
                <!-- optgroup: Agrupa opciones relacionadas -->
                <optgroup label="Weight">
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lb">Pounds (lb)</option>
                    <option value="oz">Ounces (oz)</option>
                </optgroup>
                <optgroup label="Length">
                    <option value="m">Meters (m)</option>
                    <option value="km">Kilometers (km)</option>
                    <option value="mi">Miles (mi)</option>
                    <option value="ft">Feet (ft)</option>
                    <option value="in">Inches (in)</option>
                </optgroup>
                <optgroup label="Temperature">
                    <option value="C">Celsius (°C)</option>
                    <option value="F">Fahrenheit (°F)</option>
                    <option value="K">Kelvin (K)</option>
                </optgroup>
            </select>
            
            <select id="unit-to" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-indigo-500 transition-colors">
                <option value="">To</option>
                <optgroup label="Weight">
                    <option value="g">Grams (g)</option>
                    <option value="kg">Kilograms (kg)</option>
                    <option value="lb">Pounds (lb)</option>
                    <option value="oz">Ounces (oz)</option>
                </optgroup>
                <optgroup label="Length">
                    <option value="m">Meters (m)</option>
                    <option value="km">Kilometers (km)</option>
                    <option value="mi">Miles (mi)</option>
                    <option value="ft">Feet (ft)</option>
                    <option value="in">Inches (in)</option>
                </optgroup>
                <optgroup label="Temperature">
                    <option value="C">Celsius (°C)</option>
                    <option value="F">Fahrenheit (°F)</option>
                    <option value="K">Kelvin (K)</option>
                </optgroup>
            </select>
        </div>

        <button onclick="convertUnit()" class="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold transition-colors text-sm">
            Convert
        </button>

        <div id="unit-result" class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center hidden">
            <p id="unit-output" class="text-2xl font-bold text-indigo-400 mono"></p>
        </div>
    </div>

</div>
`;

/* ------------------------------------------------------------------------------
TEMPLATE: nutritionHTML
------------------------------------------------------------------------------ */
/*
Contiene el HTML para la sección de herramientas de nutrición.
Incluye:
- BMI Calculator: Calculadora de Índice de Masa Corporal
*/
const nutritionHTML = `
<div>
    <h2 class="section-title text-3xl font-bold mb-6 text-center mono">.nutrition_tools</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        
        <!-- TARJETA: BMI Calculator -->
        <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-green-500">
            <div class="flex items-center gap-2 mb-2">
                <div class="p-2 bg-green-500/20 rounded-lg text-green-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-white">BMI Calculator</h3>
            </div>

            <p class="text-sm text-slate-400">Body Mass Index.</p>

            <div class="space-y-3">
                <div>
                    <label class="text-xs text-slate-500 mb-1 block">Weight (kg)</label>
                    <!-- type="number": Campo que solo acepta números -->
                    <!-- step="any": Permite decimales -->
                    <input type="number" id="imc-weight" placeholder="kg" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-green-500 transition-colors">
                </div>
                <div>
                    <label class="text-xs text-slate-500 mb-1 block">Height (cm)</label>
                    <input type="number" id="imc-height" placeholder="cm" class="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-white focus:border-green-500 transition-colors">
                </div>
            </div>

            <button onclick="calculateIMC()" class="w-full py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg font-semibold transition-colors text-sm">
                Calculate BMI
            </button>

            <!-- Área de resultado (oculta inicialmente) -->
            <div id="imc-result" class="hidden p-3 rounded-lg bg-slate-800 border border-slate-700">
                <p class="text-xs text-slate-500">Your BMI is:</p>
                <p id="imc-value" class="text-2xl font-bold text-white mono"></p>
                <p id="imc-category" class="text-sm mt-1"></p>
            </div>
        </div>

    </div>
</div>
`;

/* ------------------------------------------------------------------------------
TEMPLATE: productivityHTML
------------------------------------------------------------------------------ */
/*
Contiene el HTML para la sección de herramientas de productividad.
Incluye:
- Secure PIN Generator: Generador de PINs seguros
- Word Generator: Generador de palabras con significados
- Password Generator: Generador de contraseñas
*/
const productivityHTML = `
<div>
    <h2 class="section-title text-3xl font-bold mb-6 text-center mono">.productivity_tools</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
        
        <!-- TARJETA: Secure PIN Generator -->
        <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-violet-500">
            <div class="flex items-center gap-2 mb-2">
                <div class="p-2 bg-violet-500/20 rounded-lg text-violet-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-white">Secure PIN Generator</h3>
            </div>

            <p class="text-sm text-slate-400">Generate strong numeric PINs for mobile devices.</p>

            <!-- Radio buttons para elegir longitud -->
            <!-- Botones para elegir longitud del PIN -->
            <div style="display: flex; gap: 16px; justify-content: center; margin-bottom: 12px;">
                <button type="button" onclick="selectPinLength(4)" id="pin-btn-4" style="
                    padding: 8px 20px;
                    border-radius: 8px;
                    border: 2px solid #8b5cf6;
                    background: #8b5cf6;
                    color: white;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 600;
                ">4 digits</button>
                <button type="button" onclick="selectPinLength(6)" id="pin-btn-6" style="
                    padding: 8px 20px;
                    border-radius: 8px;
                    border: 2px solid #8b5cf6;
                    background: transparent;
                    color: #8b5cf6;
                    font-size: 14px;
                    cursor: pointer;
                    font-weight: 600;
                ">6 digits</button>
            </div>
            <input type="hidden" id="pin-length-selected" value="4">

            <button onclick="generatePIN()" class="w-full py-2 bg-violet-600 hover:bg-violet-500 text-white rounded-lg font-semibold transition-colors text-sm">
                Generate PIN
            </button>

            <div id="pin-result" class="hidden">
                <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
                    <p id="pin-output" class="text-4xl font-bold text-violet-400 mono tracking-widest"></p>
                </div>
                <button onclick="copyPIN()" class="w-full mt-2 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors text-sm flex items-center justify-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <span id="copy-text">Copy</span>
                </button>
            </div>

            <p class="text-xs text-slate-500 italic">Avoid using predictable PINs like 1234 or your birth year.</p>
        </div>

        <!-- TARJETA: Word Generator -->
        <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-fuchsia-500">
            <div class="flex items-center gap-2 mb-2">
                <div class="p-2 bg-fuchsia-500/20 rounded-lg text-fuchsia-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-white">Word Generator</h3>
            </div>

            <p class="text-sm text-slate-400">Discover interesting English words.</p>

            <button onclick="generateWord()" class="w-full py-2 bg-fuchsia-600 hover:bg-fuchsia-500 text-white rounded-lg font-semibold transition-colors text-sm">
                Generate Word
            </button>

            <div id="word-result" class="hidden p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
                <p id="word-output" class="text-3xl font-bold text-fuchsia-400 mb-2 fade-in"></p>
                <p id="word-meaning" class="text-sm text-slate-300 italic fade-in"></p>
                <p class="text-xs text-slate-500 mt-2">Definition inspired by Cambridge Dictionary</p>
            </div>
        </div>

        <!-- TARJETA: Password Generator -->
        <div class="tool-card glass-panel rounded-2xl p-6 flex flex-col gap-4 border-t-4 border-t-amber-500">
            <div class="flex items-center gap-2 mb-2">
                <div class="p-2 bg-amber-500/20 rounded-lg text-amber-400">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                    </svg>
                </div>
                <h3 class="text-lg font-bold text-white">Password Generator</h3>
            </div>

            <p class="text-sm text-slate-400">Generate a strong 16-character password.</p>

            <div class="flex gap-2">
                <!-- min/max: Limitan el rango de valores aceptados -->
                <input type="number" id="pwd-length" value="16" min="8" max="32" class="w-16 bg-slate-800 border border-slate-700 rounded-lg px-2 py-2 text-white text-center focus:border-amber-500">
                <button onclick="generatePassword()" class="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold transition-colors text-sm">
                    Generate
                </button>
            </div>

            <div id="pwd-result" class="hidden">
                <div class="bg-slate-800/50 rounded-xl p-4 border border-slate-700 text-center">
                    <!-- break-all: Permite romper palabras largas -->
                    <p id="pwd-output" class="text-lg font-bold text-amber-400 mono break-all"></p>
                </div>
                <div class="flex gap-2 mt-2">
                    <button onclick="copyPassword()" class="flex-1 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition-colors text-sm">Copy</button>
                    <button onclick="generatePassword()" class="flex-1 py-2 bg-amber-600 hover:bg-amber-500 text-white rounded-lg font-semibold transition-colors text-sm">New</button>
                </div>
            </div>
        </div>

    </div>
</div>
`;

// ================================================================================
// FUNCIONES DE NAVEGACIÓN
// ================================================================================

/*
FUNCIÓN: loadSection(section)
----------------------------------------------------------------------
Carga una sección específica de la aplicación.

Parámetros:
- section: String que indica qué sección cargar
         Valores posibles: 'math', 'nutrition', 'productivity'

Comportamiento:
1. Oculta el menú principal
2. Muestra el botón "Volver"
3. Inserta el template HTML correspondiente en el contenedor
4. Añade animación de entrada

Esta es una función de navegación central. Controla qué contenido ve el usuario.
*/
function loadSection(section) {
    console.log("App: Loading section:", section);
    
    // Obtener referencias a los elementos del DOM
    const mainMenu = document.getElementById('main-menu');
    const backBtn = document.getElementById('back-btn');
    const container = document.getElementById('content-container');
    
    // Ocultar menú principal
    // style.display = 'none' es la forma más directa de ocultar un elemento
    if (mainMenu) {
        mainMenu.style.display = 'none';
    }
    
    // Mostrar botón "Volver"
    if (backBtn) {
        backBtn.style.display = 'flex';
    }
    
    // Configurar y mostrar contenedor de contenido
    if (container) {
        // Mostrar el contenedor
        container.style.display = 'flex';
        container.style.flexDirection = 'column';
        container.style.alignItems = 'center';
        
        // Añadir animación de entrada
        // animation: fadeIn 0.5s ease-in
        // La animación está definida en styles.css
        container.style.animation = 'fadeIn 0.5s ease-in';
        
        // Insertar el template correspondiente según la sección
        // Los templates son variables que contienen strings con HTML
        if (section === 'math') {
            container.innerHTML = mathHTML;
        } else if (section === 'nutrition') {
            container.innerHTML = nutritionHTML;
        } else if (section === 'productivity') {
            container.innerHTML = productivityHTML;
        }
        
        // Traducir la sección cargada
        translateSection();
    }
    
    console.log("App: Section loaded");
}

/*
FUNCIÓN: showMainMenu()
----------------------------------------------------------------------
Vuelve a mostrar el menú principal.

Comportamiento:
1. Muestra el menú principal
2. Oculta el botón "Volver"
3. Oculta el contenedor de contenido
4. Limpia el contenedor (borra el contenido)

Es la operación inversa de loadSection().
*/
function showMainMenu() {
    console.log("App: Showing main menu");
    
    // Obtener referencias a los elementos del DOM
    const mainMenu = document.getElementById('main-menu');
    const backBtn = document.getElementById('back-btn');
    const container = document.getElementById('content-container');
    
    // Mostrar menú principal con animación
    if (mainMenu) {
        mainMenu.style.display = 'flex';  // flex para que los botones se muestren en columna
        mainMenu.style.animation = 'fadeIn 0.5s ease-in';
    }
    
    // Ocultar botón "Volver"
    if (backBtn) {
        backBtn.style.display = 'none';
    }
    
    // Ocultar contenedor de contenido y limpiarlo
    if (container) {
        container.style.display = 'none';
        container.innerHTML = '';  // Limpiar contenido para liberar memoria
    }
}

// ================================================================================
// HERRAMIENTAS DE MATEMÁTICAS
// ================================================================================

/*
FUNCIÓN: generateTriangle()
----------------------------------------------------------------------
Genera 3 ángulos de triángulo que suman exactamente 180°.

Cómo funciona:
1. Genera el primer ángulo aleatorio (1-176°)
2. Genera el segundo ángulo (1 a 178 - primer ángulo)
3. Calcula el tercer ángulo: 180 - ángulo1 - ángulo2
4. Anima la aparición de cada ángulo

Un triángulo válido tiene 3 ángulos que siempre suman 180°.
*/
function generateTriangle() {
    const minAngle = 1;  // Ángulo mínimo permitido (no puede ser 0)
    
    // Generar primer ángulo: número aleatorio entre 1 y 176
    // Math.random() genera 0 a 0.999...
    // (0.999 * 176) = 175.9, + 1 = 176.9, floor = 176
    const angle1 = Math.floor(Math.random() * 176) + minAngle;
    
    // Generar segundo ángulo con espacio suficiente para el tercero
    // Máximo disponible: 179 - angle1 - minAngle
    const maxAngle2 = 179 - angle1 - minAngle;
    const angle2 = Math.floor(Math.random() * maxAngle2) + minAngle;
    
    // El tercer ángulo completa los 180°
    const angle3 = 180 - angle1 - angle2;

    // Animar cada ángulo con un pequeño retraso
    animateValue("angle1", 0, angle1, 500);  // 500ms de duración
    setTimeout(() => animateValue("angle2", 0, angle2, 500), 100);  // 100ms de retraso
    setTimeout(() => animateValue("angle3", 0, angle3, 500), 200);  // 200ms de retraso

    // Marcar misión como completada en Daily Lab
    // setTimeout espera 600ms para que la animación termine
    setTimeout(() => {
        if (typeof window.completeMission === 'function') {
            window.completeMission('triangle');
        }
    }, 600);
}

/*
FUNCIÓN: animateValue(id, start, end, duration)
----------------------------------------------------------------------
Anima un campo de entrada numérico desde un valor hasta otro.

Parámetros:
- id: ID del elemento input a animar
- start: Valor inicial
- end: Valor final
- duration: Duración de la animación en milisegundos

Cómo funciona:
1. Usa requestAnimationFrame para animaciones suaves
2. Calcula el progreso basado en el tiempo transcurrido
3. Actualiza el valor del input en cada frame
4. Se detiene cuando llega al valor final
*/
function animateValue(id, start, end, duration) {
    const obj = document.getElementById(id);  // Obtener el input
    let startTimestamp = null;  // Momento en que comenzó la animación
    
    // Función que se ejecuta en cada frame
    const step = (timestamp) => {
        // Guardar el momento de inicio
        if (!startTimestamp) startTimestamp = timestamp;
        
        // Calcular progreso: 0 (inicio) a 1 (fin)
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        
        // Calcular valor actual interpolando entre inicio y fin
        // progress = 0.5 significa "a la mitad"
        const currentValue = Math.floor(progress * (end - start) + start);
        
        // Actualizar el valor del input
        obj.value = currentValue;
        
        // Si la animación no ha terminado, pedir el siguiente frame
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    
    // Iniciar la animación
    window.requestAnimationFrame(step);
}

/*
FUNCIÓN: generateFibonacci()
----------------------------------------------------------------------
Genera los primeros n números de la secuencia de Fibonacci.

La secuencia de Fibonacci: 0, 1, 1, 2, 3, 5, 8, 13, 21...
Cada número es la suma de los dos anteriores.

Parámetros:
- n: Cuántos números generar (1 a 100)

Validación:
- n debe estar entre 1 y 100
- Muestra mensaje de error si no es válido
*/
function generateFibonacci() {
    // Obtener referencias a los elementos del DOM
    const input = document.getElementById('fib-input');
    const outputDiv = document.getElementById('fib-output');
    const errorDiv = document.getElementById('fib-error');
    
    // parseInt convierte el string del input a número entero
    const n = parseInt(input.value);

    // Ocultar mensaje de error anterior
    errorDiv.classList.add('hidden');
    
    // Limpiar resultado anterior
    outputDiv.innerHTML = '';

    // Validar entrada
    // isNaN: "Is Not a Number" - true si no es un número válido
    // El operador || proporciona un valor por defecto
    if (isNaN(n) || n < 1 || n > 100) {
        // Mostrar mensaje de error
        errorDiv.classList.remove('hidden');
        return;  // Salir sin generar
    }

    // Calcular secuencia de Fibonacci
    let a = 0;  // Primer número
    let b = 1;   // Segundo número
    let sequence = [];  // Array para almacenar la secuencia

    // Bucle for: inicialización; condición; incremento
    // Se ejecuta mientras i < n
    for (let i = 0; i < n; i++) {
        sequence.push(a);  // Añadir número actual a la secuencia
        
        // Calcular siguiente número
        // temp = a + b (ej: 0 + 1 = 1)
        // a = b (a ahora es 1)
        // b = temp (b ahora es 1)
        let temp = a + b;
        a = b;
        b = temp;
    }

    // Crear elementos HTML para cada número
    sequence.forEach(num => {
        // createElement: Crea un nuevo elemento HTML
        const span = document.createElement('span');
        
        // className: Establece el atributo class
        span.className = "bg-slate-800 text-purple-300 px-2 py-1 rounded text-sm font-mono border border-slate-700";
        
        // textContent: El texto dentro del elemento
        span.textContent = num;
        
        // appendChild: Añade el elemento como hijo
        outputDiv.appendChild(span);
    });

    // Marcar misión como completada
    if (typeof window.completeMission === 'function') {
        window.completeMission('fibonacci');
    }
}

/*
OBJETO: polygonNames
----------------------------------------------------------------------
Diccionario que mapea el número de lados al nombre del polígono.

Ejemplo:
- polygonNames[3] = "Triangle" (3 lados = triángulo)
- polygonNames[4] = "Quadrilateral" (4 lados = cuadrilátero)

Se usa como tabla de búsqueda para convertir números a nombres.
*/
const polygonNames = {
    3: "Triangle", 
    4: "Quadrilateral", 
    5: "Pentagon", 
    6: "Hexagon",
    7: "Heptagon", 
    8: "Octagon", 
    9: "Nonagon", 
    10: "Decagon",
    11: "Hendecagon", 
    12: "Dodecagon", 
    13: "Tridecagon", 
    14: "Tetradecagon",
    15: "Pentadecagon", 
    16: "Hexadecagon", 
    17: "Heptadecagon",
    18: "Octadecagon", 
    19: "Enneadecagon", 
    20: "Icosagon"
};

/*
FUNCIÓN: generatePolygon()
----------------------------------------------------------------------
Busca el nombre de un polígono dado su número de lados.

Validación:
- El número de lados debe estar entre 3 y 20
- Muestra error si está fuera de rango
*/
function generatePolygon() {
    const input = document.getElementById('poly-input');
    const output = document.getElementById('poly-output');
    
    // parseInt convierte string a número entero
    const n = parseInt(input.value);

    // Limpiar salida anterior
    output.value = "";
    
    // Quitar colores de error anteriores
    output.classList.remove('text-red-400', 'text-amber-400');

    // Validar rango
    if (isNaN(n) || n < 3 || n > 20) {
        output.value = "Invalid range (3-20)";
        output.classList.add('text-red-400');
        return;
    }

    // Buscar nombre en el diccionario
    // polygonNames[n] obtiene el valor asociado a la clave n
    output.value = polygonNames[n];
    output.classList.add('text-amber-400');

    // Marcar misión como completada
    if (typeof window.completeMission === 'function') {
        window.completeMission('polygon');
    }
}

/*
FUNCIÓN: generateBinomial()
----------------------------------------------------------------------
Genera una expresión binomial aleatoria de la forma (a ± b)².

Ejemplos de salida:
- ( x + 3y )²
- ( 2a - 5b )²
- ( m + n )²

Cómo funciona:
1. Elige 2 variables aleatorias (x, y, a, b, m, n)
2. Genera coeficientes aleatorios (1-10)
3. Elige signo aleatorio (+ o -)
4. Formatea la expresión
*/
function generateBinomial() {
    // Array de posibles variables
    const vars = ['x', 'y', 'a', 'b', 'm', 'n'];
    
    // Math.floor(Math.random() * array.length) = índice aleatorio
    const var1 = vars[Math.floor(Math.random() * vars.length)];
    const var2 = vars[Math.floor(Math.random() * vars.length)];
    
    // Coeficientes aleatorios (1-10)
    const coef1 = Math.floor(Math.random() * 10) + 1;
    const coef2 = Math.floor(Math.random() * 10) + 1;
    
    // Signo aleatorio: 50% +, 50% -
    const sign = Math.random() > 0.5 ? '+' : '-';
    
    // Formatear coeficientes
    // Si coef es 1, no mostrar el número (ej: "x" no "1x")
    const first = coef1 === 1 ? var1 : coef1 + var1;
    const second = coef2 === 1 ? var2 : coef2 + var2;
    
    // Construir expresión final
    const result = `( ${first} ${sign} ${second} )^2`;
    
    // Mostrar resultado
    document.getElementById('binomial-result').textContent = result;
}

/*
FUNCIÓN: generatePolynomial()
----------------------------------------------------------------------
Genera una expresión polinómica aleatoria.

Ejemplos:
- 3x² + 2x - 5
- -x³ + 4x² + 3x - 2
- 2y² - 6

Cómo funciona:
1. Elige variable y grado (2-4)
2. Genera coeficientes aleatorios para cada potencia
3. Construye la expresión término por término
4. Aplica reglas de formato (signos, paréntesis)
*/
function generatePolynomial() {
    const vars = ['x', 'y', 'z', 't'];
    const variable = vars[Math.floor(Math.random() * vars.length)];
    const degree = Math.floor(Math.random() * 3) + 2;  // Grado 2, 3, o 4
    
    let terms = [];  // Array para almacenar los términos
    
    // Generar términos desde el grado más alto hasta 0 (constante)
    for (let i = degree; i >= 0; i--) {
        if (i === 0) {
            // Término constante (sin variable)
            const coef = Math.floor(Math.random() * 20) - 10;  // -10 a 10
            if (coef !== 0) {  // No incluir si es 0
                // Si ya hay términos y coef es positivo, añadir con "+"
                terms.push(coef > 0 && terms.length > 0 ? `+ ${coef}` : coef);
            }
        } else {
            // Término con variable
            let coef = Math.floor(Math.random() * 15) - 7;  // -7 a 7
            
            // Si es el primer término y coef es 0, poner 1
            if (coef === 0 && i === degree) coef = 1;
            
            if (coef !== 0) {
                let term;
                
                if (i === 1) {
                    // Exponente 1: "x" no "x^1"
                    term = coef === 1 ? variable : 
                           coef === -1 ? `- ${variable}` : 
                           `${coef}${variable}`;
                } else {
                    // Exponente > 1: "x^2"
                    term = coef === 1 ? `${variable}^${i}` : 
                           coef === -1 ? `- ${variable}^${i}` : 
                           `${coef}${variable}^${i}`;
                }
                
                // Manejar signos
                if (terms.length > 0 && coef > 0) {
                    term = '+ ' + term;
                } else if (coef < 0) {
                    term = '- ' + term.replace('-', '');
                }
                
                terms.push(term);
            }
        }
    }
    
    // Unir todos los términos
    const result = terms.join(' ');
    document.getElementById('polygen-result').textContent = result;
}

/*
FUNCIÓN: convertUnit()
----------------------------------------------------------------------
Convierte valores entre diferentes unidades.

Unidades soportadas:
- Peso: g, kg, lb, oz
- Longitud: m, km, mi, ft, in
- Temperatura: °C, °F, K

Cómo funciona:
1. Obtiene valor y unidades de origen y destino
2. Convierte a una unidad base (metros o gramos)
3. Convierte de la unidad base a la unidad destino
4. Muestra el resultado
*/
function convertUnit() {
    // Obtener valores de los inputs
    const value = parseFloat(document.getElementById('unit-value').value);
    const from = document.getElementById('unit-from').value;
    const to = document.getElementById('unit-to').value;
    
    // Validar que todos los campos tengan valores
    if (!value || !from || !to) {
        alert("Please enter a value and select both units");
        return;
    }
    
    let result;
    
    // Tablas de conversión a metros/gramos
    // Cada valor indica cuántos metros/gramos equivale 1 unidad
    const toMeters = {
        // Peso (convertido a kilogramos)
        g: value / 1000,
        kg: value,
        lb: value * 0.453592,
        oz: value * 0.0283495,
        // Longitud
        m: value,
        km: value * 1000,
        mi: value * 1609.34,
        ft: value * 0.3048,
        in: value * 0.0254
    };
    
    // Tablas de conversión desde metros/gramos
    const fromMeters = {
        g: (m) => m * 1000,
        kg: (m) => m,
        lb: (m) => m / 0.453592,
        oz: (m) => m / 0.0283495,
        m: (m) => m,
        km: (m) => m / 1000,
        mi: (m) => m / 1609.34,
        ft: (m) => m / 0.3048,
        in: (m) => m / 0.0254
    };
    
    // Verificar si es peso o longitud
    const isWeight = ['g', 'kg', 'lb', 'oz'].includes(from);
    const isLength = ['m', 'km', 'mi', 'ft', 'in'].includes(from);
    
    if (isWeight || isLength) {
        // Conversión estándar (peso/longitud)
        if (from === to) {
            // Mismas unidades, no convertir
            result = value;
        } else {
            // Convertir a metros/gramos, luego a la unidad destino
            const meters = toMeters[from];
            result = fromMeters[to](meters);
        }
    } else {
        // Conversión de temperatura (especial)
        if (from === 'C' && to === 'F') {
            // Celsius a Fahrenheit: F = C * 9/5 + 32
            result = (value * 9/5) + 32;
        } else if (from === 'F' && to === 'C') {
            // Fahrenheit a Celsius: C = (F - 32) * 5/9
            result = (value - 32) * 5/9;
        } else if (from === 'C' && to === 'K') {
            // Celsius a Kelvin: K = C + 273.15
            result = value + 273.15;
        } else if (from === 'K' && to === 'C') {
            // Kelvin a Celsius: C = K - 273.15
            result = value - 273.15;
        } else if (from === 'F' && to === 'K') {
            // Fahrenheit a Kelvin
            result = ((value - 32) * 5/9) + 273.15;
        } else if (from === 'K' && to === 'F') {
            // Kelvin a Fahrenheit
            result = ((value - 273.15) * 9/5) + 32;
        } else {
            result = value;
        }
    }
    
    // Formatear resultado
    // Number.isInteger: true si es número entero
    const formatted = Number.isInteger(result) ? result : result.toFixed(4);
    
    // Mostrar resultado
    document.getElementById('unit-output').textContent = `${value} ${from} = ${formatted} ${to}`;
    document.getElementById('unit-result').classList.remove('hidden');
    
    // Marcar misión del conversor de unidades como completada
    if (typeof window.completeMission === 'function') {
        window.completeMission('unit');
    }
}

// ================================================================================
// HERRAMIENTAS DE NUTRICIÓN
// ================================================================================

/*
FUNCIÓN: calculateIMC()
----------------------------------------------------------------------
Calcula el Índice de Masa Corporal (IMC/BMI).

Fórmula: IMC = peso(kg) / altura(m)²

Categorías:
- < 18.5: Bajo peso
- 18.5 - 24.9: Peso normal
- 25 - 29.9: Sobrepeso
- >= 30: Obesidad
*/
function calculateIMC() {
    // Obtener valores
    const weight = parseFloat(document.getElementById('imc-weight').value);
    const height = parseFloat(document.getElementById('imc-height').value);

    // Validar
    if (!weight || !height || weight <= 0 || height <= 0) {
        alert("Please enter valid weight and height");
        return;
    }

    // Convertir altura a metros
    const heightM = height / 100;
    
    // Calcular IMC
    const imc = weight / (heightM * heightM);
    const imcFixed = imc.toFixed(2);  // 2 decimales

    // Determinar categoría
    let category = "";
    let categoryClass = "";

    if (imc < 18.5) {
        category = "Underweight";
        categoryClass = "text-blue-400";
    } else if (imc < 25) {
        category = "Normal weight";
        categoryClass = "text-green-400";
    } else if (imc < 30) {
        category = "Overweight";
        categoryClass = "text-orange-400";
    } else {
        category = "Obesity";
        categoryClass = "text-red-400";
    }

    // Mostrar resultados
    document.getElementById('imc-value').textContent = imcFixed;
    document.getElementById('imc-category').textContent = category;
    document.getElementById('imc-category').className = `text-sm mt-1 ${categoryClass}`;
    document.getElementById('imc-result').classList.remove('hidden');
    
    // Marcar misión del BMI como completada
    if (typeof window.completeMission === 'function') {
        window.completeMission('bmi');
    }
}

/*

Resultado:
- >= 80: Very Healthy
- >= 60: Good
- >= 40: Average
- < 40: Unhealthy
*/
function rateFood() {
    // Obtener valores de los inputs (0 si está vacío)
    // Math.max evita valores negativos
    const carbs = Math.max(0, parseFloat(document.getElementById('food-carbs').value) || 0);
    const sugar = Math.max(0, parseFloat(document.getElementById('food-sugar').value) || 0);
    const saturated = Math.max(0, parseFloat(document.getElementById('food-saturated').value) || 0);
    const fiber = Math.max(0, parseFloat(document.getElementById('food-fiber').value) || 0);
    const protein = Math.max(0, parseFloat(document.getElementById('food-protein').value) || 0);

    // Calcular puntuación
    // Fórmulas empíricas para evaluar saludabilidad
    let score = 100 
        - (2 * sugar)           // Azúcares son malos
        - (3 * saturated)        // Grasas saturadas son peores
        - (1 * carbs)           // Carbohidratos tienen impacto moderado
        + (4 * fiber)           // Fibra es bueno
        + (2 * protein);       // Proteína es bueno
    
    // Limitar entre 0 y 100
    score = Math.max(0, Math.min(100, score));

    // Obtener referencias a elementos del DOM
    const scoreP = document.getElementById('food-score');
    const ratingP = document.getElementById('food-rating');
    const feedbackP = document.getElementById('food-feedback');
    const barP = document.getElementById('food-bar');
    const resultDiv = document.getElementById('food-result');

    // Determinar rating según puntuación
    let rating, color, barColor;

    if (score >= 80) {
        rating = "Very Healthy";
        color = "text-green-400";
        barColor = "bg-green-500";
    } else if (score >= 60) {
        rating = "Good";
        color = "text-yellow-400";
        barColor = "bg-yellow-500";
    } else if (score >= 40) {
        rating = "Average";
        color = "text-orange-400";
        barColor = "bg-orange-500";
    } else {
        rating = "Unhealthy";
        color = "text-red-400";
        barColor = "bg-red-500";
    }

    // Generar feedback personalizado
    let feedback = [];
    if (sugar > 15) feedback.push("High in sugar");
    if (saturated > 10) feedback.push("High in saturated fats");
    if (carbs > 50) feedback.push("High in carbs");
    if (fiber > 5) feedback.push("Good amount of fiber");
    if (protein > 10) feedback.push("High in protein");

    // Actualizar UI
    scoreP.textContent = `${score} / 100`;
    ratingP.textContent = rating;
    ratingP.className = `text-xl font-bold ${color}`;
    barP.style.width = `${score}%`;
    barP.className = `h-full rounded-full transition-all duration-500 ${barColor}`;
    feedbackP.textContent = feedback.length > 0 ? feedback.join(" | ") : "Balanced nutritional profile";
    resultDiv.classList.remove('hidden');
    
    // Marcar misión como completada
    if (typeof window.completeMission === 'function') {
        window.completeMission('food');
    }
}

// ================================================================================
// HERRAMIENTAS DE PRODUCTIVIDAD
// ================================================================================

/*
FUNCIÓN: isValidPIN(pin, length)
----------------------------------------------------------------------
Valida que un PIN sea "seguro" (no predecible).

Un PIN seguro NO debe:
- Ser todos los dígitos iguales (0000)
- Tener patrones obvios (1234, 4321)
- Ser años (1900-2099)
- Tener más de 2 dígitos repetidos seguidos
- Tener más de 2 repeticiones del mismo dígito

Parámetros:
- pin: Array de strings (dígitos)
- length: Longitud esperada

Retorna:
- true si es seguro, false si no lo es
*/
function isValidPIN(pin, length) {
    // Unir array a string
    const str = pin.join('');
    
    // Verificar longitud
    if (str.length !== length) return false;
    
    // Verificar si todos los dígitos son iguales
    const allSame = str.split('').every(d => d === str[0]);
    if (allSame) return false;
    
    // Patrones comunes a evitar
    const commonPatterns = [
        '1234', '2345', '3456', '4567', '5678', '6789',  // Secuenciales ascendentes
        '4321', '5432', '6543', '7654', '8765', '9876',  // Secuenciales descendentes
        '1212', '1122',  // Patrones repetitivos
        '0000', '1111', '2222', '3333', '4444', '5555', '6666', '7777', '8888', '9999',  // Repetidos
        '1990', '2020',  // Años comunes
        '2580', '7410', '0852', '2048'  // Patrones de teclado
    ];
    if (commonPatterns.includes(str)) return false;
    
    // Verificar si es un año (1900-2099)
    const yearPattern = /^(19|20)\d{2}$/;
    if (yearPattern.test(str)) return false;
    
    // Contar repeticiones de cada dígito
    const counts = {};
    for (const digit of str) {
        counts[digit] = (counts[digit] || 0) + 1;
        if (counts[digit] > 2) return false;  // Más de 2 repeticiones = inválido
    }
    
    // Verificar repeticiones consecutivas
    let repeatCount = 1;
    for (let i = 1; i < str.length; i++) {
        if (str[i] === str[i - 1]) {
            repeatCount++;
            if (repeatCount > 2) return false;  // Más de 2 consecutivos = inválido
        } else {
            repeatCount = 1;
        }
    }
    
    return true;
}

/*
FUNCIÓN: selectPinLength(length)
----------------------------------------------------------------------
Selecciona la longitud del PIN y actualiza el estilo de los botones.
*/
function selectPinLength(length) {
    document.getElementById('pin-length-selected').value = length;
    
    // Actualizar estilos de los botones
    const btn4 = document.getElementById('pin-btn-4');
    const btn6 = document.getElementById('pin-btn-6');
    
    if (length === 4) {
        btn4.style.background = '#8b5cf6';
        btn4.style.color = 'white';
        btn6.style.background = 'transparent';
        btn6.style.color = '#8b5cf6';
    } else {
        btn6.style.background = '#8b5cf6';
        btn6.style.color = 'white';
        btn4.style.background = 'transparent';
        btn4.style.color = '#8b5cf6';
    }
}

/*
FUNCIÓN: generatePIN()
----------------------------------------------------------------------
Genera un PIN válido de 4 o 6 dígitos.

Validación:
1. No tener 3+ dígitos consecutivos ascendentes
2. No tener 3+ dígitos consecutivos descendentes
3. No tener 3+ dígitos repetidos
4. Máximo 1000 intentos (por seguridad)
*/
function generatePIN() {
    // Obtener longitud seleccionada del input oculto
    const length = parseInt(document.getElementById('pin-length-selected').value);
    
    let pin;
    let attempts = 0;
    const maxAttempts = 1000;
    
    // Bucle do-while: ejecuta al menos una vez, repite mientras condición sea verdadera
    do {
        // Generar array de dígitos aleatorios
        pin = [];
        for (let i = 0; i < length; i++) {
            // Math.floor(Math.random() * 10) = 0-9
            pin.push(Math.floor(Math.random() * 10).toString());
        }
        attempts++;
    } while (!isValidPIN(pin, length) && attempts < maxAttempts);
    
    // Unir y mostrar
    const pinStr = pin.join('');
    document.getElementById('pin-output').textContent = pinStr;
    document.getElementById('pin-result').classList.remove('hidden');
    document.getElementById('copy-text').textContent = 'Copy';
    
    // Marcar misión como completada
    if (typeof window.completeMission === 'function') {
        window.completeMission('pin');
    }
}

/*
FUNCIÓN: copyPIN()
----------------------------------------------------------------------
Copia el PIN generado al portapapeles del sistema.

Usa la API Clipboard para copiar texto.
*/
function copyPIN() {
    const pin = document.getElementById('pin-output').textContent;
    
    // navigator.clipboard: API para acceder al portapapeles
    navigator.clipboard.writeText(pin).then(() => {
        // Éxito: cambiar texto del botón
        document.getElementById('copy-text').textContent = 'Copied!';
        
        // Después de 2 segundos, volver al texto original
        setTimeout(() => {
            document.getElementById('copy-text').textContent = 'Copy';
        }, 2000);
    });
}

/*
ARRAY: wordList
----------------------------------------------------------------------
Lista de palabras en inglés con sus significados en ambos idiomas.

Cada elemento tiene:
- word: La palabra en inglés
- meaningEn: Significado en inglés
- meaningEs: Significado en español (estilo RAE)

Estas palabras son interesantes y poco comunes.
*/
const wordListEn = [
    { word: "Alienation", meaning: "The feeling of being isolated or separated from others, often causing emotional pain." },
    { word: "Serendipity", meaning: "The occurrence of events by chance in a happy or beneficial way." },
    { word: "Idoneous", meaning: "Highly appropriate or suitable for a particular purpose or occasion." },
    { word: "Nostalgia", meaning: "A sentimental longing or affection for the past." },
    { word: "Ephemeral", meaning: "Lasting for a very short time." },
    { word: "Paradox", meaning: "A statement or situation that contains two opposite ideas but is still true." },
    { word: "Ineffable", meaning: "Too great or extreme to be expressed in words." },
    { word: "Solitude", meaning: "The state of being alone without feeling lonely." },
    { word: "Ambiguous", meaning: "Open to more than one interpretation; unclear." },
    { word: "Obsession", meaning: "An idea or thought that dominates someone's mind." },
    { word: "Euphoria", meaning: "A feeling of intense excitement and happiness." },
    { word: "Resilience", meaning: "The ability to recover quickly from difficulties." },
    { word: "Mellifluous", meaning: "Sweet or musical; pleasant to hear." },
    { word: "Petrichor", meaning: "The pleasant smell after rain falls on dry earth." },
    { word: "Saudade", meaning: "A deep emotional state of longing for something or someone." },
    { word: "Wanderlust", meaning: "A strong desire to travel and explore the world." },
    { word: "Luminous", meaning: "Full of or shedding light; bright or shining." },
    { word: "Ethereal", meaning: "Extremely delicate and light in a way that seems not of this world." },
    { word: "Surreptitious", meaning: "Kept secret, especially because it would not be approved of." },
    { word: "Halcyon", meaning: "Denoting a period of time in the past that was idyllically happy." }
];

const wordListEs = [
    { word: "Alienation", meaning: "Sentimiento de aislamiento o separación de los demás, que suele causar dolor emocional." },
    { word: "Serendipity", meaning: "Acontecimiento feliz que acontece por azar; encontrar algo valioso sin buscarlo." },
    { word: "Idoneous", meaning: "Adecuado o apropiado para un propósito particular." },
    { word: "Nostalgia", meaning: "Sentimiento de pena por la pérdida de algo querido o por el recuerdo de un tiempo pasado." },
    { word: "Ephemeral", meaning: "Que dura muy poco tiempo; pasajero." },
    { word: "Paradox", meaning: "Afirmación aparentemente contradictoria que puede ser verdadera." },
    { word: "Ineffable", meaning: "Que no puede expresarse con palabras; indecible." },
    { word: "Solitude", meaning: "Estado de estar solo sin sentirse solo." },
    { word: "Ambiguous", meaning: "Que admite dos o más interpretaciones; oscuro o impreciso." },
    { word: "Obsession", meaning: "Preocupación persistente que domina el pensamiento de una persona." },
    { word: "Euphoria", meaning: "Estado de ánimo caracterizado por una intensa sensación de bienestar y alegría." },
    { word: "Resilience", meaning: "Capacidad de adaptarse y recuperarse rápidamente ante la adversidad." },
    { word: "Mellifluous", meaning: "De sonido dulce y armonioso; agradable al oído." },
    { word: "Petrichor", meaning: "Aroma agradable que despide la tierra cuando cae la lluvia después de un período seco." },
    { word: "Saudade", meaning: "Sentimiento profundo de nostalgia o anhelo por algo o alguien ausente." },
    { word: "Wanderlust", meaning: "Deseo intenso de viajar y explorar nuevos lugares." },
    { word: "Luminous", meaning: "Que emite luz; iluminado o brillante." },
    { word: "Ethereal", meaning: "Extremadamente delicado y ligero, como si no fuera de este mundo." },
    { word: "Surreptitious", meaning: "Hecho de manera secreta, sin ser observado ni detectado." },
    { word: "Halcyon", meaning: "Período del pasado caracterizado por dicha y serenidad perfectas." }
];

/*
FUNCIÓN: generateWord()
----------------------------------------------------------------------
Muestra una palabra aleatoria con su significado en el idioma actual.
*/
function generateWord() {
    // Seleccionar lista según idioma actual
    const wordList = currentLang === 'es' ? wordListEs : wordListEn;
    
    // Seleccionar palabra aleatoria
    const result = wordList[Math.floor(Math.random() * wordList.length)];
    
    // Obtener elementos del DOM
    const outputEl = document.getElementById('word-output');
    const meaningEl = document.getElementById('word-meaning');
    
    // Actualizar contenido
    outputEl.textContent = result.word;
    meaningEl.textContent = `"${result.meaning}"`;
    
    // Reiniciar y aplicar animación
    // void outputEl.offsetWidth: Fuerza reflujo del navegador
    // Esto hace que la animación se reinicie
    outputEl.classList.remove('fade-in');
    meaningEl.classList.remove('fade-in');
    void outputEl.offsetWidth;  // Trigger reflow
    outputEl.classList.add('fade-in');
    meaningEl.classList.add('fade-in');
    
    // Mostrar contenedor de resultados
    document.getElementById('word-result').classList.remove('hidden');
}

/*
FUNCIÓN: generatePassword()
----------------------------------------------------------------------
Genera una contraseña aleatoria y segura.

Características:
- Incluye minúsculas, mayúsculas, números y símbolos
- Longitud configurable (8-32 caracteres)
- Mezcla aleatoria de caracteres

Cómo funciona:
1. Asegura al menos un carácter de cada tipo
2. Completa hasta la longitud deseada con caracteres aleatorios
3. Mezcla aleatoriamente todos los caracteres
*/
function generatePassword() {
    // Obtener longitud (entre 8 y 32, por defecto 16)
    const length = Math.min(32, Math.max(8, parseInt(document.getElementById('pwd-length').value) || 16));
    
    // Caracteres disponibles
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    
    // Asegurar al menos un carácter de cada tipo
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];
    
    // Combinar todos los caracteres para el resto
    const allChars = lowercase + uppercase + numbers + symbols;
    
    // Completar hasta la longitud deseada
    for (let i = 4; i < length; i++) {
        password += allChars[Math.floor(Math.random() * allChars.length)];
    }
    
    // Mezclar aleatoriamente todos los caracteres
    // split(''): "abc" -> ['a', 'b', 'c']
    // sort(() => Math.random() - 0.5): Orden aleatorio
    // join(''): ['c', 'a', 'b'] -> "cab"
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    // Mostrar resultado
    document.getElementById('pwd-output').textContent = password;
    document.getElementById('pwd-result').classList.remove('hidden');
    
    // Marcar misiones como completadas
    if (typeof window.completeMission === 'function') {
        window.completeMission('password');
        // Marcar también "contraseña larga" si length >= 10
        if (length >= 10) {
            window.completeMission('longpwd');
        }
    }
}

/*
FUNCIÓN: copyPassword()
----------------------------------------------------------------------
Copia la contraseña generada al portapapeles.
*/
function copyPassword() {
    const password = document.getElementById('pwd-output').textContent;
    navigator.clipboard.writeText(password);
}
