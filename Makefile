POSTS := $(patsubst posts/%.html,%.html,$(wildcard posts/*.html))

all: $(POSTS) index.html

index.html: $(POSTS)
	@compile.js $@

$(POSTS): %.html : posts/%.html
	@compile.js $<
