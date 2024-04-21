PORT := 8000

all:
	@npx @11ty/eleventy

serve:
	@python -m http.server --directory blog.codepoints.net $(PORT)
