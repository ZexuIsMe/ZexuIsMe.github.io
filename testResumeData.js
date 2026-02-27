const resumeData = require('./themes/pixel-theme/layout/resumeData.js');
console.log('Data loaded successfully:', Object.keys(resumeData));
console.log('Personal info:', resumeData.personalInfo);
console.log('Education count:', resumeData.education.length);
console.log('Experience count:', resumeData.experience.length);
console.log('Certificates count:', resumeData.certificates.length);
console.log('Skills count:', resumeData.skills.length);
console.log('Self evaluation:', resumeData.selfEvaluation.substring(0, 50) + '...');
console.log('Test completed successfully!');