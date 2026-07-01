# SEO Pages - Quick Reference

## URL Format
```
/{practice-area-slug}-{location-slug}
```

## Example URLs

### City Pages
| Practice Area | City | URL |
|--------------|------|-----|
| Car Accident | Tampa | `/car-accident-lawyer-tampa` |
| Family Law | St. Petersburg | `/family-lawyer-st-petersburg` |
| Criminal Defense | Clearwater | `/criminal-defense-lawyer-clearwater` |
| Immigration | Brandon | `/immigration-lawyer-brandon` |
| Employment | Riverview | `/employment-lawyer-riverview` |
| Business | Wesley Chapel | `/business-lawyer-wesley-chapel` |

### County Pages
| Practice Area | County | URL |
|--------------|--------|-----|
| Car Accident | Hillsborough | `/car-accident-lawyer-hillsborough-county` |
| Family Law | Pinellas | `/family-lawyer-pinellas-county` |
| Criminal Defense | Pasco | `/criminal-defense-lawyer-pasco-county` |

## Practice Areas (14 total)
1. car-accident-lawyer
2. family-lawyer
3. criminal-defense-lawyer
4. immigration-lawyer
5. employment-lawyer
6. business-lawyer
7. estate-planning-lawyer
8. real-estate-lawyer
9. personal-injury-lawyer
10. bankruptcy-lawyer
11. divorce-lawyer
12. workers-compensation-lawyer
13. dui-lawyer
14. landlord-tenant-lawyer

## Cities (10 total, by county)
### Hillsborough County (3 cities)
- tampa
- brandon
- riverview

### Pinellas County (5 cities)
- st-petersburg
- clearwater
- largo
- palm-harbor
- dunedin
- tarpon-springs

### Pasco County (2 cities)
- wesley-chapel

## Counties (3 total)
- hillsborough-county
- pinellas-county
- pasco-county

## Key Files

| File | Purpose |
|------|---------|
| `lib/seo-pages.ts` | Configuration & data |
| `components/seo-page-content.tsx` | Page component |
| `app/[slug]/page.tsx` | Dynamic route handler |
| `app/sitemap.ts` | Sitemap generation |
| `public/robots.txt` | Crawler instructions |

## Preview URLs

**Current dev server:** http://localhost:3000

**Example pages to test:**
- http://localhost:3000/car-accident-lawyer-tampa
- http://localhost:3000/family-lawyer-st-petersburg
- http://localhost:3000/criminal-defense-lawyer-hillsborough-county
- http://localhost:3000/immigration-lawyer-clearwater
- http://localhost:3000/employment-lawyer-brandon

**Check sitemap:**
- http://localhost:3000/sitemap.xml

**Check robots.txt:**
- http://localhost:3000/robots.txt

## Page Features

✅ Unique H1 title (practice area + location)
✅ Unique meta description
✅ ZIP code search form
✅ How AttorneyAbogado Works section
✅ FAQ section (4 questions)
✅ Related pages links
✅ Schema.org structured data
✅ Canonical URLs
✅ Mobile responsive
✅ Consistent branding

## Statistics

- **Total Pages:** 182 SEO pages
- **Core Pages:** 6 (homepage, how-it-works, etc.)
- **Total Indexed:** 188 pages
- **Build Time:** ~15 seconds
- **Page Size:** ~45KB (gzipped)

## Meta Data Examples

### Car Accident Lawyer - Tampa
**Title:** Car Accident Lawyer in Tampa | Local Legal Help in Hillsborough County
**Description:** Find experienced car accident lawyer in Tampa. Local car accident lawyer serving Hillsborough County. Free consultation available.
**Keywords:** Car Accident Lawyer, Tampa, car accident lawyer in Tampa, car accident lawyer near me, legal services, attorney, lawyer

### Criminal Defense - Hillsborough County
**Title:** Criminal Defense Lawyer in Hillsborough County | Legal Services
**Description:** Find experienced criminal defense lawyer in Hillsborough County. Local legal services and consultation.

## Deployment Checklist

- [ ] Run `pnpm build` to generate all pages
- [ ] Verify no build errors
- [ ] Test 3-5 random SEO page URLs
- [ ] Check sitemap has 188 URLs
- [ ] Verify robots.txt allows crawling
- [ ] Deploy to production
- [ ] Submit sitemap to Google Search Console
- [ ] Monitor Search Console for indexing

## Adding New Content

**To add a new practice area:**
1. Edit `lib/seo-pages.ts`
2. Add to `practiceAreas` array
3. Run `pnpm build`
4. Deploy

**To add a new city:**
1. Edit `lib/seo-pages.ts`
2. Add to `cities` array (include county)
3. Run `pnpm build`
4. Deploy

**To add a new county:**
1. Edit `lib/seo-pages.ts`
2. Add to `counties` array
3. Run `pnpm build`
4. Deploy

## Important Notes

- Pages are **NOT** in main navigation (hidden from menu)
- Pages **ARE** in sitemap (discoverable by search engines)
- Pages **DO** use existing attorney API for search
- Pages **DO** have unique titles and descriptions
- Pages **WILL** appear in search results for local searches
- No breaking changes to existing functionality

## Performance

- All pages pre-rendered at build time (static)
- Served from Vercel CDN (< 100ms)
- Schema.org markup for rich snippets
- Optimized for Core Web Vitals

## Support

For detailed documentation, see:
- `SEO_PAGES_IMPLEMENTATION.md` - Complete technical guide
- `SEO_IMPLEMENTATION_SUMMARY.md` - Implementation details
