SHELL := /bin/bash

# Define ROOT_URL, OBJDIR and other variables in private/makefile
include private/makefile

.PHONY: build
build: clean
	ROOT_URL=$(ROOT_URL) meteor build $(OBJDIR) --server=$(ROOT_URL) --directory

.PHONY: build-debug
build-debug: clean
	ROOT_URL=$(ROOT_URL) meteor build $(OBJDIR) --server=$(ROOT_URL) --directory --debug

.PHONY: clean
clean:
	rm -rf $(OBJDIR)/*

.PHONY: really-clean
really-clean:
	rm -rf .meteor/local/cordova-build

.PHONY: reset
reset: 
	meteor reset

.PHONY: run
run:
	meteor run --settings=private/local.json

.PHONY: bump
bump:
	sed -i -e "s/version: '.*'/version: '$(VERSION)'/" mobile-config.js
	sed -i -e 's/"version": ".*"/"version": "$(VERSION)"/' public/manifest.webapp
	sed -i -e "s/VERSION = '.*';/VERSION = '$(VERSION)';/" lib/config.js

.PHONY: run-androidstage
run-android:
	meteor run android-device

.PHONY: deploy-prod
deploy-prod:
	rsync -avz --delete $(OBJDIR)/bundle $(PROD_PATH)
	rsync -avz --delete private/branding $(PROD_PATH)/public

.PHONY: sign-with-release-key
sign-with-release-key:
	cd $(OBJDIR)/android/project/build/outputs/apk; \
	for apk in $$(ls -1 *release*.apk); do \
	  jarsigner \
	    -verbose -digestalg SHA1 -sigalg SHA1withRSA \
	    -keystore $(ANDROID_KEYSTORE) \
	    $${apk} $(ANDROID_KEYNAME) && \
	  $(ANDROID_HOME)/build-tools/*/zipalign 4 \
	    $${apk} ../../../../$${apk/release-unsigned/release-signed}; \
	done

.PHONY: sign-with-debug-key
sign-with-debug-key:
	cd $(OBJDIR)/android/project/build/outputs/apk; \
	for apk in $$(ls -1 *release*.apk); do \
	  jarsigner \
	    -verbose -digestalg SHA1 -sigalg SHA1withRSA \
	    -keystore ~/.android/debug.keystore \
	    $${apk} androiddebugkey && \
	  $(ANDROID_HOME)/build-tools/*/zipalign 4 \
	    $${apk} ../../../../$${apk/release-unsigned/debug-signed}; \
	done

.PHONY: install-debug
install-debug:
	adb install -r $(OBJDIR)/android/project/build/outputs/apk/android-armv7-debug.apk
