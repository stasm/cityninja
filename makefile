include private/makefile

.PHONY: build
build: clean
	ROOT_URL=$(ROOT_URL) meteor build $(OBJDIR) --server=$(ROOT_URL) --directory	

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
	sed -i -e "s/VERSION = '.*';/VERSION = '$(VERSION)';/" lib/meta.js

.PHONY: run-android-stage
run-android-stage:
	meteor run android-device --mobile-server=$(STAGE_DOMAIN)

.PHONY: deploy-prod
deploy-prod:
	rsync -avz --delete $(OBJDIR)/bundle $(PROD_PATH)
	rsync -avz --delete private/branding $(PROD_PATH)/public

.PHONY: deploy-stage
deploy-stage:
	meteor deploy $(STAGE_DOMAIN) --settings=private/stage.json

.PHONY: sign-prod
sign-prod:
	cd $(OBJDIR)/android; \
	jarsigner \
	  -digestalg SHA1 -sigalg SHA1withRSA \
	  -keystore $(ANDROID_KEYSTORE) \
	  $(RAW_APK) $(ANDROID_KEYNAME) && \
	$(ANDROID_HOME)/build-tools/*/zipalign 4 $(RAW_APK) $(PROD_APK)

.PHONY: sign-debug
sign-debug:
	cd $(OBJDIR)/android; \
	jarsigner \
	  -verbose -digestalg SHA1 -sigalg SHA1withRSA \
	  -keystore ~/.android/debug.keystore \
	  $(RAW_APK) androiddebugkey && \
	$(ANDROID_HOME)/build-tools/*/zipalign 4 $(RAW_APK) $(DEBUG_APK)

.PHONY: install
install:
	adb install -r $(OBJDIR)/android/*ninja-*.apk
