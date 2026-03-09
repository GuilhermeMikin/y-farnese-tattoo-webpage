# Floating Actions (Balõezinhos Laterais)

Especificação dos botões flutuantes fixos na lateral direita da tela, usados para conversão rápida e navegação.

## Visão geral

- **Componente:** `src/shared/components/FloatingActions/index.tsx`
- **Posição:** `fixed` canto inferior direito (mobile) ou centralizado verticalmente à direita (desktop)
- **Ordem (de cima para baixo):** Voltar ao topo → WhatsApp → Instagram

## Ações

| Ação | Tipo | Comportamento |
|------|------|---------------|
| **Voltar ao topo** | Botão | Visível apenas após rolar > 200px. Rola suavemente para o topo. |
| **WhatsApp** | Link | Abre wa.me da unidade em nova aba. |
| **Instagram** | Link | Abre perfil do Instagram em nova aba. |

## Dados e assets

- **Labels:** `pages.home.floating_actions.back_to_top_label`, `siteSettings.primaryCtaLabel` (WhatsApp), `pages.contact.instagram_label` (Instagram)
- **Ícones:** `public/whatsapp-icon.png`, `public/insta-icon.png`
- **URLs:** WhatsApp e Instagram vêm de `siteSettings` (Prismic)

## Responsivo

- **Mobile:** `bottom-5 right-5`, coluna vertical
- **Desktop (md+):** `top-1/2 -translate-y-1/2 right-4`, centralizado verticalmente

## Acessibilidade

- `aria-label` em todos os links
