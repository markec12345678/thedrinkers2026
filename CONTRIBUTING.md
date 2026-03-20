# 🤝 Contributing Guide

## 🎯 Quick Start

```bash
# 1. Fork the repository
git clone https://github.com/YOUR_USERNAME/the-drinkers-site.git
cd the-drinkers-site

# 2. Install dependencies
npm install

# 3. Create feature branch
git checkout -b feat/new-section

# 4. Start development
npm run dev

# 5. Make changes and commit
git add .
git commit -m "feat: add new section"

# 6. Push and create PR
git push origin feat/new-section
```

---

## 📋 Branch Naming Convention

### Format: `type/description`

**Types:**
- `feat/` - New feature
- `fix/` - Bug fix
- `docs/` - Documentation
- `style/` - Formatting, styling
- `refactor/` - Code refactoring
- `perf/` - Performance improvements
- `test/` - Tests
- `chore/` - Maintenance

**Examples:**
```bash
git checkout -b feat/add-tour-map
git checkout -b fix/hero-video-loading
git checkout -b docs/update-readme
git checkout -b perf/optimize-images
```

---

## ✍️ Conventional Commits

### Format: `type(scope): description`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `perf:` - Performance improvements
- `test:` - Adding tests
- `chore:` - Build process, dependencies

**Examples:**
```bash
# Good commits
git commit -m "feat(hero): add video background"
git commit -m "fix(gallery): resolve image loading issue"
git commit -m "docs(readme): update installation steps"
git commit -m "perf(images): convert to AVIF format"
git commit -m "refactor(auth): simplify authentication logic"

# Bad commits
git commit -m "fixed stuff"
git commit -m "wip"
git commit -m "asdfasdf"
```

### Multi-line Commit Template

```bash
feat(tour): add interactive Slovenia map

- Add Leaflet map component
- Show tour dates on map
- Add custom crimson markers
- Include popup with venue info

Closes #123
```

---

## 🔄 Pull Request Process

### 1. Before Creating PR

- [ ] Run `npm run build` - ensure it passes
- [ ] Run `npm run typecheck` - no TypeScript errors
- [ ] Run `npm run lint` - no ESLint errors
- [ ] Test locally - all features work
- [ ] Add screenshots (for UI changes)
- [ ] Run Lighthouse audit

### 2. PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
- [ ] Tested locally
- [ ] Added unit tests
- [ ] Updated e2e tests

## Screenshots
Before: [screenshot]
After: [screenshot]

## Performance
Lighthouse scores:
- Performance: 95
- Accessibility: 98
- Best Practices: 95
- SEO: 100

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] No console warnings
- [ ] No console errors
- [ ] Responsive on mobile
- [ ] Responsive on tablet
- [ ] Responsive on desktop
```

### 3. PR Review Process

1. **Automated Checks**
   - Build passes ✅
   - Tests pass ✅
   - Lighthouse score ✅

2. **Code Review**
   - Code quality
   - Performance impact
   - Security considerations

3. **Approval**
   - 1 approval required
   - All comments resolved
   - Merge to main

---

## 🧪 Testing Guidelines

### Unit Tests

```tsx
// __tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('handles click', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
```

### Run Tests

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test Button.test.tsx

# Watch mode
npm test -- --watch
```

---

## 📐 Code Style Guidelines

### TypeScript

```tsx
// ✅ DO: Use TypeScript types
interface ComponentProps {
  title: string;
  count?: number;
  onClick: () => void;
}

// ✅ DO: Use proper return types
function calculate(): number {
  return 42;
}

// ❌ DON'T: Use any
function bad(param: any): any {
  return param;
}
```

### React Components

```tsx
// ✅ DO: Use functional components
export function MyComponent({ title }: Props) {
  return <div>{title}</div>;
}

// ✅ DO: Use proper prop naming
interface Props {
  isLoading?: boolean;  // boolean as is/has prefix
  onClick?: () => void; // callbacks as onX
  className?: string;   // style overrides
}

// ❌ DON'T: Use arrow functions for components
export const MyComponent = () => <div />;
```

### CSS/Tailwind

```tsx
// ✅ DO: Use Tailwind classes
<div className="flex items-center gap-4 p-4 bg-white rounded-lg" />

// ✅ DO: Use cn() for conditional classes
<div className={cn(
  "base-styles",
  isActive && "active-styles",
  className
)} />

// ❌ DON'T: Use inline styles
<div style={{ display: 'flex' }} />
```

