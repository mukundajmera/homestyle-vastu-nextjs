import { readFileSync } from 'node:fs';
import { join } from 'node:path';

// Git on Windows (core.autocrlf=true) checks SQL files out with CRLF endings.
// Normalize to LF so the string matches below hold on every platform.
const readMigration = (name: string) =>
  readFileSync(join(process.cwd(), 'docs/launch', name), 'utf8').replace(/\r\n/g, '\n');

describe('lead property-category migration', () => {
  it('maps the legacy enum values before narrowing to the current values', () => {
    const migration = readMigration('migrate-leads-v2.sql');
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
  it('maps the six-category enum down to five in v3', () => {
    const migration = readMigration('migrate-leads-v3.sql');

    // It should map plot_land to plot
    expect(migration).toContain("WHEN type = 'plot_land' THEN 'plot'");

    // It should map industrial_factory to industrial
    expect(migration).toContain("WHEN type = 'industrial_factory' THEN 'industrial'");

    // It should map construction_renovation to other
    expect(migration).toContain("WHEN type = 'construction_renovation' THEN 'other'");

    // The final enum should not contain the old values
    const narrowPosition = migration.lastIndexOf("MODIFY COLUMN type ENUM(");
    expect(narrowPosition).toBeGreaterThanOrEqual(0);
    const finalEnum = migration.slice(narrowPosition);
    expect(finalEnum).not.toContain('plot_land');
    expect(finalEnum).not.toContain('industrial_factory');
    expect(finalEnum).not.toContain('construction_renovation');
  });
});
