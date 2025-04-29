const { execSync } = require('child_process');
const fs = require('fs');

function checkCommand(command, name) {
    try {
        execSync(command + ' --version', { stdio: 'pipe' });
        console.log(`✅ ${name} is installed`);
        return true;
    } catch (e) {
        console.error(`❌ ${name} is not installed`);
        return false;
    }
}

function checkFile(path, name) {
    if (fs.existsSync(path)) {
        console.log(`✅ ${name} exists`);
        return true;
    }
    console.error(`❌ ${name} is missing`);
    return false;
}

function checkPackageJson() {
    if (!checkFile('package.json', 'package.json')) return false;
    
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    const requiredScripts = ['build', 'deploy', 'predeploy'];
    const missingScripts = requiredScripts.filter(script => !pkg.scripts[script]);
    
    if (missingScripts.length > 0) {
        console.error(`❌ Missing scripts in package.json: ${missingScripts.join(', ')}`);
        return false;
    }
    console.log('✅ All required scripts exist in package.json');
    return true;
}

function checkGitSetup() {
    try {
        const remoteUrl = execSync('git remote get-url origin', { stdio: 'pipe' }).toString().trim();
        console.log(`✅ Git remote URL: ${remoteUrl}`);
        return true;
    } catch (e) {
        console.error('❌ Git remote is not configured');
        return false;
    }
}

function main() {
    console.log('🔍 Running pre-deployment checks...\n');
    
    const checks = [
        () => checkCommand('node', 'Node.js'),
        () => checkCommand('npm', 'npm'),
        () => checkCommand('git', 'Git'),
        () => checkFile('vite.config.ts', 'Vite config'),
        checkPackageJson,
        checkGitSetup
    ];
    
    const results = checks.map(check => check());
    
    console.log('\n📋 Summary:');
    if (results.every(Boolean)) {
        console.log('✅ All checks passed! You can proceed with deployment.');
    } else {
        console.log('❌ Some checks failed. Please fix the issues above before deploying.');
    }
}

main(); 