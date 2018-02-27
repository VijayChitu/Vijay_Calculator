REACT_NATIVE := $(shell npm bin)/react-native

run: run-android

run-android: 
	# Build and run the app on the device.
	$(REACT_NATIVE) run-android

run-ios: 
	# Build and run the app on the device.
	$(REACT_NATIVE) run-ios
