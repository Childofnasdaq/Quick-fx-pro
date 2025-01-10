const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Project structure
const structure = {
  'app': {
    'admin': {
      'login': { 'page.tsx': '' },
      'dashboard': { 'page.tsx': '' },
      'layout.tsx': ''
    },
    'dashboard': {
      'eas': {
        'new': { 'page.tsx': '' },
        '[id]': { 'page.tsx': '' },
        'page.tsx': ''
      },
      'purchase': { 'page.tsx': '' },
      'keys': { 'page.tsx': '' },
      'stats': { 'page.tsx': '' },
      'help': { 'page.tsx': '' },
      'page.tsx': ''
    },
    'layout.tsx': '',
    'page.tsx': '',
    'globals.css': ''
  },
  'components': {
    'layouts': {
      'protected-layout.tsx': ''
    },
    'auth-forms.tsx': '',
    'ea-profile-card.tsx': '',
    'trading-strategy-form.tsx': '',
    'ea-icon-upload.tsx': '',
    'license-list.tsx': '',
    'create-license-modal.tsx': '',
    'candlestick-chart.tsx': '',
    'candlestick-icon.tsx': ''
  },
  'lib': {
    'stores': {
      'admin-store.ts': '',
      'auth-store.ts': '',
      'license-store.ts': '',
      'ea-store.ts': ''
    },
    'auth.ts': '',
    'db.ts': ''
  },
  'prisma': {
    'schema.prisma': ''
  },
  'middleware.ts': '',
  'vercel.json': '',
  '.env': '',
  '.env.example': ''
};

// Create directory and files recursively
function createStructure(basePath, struct) {
  for (const [key, value] of Object.entries(struct)) {
    const currentPath = path.join(basePath, key);
    if (typeof value === 'object') {
      fs.mkdirSync(currentPath, { recursive: true });
      createStructure(currentPath, value);
    } else {
      fs.writeFileSync(currentPath, '');
    }
  }
}

// Initialize project
async function initializeProject() {
  try {
    console.log('Creating project structure...');
    createStructure('.', structure);

    // Initialize npm project and install dependencies
    console.log('Initializing npm project...');
    execSync('npm init -y');

    console.log('Installing dependencies...');
    execSync('npm install next react react-dom @prisma/client bcryptjs zustand @radix-ui/react-dialog @radix-ui/react-label @radix-ui/react-select @radix-ui/react-tabs lucide-react');

    console.log('Installing dev dependencies...');
    execSync('npm install -D typescript @types/react @types/node @types/bcryptjs prisma tailwindcss postcss autoprefixer');

    // Initialize TypeScript
    console.log('Initializing TypeScript...');
    execSync('npx tsc --init');

    // Initialize Prisma
    console.log('Initializing Prisma...');
    execSync('npx prisma init');

    // Initialize Tailwind CSS
    console.log('Initializing Tailwind CSS...');
    execSync('npx tailwindcss init -p');

    console.log('Project setup completed successfully!');
    console.log('\nNext steps:');
    console.log('1. Update .env with your database credentials');
    console.log('2. Copy the code for each file from the provided templates');
    console.log('3. Run npm run dev to start the development server');

  } catch (error) {
    console.error('Error setting up project:', error);
  }
}

// Run the setup
initializeProject();