---

## 🎨 Design Guidelines

### Responsive Design

```tsx
// Mobile-first approach
<div className="
  w-full           // Mobile (default)
  md:w-1/2         // Tablet (768px+)
  lg:w-1/3         // Desktop (1024px+)
  xl:w-1/4         // Large (1280px+)
" />
```

### Dark Mode

```tsx
// Support dark mode
<div className="
  bg-white text-black
  dark:bg-rock-black dark:text-white
" />
```

### Accessibility

```tsx
// ✅ DO: Use semantic HTML
<button onClick={handleClick}>Click</button>
<nav aria-label="Main navigation">...</nav>

// ✅ DO: Add ARIA labels
<button aria-label="Close modal">×</button>

// ✅ DO: Add alt text to images
<Image src="/photo.jpg" alt="Band performing live" />

// ❌ DON'T: Use divs for buttons
<div onClick={handleClick}>Click</div>
```

---

## 🚀 Windsurf AI Commands

When working with Windsurf AI, use these commands:

### Code Generation
```
/create component [name] - Create new component
/create page [name] - Create new page
/create api [endpoint] - Create API route
```

### Code Improvement
```
/fix [component] - Fix bugs in component
/optimize [file] - Optimize performance
/refactor [code] - Refactor code
/simplify [function] - Simplify complex logic
```

### Testing
```
/test [feature] - Generate unit tests
/test:e2e [page] - Generate e2e tests
/coverage - Show test coverage
```

### Documentation
```
/doc [file] - Generate documentation
/comment [code] - Add code comments
/readme - Update README
```

### Deployment
```
/deploy - Prepare for production
/build:analyze - Analyze bundle size
/lighthouse - Run Lighthouse audit
```

---

## 📊 Quality Gates

### Before Merging to Main

- [ ] Build passes: `npm run build`
- [ ] TypeScript compiles: `npm run typecheck`
- [ ] ESLint passes: `npm run lint`
- [ ] Tests pass: `npm test`
- [ ] Lighthouse score > 90
- [ ] No console errors
- [ ] No console warnings
- [ ] Mobile responsive
- [ ] Desktop responsive
- [ ] Accessibility checked

### Performance Budget

- [ ] Bundle size < 500KB
- [ ] LCP < 2.5s
- [ ] FID < 100ms
- [ ] CLS < 0.1
- [ ] TBT < 200ms

---

## 🐛 Bug Report Template

```markdown
## Bug Description
Clear description of what's wrong

## To Reproduce
Steps to reproduce:
1. Go to '...'
2. Click '...'
3. See error

## Expected Behavior
What should happen

## Screenshots
If applicable

## Environment
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 120]
- Device: [e.g. Desktop]

## Additional Context
Any other details
```

---

## 💡 Feature Request Template

```markdown
## Problem Statement
What problem does this solve?

## Proposed Solution
How should it work?

## Alternatives Considered
Other approaches

## Additional Context
Mockups, examples, etc.

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3
```

---

## 🎯 Project Structure

```
the-drinkers-site/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Homepage
│   ├── about/             # About page
│   ├── contact/           # Contact page
│   ├── gallery/           # Gallery page
│   ├── merch/             # Merchandise page
│   ├── music/             # Music page
│   └── tour/              # Tour page
├── components/
│   ├── features/          # Feature components
│   ├── layout/            # Layout components
│   ├── sections/          # Page sections
│   └── ui/                # UI components
├── lib/
│   ├── constants.ts       # Mock data
│   ├── types.ts           # TypeScript types
│   └── utils.ts           # Utilities
├── styles/
│   ├── globals.css        # Global styles
│   └── animations.css     # Animations
├── public/                # Static assets
├── __tests__/             # Tests
└── docs/                  # Documentation
```

---

## 📞 Getting Help

- **Discord**: [invite link]
- **GitHub Issues**: https://github.com/.../issues
- **Documentation**: See `/docs` folder
- **Code Examples**: Check existing components

---

## 🎸 Quick Reference

```bash
# Start development
npm run dev

# Build for production
npm run build

# Run tests
npm test

# Check types
npm run typecheck

# Fix linting
npm run lint -- --fix

# Create component
# Use Windsurf: /create component [name]

# Deploy
# Use Windsurf: /deploy
```

---

**Let's build something amazing! 🤘**

Built with 🤘 for The Drinkers • 2026
