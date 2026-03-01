> Template - copy to create a centralized business info file. Keep it static first; wire into code later.

# Business Basic Info Template

Use this template to centralize core business data in one file (name, titles, tagline, contact, address, links, and social channels).

Recommended final file location per project:

- `docs/business-specs/basic-business-info.json`

---

## Suggested JSON Structure (Complete)

```json
{
  "business_type": "personal_brand",
  "brand_name": "Brand Name",
  "person_name": "Person Name",
  "main_title_home": "Main home headline",
  "tagline": "Main positioning line",
  "occupation_or_area": "Role or field",
  "languages": ["pt-BR", "en-US"],
  "primary_locale": "pt-BR",
  "contacts": {
    "primary_channel": "whatsapp",
    "phone_e164": "+5534998989263",
    "phone_display": "+55 (00) 00000-0000",
    "whatsapp_link": "https://wa.me/5534998989263?text=Hello",
    "email": "contato@brand.com"
  },
  "location": {
    "address_label": "City - State",
    "address_full": "Street, Number - District, City - State, ZIP, Country",
    "city": "City",
    "state": "State",
    "country": "Country",
    "zip_code": "00000-000",
    "maps_link": "https://www.google.com/maps/search/?api=1&query=..."
  },
  "social_profiles": {
    "instagram": {
      "handle": "@brand",
      "url": "https://www.instagram.com/brand/"
    },
    "tiktok": {
      "handle": "@brand",
      "url": "https://www.tiktok.com/@brand"
    },
    "youtube": {
      "handle": "@brand",
      "url": "https://www.youtube.com/@brand"
    },
    "linkedin": {
      "handle": "brand-page",
      "url": "https://www.linkedin.com/company/brand-page/"
    }
  },
  "site": {
    "site_name": "Brand Name",
    "site_title": "Brand Name | Main Positioning",
    "site_description": "Short SEO description for search and sharing.",
    "site_url": "https://www.brand.com",
    "default_og_image": "/brand-og.png"
  },
  "home_content": {
    "hero_eyebrow": "Short eyebrow text",
    "hero_title": "Main home title",
    "hero_description": "One short supporting sentence"
  },
  "links": {
    "primary_cta": "https://wa.me/5534998989263?text=Hello",
    "instagram": "https://www.instagram.com/brand/",
    "maps": "https://www.google.com/maps/search/?api=1&query=..."
  },
  "service_area": {
    "in_person": true,
    "online": false,
    "cities": ["City A", "City B"]
  },
  "business_hours": {
    "timezone": "America/Sao_Paulo",
    "schedule": [
      { "day": "monday", "open": "09:00", "close": "18:00" },
      { "day": "tuesday", "open": "09:00", "close": "18:00" },
      { "day": "wednesday", "open": "09:00", "close": "18:00" },
      { "day": "thursday", "open": "09:00", "close": "18:00" },
      { "day": "friday", "open": "09:00", "close": "18:00" }
    ]
  },
  "legal": {
    "company_name": "Legal Company Name Ltda",
    "tax_id": "00.000.000/0001-00"
  },
  "notes": "Optional internal notes, placeholders, or pending confirmations."
}
```

---

## Example 1 - Personal Brand (Aesthetics)

```json
{
  "business_type": "personal_brand",
  "brand_name": "Ana Beatriz",
  "person_name": "Ana Beatriz",
  "main_title_home": "Valorize sua beleza natural.",
  "tagline": "Estetica facial e cuidados personalizados",
  "occupation_or_area": "Biomedica Esteta",
  "contacts": {
    "primary_channel": "whatsapp",
    "phone_e164": "+5534999999999",
    "phone_display": "+55 (34) 99999-9999",
    "whatsapp_link": "https://wa.me/5534999999999?text=Olá",
    "email": "contato@anabeatriz.com"
  },
  "location": {
    "address_label": "Uberlandia - MG",
    "address_full": "Av. Exemplo, 123 - Bairro, Uberlandia - MG",
    "city": "Uberlandia",
    "state": "MG",
    "country": "BR",
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Av+Exemplo+123+Uberlandia+MG"
  },
  "social_profiles": {
    "instagram": {
      "handle": "@anabeatriz.estetica",
      "url": "https://www.instagram.com/anabeatriz.estetica/"
    }
  },
  "site": {
    "site_name": "Ana Beatriz",
    "site_title": "Ana Beatriz | Biomedica Esteta",
    "site_description": "Atendimento em estetica facial com foco em resultados naturais.",
    "site_url": "https://www.anabeatriz.com"
  }
}
```

