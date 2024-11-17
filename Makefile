PORT := 8000

all:
	@ENV=development npx @11ty/eleventy

serve:
	@python -m http.server --directory blog.codepoints.net $(PORT)
