/**
 * MDX Utilities for Blog
 * Handles parsing, reading, and processing of MDX blog posts
 */

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readTime: string;
    content: string;
}

export interface BlogPostMeta {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    tags: string[];
    readTime: string;
}

/**
 * Calculate read time based on word count
 * Average reading speed: ~200 words per minute
 */
export function calculateReadTime(content: string): string {
    const wordsPerMinute = 200;
    const wordCount = content.trim().split(/\s+/).length;
    const minutes = Math.ceil(wordCount / wordsPerMinute);
    return `${minutes} min read`;
}

/**
 * Parse frontmatter from MDX content
 */
export function parseFrontmatter(content: string): {
    data: Record<string, unknown>;
    content: string;
} {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);

    if (!match) {
        return { data: {}, content };
    }

    const frontmatterString = match[1];
    const bodyContent = match[2];

    // Simple YAML-like parser for frontmatter
    const data: Record<string, unknown> = {};
    const lines = frontmatterString.split('\n');

    for (const line of lines) {
        const colonIndex = line.indexOf(':');
        if (colonIndex === -1) continue;

        const key = line.slice(0, colonIndex).trim();
        let value = line.slice(colonIndex + 1).trim();

        // Handle quoted strings
        if ((value.startsWith('"') && value.endsWith('"')) ||
            (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
        }

        // Handle arrays (tags)
        if (value.startsWith('[') && value.endsWith(']')) {
            const arrayContent = value.slice(1, -1);
            data[key] = arrayContent.split(',').map(item => {
                const trimmed = item.trim();
                if ((trimmed.startsWith('"') && trimmed.endsWith('"')) ||
                    (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
                    return trimmed.slice(1, -1);
                }
                return trimmed;
            });
        } else {
            data[key] = value;
        }
    }

    return { data, content: bodyContent };
}

/**
 * Format date for display
 */
export function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

/**
 * Get unique tags from all posts
 */
export function getUniqueTags(posts: BlogPostMeta[]): string[] {
    const allTags = posts.flatMap(post => post.tags);
    return [...new Set(allTags)].sort();
}

/**
 * Filter posts by tag
 */
export function filterPostsByTag(posts: BlogPostMeta[], tag: string | null): BlogPostMeta[] {
    if (!tag) return posts;
    return posts.filter(post => post.tags.includes(tag));
}

/**
 * Sort posts by date (newest first)
 */
export function sortPostsByDate(posts: BlogPostMeta[]): BlogPostMeta[] {
    return [...posts].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );
}
