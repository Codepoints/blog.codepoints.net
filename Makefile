POSTS := $(patsubst posts/%.html,%.html,$(wildcard posts/*.html))

all: $(POSTS) index.html

index.html: $(POSTS) current.json
	@compile.js $@

$(POSTS): %.html : posts/%.html
	@compile.js $<

current.json: content.json
	@create_fragment.js
