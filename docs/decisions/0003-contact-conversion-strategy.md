# 0003 Contact Conversion Strategy

## Context

`docs/business-specs/basic-business-info.json` defines WhatsApp and Instagram as confirmed contact channels, with location limited to `Uberlandia - MG` and no confirmed maps link yet. The website's main business goal is to convert visitors into conversations quickly.

## Decision

Use the following conversion hierarchy:

1. **Primary:** WhatsApp / phone-based conversation using the confirmed WhatsApp link
2. **Secondary:** Instagram profile as social proof and alternate contact path
3. **Tertiary:** Maps/location context once the final maps link is confirmed

All primary pages should expose a WhatsApp path directly or within one extra interaction.

## Alternatives

- Use a website form as the primary conversion path
- Make Instagram the primary contact channel
- Delay direct contact and prioritize portfolio browsing only

## Consequences

- The site stays aligned with the confirmed contact method in the business JSON
- Conversion friction remains low on mobile traffic
- Missing maps details are not allowed to block launch because they are tertiary, not primary

## Rollback

If WhatsApp stops being the preferred channel, switch the primary CTA source in `basic-business-info.json`, update site settings and docs, and keep Instagram plus location as secondary/tertiary paths.
