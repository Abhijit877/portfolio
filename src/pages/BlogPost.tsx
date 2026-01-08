import React, { useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiCalendar } from 'react-icons/fi';
import { formatDate } from '../lib/mdx';
import ReadingProgress from '../components/blog/ReadingProgress';
import TableOfContents from '../components/blog/TableOfContents';
import CodeBlock from '../components/blog/CodeBlock';

// Blog post content database - in production, this would come from MDX files
const blogPostsContent: Record<string, {
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readTime: string;
    content: string;
}> = {
    'building-scalable-crm-architecture': {
        title: 'Building Scalable CRM Architecture: Lessons from $10M Pipeline Systems',
        date: '2024-12-15',
        excerpt: 'How I architected a real-time lead engine using Next.js and WebSockets that reduced response time by 40% and handled enterprise-scale pipeline volume.',
        tags: ['System Design', 'D365', 'Architecture'],
        readTime: '8 min read',
        content: `
## The Challenge

When tasked with modernizing a Fortune 500 company's CRM system, the initial scope seemed straightforward: improve quote generation speed. The reality was far more complex.

The legacy system was causing a **45% delay in quote generation** due to:
- Manual data entry across multiple systems
- Lack of real-time CPQ (Configure, Price, Quote) integration
- No middleware between D365 and SAP ERP

## The Architecture

I designed a clean architecture using **Azure Logic Apps** as the middleware BFF (Backend for Frontend). This approach:

\`\`\`typescript
// Simplified middleware pattern
const processQuoteRequest = async (request: QuoteRequest) => {
  // 1. Validate in D365
  const validation = await d365.validateProducts(request.lineItems);
  
  // 2. Get real-time pricing from SAP
  const pricing = await sap.calculatePricing(request.lineItems);
  
  // 3. Apply business rules
  const quote = applyDiscountRules(pricing, request.customer);
  
  // 4. Return to UI without blocking
  return { quote, estimatedDelivery: calculateETA(quote) };
};
\`\`\`

### Key Decisions

1. **Non-blocking Operations**: Decoupled the D365 UI from SAP ERP
2. **Event-Driven Updates**: Used WebSockets for real-time pricing
3. **Caching Layer**: Redis for frequently accessed product configurations

## The Results

After six months of implementation:

| Metric | Before | After | Improvement |
|--------|--------|-------|-------------|
| Quote Cycle Time | 2 days | 2 hours | **95%** |
| Data Entry Errors | 12% | 1.2% | **90%** |
| Pipeline Volume | $5M | $10M+ | **100%+** |

## Lessons Learned

1. **Start with the bottleneck**: Don't optimize everything at once
2. **Invest in observability**: We caught 80% of issues before users reported them
3. **Document architectural decisions**: Future you will thank present you
    `,
    },
    'react-three-fiber-experiments': {
        title: 'Exploring WebGL: A React Three Fiber Research Lab',
        date: '2024-11-28',
        excerpt: 'A deep dive into creating immersive 3D experiences on the web using React Three Fiber and GLSL shaders.',
        tags: ['React', 'WebGL', 'Three.js'],
        readTime: '6 min read',
        content: `
## Why WebGL?

The web is evolving beyond flat interfaces. With WebGL and React Three Fiber, we can create experiences that were once only possible in native applications.

## The Setup

Getting started with R3F is surprisingly simple:

\`\`\`tsx
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

function Scene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color="hotpink" />
      </mesh>
      <OrbitControls />
      <Environment preset="sunset" />
    </Canvas>
  );
}
\`\`\`

## GLSL Shaders

For truly unique effects, custom shaders are essential:

\`\`\`glsl
// Fragment shader for gradient effect
varying vec2 vUv;
uniform float uTime;

void main() {
  vec3 color = mix(
    vec3(0.2, 0.4, 0.8),
    vec3(0.8, 0.2, 0.4),
    sin(vUv.y * 3.14159 + uTime) * 0.5 + 0.5
  );
  gl_FragColor = vec4(color, 1.0);
}
\`\`\`

## Performance Tips

1. Use **instancing** for repeated geometries
2. **Dispose** unused resources
3. Implement **LOD** (Level of Detail) for complex scenes
4. Consider **offscreen canvas** for heavy computations
    `,
    },
    'pcf-component-mastery': {
        title: 'PCF Component Mastery: Building Reusable D365 Controls',
        date: '2024-11-10',
        excerpt: 'A comprehensive guide to creating Power Apps Component Framework controls that scale.',
        tags: ['PCF', 'D365', 'TypeScript'],
        readTime: '10 min read',
        content: `
## What are PCF Controls?

Power Apps Component Framework (PCF) allows developers to create custom UI components for Dynamics 365 and Power Apps using modern web technologies.

## Project Structure

\`\`\`
MyControl/
├── ControlManifest.Input.xml
├── index.ts
├── components/
│   └── App.tsx
├── styles/
│   └── main.css
└── package.json
\`\`\`

## Key Patterns

### Property Management

\`\`\`typescript
public updateView(context: ComponentFramework.Context<IInputs>): void {
  const value = context.parameters.inputValue.raw;
  const isDisabled = context.mode.isControlDisabled;
  
  ReactDOM.render(
    React.createElement(App, { value, disabled: isDisabled }),
    this.container
  );
}
\`\`\`

### Event Handling

\`\`\`typescript
const handleChange = (newValue: string) => {
  context.parameters.inputValue.raw = newValue;
  context.notifyOutputChanged();
};
\`\`\`

## Best Practices

1. **Type everything**: Leverage TypeScript's full potential
2. **Optimize bundle size**: Tree-shake aggressively
3. **Handle edge cases**: Null values, disabled states, offline mode
4. **Test in canvas apps**: Behavior differs from model-driven apps
    `,
    },
    'azure-middleware-patterns': {
        title: 'Azure Middleware Patterns for CRM Integration',
        date: '2024-10-20',
        excerpt: 'Implementing robust middleware using Azure Logic Apps and Functions.',
        tags: ['Azure', 'Integration', 'D365'],
        readTime: '7 min read',
        content: `
## The Integration Challenge

Modern enterprises rarely have a single system of record. CRM data needs to flow to ERP, marketing automation, analytics, and beyond.

## Pattern 1: Logic Apps as BFF

\`\`\`json
{
  "definition": {
    "triggers": {
      "When_a_record_is_created": {
        "type": "ApiConnectionWebhook",
        "inputs": {
          "host": { "connection": { "name": "@parameters('$connections')['commondataservice']['connectionId']" } },
          "body": { "entityName": "leads" }
        }
      }
    },
    "actions": {
      "Transform_and_Route": {
        "type": "Switch",
        "expression": "@triggerBody()?['source']",
        "cases": { }
      }
    }
  }
}
\`\`\`

## Pattern 2: Azure Functions for Complex Logic

\`\`\`csharp
[FunctionName("ProcessLead")]
public async Task<IActionResult> Run(
    [HttpTrigger(AuthorizationLevel.Function, "post")] HttpRequest req)
{
    var lead = await req.ReadFromJsonAsync<Lead>();
    
    // Apply scoring algorithm
    var score = _scoringService.Calculate(lead);
    
    // Route to appropriate queue
    await _routingService.Route(lead, score);
    
    return new OkObjectResult(new { score, status = "processed" });
}
\`\`\`

## Error Handling

> **Pro tip**: Always implement dead-letter queues for failed messages

1. Retry policies with exponential backoff
2. Circuit breaker patterns for external services
3. Alerting on failure thresholds
    `,
    },
};

