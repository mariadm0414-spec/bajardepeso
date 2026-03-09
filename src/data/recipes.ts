import type { Recipe } from '../types';

type Cat = Recipe['category'];
type Meal = Recipe['mealType'];

interface Base {
    name: string; emoji: string; color: string;
    mealType: Meal; category: Cat;
    calories: number; protein: number; carbs: number; fat: number;
    prepMin: number; satietyScore: number; tags: string[];
    ingredients: { name: string; amount: string }[];
    steps: string[];
}

const BASE: Base[] = [
    // ── DESAYUNOS ─────────────────────────────────────────────────────────────
    { id: 'd1', name: 'Avena con Fresas y Proteína', emoji: '🥣', color: '#fecdd3', mealType: 'Desayuno', category: 'Proteína', calories: 320, protein: 28, carbs: 38, fat: 6, prepMin: 10, satietyScore: 9, tags: ['alto en proteína', 'fibra'], ingredients: [{ name: 'Avena', amount: '60g' }, { name: 'Proteína en polvo', amount: '30g' }, { name: 'Fresas', amount: '100g' }, { name: 'Leche descremada', amount: '200ml' }], steps: ['Cocina la avena con leche 3 min.', 'Disuelve la proteína.', 'Agrega fresas y sirve.'] },
    { id: 'd2', name: 'Huevos Revueltos con Espinacas', emoji: '🍳', color: '#d1fae5', mealType: 'Desayuno', category: 'Proteína', calories: 280, protein: 24, carbs: 8, fat: 16, prepMin: 8, satietyScore: 9, tags: ['keto', 'sin gluten'], ingredients: [{ name: 'Huevos', amount: '3 pzas' }, { name: 'Espinacas', amount: '80g' }, { name: 'Aceite de oliva', amount: '1 cdta' }, { name: 'Queso cottage', amount: '50g' }], steps: ['Saltea espinacas 2 min.', 'Bate huevos y vierte.', 'Revuelve a fuego medio.'] },
    { id: 'd3', name: 'Yogur Griego con Granola', emoji: '🍨', color: '#fef3c7', mealType: 'Desayuno', category: 'Bajo en calorías', calories: 290, protein: 18, carbs: 42, fat: 4, prepMin: 5, satietyScore: 8, tags: ['rápido', 'sin cocción'], ingredients: [{ name: 'Yogur griego 0%', amount: '200g' }, { name: 'Granola', amount: '30g' }, { name: 'Mango', amount: '80g' }, { name: 'Miel', amount: '1 cdta' }], steps: ['Coloca yogur en tazón.', 'Agrega granola y fruta.', 'Rocía miel y sirve.'] },
    { id: 'd4', name: 'Batido Verde Proteico', emoji: '🥤', color: '#a7f3d0', mealType: 'Desayuno', category: 'Vegano', calories: 260, protein: 22, carbs: 32, fat: 4, prepMin: 5, satietyScore: 8, tags: ['vegano', 'sin lactosa'], ingredients: [{ name: 'Espinacas', amount: '60g' }, { name: 'Leche de almendra', amount: '250ml' }, { name: 'Proteína vegana', amount: '30g' }, { name: 'Plátano', amount: '1 pza' }], steps: ['Pon todo en licuadora.', 'Licúa 60 seg.', 'Sirve frío.'] },
    { id: 'd5', name: 'Tostadas de Aguacate', emoji: '🥑', color: '#d9f99d', mealType: 'Desayuno', category: 'Mediterránea', calories: 310, protein: 12, carbs: 36, fat: 14, prepMin: 7, satietyScore: 8, tags: ['mediterránea', 'grasas buenas'], ingredients: [{ name: 'Pan de centeno', amount: '2 rebanadas' }, { name: 'Aguacate', amount: '½ pza' }, { name: 'Limón', amount: '1 pza' }, { name: 'Huevo pochado', amount: '1 pza' }], steps: ['Tuesta el pan.', 'Aplasta aguacate con limón.', 'Coloca huevo encima.'] },
    { id: 'd6', name: 'Panqueques de Avena y Plátano', emoji: '🥞', color: '#fed7aa', mealType: 'Desayuno', category: 'Proteína', calories: 340, protein: 20, carbs: 52, fat: 6, prepMin: 15, satietyScore: 9, tags: ['sin gluten', 'saciante'], ingredients: [{ name: 'Avena molida', amount: '80g' }, { name: 'Plátano', amount: '1 pza' }, { name: 'Huevos', amount: '2 pzas' }, { name: 'Proteína en polvo', amount: '20g' }], steps: ['Mezcla todo hasta formar masa.', 'Cocina en sartén 2 min por lado.', 'Sirve con fruta.'] },
    { id: 'd7', name: 'Bowl de Quínoa con Frutos Rojos', emoji: '🫐', color: '#ddd6fe', mealType: 'Desayuno', category: 'Vegano', calories: 300, protein: 11, carbs: 54, fat: 5, prepMin: 15, satietyScore: 8, tags: ['vegano', 'superalimento'], ingredients: [{ name: 'Quínoa cocida', amount: '150g' }, { name: 'Leche de coco light', amount: '100ml' }, { name: 'Frutos rojos', amount: '80g' }, { name: 'Chía', amount: '1 cda' }], steps: ['Calienta quínoa con leche de coco.', 'Sirve y coloca frutos rojos y chía.'] },
    { id: 'd8', name: 'Tortilla de Claras con Verduras', emoji: '🍳', color: '#ecfdf5', mealType: 'Desayuno', category: 'Proteína', calories: 200, protein: 26, carbs: 6, fat: 7, prepMin: 10, satietyScore: 9, tags: ['keto', 'alto en proteína'], ingredients: [{ name: 'Claras de huevo', amount: '5 pzas' }, { name: 'Pimiento', amount: '½ pza' }, { name: 'Cebolla', amount: '¼ pza' }, { name: 'Tomate cherry', amount: '50g' }], steps: ['Saltea verduras 3 min.', 'Vierte claras batidas.', 'Dobla y sirve.'] },
    { id: 'd9', name: 'Chia Pudding con Coco', emoji: '🥥', color: '#f0fdf4', mealType: 'Desayuno', category: 'Vegano', calories: 270, protein: 8, carbs: 30, fat: 14, prepMin: 5, satietyScore: 8, tags: ['vegano', 'sin cocción', 'preparar noche anterior'], ingredients: [{ name: 'Semillas de chía', amount: '40g' }, { name: 'Leche de coco', amount: '200ml' }, { name: 'Mango', amount: '80g' }, { name: 'Coco rallado', amount: '10g' }], steps: ['Mezcla chía con leche de coco.', 'Refrigera 8 horas.', 'Sirve con mango y coco.'] },
    { id: 'd10', name: 'Tazón de Açaí', emoji: '🫐', color: '#c4b5fd', mealType: 'Desayuno', category: 'Bajo en calorías', calories: 280, protein: 6, carbs: 48, fat: 8, prepMin: 5, satietyScore: 7, tags: ['antioxidante', 'sin cocción'], ingredients: [{ name: 'Açaí congelado', amount: '100g' }, { name: 'Banana', amount: '½ pza' }, { name: 'Leche de almendra', amount: '50ml' }, { name: 'Granola', amount: '20g' }, { name: 'Fresas', amount: '50g' }], steps: ['Licúa açaí con banana y leche.', 'Sirve en tazón.', 'Decora con granola y fresas.'] },
    { id: 'd11', name: 'Waffles de Proteína', emoji: '🧇', color: '#fde68a', mealType: 'Desayuno', category: 'Proteína', calories: 350, protein: 30, carbs: 38, fat: 8, prepMin: 15, satietyScore: 9, tags: ['alto en proteína'], ingredients: [{ name: 'Proteína en polvo', amount: '40g' }, { name: 'Avena molida', amount: '60g' }, { name: 'Claras de huevo', amount: '4 pzas' }, { name: 'Leche descremada', amount: '100ml' }], steps: ['Mezcla todos los ingredientes.', 'Vierte en wafflera caliente.', 'Cocina 4 min hasta dorar.'] },
    { id: 'd12', name: 'Muesli con Nueces y Arándanos', emoji: '🥣', color: '#fef9c3', mealType: 'Desayuno', category: 'Bajo en calorías', calories: 310, protein: 9, carbs: 50, fat: 9, prepMin: 3, satietyScore: 7, tags: ['rápido', 'sin cocción'], ingredients: [{ name: 'Muesli sin azúcar', amount: '60g' }, { name: 'Leche descremada', amount: '150ml' }, { name: 'Arándanos', amount: '60g' }, { name: 'Nueces', amount: '15g' }], steps: ['Verter leche sobre el muesli.', 'Dejar reposar 2 min.', 'Agregar nueces y arándanos.'] },
    { id: 'd13', name: 'Tostadas con Huevo y Salmón', emoji: '🐟', color: '#fed7aa', mealType: 'Desayuno', category: 'Mediterránea', calories: 380, protein: 32, carbs: 28, fat: 16, prepMin: 10, satietyScore: 10, tags: ['omega-3', 'mediterránea'], ingredients: [{ name: 'Pan integral', amount: '2 rebanadas' }, { name: 'Salmón ahumado', amount: '80g' }, { name: 'Queso crema light', amount: '30g' }, { name: 'Pepino', amount: '½ pza' }, { name: 'Alcaparras', amount: '1 cda' }], steps: ['Tuesta el pan.', 'Unta queso crema.', 'Coloca salmón, pepino y alcaparras.'] },
    { id: 'd14', name: 'Bowl Proteico de Requesón', emoji: '🧀', color: '#f0fdf4', mealType: 'Desayuno', category: 'Proteína', calories: 250, protein: 28, carbs: 20, fat: 6, prepMin: 5, satietyScore: 9, tags: ['alto en proteína', 'sin cocción'], ingredients: [{ name: 'Requesón', amount: '200g' }, { name: 'Piña en cubos', amount: '80g' }, { name: 'Miel', amount: '1 cdta' }, { name: 'Semillas de girasol', amount: '10g' }], steps: ['Coloca requesón en tazón.', 'Agrega piña y semillas.', 'Rocía miel y sirve.'] },
    { id: 'd15', name: 'Smoothie Bowl de Mango', emoji: '🥭', color: '#fde68a', mealType: 'Desayuno', category: 'Vegano', calories: 290, protein: 7, carbs: 56, fat: 5, prepMin: 7, satietyScore: 7, tags: ['vegano', 'tropical'], ingredients: [{ name: 'Mango congelado', amount: '150g' }, { name: 'Leche de coco', amount: '80ml' }, { name: 'Proteína vegana', amount: '20g' }, { name: 'Kiwi', amount: '1 pza' }, { name: 'Coco rallado', amount: '10g' }], steps: ['Licúa mango con leche y proteína.', 'Sirve denso en tazón.', 'Decora con kiwi y coco.'] },

    // ── ALMUERZOS ─────────────────────────────────────────────────────────────
    { id: 'a1', name: 'Pechuga de Pollo con Brócoli', emoji: '🍗', color: '#dcfce7', mealType: 'Almuerzo', category: 'Proteína', calories: 380, protein: 45, carbs: 18, fat: 10, prepMin: 20, satietyScore: 10, tags: ['alto en proteína', 'bajo en carbos'], ingredients: [{ name: 'Pechuga de pollo', amount: '200g' }, { name: 'Brócoli', amount: '200g' }, { name: 'Aceite de oliva', amount: '1 cda' }, { name: 'Ajo en polvo', amount: '1 cdta' }], steps: ['Sazona la pechuga.', 'Hornea 180°C 20 min.', 'Cuece brócoli al vapor.', 'Sirve con limón.'] },
    { id: 'a2', name: 'Ensalada César con Salmón', emoji: '🥗', color: '#cffafe', mealType: 'Almuerzo', category: 'Mediterránea', calories: 420, protein: 38, carbs: 14, fat: 22, prepMin: 15, satietyScore: 9, tags: ['omega-3', 'mediterránea'], ingredients: [{ name: 'Salmón', amount: '180g' }, { name: 'Lechuga romana', amount: '3 hojas' }, { name: 'Parmesano', amount: '20g' }, { name: 'Aderezo César light', amount: '2 cdas' }], steps: ['Asa salmón 4 min por lado.', 'Mezcla lechuga con aderezo.', 'Coloca salmón y parmesano.'] },
    { id: 'a3', name: 'Lentejas Mediterráneas', emoji: '🫘', color: '#fde68a', mealType: 'Almuerzo', category: 'Vegano', calories: 370, protein: 24, carbs: 58, fat: 7, prepMin: 30, satietyScore: 9, tags: ['vegano', 'fibra alta'], ingredients: [{ name: 'Lentejas cocidas', amount: '200g' }, { name: 'Tomate', amount: '1 pza' }, { name: 'Cebolla', amount: '½ pza' }, { name: 'Zanahoria', amount: '1 pza' }, { name: 'Comino y cúrcuma', amount: '1 cdta c/u' }], steps: ['Sofríe cebolla y zanahoria 5 min.', 'Agrega tomate y especias.', 'Incorpora lentejas 10 min.'] },
    { id: 'a4', name: 'Bowl de Atún con Quinoa', emoji: '🐟', color: '#bfdbfe', mealType: 'Almuerzo', category: 'Bajo en calorías', calories: 360, protein: 40, carbs: 34, fat: 8, prepMin: 10, satietyScore: 10, tags: ['rápido', 'sin cocción'], ingredients: [{ name: 'Atún en agua', amount: '180g' }, { name: 'Quinoa cocida', amount: '120g' }, { name: 'Pepino', amount: '½ pza' }, { name: 'Aguacate', amount: '¼ pza' }], steps: ['Mezcla quinoa con atún.', 'Agrega pepino y aguacate.', 'Aliña con limón y soya.'] },
    { id: 'a5', name: 'Pavo al Horno con Camote', emoji: '🦃', color: '#fef08a', mealType: 'Almuerzo', category: 'Proteína', calories: 440, protein: 42, carbs: 38, fat: 12, prepMin: 35, satietyScore: 10, tags: ['alto en proteína', 'horneado'], ingredients: [{ name: 'Pechugas de pavo', amount: '200g' }, { name: 'Camote', amount: '150g' }, { name: 'Espárragos', amount: '100g' }, { name: 'Romero', amount: '1 cdta' }], steps: ['Precalienta horno 190°C.', 'Sazona pavo con hierbas.', 'Hornea 30 min con camote y espárragos.'] },
    { id: 'a6', name: 'Sopa de Pollo con Verduras', emoji: '🍲', color: '#fce7f3', mealType: 'Almuerzo', category: 'Bajo en calorías', calories: 310, protein: 32, carbs: 28, fat: 8, prepMin: 25, satietyScore: 9, tags: ['volumen alto', 'nutritivo'], ingredients: [{ name: 'Caldo de pollo', amount: '500ml' }, { name: 'Pechuga de pollo', amount: '150g' }, { name: 'Zanahoria y apio', amount: '1 pza c/u' }, { name: 'Arroz integral', amount: '40g' }], steps: ['Hierve caldo con pollo 15 min.', 'Agrega verduras y arroz.', 'Desmenuza pollo y sirve.'] },
    { id: 'a7', name: 'Stir-Fry de Tofu', emoji: '🥦', color: '#bbf7d0', mealType: 'Almuerzo', category: 'Vegano', calories: 350, protein: 22, carbs: 30, fat: 14, prepMin: 15, satietyScore: 8, tags: ['vegano', 'proteína vegetal'], ingredients: [{ name: 'Tofu firme', amount: '200g' }, { name: 'Brócoli y pimiento', amount: '150g c/u' }, { name: 'Salsa de soya light', amount: '2 cdas' }, { name: 'Aceite de ajonjolí', amount: '1 cdta' }], steps: ['Saltea tofu hasta dorar.', 'Agrega verduras 5 min.', 'Vierte salsa y sirve.'] },
    { id: 'a8', name: 'Ensalada Nicoise', emoji: '🥗', color: '#dbeafe', mealType: 'Almuerzo', category: 'Mediterránea', calories: 390, protein: 35, carbs: 22, fat: 18, prepMin: 15, satietyScore: 9, tags: ['mediterránea', 'completa'], ingredients: [{ name: 'Atún en aceite de oliva', amount: '150g' }, { name: 'Huevo duro', amount: '2 pzas' }, { name: 'Judías verdes', amount: '100g' }, { name: 'Tomate cherry', amount: '100g' }, { name: 'Aceitunas negras', amount: '30g' }], steps: ['Cuece judías 5 min al vapor.', 'Corta huevo y tomate.', 'Mezcla todo con aceite y limón.'] },
    { id: 'a9', name: 'Arroz Integral con Pollo Thai', emoji: '🍚', color: '#d1fae5', mealType: 'Almuerzo', category: 'Proteína', calories: 450, protein: 40, carbs: 50, fat: 10, prepMin: 20, satietyScore: 10, tags: ['alto en proteína', 'saciante'], ingredients: [{ name: 'Arroz integral', amount: '150g cocido' }, { name: 'Pechuga de pollo', amount: '180g' }, { name: 'Salsa thai de maní', amount: '2 cdas' }, { name: 'Pepino y zanahoria', amount: '50g c/u' }], steps: ['Cocina el pollo en tiras.', 'Mezcla con arroz y verduras.', 'Aliña con salsa thai.'] },
    { id: 'a10', name: 'Garbanzos al Curry', emoji: '🍛', color: '#fde68a', mealType: 'Almuerzo', category: 'Vegano', calories: 380, protein: 18, carbs: 56, fat: 10, prepMin: 20, satietyScore: 9, tags: ['vegano', 'especiado'], ingredients: [{ name: 'Garbanzos cocidos', amount: '200g' }, { name: 'Tomate triturado', amount: '200ml' }, { name: 'Leche de coco light', amount: '100ml' }, { name: 'Curry en polvo', amount: '2 cdtas' }], steps: ['Sofríe cebolla y ajo.', 'Agrega tomate y curry.', 'Incorpora garbanzos y leche de coco 10 min.'] },
    { id: 'a11', name: 'Hamburguesa de Pavo sin Pan', emoji: '🍔', color: '#fed7aa', mealType: 'Almuerzo', category: 'Proteína', calories: 350, protein: 40, carbs: 12, fat: 14, prepMin: 15, satietyScore: 9, tags: ['bajo en carbos', 'keto'], ingredients: [{ name: 'Carne de pavo molida', amount: '200g' }, { name: 'Lechuga para envolver', amount: '2 hojas grandes' }, { name: 'Tomate', amount: '½ pza' }, { name: 'Mostaza', amount: '1 cda' }], steps: ['Forma hamburguesa y cocina 4 min por lado.', 'Envuelve en hoja de lechuga.', 'Agrega tomate y mostaza.'] },
    { id: 'a12', name: 'Pasta de Frijol Negro con Pollo', emoji: '🍝', color: '#c4b5fd', mealType: 'Almuerzo', category: 'Proteína', calories: 410, protein: 38, carbs: 44, fat: 10, prepMin: 20, satietyScore: 10, tags: ['alto en proteína', 'fibra'], ingredients: [{ name: 'Pasta de frijol negro', amount: '100g' }, { name: 'Pechuga de pollo en tiras', amount: '150g' }, { name: 'Albahaca y tomate cherry', amount: 'al gusto' }, { name: 'Aceite de oliva', amount: '1 cda' }], steps: ['Hierve la pasta 8 min.', 'Saltea pollo con ajo.', 'Mezcla con pasta, tomate y albahaca.'] },
    { id: 'a13', name: 'Ceviche de Camarón', emoji: '🦐', color: '#e0f2fe', mealType: 'Almuerzo', category: 'Bajo en calorías', calories: 280, protein: 32, carbs: 18, fat: 6, prepMin: 15, satietyScore: 8, tags: ['bajo en calorías', 'fresco'], ingredients: [{ name: 'Camarones cocidos', amount: '200g' }, { name: 'Limón', amount: '3 pzas' }, { name: 'Pepino', amount: '½ pza' }, { name: 'Tomate', amount: '1 pza' }, { name: 'Cilantro', amount: 'al gusto' }], steps: ['Marina camarones en limón 10 min.', 'Pica pepino, tomate y cilantro.', 'Mezcla todo y sirve frío.'] },
    { id: 'a14', name: 'Wrap Integral de Pavo', emoji: '🌯', color: '#d1fae5', mealType: 'Almuerzo', category: 'Proteína', calories: 370, protein: 35, carbs: 35, fat: 9, prepMin: 8, satietyScore: 9, tags: ['rápido', 'práctico'], ingredients: [{ name: 'Tortilla integral', amount: '1 grande' }, { name: 'Pavo en rebanadas', amount: '120g' }, { name: 'Lechuga y tomate', amount: 'al gusto' }, { name: 'Mostaza Dijon', amount: '1 cda' }], steps: ['Extiende tortilla.', 'Coloca pavo con verduras y mostaza.', 'Enrolla y sirve.'] },
    { id: 'a15', name: 'Salmón Teriyaki con Arroz', emoji: '🐠', color: '#fef3c7', mealType: 'Almuerzo', category: 'Mediterránea', calories: 480, protein: 42, carbs: 46, fat: 14, prepMin: 20, satietyScore: 10, tags: ['omega-3', 'saciante'], ingredients: [{ name: 'Filete de salmón', amount: '180g' }, { name: 'Arroz basmati', amount: '150g cocido' }, { name: 'Salsa teriyaki light', amount: '2 cdas' }, { name: 'Brócoli al vapor', amount: '100g' }], steps: ['Marina salmón en teriyaki 10 min.', 'Cocina en sartén 4 min por lado.', 'Sirve sobre arroz con brócoli.'] },

    // ── CENAS ─────────────────────────────────────────────────────────────────
    { id: 'c1', name: 'Filete de Tilapia al Limón', emoji: '🐡', color: '#e0f2fe', mealType: 'Cena', category: 'Bajo en calorías', calories: 280, protein: 38, carbs: 8, fat: 9, prepMin: 15, satietyScore: 9, tags: ['bajo en calorías', 'proteína limpia'], ingredients: [{ name: 'Filete de tilapia', amount: '200g' }, { name: 'Limón', amount: '2 pzas' }, { name: 'Ajo', amount: '2 dientes' }, { name: 'Perejil', amount: 'al gusto' }], steps: ['Marina en limón y ajo 10 min.', 'Cocina 4 min por lado.', 'Sirve con verduras.'] },
    { id: 'c2', name: 'Crema de Zanahoria y Jengibre', emoji: '🥕', color: '#fdba74', mealType: 'Cena', category: 'Vegano', calories: 220, protein: 6, carbs: 38, fat: 6, prepMin: 20, satietyScore: 8, tags: ['vegano', 'anti-inflamatorio'], ingredients: [{ name: 'Zanahorias', amount: '400g' }, { name: 'Jengibre', amount: '2 cm' }, { name: 'Caldo de verduras', amount: '400ml' }, { name: 'Leche de coco light', amount: '100ml' }], steps: ['Cuece zanahoria en caldo 15 min.', 'Licúa con jengibre.', 'Agrega leche de coco y calienta.'] },
    { id: 'c3', name: 'Ensalada de Garbanzo', emoji: '🥗', color: '#fef9c3', mealType: 'Cena', category: 'Vegano', calories: 290, protein: 14, carbs: 40, fat: 9, prepMin: 10, satietyScore: 8, tags: ['vegano', 'sin cocción'], ingredients: [{ name: 'Garbanzo cocido', amount: '180g' }, { name: 'Pepino', amount: '1 pza' }, { name: 'Tomate cherry', amount: '100g' }, { name: 'Aceite de oliva y limón', amount: 'al gusto' }], steps: ['Trocea pepino y tomate.', 'Mezcla con garbanzo.', 'Aliña con aceite y limón.'] },
    { id: 'c4', name: 'Salmón con Ensalada de Espinacas', emoji: '🐠', color: '#fecaca', mealType: 'Cena', category: 'Mediterránea', calories: 370, protein: 40, carbs: 10, fat: 20, prepMin: 20, satietyScore: 10, tags: ['omega-3', 'keto'], ingredients: [{ name: 'Salmón', amount: '180g' }, { name: 'Espinacas baby', amount: '100g' }, { name: 'Nueces', amount: '20g' }, { name: 'Aceite de oliva', amount: '1 cda' }], steps: ['Asa salmón 180°C 15 min.', 'Mezcla espinacas con nueces.', 'Sirve salmón sobre ensalada.'] },
    { id: 'c5', name: 'Tortilla de Claras con Hongos', emoji: '🍄', color: '#bbf7d0', mealType: 'Cena', category: 'Proteína', calories: 240, protein: 30, carbs: 6, fat: 10, prepMin: 10, satietyScore: 9, tags: ['keto', 'rápido'], ingredients: [{ name: 'Claras de huevo', amount: '6 pzas' }, { name: 'Hongos', amount: '100g' }, { name: 'Espinacas', amount: '50g' }, { name: 'Queso bajo en grasa', amount: '30g' }], steps: ['Saltea hongos y espinacas.', 'Vierte claras batidas.', 'Dobla y sirve con queso.'] },
    { id: 'c6', name: 'Pechuga Rellena de Pimientos', emoji: '🫑', color: '#c7d2fe', mealType: 'Cena', category: 'Proteína', calories: 340, protein: 44, carbs: 8, fat: 14, prepMin: 25, satietyScore: 10, tags: ['alto en proteína', 'horneado'], ingredients: [{ name: 'Pechuga de pollo', amount: '200g' }, { name: 'Pimiento rojo', amount: '½ pza' }, { name: 'Mozzarella light', amount: '40g' }, { name: 'Albahaca', amount: 'al gusto' }], steps: ['Abre pechuga y rellena.', 'Sella y hornea 20 min 190°C.', 'Sirve con albahaca.'] },
    { id: 'c7', name: 'Caldo Depurativo de Verduras', emoji: '🍵', color: '#ecfdf5', mealType: 'Cena', category: 'Bajo en calorías', calories: 150, protein: 5, carbs: 28, fat: 2, prepMin: 20, satietyScore: 7, tags: ['detox', 'muy bajo en calorías'], ingredients: [{ name: 'Apio', amount: '2 tallos' }, { name: 'Zanahoria', amount: '1 pza' }, { name: 'Cúrcuma y jengibre', amount: '1 cdta c/u' }, { name: 'Agua', amount: '1L' }], steps: ['Pon los vegetales en agua fría.', 'Cocina a fuego lento 20 min.', 'Cuela y sirve caliente.'] },
    { id: 'c8', name: 'Bacalao al Horno con Tomates', emoji: '🐟', color: '#dbeafe', mealType: 'Cena', category: 'Mediterránea', calories: 290, protein: 36, carbs: 12, fat: 10, prepMin: 20, satietyScore: 9, tags: ['mediterránea', 'bajo en grasa'], ingredients: [{ name: 'Filete de bacalao', amount: '200g' }, { name: 'Tomate cherry', amount: '150g' }, { name: 'Aceitunas', amount: '20g' }, { name: 'Aceite de oliva', amount: '1 cda' }, { name: 'Orégano', amount: '1 cdta' }], steps: ['Coloca bacalao en bandeja.', 'Agrega tomates, aceitunas y aceite.', 'Hornea 180°C 18 min.'] },
    { id: 'c9', name: 'Pollo al Limón con Espárragos', emoji: '🍗', color: '#d1fae5', mealType: 'Cena', category: 'Proteína', calories: 320, protein: 42, carbs: 10, fat: 12, prepMin: 20, satietyScore: 10, tags: ['alto en proteína', 'bajo en carbos'], ingredients: [{ name: 'Pechuga de pollo', amount: '180g' }, { name: 'Espárragos', amount: '150g' }, { name: 'Limón', amount: '1 pza' }, { name: 'Ajo', amount: '2 dientes' }], steps: ['Marina pollo en limón y ajo.', 'Cocina en sartén 6 min por lado.', 'Saltea espárragos 4 min y sirve.'] },
    { id: 'c10', name: 'Sopa de Lentejas Rojas', emoji: '🫘', color: '#fde68a', mealType: 'Cena', category: 'Vegano', calories: 310, protein: 20, carbs: 48, fat: 6, prepMin: 25, satietyScore: 9, tags: ['vegano', 'económico'], ingredients: [{ name: 'Lentejas rojas', amount: '150g' }, { name: 'Cebolla y ajo', amount: '1 pza c/u' }, { name: 'Cúrcuma y comino', amount: '1 cdta c/u' }, { name: 'Caldo de verduras', amount: '500ml' }], steps: ['Sofríe cebolla y ajo.', 'Agrega lentejas, especias y caldo.', 'Cuece 20 min y sirve.'] },
    { id: 'c11', name: 'Trucha a la Plancha', emoji: '🐟', color: '#cffafe', mealType: 'Cena', category: 'Bajo en calorías', calories: 260, protein: 34, carbs: 4, fat: 12, prepMin: 12, satietyScore: 9, tags: ['omega-3', 'rápido'], ingredients: [{ name: 'Filete de trucha', amount: '180g' }, { name: 'Romero y tomillo', amount: '1 cdta c/u' }, { name: 'Limón', amount: '1 pza' }, { name: 'Aceite de oliva', amount: '1 cdta' }], steps: ['Sazona la trucha con hierbas.', 'Cocina a la plancha 5 min por lado.', 'Sirve con limón.'] },
    { id: 'c12', name: 'Revuelto de Tofu con Espinacas', emoji: '🥬', color: '#dcfce7', mealType: 'Cena', category: 'Vegano', calories: 270, protein: 20, carbs: 14, fat: 14, prepMin: 12, satietyScore: 8, tags: ['vegano', 'keto vegano'], ingredients: [{ name: 'Tofu firme', amount: '200g' }, { name: 'Espinacas', amount: '100g' }, { name: 'Cúrcuma', amount: '½ cdta' }, { name: 'Salsa de soya', amount: '1 cda' }], steps: ['Desmenuza el tofu.', 'Saltea con espinacas y cúrcuma.', 'Agrega soya y sirve caliente.'] },
    { id: 'c13', name: 'Wrap de Lechuga con Pavo', emoji: '🥬', color: '#f0fdf4', mealType: 'Cena', category: 'Bajo en calorías', calories: 220, protein: 28, carbs: 10, fat: 7, prepMin: 8, satietyScore: 8, tags: ['sin gluten', 'rápido'], ingredients: [{ name: 'Hojas de lechuga grande', amount: '4 pzas' }, { name: 'Pavo en rebanadas', amount: '120g' }, { name: 'Zanahoria rallada', amount: '50g' }, { name: 'Hummus', amount: '2 cdas' }], steps: ['Extiende hummus sobre lechuga.', 'Coloca pavo y zanahoria.', 'Enrolla y sirve frío.'] },
    { id: 'c14', name: 'Gazpacho de Tomate', emoji: '🍅', color: '#fecaca', mealType: 'Cena', category: 'Vegano', calories: 140, protein: 4, carbs: 24, fat: 4, prepMin: 10, satietyScore: 7, tags: ['vegano', 'frío', 'sin cocción'], ingredients: [{ name: 'Tomates maduros', amount: '500g' }, { name: 'Pepino', amount: '½ pza' }, { name: 'Pimiento', amount: '½ pza' }, { name: 'Aceite de oliva', amount: '1 cda' }, { name: 'Vinagre', amount: '1 cdta' }], steps: ['Licúa todos los vegetales.', 'Agrega aceite y vinagre.', 'Refrigera y sirve frío.'] },
    { id: 'c15', name: 'Merluza al Vapor con Quinoa', emoji: '🐟', color: '#e0f2fe', mealType: 'Cena', category: 'Bajo en calorías', calories: 320, protein: 36, carbs: 28, fat: 8, prepMin: 18, satietyScore: 9, tags: ['bajo en grasa', 'nutritivo'], ingredients: [{ name: 'Filete de merluza', amount: '200g' }, { name: 'Quinoa cocida', amount: '100g' }, { name: 'Brócoli al vapor', amount: '120g' }, { name: 'Salsa de soya light', amount: '1 cda' }], steps: ['Cuece merluza al vapor 8 min.', 'Sirve sobre quinoa con brócoli.', 'Aliña con soya.'] },

    // ── SNACKS ────────────────────────────────────────────────────────────────
    { id: 's1', name: 'Manzana con Mantequilla de Almendra', emoji: '🍎', color: '#fde8e8', mealType: 'Snack', category: 'Bajo en calorías', calories: 160, protein: 4, carbs: 24, fat: 7, prepMin: 2, satietyScore: 7, tags: ['rápido', 'sin preparación'], ingredients: [{ name: 'Manzana', amount: '1 pza' }, { name: 'Mantequilla de almendra', amount: '1 cda' }], steps: ['Corta la manzana en gajos.', 'Acompaña con mantequilla de almendra.'] },
    { id: 's2', name: 'Hummus con Zanahorias', emoji: '🥕', color: '#ffedd5', mealType: 'Snack', category: 'Vegano', calories: 140, protein: 6, carbs: 18, fat: 5, prepMin: 3, satietyScore: 7, tags: ['vegano', 'fibra'], ingredients: [{ name: 'Hummus', amount: '50g' }, { name: 'Zanahorias', amount: '2 pzas' }], steps: ['Corta zanahorias en bastones.', 'Sirve con hummus.'] },
    { id: 's3', name: 'Yogur Griego con Nueces', emoji: '🥜', color: '#fef3c7', mealType: 'Snack', category: 'Proteína', calories: 170, protein: 14, carbs: 12, fat: 7, prepMin: 2, satietyScore: 7, tags: ['alto en proteína'], ingredients: [{ name: 'Yogur griego 0%', amount: '150g' }, { name: 'Nueces', amount: '15g' }, { name: 'Miel', amount: '½ cdta' }], steps: ['Sirve el yogur.', 'Agrega nueces y miel.'] },
    { id: 's4', name: 'Edamame con Sal de Mar', emoji: '🫘', color: '#d1fae5', mealType: 'Snack', category: 'Vegano', calories: 120, protein: 10, carbs: 10, fat: 4, prepMin: 5, satietyScore: 7, tags: ['vegano', 'proteína vegetal'], ingredients: [{ name: 'Edamame congelado', amount: '100g' }, { name: 'Sal de mar', amount: 'al gusto' }], steps: ['Cuece el edamame 4 min.', 'Escurre y agrega sal.'] },
    { id: 's5', name: 'Requesón con Piña', emoji: '🍍', color: '#fde68a', mealType: 'Snack', category: 'Proteína', calories: 130, protein: 12, carbs: 16, fat: 2, prepMin: 2, satietyScore: 7, tags: ['alto en proteína', 'sin cocción'], ingredients: [{ name: 'Requesón', amount: '100g' }, { name: 'Piña en cubos', amount: '80g' }], steps: ['Coloca requesón en tazón.', 'Agrega piña y sirve.'] },
    { id: 's6', name: 'Tostadas de Arroz con Aguacate', emoji: '🥑', color: '#d9f99d', mealType: 'Snack', category: 'Bajo en calorías', calories: 110, protein: 2, carbs: 14, fat: 6, prepMin: 3, satietyScore: 6, tags: ['sin gluten', 'rápido'], ingredients: [{ name: 'Tostadas de arroz', amount: '2 pzas' }, { name: 'Aguacate', amount: '¼ pza' }, { name: 'Sal y limón', amount: 'al gusto' }], steps: ['Aplasta aguacate con limón.', 'Unta sobre las tostadas.'] },
    { id: 's7', name: 'Almendras y Arándanos', emoji: '🫐', color: '#e9d5ff', mealType: 'Snack', category: 'Bajo en calorías', calories: 150, protein: 5, carbs: 14, fat: 9, prepMin: 1, satietyScore: 6, tags: ['sin preparación', 'antioxidante'], ingredients: [{ name: 'Almendras', amount: '20g' }, { name: 'Arándanos frescos', amount: '60g' }], steps: ['Mezcla almendras con arándanos y sirve.'] },
    { id: 's8', name: 'Palitos de Apio con Queso Crema', emoji: '🧀', color: '#f0fdf4', mealType: 'Snack', category: 'Bajo en calorías', calories: 90, protein: 5, carbs: 5, fat: 6, prepMin: 3, satietyScore: 6, tags: ['keto', 'bajo en carbos'], ingredients: [{ name: 'Apio', amount: '3 tallos' }, { name: 'Queso crema light', amount: '30g' }], steps: ['Corta el apio en palitos.', 'Rellena con queso crema.'] },
    { id: 's9', name: 'Barrita de Proteína Casera', emoji: '💪', color: '#fecdd3', mealType: 'Snack', category: 'Proteína', calories: 200, protein: 18, carbs: 20, fat: 5, prepMin: 10, satietyScore: 8, tags: ['alto en proteína', 'preparar con anticipación'], ingredients: [{ name: 'Proteína en polvo', amount: '30g' }, { name: 'Avena molida', amount: '40g' }, { name: 'Mantequilla de cacahuate', amount: '1 cda' }, { name: 'Miel', amount: '1 cda' }], steps: ['Mezcla todos los ingredientes.', 'Forma barritas y refrigera 1 hora.'] },
    { id: 's10', name: 'Bowl de Frutas con Chía', emoji: '🍓', color: '#fce7f3', mealType: 'Snack', category: 'Vegano', calories: 120, protein: 4, carbs: 24, fat: 3, prepMin: 3, satietyScore: 6, tags: ['vegano', 'antioxidante'], ingredients: [{ name: 'Fresa y kiwi', amount: '80g c/u' }, { name: 'Semillas de chía', amount: '1 cdta' }, { name: 'Limón', amount: 'al gusto' }], steps: ['Trocea las frutas.', 'Agrega chía y limón. Sirve.'] },
] as (Base & { id: string })[];

