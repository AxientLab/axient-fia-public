import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const readJson = async (path) => JSON.parse(await readFile(resolve(root, path), 'utf8'));
const fail = (message) => { throw new Error(message); };
const expect = (condition, message) => { if (!condition) fail(message); };
const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const hex64 = (value) => typeof value === 'string' && /^[a-f0-9]{64}$/.test(value);

const expected = {
  manifest: '342b2a6f27aeb91bba2013f5604ab1c50aaba48d6f218c3f3f84cc5c39ce7bfd',
  root: '09cd709444eb82a0c2c17d4b42a2750b2cd9b6002f69b6a3648c4e2ea1b41e46',
  archive: '6901e3277c49693c867f1d960166acfb5dddb76eaf134b4bf66fba26e54cf328',
  coordinator: '2e51296ab1d50558342a9e740f94ddf3e5e7d221c1b329466577a7918bb0767f',
  p17: '111a9c6c2848d6605081f4fcf08dfd859a51423e1478a50d2c252c49fa6cda1b'
};
const expectedDownloads = {
  'papers/downloads/AEMB_Benchmark_15p.pdf': '1a2ce3fd2d535af389c8bfced4342072be3d9e303621ace3e967f060acdf817d',
  'papers/downloads/AVET_Dataset_15p.pdf': '615b30aea58f26b7175c75e9a415b3b96af3c0425357f2aadbaf801e06f920a9',
  'papers/downloads/Axient_Debt_Free_Finality_r0.4.2_SHORT.pdf': '3f9f3ad33a31491498896fbb61c30a6b95584e77b5c0bfafa911248a33d922ff',
  'papers/downloads/Axient_Empirical_Calibration_r0.6.0_SHORT.pdf': '29b8203457f0d2b9239afd5c31ac7d6e9f39a8691679532aa063388622fb462c',
  'papers/downloads/Axient_On_Chain_Credit_and_Loss_Allocation_r0.4.1_SHORT.pdf': 'ff0330ff2942bc6a616a107a8aa67e0f86bc548aa7e6f81023ac2f3688999618'
};

const parseCsv = async (path) => {
  const lines = (await readFile(resolve(root, path), 'utf8')).trim().split('\n');
  const header = lines.shift().split(',');
  return lines.map((line) => Object.fromEntries(line.split(',').map((value, index) => [header[index], value])));
};

const summary = await readJson('evidence/phase17b-summary.json');
const summarySchema = await readJson('schemas/phase17b-public-evidence.schema.json');
const cohort = await readJson('evidence/all12-manifest.json');
const materialization = await readJson('evidence/materialization-manifest.json');
const strictPackage = await readJson('evidence/strict-package-manifest.json');
const replay = await readJson('evidence/p01-p17-replay-manifest.json');
const scenarios = await parseCsv('evidence/scenario-registry.csv');
const layers = await parseCsv('evidence/evidence-layer-registry.csv');

expect(Array.isArray(summarySchema.required), 'summary schema lacks required fields');
for (const field of summarySchema.required) expect(Object.hasOwn(summary, field), 'summary is missing schema field: ' + field);
for (const value of [summary.all12_manifest_sha256, summary.ledger_root_sha256, summary.strict_archive_sha256, summary.p01_p17_coordinator_result_sha256, summary.p17_final_output_sha256]) {
  expect(hex64(value), 'invalid canonical SHA-256 value');
}
expect(summary.all12_manifest_sha256 === expected.manifest, 'unexpected all-12 manifest');
expect(summary.ledger_root_sha256 === expected.root, 'unexpected ledger root');
expect(summary.strict_archive_sha256 === expected.archive, 'unexpected archive identity');
expect(summary.p01_p17_coordinator_result_sha256 === expected.coordinator, 'unexpected coordinator result');
expect(summary.p17_final_output_sha256 === expected.p17, 'unexpected P17 output');
expect(summary.parent_fia_count === 12 && summary.retained_evidence_layer_positions === 84 && summary.layers_per_parent_fia === 7, 'summary coverage mismatch');

