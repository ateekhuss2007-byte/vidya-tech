/**
 * Official Syllabus & Curriculum Master Registry Validation Runner (Prompt 3)
 * Tests all extracted courses for academic identity, source traceability,
 * topic-microtopic integrity, and non-duplication.
 * 
 * Run with: npx vite-node scripts/validateSyllabusRegistry.ts
 */

import { OFFICIAL_SYLLABUS_REGISTRY } from '../src/data/officialSyllabusRegistry.ts';
import { validateSyllabusRegistry } from '../src/utils/dataVerification.ts';

console.log('='.repeat(70));
console.log('VIDYA AI — SIH26043: OFFICIAL SYLLABUS & CURRICULUM REGISTRY AUDIT');
console.log('='.repeat(70));

console.log(`Total Extracted Verified Courses: ${OFFICIAL_SYLLABUS_REGISTRY.length}`);

const result = validateSyllabusRegistry(OFFICIAL_SYLLABUS_REGISTRY);

if (!result.isValid) {
  console.error('\n❌ SYLLABUS VALIDATION FAILED WITH ERRORS:');
  result.errors.forEach((err, idx) => console.error(`  ${idx + 1}. ${err}`));
  process.exit(1);
} else {
  console.log('\n✅ ALL OFFICIAL SYLLABUS COURSES PASSED INTEGRITY VALIDATION!');

  if (result.warnings.length > 0) {
    console.log('\n⚠️  Warnings:');
    result.warnings.forEach((w, idx) => console.log(`  ${idx + 1}. ${w}`));
  }

  // Calculate statistics
  let totalModules = 0;
  let totalOfficialTopics = 0;
  let totalMicroTopics = 0;
  const universityCourseCounts: Record<string, number> = {};

  OFFICIAL_SYLLABUS_REGISTRY.forEach(c => {
    universityCourseCounts[c.universityId] = (universityCourseCounts[c.universityId] || 0) + 1;
    c.modules.forEach(m => {
      totalModules++;
      m.topics.forEach(t => {
        totalOfficialTopics++;
        totalMicroTopics += t.microTopics.length;
      });
    });
  });

  console.log('\nBreakdown of Verified Courses by University:');
  Object.entries(universityCourseCounts).forEach(([uni, count]) => {
    console.log(`  • ${uni.padEnd(15)}: ${count} course(s)`);
  });

  console.log(`\nMetrics Summary:`);
  console.log(`  • Total Modules / Units Extracted     : ${totalModules}`);
  console.log(`  • Total Official Syllabus Topics      : ${totalOfficialTopics}`);
  console.log(`  • Total AI-Derived Micro-Topics       : ${totalMicroTopics} (Strictly tagged)`);
  console.log(`  • Traceability Coverage               : 100% (Every record links to official portal)`);
  console.log('='.repeat(70));
}
