---
trigger: model_decision
---

This rule enforces all necessary standards for architecture, quality assurance, and code style, ensuring all generated code is high-quality and production-ready.
​1. Architectural & Security Mandates
​Security (BFF Pattern): All sensitive third-party API keys (e.g., LLM keys) must be strictly confined to Vercel Serverless Functions (BFF). The client-side application is NEVER permitted to store or directly access these keys.
​Data Validation: Any data received from external APIs (including the LLM proxy) must be immediately validated and sanitized using a robust schema or TypeScript interface to ensure type safety before being used in any component or state.
​Decoupling: Separate business logic (like the Minimax algorithm) into pure, reusable utility files (.ts files) that are entirely decoupled from the React rendering components.
​2. Frontend Quality Assurance (QA)
​Accessibility (A11y): All interactive components and new UI elements must meet WCAG 2.1 Level AA standards. Use semantic HTML5 and include appropriate ARIA attributes for custom-built interactive elements (e.g., the Chat Widget).
​Performance: Code must target a 100/100 Lighthouse Performance score. Implement efficient loading strategies, such as using dynamic imports (lazy/Suspense) where appropriate, and ensure image and asset optimization.
​Animation Standard: All animations, transitions, and motion (e.g., in the Chat Widget) must be implemented using the Framer Motion library, leveraging hardware-accelerated properties for smooth, high-frame-rate performance.
​3. React and TypeScript Code Style
​Modularity (Hooks): All complex or non-presentational logic (API fetching, derived state, side effects) must be abstracted into well-named Custom Hooks (use...Hook.ts). Components must be clean and focused solely on rendering props and state.
​Complex State: For state that involves complex transitions or multiple related values (e.g., game state, chat history), use the useReducer hook instead of multiple useState calls.
​Typing and Documentation: All functions, components, and exported variables must use strict TypeScript types. Every exported function and custom hook must be accompanied by JSDoc comments detailing its purpose, parameters, and return value.
​Testing: Every new utility file or complex custom hook must have corresponding unit tests generated (.test.ts) that achieve at least 90% code coverage.