"""
gov_knowledge.py — Detailed knowledge base for the 6 selected government services.

Used as fallback when Claude API is unavailable.
Keywords are pipe-separated. First match wins.
"""

KNOWLEDGE_BASE: dict[str, str] = {

    # ══════════════════════════════════════════
    #  1. SCHOLARSHIPS & EDUCATION
    # ══════════════════════════════════════════

    "nsp|national scholarship|scholarship portal|pre matric|post matric|scholarships.gov.in": (
        "📚 National Scholarship Portal (NSP): https://scholarships.gov.in\n\n"
        "Steps to apply:\n"
        "1. Register with Aadhaar-linked mobile number\n"
        "2. Login → select your scholarship scheme\n"
        "3. Fill academic details, family income, bank account\n"
        "4. Upload: Marksheet, income certificate, Aadhaar, bank passbook copy, photo\n"
        "5. Submit before the deadline (usually Sept–Oct each year)\n\n"
        "Top schemes: Pre-Matric (Class 9–10), Post-Matric, PM Scholarship, Pragati (girls in tech)\n"
        "Helpline: 0120-6619540 | Email: helpdesk@nsp.gov.in"
    ),

    "scholarship|scholarships|student scholarship|apply scholarship|education scholarship": (
        "📚 To apply for a government scholarship, visit https://scholarships.gov.in (NSP).\n\n"
        "Required documents:\n"
        "• Aadhaar card\n"
        "• Previous year marksheet\n"
        "• Family income certificate (below ₹2.5 lakh/year for most schemes)\n"
        "• Bank account passbook (in student's name)\n"
        "• Caste/community certificate (if applicable)\n"
        "• Admission proof from institution\n\n"
        "The scholarship amount is credited directly to the student's bank account via DBT.\n"
        "Helpline: 0120-6619540"
    ),

    "pragati|saksham|pm scholarship|pmss|pm scholarship scheme": (
        "📚 PM Scholarship Scheme (PMSS):\n\n"
        "• For children of ex-servicemen / para-military personnel\n"
        "• Amount: ₹2,500/month (girls) | ₹2,000/month (boys)\n"
        "• For professional degree courses (1st year onwards)\n\n"
        "Apply at: https://scholarships.gov.in → 'Central Schemes' → PM Scholarship\n"
        "Documents: ESM certificate, Aadhaar, marksheet, admission letter, bank details\n"
        "Helpline: 0120-6619540"
    ),

    # ══════════════════════════════════════════
    #  2. PENSIONS & SENIOR CITIZEN
    # ══════════════════════════════════════════

    "ignoaps|old age pension|vridha pension|senior citizen pension|old age|वृद्धा": (
        "🧓 Indira Gandhi National Old Age Pension Scheme (IGNOAPS):\n\n"
        "Eligibility:\n"
        "• Age 60+ years\n"
        "• BPL (Below Poverty Line) household\n\n"
        "Pension amount:\n"
        "• ₹200/month (age 60–79) from Centre + state top-up\n"
        "• ₹500/month (age 80+) from Centre + state top-up\n\n"
        "How to apply:\n"
        "1. Visit your Gram Panchayat / Urban Local Body office\n"
        "2. Carry Aadhaar, age proof, BPL card, bank passbook, photo\n"
        "3. Application forwarded to District Social Welfare Officer\n"
        "4. Pension credited monthly to bank account\n\n"
        "Check status: https://nsap.nic.in | Helpline: 1800-111-555"
    ),

    "widow pension|ignwps|vidhwa pension|widow|विधवा": (
        "🧓 Indira Gandhi National Widow Pension Scheme (IGNWPS):\n\n"
        "Eligibility:\n"
        "• Widow aged 40–79 years\n"
        "• BPL household\n\n"
        "Pension: ₹300/month (Centre) + state government top-up\n\n"
        "Application:\n"
        "1. Visit Gram Panchayat / Ward Office\n"
        "2. Documents: Aadhaar, husband's death certificate, age proof, BPL card, bank passbook\n"
        "3. Application processed by District Social Welfare Officer\n\n"
        "Portal: https://nsap.nic.in | Helpline: 1800-111-555"
    ),

    "disability pension|igndps|viklang pension|divyang pension|disabled|विकलांग": (
        "🧓 Indira Gandhi National Disability Pension Scheme (IGNDPS):\n\n"
        "Eligibility:\n"
        "• Age 18–79 years\n"
        "• 80% or more disability\n"
        "• BPL household\n\n"
        "Pension: ₹300/month (Centre) + state top-up\n\n"
        "Apply at Gram Panchayat / Municipal office with:\n"
        "• Aadhaar, disability certificate (from CMO/Civil Surgeon), BPL card, bank passbook\n\n"
        "Portal: https://nsap.nic.in | Helpline: 1800-111-555"
    ),

    "pension|pension status|check pension|nsap|state pension|पेंशन": (
        "🧓 Government Pension Schemes (NSAP):\n\n"
        "Schemes available:\n"
        "• IGNOAPS — Old Age (60+)\n"
        "• IGNWPS — Widow (40+)\n"
        "• IGNDPS — Disability (80%+)\n"
        "• NFBS — Family Benefit (death of breadwinner)\n\n"
        "Apply through your Gram Panchayat / CSC / Block office.\n"
        "Carry: Aadhaar, age/eligibility proof, BPL card, bank passbook, photo.\n\n"
        "Check pension status: https://nsap.nic.in\n"
        "Helpline: 1800-111-555 (toll-free)"
    ),

    # ══════════════════════════════════════════
    #  3. RATION CARD & PDS
    # ══════════════════════════════════════════

    "ration card apply|new ration card|apply ration|ration card application|राशन कार्ड": (
        "🪪 New Ration Card Application:\n\n"
        "Step-by-step:\n"
        "1. Visit your state Food & Civil Supplies Department portal or nearest CSC\n"
        "2. Fill Application Form RC-1 (New Ration Card)\n"
        "3. Upload documents:\n"
        "   • Aadhaar of all family members\n"
        "   • Address proof (electricity bill / rent agreement)\n"
        "   • Income proof\n"
        "   • Family photograph\n"
        "4. Submit to Block / Taluka Supply Officer\n"
        "5. Field verification done within 30 days\n"
        "6. Card issued digitally (downloadable)\n\n"
        "Card types: AAY (poorest), PHH (Priority Household)\n"
        "Food Security Helpline: 1967 | Portal: https://epds.nic.in"
    ),

    "onorc|one nation one ration|ration anywhere|portability|ration card transfer": (
        "🪪 One Nation One Ration Card (ONORC):\n\n"
        "You can use your existing ration card at ANY Fair Price Shop (FPS) across India!\n\n"
        "How it works:\n"
        "• No new card needed — your existing card is portable\n"
        "• Authenticate via Aadhaar biometric at any FPS\n"
        "• Entitled grain is deducted from your quota\n\n"
        "To check your entitlement from a new state:\n"
        "Visit nearest Fair Price Shop, give Aadhaar number, do biometric auth.\n\n"
        "Track: https://nfsa.gov.in/portal/onorc_circular\n"
        "Helpline: 1967 (Food Security)"
    ),

    "ration|ration card|pds|ration shop|fair price shop|aay|phh|food grain|राशन": (
        "🪪 Ration Card & PDS Services:\n\n"
        "I can help you with:\n"
        "✅ New ration card application\n"
        "✅ Adding/removing family members\n"
        "✅ Address update / correction\n"
        "✅ One Nation One Ration Card (ONORC) portability\n"
        "✅ Checking entitlement & transaction history\n\n"
        "State portals vary — visit https://epds.nic.in for national link.\n"
        "Food Security Helpline: 1967 (toll-free)"
    ),

    # ══════════════════════════════════════════
    #  4. LAND RECORDS & PROPERTY
    # ══════════════════════════════════════════

    "khatauni|khasra|record of rights|ror|bhulekh|jamabandi|fard|patta|bhumi record": (
        "🏠 Land Records (Khatauni/ROR) — How to Get Online:\n\n"
        "State-wise portals:\n"
        "• UP:          https://upbhulekh.gov.in\n"
        "• Karnataka:   https://landrecords.karnataka.gov.in\n"
        "• Maharashtra: https://bhulekh.mahabhumi.gov.in\n"
        "• Rajasthan:   https://apnakhata.raj.nic.in\n"
        "• MP:          https://mpbhulekh.gov.in\n"
        "• Bihar:       https://biharbhumi.bihar.gov.in\n"
        "• Haryana:     https://jamabandi.nic.in\n"
        "• Punjab:      https://jamabandi.punjab.gov.in\n\n"
        "Steps: Select district → Tehsil → Village → Khata/Khasra number → View/Download ROR\n"
        "National portal: https://dilrmp.gov.in"
    ),

    "mutation|dakhil kharij|naam transfer|property transfer|land transfer|नामांतरण": (
        "🏠 Land Mutation (Dakhil Kharij / Naam Transfer):\n\n"
        "Required after purchase, inheritance, or gift of land.\n\n"
        "How to apply:\n"
        "1. Visit Tehsildar / Sub-Registrar office OR apply online at your state Bhulekh portal\n"
        "2. Documents needed:\n"
        "   • Sale deed / Will / Gift deed (registered)\n"
        "   • Previous ROR (Khatoni)\n"
        "   • Aadhaar of new owner\n"
        "   • Court order (if applicable)\n"
        "3. Pay mutation fee (₹50–₹500 depending on state)\n"
        "4. Physical verification by Patwari\n"
        "5. Mutation order issued in 30–90 days\n\n"
        "Check status at your state revenue portal."
    ),

    "bhu naksha|map|land map|plot map|cadastral map|भू नक्शा": (
        "🏠 Bhu-Naksha (Land/Plot Map) — Download Online:\n\n"
        "State portals:\n"
        "• UP:     https://bhunaksha.up.gov.in\n"
        "• MP:     https://bhunaksha.mp.gov.in\n"
        "• Bihar:  https://bhunaksha.bihar.gov.in\n"
        "• Odisha: https://bhunaksha.nic.in\n\n"
        "Steps:\n"
        "1. Open your state Bhu-Naksha portal\n"
        "2. Select State → District → Tehsil → RI Halka → Village\n"
        "3. Click on your plot number on the map\n"
        "4. View plot details and download PDF map\n\n"
        "For other states: https://dilrmp.gov.in (national DILRMP portal)"
    ),

    "land|land record|property|khata|registry|जमीन|भूमि": (
        "🏠 Land Records & Property Services:\n\n"
        "I can help you with:\n"
        "✅ Downloading Khasra/Khatauni (ROR)\n"
        "✅ Land mutation (name transfer)\n"
        "✅ Bhu-Naksha (plot map) download\n"
        "✅ Land registration information\n"
        "✅ Encumbrance certificate\n\n"
        "All records are available online at your state revenue portal.\n"
        "Please tell me your state and I'll give you the exact portal link!"
    ),

    # ══════════════════════════════════════════
    #  5. EMPLOYMENT SCHEMES
    # ══════════════════════════════════════════

    "mgnrega|nrega|job card|mnrega|100 days work|manrega|rozgar guarantee|मनरेगा": (
        "💼 MGNREGA — Job Card Application:\n\n"
        "Guarantees 100 days of paid work per year to rural households.\n"
        "Current wage: ₹220–₹357/day (varies by state)\n\n"
        "How to get a Job Card:\n"
        "1. Submit written application at your Gram Panchayat office\n"
        "2. Documents: Aadhaar, address proof, bank account details, passport photo\n"
        "3. Job card issued within 15 days (free of charge)\n"
        "4. Demand work at Gram Panchayat → work provided within 15 days\n"
        "5. Wages paid directly to bank/post office account within 15 days of work\n\n"
        "Track work, wages & attendance: https://nrega.nic.in\n"
        "Ombudsperson / Complaints: 1800-111-555"
    ),

    "pm kisan|pmkisan|pm-kisan|farmer scheme|kisan samman|किसान": (
        "💼 PM-KISAN — Farmer Income Support:\n\n"
        "₹6,000 per year credited in 3 instalments of ₹2,000 every 4 months.\n\n"
        "Eligibility: Small & marginal farmers with cultivable land in their name.\n\n"
        "Registration steps:\n"
        "1. Visit https://pmkisan.gov.in → 'New Farmer Registration'\n"
        "2. Enter Aadhaar number → verify with OTP\n"
        "3. Fill land details (Khasra/Khatauni number), bank account\n"
        "4. Submit — instalment credited automatically\n\n"
        "Also register via nearest CSC (Common Service Centre).\n"
        "Check payment status: https://pmkisan.gov.in/beneficiarystatus.aspx\n"
        "Helpline: 011-24300606"
    ),

    "employment|scheme|skill|skill india|pmegp|svnidhi|startup|self employment|रोजगार": (
        "💼 Employment & Self-Employment Schemes:\n\n"
        "Key schemes I can guide you on:\n"
        "• MGNREGA — 100 days guaranteed rural work (nrega.nic.in)\n"
        "• PM-KISAN — ₹6,000/year for farmers (pmkisan.gov.in)\n"
        "• PMEGP — Loans up to ₹50L for business (kviconline.gov.in)\n"
        "• Skill India / PMKVY — Free skill training (skillindiadigital.gov.in)\n"
        "• PM SVANidhi — ₹10,000–₹50,000 loans for street vendors\n"
        "• PMAY — Housing assistance (pmaymis.gov.in)\n\n"
        "Which scheme would you like details for?"
    ),

    # ══════════════════════════════════════════
    #  6. BIRTH / DEATH CERTIFICATES
    # ══════════════════════════════════════════

    "birth certificate|janam praman|janam certificate|born|new born|child birth|जन्म प्रमाण": (
        "📄 Birth Certificate — How to Get:\n\n"
        "Must be registered within 21 days of birth (free).\n\n"
        "Hospital birth: Certificate issued automatically. Collect from hospital records room.\n\n"
        "Home birth or delayed registration:\n"
        "1. Visit Municipal Corporation / Gram Panchayat / CSC\n"
        "2. Fill Form 1 (Birth Registration)\n"
        "3. Documents needed:\n"
        "   • Hospital discharge slip OR affidavit (for home birth)\n"
        "   • Parents' Aadhaar and address proof\n"
        "   • If delayed (>1 year): Notarised affidavit + magistrate order\n"
        "4. Certificate issued within 7 days\n\n"
        "Online registration: https://crsorgi.gov.in\n"
        "Download via DigiLocker: https://digilocker.gov.in\n"
        "Helpline: 011-23488003"
    ),

    "death certificate|mrityu praman|death|died|mrityu patra|मृत्यु प्रमाण": (
        "📄 Death Certificate — How to Get:\n\n"
        "Must be registered within 21 days (free). Delayed registration has a fee.\n\n"
        "For hospital deaths: Certificate issued by hospital. Collect from hospital admin.\n\n"
        "For home / other deaths:\n"
        "1. Visit Gram Panchayat / Municipal Corporation / CSC\n"
        "2. Fill Form 2 (Death Registration)\n"
        "3. Documents needed:\n"
        "   • Medical cause of death certificate (from doctor/hospital)\n"
        "   • Informant's Aadhaar and address proof\n"
        "   • Deceased's full details (name, age, address)\n"
        "4. Certificate issued within 7 days\n\n"
        "Online portal: https://crsorgi.gov.in\n"
        "Download via DigiLocker: https://digilocker.gov.in"
    ),

    "crs|civil registration|crsorgi|certificate download|digilocker certificate": (
        "📄 Civil Registration System (CRS) — Online Certificates:\n\n"
        "The CRS portal allows online registration and download of birth/death certificates.\n\n"
        "Portal: https://crsorgi.gov.in\n\n"
        "Steps to download existing certificate:\n"
        "1. Visit portal → Select state → 'Download Certificate'\n"
        "2. Enter registration number OR search by name + DOB\n"
        "3. Pay nominal fee (₹10–₹50) for digitally signed copy\n"
        "4. Download PDF — legally valid!\n\n"
        "Also available in DigiLocker: https://digilocker.gov.in\n"
        "(Search 'Birth Certificate' or 'Death Certificate' in issued documents)"
    ),
}

# Shown when no keyword matches and Claude API is unavailable
FALLBACK_RESPONSE = (
    "Namaste Ji! 🙏 I am Officer Rajiv Sharma, specialising in:\n\n"
    "📚 Scholarships & Education\n"
    "🧓 Pensions & Senior Citizen Schemes\n"
    "🪪 Ration Card & PDS\n"
    "🏠 Land Records & Property\n"
    "💼 Employment Schemes (MGNREGA, PM-KISAN)\n"
    "📄 Birth & Death Certificates\n\n"
    "Please describe your query and I will guide you with accurate information. "
    "You can also call the National Helpline: 1800-111-555 (toll-free)."
)