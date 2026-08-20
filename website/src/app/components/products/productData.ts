export type Product = {
    slug: string;
    name: string;
    category: string;
    image: string;
    shortDescription: string;
    description: string;
    specifications: {
        label: string;
        value: string;
    }[];
};

const products: Product[] = [
    // =========================
    // TABLETS
    // =========================
    {
        slug: "tablet-1",
        name: "Paracetamol 500 mg Tablets",
        category: "Tablets",
        image: "/products/tablet1.jpg",
        shortDescription:
            "Widely used analgesic and antipyretic formulation designed for rapid and effective relief from pain and fever.",
        description:
            "Paracetamol 500 mg Tablets are formulated to provide fast-acting relief from mild to moderate pain, including headaches, muscle aches, toothaches, and backaches, as well as reducing fever. Manufactured under strict GMP guidelines to ensure high purity and consistent dissolution profiles.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Analgesic & Antipyretic" },
            { label: "Strength", value: "500 mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "tablet-2",
        name: "Azithromycin 500 mg Tablets",
        category: "Tablets",
        image: "/products/tablet2.jpg",
        shortDescription:
            "Broad-spectrum macrolide antibiotic formulation for the treatment of various bacterial infections.",
        description:
            "Azithromycin 500 mg Tablets are indicated for the treatment of mild to moderate infections caused by susceptible strains of microorganisms, including respiratory tract infections, skin infections, and sexually transmitted diseases. Developed to ensure optimal stability and therapeutic efficacy.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Antibiotic / Macrolide" },
            { label: "Strength", value: "500 mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "tablet-3",
        name: "Pantoprazole 40 mg Tablets",
        category: "Tablets",
        image: "/products/tablet3.jpg",
        shortDescription:
            "Proton pump inhibitor (PPI) formulation designed to reduce gastric acid production.",
        description:
            "Pantoprazole 40 mg Tablets are enteric-coated tablets designed for the treatment of gastroesophageal reflux disease (GERD), erosive esophagitis, and pathological hypersecretory conditions like Zollinger-Ellison syndrome. Engineered for precise release in the intestine to maximize therapeutic outcomes.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Gastrointestinal / PPI" },
            { label: "Strength", value: "40 mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "tablet-4",
        name: "Metformin 500 mg Tablets",
        category: "Tablets",
        image: "/products/tablet4.jpg",
        shortDescription:
            "First-line oral antihyperglycemic agent for the management of type 2 diabetes.",
        description:
            "Metformin 500 mg Tablets assist in improving glycemic control in adults with type 2 diabetes mellitus by decreasing hepatic glucose production, decreasing intestinal absorption of glucose, and improving insulin sensitivity. Manufactured with high-quality active pharmaceutical ingredients for consistent bioequivalence.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Antidiabetic" },
            { label: "Strength", value: "500 mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "tablet-5",
        name: "Levocetirizine 5 mg Tablets",
        category: "Tablets",
        image: "/products/tablet5.jpg",
        shortDescription:
            "Non-sedating third-generation antihistamine for the relief of allergic symptoms.",
        description:
            "Levocetirizine 5 mg Tablets provide fast and long-lasting relief from seasonal allergic rhinitis, perennial allergic rhinitis, and chronic urticaria. The formulation is optimized for rapid absorption and minimal drowsiness, offering patients consistent 24-hour symptom control.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Antihistamine" },
            { label: "Strength", value: "5 mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },

    // =========================
    // CAPSULES
    // =========================
    {
        slug: "capsule-1",
        name: "Amoxicillin 500 mg Capsules",
        category: "Capsules",
        image: "/products/capsule1.jpg",
        shortDescription:
            "Moderate-spectrum, bactericidal beta-lactam antibiotic formulation for bacterial infections.",
        description:
            "Amoxicillin 500 mg Capsules are widely prescribed for the treatment of infections of the ear, nose, throat, urinary tract, and skin caused by susceptible gram-positive and gram-negative bacteria. Encapsulated in high-quality shells to protect the active ingredient and ensure rapid release.",
        specifications: [
            { label: "Dosage Form", value: "Capsule" },
            { label: "Category", value: "Antibiotic / Penicillin" },
            { label: "Strength", value: "500 mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "capsule-2",
        name: "Omeprazole 20 mg Capsules",
        category: "Capsules",
        image: "/products/capsule2.jpg",
        shortDescription:
            "Proton pump inhibitor formulated in delayed-release capsules for acid control.",
        description:
            "Omeprazole 20 mg delayed-release capsules inhibit gastric acid secretion by blocking the proton pumps of parietal cells. It is widely utilized for treating gastric ulcers, duodenal ulcers, and gastroesophageal reflux disease, designed to pass through the stomach and release in the intestines.",
        specifications: [
            { label: "Dosage Form", value: "Capsule" },
            { label: "Category", value: "Gastrointestinal / PPI" },
            { label: "Strength", value: "20 mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "capsule-3",
        name: "Pantoprazole 40 mg Capsules",
        category: "Capsules",
        image: "/products/capsule3.jpg",
        shortDescription:
            "Gastric acid-suppressant formulation in a convenient capsule dosage form.",
        description:
            "Pantoprazole 40 mg Capsules offer another convenient administration route for the treatment of acid-reflux disorders, heartburn, and erosive esophagitis. Formulated with enteric-coated pellets within the capsule to ensure stable delivery and consistent efficacy.",
        specifications: [
            { label: "Dosage Form", value: "Capsule" },
            { label: "Category", value: "Gastrointestinal / PPI" },
            { label: "Strength", value: "40 mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "capsule-4",
        name: "Vitamin B-Complex Capsules",
        category: "Capsules",
        image: "/products/capsule4.jpg",
        shortDescription:
            "Comprehensive B-vitamin formulation supporting cellular metabolism and energy production.",
        description:
            "Vitamin B-Complex Capsules contain a synergistic blend of essential B vitamins (B1, B2, B3, B5, B6, B7, B9, and B12) crucial for maintaining nerve function, skin health, red blood cell production, and active metabolic pathways. Developed to ensure high bioavailability and nutritional support.",
        specifications: [
            { label: "Dosage Form", value: "Capsule" },
            { label: "Category", value: "Nutritional Supplement" },
            { label: "Strength", value: "Standard B-Complex Blend" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "capsule-5",
        name: "Multivitamin Capsules",
        category: "Capsules",
        image: "/products/capsule5.jpg",
        shortDescription:
            "Daily multi-nutrient supplement to support general health and immune vitality.",
        description:
            "Multivitamin Capsules are formulated with a balanced spectrum of essential vitamins and minerals to fill nutritional gaps, promote robust immune health, enhance daily energy, and support overall physiological well-being. Manufactured to strict purity and potency standards.",
        specifications: [
            { label: "Dosage Form", value: "Capsule" },
            { label: "Category", value: "Nutritional Supplement" },
            { label: "Strength", value: "Multivitamins & Minerals" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },

    // =========================
    // SYRUPS
    // =========================
    {
        slug: "syrup-1",
        name: "Cough Relief Syrup",
        category: "Syrups",
        image: "/products/syrup1.jpg",
        shortDescription:
            "Soothing liquid formulation to relieve chest congestion and cough symptoms.",
        description:
            "Cough Relief Syrup is formulated with active expectorants and mucolytics designed to loosen mucus, clear bronchial passages, and quiet throat irritation. It provides fast-acting and long-lasting relief from wet and productive coughs.",
        specifications: [
            { label: "Dosage Form", value: "Syrup" },
            { label: "Category", value: "Respiratory / Cough Relief" },
            { label: "Volume", value: "100 mL / 200 mL" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "syrup-2",
        name: "Multivitamin Syrup",
        category: "Syrups",
        image: "/products/syrup2.jpg",
        shortDescription:
            "Nutritious and palatable liquid multivitamin supplement for all age groups.",
        description:
            "Multivitamin Syrup provides an easily absorbable liquid source of essential vitamins and micronutrients designed to support growth, immunity, and overall vitality in children and adults who prefer liquid dosage forms over pills.",
        specifications: [
            { label: "Dosage Form", value: "Syrup" },
            { label: "Category", value: "Nutritional Supplement" },
            { label: "Volume", value: "200 mL" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "syrup-3",
        name: "Antacid Suspension",
        category: "Syrups",
        image: "/products/syrup3.jpg",
        shortDescription:
            "Fast-acting liquid suspension to neutralize stomach acid and relieve heartburn.",
        description:
            "Antacid Suspension is a balanced liquid formulation containing acid-neutralizing agents that provide instant relief from acidity, heartburn, gas, and indigestion. It coats the stomach lining to provide a protective, soothing barrier.",
        specifications: [
            { label: "Dosage Form", value: "Suspension" },
            { label: "Category", value: "Gastrointestinal / Antacid" },
            { label: "Volume", value: "170 mL / 200 mL" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "syrup-4",
        name: "Dry Cough Syrup",
        category: "Syrups",
        image: "/products/syrup4.jpg",
        shortDescription:
            "Antitussive formulation targeted specifically to suppress dry, hacking, tickly coughs.",
        description:
            "Dry Cough Syrup contains central cough suppressants that act directly to quiet the cough reflex, combined with demulcents to soothe irritated throat linings caused by persistent dry coughing.",
        specifications: [
            { label: "Dosage Form", value: "Syrup" },
            { label: "Category", value: "Respiratory / Antitussive" },
            { label: "Volume", value: "100 mL" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "syrup-5",
        name: "Digestive Syrup",
        category: "Syrups",
        image: "/products/syrup5.jpg",
        shortDescription:
            "Enzyme-rich liquid formulation designed to promote healthy digestion.",
        description:
            "Digestive Syrup combines natural carminatives and digestive enzymes to assist in breaking down food components, relieving bloating, flatulence, abdominal discomfort, and supporting overall appetite and nutrient absorption.",
        specifications: [
            { label: "Dosage Form", value: "Syrup" },
            { label: "Category", value: "Gastrointestinal / Digestive Enzyme" },
            { label: "Volume", value: "200 mL" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },

    // =========================
    // INJECTABLES
    // =========================
    {
        slug: "injectable-1",
        name: "Ceftriaxone 1 g Injection",
        category: "Injectables",
        image: "/products/injection1.jpg",
        shortDescription:
            "Third-generation cephalosporin antibiotic injection for severe bacterial infections.",
        description:
            "Ceftriaxone 1 g Injection is a sterile, broad-spectrum antibiotic administered intravenously or intramuscularly. It is highly effective against serious infections including sepsis, meningitis, abdominal infections, and bone/joint infections. Manufactured under ultra-sterile cleanroom conditions.",
        specifications: [
            { label: "Dosage Form", value: "Injectable (Powder for Reconstitution)" },
            { label: "Category", value: "Antibiotic / Cephalosporin" },
            { label: "Strength", value: "1 g" },
            { label: "Quality Standards", value: "Sterile-Grade GMP Production" },
        ],
    },
    {
        slug: "injectable-2",
        name: "Vitamin B12 Injection",
        category: "Injectables",
        image: "/products/injection2.jpg",
        shortDescription:
            "High-potency Cyanocobalamin injection for severe B12 deficiency and anemia.",
        description:
            "Vitamin B12 Injection is a sterile solution of Cyanocobalamin designed to treat and prevent vitamin B12 deficiency anemia, neuropathies, and cognitive symptoms. It bypasses intestinal absorption limitations, ensuring immediate systemic availability.",
        specifications: [
            { label: "Dosage Form", value: "Injectable (Solution)" },
            { label: "Category", value: "Vitamin / Hematinic" },
            { label: "Strength", value: "1000 mcg/mL" },
            { label: "Quality Standards", value: "Sterile-Grade GMP Production" },
        ],
    },
    {
        slug: "injectable-3",
        name: "Diclofenac Injection",
        category: "Injectables",
        image: "/products/injection3.jpg",
        shortDescription:
            "Potent NSAID injection for acute severe pain and inflammatory conditions.",
        description:
            "Diclofenac Injection is a sterile solution designed for the rapid management of acute renal colic, severe migraine, post-operative pain, and rheumatoid flare-ups. Formulated to minimize injection-site discomfort and provide rapid onset of action.",
        specifications: [
            { label: "Dosage Form", value: "Injectable (Solution)" },
            { label: "Category", value: "Analgesic / NSAID" },
            { label: "Strength", value: "75 mg/3 mL" },
            { label: "Quality Standards", value: "Sterile-Grade GMP Production" },
        ],
    },
    {
        slug: "injectable-4",
        name: "Ondansetron Injection",
        category: "Injectables",
        image: "/products/injection4.jpg",
        shortDescription:
            "Serotonin 5-HT3 receptor antagonist injection to prevent nausea and vomiting.",
        description:
            "Ondansetron Injection is a sterile, antiemetic solution indicated for preventing nausea and vomiting associated with cancer chemotherapy, radiation therapy, and post-operative recovery. Developed for rapid systemic absorption and highly precise dosing.",
        specifications: [
            { label: "Dosage Form", value: "Injectable (Solution)" },
            { label: "Category", value: "Antiemetic" },
            { label: "Strength", value: "2 mg/mL (4 mg/2 mL)" },
            { label: "Quality Standards", value: "Sterile-Grade GMP Production" },
        ],
    },
    {
        slug: "injectable-5",
        name: "Amikacin 500 mg Injection",
        category: "Injectables",
        image: "/products/injection5.jpg",
        shortDescription:
            "Aminoglycoside antibiotic injection for multi-drug resistant gram-negative infections.",
        description:
            "Amikacin 500 mg Injection is a sterile solution utilized to treat severe, hospital-acquired bacterial infections, including septicemia, respiratory tract infections, and complicated urinary tract infections. Manufactured under precise sterilization protocols.",
        specifications: [
            { label: "Dosage Form", value: "Injectable (Solution)" },
            { label: "Category", value: "Antibiotic / Aminoglycoside" },
            { label: "Strength", value: "500 mg/2 mL" },
            { label: "Quality Standards", value: "Sterile-Grade GMP Production" },
        ],
    },

    // =========================
    // OINTMENTS & CREAMS
    // =========================
    {
        slug: "ointment-cream-1",
        name: "Antiseptic Cream",
        category: "Ointments & Creams",
        image: "/products/oc1.jpg",
        shortDescription:
            "Soothing topical antiseptic formulation to prevent infection in minor wounds.",
        description:
            "Antiseptic Cream is formulated to protect minor cuts, scrapes, burns, and abrasions from bacterial infection while promoting natural healing. The non-greasy cream base provides a soothing barrier to irritated skin.",
        specifications: [
            { label: "Dosage Form", value: "Cream" },
            { label: "Category", value: "Topical Antiseptic" },
            { label: "Packaging", value: "Tube" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "ointment-cream-2",
        name: "Skin Repair Cream",
        category: "Ointments & Creams",
        image: "/products/oc2.jpg",
        shortDescription:
            "Intensive moisturizing and barrier-restoring cream for damaged skin.",
        description:
            "Skin Repair Cream is enriched with skin-identical lipids, ceramides, and soothing agents designed to restore the protective skin barrier, relieve dryness, and accelerate recovery from irritation and environmental stress.",
        specifications: [
            { label: "Dosage Form", value: "Cream" },
            { label: "Category", value: "Dermatological Care" },
            { label: "Packaging", value: "Tube" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "ointment-cream-3",
        name: "Pain Relief Gel",
        category: "Ointments & Creams",
        image: "/products/oc3.jpg",
        shortDescription:
            "Fast-acting topical analgesic gel for muscle aches, joint pain, and sprains.",
        description:
            "Pain Relief Gel contains active anti-inflammatory and counterirritant agents that penetrate deep into muscles and joints to reduce localized inflammation, ease stiffness, and provide immediate cooling pain relief.",
        specifications: [
            { label: "Dosage Form", value: "Gel" },
            { label: "Category", value: "Topical Analgesic" },
            { label: "Packaging", value: "Tube" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "ointment-cream-4",
        name: "Moisturizing Cream",
        category: "Ointments & Creams",
        image: "/products/oc4.jpg",
        shortDescription:
            "Gentle daily hydrating cream for dry and sensitive skin types.",
        description:
            "Moisturizing Cream provides long-lasting hydration by trapping moisture in the skin. Formulated without harsh chemicals or heavy fragrances, it is ideal for keeping sensitive skin soft, smooth, and healthy every day.",
        specifications: [
            { label: "Dosage Form", value: "Cream" },
            { label: "Category", value: "Dermatological Care" },
            { label: "Packaging", value: "Tube" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "ointment-cream-5",
        name: "Antifungal Cream",
        category: "Ointments & Creams",
        image: "/products/oc5.jpg",
        shortDescription:
            "Broad-spectrum topical antifungal cream to treat skin infections.",
        description:
            "Antifungal Cream is formulated to eradicate common fungal infections, including athlete's foot, jock itch, and ringworm. It quickly relieves itching, burning, scaling, and cracking of the skin while targeting the fungal source.",
        specifications: [
            { label: "Dosage Form", value: "Cream" },
            { label: "Category", value: "Topical Antifungal" },
            { label: "Packaging", value: "Tube" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },

    // =========================
    // NUTRACEUTICALS
    // =========================
    {
        slug: "nutraceutical-1",
        name: "Multivitamin Tablets",
        category: "Nutraceuticals",
        image: "/products/Nutraceuticals1.jpg",
        shortDescription:
            "Daily nutritional support tablet packed with essential vitamins and trace minerals.",
        description:
            "Multivitamin Tablets provide a scientifically balanced blend of vitamins and minerals to optimize cellular energy, strengthen immune defenses, support cardiovascular health, and promote overall wellness in adults.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Nutraceutical" },
            { label: "Strength", value: "Complete Daily Formula" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "nutraceutical-2",
        name: "Calcium + Vitamin D3",
        category: "Nutraceuticals",
        image: "/products/Nutraceuticals2.jpg",
        shortDescription:
            "Essential mineral and vitamin combination supporting strong bones and teeth.",
        description:
            "Calcium + Vitamin D3 tablets are formulated to optimize bone density, support healthy muscle function, and enhance calcium absorption in the body, helping to prevent osteoporosis and maintain bone structural integrity.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Nutraceutical" },
            { label: "Strength", value: "Calcium Carbonate + Vit D3" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "nutraceutical-3",
        name: "Omega-3 Softgels",
        category: "Nutraceuticals",
        image: "/products/Nutraceuticals3.jpg",
        shortDescription:
            "Premium fish oil softgels rich in EPA and DHA for heart, joint, and brain health.",
        description:
            "Omega-3 Softgels contain molecularly distilled, high-purity fish oil providing high levels of essential fatty acids (EPA and DHA). They help maintain healthy cholesterol levels, reduce joint inflammation, and support cognitive function.",
        specifications: [
            { label: "Dosage Form", value: "Softgel" },
            { label: "Category", value: "Nutraceutical" },
            { label: "Strength", value: "1000 mg (EPA/DHA Rich)" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "nutraceutical-4",
        name: "Iron + Folic Acid",
        category: "Nutraceuticals",
        image: "/products/Nutraceuticals4.jpg",
        shortDescription:
            "Vital blood-building formulation for prevention of iron deficiency anemia.",
        description:
            "Iron + Folic Acid tablets combine highly bioavailable iron with folic acid to support healthy red blood cell production, combat fatigue, and satisfy increased nutritional requirements during pregnancy or iron-deficient states.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Nutraceutical" },
            { label: "Strength", value: "Iron + Folic Acid" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
    {
        slug: "nutraceutical-5",
        name: "Vitamin C + Zinc",
        category: "Nutraceuticals",
        image: "/products/Nutraceuticals5.jpg",
        shortDescription:
            "Dual-action antioxidant combination for strong immune defense.",
        description:
            "Vitamin C + Zinc tablets provide powerful daily antioxidant protection. Together, they stimulate immune cells, support wound healing, maintain healthy skin, and assist in neutralizing free radicals within the body.",
        specifications: [
            { label: "Dosage Form", value: "Tablet" },
            { label: "Category", value: "Nutraceutical" },
            { label: "Strength", value: "Vitamin C 500mg + Zinc 15mg" },
            { label: "Quality Standards", value: "GMP Certified Production" },
        ],
    },
];

export default products;