const BlogPost: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const post = slug ? blogPostsContent[slug] : null;
    const contentRef = useRef<HTMLDivElement>(null);

    if (!post) {
        return (
            <main className="min-h-screen bg-background-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-text-primary mb-4">Post Not Found</h1>
                    <p className="text-text-secondary mb-8">The blog post you're looking for doesn't exist.</p>
                    <Link
                        to="/blog"
                        className="inline-flex items-center gap-2 text-accent-primary hover:underline"
                    >
                        <FiArrowLeft /> Back to Blog
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background-primary">
            {/* Reading Progress Bar */}
            <ReadingProgress />

            {/* Article Layout with TOC */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 pt-32 pb-20">
                <div className="flex gap-12">
                    {/* Main Article Content */}
                    <article className="flex-1 min-w-0">
                        {/* Back Link */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Link
                                to="/blog"
                                className="inline-flex items-center gap-2 text-text-secondary hover:text-accent-primary transition-colors mb-8"
                            >
                                <FiArrowLeft className="w-4 h-4" />
                                Back to all articles
                            </Link>
                        </motion.div>

                        {/* Article Header */}
                        <motion.header
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="mb-12 article-container"
                        >
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-6">
                                {post.tags.map((tag) => (
                                    <span key={tag} className="elite-tag-primary">
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
                                {post.title}
                            </h1>

                            {/* Meta */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-text-secondary">
                                <span className="flex items-center gap-2">
                                    <FiCalendar className="w-4 h-4" />
                                    {formatDate(post.date)}
                                </span>
                                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-background-secondary">
                                    <FiClock className="w-4 h-4" />
                                    {post.readTime}
                                </span>
                            </div>
                        </motion.header>

                        {/* Article Content */}
                        <motion.div
                            ref={contentRef}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="elite-prose article-container"
                            dangerouslySetInnerHTML={{ __html: renderMarkdown(post.content) }}
                        />
                    </article>

                    {/* Table of Contents Sidebar */}
                    <TableOfContents />
                </div>
            </div>
        </main>
    );
};

// Enhanced markdown to HTML renderer with terminal-style code blocks
function renderMarkdown(content: string): string {
    let html = content
        // Headers - add IDs for TOC linking
        .replace(/^### (.*$)/gim, (_, title) => {
            const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return `<h3 id="${id}">${title}</h3>`;
        })
        .replace(/^## (.*$)/gim, (_, title) => {
            const id = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            return `<h2 id="${id}">${title}</h2>`;
        })
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')
        // Bold
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Italic
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Code blocks - Terminal style
        .replace(/```(\w+)?\n([\s\S]*?)```/g, (_, lang, code) => {
            const language = lang || 'text';
            const languageNames: Record<string, string> = {
                typescript: 'TypeScript',
                javascript: 'JavaScript',
                tsx: 'TSX',
                jsx: 'JSX',
                csharp: 'C#',
                json: 'JSON',
                glsl: 'GLSL',
                text: 'Text'
            };
            const displayLang = languageNames[language.toLowerCase()] || language.toUpperCase();

            return `
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-buttons">
                            <span class="terminal-btn terminal-btn-red"></span>
                            <span class="terminal-btn terminal-btn-yellow"></span>
                            <span class="terminal-btn terminal-btn-green"></span>
                        </div>
                        <div class="terminal-title">${displayLang}</div>
                        <button class="terminal-copy-btn" onclick="navigator.clipboard.writeText(this.closest('.terminal-window').querySelector('code').textContent)">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                        </button>
                    </div>
                    <div class="terminal-content">
                        <pre class="terminal-pre"><code class="language-${language}">${escapeHtml(code.trim())}</code></pre>
                    </div>
                </div>
            `;
        })
        // Inline code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Blockquotes
        .replace(/^> (.*$)/gim, '<blockquote><p>$1</p></blockquote>')
        // Tables
        .replace(/\|(.+)\|/g, (match) => {
            const cells = match.split('|').filter(c => c.trim());
            if (cells.every(c => /^[-:]+$/.test(c.trim()))) return '';
            const isHeader = cells.some(c => c.includes('**'));
            const tag = isHeader ? 'th' : 'td';
            const row = cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('');
            return `<tr>${row}</tr>`;
        })
        // Lists
        .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
        .replace(/^- (.*$)/gim, '<li>$1</li>')
        // Paragraphs
        .replace(/\n\n/g, '</p><p>')
        // Line breaks
        .replace(/\n/g, '<br>');

    // Wrap in paragraph tags
    if (!html.startsWith('<')) {
        html = `<p>${html}</p>`;
    }

    return html;
}

function escapeHtml(text: string): string {
    const map: Record<string, string> = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;',
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

export default BlogPost;