## Example 2 - Local Business (Bakery)

```json
{
  "business_type": "local_business",
  "brand_name": "Padaria Pao Quente",
  "main_title_home": "Paes frescos todos os dias.",
  "tagline": "Padaria artesanal no centro da cidade",
  "occupation_or_area": "Padaria e confeitaria",
  "contacts": {
    "primary_channel": "phone",
    "phone_e164": "+553133333333",
    "phone_display": "+55 (31) 3333-3333",
    "whatsapp_link": "https://wa.me/553133333333?text=Olá"
  },
  "location": {
    "address_label": "Belo Horizonte - MG",
    "address_full": "Rua das Flores, 45 - Centro, Belo Horizonte - MG",
    "city": "Belo Horizonte",
    "state": "MG",
    "country": "BR",
    "maps_link": "https://www.google.com/maps/search/?api=1&query=Rua+das+Flores+45+Belo+Horizonte+MG"
  },
  "business_hours": {
    "timezone": "America/Sao_Paulo",
    "schedule": [
      { "day": "monday", "open": "06:00", "close": "20:00" },
      { "day": "tuesday", "open": "06:00", "close": "20:00" },
      { "day": "wednesday", "open": "06:00", "close": "20:00" },
      { "day": "thursday", "open": "06:00", "close": "20:00" },
      { "day": "friday", "open": "06:00", "close": "20:00" },
      { "day": "saturday", "open": "06:00", "close": "14:00" }
    ]
  },
  "social_profiles": {
    "instagram": {
      "handle": "@padariapaoquente",
      "url": "https://www.instagram.com/padariapaoquente/"
    }
  }
}
```

## Example 3 - Agency / Digital Service

```json
{
  "business_type": "agency",
  "brand_name": "Orbit Studio",
  "main_title_home": "Sites que convertem em vendas.",
  "tagline": "Design, estrategia e desenvolvimento web",
  "occupation_or_area": "Agencia digital",
  "languages": ["pt-BR", "en-US", "es-ES"],
  "primary_locale": "en-US",
  "contacts": {
    "primary_channel": "email",
    "phone_e164": "+5511998888777",
    "phone_display": "+55 (11) 99888-8777",
    "whatsapp_link": "https://wa.me/5511998888777?text=Hi",
    "email": "hello@orbit.studio"
  },
  "social_profiles": {
    "instagram": {
      "handle": "@orbitstudio",
      "url": "https://www.instagram.com/orbitstudio/"
    },
    "linkedin": {
      "handle": "orbit-studio",
      "url": "https://www.linkedin.com/company/orbit-studio/"
    }
  },
  "site": {
    "site_name": "Orbit Studio",
    "site_title": "Orbit Studio | Web and Growth",
    "site_description": "Digital agency focused on websites and lead generation.",
    "site_url": "https://www.orbit.studio",
    "default_og_image": "/orbit-og.png"
  },
  "links": {
    "primary_cta": "https://www.orbit.studio/contact",
    "instagram": "https://www.instagram.com/orbitstudio/",
    "linkedin": "https://www.linkedin.com/company/orbit-studio/"
  }
}
```

---

## Practical Notes

- Keep this file as the single source of truth for static business data.
- If a value is not confirmed yet, keep a clear placeholder and mark it in `notes`.
- Prefer E.164 for raw phone (`+55...`) and keep a display-friendly variant too.
- For implementation later, map this file into `src/shared/config` or a dedicated adapter.
