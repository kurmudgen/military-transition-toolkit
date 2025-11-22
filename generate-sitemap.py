#!/usr/bin/env python3
"""Generate sitemap.xml for Military Transition Toolkit"""

import os
from datetime import datetime

# Base URL
BASE_URL = "https://www.militarytransitiontoolkit.com"
LASTMOD = "2025-11-21"

# Main pages with priorities
MAIN_PAGES = [
    # Homepage
    ("", 1.0),

    # Primary pages
    ("/blog", 0.9),
    ("/resources", 0.9),
    ("/state-benefits", 0.9),
    ("/app", 0.9),

    # App pages
    ("/app/about", 0.9),
    ("/app/faq", 0.9),
    ("/app/privacy", 0.9),
    ("/app/terms", 0.9),
    ("/app/refund", 0.9),

    # Auth pages
    ("/login", 0.7),
    ("/signup", 0.7),
]

def get_blog_posts():
    """Get all blog post slugs from src/content/blog/"""
    blog_dir = "src/content/blog"
    posts = []

    for filename in os.listdir(blog_dir):
        if filename.endswith(".md"):
            slug = filename[:-3]  # Remove .md extension
            posts.append(slug)

    return sorted(posts)

def generate_sitemap():
    """Generate sitemap.xml"""
    blog_posts = get_blog_posts()

    xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'

    # Add main pages
    for path, priority in MAIN_PAGES:
        url = f"{BASE_URL}{path}"
        xml += f"  <url>\n"
        xml += f"    <loc>{url}</loc>\n"
        xml += f"    <lastmod>{LASTMOD}</lastmod>\n"
        xml += f"    <changefreq>weekly</changefreq>\n"
        xml += f"    <priority>{priority}</priority>\n"
        xml += f"  </url>\n"

    # Add blog posts
    for slug in blog_posts:
        url = f"{BASE_URL}/blog/{slug}"
        xml += f"  <url>\n"
        xml += f"    <loc>{url}</loc>\n"
        xml += f"    <lastmod>{LASTMOD}</lastmod>\n"
        xml += f"    <changefreq>monthly</changefreq>\n"
        xml += f"    <priority>0.8</priority>\n"
        xml += f"  </url>\n"

    xml += '</urlset>\n'

    return xml

def main():
    """Main function"""
    sitemap_xml = generate_sitemap()

    # Write to public/sitemap.xml
    output_path = "public/sitemap.xml"
    os.makedirs("public", exist_ok=True)

    with open(output_path, "w", encoding="utf-8") as f:
        f.write(sitemap_xml)

    print(f"Sitemap generated: {output_path}")
    print(f"Total URLs: {len(MAIN_PAGES) + len(get_blog_posts())}")
    print(f"  - Main pages: {len(MAIN_PAGES)}")
    print(f"  - Blog posts: {len(get_blog_posts())}")

if __name__ == "__main__":
    main()
