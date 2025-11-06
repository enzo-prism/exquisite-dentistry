import requests
from bs4 import BeautifulSoup
import os

# API URL to fetch all posts (per_page=100 covers all ~61 posts)
api_url = "https://exqdental.wpengine.com/wp-json/wp/v2/posts?per_page=100"

# Fetch the JSON data
headers = {'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'}
response = requests.get(api_url, headers=headers)
if response.status_code != 200:
    print("Error fetching data:", response.status_code)
    exit()

posts = response.json()

# Create a directory to save the text files
output_dir = "exq_dental_blog_posts"
os.makedirs(output_dir, exist_ok=True)

# Loop through each post
for post in posts:
    title = post['title']['rendered'].replace("/", "-")  # Clean title for filename
    slug = post['slug']
    content_html = post['content']['rendered']

    # Parse HTML and extract plain text
    soup = BeautifulSoup(content_html, 'html.parser')
    text_content = soup.get_text(separator="\n", strip=True)

    # Save to file (use slug for unique filename)
    filename = f"{slug}.txt"
    filepath = os.path.join(output_dir, filename)
    with open(filepath, 'w', encoding='utf-8') as file:
        file.write(f"Title: {title}\n\n")
        file.write(text_content)

print(f"Downloaded {len(posts)} posts to '{output_dir}' directory.")
