import { readFileSync } from 'node:fs';
import { join } from 'node:path';

describe('lead property-category migration', () => {
  it('maps the legacy enum values before narrowing to the current values', () => {
    const migration = readFileSync(join(process.cwd(), 'docs/launch/migrate-leads-v2.sql'), 'utf8');
    const widenPosition = migration.indexOf("'residential',\n    'commercial',\n    'home'");
    const homeMappingPosition = migration.indexOf("UPDATE leads SET type = 'home' WHERE type = 'residential'");
    const businessMappingPosition = migration.indexOf("UPDATE leads SET type = 'business' WHERE type = 'commercial'");
    const narrowPosition = migration.lastIndexOf("MODIFY COLUMN type ENUM(");

    expect(widenPosition).toBeGreaterThanOrEqual(0);
    expect(homeMappingPosition).toBeGreaterThan(widenPosition);
    expect(businessMappingPosition).toBeGreaterThan(homeMappingPosition);
    expect(narrowPosition).toBeGreaterThan(businessMappingPosition);
    expect(migration.slice(narrowPosition)).not.toContain('residential');
    expect(migration.slice(narrowPosition)).not.toContain('commercial');
  });
});
