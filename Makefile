IMAGE_NAME=rasp-blefi

build_image:
	docker build -t ${IMAGE_NAME} .

clean_image: 
	docker image rm -f ${IMAGE_NAME}