// ── Variaciones para llegar a 500+ ────────────────────────────────────────
const proteins = ['pollo', 'pavo', 'atún', 'salmón', 'camarón', 'res magra', 'cerdo lomo', 'tofu', 'tempeh', 'huevo'];
const vegs = ['brócoli', 'espinacas', 'zanahoria', 'pepino', 'pimiento', 'calabacín', 'berenjena', 'coliflor', 'ejotes', 'kale'];
const herbs = ['romero', 'tomillo', 'cilantro', 'albahaca', 'perejil', 'orégano', 'cúrcuma', 'comino', 'paprika', 'jengibre'];
const cookStyles = ['al vapor', 'a la plancha', 'al horno', 'salteado', 'en caldo', 'crudo', 'asado'];
const mealEmojis: Record<Meal, string[]> = {
    Desayuno: ['🥣', '🍳', '🫐', '🥤', '🥞', '🧇', '🥑'],
    Almuerzo: ['🍗', '🥗', '🍲', '🍚', '🌯', '🍝', '🥘'],
    Cena: ['🐟', '🥗', '🍵', '🫑', '🥦', '🍅', '🐠'],
    Snack: ['🍎', '🥜', '🍓', '🥕', '🫘', '🧀', '🥝'],
};
const colors = ['#d1fae5', '#fef3c7', '#dbeafe', '#fce7f3', '#fde68a', '#cffafe', '#e9d5ff', '#fed7aa', '#bbf7d0', '#fecdd3', '#d9f99d', '#f0fdf4'];
const cats: Cat[] = ['Proteína', 'Vegano', 'Bajo en calorías', 'Mediterránea', 'Rápido'];
const meals: Meal[] = ['Desayuno', 'Almuerzo', 'Cena', 'Snack'];