expect(cohort.parent_fia_count === 12 && cohort.layers_per_parent_fia === 7, 'cohort coverage mismatch');
expect(cohort.manifest_sha256 === expected.manifest && cohort.ledger_root_sha256 === expected.root, 'cohort identity mismatch');
expect(cohort.scenario_records.length === 12 && scenarios.length === 12, 'expected 12 parent FIA records');
const ids = new Set(cohort.scenario_records.map((record) => record.id));
const correlations = new Set(cohort.scenario_records.map((record) => record.correlation));
expect(ids.size === 12 && correlations.size === 12, 'FIA IDs or correlations are not unique');
for (let index = 1; index <= 12; index += 1) expect(ids.has('FIA-' + String(index).padStart(2, '0')), 'missing parent FIA');
expect(cohort.fia11_parent_subcases.length === 2, 'FIA-11 requires two subcases');
expect(cohort.fia11_parent_subcases.map((item) => item.id).join(',') === 'FIA-011A,FIA-011B', 'invalid FIA-11 subcase model');

expect(layers.length === 84, 'expected 84 layer positions');
for (const id of ids) {
  const registered = layers.filter((row) => row.parent_fia_id === id);
  expect(registered.length === 7, id + ' does not have seven registered layer positions');
  expect(new Set(registered.map((row) => row.layer_position)).size === 7, id + ' has duplicate layer positions');
  expect(registered.every((row) => row.authority === 'ACTUAL_EVIDENCE' && row.raw_derivation_payload_published === 'false'), id + ' layer registry boundary mismatch');
}

expect(materialization.trees.length === 2 && materialization.byte_identical === true, 'materialization mismatch');
expect(materialization.source_manifest_sha256 === expected.manifest, 'materialization source mismatch');
expect(materialization.actual_tree_files === 16 && materialization.actual_tree_bytes === 122636, 'materialization cardinality mismatch');
expect(strictPackage.archive_sha256 === expected.archive && strictPackage.archive_member_count === 16, 'strict package mismatch');
expect(replay.phase_count === 17 && replay.replay_completed === true && replay.phases.length === 17, 'replay cardinality mismatch');
expect(replay.coordinator_result_sha256 === expected.coordinator && replay.p17_final_output_sha256 === expected.p17, 'replay identity mismatch');
for (let index = 0; index < 17; index += 1) expect(replay.phases[index].phase === 'P' + String(index + 1).padStart(2, '0'), 'replay phase order mismatch');
expect(replay.phases[16].result_sha256 === expected.p17, 'P17 chain mismatch');

for (const [relative, expectedHash] of Object.entries(expectedDownloads)) {
  const bytes = await readFile(resolve(root, relative));
  expect(bytes.subarray(0, 5).toString('ascii') === '%PDF-', 'invalid PDF header: ' + relative);
  expect(sha256(bytes) === expectedHash, 'download checksum mismatch: ' + relative);
}

const sums = (await readFile(resolve(root, 'SHA256SUMS'), 'utf8')).trim().split('\n').filter(Boolean);
expect(sums.length > 0, 'SHA256SUMS is empty');
for (const line of sums) {
  const match = /^([a-f0-9]{64})  (.+)$/.exec(line);
  expect(match, 'invalid SHA256SUMS line');
  const [, expectedHash, relative] = match;
  expect(!relative.includes('..') && !relative.startsWith('/'), 'unsafe SHA256SUMS path');
  const observed = sha256(await readFile(resolve(root, relative)));
  expect(observed === expectedHash, 'checksum mismatch: ' + relative);
}

console.log('axient-fia-public: verified 12 parent FIA, 84 registered layer positions, 2 materializations, strict archive, P01–P17 replay, and 5 short-paper downloads');