function rng(seed: number, max: number) { return Math.abs((seed * 1664525 + 1013904223) & 0xffffffff) % max; }

const generated: Recipe[] = [];
const target = 460; // we already have 55 base, total will be ~500+

for (let i = 0; i < target; i++) {
    const meal = meals[rng(i, meals.length)];
    const cat = cats[rng(i * 3, cats.length)];
    const prot = proteins[rng(i * 7, proteins.length)];
    const veg = vegs[rng(i * 11, vegs.length)];
    const herb = herbs[rng(i * 13, herbs.length)];
    const style = cookStyles[rng(i * 17, cookStyles.length)];
    const emojiList = mealEmojis[meal];
    const emoji = emojiList[rng(i * 5, emojiList.length)];
    const color = colors[rng(i * 19, colors.length)];

    const calMap: Record<Meal, number> = { Desayuno: 270, Almuerzo: 380, Cena: 300, Snack: 130 };
    const baseKcal = calMap[meal] + rng(i * 23, 120) - 40;
    const protG = Math.round(baseKcal * (0.25 + rng(i, 20) / 100) / 4);
    const carbG = Math.round(baseKcal * (0.40 + rng(i * 2, 20) / 100) / 4);
    const fatG = Math.round(baseKcal * (0.25 + rng(i * 3, 10) / 100) / 9);
    const prepM = meal === 'Snack' ? 2 + rng(i, 8) : 10 + rng(i, 25);

    const names: Record<Meal, string[]> = {
        Desayuno: [
            `Avena de ${prot} con ${herb}`, `Batido de ${veg} y ${prot}`, `Bowl de ${veg} con ${prot}`,
            `Tostadas con ${prot} ${style}`, `Tortilla de ${prot} con ${veg}`, `Smoothie de ${veg} proteico`,
        ],
        Almuerzo: [
            `${prot} ${style} con ${veg}`, `Ensalada de ${prot} y ${veg}`, `Bowl de ${prot} con ${veg} al ${herb}`,
            `Wrap de ${prot} con ${veg}`, `Sopa de ${prot} con ${herb}`, `${prot} con ${veg} y ${herb}`,
        ],
        Cena: [
            `${prot} ${style} con ${veg}`, `Crema de ${veg} con ${herb}`, `${prot} con ${veg} y ${herb}`,
            `Ensalada de ${prot} y ${veg}`, `Caldo de ${veg} con ${prot}`, `${prot} al ${herb}`,
        ],
        Snack: [
            `${veg} con ${prot}`, `Mini bowl de ${prot} y ${herb}`, `${prot} con ${veg} fresco`,
            `Bastones de ${veg} con ${prot}`, `Mix de ${veg} y ${prot}`,
        ],
    };

    const nameList = names[meal];
    const rawName = nameList[rng(i * 29, nameList.length)];
    // Capitalize
    const name = rawName.charAt(0).toUpperCase() + rawName.slice(1);

    generated.push({
        id: `g${i}`,
        name,
        emoji,
        color,
        mealType: meal,
        category: cat,
        calories: baseKcal,
        protein: protG,
        carbs: carbG,
        fat: fatG,
        prepMin: prepM,
        satietyScore: 6 + rng(i * 41, 4) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10,
        tags: [cat.toLowerCase(), style, herb],
        ingredients: [
            { name: prot.charAt(0).toUpperCase() + prot.slice(1), amount: meal === 'Snack' ? '80g' : meal === 'Desayuno' ? '30g' : '180g' },
            { name: veg.charAt(0).toUpperCase() + veg.slice(1), amount: meal === 'Snack' ? '50g' : '120g' },
            { name: herb.charAt(0).toUpperCase() + herb.slice(1), amount: '1 cdta' },
            { name: 'Aceite de oliva', amount: '1 cdta' },
            { name: 'Sal y pimienta', amount: 'al gusto' },
        ],
        steps: [
            `Prepara ${prot} ${style} con ${herb}.`,
            `Añade ${veg} y cocina ${prepM > 15 ? '10' : '5'} minutos.`,
            `Sazona al gusto y sirve caliente.`,
        ],
    });
}

export const recipes: Recipe[] = [
    ...BASE.map((b, i) => ({ ...b, id: b.id ?? `b${i}` }) as Recipe),
    ...generated,
];

const breakfasts = recipes.filter(r => r.mealType === 'Desayuno');
const lunches = recipes.filter(r => r.mealType === 'Almuerzo');
const dinners = recipes.filter(r => r.mealType === 'Cena');

export { breakfasts, lunches, dinners };
